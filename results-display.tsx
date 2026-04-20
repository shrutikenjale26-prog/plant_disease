import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Sprout, TriangleAlert, Clock, ShieldAlert, CheckCircle, Camera, Download, Share2, Edit, AlertCircle } from "lucide-react";
import { useState } from "react";
import type { PlantAnalysis } from "@shared/schema";

interface ResultsDisplayProps {
  analysis: PlantAnalysis;
  onAnalyzeAnother: () => void;
}

export function ResultsDisplay({ analysis, onAnalyzeAnother }: ResultsDisplayProps) {
  const [correctionOpen, setCorrectionOpen] = useState(false);
  const [correctPlantName, setCorrectPlantName] = useState("");
  const [correctScientificName, setCorrectScientificName] = useState("");
  const [submittingCorrection, setSubmittingCorrection] = useState(false);
  const getSeverityColor = (severity: string | null) => {
    switch (severity) {
      case 'low': return 'bg-yellow-50 text-yellow-900';
      case 'moderate': return 'bg-orange-50 text-orange-900';
      case 'high': return 'bg-red-50 text-red-900';
      case 'critical': return 'bg-red-100 text-red-900';
      default: return 'bg-gray-50 text-gray-900';
    }
  };

  const getSeverityDots = (severity: string | null) => {
    const levels = ['low', 'moderate', 'high', 'critical'];
    const currentLevel = levels.indexOf(severity || '') + 1;
    
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className={`w-3 h-3 rounded-full ${
              level <= currentLevel
                ? severity === 'low' ? 'bg-yellow-500' :
                  severity === 'moderate' ? 'bg-orange-500' :
                  'bg-red-500'
                : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const handleSaveReport = () => {
    // Generate and download report
    const reportData = {
      plant: analysis.plantName,
      disease: analysis.diseaseDetected,
      timestamp: new Date().toLocaleDateString(),
      analysis
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `plant-analysis-${analysis.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSubmitCorrection = async () => {
    if (!correctPlantName.trim()) return;
    
    setSubmittingCorrection(true);
    try {
      // In a real implementation, this would submit the correction to improve the AI model
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      // Show success message
      alert("Thank you for the correction! This will help improve our plant identification.");
      setCorrectionOpen(false);
      setCorrectPlantName("");
      setCorrectScientificName("");
    } catch (error) {
      alert("Failed to submit correction. Please try again.");
    }
    setSubmittingCorrection(false);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Plant Analysis Results',
          text: `My ${analysis.plantName} analysis${analysis.diseaseDetected ? ` detected ${analysis.diseaseDetected}` : ' shows healthy plant'}.`,
          url: window.location.href
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      const shareText = `Plant Analysis: ${analysis.plantName}${analysis.diseaseDetected ? ` - ${analysis.diseaseDetected} detected` : ' - Healthy'}`;
      navigator.clipboard.writeText(shareText);
    }
  };

  return (
    <div className="space-y-8">
      {/* Plant Identification Result */}
      <Card>
        <CardContent className="p-6 sm:p-8">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-leaf rounded-full flex items-center justify-center mr-4">
              <Sprout className="text-white text-xl" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Plant Identified</h3>
              <p className="text-gray-600">Analysis completed successfully</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <img
                src={analysis.imageUrl}
                alt="Analyzed plant"
                className="w-full h-64 object-cover rounded-xl shadow-md"
              />
              <p className="text-sm text-gray-500 mt-2 text-center">Your uploaded image</p>
            </div>
            
            <div className="space-y-4">
              <div className="bg-green-50 rounded-xl p-6">
                <h4 className="font-semibold text-green-900 mb-2">{analysis.plantName}</h4>
                <p className="text-green-800 text-sm mb-3">{analysis.plantScientificName}</p>
                <div className="flex items-center mb-3">
                  <span className="text-green-700 text-sm font-medium">Confidence:</span>
                  <div className="ml-3 flex-1 bg-green-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all duration-1000" 
                      style={{ width: `${analysis.plantConfidence}%` }}
                    />
                  </div>
                  <span className="ml-3 text-green-700 text-sm font-semibold">{analysis.plantConfidence}%</span>
                </div>
                <p className="text-green-800 text-sm">{analysis.plantDescription}</p>
                
                {/* Plant Identification Correction */}
                <div className="mt-4 pt-4 border-t border-green-200">
                  <div className="flex items-center justify-between">
                    <p className="text-green-700 text-sm">Is this identification correct?</p>
                    <Dialog open={correctionOpen} onOpenChange={setCorrectionOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="border-green-300 text-green-700 hover:bg-green-100">
                          <Edit className="h-4 w-4 mr-2" />
                          Report Issue
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle className="flex items-center">
                            <AlertCircle className="h-5 w-5 mr-2 text-orange-500" />
                            Correct Plant Identification
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <p className="text-sm text-gray-600">
                            Help us improve by providing the correct plant identification:
                          </p>
                          <div className="space-y-3">
                            <div>
                              <Label htmlFor="correctName">Correct Plant Name</Label>
                              <Input
                                id="correctName"
                                value={correctPlantName}
                                onChange={(e) => setCorrectPlantName(e.target.value)}
                                placeholder="e.g., Sunflower"
                              />
                            </div>
                            <div>
                              <Label htmlFor="correctScientific">Scientific Name (Optional)</Label>
                              <Input
                                id="correctScientific"
                                value={correctScientificName}
                                onChange={(e) => setCorrectScientificName(e.target.value)}
                                placeholder="e.g., Helianthus annuus"
                              />
                            </div>
                          </div>
                          <div className="flex justify-end space-x-2">
                            <Button 
                              variant="outline" 
                              onClick={() => setCorrectionOpen(false)}
                              disabled={submittingCorrection}
                            >
                              Cancel
                            </Button>
                            <Button 
                              onClick={handleSubmitCorrection}
                              disabled={!correctPlantName.trim() || submittingCorrection}
                            >
                              {submittingCorrection ? "Submitting..." : "Submit Correction"}
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Disease Detection Result */}
      {analysis.diseaseDetected ? (
        <Card>
          <CardContent className="p-6 sm:p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-warning rounded-full flex items-center justify-center mr-4">
                <TriangleAlert className="text-white text-xl" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Disease Detected</h3>
                <p className="text-gray-600">Found 1 potential disease</p>
              </div>
            </div>

            <div className={`rounded-xl p-6 mb-6 ${getSeverityColor(analysis.diseaseSeverity)}`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-lg mb-2">{analysis.diseaseDetected}</h4>
                  <p className="text-sm mb-3">{analysis.diseaseScientificName}</p>
                  <div className="flex items-center mb-4">
                    <span className="text-sm font-medium">Severity:</span>
                    <div className="ml-3">
                      {getSeverityDots(analysis.diseaseSeverity)}
                    </div>
                    <span className="ml-3 text-sm font-semibold capitalize">{analysis.diseaseSeverity}</span>
                  </div>
                  <p className="text-sm">{analysis.diseaseDescription}</p>
                </div>
              </div>
            </div>

            {/* Treatment Recommendations */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Immediate Actions */}
              {analysis.immediateActions && analysis.immediateActions.length > 0 && (
                <div className="bg-orange-50 rounded-xl p-6">
                  <h5 className="font-semibold text-orange-900 mb-4 flex items-center">
                    <Clock className="mr-2" />
                    Immediate Actions
                  </h5>
                  <ul className="space-y-3">
                    {analysis.immediateActions.map((action, index) => (
                      <li key={index} className="flex items-start text-orange-800">
                        <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0" />
                        <span className="text-sm">{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Treatment Options */}
              {analysis.treatmentOptions && analysis.treatmentOptions.length > 0 && (
                <div className="bg-blue-50 rounded-xl p-6">
                  <h5 className="font-semibold text-blue-900 mb-4 flex items-center">
                    <ShieldAlert className="mr-2" />
                    Treatment Options
                  </h5>
                  <ul className="space-y-3">
                    {analysis.treatmentOptions.map((option, index) => (
                      <li key={index} className="flex items-start text-blue-800">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0" />
                        <span className="text-sm">{option}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Prevention Tips */}
            {analysis.preventionTips && analysis.preventionTips.length > 0 && (
              <div className="mt-6 bg-green-50 rounded-xl p-6">
                <h5 className="font-semibold text-green-900 mb-4 flex items-center">
                  <CheckCircle className="mr-2" />
                  Prevention for Future
                </h5>
                <div className="grid sm:grid-cols-2 gap-4">
                  {analysis.preventionTips.map((tip, index) => (
                    <div key={index} className="flex items-start text-green-800">
                      <CheckCircle className="text-green-600 text-sm mt-1 mr-3 flex-shrink-0" />
                      <span className="text-sm">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-6 sm:p-8">
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-green-600 text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Healthy Plant Detected</h3>
              <p className="text-gray-600">No diseases or issues were found in your plant image.</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          className="flex-1 bg-forest hover:bg-forest/90 text-white"
          onClick={onAnalyzeAnother}
        >
          <Camera className="h-4 w-4 mr-2" />
          Analyze Another Plant
        </Button>
        <Button
          variant="outline"
          className="flex-1 border-forest text-forest hover:bg-forest/5"
          onClick={handleSaveReport}
        >
          <Download className="h-4 w-4 mr-2" />
          Save Report
        </Button>
        <Button
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
          onClick={handleShare}
        >
          <Share2 className="h-4 w-4 mr-2" />
          Share Results
        </Button>
      </div>
    </div>
  );
}
