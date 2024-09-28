from roboflow import Roboflow
import supervision as sv
import cv2
import tempfile
import os
from dotenv import load_dotenv

load_dotenv()

rf = Roboflow(api_key=os.getenv("ROBOFLOW_API_KEY"))

project_parts = rf.workspace().project("car-parts-segmentation")
model_parts = project_parts.version(2).model

print(model_parts)

project_damage = rf.workspace().project("car-damage-detection-ha5mm")
model_damage = project_damage.version(1).model

print(model_damage)

img_path = "assets/truckdamage.jpg"

result_damage = model_damage.predict(img_path, confidence=40).json()

labels_damage = [item["class"] for item in result_damage["predictions"]]
detections_damage = sv.Detections.from_inference(result_damage)

coordinates = []
for List_Coordinates in detections_damage.xyxy:
    for item in List_Coordinates:
        item  = int(item)
        coordinates.append(item)

x1, y1, x2, y2 = coordinates

label_annotator = sv.LabelAnnotator(text_scale=0.15)
mask_annotator = sv.MaskAnnotator()

image = cv2.imread(img_path)

annotated_image_damage = mask_annotator.annotate(
    scene=image, detections=detections_damage
)

sv.plot_image(image=annotated_image_damage, size=(10, 10))