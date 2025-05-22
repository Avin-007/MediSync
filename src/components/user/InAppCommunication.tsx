
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { PhoneCall, MessageSquare, Video, Send, Clock } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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

const InAppCommunication = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [messageText, setMessageText] = useState('');
  const [activeContact, setActiveContact] = useState<Contact | null>(null);
  
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
              <div className="p-3">
                <Input placeholder={t('searchContacts')} />
              </div>
              
              <ScrollArea className="h-[calc(500px-48px)]">
                <div className="divide-y">
                  {contacts.map((contact) => (
                    <div 
                      key={contact.id}
                      className="p-3 flex items-center gap-3 hover:bg-muted/20 cursor-pointer transition-colors"
                      onClick={() => setActiveContact(contact)}
                    >
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={contact.avatar} />
                          <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {contact.online && (
                          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{contact.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{contact.role}</p>
                      </div>
                      {!contact.online && contact.lastSeen && (
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock size={12} className="mr-1" />
                          {contact.lastSeen}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
            
            {/* Message Area */}
            <div className="md:col-span-2 flex flex-col h-full">
              {activeContact ? (
                <>
                  <div className="p-3 border-b flex justify-between items-center bg-muted/10">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={activeContact.avatar} />
                        <AvatarFallback>{activeContact.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{activeContact.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {activeContact.online ? 
                            <span className="flex items-center">
                              <span className="h-2 w-2 rounded-full bg-green-500 mr-1"></span> 
                              {t('online')}
                            </span> : 
                            activeContact.lastSeen
                          }
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="icon" 
                        variant="ghost"
                        onClick={() => handleCall(activeContact.id, 'voice')}
                      >
                        <PhoneCall size={16} />
                      </Button>
                      <Button 
                        size="icon" 
                        variant="ghost"
                        onClick={() => handleCall(activeContact.id, 'video')}
                      >
                        <Video size={16} />
                      </Button>
                    </div>
                  </div>
                  
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {messages.map((message) => (
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
                      ))}
                    </div>
                  </ScrollArea>
                  
                  <div className="p-3 border-t">
                    <div className="flex gap-2">
                      <Input 
                        placeholder={t('typeMessage')}
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      />
                      <Button onClick={handleSendMessage}>
                        <Send size={16} />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center flex-col p-8 text-center text-muted-foreground">
                  <MessageSquare size={48} className="mb-4 opacity-20" />
                  <h3 className="text-xl font-medium mb-2">{t('noConversationSelected')}</h3>
                  <p>{t('selectContactToStartChat')}</p>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="call" className="p-4">
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
                      onClick={() => handleCall(contact.id, 'voice')}
                      className="rounded-full h-10 w-10"
                    >
                      <PhoneCall size={16} />
                    </Button>
                    <Button 
                      size="icon"
                      variant="outline"
                      onClick={() => handleCall(contact.id, 'video')}
                      className="rounded-full h-10 w-10"
                    >
                      <Video size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default InAppCommunication;
