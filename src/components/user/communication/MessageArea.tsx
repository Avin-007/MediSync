
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { PhoneCall, Video, Send } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Contact {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  online: boolean;
  lastSeen?: string;
}

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
  isMine: boolean;
}

interface MessageAreaProps {
  activeContact: Contact | null;
  messages: Message[];
  messageText: string;
  onMessageChange: (text: string) => void;
  onSendMessage: () => void;
  onCall: (contactId: string, callType: 'voice' | 'video') => void;
  formatTime: (date: Date) => string;
}

const MessageArea: React.FC<MessageAreaProps> = ({
  activeContact,
  messages,
  messageText,
  onMessageChange,
  onSendMessage,
  onCall,
  formatTime
}) => {
  const { t } = useLanguage();
  
  if (!activeContact) {
    return <EmptyMessageArea />;
  }
  
  return (
    <>
      <div className="p-3 border-b flex justify-between items-center bg-muted/10">
        <ContactHeader 
          contact={activeContact} 
          onCall={onCall}
          t={t}
        />
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <MessageBubble 
              key={message.id} 
              message={message} 
              formatTime={formatTime} 
            />
          ))}
        </div>
      </ScrollArea>
      
      <div className="p-3 border-t">
        <div className="flex gap-2">
          <Input 
            placeholder={t('typeMessage')}
            value={messageText}
            onChange={(e) => onMessageChange(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onSendMessage()}
          />
          <Button onClick={onSendMessage}>
            <Send size={16} />
          </Button>
        </div>
      </div>
    </>
  );
};

const ContactHeader = ({ contact, onCall, t }: { 
  contact: Contact,
  onCall: (contactId: string, callType: 'voice' | 'video') => void,
  t: (key: string) => string
}) => {
  return (
    <>
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={contact.avatar} />
          <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{contact.name}</p>
          <p className="text-xs text-muted-foreground">
            {contact.online ? 
              <span className="flex items-center">
                <span className="h-2 w-2 rounded-full bg-green-500 mr-1"></span> 
                {t('online')}
              </span> : 
              contact.lastSeen
            }
          </p>
        </div>
      </div>
      <div className="flex gap-2">
        <Button 
          size="icon" 
          variant="ghost"
          onClick={() => onCall(contact.id, 'voice')}
        >
          <PhoneCall size={16} />
        </Button>
        <Button 
          size="icon" 
          variant="ghost"
          onClick={() => onCall(contact.id, 'video')}
        >
          <Video size={16} />
        </Button>
      </div>
    </>
  );
};

const MessageBubble = ({ message, formatTime }: { 
  message: Message,
  formatTime: (date: Date) => string
}) => {
  return (
    <div 
      key={message.id} 
      className={`flex ${message.isMine ? 'justify-end' : 'justify-start'}`}
    >
      <div 
        className={`max-w-[75%] rounded-xl p-3 ${
          message.isMine 
            ? 'bg-nepal-royal-blue text-white rounded-tr-none' 
            : 'bg-muted rounded-tl-none'
        }`}
      >
        <p>{message.content}</p>
        <div className={`text-xs mt-1 ${message.isMine ? 'text-white/70' : 'text-muted-foreground'}`}>
          {formatTime(message.timestamp)}
        </div>
      </div>
    </div>
  );
};

const EmptyMessageArea = () => {
  const { t } = useLanguage();
  
  return (
    <div className="flex-1 flex items-center justify-center flex-col p-8 text-center text-muted-foreground">
      <MessageSquare size={48} className="mb-4 opacity-20" />
      <h3 className="text-xl font-medium mb-2">{t('noConversationSelected')}</h3>
      <p>{t('selectContactToStartChat')}</p>
    </div>
  );
};

// Add the missing MessageSquare import
import { MessageSquare } from 'lucide-react';

export default MessageArea;
