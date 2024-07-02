import torch
import torchvision
from torch import nn
from torchvision.models.detection.faster_rcnn import FastRCNNPredictor
from torchvision.models.detection import FasterRCNN
from torchvision.models.detection.rpn import AnchorGenerator

import torchvision.transforms as T


dev = torch.device("cuda" if torch.cuda.is_available() else "cpu")

def get_model():
    backbone = torchvision.models.resnet50(pretrained=False)
    req_layers = list(backbone.children())[:8]
    backbone = nn.Sequential(*req_layers)
    #we need to specify an outchannel of this backone specifically because this outchannel will be
    #used as an inchannel for the RPNHEAD which is producing the out of RegionProposalNetwork
    #we can know the number of outchannels by looking into the backbone "backbone??"
    backbone.out_channels = 2048

    #we need to specify a  different anchor generator
    anchor_generator = AnchorGenerator(sizes=((64, 128, 256),),
                                    aspect_ratios=((0.5, 1.0, 2),))
    #here at each position in the grid there will be 3x3=9 anchors
    roi_pooler = torchvision.ops.MultiScaleRoIAlign(featmap_names=['0'],
                                                    output_size=7,
                                                sampling_ratio=2)

    # roi_pooler = torchvision.ops.RoIPool(output_size=7, )
    #the output size is the output shape of the roi pooled features which will be used by the box head
    model = FasterRCNN(backbone,num_classes=2,rpn_anchor_generator=anchor_generator, box_roi_pool=roi_pooler)
    num_classes = 1 + 2
    in_features = model.roi_heads.box_predictor.cls_score.in_features
    model.roi_heads.box_predictor = FastRCNNPredictor(in_features, num_classes)
    return model
