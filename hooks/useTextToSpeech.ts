import { useState, useEffect, useCallback } from 'react';
import type { Language } from '../types';

const TTS_LANG_MAP: Record<Language, string> = {
  en: 'en-US',
  hi: 'hi-IN',
  bn: 'bn-IN',
  ta: 'ta-IN',
  te: 'te-IN',
  mr: 'mr-IN',
};

export const useTextToSpeech = (text: string, lang: Language) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speak = useCallback(() => {
    if (!text || typeof window.speechSynthesis === 'undefined') return;

    // Cancel any ongoing speech before starting a new one
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = TTS_LANG_MAP[lang] || 'en-US';
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }, [text, lang]);

  const cancel = useCallback(() => {
    if (typeof window.speechSynthesis === 'undefined') return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  // Cleanup effect to cancel speech on component unmount
  useEffect(() => {
    return () => {
      cancel();
    };
  }, [cancel]);

  return { isSpeaking, speak, cancel };
};
