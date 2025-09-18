import React from 'react';
import { StepWrapper } from './StepWrapper';
import { CONTENT_TYPES, ContentType } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface Step3_ContentTypesProps {
  selectedContentTypes: ContentType[];
  onSelectedContentTypesChange: (types: ContentType[]) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Step3_ContentTypes: React.FC<Step3_ContentTypesProps> = ({
  selectedContentTypes,
  onSelectedContentTypesChange,
  onNext,
  onBack,
}) => {
  const { t, tContentType } = useLanguage();
  
  const handleContentTypeChange = (type: ContentType) => {
    const newSelection = selectedContentTypes.includes(type)
      ? selectedContentTypes.filter((t) => t !== type)
      : [...selectedContentTypes, type];
    onSelectedContentTypesChange(newSelection);
  };

  return (
    <StepWrapper
      title={t('step3_title')}
      subtitle={t('step3_subtitle')}
      onNext={onNext}
      onBack={onBack}
      nextDisabled={selectedContentTypes.length === 0}
    >
      <div className="space-y-3">
        {CONTENT_TYPES.map((key) => (
          <label key={key} className="flex items-center space-x-3 cursor-pointer p-3 rounded-md border border-gray-200 hover:bg-gray-50 transition">
            <input
              type="checkbox"
              checked={selectedContentTypes.includes(key)}
              onChange={() => handleContentTypeChange(key)}
              className="h-5 w-5 rounded border-gray-300 text-brand-accent focus:ring-brand-accent"
            />
            <span className="text-gray-700 font-medium">{tContentType(key)}</span>
          </label>
        ))}
      </div>
    </StepWrapper>
  );
};
