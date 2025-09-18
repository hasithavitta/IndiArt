import React, { useState, useEffect, useRef } from 'react';
import { StepWrapper } from './StepWrapper';
import { Language } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

declare global {
    interface Window {
        SpeechRecognition: any;
        webkitSpeechRecognition: any;
    }
}

interface Step1_DescriptionProps {
    description: string;
    onDescriptionChange: (value: string) => void;
    onNext: () => void;
    onBack: () => void;
}

const MicrophoneIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
    </svg>
);

const SPEECH_RECOGNITION_LANGS: { [key in Language]: string } = {
  en: 'en-US',
  hi: 'hi-IN',
  bn: 'bn-IN',
  ta: 'ta-IN',
  te: 'te-IN',
  mr: 'mr-IN',
};

export const Step1_Description: React.FC<Step1_DescriptionProps> = ({ description, onDescriptionChange, onNext, onBack }) => {
    const { t, tLanguage, language: currentUILanguage } = useLanguage();
    const [isListening, setIsListening] = useState(false);
    const [voiceLanguage, setVoiceLanguage] = useState<Language>(currentUILanguage);
    const recognitionRef = useRef<any>(null);

    const hasSpeechRecognition = typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);

    useEffect(() => {
        if (!hasSpeechRecognition) return;

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognitionRef.current = new SpeechRecognition();
        const recognition = recognitionRef.current;

        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = SPEECH_RECOGNITION_LANGS[voiceLanguage];

        recognition.onresult = (event: any) => {
            let finalTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript;
                }
            }
            if (finalTranscript) {
                onDescriptionChange(description + ' ' + finalTranscript);
            }
        };
        
        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);
        recognition.onerror = (event: any) => {
            console.error('Speech recognition error:', event.error);
            setIsListening(false);
        };

        return () => {
            if (recognitionRef.current && typeof recognitionRef.current.stop === 'function') {
                recognitionRef.current.stop();
            }
        };
    }, [hasSpeechRecognition, onDescriptionChange, voiceLanguage, description]);

    const toggleListening = () => {
        if (!recognitionRef.current) return;
        
        if (isListening) {
            recognitionRef.current.stop();
        } else {
            try {
                recognitionRef.current.lang = SPEECH_RECOGNITION_LANGS[voiceLanguage];
                recognitionRef.current.start();
            } catch (e) {
                console.error("Could not start recognition", e);
                setIsListening(false);
            }
        }
    };

    return (
        <StepWrapper
            title={t('step1_title')}
            subtitle={t('step1_subtitle')}
            onNext={onNext}
            onBack={onBack}
            nextDisabled={!description.trim()}
        >
            <div className="relative">
                <textarea
                    value={description}
                    onChange={(e) => onDescriptionChange(e.target.value)}
                    placeholder={t('step1_placeholder')}
                    className="w-full h-40 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-accent focus:border-transparent transition bg-brand-primary text-white placeholder-gray-400"
                    rows={6}
                    aria-label={t('step1_title')}
                />
                {hasSpeechRecognition && (
                    <div className="absolute bottom-2 right-2 flex items-center space-x-2">
                        <select
                            value={voiceLanguage}
                            onChange={(e) => setVoiceLanguage(e.target.value as Language)}
                            className="bg-gray-100 border-gray-300 rounded-full text-xs py-1 pl-2 pr-7 focus:ring-2 focus:ring-brand-accent focus:outline-none"
                            aria-label={t('step1_voice_language_label')}
                            disabled={isListening}
                        >
                            {Object.keys(SPEECH_RECOGNITION_LANGS).map((key) => (
                                <option key={key} value={key}>{tLanguage(key as Language).split(' ')[0]}</option>
                            ))}
                        </select>
                        <button
                            type="button"
                            onClick={toggleListening}
                            title={isListening ? t('step1_mic_stop') : t('step1_mic_start')}
                            aria-label={isListening ? t('step1_mic_stop') : t('step1_mic_start')}
                            className={`p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-accent transition-all duration-200 ${
                                isListening
                                    ? 'bg-red-500 text-white animate-pulse'
                                    : 'bg-gray-200 text-gray-600 hover:bg-brand-accent hover:text-white'
                            }`}
                        >
                            <MicrophoneIcon />
                        </button>
                    </div>
                )}
            </div>
        </StepWrapper>
    );
};
