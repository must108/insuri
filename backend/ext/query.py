from openai import OpenAI
import base64
from dotenv import load_dotenv
import os

load_dotenv()

with open("assets/scratch5.jpeg", "rb") as image_file:
    base64_image = base64.b64encode(image_file.read()).decode("utf-8")

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

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

res = client.chat.completions.create(
    model="gpt-4o-2024-08-06",
    messages=messages,
    max_tokens=300,
)

print(res.choices[0].message.content)
