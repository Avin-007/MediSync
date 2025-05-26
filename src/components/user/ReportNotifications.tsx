
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Bell, FileText, Download, CheckCircle, Clock } from 'lucide-react';

const ReportNotifications = () => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'report_ready',
      title: 'Lab Report Ready',
      message: 'Your Complete Blood Count report is ready for download',
      timestamp: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
      read: false,
      reportId: 'CBC_001',
      testName: 'Complete Blood Count'
    },
    {
      id: 2,
      type: 'report_ready',
      title: 'Lab Report Ready',
      message: 'Your Lipid Profile report is ready for download',
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      read: false,
      reportId: 'LP_002',
      testName: 'Lipid Profile'
    },
    {
      id: 3,
      type: 'collection_scheduled',
      title: 'Sample Collection Reminder',
      message: 'Sample collection scheduled for tomorrow at 9:00 AM',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      read: true,
      collectionDate: '2024-01-26',
      collectionTime: '09:00'
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate a new report notification every 2 minutes
      const shouldAddNotification = Math.random() > 0.7;
      
      if (shouldAddNotification) {
        const newNotification = {
          id: Date.now(),
          type: 'report_ready',
          title: 'Lab Report Ready',
          message: 'Your Thyroid Function Test report is ready for download',
          timestamp: new Date(),
          read: false,
          reportId: `TFT_${Date.now()}`,
          testName: 'Thyroid Function Test'
        };

        setNotifications(prev => [newNotification, ...prev]);
        
        toast({
          title: "New Report Available",
          description: "Your lab report is ready for download",
        });
      }
    }, 120000); // Check every 2 minutes

    return () => clearInterval(interval);
  }, [toast]);

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
    toast({
      title: "All Notifications Read",
      description: "All notifications have been marked as read",
    });
  };

  const downloadReport = (reportId: string, testName: string) => {
    toast({
      title: "Report Downloaded",
      description: `${testName} report downloaded successfully`,
    });
  };

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diffMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
    
    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    
    return timestamp.toLocaleDateString();
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Bell size={20} />
            Report Notifications
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadCount}
              </Badge>
            )}
          </CardTitle>
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Bell size={48} className="mx-auto mb-4 opacity-30" />
              <p>No notifications yet</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div 
                key={notification.id}
                className={`p-4 border rounded-lg transition-colors ${
                  !notification.read ? 'bg-blue-50 border-blue-200' : 'bg-gray-50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="p-2 bg-white rounded-full">
                      {notification.type === 'report_ready' ? (
                        <FileText size={16} className="text-green-600" />
                      ) : (
                        <Clock size={16} className="text-blue-600" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{notification.title}</h4>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatTime(notification.timestamp)}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 ml-4">
                    {notification.type === 'report_ready' && (
                      <Button
                        size="sm"
                        onClick={() => downloadReport(notification.reportId!, notification.testName!)}
                      >
                        <Download size={14} className="mr-1" />
                        Download
                      </Button>
                    )}
                    
                    {!notification.read && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => markAsRead(notification.id)}
                      >
                        <CheckCircle size={14} className="mr-1" />
                        Mark Read
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportNotifications;
