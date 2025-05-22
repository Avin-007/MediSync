
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PhoneCall, Video } from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  online: boolean;
  lastSeen?: string;
}

interface CallListProps {
  contacts: Contact[];
  onCall: (contactId: string, callType: 'voice' | 'video') => void;
}

const CallList: React.FC<CallListProps> = ({ contacts, onCall }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {contacts.map((contact) => (
        <Card key={contact.id} className="overflow-hidden">
          <CardContent className="p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={contact.avatar} />
                <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{contact.name}</p>
                <p className="text-sm text-muted-foreground">{contact.role}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                size="icon"
                variant="outline"
                onClick={() => onCall(contact.id, 'voice')}
                className="rounded-full h-10 w-10"
              >
                <PhoneCall size={16} />
              </Button>
              <Button 
                size="icon"
                variant="outline"
                onClick={() => onCall(contact.id, 'video')}
                className="rounded-full h-10 w-10"
              >
                <Video size={16} />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CallList;
