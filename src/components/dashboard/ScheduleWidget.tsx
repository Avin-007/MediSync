
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, Clock, User, MapPin, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Event {
  id: string;
  title: string;
  time: string;
  location?: string;
  assignee?: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  type: 'appointment' | 'emergency' | 'dispatch' | 'meeting';
}

interface ScheduleWidgetProps {
  events: Event[];
  onAddEvent?: () => void;
}

const ScheduleWidget: React.FC<ScheduleWidgetProps> = ({ 
  events,
  onAddEvent = () => {}
}) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Upcoming</Badge>;
      case 'ongoing':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Ongoing</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Completed</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getEventTypeBg = (type: string) => {
    switch (type) {
      case 'appointment':
        return 'bg-purple-100 text-purple-600';
      case 'emergency':
        return 'bg-red-100 text-red-600';
      case 'dispatch':
        return 'bg-blue-100 text-blue-600';
      case 'meeting':
        return 'bg-green-100 text-green-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium flex items-center">
          <CalendarIcon size={16} className="mr-2" /> Schedule
        </CardTitle>
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-1"
          onClick={onAddEvent}
        >
          <Plus size={14} />
          Add
        </Button>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-500">Today • {today}</p>
        </div>
        
        {events.length === 0 ? (
          <div className="text-center py-6 text-gray-500 border border-dashed rounded-md">
            <p>No events scheduled</p>
            <Button 
              variant="link" 
              size="sm" 
              className="mt-2"
              onClick={onAddEvent}
            >
              Add your first event
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {events.map(event => (
              <div key={event.id} className="relative pl-5 border-l-2 border-gray-200 pb-5">
                <div className="absolute w-3 h-3 rounded-full bg-white border-2 border-medisync-blue left-[-7px] top-2"></div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded ${getEventTypeBg(event.type)}`}>
                        {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                      </span>
                      <h4 className="font-medium">{event.title}</h4>
                    </div>
                    <div className="flex items-center mt-1 space-x-3 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Clock size={14} className="mr-1" />
                        {event.time}
                      </div>
                      
                      {event.location && (
                        <div className="flex items-center">
                          <MapPin size={14} className="mr-1" />
                          {event.location}
                        </div>
                      )}
                      
                      {event.assignee && (
                        <div className="flex items-center">
                          <User size={14} className="mr-1" />
                          {event.assignee}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mt-2 sm:mt-0">
                    {getStatusBadge(event.status)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ScheduleWidget;
