# Brain Tumor Detection AI

A deep learning web application that uses Convolutional Neural Networks (CNN) to detect brain tumors from MRI/CT scan images.

## 🧠 Features

- **AI-Powered Detection**: Uses a trained CNN model to analyze brain scan images
- **Web Interface**: Modern, dark-themed user interface for easy image upload
- **Real-time Analysis**: Get instant predictions with detailed results
- **Multiple Image Formats**: Supports PNG, JPG, JPEG, GIF, and BMP files
- **Responsive Design**: Works on desktop and mobile devices

## 🏗️ Project Structure

```
cnn_for_BrainTumor/
├── backend/
│   ├── app.py              # Flask backend server
│   ├── model.py            # CNN model definition
│   ├── tumor.pth           # Trained model weights
│   └── requirements.txt    # Python dependencies
├── frontend/
│   ├── templates/
│   │   └── index.html      # Main web interface
│   └── static/
│       ├── css/
│       │   └── style.css   # Dark theme styling
│       └── js/
│           └── script.js   # Frontend functionality
├── brain_tumor_dataset/    # Training dataset
│   ├── yes/               # Tumor images
│   └── no/                # Normal images
└── README.md
```

## 🚀 Installation & Setup

### Prerequisites
- Python 3.8 or higher
- pip package manager

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/cnn_for_BrainTumor.git
cd cnn_for_BrainTumor
```

### 2. Create Virtual Environment
```bash
python -m venv venv
```

### 3. Activate Virtual Environment

**Windows:**
```bash
venv\Scripts\activate
```

**macOS/Linux:**
```bash
source venv/bin/activate
```

### 4. Install Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### 5. Run the Application
```bash
python app.py
```

### 6. Access the Application
Open your web browser and navigate to:
```
http://127.0.0.1:5000
```

## 🧪 Usage

1. **Upload Image**: Click "Choose Image File" or drag and drop a brain scan image
2. **Analyze**: Click "Analyze Image" to get the AI prediction
3. **View Results**: See whether the image shows "Tumor" or "No Tumor"

## 🔬 Model Details

- **Architecture**: Custom CNN with 4 convolutional layers
- **Input Size**: 128x128 pixels
- **Classes**: 2 (Tumor, No Tumor)
- **Dataset**: Brain tumor MRI/CT scans
- **Training**: PyTorch framework

### Model Architecture:
```
CNN(
  features: Sequential(
    Conv2d(3, 32) -> ReLU -> BatchNorm -> MaxPool
    Conv2d(32, 64) -> ReLU -> BatchNorm -> MaxPool
    Conv2d(64, 128) -> ReLU -> BatchNorm -> MaxPool
    Conv2d(128, 256) -> ReLU -> BatchNorm -> MaxPool
  )
  classifier: Sequential(
    AdaptiveAvgPool2d -> Flatten
    Linear(256, 64) -> ReLU -> Dropout(0.5)
    Linear(64, 32) -> ReLU -> Dropout(0.5)
    Linear(32, 2)
  )
)
```

## 📊 Dataset Information

- **Total Images**: 252
- **Tumor Images**: 154
- **Normal Images**: 98
- **Class Distribution**: ~61% tumor, ~39% normal

## ⚠️ Important Notes

- **Medical Disclaimer**: This tool is for educational and research purposes only
- **Not for Medical Diagnosis**: Do not use as a substitute for professional medical advice
- **Class Imbalance**: The model may show bias due to imbalanced training data
- **Accuracy**: Results should be interpreted with caution and professional validation

## 🛠️ Technical Stack

### Backend
- **Python 3.8+**
- **Flask**: Web framework
- **PyTorch**: Deep learning framework
- **PIL/Pillow**: Image processing
- **Torchvision**: Computer vision utilities

### Frontend
- **HTML5**: Structure
- **CSS3**: Dark theme styling with modern design
- **JavaScript**: Interactive functionality
- **Font Awesome**: Icons

## 🔧 API Endpoints

### POST `/predict`
Upload and analyze a brain scan image.

**Request:**
- Method: POST
- Content-Type: multipart/form-data
- Body: Image file

**Response:**
```json
{
  "prediction": "Tumor" | "No Tumor",
  "success": true
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

- **GitHub**: [Your GitHub Profile](https://github.com/yourusername)
- **Email**: your.email@example.com

## 🙏 Acknowledgments

- Dataset contributors for providing brain scan images
- PyTorch team for the excellent deep learning framework
- Flask community for the web framework
- All open-source contributors who made this project possible

---

**⚠️ Medical Disclaimer**: This application is intended for educational and research purposes only. It should not be used for actual medical diagnosis or treatment decisions. Always consult with qualified healthcare professionals for medical advice.
