import React from 'react';
import type { Language } from '../types';
import { translations } from '../i18n/translations';

interface LanguageSelectorProps {
    onSelectLanguage: (lang: Language) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ onSelectLanguage }) => {
    const englishTranslations = translations.en;

    return (
        <div className="bg-white p-8 rounded-xl shadow-lg text-center animate-fade-in max-w-md w-full">
            <h2 className="text-2xl font-serif font-bold text-brand-primary mb-2">
                {englishTranslations.language_selector_title as string}
            </h2>
            <p className="text-gray-500 mb-6">Please select your preferred language.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(translations.en.languages).map(([key, label]) => (
                    <button
                        key={key}
                        onClick={() => onSelectLanguage(key as Language)}
                        className="w-full text-left p-4 rounded-lg bg-brand-secondary hover:bg-brand-accent hover:text-white transition-colors duration-200 font-semibold text-brand-primary"
                    >
                        {(translations[key as Language].languages as Record<Language, string>)[key as Language]}
                    </button>
                ))}
            </div>
        </div>
    );
};
