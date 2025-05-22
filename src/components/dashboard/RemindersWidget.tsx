
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, Check, Clock, CalendarClock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface Reminder {
  id: string;
  title: string;
  time: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
}

interface RemindersWidgetProps {
  reminders: Reminder[];
  onComplete?: (id: string) => void;
}

const RemindersWidget: React.FC<RemindersWidgetProps> = ({ 
  reminders,
  onComplete = () => {}
}) => {
  const { toast } = useToast();

  const handleComplete = (id: string) => {
    onComplete(id);
    toast({
      title: "Reminder Completed",
      description: "The reminder has been marked as complete.",
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-500 bg-red-50 border-red-100';
      case 'medium':
        return 'text-amber-500 bg-amber-50 border-amber-100';
      case 'low':
        return 'text-green-500 bg-green-50 border-green-100';
      default:
        return 'text-gray-500 bg-gray-50 border-gray-200';
    }
  };

  return (
    <Card className="overflow-hidden bg-gradient-to-b from-white to-gray-50 border-none shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2 border-b">
        <CardTitle className="text-md font-medium flex items-center">
          <Bell size={16} className="mr-2 text-nepal-royal-blue" /> Reminders
        </CardTitle>
        <Button variant="ghost" size="sm" className="text-xs hover:bg-gray-100">View All</Button>
      </CardHeader>
      <CardContent className="pt-4">
        {reminders.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            <p>No reminders scheduled</p>
          </div>
        ) : (
          <div className="space-y-3">
            {reminders.map(reminder => (
              <div 
                key={reminder.id} 
                className={cn(
                  "p-4 rounded-xl border flex items-center justify-between",
                  reminder.completed 
                    ? "bg-gray-50 border-gray-200 opacity-60" 
                    : "bg-white border-gray-100 shadow-sm"
                )}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-full ${getPriorityColor(reminder.priority)}`}>
                    <CalendarClock size={16} />
                  </div>
                  <div>
                    <p className={cn(
                      "font-medium",
                      reminder.completed && "line-through text-gray-400"
                    )}>
                      {reminder.title}
                    </p>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <Clock size={12} className="mr-1" />
                      {reminder.time}
                    </div>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  variant={reminder.completed ? "outline" : "default"}
                  className={cn(
                    reminder.completed 
                      ? "opacity-50 border-gray-300" 
                      : "bg-nepal-royal-blue hover:bg-nepal-royal-blue/90"
                  )}
                  onClick={() => handleComplete(reminder.id)}
                  disabled={reminder.completed}
                >
                  <Check size={14} className="mr-1" />
                  {reminder.completed ? "Done" : "Complete"}
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RemindersWidget;
