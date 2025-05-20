
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Globe, Languages } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className={cn(
            "rounded-md border-2 gap-2 font-medium",
            language === 'en' 
              ? "border-nepal-royal-blue text-nepal-royal-blue hover:bg-nepal-royal-blue/10" 
              : "border-nepal-crimson text-nepal-crimson hover:bg-nepal-crimson/10"
          )}
        >
          <Globe className="h-4 w-4" />
          {language === 'en' ? 'English' : 'नेपाली'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[120px]">
        <DropdownMenuItem 
          onClick={() => setLanguage('en')} 
          className={cn(
            "flex items-center gap-2", 
            language === 'en' ? "bg-nepal-royal-blue/10 text-nepal-royal-blue font-medium" : ""
          )}
        >
          <Globe className="h-4 w-4" />
          <span>English</span>
          {language === 'en' && <span className="ml-auto text-xs">✓</span>}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setLanguage('np')} 
          className={cn(
            "flex items-center gap-2",
            language === 'np' ? "bg-nepal-crimson/10 text-nepal-crimson font-medium" : ""
          )}
        >
          <Globe className="h-4 w-4" />
          <span>नेपाली</span>
          {language === 'np' && <span className="ml-auto text-xs">✓</span>}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
