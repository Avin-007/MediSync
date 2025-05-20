import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { Heart, Activity, Clock, Droplet, ScrollText, TrendingUp } from 'lucide-react';

const HealthOverview = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Heart className="mr-2 text-red-500" size={18} />
              Heart Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">72 BPM</div>
            <div className="text-sm text-muted-foreground mt-1">Normal</div>
            <div className="mt-4">
              <Progress value={72} className="h-1.5" />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>50</span>
              <span>75</span>
              <span>100</span>
              <span>125</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Activity className="mr-2 text-blue-500" size={18} />
              Blood Pressure
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">120/80</div>
            <div className="text-sm text-muted-foreground mt-1">Normal</div>
            <div className="mt-4 space-y-1">
              <div>
                <div className="flex justify-between text-xs">
                  <span>Systolic</span>
                  <span className="font-medium">120 mmHg</span>
                </div>
                <Progress value={70} className="h-1.5" />
              </div>
              <div>
                <div className="flex justify-between text-xs">
                  <span>Diastolic</span>
                  <span className="font-medium">80 mmHg</span>
                </div>
                <Progress value={60} className="h-1.5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Droplet className="mr-2 text-indigo-500" size={18} />
              Blood Glucose
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">98 mg/dL</div>
            <div className="text-sm text-muted-foreground mt-1">Normal</div>
            <div className="mt-4">
              <Progress value={60} className="h-1.5" />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>70</span>
              <span>100</span>
              <span>130</span>
              <span>180</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>Health Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center border-2 border-dashed rounded-md">
              <div className="text-center p-4 text-muted-foreground">
                <TrendingUp size={24} className="mx-auto mb-2" />
                <p>Health trend visualization will be displayed here</p>
                <p className="text-sm">Connect your devices to see your health data</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-start p-3 bg-muted/50 rounded-md">
              <div>
                <h4 className="font-medium">Dr. Robert Chen</h4>
                <p className="text-sm text-muted-foreground">Cardiology</p>
                <div className="flex items-center mt-1 text-xs text-muted-foreground">
                  <Clock size={12} className="mr-1" />
                  <span>May 24, 2025 - 10:30 AM</span>
                </div>
              </div>
              <Button variant="outline" size="sm">Reschedule</Button>
            </div>

            <div className="flex justify-between items-start p-3 bg-muted/50 rounded-md">
              <div>
                <h4 className="font-medium">Dr. Sarah Johnson</h4>
                <p className="text-sm text-muted-foreground">General Checkup</p>
                <div className="flex items-center mt-1 text-xs text-muted-foreground">
                  <Clock size={12} className="mr-1" />
                  <span>Jun 15, 2025 - 2:00 PM</span>
                </div>
              </div>
              <Button variant="outline" size="sm">Reschedule</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Medications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between p-3 bg-muted/50 rounded-md">
              <div>
                <h4 className="font-medium">Lisinopril</h4>
                <p className="text-xs text-muted-foreground">10mg - Once daily</p>
                <div className="flex items-center mt-1 text-xs">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                  <span className="text-green-600">Refills: 3 remaining</span>
                </div>
              </div>
              <Button variant="outline" size="sm">Refill</Button>
            </div>

            <div className="flex justify-between p-3 bg-muted/50 rounded-md">
              <div>
                <h4 className="font-medium">Atorvastatin</h4>
                <p className="text-xs text-muted-foreground">20mg - Once daily at bedtime</p>
                <div className="flex items-center mt-1 text-xs">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mr-1"></div>
                  <span className="text-amber-600">Refills: 1 remaining</span>
                </div>
              </div>
              <Button variant="outline" size="sm">Refill</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HealthOverview;
