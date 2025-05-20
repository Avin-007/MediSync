
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'np';

type Translations = {
  [key: string]: {
    en: string;
    np: string;
  };
};

// Add all translations here
const translations: Translations = {
  dashboard: { en: 'Dashboard', np: 'ड्यासबोर्ड' },
  emergency: { en: 'Emergency', np: 'आपतकालीन' },
  health: { en: 'Health AI', np: 'स्वास्थ्य एआई' },
  doctors: { en: 'Doctors', np: 'चिकित्सकहरू' },
  marketplace: { en: 'Marketplace', np: 'बजार' },
  bloodDonation: { en: 'Blood Donation', np: 'रक्तदान' },
  familyRecords: { en: 'Family Records', np: 'परिवारको रेकर्ड' },
  payments: { en: 'Payments', np: 'भुक्तानीहरू' },
  weather: { en: 'Weather Alerts', np: 'मौसम अलर्ट' },
  requestAmbulance: { en: 'Request Ambulance', np: 'एम्बुलेन्स अनुरोध' },
  requestNurse: { en: 'Request Nurse', np: 'नर्स अनुरोध' },
  emergencyContacts: { en: 'Emergency Contacts', np: 'आपतकालीन सम्पर्कहरू' },
  donateBlood: { en: 'Donate Blood', np: 'रक्तदान गर्नुहोस्' },
  findBlood: { en: 'Find Blood', np: 'रगत खोज्नुहोस्' },
  contactDonor: { en: 'Contact Donor', np: 'दाताको सम्पर्क' },
  viewBalance: { en: 'View Balance', np: 'ब्यालेन्स हेर्नुहोस्' },
  addFunds: { en: 'Add Funds', np: 'रकम थप्नुहोस्' },
  transactionHistory: { en: 'Transaction History', np: 'कारोबार इतिहास' },
  airQuality: { en: 'Air Quality', np: 'हावाको गुणस्तर' },
  fluAlert: { en: 'Flu Alert', np: 'फ्लु अलर्ट' },
  viralHazard: { en: 'Viral Health Hazards', np: 'भाइरल स्वास्थ्य खतराहरू' },
  precautions: { en: 'Precautions', np: 'सावधानीहरू' },
  welcome: { en: 'Welcome back', np: 'फेरि स्वागत छ' },
  patientPortal: { en: 'Patient Portal', np: 'बिरामी पोर्टल' },
  schedule: { en: 'Schedule', np: 'कार्यक्रम' },
  call: { en: 'Call', np: 'कल' },
  cancel: { en: 'Cancel', np: 'रद्द गर्नुहोस्' },
  active: { en: 'Active', np: 'सक्रिय' },
  submit: { en: 'Submit', np: 'पेश गर्नुहोस्' },
  search: { en: 'Search', np: 'खोज्नुहोस्' },
};

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key) => key,
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  // Load saved language preference from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage === 'np' || savedLanguage === 'en') {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    if (translations[key] && translations[key][language]) {
      return translations[key][language];
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
