import io
import torch
import torch.nn as nn
from PIL import Image
from torchvision import transforms
from flask import Flask, request, jsonify, render_template
from model import CNN
import os

app = Flask(__name__, template_folder='../frontend/templates', static_folder='../frontend/static')

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
MODEL_PATH = "tumor.pth"

# Load model
model = CNN().to(device)
model.load_state_dict(torch.load(MODEL_PATH, map_location=device))
model.eval()

# Define image preprocessing (adjust as needed for your model)
preprocess = transform = transforms.Compose([
    transforms.Resize((128,128)),
    transforms.RandomHorizontalFlip(),
    transforms.RandomRotation(10),
    transforms.ColorJitter(brightness=0.2, contrast=0.2),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.5,0.5,0.5], std=[0.5,0.5,0.5])
])

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file uploaded'}), 400
        
        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        # Check file type
        if not file.filename.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.bmp')):
            return jsonify({'error': 'Please upload a valid image file (PNG, JPG, JPEG, GIF, BMP)'}), 400
        
        # Read and process image
        img_bytes = file.read()
        if len(img_bytes) == 0:
            return jsonify({'error': 'Empty file uploaded'}), 400
        
        img = Image.open(io.BytesIO(img_bytes)).convert('RGB')
        input_tensor = preprocess(img).unsqueeze(0).to(device)
        
        # Make prediction
        with torch.no_grad():
            output = model(input_tensor)
            _, predicted = torch.max(output, 1)
            label = 'Tumor' if predicted.item() == 1 else 'No Tumor'
            
        return jsonify({'prediction': label, 'success': True})
        
    except Exception as e:
        print(f"Error during analysis: {str(e)}")
        return jsonify({'error': f'Error processing image: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True)
