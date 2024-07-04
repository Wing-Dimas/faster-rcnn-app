from flask import Flask, request, jsonify
from PIL import Image
import utils
import os

import warnings
warnings.filterwarnings('ignore')

app = Flask(__name__)
app.secret_key = "secret key"
app.config["MAX_CONTENT_LENGTH"] = 16 * 1024 * 1024

ALLOWED_EXTENSIONS = set(["png", "jpg", "jpeg"])

models = {
    "fold-1" : utils.load_model("faster_rcnn_fold_1_150.pth"),
    "fold-2" : utils.load_model("faster_rcnn_fold_2_150.pth"),
    "fold-3" : utils.load_model("faster_rcnn_fold_3_150.pth")
}

def allowed_file(filename: str) -> bool:
    return filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/")
def home():
    return "Hello World"

@app.route("/predict", methods=["POST"])
def predict():
    try:
        model = request.args.get('model')
        if not model or model not in models.keys():
            model = "fold-3"
        # try:
        if "image" not in request.files:
            return jsonify({
                "status" : "error",
                "message" : 'No file part in the request',
                "status" : "failed"
            }), 400
        image = request.files["image"]

        # if not allowed image extension, then throw error
        if not (image and allowed_file(image.filename)):
            return jsonify({
                "message" : 'File type is not allowed',
                "status" : "error"
            }), 400

        # open image
        img = Image.open(image).convert("RGB")
        # transform image
        img_transformed, scale = utils.transform_img(img)
        # pred img
        # {boxes: [[int, int, int, int], ...], lables: [string, ...], scores: [int, ...] }
        pred_img = utils.predict_image(models[model], img_transformed, scale)

        return jsonify({
            "message" : "Predict image succesfuly",
            "status": "success",
            "data" : pred_img
        }), 200

    except Exception as e:
        print("Error on predict", str(e))
        return jsonify({
            "status" : "error",
            "message" : 'Internal Server Error'
        }), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
