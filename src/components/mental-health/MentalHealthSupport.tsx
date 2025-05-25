
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Brain, Heart, Smile, Frown, Phone, MessageSquare, Calendar, AlertTriangle, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useToast } from '@/hooks/use-toast';

interface MoodEntry {
  date: string;
  mood: number;
  stress: number;
  sleep: number;
  notes: string;
}

interface MentalHealthProfessional {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  nextSlot: string;
  isOnline: boolean;
  fee: number;
}

interface CrisisResource {
  name: string;
  phone: string;
  availability: string;
  description: string;
}

const MentalHealthSupport: React.FC = () => {
  const { toast } = useToast();
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);
  const [currentMood, setCurrentMood] = useState(5);
  const [currentStress, setCurrentStress] = useState(5);
  const [currentSleep, setCurrentSleep] = useState(7);
  const [moodNotes, setMoodNotes] = useState('');
  const [professionals, setProfessionals] = useState<MentalHealthProfessional[]>([]);
  const [crisisResources] = useState<CrisisResource[]>([
    {
      name: 'Mental Health Crisis Hotline',
      phone: '1660 01 12345',
      availability: '24/7',
      description: 'Immediate crisis intervention and support'
    },
    {
      name: 'Suicide Prevention Helpline',
      phone: '1660 01 67890',
      availability: '24/7',
      description: 'Confidential support for suicidal thoughts'
    },
    {
      name: 'Youth Mental Health Support',
      phone: '1660 01 11111',
      availability: 'Mon-Fri 8AM-8PM',
      description: 'Specialized support for young adults'
    }
  ]);

  useEffect(() => {
    // Generate sample mood history
    const generateMoodHistory = () => {
      const history = [];
      for (let i = 29; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        history.push({
          date: date.toISOString().split('T')[0],
          mood: Math.floor(Math.random() * 5) + 3, // 3-8 range
          stress: Math.floor(Math.random() * 6) + 2, // 2-8 range
          sleep: Math.floor(Math.random() * 4) + 5, // 5-9 range
          notes: i % 5 === 0 ? 'Had a good day with friends' : ''
        });
      }
      return history;
    };

    setMoodHistory(generateMoodHistory());

    setProfessionals([
      {
        id: '1',
        name: 'Dr. Anjana Maharjan',
        specialty: 'Clinical Psychologist',
        rating: 4.9,
        nextSlot: 'Today 3:00 PM',
        isOnline: true,
        fee: 3500
      },
      {
        id: '2',
        name: 'Dr. Suresh Bhattarai',
        specialty: 'Psychiatrist',
        rating: 4.8,
        nextSlot: 'Tomorrow 10:00 AM',
        isOnline: false,
        fee: 5000
      },
      {
        id: '3',
        name: 'Counselor Nisha Poudel',
        specialty: 'Marriage & Family Therapist',
        rating: 4.7,
        nextSlot: 'Today 5:30 PM',
        isOnline: true,
        fee: 2500
      }
    ]);
  }, []);

  const saveMoodEntry = () => {
    const newEntry: MoodEntry = {
      date: new Date().toISOString().split('T')[0],
      mood: currentMood,
      stress: currentStress,
      sleep: currentSleep,
      notes: moodNotes
    };

    setMoodHistory(prev => {
      const filtered = prev.filter(entry => entry.date !== newEntry.date);
      return [...filtered, newEntry].sort((a, b) => a.date.localeCompare(b.date));
    });

    setMoodNotes('');
    
    toast({
      title: "Mood Logged",
      description: "Your daily mood and wellness data has been saved."
    });

    // AI Analysis Alert
    if (currentMood <= 3 || currentStress >= 8) {
      toast({
        title: "Wellness Check",
        description: "Your recent entries suggest you might benefit from professional support. Consider reaching out to a counselor.",
        variant: "destructive"
      });
    }
  };

  const bookCounseling = (professionalId: string) => {
    const professional = professionals.find(p => p.id === professionalId);
    if (professional) {
      toast({
        title: "Session Booked",
        description: `Your appointment with ${professional.name} has been scheduled.`
      });
    }
  };

  const getMoodEmoji = (mood: number) => {
    if (mood <= 2) return '😢';
    if (mood <= 4) return '😔';
    if (mood <= 6) return '😐';
    if (mood <= 8) return '🙂';
    return '😊';
  };

  const getStressLevel = (stress: number) => {
    if (stress <= 3) return { label: 'Low', color: 'text-green-600' };
    if (stress <= 6) return { label: 'Moderate', color: 'text-yellow-600' };
    return { label: 'High', color: 'text-red-600' };
  };

  const averageMood = moodHistory.length > 0 
    ? moodHistory.reduce((sum, entry) => sum + entry.mood, 0) / moodHistory.length 
    : 0;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            Mental Health Support Center
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="mood">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="mood">Mood Tracking</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="counseling">Counseling</TabsTrigger>
              <TabsTrigger value="crisis">Crisis Support</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>

            <TabsContent value="mood" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Daily Mood Check-in</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label className="text-base font-medium mb-3 block">
                      How are you feeling today? {getMoodEmoji(currentMood)}
                    </Label>
                    <div className="space-y-2">
                      <Slider
                        value={[currentMood]}
                        onValueChange={(value) => setCurrentMood(value[0])}
                        max={10}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Very Sad</span>
                        <span>Neutral</span>
                        <span>Very Happy</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-base font-medium mb-3 block">
                      Stress Level: <span className={getStressLevel(currentStress).color}>
                        {getStressLevel(currentStress).label}
                      </span>
                    </Label>
                    <div className="space-y-2">
                      <Slider
                        value={[currentStress]}
                        onValueChange={(value) => setCurrentStress(value[0])}
                        max={10}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Very Relaxed</span>
                        <span>Moderate</span>
                        <span>Very Stressed</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-base font-medium mb-3 block">
                      Sleep Quality: {currentSleep} hours
                    </Label>
                    <div className="space-y-2">
                      <Slider
                        value={[currentSleep]}
                        onValueChange={(value) => setCurrentSleep(value[0])}
                        max={12}
                        min={3}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>3 hours</span>
                        <span>7-8 hours</span>
                        <span>12 hours</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="mood-notes">Additional Notes (Optional)</Label>
                    <Textarea
                      id="mood-notes"
                      placeholder="What's influencing your mood today?"
                      value={moodNotes}
                      onChange={(e) => setMoodNotes(e.target.value)}
                    />
                  </div>

                  <Button onClick={saveMoodEntry} className="w-full">
                    Log Today's Mood
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <Smile className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold">{averageMood.toFixed(1)}/10</div>
                    <p className="text-sm text-gray-600">Average Mood</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold">7</div>
                    <p className="text-sm text-gray-600">Day Streak</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Heart className="h-8 w-8 text-red-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold">85%</div>
                    <p className="text-sm text-gray-600">Wellness Score</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>30-Day Mood & Wellness Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={moodHistory}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis domain={[0, 10]} />
                        <Tooltip />
                        <Line type="monotone" dataKey="mood" stroke="#10b981" name="Mood" />
                        <Line type="monotone" dataKey="stress" stroke="#ef4444" name="Stress" />
                        <Line type="monotone" dataKey="sleep" stroke="#3b82f6" name="Sleep Hours" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="counseling" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {professionals.map((professional) => (
                  <Card key={professional.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-medium">{professional.name}</h3>
                          <p className="text-sm text-gray-600">{professional.specialty}</p>
                        </div>
                        {professional.isOnline && (
                          <Badge className="bg-green-100 text-green-800">Online</Badge>
                        )}
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <span>Rating:</span>
                          <span className="font-medium">{professional.rating}/5</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{professional.nextSlot}</span>
                        </div>
                        <div className="text-lg font-semibold">NPR {professional.fee}</div>
                      </div>
                      
                      <div className="flex gap-2 mt-4">
                        <Button 
                          size="sm" 
                          className="flex-1"
                          onClick={() => bookCounseling(professional.id)}
                        >
                          Book Session
                        </Button>
                        {professional.isOnline && (
                          <Button size="sm" variant="outline">
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="crisis" className="space-y-4">
              <Card className="border-red-200 bg-red-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-800">
                    <AlertTriangle className="h-5 w-5" />
                    Crisis Support - Available 24/7
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-red-700 mb-4">
                    If you're having thoughts of self-harm or suicide, please reach out immediately. 
                    You're not alone, and help is available.
                  </p>
                  <div className="space-y-3">
                    {crisisResources.map((resource, index) => (
                      <div key={index} className="bg-white p-4 rounded-lg border">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium">{resource.name}</h3>
                          <Badge variant="outline">{resource.availability}</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{resource.description}</p>
                        <Button className="w-full bg-red-600 hover:bg-red-700">
                          <Phone className="h-4 w-4 mr-2" />
                          Call {resource.phone}
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="resources" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Self-Help Tools</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      Breathing Exercises
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Meditation Guide
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Anxiety Management
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Sleep Hygiene Tips
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Educational Resources</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      Understanding Depression
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Managing Stress
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Building Resilience
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Healthy Relationships
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default MentalHealthSupport;
