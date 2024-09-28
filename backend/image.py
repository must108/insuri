from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from PIL import Image
from transformers import AutoImageProcessor, AutoModelForImageClassification
import os
import io

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), "uploads")
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'bmp', 'tiff', 'heic', 'hevc'}
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

processor = AutoImageProcessor.from_pretrained("beingamit99/car_damage_detection")
model = AutoModelForImageClassification.from_pretrained("beingamit99/car_damage_detection")

@app.route("/")
def home():
    return {"message": "Hello World!"}

@app.route("/detect_damage", methods = ["POST"])
def upload_file():
    print("files:", request.files)

    if 'file' not in request.files:
        return jsonify({ "error": "server-side error!" }), 400
    
    file = request.files['file']

    if file.filename == '':
        return jsonify({ 'error': 'you did not select a file!' }), 400
    
    if allowed_file(file.filename):
        image = Image.open(io.BytesIO(file.read()))

        inputs = processor(images=image, return_tensors="pt")

        outputs = model(**inputs)
        logits = outputs.logits.detach().cpu().numpy()
        predicted_class_id = np.argmax(logits)
        predicted_proba = np.max(logits)
        label_map = model.config.id2label
        predicted_class_name = label_map[predicted_class_id]

        predicted_proba = float(predicted_proba)

        return jsonify({ 
            "predicted_damage": predicted_class_name, 
            "pred_proba": predicted_proba
        })

    return jsonify({ "error": "File type not allowed!" }), 400

if __name__ == "__main__":
    app.run(debug = True)
