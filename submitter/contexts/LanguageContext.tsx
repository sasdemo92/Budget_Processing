
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, LanguageContextType } from '../types';
import { translations } from '../translations';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ar');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  const isRtl = language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRtl }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
