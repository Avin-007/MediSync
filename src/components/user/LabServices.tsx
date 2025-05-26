
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  TestTube, 
  Calendar, 
  MapPin, 
  Clock, 
  FileText, 
  Download,
  CheckCircle,
  Truck
} from 'lucide-react';

const LabServices = () => {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [address, setAddress] = useState('');

  const labTests = [
    { id: 1, name: 'Complete Blood Count (CBC)', price: 800, duration: '2-4 hours' },
    { id: 2, name: 'Lipid Profile', price: 1200, duration: '4-6 hours' },
    { id: 3, name: 'Thyroid Function Test', price: 1500, duration: '6-8 hours' },
    { id: 4, name: 'Diabetes Panel', price: 1000, duration: '2-3 hours' },
    { id: 5, name: 'Liver Function Test', price: 900, duration: '4-6 hours' },
    { id: 6, name: 'Kidney Function Test', price: 1100, duration: '4-6 hours' },
    { id: 7, name: 'Vitamin D Test', price: 1800, duration: '24 hours' },
    { id: 8, name: 'COVID-19 RT-PCR', price: 2000, duration: '6-8 hours' }
  ];

  const recentReports = [
    { 
      id: 1, 
      testName: 'Complete Blood Count', 
      date: '2024-01-15', 
      status: 'ready',
      reportUrl: '#'
    },
    { 
      id: 2, 
      testName: 'Lipid Profile', 
      date: '2024-01-10', 
      status: 'ready',
      reportUrl: '#'
    },
    { 
      id: 3, 
      testName: 'Thyroid Function', 
      date: '2024-01-12', 
      status: 'processing',
      reportUrl: null
    }
  ];

  const handleHomeCollection = (testId: number) => {
    if (!selectedDate || !selectedTime || !address) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields for home collection",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Sample Collection Scheduled",
      description: `Home collection scheduled for ${selectedDate} at ${selectedTime}. Our phlebotomist will contact you shortly.`,
    });
  };

  const handleReportDownload = (reportId: number) => {
    toast({
      title: "Report Downloaded",
      description: "Your lab report has been downloaded successfully.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Lab Test Booking */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TestTube size={20} />
            Book Lab Tests
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {labTests.map((test) => (
              <Card key={test.id} className="border">
                <CardContent className="p-4">
                  <h4 className="font-medium mb-2">{test.name}</h4>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-lg font-bold text-green-600">₹{test.price}</span>
                    <Badge variant="outline">{test.duration}</Badge>
                  </div>
                  <Button 
                    size="sm" 
                    className="w-full"
                    onClick={() => handleHomeCollection(test.id)}
                  >
                    Book Test
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Home Collection Form */}
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <Truck size={18} />
                Home Sample Collection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="collection-date">Preferred Date</Label>
                  <Input
                    id="collection-date"
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div>
                  <Label htmlFor="collection-time">Preferred Time</Label>
                  <Input
                    id="collection-time"
                    type="time"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="collection-address">Collection Address</Label>
                <Input
                  id="collection-address"
                  placeholder="Enter your full address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText size={20} />
            Lab Reports
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FileText size={16} className="text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">{report.testName}</h4>
                    <p className="text-sm text-gray-500">Date: {report.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge 
                    variant={report.status === 'ready' ? 'default' : 'secondary'}
                    className={report.status === 'ready' ? 'bg-green-100 text-green-700' : ''}
                  >
                    {report.status === 'ready' ? (
                      <>
                        <CheckCircle size={12} className="mr-1" />
                        Ready
                      </>
                    ) : (
                      <>
                        <Clock size={12} className="mr-1" />
                        Processing
                      </>
                    )}
                  </Badge>
                  {report.status === 'ready' && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleReportDownload(report.id)}
                    >
                      <Download size={16} className="mr-1" />
                      Download
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LabServices;
