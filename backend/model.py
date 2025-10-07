import torch
import torch.nn as nn

MODEL = "tumor.pth"

class CNN(nn.Module):
  def __init__(self,in_chanels= 3,out_channels= 2):
    super(CNN,self).__init__()
    self.features = nn.Sequential(
        nn.Conv2d(in_chanels,32,kernel_size= 3,padding = "same"),
        nn.ReLU(),
        nn.BatchNorm2d(32),
        nn.MaxPool2d(kernel_size= 3, stride= 2),

        nn.Conv2d(32,64,kernel_size= 3,padding = "same"),
        nn.ReLU(),
        nn.BatchNorm2d(64),
        nn.MaxPool2d(kernel_size= 3,stride= 2),

        nn.Conv2d(64,128,kernel_size= 3,padding = "same"),
        nn.ReLU(),
        nn.BatchNorm2d(128),
        nn.MaxPool2d(kernel_size= 3),


        nn.Conv2d(128,256,kernel_size= 3,padding = "same"),
        nn.ReLU(),
        nn.BatchNorm2d(256),
        nn.MaxPool2d(kernel_size= 3)

    )

    self.classifier = nn.Sequential(
        nn.AdaptiveAvgPool2d(output_size=(1,1)),
        nn.Flatten(),

        # First layer
        nn.Linear(256,64),
        nn.ReLU(True),
        nn.Dropout(0.5),

        # Second Layer
        nn.Linear(64,32),
        nn.ReLU(True),
        nn.Dropout(0.5),

        # Final layer
        nn.Linear(32,out_channels)
    )

  def forward(self,x):
    x = self.features(x)
    x = self.classifier(x)
    return x

# Model loading code removed to avoid conflicts with app.py
