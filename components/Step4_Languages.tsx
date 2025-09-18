import React from 'react';
import { StepWrapper } from './StepWrapper';
import { LANGUAGES, Language } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface Step4_LanguagesProps {
  selectedLanguages: Language[];
  onSelectedLanguagesChange: (langs: Language[]) => void;
  onGenerate: () => void;
  isLoading: boolean;
  onBack: () => void;
}

export const Step4_Languages: React.FC<Step4_LanguagesProps> = ({
  selectedLanguages,
  onSelectedLanguagesChange,
  onGenerate,
  isLoading,
  onBack,
}) => {
  const { t, tLanguage } = useLanguage();

  const handleLanguageChange = (lang: Language) => {
    const newSelection = selectedLanguages.includes(lang)
      ? selectedLanguages.filter((l) => l !== lang)
      : [...selectedLanguages, lang];
    onSelectedLanguagesChange(newSelection);
  };

  return (
    <StepWrapper
      title={t('step4_title')}
      subtitle={t('step4_subtitle')}
      onGenerate={onGenerate}
      onBack={onBack}
      isLoading={isLoading}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
        {LANGUAGES.map((key) => (
          <label key={key} className="flex items-center space-x-3 cursor-pointer p-2 rounded-md hover:bg-gray-50">
            <input
              type="checkbox"
              checked={selectedLanguages.includes(key)}
              onChange={() => handleLanguageChange(key)}
              className="h-5 w-5 rounded border-gray-300 text-brand-accent focus:ring-brand-accent"
            />
            <span className="text-gray-700">{tLanguage(key)}</span>
          </label>
        ))}
      </div>
    </StepWrapper>
  );
};
