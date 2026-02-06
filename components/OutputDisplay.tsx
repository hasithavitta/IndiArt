
import React, { useState, useEffect, useMemo } from 'react';
import { ContentCard } from './ContentCard';
import type { OutputData, Language, ContentType } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslator } from '../i18n/translations';

interface OutputDisplayProps {
  output: OutputData | null;
  isLoading: boolean;
  error: string | null;
  onStartOver: () => void;
  outputPageIndex: number;
  onNextOutput: () => void;
  onBackOutput: () => void;
}

type OutputPage = 
    | { type: 'analysis'; titleKey: string }
    | { type: 'content'; titleKey: ContentType; contentType: ContentType };


const LoadingSpinner = () => {
    const { t } = useLanguage();
    return (
        <div className="flex flex-col items-center justify-center p-10 text-center">
            <svg className="animate-spin h-10 w-10 text-brand-accent mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <h2 className="text-xl font-serif font-semibold text-brand-primary">{t('output_generating_title')}</h2>
            <p className="text-gray-500 mt-2">{t('output_generating_subtitle')}</p>
        </div>
    );
};

const ErrorDisplay = ({ message }: { message: string }) => {
    const { t } = useLanguage();
    return (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
            <div className="flex">
                <div className="py-1">
                    <svg className="h-6 w-6 text-red-400 mr-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div>
                    <p className="font-bold text-red-800">{t('output_error_title')}</p>
                    <p className="text-sm text-red-700">{message}</p>
                </div>
            </div>
        </div>
    );
};


