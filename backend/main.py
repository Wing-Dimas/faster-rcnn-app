from flask import Flask, request, jsonify
import os
from werkzeug.utils import secure_filename
from PIL import Image
from model import get_model
import utils
import torch
import torchvision.transforms as T
import os
import warnings
warnings.filterwarnings('ignore')

app = Flask(__name__)
dev = utils.dev

UPLOAD_FOLDER = "static/uploads"

app.secret_key = "secret key"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
app.config["MAX_CONTENT_LENGTH"] = 16 * 1024 * 1024

ALLOWED_EXTENSIONS = set(["png", "jpg", "jpeg"])

model_fold_1 = get_model()
model_fold_1.to(dev)
model_fold_1.load_state_dict(torch.load(os.path.join("model", "faster_rcnn_fold_1_150.pth"), map_location=dev))
model_fold_1.eval()

model_fold_2 = get_model()
model_fold_2.to(dev)
model_fold_2.load_state_dict(torch.load(os.path.join("model", "faster_rcnn_fold_2_150.pth"), map_location=dev))
model_fold_2.eval()

model_fold_3 = get_model()
model_fold_3.to(dev)
model_fold_3.load_state_dict(torch.load(os.path.join("model", "faster_rcnn_fold_3_150.pth"), map_location=dev))
model_fold_3.eval()

mean = [0.485, 0.456, 0.406]
std = [0.229, 0.224, 0.225]
transform_norm = T.Compose([
    T.ToTensor(),
    T.Resize((640,640)),
    T.Normalize(mean, std)]
)

def allowed_file(filename: str) -> bool:
    return filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/")
def home():
    return "Hello World"

@app.route("/predict", methods=["POST"])
def predict():
    # try:
    if "image" not in request.files:
        return jsonify({
            "error" : 'No file part in the request',
            "status" : "failed"
        }), 400
    image = request.files["image"]
    print(image)

    success = False
    path = ""
    if image and allowed_file(image.filename):
        filename = secure_filename(image.filename)
        path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
        image.save(path)

        success = True
    else:
        return jsonify({
            "message" : 'File type is not allowed',
            "status" : "error"
        }), 400


    if success:
        img = Image.open(path).convert("RGB")
        original_width, original_height = img.size
        # Hitung skala

        scale_x = original_width / 640
        scale_y = original_height / 640

        img_normalized = transform_norm(img)
        img = img_normalized.unsqueeze(dim=0).to(dev)

        # input = Variable(image_tensor)
        with torch.no_grad():
            pred_img_1 = model_fold_1(img)[0]
            pred_img_2 = model_fold_2(img)[0]
            pred_img_3 = model_fold_3(img)[0]

        pred_img_1["boxes"] = (pred_img_1["boxes"] * torch.tensor([scale_x, scale_y, scale_x, scale_y])).int().tolist()
        pred_img_1["scores"] = (pred_img_1["scores"] * 100).int().tolist()
        pred_img_1["labels"] = utils.to_name(pred_img_1["labels"].numpy()).tolist()

        pred_img_2["boxes"] = (pred_img_2["boxes"] * torch.tensor([scale_x, scale_y, scale_x, scale_y])).int().tolist()
        pred_img_2["scores"] = (pred_img_2["scores"] * 100).int().tolist()
        pred_img_2["labels"] = utils.to_name(pred_img_2["labels"].numpy()).tolist()

        pred_img_3["boxes"] = (pred_img_3["boxes"] * torch.tensor([scale_x, scale_y, scale_x, scale_y])).int().tolist()
        pred_img_3["scores"] = (pred_img_3["scores"] * 100).int().tolist()
        pred_img_3["labels"] = utils.to_name(pred_img_3["labels"].numpy()).tolist()

        os.remove(path=path)

        return jsonify({
            "fold_1" : pred_img_1,
            "fold_2" : pred_img_2,
            "fold_3" : pred_img_3,
        }), 200

    return jsonify({
        "message": "successfuly",
        "status" : "success"
    }), 201


    # except Exception:
    #     print("Error on predict")
    #     return jsonify({"error" : 'Internal Server Error'}), 500

if __name__ == "__main__":
    app.run(debug=True)
