
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Brain, Camera, AlertTriangle, TrendingUp, Heart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface HealthPrediction {
  condition: string;
  probability: number;
  severity: 'low' | 'medium' | 'high';
  recommendations: string[];
  nextCheckup: string;
}

interface EmergencyHotspot {
  location: string;
  riskLevel: number;
  predictedIncidents: number;
  timeframe: string;
}

const HealthPredictor: React.FC = () => {
  const { t } = useLanguage();
  const [predictions, setPredictions] = useState<HealthPrediction[]>([]);
  const [hotspots, setHotspots] = useState<EmergencyHotspot[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [symptomImage, setSymptomImage] = useState<File | null>(null);

  useEffect(() => {
    // Simulate AI predictions
    setPredictions([
      {
        condition: 'Hypertension Risk',
        probability: 78,
        severity: 'medium',
        recommendations: ['Reduce sodium intake', 'Exercise 30 min daily', 'Monitor BP regularly'],
        nextCheckup: '2024-06-15'
      },
      {
        condition: 'Diabetes Risk',
        probability: 23,
        severity: 'low',
        recommendations: ['Maintain healthy diet', 'Regular glucose monitoring'],
        nextCheckup: '2024-07-01'
      }
    ]);

    setHotspots([
      { location: 'Kathmandu Ring Road', riskLevel: 85, predictedIncidents: 12, timeframe: 'Next 24 hours' },
      { location: 'Bhaktapur Hospital Area', riskLevel: 67, predictedIncidents: 8, timeframe: 'Next 24 hours' },
      { location: 'Lalitpur Metro', riskLevel: 45, predictedIncidents: 5, timeframe: 'Next 24 hours' }
    ]);
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSymptomImage(file);
      setIsAnalyzing(true);
      
      // Simulate AI analysis
      setTimeout(() => {
        setIsAnalyzing(false);
        // Add AI diagnosis result
      }, 3000);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* AI Health Predictions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-blue-600" />
            AI Health Risk Predictions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {predictions.map((prediction, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium">{prediction.condition}</h3>
                <Badge className={getSeverityColor(prediction.severity)}>
                  {prediction.severity} risk
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm">Risk Level:</span>
                  <Progress value={prediction.probability} className="flex-1" />
                  <span className="text-sm font-medium">{prediction.probability}%</span>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Recommendations:</p>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    {prediction.recommendations.map((rec, i) => (
                      <li key={i}>{rec}</li>
                    ))}
                  </ul>
                </div>
                <p className="text-sm text-blue-600">Next checkup: {prediction.nextCheckup}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* AI Symptom Checker */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5 text-green-600" />
            AI Symptom Checker with Image Recognition
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="symptom-image"
            />
            <label htmlFor="symptom-image" className="cursor-pointer">
              <Camera className="h-12 w-12 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-600">Upload symptom image for AI analysis</p>
            </label>
          </div>
          
          {isAnalyzing && (
            <Alert>
              <Brain className="h-4 w-4" />
              <AlertDescription>
                AI is analyzing your image... This may take a few moments.
              </AlertDescription>
            </Alert>
          )}
          
          {symptomImage && !isAnalyzing && (
            <Alert>
              <Heart className="h-4 w-4" />
              <AlertDescription>
                Analysis complete. Please consult with a healthcare professional for proper diagnosis.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Emergency Hotspot Predictions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-red-600" />
            Emergency Hotspot Predictions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {hotspots.map((hotspot, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium">{hotspot.location}</h3>
                  <p className="text-sm text-gray-600">
                    {hotspot.predictedIncidents} predicted incidents - {hotspot.timeframe}
                  </p>
                </div>
                <div className="text-right">
                  <Badge className={hotspot.riskLevel > 70 ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'}>
                    {hotspot.riskLevel}% risk
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthPredictor;
