import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { Heart, Activity, Clock, Droplet, ScrollText, TrendingUp, UserPlus, Users, CreditCard } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const HealthOverview = () => {
  const { toast } = useToast();
  
  const bloodDonors = [
    { name: "John Smith", bloodType: "A+", contact: "+1 555-123-4567", distance: "1.2 miles away" },
    { name: "Maria Garcia", bloodType: "O-", contact: "+1 555-987-6543", distance: "2.5 miles away" },
    { name: "Raj Patel", bloodType: "B+", contact: "+1 555-456-7890", distance: "3.7 miles away" }
  ];
  
  const handleContactDonor = (donorName: string) => {
    toast({
      title: "Contacting Donor",
      description: `We're connecting you with ${donorName} for blood donation.`
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Heart Rate Card */}
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

        {/* Blood Pressure Card */}
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

        {/* Blood Glucose Card */}
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
        {/* Blood Donation Card - NEW */}
        <Card className="border-red-100">
          <CardHeader className="border-b">
            <CardTitle className="flex items-center">
              <Droplet className="mr-2 text-red-500" size={18} />
              Blood Donation Services
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-red-50 border border-red-100 rounded-md p-4">
                <h3 className="font-medium text-lg mb-2 flex items-center">
                  <UserPlus className="mr-2 text-red-500" size={16} />
                  Donate Blood
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Your donation can save up to three lives. Schedule an appointment to donate blood today.
                </p>
                <Button className="w-full bg-red-500 hover:bg-red-600">Schedule Donation</Button>
              </div>
              
              <div className="bg-blue-50 border border-blue-100 rounded-md p-4">
                <h3 className="font-medium text-lg mb-2 flex items-center">
                  <Droplet className="mr-2 text-blue-500" size={16} />
                  Check Availability
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Need blood urgently? Check availability and contact donors directly.
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full border-blue-200 text-blue-600 hover:bg-blue-50">
                      Find Blood Donors
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Available Blood Donors</DialogTitle>
                      <DialogDescription>
                        Nearby donors who match your blood type requirements
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4 space-y-3">
                      {bloodDonors.map((donor, index) => (
                        <div key={index} className="flex items-center justify-between border-b border-gray-100 pb-3">
                          <div>
                            <div className="font-medium">{donor.name}</div>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span className="bg-red-50 text-red-600 px-2 py-0.5 rounded font-medium">{donor.bloodType}</span>
                              <span>{donor.distance}</span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" onClick={() => handleContactDonor(donor.name)}>
                            Contact
                          </Button>
                        </div>
                      ))}
                    </div>
                    <DialogFooter>
                      <Button type="button" variant="outline" className="w-full">
                        Search More Donors
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Family Records Access - NEW */}
        <Card className="border-green-100">
          <CardHeader className="border-b">
            <CardTitle className="flex items-center">
              <Users className="mr-2 text-green-500" size={18} />
              Family Health Records
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="bg-green-50 border border-green-100 rounded-md p-4 mb-4">
              <h3 className="font-medium text-lg mb-2">Access Family Records</h3>
              <p className="text-sm text-gray-600 mb-4">
                Living abroad? View and manage health records for your family members with secure access.
              </p>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                View Family Records
              </Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-md">
              <div>
                <h4 className="font-medium text-sm">Recent Access</h4>
                <p className="text-xs text-muted-foreground">Mom's cardiology records</p>
              </div>
              <span className="text-xs text-muted-foreground">3 days ago</span>
            </div>
          </CardContent>
        </Card>
        
        {/* Account Balance Card - NEW */}
        <Card className="border-purple-100">
          <CardHeader className="border-b">
            <CardTitle className="flex items-center">
              <CreditCard className="mr-2 text-purple-500" size={18} />
              Health Payment Center
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex justify-between items-center bg-purple-50 border border-purple-100 rounded-md p-4 mb-4">
              <div>
                <h3 className="font-medium">Current Balance</h3>
                <p className="text-2xl font-bold">$245.00</p>
              </div>
              <Drawer>
                <DrawerTrigger asChild>
                  <Button variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50">
                    Add Balance
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader className="text-left">
                    <DrawerTitle>Add Payment</DrawerTitle>
                    <DrawerDescription>Add funds to your healthcare wallet</DrawerDescription>
                  </DrawerHeader>
                  <div className="px-4">
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-3 items-center gap-4">
                        <label htmlFor="amount" className="text-right text-sm font-medium">
                          Amount
                        </label>
                        <input
                          id="amount"
                          className="col-span-2 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Enter amount"
                          defaultValue="50.00"
                        />
                      </div>
                      <div className="grid grid-cols-3 items-center gap-4">
                        <label htmlFor="payment-method" className="text-right text-sm font-medium">
                          Payment Method
                        </label>
                        <select
                          id="payment-method"
                          className="col-span-2 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="card">Credit Card</option>
                          <option value="bank">Bank Transfer</option>
                          <option value="paypal">PayPal</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <DrawerFooter className="pt-2">
                    <Button onClick={() => {
                      toast({
                        title: "Payment Successful",
                        description: "Your balance has been updated successfully."
                      });
                    }}>Add Payment</Button>
                    <DrawerClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Recent Transactions</h4>
              <div className="flex justify-between text-sm py-2 border-b">
                <span>Medication Purchase</span>
                <span className="font-medium text-red-500">-$32.99</span>
              </div>
              <div className="flex justify-between text-sm py-2 border-b">
                <span>Doctor Consultation</span>
                <span className="font-medium text-red-500">-$85.00</span>
              </div>
              <div className="flex justify-between text-sm py-2 border-b">
                <span>Balance Added</span>
                <span className="font-medium text-green-500">+$200.00</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Keep existing Health Trends Card */}
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

        {/* Keep existing Appointments Card */}
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

        {/* Keep existing Medications Card */}
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
