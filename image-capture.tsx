import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, Upload, FolderOpen, CheckCircle, Lightbulb } from "lucide-react";
import { CameraModal } from "./camera-modal";

interface ImageCaptureProps {
  onImageCapture: (imageData: string, file?: File) => void;
  disabled?: boolean;
}

export function ImageCapture({ onImageCapture, disabled }: ImageCaptureProps) {
  const [showCameraModal, setShowCameraModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target?.result as string;
        onImageCapture(imageData, file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = (imageData: string) => {
    onImageCapture(imageData);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <Card className="mb-8">
        <CardContent className="p-6 sm:p-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Camera Capture */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                <Camera className="text-forest mr-3" />
                Take Photo
              </h3>
              <div 
                className="bg-gray-100 rounded-xl p-8 text-center border-2 border-dashed border-gray-300 hover:border-forest transition-colors cursor-pointer"
                onClick={() => !disabled && setShowCameraModal(true)}
              >
                <Camera className="text-4xl text-gray-400 mb-4 mx-auto" />
                <p className="text-gray-600 font-medium">Click to open camera</p>
                <p className="text-sm text-gray-500 mt-2">Best for mobile devices</p>
              </div>
              <Button
                className="w-full bg-forest hover:bg-forest/90 text-white"
                onClick={() => setShowCameraModal(true)}
                disabled={disabled}
              >
                <Camera className="h-4 w-4 mr-2" />
                Open Camera
              </Button>
            </div>

            {/* File Upload */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                <Upload className="text-forest mr-3" />
                Upload Image
              </h3>
              <div 
                className="bg-gray-100 rounded-xl p-8 text-center border-2 border-dashed border-gray-300 hover:border-forest transition-colors cursor-pointer"
                onClick={openFileDialog}
              >
                <Upload className="text-4xl text-gray-400 mb-4 mx-auto" />
                <p className="text-gray-600 font-medium">Drop image here or click to browse</p>
                <p className="text-sm text-gray-500 mt-2">JPG, PNG up to 10MB</p>
              </div>
              <Button
                className="w-full bg-leaf hover:bg-leaf/90 text-white"
                onClick={openFileDialog}
                disabled={disabled}
              >
                <FolderOpen className="h-4 w-4 mr-2" />
                Browse Files
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          </div>

          {/* Tips Section */}
          <div className="mt-8 bg-blue-50 rounded-xl p-6">
            <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
              <Lightbulb className="mr-2" />
              Tips for Better Results
            </h4>
            <ul className="space-y-2 text-blue-800">
              <li className="flex items-start">
                <CheckCircle className="mt-1 mr-3 text-blue-600 h-4 w-4 flex-shrink-0" />
                <span>Take clear, well-lit photos of affected plant parts</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="mt-1 mr-3 text-blue-600 h-4 w-4 flex-shrink-0" />
                <span>Include both healthy and diseased areas when possible</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="mt-1 mr-3 text-blue-600 h-4 w-4 flex-shrink-0" />
                <span>Avoid blurry images or extreme close-ups</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <CameraModal
        open={showCameraModal}
        onOpenChange={setShowCameraModal}
        onCapture={handleCameraCapture}
      />
    </>
  );
}
