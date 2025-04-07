
import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle2, AlertCircle, Clock, Trash2, Bell, Filter } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

type NotificationType = 'info' | 'alert' | 'success';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: Date;
  read: boolean;
}

const Notifications = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('all');
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'alert',
      title: 'Emergency Request',
      message: 'New emergency request at 123 Main St.',
      time: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      read: false,
    },
    {
      id: '2',
      type: 'info',
      title: 'Route Update',
      message: 'Traffic has been cleared on Broadway Ave.',
      time: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      read: false,
    },
    {
      id: '3',
      type: 'success',
      title: 'Patient Arrived',
      message: 'Patient John Doe has arrived at General Hospital.',
      time: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
      read: true,
    },
    {
      id: '4',
      type: 'info',
      title: 'System Update',
      message: 'MediSync system will undergo maintenance tonight from 2-3 AM.',
      time: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
      read: true,
    },
    {
      id: '5',
      type: 'alert',
      title: 'Critical Alert',
      message: 'Ambulance #A-234 requires immediate maintenance.',
      time: new Date(Date.now() - 1000 * 60 * 180), // 3 hours ago
      read: false,
    },
  ]);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
    toast({
      title: "Notifications",
      description: "All notifications marked as read",
    });
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
    toast({
      title: "Notification Deleted",
      description: "The notification has been removed",
    });
  };

  const deleteAllRead = () => {
    setNotifications(prev => prev.filter(notification => !notification.read));
    toast({
      title: "Notifications Deleted",
      description: "Read notifications have been removed",
    });
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    
    return date.toLocaleDateString();
  };

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case 'info': return <Clock className="h-5 w-5 text-blue-500" />;
      case 'alert': return <AlertCircle className="h-5 w-5 text-amber-500" />;
      case 'success': return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      default: return <Bell className="h-5 w-5" />;
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return !notification.read;
    if (activeTab === 'alerts') return notification.type === 'alert';
    if (activeTab === 'info') return notification.type === 'info';
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <DashboardLayout 
      title="Notifications" 
      description="View and manage your notifications."
      headerActions={
        <div className="flex gap-2">
          {unreadCount > 0 && (
            <Button variant="outline" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          )}
          <Button variant="outline" onClick={deleteAllRead}>
            <Trash2 className="h-4 w-4 mr-2" />
            Clear Read
          </Button>
        </div>
      }
    >
      <Card>
        <CardHeader className="border-b">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle className="flex items-center gap-2">
              <Bell size={18} />
              Notifications
              {unreadCount > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {unreadCount} New
                </Badge>
              )}
            </CardTitle>
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="unread">Unread</TabsTrigger>
                <TabsTrigger value="alerts">Alerts</TabsTrigger>
                <TabsTrigger value="info">Info</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {filteredNotifications.length > 0 ? (
            <div className="divide-y">
              {filteredNotifications.map((notification) => (
                <div 
                  key={notification.id}
                  className={`p-4 flex gap-4 ${!notification.read ? 'bg-muted/40' : ''}`}
                >
                  <div className="mt-0.5">
                    {getNotificationIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                      <h4 className="font-medium">{notification.title}</h4>
                      <span className="text-xs text-muted-foreground">
                        {formatTime(notification.time)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {notification.message}
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <div>
                        {notification.type === 'alert' && (
                          <Badge variant="outline" className="bg-amber-50 text-amber-800 border-amber-200">
                            Alert
                          </Badge>
                        )}
                        {notification.type === 'info' && (
                          <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">
                            Info
                          </Badge>
                        )}
                        {notification.type === 'success' && (
                          <Badge variant="outline" className="bg-green-50 text-green-800 border-green-200">
                            Success
                          </Badge>
                        )}
                      </div>
                      <div className="flex gap-2">
                        {!notification.read && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8"
                            onClick={() => markAsRead(notification.id)}
                          >
                            Mark as read
                          </Button>
                        )}
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="h-8 text-red-600 hover:text-red-700"
                          onClick={() => deleteNotification(notification.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-muted-foreground">
              <Bell className="h-10 w-10 mx-auto mb-3 opacity-20" />
              <p>No notifications found</p>
              {activeTab !== 'all' && (
                <Button variant="ghost" className="mt-2" onClick={() => setActiveTab('all')}>
                  View all notifications
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Notifications;
