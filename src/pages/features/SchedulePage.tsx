
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Calendar, Clock, Plus, MapPin, User, Edit, Trash2, CheckCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ScheduleEvent {
  id: string;
  title: string;
  description?: string;
  date: string;
  time: string;
  duration: number; // in minutes
  location?: string;
  type: string;
  priority: 'low' | 'medium' | 'high';
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  participants?: string[];
}

const SchedulePage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [events, setEvents] = useState<ScheduleEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [editingEvent, setEditingEvent] = useState<ScheduleEvent | null>(null);
  const [newEvent, setNewEvent] = useState<Partial<ScheduleEvent>>({
    title: '',
    description: '',
    date: selectedDate,
    time: '',
    duration: 60,
    location: '',
    type: '',
    priority: 'medium',
    status: 'scheduled'
  });

  useEffect(() => {
    // Generate role-specific events
    const generateEvents = () => {
      const baseEvents: ScheduleEvent[] = [];
      const today = new Date();
      
      switch(user?.role) {
        case 'user':
          return [
            {
              id: '1',
              title: 'Annual Health Checkup',
              description: 'Comprehensive health examination with Dr. Sharma',
              date: new Date(today.getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              time: '09:00',
              duration: 90,
              location: 'Bir Hospital, Room 203',
              type: 'appointment',
              priority: 'high',
              status: 'scheduled',
              participants: ['Dr. Sharma', 'Nurse Priya']
            },
            {
              id: '2',
              title: 'Blood Test Results',
              description: 'Review blood work results with physician',
              date: new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              time: '14:00',
              duration: 30,
              location: 'Norvic Hospital, Lab Department',
              type: 'follow_up',
              priority: 'medium',
              status: 'scheduled',
              participants: ['Dr. Poudel']
            },
            {
              id: '3',
              title: 'Physical Therapy Session',
              description: 'Rehabilitation session for knee injury',
              date: selectedDate,
              time: '16:00',
              duration: 60,
              location: 'Physiotherapy Clinic',
              type: 'therapy',
              priority: 'medium',
              status: 'completed',
              participants: ['Therapist Kumar']
            }
          ];
        
        case 'ambulance':
          return [
            {
              id: '1',
              title: 'Emergency Response',
              description: 'Cardiac emergency at Thamel',
              date: selectedDate,
              time: '10:30',
              duration: 45,
              location: 'Thamel, Near Garden of Dreams',
              type: 'emergency',
              priority: 'high',
              status: 'completed',
              participants: ['Paramedic Raj', 'Driver Shyam']
            },
            {
              id: '2',
              title: 'Scheduled Patient Transfer',
              description: 'Transfer patient from Bir Hospital to TU Teaching Hospital',
              date: new Date(today.getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              time: '13:00',
              duration: 30,
              location: 'Bir Hospital to TUTH',
              type: 'transfer',
              priority: 'medium',
              status: 'scheduled',
              participants: ['Nurse Rita', 'Patient Monitoring']
            },
            {
              id: '3',
              title: 'Vehicle Maintenance',
              description: 'Monthly ambulance inspection and maintenance',
              date: new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              time: '08:00',
              duration: 120,
              location: 'Service Center',
              type: 'maintenance',
              priority: 'high',
              status: 'scheduled'
            }
          ];
        
        case 'hospital':
          return [
            {
              id: '1',
              title: 'Staff Meeting',
              description: 'Weekly departmental coordination meeting',
              date: selectedDate,
              time: '08:00',
              duration: 60,
              location: 'Conference Room A',
              type: 'meeting',
              priority: 'medium',
              status: 'completed',
              participants: ['Dr. Sharma', 'Head Nurse', 'Admin Staff']
            },
            {
              id: '2',
              title: 'Surgery Schedule Review',
              description: 'Review and confirm upcoming surgeries',
              date: new Date(today.getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              time: '14:00',
              duration: 45,
              location: 'Surgery Department',
              type: 'planning',
              priority: 'high',
              status: 'scheduled',
              participants: ['Chief Surgeon', 'OR Coordinator']
            },
            {
              id: '3',
              title: 'Equipment Inspection',
              description: 'Monthly medical equipment safety check',
              date: new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              time: '10:00',
              duration: 180,
              location: 'All Departments',
              type: 'inspection',
              priority: 'high',
              status: 'scheduled'
            }
          ];
        
        case 'traffic':
          return [
            {
              id: '1',
              title: 'Morning Traffic Control',
              description: 'Rush hour traffic management at major intersections',
              date: selectedDate,
              time: '07:00',
              duration: 180,
              location: 'New Road Intersection',
              type: 'traffic_control',
              priority: 'high',
              status: 'completed',
              participants: ['Traffic Officer A', 'Traffic Officer B']
            },
            {
              id: '2',
              title: 'Emergency Route Clearance',
              description: 'Clear route for ambulance emergency',
              date: new Date(today.getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              time: '15:30',
              duration: 20,
              location: 'Ring Road to Teaching Hospital',
              type: 'emergency_clearance',
              priority: 'high',
              status: 'scheduled'
            },
            {
              id: '3',
              title: 'Signal Maintenance',
              description: 'Routine maintenance of traffic signals',
              date: new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              time: '09:00',
              duration: 240,
              location: 'Various Intersections',
              type: 'maintenance',
              priority: 'medium',
              status: 'scheduled'
            }
          ];
        
        case 'nurse':
          return [
            {
              id: '1',
              title: 'Morning Rounds',
              description: 'Check on patients and administer medications',
              date: selectedDate,
              time: '06:00',
              duration: 120,
              location: 'Ward A - Rooms 101-115',
              type: 'patient_care',
              priority: 'high',
              status: 'completed',
              participants: ['Assistant Nurse']
            },
            {
              id: '2',
              title: 'Patient Education Session',
              description: 'Diabetes management education for new patients',
              date: new Date(today.getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              time: '11:00',
              duration: 45,
              location: 'Education Room',
              type: 'education',
              priority: 'medium',
              status: 'scheduled',
              participants: ['Diabetic Patients', 'Nutritionist']
            },
            {
              id: '3',
              title: 'Emergency Response Training',
              description: 'Monthly emergency response drill',
              date: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              time: '14:00',
              duration: 90,
              location: 'Training Room',
              type: 'training',
              priority: 'medium',
              status: 'scheduled'
            }
          ];
        
        default:
          return [];
      }
    };

    setEvents(generateEvents());
  }, [user?.role, selectedDate]);

  const getEventTypeOptions = () => {
    switch(user?.role) {
      case 'user':
        return ['appointment', 'follow_up', 'therapy', 'consultation', 'procedure'];
      case 'ambulance':
        return ['emergency', 'transfer', 'maintenance', 'training', 'standby'];
      case 'hospital':
        return ['meeting', 'planning', 'inspection', 'surgery', 'conference'];
      case 'traffic':
        return ['traffic_control', 'emergency_clearance', 'maintenance', 'patrol', 'training'];
      case 'nurse':
        return ['patient_care', 'education', 'training', 'meeting', 'documentation'];
      default:
        return ['meeting', 'appointment', 'task'];
    }
  };

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.date || !newEvent.time || !newEvent.type) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const event: ScheduleEvent = {
      id: Date.now().toString(),
      title: newEvent.title!,
      description: newEvent.description,
      date: newEvent.date!,
      time: newEvent.time!,
      duration: newEvent.duration || 60,
      location: newEvent.location,
      type: newEvent.type!,
      priority: newEvent.priority || 'medium',
      status: 'scheduled',
      participants: []
    };

    setEvents(prev => [...prev, event]);
    setIsAddingEvent(false);
    setNewEvent({
      title: '',
      description: '',
      date: selectedDate,
      time: '',
      duration: 60,
      location: '',
      type: '',
      priority: 'medium',
      status: 'scheduled'
    });

    toast({
      title: "Event Added",
      description: "Your event has been scheduled successfully",
    });
  };

  const handleUpdateEvent = (eventId: string, updates: Partial<ScheduleEvent>) => {
    setEvents(prev => prev.map(event => 
      event.id === eventId ? { ...event, ...updates } : event
    ));
    
    toast({
      title: "Event Updated",
      description: "Event has been updated successfully",
    });
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(prev => prev.filter(event => event.id !== eventId));
    toast({
      title: "Event Deleted",
      description: "Event has been removed from your schedule",
    });
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'scheduled':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700">Scheduled</Badge>;
      case 'in_progress':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700">In Progress</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-green-50 text-green-700">Completed</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-red-50 text-red-700">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch(priority) {
      case 'high':
        return <Badge variant="destructive">High</Badge>;
      case 'medium':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700">Medium</Badge>;
      case 'low':
        return <Badge variant="outline" className="bg-green-50 text-green-700">Low</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const filteredEvents = events.filter(event => event.date === selectedDate);
  const upcomingEvents = events.filter(event => new Date(event.date) > new Date(selectedDate));

  return (
    <DashboardLayout
      title="Schedule Management"
      description="Manage your appointments and tasks"
      headerActions={
        <Dialog open={isAddingEvent} onOpenChange={setIsAddingEvent}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus size={16} />
              Add Event
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Event</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={newEvent.title || ''}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Event title"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newEvent.description || ''}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Event description"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="date">Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newEvent.date || ''}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, date: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="time">Time *</Label>
                  <Input
                    id="time"
                    type="time"
                    value={newEvent.time || ''}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, time: e.target.value }))}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="type">Type *</Label>
                  <Select 
                    value={newEvent.type || ''} 
                    onValueChange={(value) => setNewEvent(prev => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {getEventTypeOptions().map(type => (
                        <SelectItem key={type} value={type}>
                          {type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select 
                    value={newEvent.priority || 'medium'} 
                    onValueChange={(value) => setNewEvent(prev => ({ ...prev, priority: value as any }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={newEvent.location || ''}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="Event location"
                />
              </div>
              <div>
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={newEvent.duration || 60}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                  min="15"
                  step="15"
                />
              </div>
              <Button onClick={handleAddEvent}>Add Event</Button>
            </div>
          </DialogContent>
        </Dialog>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar and Date Selection */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar size={18} />
                Calendar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="date-picker">Select Date</Label>
                  <Input
                    id="date-picker"
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full"
                  />
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">Today's Summary</h3>
                  <div className="text-sm space-y-1">
                    <p>Total Events: {filteredEvents.length}</p>
                    <p>Completed: {filteredEvents.filter(e => e.status === 'completed').length}</p>
                    <p>Scheduled: {filteredEvents.filter(e => e.status === 'scheduled').length}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Upcoming Events</h3>
                  <div className="text-sm space-y-1">
                    {upcomingEvents.slice(0, 3).map(event => (
                      <div key={event.id} className="p-2 bg-gray-50 rounded">
                        <p className="font-medium">{event.title}</p>
                        <p className="text-gray-500">{event.date} at {event.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Events List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>
                Events for {new Date(selectedDate).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredEvents.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Calendar size={48} className="mx-auto mb-4 text-gray-300" />
                    <p>No events scheduled for this date</p>
                    <Button 
                      variant="outline" 
                      className="mt-2"
                      onClick={() => setIsAddingEvent(true)}
                    >
                      Add Event
                    </Button>
                  </div>
                ) : (
                  filteredEvents.map(event => (
                    <div key={event.id} className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-medium">{event.title}</h3>
                            {getPriorityBadge(event.priority)}
                            {getStatusBadge(event.status)}
                          </div>
                          
                          {event.description && (
                            <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                          )}
                          
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Clock size={14} />
                              {event.time} ({event.duration} min)
                            </div>
                            {event.location && (
                              <div className="flex items-center gap-1">
                                <MapPin size={14} />
                                {event.location}
                              </div>
                            )}
                            {event.participants && event.participants.length > 0 && (
                              <div className="flex items-center gap-1">
                                <User size={14} />
                                {event.participants.length} participants
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {event.status === 'scheduled' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleUpdateEvent(event.id, { status: 'completed' })}
                            >
                              <CheckCircle size={14} className="mr-1" />
                              Complete
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingEvent(event)}
                          >
                            <Edit size={14} />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteEvent(event.id)}
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SchedulePage;
