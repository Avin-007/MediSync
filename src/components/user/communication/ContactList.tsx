
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Contact } from './types';

interface ContactListProps {
  contacts: Contact[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onContactSelect: (contactId: string) => void;
}

const ContactList: React.FC<ContactListProps> = ({
  contacts,
  searchQuery,
  onSearchChange,
  onContactSelect
}) => {
  const { t } = useLanguage();
  
  return (
    <>
      <div className="p-3">
        <Input 
          placeholder={t('searchContacts')} 
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      <ScrollArea className="h-[calc(500px-48px)]">
        <div className="divide-y">
          {contacts.map((contact) => (
            <div 
              key={contact.id}
              className="p-3 flex items-center gap-3 hover:bg-muted/20 cursor-pointer transition-colors"
              onClick={() => onContactSelect(contact.id)}
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
    </>
  );
};

export default ContactList;
