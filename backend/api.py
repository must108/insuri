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
    police_report = request.form.get("police")
    injured = request.form.get("injured")
    print("files:", request.files)

    if 'files' not in request.files:
        return jsonify({ "error": "server-side error! no files" }), 400
    
    files = request.files.getlist("files")

    if len(files) == 0:
        return jsonify({ 'error': 'you did not select any files!' }), 400
    
    if len(files) > 5:
        return jsonify({ 'error': 'you can only upload up to 5 files!' }), 400
    
    results = []
    print(files)
    
    for fi in files:     
        print(fi.filename)   
        if allowed_file(fi.filename):
            the_file = fi.read()
            image = Image.open(io.BytesIO(the_file)).convert("RGB")
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
                        Is the person injured? {injured}
                        Was a police report filed? {police_report}

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
                        Also consider police report, and potential injury, if it matters.
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
                        Remember to include deductible and premium amount.
                    """
                }
            ]

            res = client.chat.completions.create(
                model="gpt-4o-2024-08-06",
                messages=second_messages,
                max_tokens=300
            )

            res_content = res.choices[0].message.content
            response_data = json.loads(res_content)

            results.append(response_data)
        else:
            return jsonify({ "error": "File type not allowed!" }), 400

    length_results = len(results)
    res_obj = {
        "claim_amount": 0,
        "deductible_amount": 0,
        "monthly_premium_increase": 0,
        "repair_cost": 0,
    }
        
    for result in results:
        for key in res_obj.keys():
            res_obj[key] += result.get(key, 0)

    for key in res_obj:
        res_obj[key] /= length_results

    return jsonify(res_obj)

messages = [
    {
        "role": "system",
        "content": """
            You are an expert in the auto insurance industry. 
            DO NOT ANSWER QUESTIONS NOT ABOUT INSURANCE!
            You are answering questions for a user who wants to 
            know more about auto insurance. Kindly explain to them 
            the answers to their questions. Keep the answers concise, one sentence
            maximum. Do not answer questions not about auto insurance. Do not even 
            contextualize or attempt to say anything about the topic. Just let them
            know that you only know about car insurance. Also, always follow up with
            a question on if the user has any other questions.

            Here is some helpful information, in case the user asks you about any specifics:
            Beginner's Guide to Car Insurance:
            What is Car Insurance?
            Car insurance is an agreement where you pay a premium, and the insurance company helps cover costs if your car is damaged, stolen, or you're in an accident.

            Why Do I Need Car Insurance?
            It’s legally required in most states. Without it, you could face fines, penalties, or lose your license.

            What Does Car Insurance Cover?
            • Liability Insurance: Covers damage/injury to others if you're at fault.
            • Collision Coverage: Helps repair your car after an accident, no matter who's at fault.
            • Comprehensive Coverage: Covers theft, fire, or storm damage.
            • Personal Injury Protection (PIP): Helps with medical expenses after an accident.
            • Uninsured/Underinsured Motorist: Protects you if the other driver doesn’t have insurance.

            How Does Car Insurance Work?
            You pay a regular premium to keep your insurance, and when you file a claim, you pay a deductible before the insurance covers the rest.

            How Much Does Car Insurance Cost?
            It depends on:
            • Your age and driving history.
            • The car you drive.
            • Your coverage choices.
            • Where you live.

            How Do I Choose the Right Coverage?
            First, meet your state’s minimum requirements. Additionally, consider factors like your car’s value, budget, and driving habits.

            How Do I Buy Car Insurance?
            Through insurance agents or online directly from insurance companies.

            What Should I Do After I Buy Insurance?
            Carry your proof of insurance in your car and review your policy to understand what’s covered.

            What Happens if I Get in an Accident?
            You pay a deductible, and your premium increases.

            What to do after a Car Accident:
            Stay Calm and Check for Injuries:
            a- Breathe.
            b- Check for injuries.
            c- Call 911 if needed.

            Move to Safety:
            a- Turn on hazard lights.
            b- If possible, move the car to a safe spot.

            Call for Help:
            a- Report the accident to 911.
            b- File a police report.

            Exchange Info:
            a- Get the other driver’s name, number, and insurance details.

            Take Photos:
            a- Capture pictures of the cars, damage, and the scene.

            Don’t Admit Fault:
            a- Avoid saying anything that could imply fault.

            Call Your Insurance:
            a- Report the accident to your insurer right away.

            Get Medical Attention:
            a- See a doctor even if you feel fine.

            Keep Records:
            a- Save all documents like reports, bills, and repair estimates.

            Consider Legal Help:
            a- Consult a lawyer if there are disputes or injuries.

            How to lower insurance rates:
            Shop Around
            Compare quotes from different companies to find the best rate.

            Raise Your Deductible
            A higher deductible can lower your premium but ensure you can afford it.

            Ask About Discounts
            Look for discounts for safe driving, good grades, safety features, or bundling policies.

            Drive Less
            Fewer miles driven can reduce your premium or consider a pay-per-mile policy.

            Maintain Good Credit
            A better credit score can lead to lower premiums.

            Keep a Clean Driving Record
            Avoid accidents and tickets to get better rates.

            Choose the Right Car
            Safer, affordable cars typically have lower insurance costs.

            Cut Unnecessary Coverage
            Drop coverage you don’t need, but ensure you meet state requirements.

            Improve Safety Features
            Install anti-theft devices and safety features to lower your premium.

            Bundle Policies
            Combine home and auto insurance for a discount.

            Pay Annually
            Paying your premium yearly can save on monthly fees.

            Review Regularly
            Reassess your policy yearly to adjust coverage and potentially lower costs.
        """
    },
]

@app.route("/chat", methods=["POST"])
def chatbot():
    text = request.form.get("text")
    user_message = {
            "role": "user",
            "content": f"User's input: {text}",
    }
    messages.append(user_message)

    res = client.chat.completions.create(
        model="gpt-4o-2024-08-06",
        messages=messages,
        max_tokens=300
    )

    res_content = res.choices[0].message.content
    if "insurance" not in res_content and "car" not in res_content and "auto" not in res_content:
        return jsonify({ "response": "Ask about car insurance!"})
    
    bot_message = {"role": "assistant", "content": res_content}
    messages.append(bot_message)

    return jsonify({ "response": res_content })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)