export const OutputDisplay: React.FC<OutputDisplayProps> = ({ 
    output, isLoading, error, onStartOver,
    outputPageIndex, onNextOutput, onBackOutput 
}) => {
  const { t: uiT, tLanguage } = useLanguage(); // Translator for the main UI
  const [selectedLang, setSelectedLang] = useState<Language>('en');

  const availableLangs = useMemo(() => 
    output ? Object.keys(output.localizedData).filter(key => output.localizedData[key as Language]) as Language[] : [],
    [output]
  );
  
  useEffect(() => {
    if (availableLangs.length > 0 && !availableLangs.includes(selectedLang)) {
      setSelectedLang(availableLangs[0]);
    }
  }, [availableLangs, selectedLang]);

  const outputPages: OutputPage[] = useMemo(() => {
    const pages: OutputPage[] = [];
    if (output?.localizedData && Object.keys(output.localizedData).length > 0) {
        pages.push({ type: 'analysis', titleKey: 'output_analysis_title' });
    }
    if (output && availableLangs.length > 0) {
      const firstLangWithContent = output.localizedData[availableLangs[0]];
      if (firstLangWithContent?.content) {
        (Object.keys(firstLangWithContent.content) as ContentType[]).forEach(ct => {
            pages.push({ type: 'content', titleKey: ct, contentType: ct });
        });
      }
    }
    return pages;
  }, [output, availableLangs]);


  if (isLoading && !output) {
    return <LoadingSpinner />;
  }

  const langToDisplay = availableLangs.includes(selectedLang) ? selectedLang : (availableLangs[0] || 'en');
  // Create a specific translator for the content being displayed
  const { t: contentT, tContentType: contentTContentType } = getTranslator(langToDisplay);
  
  const currentPage = outputPages[outputPageIndex];
  const currentPageTitle = currentPage?.type === 'content' 
    ? contentTContentType(currentPage.titleKey) 
    : (currentPage ? contentT(currentPage.titleKey) : '');

  const renderCurrentPage = () => {
    if (!currentPage || !output) return null;
    
    const currentLangData = output.localizedData[langToDisplay];

    switch (currentPage.type) {
        case 'analysis':
            const analysisData = currentLangData?.analysis;
            if (!analysisData) return <p>{contentT('output_analysis_unavailable')}</p>;
            
            return (
                <div>
                    {availableLangs.length > 1 && (
                        <div className="flex items-center space-x-1 border-b-2 border-gray-200 mb-4 flex-wrap">
                            {availableLangs.map(lang => (
                                <button
                                    key={lang}
                                    onClick={() => setSelectedLang(lang)}
                                    className={`px-4 py-2 text-sm font-semibold transition rounded-t-lg ${langToDisplay === lang ? 'bg-brand-accent text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                                >
                                    {tLanguage(lang)}
                                </button>
                            ))}
                        </div>
                    )}
                    <ContentCard title={currentPageTitle} isAnalysis={true} lang={langToDisplay}>
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-semibold text-brand-primary">{contentT('output_analysis_audience')}</h4>
                                <p className="text-sm">{analysisData.targetAudience}</p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-brand-primary">{contentT('output_analysis_selling_points')}</h4>
                                <ul className="list-disc list-inside text-sm space-y-1">
                                    {analysisData.sellingPoints.map((point, index) => (
                                    <li key={index}>{point}</li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-brand-primary">{contentT('output_analysis_sentiment')}</h4>
                                <p className="text-sm">{analysisData.sentiment}</p>
                            </div>
                        </div>
                    </ContentCard>
                </div>
            );
        case 'content':
            const contentText = currentLangData?.content?.[currentPage.contentType];
            return (
                <div>
                    {availableLangs.length > 1 && (
                        <div className="flex items-center space-x-1 border-b-2 border-gray-200 mb-4 flex-wrap">
                            {availableLangs.map(lang => (
                                <button
                                    key={lang}
                                    onClick={() => setSelectedLang(lang)}
                                    className={`px-4 py-2 text-sm font-semibold transition rounded-t-lg ${langToDisplay === lang ? 'bg-brand-accent text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                                >
                                    {tLanguage(lang)}
                                </button>
                            ))}
                        </div>
                    )}
                    <ContentCard title={currentPageTitle} content={contentText} lang={langToDisplay}/>
                </div>
            );
        default:
            return null;
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-serif font-bold text-brand-primary">
            {uiT('output_main_title')}
        </h2>
        <button
          onClick={onStartOver}
          className="bg-brand-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-opacity-80 transition flex items-center space-x-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.899 2.186l-1.002.501a5.999 5.999 0 00-10.03-1.922V7a1 1 0 01-2 0V3a1 1 0 011-1zm12 14a1 1 0 01-1 1v-2.101a7.002 7.002 0 01-11.899-2.186l1.002-.501a5.999 5.999 0 0010.03 1.922V13a1 1 0 012 0v4a1 1 0 01-1 1z" clipRule="evenodd" />
          </svg>
          <span>{uiT('start_over_button')}</span>
        </button>
      </div>

      {error && <ErrorDisplay message={error} />}
      
      {!error && output && (
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg animate-fade-in space-y-6">
            <div className="flex justify-between items-center text-sm text-gray-600">
                <h3 className="font-serif font-semibold text-xl text-brand-primary">{currentPageTitle}</h3>
                {outputPages.length > 1 && (
                    <span className="font-semibold">
                        {uiT('output_page_indicator', { current: outputPageIndex + 1, total: outputPages.length })}
                    </span>
                )}
            </div>

            <div className="min-h-[200px]">
                {renderCurrentPage()}
            </div>
          
            {outputPages.length > 1 && (
                <div className="flex items-center justify-between border-t pt-4 mt-6">
                    <button
                        onClick={onBackOutput}
                        disabled={outputPageIndex === 0}
                        className="text-sm font-semibold text-gray-600 hover:text-brand-primary transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        &larr; {uiT('back_button')}
                    </button>
                    <button
                        onClick={onNextOutput}
                        disabled={outputPageIndex >= outputPages.length - 1}
                        className="bg-brand-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-opacity-90 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {uiT('next_button')} &rarr;
                    </button>
                </div>
            )}
        </div>
      )}
    </div>
  );
};
