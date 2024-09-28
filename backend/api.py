from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
import base64
from dotenv import load_dotenv
import numpy as np
from PIL import Image
from transformers import AutoImageProcessor, AutoModelForImageClassification
import os
import io
import ast
import json

load_dotenv()

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), "uploads")
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'bmp', 'tiff', 'heic', 'hevc'}
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

processor = AutoImageProcessor.from_pretrained("beingamit99/car_damage_detection")
model = AutoModelForImageClassification.from_pretrained("beingamit99/car_damage_detection")

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

@app.route("/")
def home():
    return {"message": "Hello World!"}

@app.route("/detect_damage", methods = ["POST"])
def upload_file():
    age = request.form.get("age")
    gender = request.form.get("gender")
    address = request.form.get("address")
    car_make = request.form.get("make")
    car_model = request.form.get("model")
    car_year = request.form.get("year")
    car_mileage = request.form.get("mileage")
    insurance_company = request.form.get("insurance_company")
    deductible = request.form.get("deductible")
    premium = request.form.get("premium")
    past_claims = request.form.get("claims")
    print("files:", request.files)

    if 'file' not in request.files:
        return jsonify({ "error": "server-side error!" }), 400
    
    file = request.files['file']

    if file.filename == '':
        return jsonify({ 'error': 'you did not select a file!' }), 400
    
    if allowed_file(file.filename):
        the_file = file.read()
        image = Image.open(io.BytesIO(the_file))
        base64_image = base64.b64encode(the_file).decode("utf-8")

        inputs = processor(images=image, return_tensors="pt")

        outputs = model(**inputs)
        logits = outputs.logits.detach().cpu().numpy()
        predicted_class_id = np.argmax(logits)
        predicted_proba = np.max(logits)
        label_map = model.config.id2label
        predicted_class_name = label_map[predicted_class_id]

        predicted_proba = float(predicted_proba)

        messages = [
            {
                "role": "system",
                "content": """
                You are a car damage classification system. Classify
                this car damage from 0-100, with 0 being the worst damage,
                and 100 being a totalled vehicle. Return in this format: {"damage": x}
                where x is between 0-100.
                0-10 for small damage, paint chips
                10-40 for small-medium dents, tire damage, big scratches
                50-70 for small collision damage, severe dents and scratches
                70-100 for near destroyed vehicles, totalled cars.
                Also classify the type of damage. 
                Choose from:
                Dents
                Scratches
                Paint Chips
                Broken Headlights/Taillights
                Bumper Damage
                Rear-End Collision Damage
                Side Impact Damage
                Tire Damage
                Roof Damage
                Return in this format: {"damage_type": type}
                YOU MUST return both damage value and damage type, return "None" if there are none.
                """
            },
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": "Classify this image"},
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:image/jpeg;base64,{base64_image}"
                        }
                    }
                ]
            }
        ]

        res = client.chat.completions.create(
            model="gpt-4o-2024-08-06",
            messages=messages,
            max_tokens=300,
        )

        res_content = res.choices[0].message.content
        response_data = json.loads(res_content)

        damage_val = response_data.get("damage")
        damages = response_data.get("damage_type")
    
        second_messages = [
            {
                "role": "system",
                "content": f"""
                    You are an expert insurance agent, tasked with helping customers with their insurance claims.
                """
            },
            {
                "role": "user",
                "content": f"""
                    Here is some information about the customer:
                    Age: {age}
                    Gender: {gender}
                    Address: {address}
                    Number of Past Insurance Claims: {past_claims}

                    Here is some information about their vehicle:
                    Make: {car_make}
                    Model: {car_model}
                    Year: {car_year}
                    Mileage: {car_mileage}

                    Here is some information about their insurance:
                    Insurance Company: {insurance_company}
                    Deductible Amount: {deductible}
                    Premium Details: {premium}

                    This customer has suffered a car accident, and they want to know their repair cost,
                    their claim amount, their deductible amount, and their monthly premium increase. 
                    These are some of the damage incurred: {damages}
                    This is the severity of the damage, from 0-100 (where 0 is no damage, and 100 is fully totalled): {damage_val}
                    Please consider all variables, including past claims, age, and location, especially for the monthly premium.
                """
                +
                """
                    Return the appropriate values given the data, strictly in JSON format, like this:
                        { 
                        "repair_cost": x,    
                        "claim_amount": y,
                        "deductible_amount": z,
                        "monthly_premium_increase": a,
                        }
                    DO NOT RETURN ANYTHING ELSE! Just JSON data, and not in a code box. just plain JSON text
                """
            }
        ]

        res = client.chat.completions.create(
            model="gpt-4o-2024-08-06",
            messages=second_messages,
            max_tokens=300
        )

        res_content = res.choices[0].message.content
        print(res_content)
        response_data = json.loads(res_content)

        return response_data

    return jsonify({ "error": "File type not allowed!" }), 400


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)
