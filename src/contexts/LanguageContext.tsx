
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'np';

// English and Nepali translations
const translations = {
  en: {
    // General
    welcome: 'Welcome',
    login: 'Login',
    logout: 'Logout',
    settings: 'Settings',
    notifications: 'Notifications',
    search: 'Search',
    close: 'Close',
    save: 'Save',
    cancel: 'Cancel',
    confirm: 'Confirm',
    active: 'Active',
    more: 'more',
    
    // Authentication
    email: 'Email',
    password: 'Password',
    loginAs: 'Login As',
    
    // Navigation & Portals
    dashboard: 'Dashboard',
    emergency: 'Emergency',
    health: 'Health',
    doctors: 'Doctors',
    marketplace: 'Marketplace',
    bloodDonation: 'Blood Donation',
    familyRecords: 'Family Records',
    payments: 'Payments',
    weather: 'Weather',
    patientPortal: 'Patient Portal',
    ambulancePortal: 'Ambulance Portal',
    hospitalPortal: 'Hospital Portal',
    trafficPortal: 'Traffic Portal',
    nursePortal: 'Nurse Portal',
    
    // Landing Page
    completeHealthcare: 'Complete Healthcare Platform for Nepal',
    healthcareDescription: 'Your all-in-one solution for emergency response, health monitoring, symptom tracking, and connecting with healthcare providers throughout Nepal.',
    getStarted: 'Get Started',
    learnMore: 'Learn More',
    selectYourRole: 'Select Your Role',
    accessSpecializedFeatures: 'Access specialized features based on your role',
    emergencyContacts: 'Emergency Contacts',
    
    // Nepal-specific
    nepalHealthInitiative: 'Nepal Healthcare Initiative',
    nepalHealthInitiativeDescription: 'Connecting people across Nepal with healthcare services, from remote mountain villages to urban centers.',
    remoteRegionAccess: 'Remote Region Access',
    remoteRegionAccessDesc: 'Special features for those in remote areas with limited connectivity and healthcare access.',
    disasterResponseInfrastructure: 'Disaster Response',
    disasterResponseInfrastructureDesc: 'Built-in systems to coordinate healthcare during earthquakes, floods, and other natural disasters.',
    designedForNepal: 'Designed for Nepal\'s Unique Challenges',
    designedForNepalDesc: 'Tailored solutions that address Nepal\'s specific healthcare infrastructure and geographical challenges.',
    
    // Features
    aiPowered: 'AI-Powered',
    realTimeTracking: 'Real-time Tracking',
    emergencyResponse: 'Emergency Response',
    medicationDelivery: 'Medication Delivery',
    comprehensiveHealthcareFeatures: 'Comprehensive Healthcare Features',
    mediSyncOffersFeatures: 'MediSync offers a complete suite of healthcare tools for patients, medical professionals, and emergency services',
    aiHealthAssistant: 'AI Health Assistant',
    aiHealthAssistantDesc: 'Get intelligent recommendations, track symptoms, and monitor your health with our AI-powered system',
    emergencyServices: 'Emergency Services',
    emergencyServicesDesc: 'Request emergency medical help with real-time tracking and traffic optimization for ambulances',
    medicationMarketplace: 'Medication Marketplace',
    medicationMarketplaceDesc: 'Order prescriptions, over-the-counter medications and healthcare products with home delivery',
    
    // How it works
    howMediSyncWorks: 'How MediSync Works For You',
    ourPlatformConnects: 'Our platform connects all aspects of healthcare into one seamless experience',
    trackYourHealth: 'Track Your Health',
    trackYourHealthDesc: 'Monitor symptoms, medications, and vital signs with our AI-powered tracking system',
    connectWithProfessionals: 'Connect With Professionals',
    connectWithProfessionalsDesc: 'Find and communicate with doctors, hospitals and specialists based on your needs',
    manageMediactions: 'Manage Medications',
    manageMediactionsDesc: 'Order prescriptions through our marketplace and get them delivered to your doorstep',
    emergencyResponseDesc: 'Request emergency services with real-time tracking and optimized routing',
    
    // Stakeholders
    solutionsForStakeholders: 'Solutions for Every Healthcare Stakeholder',
    mediSyncProvidesTools: 'MediSync provides specialized tools for everyone involved in healthcare',
    patients: 'Patients',
    patientsDesc: 'Track symptoms, connect with doctors, and manage medications',
    doctorsAndNurses: 'Doctors & Nurses',
    doctorsAndNursesDesc: 'Manage patients, schedules, and respond to home visit requests',
    emergencyServicesRoleDesc: 'Optimize routes, coordinate with hospitals, and respond quickly',
    hospitalsAndPharmacies: 'Hospitals & Pharmacies',
    hospitalsAndPharmaciesDesc: 'Manage resources, inventories, and coordinate emergency response',
    
    // Call to action
    readyToTransform: 'Ready to Transform Your Healthcare Experience?',
    joinThousands: 'Join thousands of users who rely on MediSync for their healthcare needs.',
    signUpNow: 'Sign Up Now',
    
    // Blood Donation
    checkAvailability: 'Check Availability',
    donateBlood: 'Donate Blood',
    requestBlood: 'Request Blood',
    bloodType: 'Blood Type',
    nearbyDonors: 'Nearby Donors',
    scheduleDonation: 'Schedule Donation',
    bloodDonationHistory: 'Donation History',
    bloodRequestHistory: 'Request History',
    lastDonated: 'Last Donated',
    eligibleToDonate: 'Eligible to Donate',
    notEligibleYet: 'Not Eligible Yet',
    daysUntilEligible: 'days until eligible',
    nearbyDonationCenters: 'Nearby Donation Centers',
    
    // Doctor Finder
    findDoctor: 'Find a Doctor',
    searchDoctorDesc: 'Search for doctors by name, specialty, or location',
    searchByNameSpecialtyHospital: 'Search by name, specialty, or hospital',
    selectSpecialty: 'Select specialty',
    insurance: 'Insurance',
    availableToday: 'Available Today',
    anyAvailability: 'Any Availability',
    doctorFound: 'Doctor Found',
    doctorsFound: 'Doctors Found',
    sortBy: 'Sort By',
    highestRated: 'Highest Rated',
    mostReviewed: 'Most Reviewed',
    alphabetical: 'Alphabetical',
    nextAvailable: 'Next Available',
    today: 'Today, 3:30 PM',
    tomorrow: 'Tomorrow, 10:15 AM',
    todayTime1: 'Today, 3:30 PM',
    todayTime2: 'Today, 4:45 PM',
    tomorrowTime1: 'Tomorrow, 10:15 AM',
    tomorrowTime2: 'Tomorrow, 2:00 PM',
    tomorrowTime3: 'Tomorrow, 3:30 PM',
    dayAfterTomorrow: 'Day after, 11:00 AM',
    bookNow: 'Book Now',
    noDoctorsFound: 'No doctors found',
    adjustSearchCriteria: 'Try adjusting your search criteria',
    about: 'About',
    schedule: 'Schedule',
    reviews: 'Reviews',
    experience: 'Experience',
    education: 'Education',
    hospital: 'Hospital',
    acceptedInsurance: 'Accepted Insurance',
    contact: 'Contact',
    availableAppointments: 'Available Appointments',
    bookAppointment: 'Book Appointment',
    basedOn: 'Based on',
    excellentDoctorReview: 'Excellent doctor! Very thorough and takes time to explain everything.',
    professionalDoctorReview: 'Professional and knowledgeable. Wait time was a bit long though.',
    doctorDetails: 'Doctor Details',
    selectDoctorPrompt: 'Select a doctor to view detailed information',
    
    // Weather and Health Alerts
    weatherHealthAlerts: 'Weather & Health Alerts',
    airQualityIndex: 'Air Quality Index',
    allergyAlert: 'Allergy Alert',
    fluAlert: 'Flu Alert',
    viralHealthAlert: 'Viral Health Alert',
    temperatureToday: 'Temperature Today',
    currentAQI: 'Current AQI',
    moderate: 'Moderate',
    good: 'Good',
    poor: 'Poor',
    hazardous: 'Hazardous',
    highPollen: 'High Pollen',
    lowPollen: 'Low Pollen',
    seasonalFlu: 'Seasonal Flu',
    precautionsMeasures: 'Precautions & Measures',
    seeDetails: 'See Details',
    weatherAlertDesc: 'Get real-time weather and health alerts for your area',
    
    // Family Records
    viewFamilyRecords: 'View Family Records',
    addFamilyMember: 'Add Family Member',
    medicalHistory: 'Medical History',
    upcomingAppointments: 'Upcoming Appointments',
    medications: 'Medications',
    healthMetrics: 'Health Metrics',
    
    // Payments
    accountBalance: 'Account Balance',
    addFunds: 'Add Funds',
    recentTransactions: 'Recent Transactions',
    pendingBills: 'Pending Bills',
    paymentMethods: 'Payment Methods',
    insuranceClaims: 'Insurance Claims',
  },
  np: {
    // General
    welcome: 'स्वागत छ',
    login: 'लग-इन',
    logout: 'लग-आउट',
    settings: 'सेटिङहरू',
    notifications: 'सूचनाहरू',
    search: 'खोज्नुहोस्',
    close: 'बन्द गर्नुहोस्',
    save: 'बचत गर्नुहोस्',
    cancel: 'रद्द गर्नुहोस्',
    confirm: 'पुष्टि गर्नुहोस्',
    active: 'सक्रिय',
    more: 'थप',
    
    // Authentication
    email: 'इमेल',
    password: 'पासवर्ड',
    loginAs: 'यसको रूपमा लग इन गर्नुहोस्',
    
    // Navigation & Portals
    dashboard: 'ड्यासबोर्ड',
    emergency: 'आपतकालीन',
    health: 'स्वास्थ्य',
    doctors: 'डाक्टरहरू',
    marketplace: 'बजार',
    bloodDonation: 'रक्तदान',
    familyRecords: 'परिवार रेकर्ड',
    payments: 'भुक्तानीहरू',
    weather: 'मौसम',
    patientPortal: 'बिरामी पोर्टल',
    ambulancePortal: 'एम्बुलेन्स पोर्टल',
    hospitalPortal: 'अस्पताल पोर्टल',
    trafficPortal: 'ट्राफिक पोर्टल',
    nursePortal: 'नर्स पोर्टल',
    
    // Landing Page
    completeHealthcare: 'नेपालको लागि पूर्ण स्वास्थ्य सेवा प्लेटफर्म',
    healthcareDescription: 'नेपाल भरिका आपतकालीन प्रतिक्रिया, स्वास्थ्य अनुगमन, लक्षण ट्र्याकिङ, र स्वास्थ्य सेवा प्रदायकहरूसँग जोड्ने तपाईंको सम्पूर्ण समाधान।',
    getStarted: 'सुरु गर्नुहोस्',
    learnMore: 'थप जान्नुहोस्',
    selectYourRole: 'आफ्नो भूमिका चयन गर्नुहोस्',
    accessSpecializedFeatures: 'तपाईंको भूमिकाको आधारमा विशेष सुविधाहरू पहुँच गर्नुहोस्',
    emergencyContacts: 'आपतकालीन सम्पर्कहरू',
    
    // Nepal-specific
    nepalHealthInitiative: 'नेपाल स्वास्थ्य सेवा पहल',
    nepalHealthInitiativeDescription: 'दुर्गम पहाडी गाउँहरूदेखि शहरी केन्द्रहरूसम्म, नेपालभरका मानिसहरूलाई स्वास्थ्य सेवाहरूसँग जोड्दै।',
    remoteRegionAccess: 'दुर्गम क्षेत्र पहुँच',
    remoteRegionAccessDesc: 'सीमित कनेक्टिभिटी र स्वास्थ्य सेवा पहुँचका साथ दुर्गम क्षेत्रहरूमा रहेकाहरूका लागि विशेष सुविधाहरू।',
    disasterResponseInfrastructure: 'विपद् प्रतिक्रिया',
    disasterResponseInfrastructureDesc: 'भूकम्प, बाढी र अन्य प्राकृतिक प्रकोपहरूको समयमा स्वास्थ्य सेवाको समन्वय गर्न अन्तर्निहित प्रणालीहरू।',
    designedForNepal: 'नेपालको अद्वितीय चुनौतीहरूका लागि डिजाइन गरिएको',
    designedForNepalDesc: 'नेपालको विशिष्ट स्वास्थ्य पूर्वाधार र भौगोलिक चुनौतीहरूलाई सम्बोधन गर्ने अनुकूलित समाधानहरू।',
    
    // Features
    aiPowered: 'एआई-संचालित',
    realTimeTracking: 'रियल-टाइम ट्र्याकिङ',
    emergencyResponse: 'आपतकालीन प्रतिक्रिया',
    medicationDelivery: 'औषधि वितरण',
    comprehensiveHealthcareFeatures: 'व्यापक स्वास्थ्य सेवा सुविधाहरू',
    mediSyncOffersFeatures: 'मेडिसिन्क बिरामीहरू, चिकित्सा पेशेवरहरू, र आपतकालीन सेवाहरूका लागि स्वास्थ्य उपकरणहरूको पूर्ण सेट प्रदान गर्दछ',
    aiHealthAssistant: 'एआई स्वास्थ्य सहायक',
    aiHealthAssistantDesc: 'हाम्रो एआई-संचालित प्रणालीको साथमा बुद्धिमान सिफारिसहरू प्राप्त गर्नुहोस्, लक्षणहरू ट्र्याक गर्नुहोस्, र आफ्नो स्वास्थ्य अनुगमन गर्नुहोस्',
    emergencyServices: 'आपतकालीन सेवाहरू',
    emergencyServicesDesc: 'एम्बुलेन्सका लागि रियल-टाइम ट्र्याकिङ र ट्राफिक अनुकूलनका साथ आपतकालीन चिकित्सा सहायताको अनुरोध गर्नुहोस्',
    medicationMarketplace: 'औषधि बजार',
    medicationMarketplaceDesc: 'प्रिस्क्रिप्शनहरू, ओभर-द-काउन्टर औषधिहरू र स्वास्थ्य उत्पादनहरू अर्डर गर्नुहोस् र घरमा डेलिभरी गर्नुहोस्',
    
    // How it works
    howMediSyncWorks: 'मेडिसिन्क तपाईंको लागि कसरी काम गर्छ',
    ourPlatformConnects: 'हाम्रो प्लेटफर्मले स्वास्थ्य सेवाका सबै पक्षहरूलाई एक सहज अनुभवमा जोड्छ',
    trackYourHealth: 'आफ्नो स्वास्थ्य ट्र्याक गर्नुहोस्',
    trackYourHealthDesc: 'हाम्रो एआई-संचालित ट्र्याकिङ प्रणालीको साथमा लक्षणहरू, औषधिहरू, र महत्त्वपूर्ण संकेतहरू अनुगमन गर्नुहोस्',
    connectWithProfessionals: 'पेशेवरहरूसँग जोडिनुहोस्',
    connectWithProfessionalsDesc: 'तपाईंको आवश्यकताको आधारमा डाक्टरहरू, अस्पतालहरू र विशेषज्ञहरू पत्ता लगाउनुहोस् र सञ्चार गर्नुहोस्',
    manageMediactions: 'औषधिहरू व्यवस्थापन गर्नुहोस्',
    manageMediactionsDesc: 'हाम्रो बजारको माध्यमबाट प्रिस्क्रिप्शनहरू अर्डर गर्नुहोस् र तिनीहरू तपाईंको घरदैलोमा डेलिभरी गर्नुहोस्',
    emergencyResponseDesc: 'रियल-टाइम ट्र्याकिङ र अनुकूलित मार्गदर्शनका साथ आपतकालीन सेवाहरू अनुरोध गर्नुहोस्',
    
    // Stakeholders
    solutionsForStakeholders: 'प्रत्येक स्वास्थ्य सेवा सरोकारवालाका लागि समाधानहरू',
    mediSyncProvidesTools: 'मेडिसिन्कले स्वास्थ्य सेवामा संलग्न सबैका लागि विशेष उपकरणहरू प्रदान गर्दछ',
    patients: 'बिरामीहरू',
    patientsDesc: 'लक्षणहरू ट्र्याक गर्नुहोस्, डाक्टरहरूसँग जोड्नुहोस्, र औषधिहरू व्यवस्थापन गर्नुहोस्',
    doctorsAndNurses: 'डाक्टरहरू र नर्सहरू',
    doctorsAndNursesDesc: 'बिरामीहरू, समयतालिकाहरू व्यवस्थापन गर्नुहोस्, र घरमा भेट अनुरोधहरूमा प्रतिक्रिया दिनुहोस्',
    emergencyServicesRoleDesc: 'मार्गहरू अनुकूलन गर्नुहोस्, अस्पतालहरूसँग समन्वय गर्नुहोस्, र छिटो प्रतिक्रिया दिनुहोस्',
    hospitalsAndPharmacies: 'अस्पतालहरू र फार्मेसीहरू',
    hospitalsAndPharmaciesDesc: 'संसाधनहरू, इन्भेन्टरीहरू व्यवस्थापन गर्नुहोस्, र आपतकालीन प्रतिक्रिया समन्वय गर्नुहोस्',
    
    // Call to action
    readyToTransform: 'तपाईंको स्वास्थ्य सेवा अनुभव परिवर्तन गर्न तयार हुनुहुन्छ?',
    joinThousands: 'हजारौं प्रयोगकर्ताहरू जो आफ्नो स्वास्थ्य सेवा आवश्यकताहरूका लागि मेडिसिन्कमा भर पर्छन्।',
    signUpNow: 'अहिले साइन अप गर्नुहोस्',
    
    // Blood Donation
    checkAvailability: 'उपलब्धता जाँच्नुहोस्',
    donateBlood: 'रक्तदान गर्नुहोस्',
    requestBlood: 'रक्त अनुरोध गर्नुहोस्',
    bloodType: 'रक्त प्रकार',
    nearbyDonors: 'नजिकका दाताहरू',
    scheduleDonation: 'दान अनुसूची',
    bloodDonationHistory: 'दान इतिहास',
    bloodRequestHistory: 'अनुरोध इतिहास',
    lastDonated: 'पछिल्लो दान',
    eligibleToDonate: 'दान गर्न योग्य',
    notEligibleYet: 'अझै योग्य छैन',
    daysUntilEligible: 'योग्य नहुँदासम्म दिनहरू',
    nearbyDonationCenters: 'नजिकका दान केन्द्रहरू',
    
    // Doctor Finder
    findDoctor: 'डाक्टर खोज्नुहोस्',
    searchDoctorDesc: 'नाम, विशेषता, वा स्थानको आधारमा डाक्टरहरू खोज्नुहोस्',
    searchByNameSpecialtyHospital: 'नाम, विशेषता, वा अस्पताल द्वारा खोज्नुहोस्',
    selectSpecialty: 'विशेषता चयन गर्नुहोस्',
    insurance: 'बीमा',
    availableToday: 'आज उपलब्ध',
    anyAvailability: 'कुनै पनि उपलब्धता',
    doctorFound: 'डाक्टर पाइयो',
    doctorsFound: 'डाक्टरहरू पाइयो',
    sortBy: 'क्रमबद्ध गर्नुहोस्',
    highestRated: 'उच्च रेटिङ',
    mostReviewed: 'बढी समीक्षा',
    alphabetical: 'वर्णानुक्रम',
    nextAvailable: 'अर्को उपलब्ध',
    today: 'आज, ३:३० अपराह्न',
    tomorrow: 'भोलि, १०:१५ पूर्वाह्न',
    todayTime1: 'आज, ३:३० अपराह्न',
    todayTime2: 'आज, ४:४५ अपराह्न',
    tomorrowTime1: 'भोलि, १०:१५ पूर्वाह्न',
    tomorrowTime2: 'भोलि, २:०० अपराह्न',
    tomorrowTime3: 'भोलि, ३:३० अपराह्न',
    dayAfterTomorrow: 'पर्सि, ११:०० पूर्वाह्न',
    bookNow: 'अहिले बुक गर्नुहोस्',
    noDoctorsFound: 'कुनै डाक्टर पाइएन',
    adjustSearchCriteria: 'आफ्नो खोज मापदण्ड समायोजन गर्ने प्रयास गर्नुहोस्',
    about: 'बारेमा',
    schedule: 'समय तालिका',
    reviews: 'समीक्षाहरू',
    experience: 'अनुभव',
    education: 'शिक्षा',
    hospital: 'अस्पताल',
    acceptedInsurance: 'स्वीकृत बीमा',
    contact: 'सम्पर्क',
    availableAppointments: 'उपलब्ध अपोइन्टमेन्टहरू',
    bookAppointment: 'अपोइन्टमेन्ट बुक गर्नुहोस्',
    basedOn: 'आधारित',
    excellentDoctorReview: 'उत्कृष्ट डाक्टर! धेरै विस्तृत र सबै कुरा बुझाउन समय लिन्छन्।',
    professionalDoctorReview: 'पेशेवर र ज्ञानी। तर प्रतीक्षा समय केही लामो थियो।',
    doctorDetails: 'डाक्टर विवरण',
    selectDoctorPrompt: 'विस्तृत जानकारी हेर्न डाक्टर चयन गर्नुहोस्',
    
    // Weather and Health Alerts
    weatherHealthAlerts: 'मौसम र स्वास्थ्य चेतावनीहरू',
    airQualityIndex: 'वायु गुणस्तर सूचकांक',
    allergyAlert: 'एलर्जी चेतावनी',
    fluAlert: 'फ्लू चेतावनी',
    viralHealthAlert: 'भाइरल स्वास्थ्य चेतावनी',
    temperatureToday: 'आजको तापक्रम',
    currentAQI: 'हालको AQI',
    moderate: 'मध्यम',
    good: 'राम्रो',
    poor: 'खराब',
    hazardous: 'खतरनाक',
    highPollen: 'उच्च परागकण',
    lowPollen: 'न्यून परागकण',
    seasonalFlu: 'मौसमी फ्लू',
    precautionsMeasures: 'सावधानीहरू र उपायहरू',
    seeDetails: 'विवरण हेर्नुहोस्',
    weatherAlertDesc: 'आफ्नो क्षेत्रका लागि रियल-टाइम मौसम र स्वास्थ्य चेतावनीहरू प्राप्त गर्नुहोस्',
    
    // Family Records
    viewFamilyRecords: 'परिवार रेकर्ड हेर्नुहोस्',
    addFamilyMember: 'परिवार सदस्य थप्नुहोस्',
    medicalHistory: 'चिकित्सा इतिहास',
    upcomingAppointments: 'आगामी अपोइन्टमेन्टहरू',
    medications: 'औषधिहरू',
    healthMetrics: 'स्वास्थ्य मेट्रिक्स',
    
    // Payments
    accountBalance: 'खाता ब्यालेन्स',
    addFunds: 'कोष थप्नुहोस्',
    recentTransactions: 'हालका लेनदेनहरू',
    pendingBills: 'बाँकी बिलहरू',
    paymentMethods: 'भुक्तानी विधिहरू',
    insuranceClaims: 'बीमा दाबीहरू',
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Try to get saved language from localStorage
    const savedLanguage = localStorage.getItem('medisync_language');
    return (savedLanguage === 'np' ? 'np' : 'en') as Language;
  });

  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem('medisync_language', language);
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    if (!translations[language][key]) {
      console.warn(`Translation missing for key: ${key} in ${language}`);
      // Fallback to English if translation is missing
      return translations.en[key] || key;
    }
    return translations[language][key];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
