
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, PhoneCall } from 'lucide-react';

import ContactList from './communication/ContactList';
import MessageArea from './communication/MessageArea';
import CallList from './communication/CallList';
import { Contact, Message } from './communication/types';

const InAppCommunication = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [messageText, setMessageText] = useState('');
  const [activeContact, setActiveContact] = useState<Contact | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock contacts data
  const contacts: Contact[] = [
    {
      id: '1',
      name: 'Dr. Aarav Sharma',
      role: 'Family Doctor',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=doctor1',
      online: true,
    },
    {
      id: '2',
      name: 'Nurse Priya',
      role: 'Home Care Nurse',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=nurse1', 
      online: false,
      lastSeen: '10 minutes ago'
    },
    {
      id: '3',
      name: 'Dr. Niraj Poudel',
      role: 'Cardiologist',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=doctor2',
      online: true,
    },
    {
      id: '4',
      name: 'Emergency Services',
      role: 'Ambulance Dispatch',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ambulance1',
      online: true,
    }
  ];

  // Mock messages data
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      senderId: '1',
      content: 'Hello, how are you feeling today?',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      status: 'read',
      isMine: false
    },
    {
      id: '2',
      senderId: 'me',
      content: 'I\'m feeling much better, thank you doctor.',
      timestamp: new Date(Date.now() - 1000 * 60 * 25),
      status: 'read',
      isMine: true
    },
    {
      id: '3',
      senderId: '1',
      content: 'That\'s great to hear! Have you been taking your medication regularly?',
      timestamp: new Date(Date.now() - 1000 * 60 * 20),
      status: 'read',
      isMine: false
    },
    {
      id: '4',
      senderId: 'me',
      content: 'Yes, I have. Though I sometimes feel a bit dizzy afterward.',
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      status: 'read',
      isMine: true
    },
    {
      id: '5',
      senderId: '1',
      content: 'That can be a normal side effect. Let\'s discuss this in our next appointment. Would you like me to adjust your dosage?',
      timestamp: new Date(Date.now() - 1000 * 60 * 10),
      status: 'read',
      isMine: false
    }
  ]);

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: 'me',
      content: messageText,
      timestamp: new Date(),
      status: 'sent',
      isMine: true
    };
    
    setMessages([...messages, newMessage]);
    setMessageText('');
    
    // Simulate receiving a response
    setTimeout(() => {
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        senderId: '1',
        content: 'Thank you for your message. I\'ll get back to you shortly.',
        timestamp: new Date(),
        status: 'delivered',
        isMine: false
      };
      
      setMessages(prev => [...prev, responseMessage]);
    }, 1500);
  };

  const handleCall = (contactId: string, callType: 'voice' | 'video') => {
    const contact = contacts.find(c => c.id === contactId);
    
    toast({
      title: callType === 'voice' ? t('initiatingCall') : t('initiatingVideoCall'),
      description: `${t('connecting')} ${contact?.name}...`,
    });
    
    // In a real app, this would connect to a calling service
    setTimeout(() => {
      toast({
        title: callType === 'voice' ? t('callConnected') : t('videoCallConnected'),
        description: `${t('youAreNowConnectedWith')} ${contact?.name}`,
      });
    }, 2000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleContactSelect = (contactId: string) => {
    const selectedContact = contacts.find(contact => contact.id === contactId);
    if (selectedContact) {
      setActiveContact(selectedContact);
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="px-4 py-3 bg-muted/20">
        <CardTitle>{t('communication')}</CardTitle>
        <CardDescription>{t('communicationDescription')}</CardDescription>
      </CardHeader>
      <Tabs defaultValue="chat">
        <TabsList className="grid grid-cols-2 px-4 py-2">
          <TabsTrigger value="chat" className="gap-2">
            <MessageSquare size={16} />
            {t('messages')}
          </TabsTrigger>
          <TabsTrigger value="call" className="gap-2">
            <PhoneCall size={16} />
            {t('calls')}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="chat" className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-3 h-[500px] border-t">
            {/* Contact List */}
            <div className="border-r h-full overflow-hidden">
              <ContactList 
                contacts={contacts}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onContactSelect={handleContactSelect}
              />
            </div>
            
            {/* Message Area */}
            <div className="md:col-span-2 flex flex-col h-full">
              <MessageArea 
                activeContact={activeContact}
                messages={messages}
                messageText={messageText}
                onMessageChange={setMessageText}
                onSendMessage={handleSendMessage}
                onCall={handleCall}
                formatTime={formatTime}
              />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="call" className="p-4">
          <CallList 
            contacts={contacts}
            onCall={handleCall}
          />
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default InAppCommunication;
