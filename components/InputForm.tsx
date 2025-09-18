import React, { useState, useEffect, useRef } from 'react';
import type { ContentType, Language } from '../types';
import { CONTENT_TYPES, LANGUAGES } from '../types';

// Add SpeechRecognition types to window for TypeScript
declare global {
    interface Window {
        SpeechRecognition: any;
        webkitSpeechRecognition: any;
    }
}

interface InputFormProps {
  description: string;
  onDescriptionChange: React.Dispatch<React.SetStateAction<string>>;
  onImageChange: (file: File | null) => void;
  imagePreview: string | null;
  selectedContentTypes: ContentType[];
  onSelectedContentTypesChange: (types: ContentType[]) => void;
  selectedLanguages: Language[];
  onSelectedLanguagesChange: (langs: Language[]) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

const SectionHeader = ({ title, subtitle }: { title: string, subtitle: string }) => (
    <div className="mb-4">
        <h3 className="font-serif font-semibold text-xl text-brand-primary">{title}</h3>
        <p className="text-sm text-gray-500">{subtitle}</p>
    </div>
);

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


export const InputForm: React.FC<InputFormProps> = ({
  description,
  onDescriptionChange,
  onImageChange,
  imagePreview,
  selectedContentTypes,
  onSelectedContentTypesChange,
  selectedLanguages,
  onSelectedLanguagesChange,
  onGenerate,
  isLoading,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [voiceLanguage, setVoiceLanguage] = useState<Language>('en');
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
        onDescriptionChange(prev => {
          const trimmedPrev = prev.trim();
          const separator = trimmedPrev.length > 0 ? ' ' : '';
          return trimmedPrev + separator + finalTranscript.trim();
        });
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
  }, [hasSpeechRecognition, onDescriptionChange, voiceLanguage]);

  const toggleListening = () => {
    if (!recognitionRef.current) return;
    
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      try {
        recognitionRef.current.start();
      } catch(e) {
        console.error("Could not start recognition", e);
        setIsListening(false);
      }
    }
  };

  const handleContentTypeChange = (type: ContentType) => {
    const newSelection = selectedContentTypes.includes(type)
      ? selectedContentTypes.filter((t) => t !== type)
      : [...selectedContentTypes, type];
    onSelectedContentTypesChange(newSelection);
  };

  const handleLanguageChange = (lang: Language) => {
    const newSelection = selectedLanguages.includes(lang)
      ? selectedLanguages.filter((l) => l !== lang)
      : [...selectedLanguages, lang];
    onSelectedLanguagesChange(newSelection);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg space-y-8">
      <div>
        <SectionHeader title="1. Describe Your Craft" subtitle="Tell us about your creation."/>
        <div className="relative">
          <textarea
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            placeholder="e.g., A hand-carved wooden bowl... or click the mic to speak."
            className="w-full h-32 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-accent focus:border-transparent transition"
            rows={5}
          />
          {hasSpeechRecognition && (
             <div className="absolute bottom-2 right-2 flex items-center space-x-2">
                <select 
                  value={voiceLanguage}
                  onChange={(e) => setVoiceLanguage(e.target.value as Language)}
                  className="bg-gray-100 border-gray-300 rounded-full text-xs py-1 pl-2 pr-7 focus:ring-2 focus:ring-brand-accent focus:outline-none"
                  aria-label="Select voice input language"
                  disabled={isListening}
                >
                    {Object.entries(LANGUAGES).map(([key, label]) => (
                        <option key={key} value={key}>{label}</option>
                    ))}
                </select>
                <button
                type="button"
                onClick={toggleListening}
                title={isListening ? 'Stop recording' : 'Start voice input'}
                aria-label={isListening ? 'Stop voice input' : 'Start voice input'}
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
      </div>

      <div>
        <SectionHeader title="2. Upload an Image" subtitle="A picture is worth a thousand words."/>
        <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
                {imagePreview ? (
                    <img src={imagePreview} alt="Product preview" className="mx-auto h-32 w-32 object-cover rounded-md"/>
                ) : (
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                )}
                 <div className="flex text-sm text-gray-600">
                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-brand-accent hover:text-brand-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-brand-accent">
                        <span>Upload a file</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={(e) => onImageChange(e.target.files ? e.target.files[0] : null)} />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
        </div>
      </div>
      
      <div>
        <SectionHeader title="3. Choose Content" subtitle="Select what you need."/>
        <div className="space-y-2">
          {Object.entries(CONTENT_TYPES).map(([key, label]) => (
            <label key={key} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedContentTypes.includes(key as ContentType)}
                onChange={() => handleContentTypeChange(key as ContentType)}
                className="h-4 w-4 rounded border-gray-300 text-brand-accent focus:ring-brand-accent"
              />
              <span className="text-gray-700">{label}</span>
            </label>
          ))}
        </div>
      </div>
      
      <div>
        <SectionHeader title="4. Translate (Optional)" subtitle="Reach a wider audience."/>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          {Object.entries(LANGUAGES).map(([key, label]) => (
            <label key={key} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedLanguages.includes(key as Language)}
                onChange={() => handleLanguageChange(key as Language)}
                className="h-4 w-4 rounded border-gray-300 text-brand-accent focus:ring-brand-accent"
              />
              <span className="text-gray-700">{label}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={onGenerate}
        disabled={isLoading || !description || !imagePreview}
        className="w-full flex justify-center items-center bg-brand-accent text-white font-bold py-3 px-4 rounded-lg hover:bg-opacity-90 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </>
        ) : (
          'Create My Marketing Content'
        )}
      </button>
    </div>
  );
};