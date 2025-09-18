import React, { useState } from 'react';
import { Header } from './components/Header';
import { OutputDisplay } from './components/OutputDisplay';
import { generateMarketingContent, generateVideo } from './services/geminiService';
import type { ContentType, Language, OutputData } from './types';
import { Step1_Description } from './components/Step1_Description';
import { Step2_Image } from './components/Step2_Image';
import { Step3_ContentTypes } from './components/Step3_ContentTypes';
import { Step4_Languages } from './components/Step4_Languages';
import { LanguageSelector } from './components/LanguageSelector';
import { LanguageProvider } from './contexts/LanguageContext';

function App() {
  // Language and step state
  const [language, setLanguage] = useState<Language>('en');
  const [languageSelected, setLanguageSelected] = useState<boolean>(false);
  const [step, setStep] = useState(1);

  // Data state
  const [description, setDescription] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedContentTypes, setSelectedContentTypes] = useState<ContentType[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<Language[]>([]);

  // API/UI state
  const [output, setOutput] = useState<OutputData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [outputPageIndex, setOutputPageIndex] = useState(0);

  // Video-specific state
  const [isVideoLoading, setIsVideoLoading] = useState<boolean>(false);
  const [videoLoadingStatus, setVideoLoadingStatus] = useState<string>('');
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [videoError, setVideoError] = useState<string | null>(null);

  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang);
    setLanguageSelected(true);
  };

  const handleBackToLanguageSelect = () => {
    setLanguageSelected(false);
  };

  const handleImageChange = (file: File | null) => {
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };
  
  const handleStartOver = () => {
    setLanguageSelected(false); // Go back to language selection
    setStep(1);
    setDescription('');
    setImageFile(null);
    setImagePreview(null);
    setSelectedContentTypes([]);
    setSelectedLanguages([]);
    setOutput(null);
    setError(null);
    setIsLoading(false);
    setOutputPageIndex(0);
    setIsVideoLoading(false);
    setVideoLoadingStatus('');
    setVideoUrl(null);
    setVideoError(null);
  };

  const handleGenerate = async () => {
    if (!description || selectedContentTypes.length === 0) {
      setError("Please provide a description and select at least one content type.");
      return;
    }

    const videoRequested = selectedContentTypes.includes('video');

    if (videoRequested && !imageFile) {
        setError("An image is required to generate a video. Please go back to Step 2 to upload one.");
        setStep(5);
        return;
    }

    setIsLoading(true);
    setOutputPageIndex(0);
    setError(null);
    setOutput(null);
    setVideoError(null);
    setVideoUrl(null);
    setStep(5);

    try {
      const result = await generateMarketingContent(
        description,
        imageFile,
        selectedContentTypes,
        selectedLanguages
      );
      setOutput(result);
    } catch (e: any) {
      setError(e.message || 'An unknown error occurred while generating content.');
    } finally {
      setIsLoading(false);
    }

    if (videoRequested && imageFile) {
        setIsVideoLoading(true);
        try {
            const promptForVideo = `Create an engaging, 9:16 vertical short video ad for an artisan product, suitable for Instagram Reels and YouTube Shorts. Description: "${description}". Focus on the craftsmanship and unique qualities.`;
            const generatedVideoUrl = await generateVideo(
                promptForVideo,
                imageFile,
                setVideoLoadingStatus
            );
            setVideoUrl(generatedVideoUrl);
        } catch (e: any) {
            setVideoError(e.message || 'An unknown error occurred while generating the video.');
        } finally {
            setIsVideoLoading(false);
        }
    }
  };

  const handleNextOutput = () => {
    setOutputPageIndex(prev => prev + 1);
  };

  const handleBackOutput = () => {
    setOutputPageIndex(prev => prev - 1);
  };

  const renderContent = () => {
    if (!languageSelected) {
      return (
        <div className="flex items-center justify-center min-h-[60vh]">
          <LanguageSelector onSelectLanguage={handleLanguageSelect} />
        </div>
      );
    }
    
    const showOutput = step > 4 || isLoading || isVideoLoading;

    if (showOutput) {
      return (
        <OutputDisplay
          output={output}
          isLoading={isLoading}
          error={error}
          onStartOver={handleStartOver}
          isVideoLoading={isVideoLoading}
          videoLoadingStatus={videoLoadingStatus}
          videoUrl={videoUrl}
          videoError={videoError}
          outputPageIndex={outputPageIndex}
          onNextOutput={handleNextOutput}
          onBackOutput={handleBackOutput}
        />
      );
    }

    switch (step) {
      case 1:
        return (
          <Step1_Description
            description={description}
            onDescriptionChange={setDescription}
            onNext={() => setStep(2)}
            onBack={handleBackToLanguageSelect}
          />
        );
      case 2:
        return (
          <Step2_Image
            imagePreview={imagePreview}
            onImageChange={handleImageChange}
            onNext={() => setStep(3)}
            onBack={() => setStep(1)}
          />
        );
      case 3:
        return (
          <Step3_ContentTypes
            selectedContentTypes={selectedContentTypes}
            onSelectedContentTypesChange={setSelectedContentTypes}
            onNext={() => setStep(4)}
            onBack={() => setStep(2)}
          />
        );
      case 4:
        return (
          <Step4_Languages
            selectedLanguages={selectedLanguages}
            onSelectedLanguagesChange={setSelectedLanguages}
            onGenerate={handleGenerate}
            isLoading={isLoading || isVideoLoading}
            onBack={() => setStep(3)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <LanguageProvider language={language}>
      <div className="bg-brand-secondary min-h-screen font-sans text-brand-text">
        <Header />
        <main className="container mx-auto p-4 md:p-8">
          <div className="max-w-2xl mx-auto">
            {renderContent()}
          </div>
        </main>
        <footer className="text-center py-6 text-sm text-gray-500">
          <p>Powered by Google Gemini. Built for artisans.</p>
        </footer>
      </div>
    </LanguageProvider>
  );
}

export default App;