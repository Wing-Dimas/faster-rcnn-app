import numpy as np
import torch
import torchvision.transforms as T
import torchvision
from model import get_model
import os

dev = torch.device("cuda" if torch.cuda.is_available() else "cpu")

name2idx = {'spatter': 1, 'undercut': 2}
idx2name = {v: k for k, v in name2idx.items() }

transform_norm = T.Compose([
    T.Resize((640,640)),
    T.ToTensor(),
])

np.random.seed(1)
class_to_color = {name2idx[v]: np.random.randint(0, 255, 3) for v in name2idx}

to_name = np.vectorize(lambda x: idx2name[x])

def to_numpy(tensor):
    return tensor.detach().cpu().numpy() if tensor.requires_grad else tensor.cpu().numpy()

def load_model(name):
    model = get_model()
    model.to(dev)
    model.load_state_dict(torch.load(os.path.join("model", name), map_location=dev))
    model.eval()
    return model

def transform_img(img):
    original_width, original_height = img.size
    scale_x = original_width / 640
    scale_y = original_height / 640

    img_normalized = transform_norm(img)
    img = img_normalized.unsqueeze(dim=0)

    return img, (scale_x, scale_y)

def predict_image(model, img, scale, iou_threshold=0.3):
    (scale_x, scale_y) = scale

    outputs = model(img)[0]


    boxes = outputs['boxes'].data
    scores = outputs['scores'].data
    labels = outputs['labels'].data

    keep = torchvision.ops.nms(boxes, scores, iou_threshold)

    boxes = boxes[keep]
    scores = scores[keep]
    labels = labels[keep]

    # TODO: return an empty array when no objects are detected
    pred = {}
    pred["boxes"] = (boxes * torch.tensor([scale_x, scale_y, scale_x, scale_y])).int().tolist()
    pred["scores"] = (scores * 100).int().tolist()
    pred["labels"] = to_name(labels.numpy()).tolist()

    return pred

# def predict_image(ort_session, img, scale):
#     (scale_x, scale_y) = scale

#     ort_inputs = {ort_session.get_inputs()[0].name: to_numpy(img)}
#     ort_outs = ort_session.run(None, ort_inputs)
#     output = {}
#     output["boxes"] = (ort_outs[0] * np.array([scale_x, scale_y, scale_x, scale_y])).astype(np.int32).tolist()
#     output["labels"] = to_name(ort_outs[1]).tolist()
#     output["scores"] = (ort_outs[2] * 100).astype(np.int32).tolist()

#     return output
