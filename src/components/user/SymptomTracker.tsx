
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { SliderProps } from '@/components/ui/slider';
import { Slider } from '@/components/ui/slider';
import { CheckCircle, Clock, PlusCircle, Brain, MessageCircle, AlignLeft, MoveUpRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const symptomOptions = [
  'Headache', 'Fever', 'Cough', 'Fatigue', 
  'Nausea', 'Body Ache', 'Sore Throat', 'Chills',
  'Shortness of Breath', 'Congestion', 'Loss of Taste', 'Loss of Smell'
];

const SymptomTracker = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [severityLevels, setSeverityLevels] = useState<Record<string, number>>({});
  const [description, setDescription] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSymptomToggle = (symptom: string) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
      const newSeverityLevels = { ...severityLevels };
      delete newSeverityLevels[symptom];
      setSeverityLevels(newSeverityLevels);
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
      setSeverityLevels({ ...severityLevels, [symptom]: 5 });
    }
  };

  const handleSeverityChange = (symptom: string, value: number[]) => {
    setSeverityLevels({ ...severityLevels, [symptom]: value[0] });
  };

  const analyzeSymptoms = () => {
    if (selectedSymptoms.length === 0) {
      toast({
        title: "No Symptoms Selected",
        description: "Please select at least one symptom to analyze.",
        variant: "destructive"
      });
      return;
    }

    setAnalyzing(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setAnalyzing(false);
      
      // Mock analysis response
      const possibleConditions = [
        { name: "Common Cold", probability: "High", urgency: "Low" },
        { name: "Seasonal Allergies", probability: "Medium", urgency: "Low" },
        { name: "Flu", probability: "Medium", urgency: "Medium" }
      ];
      
      setAnalysis(JSON.stringify(possibleConditions));
      
      toast({
        title: "Analysis Complete",
        description: "Your symptoms have been analyzed.",
      });
    }, 2000);
  };

  const clearForm = () => {
    setSelectedSymptoms([]);
    setSeverityLevels({});
    setDescription('');
    setAnalysis(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain size={18} className="mr-2 text-indigo-500" />
            AI Health Assistant
          </CardTitle>
          <CardDescription>
            Track your symptoms and get AI-powered health insights
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-2 flex items-center">
                <PlusCircle size={14} className="mr-1 text-indigo-500" /> 
                Select Your Symptoms
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {symptomOptions.map(symptom => (
                  <Button
                    key={symptom}
                    variant={selectedSymptoms.includes(symptom) ? "default" : "outline"}
                    className={`justify-start h-auto py-2 px-3 transition-all ${
                      selectedSymptoms.includes(symptom) ? "bg-indigo-100 text-indigo-700 hover:bg-indigo-200 border-indigo-200" : ""
                    }`}
                    onClick={() => handleSymptomToggle(symptom)}
                  >
                    {selectedSymptoms.includes(symptom) && (
                      <CheckCircle size={14} className="mr-1" />
                    )}
                    {symptom}
                  </Button>
                ))}
              </div>
            </div>
            
            {selectedSymptoms.length > 0 && (
              <div>
                <h3 className="text-sm font-medium mb-3 flex items-center">
                  <MoveUpRight size={14} className="mr-1 text-indigo-500" /> 
                  Rate Your Symptom Severity
                </h3>
                <div className="space-y-4">
                  {selectedSymptoms.map(symptom => (
                    <div key={`severity-${symptom}`} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{symptom}</span>
                        <span className="font-medium">{severityLevels[symptom] || 5}/10</span>
                      </div>
                      <Slider
                        defaultValue={[severityLevels[symptom] || 5]}
                        min={1}
                        max={10}
                        step={1}
                        onValueChange={(value) => handleSeverityChange(symptom, value)}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Mild</span>
                        <span>Severe</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div>
              <h3 className="text-sm font-medium mb-2 flex items-center">
                <AlignLeft size={14} className="mr-1 text-indigo-500" /> 
                Additional Information
              </h3>
              <Textarea
                placeholder="Describe when your symptoms started, any relevant medical history, etc."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
            
            {analysis && (
              <Card className="border-indigo-200 bg-indigo-50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center text-indigo-700">
                    <MessageCircle size={16} className="mr-1" />
                    AI Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm">Based on your symptoms, you may be experiencing:</p>
                    <div className="space-y-2">
                      {JSON.parse(analysis).map((condition: any, idx: number) => (
                        <div key={idx} className="bg-white p-2 rounded-md border border-indigo-100">
                          <div className="flex justify-between">
                            <p className="font-medium">{condition.name}</p>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              condition.probability === 'High' 
                                ? 'bg-red-100 text-red-700' 
                                : 'bg-amber-100 text-amber-700'
                            }`}>
                              {condition.probability} probability
                            </span>
                          </div>
                          <div className="flex justify-between mt-1">
                            <p className="text-xs text-muted-foreground">Urgency:</p>
                            <span className={`text-xs font-medium ${
                              condition.urgency === 'High' 
                                ? 'text-red-600' 
                                : condition.urgency === 'Medium'
                                ? 'text-amber-600'
                                : 'text-green-600'
                            }`}>
                              {condition.urgency}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      This is not a medical diagnosis. Please consult with a healthcare professional for proper evaluation.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
        
        <CardFooter className="flex gap-2 justify-between">
          <Button
            variant="outline"
            onClick={clearForm}
            disabled={analyzing}
          >
            Clear
          </Button>
          <Button
            onClick={analyzeSymptoms}
            disabled={analyzing || selectedSymptoms.length === 0}
            className="min-w-[150px]"
          >
            {analyzing ? (
              <>
                <Clock size={14} className="mr-1 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Brain size={14} className="mr-1" />
                Analyze Symptoms
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SymptomTracker;
