import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface StepWrapperProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  onNext?: () => void;
  onBack?: () => void;
  onGenerate?: () => void;
  isLoading?: boolean;
  nextDisabled?: boolean;
}

export const StepWrapper: React.FC<StepWrapperProps> = ({
  title,
  subtitle,
  children,
  onNext,
  onBack,
  onGenerate,
  isLoading = false,
  nextDisabled = false,
}) => {
  const { t } = useLanguage();

  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg animate-fade-in">
      <div className="mb-6">
        <h3 className="font-serif font-semibold text-2xl text-brand-primary">{title}</h3>
        <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
      </div>
      
      <div className="mb-8">
        {children}
      </div>

      <div className="flex items-center justify-between">
        {onBack ? (
          <button
            onClick={onBack}
            className="text-sm font-semibold text-gray-600 hover:text-brand-primary transition"
          >
            &larr; {t('back_button')}
          </button>
        ) : <div />}
        
        {onNext && (
          <button
            onClick={onNext}
            disabled={nextDisabled}
            className="bg-brand-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-opacity-90 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {t('next_button')} &rarr;
          </button>
        )}

        {onGenerate && (
          <button
            onClick={onGenerate}
            disabled={isLoading}
            className="w-48 flex justify-center items-center bg-brand-accent text-white font-bold py-3 px-4 rounded-lg hover:bg-opacity-90 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {t('generate_button_loading')}
              </>
            ) : (
              t('generate_button')
            )}
          </button>
        )}
      </div>
    </div>
  );
};
