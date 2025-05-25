
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Bell, Plus, Clock, Calendar, AlertCircle, Check, X, Edit, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Reminder {
  id: string;
  title: string;
  description?: string;
  type: string;
  priority: 'low' | 'medium' | 'high';
  frequency: 'once' | 'daily' | 'weekly' | 'monthly';
  date: string;
  time: string;
  isActive: boolean;
  isCompleted: boolean;
  notifications: boolean;
  lastTriggered?: Date;
  nextTrigger?: Date;
}

const RemindersPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [isAddingReminder, setIsAddingReminder] = useState(false);
  const [editingReminder, setEditingReminder] = useState<Reminder | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [newReminder, setNewReminder] = useState<Partial<Reminder>>({
    title: '',
    description: '',
    type: '',
    priority: 'medium',
    frequency: 'once',
    date: new Date().toISOString().split('T')[0],
    time: '',
    isActive: true,
    isCompleted: false,
    notifications: true
  });

  useEffect(() => {
    // Generate role-specific reminders
    const generateReminders = () => {
      const today = new Date();
      const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
      
      switch(user?.role) {
        case 'user':
          return [
            {
              id: '1',
              title: 'Take Blood Pressure Medication',
              description: 'Take Lisinopril 10mg with breakfast',
              type: 'medication',
              priority: 'high' as const,
              frequency: 'daily' as const,
              date: today.toISOString().split('T')[0],
              time: '08:00',
              isActive: true,
              isCompleted: false,
              notifications: true,
              nextTrigger: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 8, 0)
            },
            {
              id: '2',
              title: 'Doctor Appointment Tomorrow',
              description: 'Annual checkup with Dr. Sharma at Bir Hospital',
              type: 'appointment',
              priority: 'medium' as const,
              frequency: 'once' as const,
              date: tomorrow.toISOString().split('T')[0],
              time: '10:30',
              isActive: true,
              isCompleted: false,
              notifications: true,
              nextTrigger: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 10, 30)
            },
            {
              id: '3',
              title: 'Weekly Exercise Goal',
              description: 'Complete 150 minutes of moderate exercise this week',
              type: 'exercise',
              priority: 'medium' as const,
              frequency: 'weekly' as const,
              date: today.toISOString().split('T')[0],
              time: '18:00',
              isActive: true,
              isCompleted: true,
              notifications: true,
              lastTriggered: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000)
            }
          ];
        
        case 'ambulance':
          return [
            {
              id: '1',
              title: 'Vehicle Inspection',
              description: 'Daily pre-shift vehicle safety check',
              type: 'maintenance',
              priority: 'high' as const,
              frequency: 'daily' as const,
              date: today.toISOString().split('T')[0],
              time: '06:00',
              isActive: true,
              isCompleted: true,
              notifications: true,
              lastTriggered: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 6, 0)
            },
            {
              id: '2',
              title: 'Equipment Inventory Check',
              description: 'Verify all emergency equipment is stocked and functional',
              type: 'inventory',
              priority: 'high' as const,
              frequency: 'daily' as const,
              date: today.toISOString().split('T')[0],
              time: '06:30',
              isActive: true,
              isCompleted: false,
              notifications: true,
              nextTrigger: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 6, 30)
            },
            {
              id: '3',
              title: 'CPR Certification Renewal',
              description: 'CPR certification expires next month - schedule renewal',
              type: 'training',
              priority: 'medium' as const,
              frequency: 'once' as const,
              date: new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              time: '14:00',
              isActive: true,
              isCompleted: false,
              notifications: true
            }
          ];
        
        case 'hospital':
          return [
            {
              id: '1',
              title: 'Staff Meeting',
              description: 'Weekly department coordination meeting',
              type: 'meeting',
              priority: 'medium' as const,
              frequency: 'weekly' as const,
              date: today.toISOString().split('T')[0],
              time: '08:00',
              isActive: true,
              isCompleted: false,
              notifications: true,
              nextTrigger: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 8, 0)
            },
            {
              id: '2',
              title: 'Equipment Maintenance Review',
              description: 'Monthly review of all medical equipment maintenance',
              type: 'maintenance',
              priority: 'high' as const,
              frequency: 'monthly' as const,
              date: new Date(today.getFullYear(), today.getMonth() + 1, 1).toISOString().split('T')[0],
              time: '10:00',
              isActive: true,
              isCompleted: false,
              notifications: true
            },
            {
              id: '3',
              title: 'Patient Satisfaction Survey',
              description: 'Review monthly patient satisfaction reports',
              type: 'review',
              priority: 'medium' as const,
              frequency: 'monthly' as const,
              date: new Date(today.getFullYear(), today.getMonth(), 28).toISOString().split('T')[0],
              time: '15:00',
              isActive: true,
              isCompleted: false,
              notifications: true
            }
          ];
        
        case 'traffic':
          return [
            {
              id: '1',
              title: 'Signal System Check',
              description: 'Morning inspection of traffic light systems',
              type: 'inspection',
              priority: 'high' as const,
              frequency: 'daily' as const,
              date: today.toISOString().split('T')[0],
              time: '06:00',
              isActive: true,
              isCompleted: true,
              notifications: true,
              lastTriggered: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 6, 0)
            },
            {
              id: '2',
              title: 'Emergency Route Protocol Review',
              description: 'Weekly review of emergency clearance procedures',
              type: 'training',
              priority: 'medium' as const,
              frequency: 'weekly' as const,
              date: today.toISOString().split('T')[0],
              time: '14:00',
              isActive: true,
              isCompleted: false,
              notifications: true
            },
            {
              id: '3',
              title: 'Equipment Calibration',
              description: 'Monthly calibration of traffic monitoring equipment',
              type: 'maintenance',
              priority: 'high' as const,
              frequency: 'monthly' as const,
              date: new Date(today.getFullYear(), today.getMonth(), 15).toISOString().split('T')[0],
              time: '09:00',
              isActive: true,
              isCompleted: false,
              notifications: true
            }
          ];
        
        case 'nurse':
          return [
            {
              id: '1',
              title: 'Medication Round',
              description: 'Administer medications to Ward A patients',
              type: 'medication',
              priority: 'high' as const,
              frequency: 'daily' as const,
              date: today.toISOString().split('T')[0],
              time: '08:00',
              isActive: true,
              isCompleted: true,
              notifications: true,
              lastTriggered: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 8, 0)
            },
            {
              id: '2',
              title: 'Patient Vital Signs Check',
              description: 'Record vital signs for all assigned patients',
              type: 'patient_care',
              priority: 'high' as const,
              frequency: 'daily' as const,
              date: today.toISOString().split('T')[0],
              time: '12:00',
              isActive: true,
              isCompleted: false,
              notifications: true,
              nextTrigger: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12, 0)
            },
            {
              id: '3',
              title: 'Nursing License Renewal',
              description: 'Nursing license renewal due in 3 months',
              type: 'license',
              priority: 'medium' as const,
              frequency: 'once' as const,
              date: new Date(today.getTime() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              time: '10:00',
              isActive: true,
              isCompleted: false,
              notifications: true
            }
          ];
        
        default:
          return [];
      }
    };

    setReminders(generateReminders());
  }, [user?.role]);

  const getReminderTypeOptions = () => {
    switch(user?.role) {
      case 'user':
        return ['medication', 'appointment', 'exercise', 'diet', 'checkup'];
      case 'ambulance':
        return ['maintenance', 'inventory', 'training', 'inspection', 'emergency'];
      case 'hospital':
        return ['meeting', 'maintenance', 'review', 'training', 'inspection'];
      case 'traffic':
        return ['inspection', 'training', 'maintenance', 'patrol', 'meeting'];
      case 'nurse':
        return ['medication', 'patient_care', 'training', 'license', 'documentation'];
      default:
        return ['task', 'meeting', 'reminder'];
    }
  };

  const handleAddReminder = () => {
    if (!newReminder.title || !newReminder.date || !newReminder.time || !newReminder.type) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const reminder: Reminder = {
      id: Date.now().toString(),
      title: newReminder.title!,
      description: newReminder.description,
      type: newReminder.type!,
      priority: newReminder.priority || 'medium',
      frequency: newReminder.frequency || 'once',
      date: newReminder.date!,
      time: newReminder.time!,
      isActive: newReminder.isActive !== false,
      isCompleted: false,
      notifications: newReminder.notifications !== false
    };

    setReminders(prev => [...prev, reminder]);
    setIsAddingReminder(false);
    setNewReminder({
      title: '',
      description: '',
      type: '',
      priority: 'medium',
      frequency: 'once',
      date: new Date().toISOString().split('T')[0],
      time: '',
      isActive: true,
      isCompleted: false,
      notifications: true
    });

    toast({
      title: "Reminder Added",
      description: "Your reminder has been created successfully",
    });
  };

  const handleCompleteReminder = (reminderId: string) => {
    setReminders(prev => prev.map(reminder => 
      reminder.id === reminderId 
        ? { ...reminder, isCompleted: true, lastTriggered: new Date() }
        : reminder
    ));
    
    toast({
      title: "Reminder Completed",
      description: "Great job! Reminder marked as complete.",
    });
  };

  const handleToggleActive = (reminderId: string) => {
    setReminders(prev => prev.map(reminder => 
      reminder.id === reminderId 
        ? { ...reminder, isActive: !reminder.isActive }
        : reminder
    ));
  };

  const handleDeleteReminder = (reminderId: string) => {
    setReminders(prev => prev.filter(reminder => reminder.id !== reminderId));
    toast({
      title: "Reminder Deleted",
      description: "Reminder has been removed",
    });
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

  const getFilteredReminders = () => {
    switch(filter) {
      case 'active':
        return reminders.filter(r => r.isActive && !r.isCompleted);
      case 'completed':
        return reminders.filter(r => r.isCompleted);
      default:
        return reminders;
    }
  };

  const activeReminders = reminders.filter(r => r.isActive && !r.isCompleted);
  const overdueReminders = activeReminders.filter(r => {
    const reminderDateTime = new Date(`${r.date}T${r.time}`);
    return reminderDateTime < new Date();
  });

  return (
    <DashboardLayout
      title="Reminders Management"
      description="Never miss important tasks and appointments"
      headerActions={
        <Dialog open={isAddingReminder} onOpenChange={setIsAddingReminder}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus size={16} />
              Add Reminder
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Reminder</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={newReminder.title || ''}
                  onChange={(e) => setNewReminder(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Reminder title"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newReminder.description || ''}
                  onChange={(e) => setNewReminder(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Additional details"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="type">Type *</Label>
                  <Select 
                    value={newReminder.type || ''} 
                    onValueChange={(value) => setNewReminder(prev => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {getReminderTypeOptions().map(type => (
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
                    value={newReminder.priority || 'medium'} 
                    onValueChange={(value) => setNewReminder(prev => ({ ...prev, priority: value as any }))}
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
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="date">Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newReminder.date || ''}
                    onChange={(e) => setNewReminder(prev => ({ ...prev, date: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="time">Time *</Label>
                  <Input
                    id="time"
                    type="time"
                    value={newReminder.time || ''}
                    onChange={(e) => setNewReminder(prev => ({ ...prev, time: e.target.value }))}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="frequency">Frequency</Label>
                <Select 
                  value={newReminder.frequency || 'once'} 
                  onValueChange={(value) => setNewReminder(prev => ({ ...prev, frequency: value as any }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="once">Once</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={newReminder.notifications !== false}
                  onCheckedChange={(checked) => setNewReminder(prev => ({ ...prev, notifications: checked }))}
                />
                <Label>Enable notifications</Label>
              </div>
              <Button onClick={handleAddReminder}>Create Reminder</Button>
            </div>
          </DialogContent>
        </Dialog>
      }
    >
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Reminders</p>
                  <p className="text-2xl font-bold">{reminders.length}</p>
                </div>
                <Bell className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Active</p>
                  <p className="text-2xl font-bold text-blue-600">{activeReminders.length}</p>
                </div>
                <Clock className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Overdue</p>
                  <p className="text-2xl font-bold text-red-600">{overdueReminders.length}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Completed Today</p>
                  <p className="text-2xl font-bold text-green-600">
                    {reminders.filter(r => {
                      const today = new Date().toISOString().split('T')[0];
                      return r.isCompleted && r.lastTriggered && 
                        r.lastTriggered.toISOString().split('T')[0] === today;
                    }).length}
                  </p>
                </div>
                <Check className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Reminders</CardTitle>
              <div className="flex gap-2">
                <Button
                  variant={filter === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter('all')}
                >
                  All
                </Button>
                <Button
                  variant={filter === 'active' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter('active')}
                >
                  Active
                </Button>
                <Button
                  variant={filter === 'completed' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter('completed')}
                >
                  Completed
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {getFilteredReminders().length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Bell size={48} className="mx-auto mb-4 text-gray-300" />
                  <p>No reminders found</p>
                  <Button 
                    variant="outline" 
                    className="mt-2"
                    onClick={() => setIsAddingReminder(true)}
                  >
                    Create Your First Reminder
                  </Button>
                </div>
              ) : (
                getFilteredReminders().map(reminder => {
                  const isOverdue = !reminder.isCompleted && 
                    new Date(`${reminder.date}T${reminder.time}`) < new Date();
                  
                  return (
                    <div key={reminder.id} className={`border rounded-lg p-4 ${
                      isOverdue ? 'border-red-200 bg-red-50' : 
                      reminder.isCompleted ? 'border-green-200 bg-green-50' : 
                      'hover:bg-gray-50'
                    }`}>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className={`font-medium ${reminder.isCompleted ? 'line-through text-gray-500' : ''}`}>
                              {reminder.title}
                            </h3>
                            {getPriorityBadge(reminder.priority)}
                            {isOverdue && <Badge variant="destructive">Overdue</Badge>}
                            {reminder.isCompleted && <Badge variant="outline" className="bg-green-50 text-green-700">Completed</Badge>}
                          </div>
                          
                          {reminder.description && (
                            <p className="text-sm text-gray-600 mb-2">{reminder.description}</p>
                          )}
                          
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Calendar size={14} />
                              {new Date(reminder.date).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock size={14} />
                              {reminder.time}
                            </div>
                            <div className="flex items-center gap-1">
                              <Bell size={14} />
                              {reminder.frequency}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={reminder.isActive}
                            onCheckedChange={() => handleToggleActive(reminder.id)}
                            disabled={reminder.isCompleted}
                          />
                          
                          {!reminder.isCompleted && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleCompleteReminder(reminder.id)}
                            >
                              <Check size={14} className="mr-1" />
                              Complete
                            </Button>
                          )}
                          
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingReminder(reminder)}
                          >
                            <Edit size={14} />
                          </Button>
                          
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteReminder(reminder.id)}
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default RemindersPage;
