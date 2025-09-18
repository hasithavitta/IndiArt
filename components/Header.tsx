import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const WeaveIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 20.22V3.78a2.64 2.64 0 0 1 2.75-2.64h4.5A2.75 2.75 0 0 1 17 3.78v16.44"/>
        <path d="M2 12h20"/>
        <path d="M12 2v20"/>
    </svg>
);


export const Header: React.FC = () => {
  const { t } = useLanguage();
  return (
    <header className="bg-white/80 backdrop-blur-sm shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <WeaveIcon />
          <h1 className="text-2xl font-bold font-serif text-brand-primary tracking-tight">
            {t('header_title')}
          </h1>
        </div>
        <p className="hidden md:block text-sm text-gray-500">{t('header_subtitle')}</p>
      </div>
    </header>
  );
};
