
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import {
  MessageSquare,
  Send,
  Bot,
  User,
  Phone,
  FileText,
  Calendar,
  Heart,
  X,
  Minimize2,
  Maximize2,
  PhoneCall,
  UserPlus,
  AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  suggestions?: string[];
  callOptions?: { type: string; label: string; icon: React.ReactNode }[];
}

interface AIChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  isMinimized: boolean;
  onToggleMinimize: () => void;
}

const AIChatbot: React.FC<AIChatbotProps> = ({ isOpen, onClose, isMinimized, onToggleMinimize }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hello! I\'m your AI health assistant. I can help you with medical records, appointments, emergency contacts, and more. How can I assist you today?',
      timestamp: new Date(),
      suggestions: ['Show my medical records', 'Book an appointment', 'Emergency contacts', 'Health reminders']
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const processUserQuery = (query: string): Message => {
    const lowerQuery = query.toLowerCase();
    
    // Medical records query
    if (lowerQuery.includes('medical record') || lowerQuery.includes('records')) {
      const dateMatch = lowerQuery.match(/(\d{1,2}(?:st|nd|rd|th)?\s+(?:january|february|march|april|may|june|july|august|september|october|november|december)|july\s+31|31st\s+july)/);
      
      if (dateMatch) {
        return {
          id: Date.now().toString(),
          type: 'bot',
          content: `Here are your medical records for ${dateMatch[0]}:\n\n📋 **Consultation**: Dr. Sarah Johnson - Cardiology\n🩺 **Diagnosis**: Routine checkup\n💊 **Medications**: Aspirin 75mg daily\n📊 **Test Results**: Blood pressure 120/80, Heart rate 72 bpm\n📅 **Next Appointment**: August 15th, 2024`,
          timestamp: new Date(),
          suggestions: ['View all records', 'Download report', 'Schedule follow-up']
        };
      }
      
      return {
        id: Date.now().toString(),
        type: 'bot',
        content: '📋 Here are your recent medical records:\n\n• July 31, 2024 - Cardiology Consultation\n• July 15, 2024 - Blood Test Results\n• June 28, 2024 - Annual Physical\n\nWhich record would you like to view in detail?',
        timestamp: new Date(),
        suggestions: ['July 31 records', 'Blood test results', 'Annual physical report']
      };
    }

    // Call/messaging queries
    if (lowerQuery.includes('call') || lowerQuery.includes('phone') || lowerQuery.includes('contact')) {
      return {
        id: Date.now().toString(),
        type: 'bot',
        content: 'I can help you make a call. Here are your options:',
        timestamp: new Date(),
        callOptions: [
          { type: 'doctor', label: 'Call Doctor', icon: <UserPlus size={16} /> },
          { type: 'emergency', label: 'Emergency Services', icon: <AlertTriangle size={16} /> },
          { type: 'nurse', label: 'Home Care Nurse', icon: <Heart size={16} /> },
          { type: 'hospital', label: 'Hospital Reception', icon: <Phone size={16} /> }
        ]
      };
    }

    // Appointment queries
    if (lowerQuery.includes('appointment') || lowerQuery.includes('schedule')) {
      return {
        id: Date.now().toString(),
        type: 'bot',
        content: '📅 Your upcoming appointments:\n\n• **Tomorrow 2:00 PM** - Dr. Sarah Johnson (Cardiology)\n• **Friday 10:00 AM** - Blood Test Lab\n• **Next Week** - Dental Checkup\n\nWould you like to schedule a new appointment?',
        timestamp: new Date(),
        suggestions: ['Schedule new appointment', 'Reschedule existing', 'View all appointments']
      };
    }

    // Emergency queries
    if (lowerQuery.includes('emergency') || lowerQuery.includes('help') || lowerQuery.includes('urgent')) {
      return {
        id: Date.now().toString(),
        type: 'bot',
        content: '🚨 **Emergency Assistance Available**\n\n• Call Emergency Services: 911\n• Nearest Hospital: City General (2.3 km)\n• Emergency Contact: John Doe (+1-234-567-8900)\n\nIs this a medical emergency? Should I initiate an emergency response?',
        timestamp: new Date(),
        callOptions: [
          { type: 'emergency', label: 'Call 911', icon: <AlertTriangle size={16} /> },
          { type: 'hospital', label: 'Call Hospital', icon: <Phone size={16} /> },
          { type: 'contact', label: 'Emergency Contact', icon: <UserPlus size={16} /> }
        ]
      };
    }

    // Default response
    return {
      id: Date.now().toString(),
      type: 'bot',
      content: 'I can help you with:\n\n• 📋 Medical records and reports\n• 📅 Appointment scheduling\n• 📞 Making calls to doctors/emergency\n• 💊 Medication reminders\n• 🏥 Hospital information\n• 🚨 Emergency assistance\n\nWhat would you like to know about?',
      timestamp: new Date(),
      suggestions: ['My medical records', 'Book appointment', 'Emergency contacts', 'Medication schedule']
    };
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse = processUserQuery(inputValue);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    handleSendMessage();
  };

  const handleCallOption = (option: { type: string; label: string }) => {
    const callMessage: Message = {
      id: Date.now().toString(),
      type: 'bot',
      content: `Initiating call to ${option.label}... 📞\n\nCall connected! You can now speak with ${option.label}.`,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, callMessage]);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 20 }}
        className={`fixed bottom-4 right-4 z-50 ${isMinimized ? 'w-80 h-16' : 'w-96 h-[500px]'} transition-all duration-300`}
      >
        <Card className="h-full border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
          <CardHeader className="p-4 border-b bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Bot size={24} />
                </motion.div>
                <div>
                  <CardTitle className="text-sm font-semibold">AI Health Assistant</CardTitle>
                  <p className="text-xs text-blue-100">Online & Ready to Help</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onToggleMinimize}
                  className="text-white hover:bg-white/20 h-8 w-8 p-0"
                >
                  {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-white hover:bg-white/20 h-8 w-8 p-0"
                >
                  <X size={16} />
                </Button>
              </div>
            </div>
          </CardHeader>

          {!isMinimized && (
            <CardContent className="p-0 h-full flex flex-col">
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                        <div className={`flex items-start gap-2 ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            message.type === 'user' 
                              ? 'bg-blue-500 text-white' 
                              : 'bg-gradient-to-br from-purple-500 to-blue-500 text-white'
                          }`}>
                            {message.type === 'user' ? <User size={16} /> : <Bot size={16} />}
                          </div>
                          <div className={`rounded-lg p-3 ${
                            message.type === 'user'
                              ? 'bg-blue-500 text-white ml-2'
                              : 'bg-gray-100 text-gray-800 mr-2'
                          }`}>
                            <p className="text-sm whitespace-pre-line">{message.content}</p>
                            <p className="text-xs opacity-70 mt-1">
                              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </div>

                        {/* Suggestions */}
                        {message.suggestions && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {message.suggestions.map((suggestion, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="cursor-pointer hover:bg-blue-50 text-xs"
                                onClick={() => handleSuggestionClick(suggestion)}
                              >
                                {suggestion}
                              </Badge>
                            ))}
                          </div>
                        )}

                        {/* Call Options */}
                        {message.callOptions && (
                          <div className="mt-2 space-y-1">
                            {message.callOptions.map((option, index) => (
                              <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                className="w-full justify-start text-xs"
                                onClick={() => handleCallOption(option)}
                              >
                                {option.icon}
                                <span className="ml-2">{option.label}</span>
                                <PhoneCall size={12} className="ml-auto" />
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}

                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-white flex items-center justify-center">
                          <Bot size={16} />
                        </div>
                        <div className="bg-gray-100 rounded-lg p-3">
                          <div className="flex gap-1">
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 0.5, repeat: Infinity, delay: 0 }}
                              className="w-2 h-2 bg-gray-400 rounded-full"
                            />
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 0.5, repeat: Infinity, delay: 0.1 }}
                              className="w-2 h-2 bg-gray-400 rounded-full"
                            />
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }}
                              className="w-2 h-2 bg-gray-400 rounded-full"
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
                <div ref={messagesEndRef} />
              </ScrollArea>

              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask about records, appointments, calls..."
                    className="flex-1"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <Button 
                    onClick={handleSendMessage}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    disabled={!inputValue.trim()}
                  >
                    <Send size={16} />
                  </Button>
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};

export default AIChatbot;
