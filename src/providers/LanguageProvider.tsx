import React, { createContext, useContext, useMemo, useState } from 'react';
import en from '../translations/en.json';
import ro from '../translations/ro.json';

type LanguageCode = 'en' | 'ro';

type Dictionary = typeof en;

type LanguageContextValue = {
  language: LanguageCode;
  dictionary: Dictionary;
  toggleLanguage: () => void;
  setLanguage: (code: LanguageCode) => void;
};

const dictionaries: Record<LanguageCode, Dictionary> = {
  en,
  ro,
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export const LanguageProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>('en');

  const setLanguage = (code: LanguageCode) => {
    setLanguageState(code);
  };

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === 'en' ? 'ro' : 'en'));
  };

  const dictionary = useMemo(() => dictionaries[language], [language]);

  return (
    <LanguageContext.Provider value={{ language, dictionary, toggleLanguage, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
