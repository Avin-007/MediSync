
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { MessageSquare, Send, Search, Phone, Video, MoreVertical, Paperclip, Users, Bell, BellOff } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
  messageType: 'text' | 'emergency' | 'system' | 'appointment';
  attachments?: string[];
}

interface Contact {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  isOnline: boolean;
  lastSeen?: Date;
  unreadCount: number;
}

interface ChatGroup {
  id: string;
  name: string;
  type: string;
  members: string[];
  lastMessage?: Message;
  unreadCount: number;
}

const MessagesPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [chatGroups, setChatGroups] = useState<ChatGroup[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<ChatGroup | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('contacts');

  useEffect(() => {
    // Generate role-specific contacts and messages
    const generateContacts = () => {
      switch(user?.role) {
        case 'user':
          return [
            {
              id: '1',
              name: 'Dr. Sharma',
              role: 'doctor',
              isOnline: true,
              unreadCount: 2,
              avatar: '/api/placeholder/32/32'
            },
            {
              id: '2',
              name: 'Nurse Priya',
              role: 'nurse',
              isOnline: false,
              lastSeen: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
              unreadCount: 0
            },
            {
              id: '3',
              name: 'Ambulance Dispatch',
              role: 'ambulance',
              isOnline: true,
              unreadCount: 1
            },
            {
              id: '4',
              name: 'Hospital Reception',
              role: 'hospital',
              isOnline: true,
              unreadCount: 0
            }
          ];
        
        case 'ambulance':
          return [
            {
              id: '1',
              name: 'Dispatch Center',
              role: 'dispatch',
              isOnline: true,
              unreadCount: 5
            },
            {
              id: '2',
              name: 'Bir Hospital',
              role: 'hospital',
              isOnline: true,
              unreadCount: 1
            },
            {
              id: '3',
              name: 'Traffic Control',
              role: 'traffic',
              isOnline: true,
              unreadCount: 0
            },
            {
              id: '4',
              name: 'Paramedic Team',
              role: 'medical',
              isOnline: false,
              unreadCount: 0
            }
          ];
        
        case 'hospital':
          return [
            {
              id: '1',
              name: 'Emergency Department',
              role: 'department',
              isOnline: true,
              unreadCount: 3
            },
            {
              id: '2',
              name: 'Ambulance Services',
              role: 'ambulance',
              isOnline: true,
              unreadCount: 2
            },
            {
              id: '3',
              name: 'Laboratory',
              role: 'lab',
              isOnline: true,
              unreadCount: 1
            },
            {
              id: '4',
              name: 'Administration',
              role: 'admin',
              isOnline: false,
              unreadCount: 0
            }
          ];
        
        case 'traffic':
          return [
            {
              id: '1',
              name: 'Control Room',
              role: 'control',
              isOnline: true,
              unreadCount: 4
            },
            {
              id: '2',
              name: 'Ambulance Dispatch',
              role: 'ambulance',
              isOnline: true,
              unreadCount: 2
            },
            {
              id: '3',
              name: 'Hospital Coordination',
              role: 'hospital',
              isOnline: true,
              unreadCount: 1
            },
            {
              id: '4',
              name: 'Field Officers',
              role: 'officer',
              isOnline: false,
              unreadCount: 0
            }
          ];
        
        case 'nurse':
          return [
            {
              id: '1',
              name: 'Dr. Sharma',
              role: 'doctor',
              isOnline: true,
              unreadCount: 2
            },
            {
              id: '2',
              name: 'Patient Family',
              role: 'family',
              isOnline: false,
              unreadCount: 1
            },
            {
              id: '3',
              name: 'Ward Coordinator',
              role: 'coordinator',
              isOnline: true,
              unreadCount: 0
            },
            {
              id: '4',
              name: 'Pharmacy',
              role: 'pharmacy',
              isOnline: true,
              unreadCount: 1
            }
          ];
        
        default:
          return [];
      }
    };

    const generateMessages = () => {
      const baseMessages: Message[] = [];
      const now = new Date();
      
      // Generate sample messages based on role
      switch(user?.role) {
        case 'user':
          return [
            {
              id: '1',
              senderId: '1',
              senderName: 'Dr. Sharma',
              senderRole: 'doctor',
              receiverId: user.id,
              content: 'Your test results are ready. Please schedule a follow-up appointment.',
              timestamp: new Date(now.getTime() - 10 * 60 * 1000),
              isRead: false,
              messageType: 'text'
            },
            {
              id: '2',
              senderId: user.id,
              senderName: user.name,
              senderRole: user.role,
              receiverId: '1',
              content: 'Thank you doctor. When can I come in?',
              timestamp: new Date(now.getTime() - 5 * 60 * 1000),
              isRead: true,
              messageType: 'text'
            },
            {
              id: '3',
              senderId: '3',
              senderName: 'Ambulance Dispatch',
              senderRole: 'ambulance',
              receiverId: user.id,
              content: 'Emergency response completed. Thank you for your cooperation.',
              timestamp: new Date(now.getTime() - 30 * 60 * 1000),
              isRead: false,
              messageType: 'emergency'
            }
          ];
        
        case 'ambulance':
          return [
            {
              id: '1',
              senderId: '1',
              senderName: 'Dispatch Center',
              senderRole: 'dispatch',
              receiverId: user.id,
              content: 'Emergency call at Thamel. Cardiac emergency. Proceed immediately.',
              timestamp: new Date(now.getTime() - 15 * 60 * 1000),
              isRead: false,
              messageType: 'emergency'
            },
            {
              id: '2',
              senderId: user.id,
              senderName: user.name,
              senderRole: user.role,
              receiverId: '1',
              content: 'En route to location. ETA 8 minutes.',
              timestamp: new Date(now.getTime() - 12 * 60 * 1000),
              isRead: true,
              messageType: 'text'
            },
            {
              id: '3',
              senderId: '2',
              senderName: 'Bir Hospital',
              senderRole: 'hospital',
              receiverId: user.id,
              content: 'ER prepared for cardiac patient. Bring directly to trauma bay 2.',
              timestamp: new Date(now.getTime() - 8 * 60 * 1000),
              isRead: false,
              messageType: 'system'
            }
          ];
        
        default:
          return [];
      }
    };

    const generateChatGroups = () => {
      switch(user?.role) {
        case 'hospital':
          return [
            {
              id: '1',
              name: 'Emergency Response Team',
              type: 'emergency',
              members: ['doctor', 'nurse', 'admin'],
              unreadCount: 3
            },
            {
              id: '2',
              name: 'Daily Operations',
              type: 'operations',
              members: ['admin', 'reception', 'security'],
              unreadCount: 1
            }
          ];
        case 'ambulance':
          return [
            {
              id: '1',
              name: 'Ambulance Fleet',
              type: 'fleet',
              members: ['ambulance1', 'ambulance2', 'ambulance3'],
              unreadCount: 2
            }
          ];
        default:
          return [];
      }
    };

    setContacts(generateContacts());
    setMessages(generateMessages());
    setChatGroups(generateChatGroups());
  }, [user?.role]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || (!selectedContact && !selectedGroup)) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: user!.id,
      senderName: user!.name,
      senderRole: user!.role,
      receiverId: selectedContact?.id || selectedGroup?.id || '',
      content: newMessage,
      timestamp: new Date(),
      isRead: false,
      messageType: 'text'
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    toast({
      title: "Message Sent",
      description: `Message sent to ${selectedContact?.name || selectedGroup?.name}`,
    });
  };

  const handleContactSelect = (contact: Contact) => {
    setSelectedContact(contact);
    setSelectedGroup(null);
    
    // Mark messages as read
    setMessages(prev => prev.map(msg => 
      msg.senderId === contact.id ? { ...msg, isRead: true } : msg
    ));
    
    // Update contact unread count
    setContacts(prev => prev.map(c => 
      c.id === contact.id ? { ...c, unreadCount: 0 } : c
    ));
  };

  const getMessagesForContact = (contactId: string) => {
    return messages.filter(msg => 
      (msg.senderId === contactId && msg.receiverId === user?.id) ||
      (msg.senderId === user?.id && msg.receiverId === contactId)
    ).sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalUnreadMessages = contacts.reduce((sum, contact) => sum + contact.unreadCount, 0) +
    chatGroups.reduce((sum, group) => sum + group.unreadCount, 0);

  return (
    <DashboardLayout
      title="Communication Center"
      description="Stay connected with your healthcare team"
      headerActions={
        <div className="flex items-center gap-2">
          {totalUnreadMessages > 0 && (
            <Badge variant="destructive">{totalUnreadMessages} unread</Badge>
          )}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Users size={14} className="mr-2" />
                New Group
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Group Chat</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input placeholder="Group name" />
                <div className="space-y-2">
                  <p className="text-sm font-medium">Add members:</p>
                  {contacts.map(contact => (
                    <div key={contact.id} className="flex items-center space-x-2">
                      <input type="checkbox" id={contact.id} />
                      <label htmlFor={contact.id} className="text-sm">{contact.name}</label>
                    </div>
                  ))}
                </div>
                <Button className="w-full">Create Group</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[600px]">
        {/* Contacts/Groups Sidebar */}
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader className="pb-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search conversations..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <div className="border-b px-3">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="contacts" className="relative">
                      Contacts
                      {contacts.some(c => c.unreadCount > 0) && (
                        <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                      )}
                    </TabsTrigger>
                    <TabsTrigger value="groups" className="relative">
                      Groups
                      {chatGroups.some(g => g.unreadCount > 0) && (
                        <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                      )}
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="contacts" className="m-0">
                  <div className="max-h-96 overflow-y-auto">
                    {filteredContacts.map(contact => (
                      <div 
                        key={contact.id}
                        className={`p-3 border-b hover:bg-gray-50 cursor-pointer ${
                          selectedContact?.id === contact.id ? 'bg-blue-50' : ''
                        }`}
                        onClick={() => handleContactSelect(contact)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={contact.avatar} />
                                <AvatarFallback>
                                  {contact.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              {contact.isOnline && (
                                <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></span>
                              )}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-sm">{contact.name}</h4>
                              <p className="text-xs text-gray-500 capitalize">{contact.role}</p>
                              {!contact.isOnline && contact.lastSeen && (
                                <p className="text-xs text-gray-400">
                                  Last seen {contact.lastSeen.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                              )}
                            </div>
                          </div>
                          {contact.unreadCount > 0 && (
                            <Badge variant="destructive" className="text-xs">
                              {contact.unreadCount}
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="groups" className="m-0">
                  <div className="max-h-96 overflow-y-auto">
                    {chatGroups.map(group => (
                      <div 
                        key={group.id}
                        className={`p-3 border-b hover:bg-gray-50 cursor-pointer ${
                          selectedGroup?.id === group.id ? 'bg-blue-50' : ''
                        }`}
                        onClick={() => {
                          setSelectedGroup(group);
                          setSelectedContact(null);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <Users size={16} className="text-blue-600" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-sm">{group.name}</h4>
                              <p className="text-xs text-gray-500">{group.members.length} members</p>
                            </div>
                          </div>
                          {group.unreadCount > 0 && (
                            <Badge variant="destructive" className="text-xs">
                              {group.unreadCount}
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-3">
          {selectedContact || selectedGroup ? (
            <Card className="h-full flex flex-col">
              {/* Chat Header */}
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {selectedContact ? (
                      <>
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={selectedContact.avatar} />
                          <AvatarFallback>
                            {selectedContact.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{selectedContact.name}</h3>
                          <p className="text-sm text-gray-500 capitalize">
                            {selectedContact.isOnline ? 'Online' : 'Offline'} • {selectedContact.role}
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Users size={16} className="text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">{selectedGroup?.name}</h3>
                          <p className="text-sm text-gray-500">{selectedGroup?.members.length} members</p>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Phone size={14} />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Video size={14} />
                    </Button>
                    <Button variant="outline" size="sm">
                      <MoreVertical size={14} />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {selectedContact && getMessagesForContact(selectedContact.id).map(message => (
                  <div 
                    key={message.id}
                    className={`flex ${message.senderId === user?.id ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.senderId === user?.id 
                        ? 'bg-blue-500 text-white' 
                        : message.messageType === 'emergency'
                          ? 'bg-red-100 text-red-800 border border-red-200'
                          : 'bg-gray-100 text-gray-800'
                    }`}>
                      {message.messageType === 'emergency' && (
                        <div className="flex items-center gap-1 mb-1">
                          <Bell size={12} />
                          <span className="text-xs font-medium">Emergency</span>
                        </div>
                      )}
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.senderId === user?.id ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="border-t p-4">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Paperclip size={14} />
                  </Button>
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                    <Send size={14} />
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="h-full flex items-center justify-center">
              <div className="text-center">
                <MessageSquare size={48} className="mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium mb-2">No conversation selected</h3>
                <p className="text-gray-500">Choose a contact or group to start messaging</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MessagesPage;
