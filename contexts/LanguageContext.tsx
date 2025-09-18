import React, { createContext, useContext } from 'react';
import type { Language, ContentType } from '../types';
import { getTranslator } from '../i18n/translations';

interface LanguageContextType {
  language: Language;
  t: (key: string, replacements?: { [key: string]: string | number }) => string;
  tContentType: (key: ContentType) => string;
  tLanguage: (key: Language) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ language: Language; children: React.ReactNode }> = ({ language, children }) => {
  const translator = getTranslator(language);

  const value = {
    language,
    ...translator,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
