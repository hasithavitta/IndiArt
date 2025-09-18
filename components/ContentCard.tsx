import React, { useState } from 'react';
import { useTextToSpeech } from '../hooks/useTextToSpeech';
import type { Language } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface ContentCardProps {
  title: string;
  content?: string;
  children?: React.ReactNode;
  isAnalysis?: boolean;
  lang?: Language;
}

const ReadAloudButton = ({ text, lang }: { text: string; lang: Language }) => {
  const { t } = useLanguage();
  const { isSpeaking, speak, cancel } = useTextToSpeech(text, lang);

  const handleClick = () => {
    if (isSpeaking) {
      cancel();
    } else {
      speak();
    }
  };

  return (
    <button
      onClick={handleClick}
      title={isSpeaking ? t('read_aloud_stop') : t('read_aloud_start')}
      className={`p-2 rounded-full transition ${
        isSpeaking 
          ? 'bg-red-500 text-white' 
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      }`}
    >
      {isSpeaking ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1zm4 0a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 3.612A.75.75 0 0110.75 3h1.5a.75.75 0 010 1.5h-1.5A.75.75 0 0110 3.612zM12.25 5.75a.75.75 0 00-1.5 0v8.5a.75.75 0 001.5 0v-8.5zM7.75 5.75a.75.75 0 00-1.5 0v8.5a.75.75 0 001.5 0v-8.5zM4.25 8.75a.75.75 0 00-1.5 0v2.5a.75.75 0 001.5 0v-2.5zM17.25 8.75a.75.75 0 00-1.5 0v2.5a.75.75 0 001.5 0v-2.5z" />
        </svg>
      )}
    </button>
  );
};


export const ContentCard: React.FC<ContentCardProps> = ({ title, content, children, isAnalysis = false, lang = 'en' }) => {
  const [copied, setCopied] = useState(false);
  const { t } = useLanguage();

  const handleCopy = () => {
    if (content) {
      navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  
  const analysisTextForSpeech = isAnalysis && children ? 
    Array.from(document.getElementById(`analysis-content-${title}`)?.querySelectorAll('h4, p, li') || [])
    .map(el => el.textContent)
    .join('. ') : '';
  
  const textToSpeak = content || analysisTextForSpeech;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-5 flex justify-between items-start bg-gray-50/50 border-b border-gray-200">
        <h3 className="text-lg font-serif font-semibold text-brand-primary">{title}</h3>
        <div className="flex items-center space-x-2">
            {textToSpeak && <ReadAloudButton text={textToSpeak} lang={lang} />}
            {content && !isAnalysis && (
            <button
                onClick={handleCopy}
                className={`px-3 py-1 text-sm font-medium rounded-md flex items-center transition ${
                copied ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
            >
                {copied ? (
                <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {t('copy_button_copied')}
                </>
                ) : (
                    <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    {t('copy_button_copy')}
                </>
                )}
            </button>
            )}
        </div>
      </div>
      <div className="p-5 text-brand-text leading-relaxed" id={`analysis-content-${title}`}>
        {content && <p className="whitespace-pre-wrap">{content}</p>}
        {children}
      </div>
    </div>
  );
};
