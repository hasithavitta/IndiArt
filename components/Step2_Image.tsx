import React from 'react';
import { StepWrapper } from './StepWrapper';
import { useLanguage } from '../contexts/LanguageContext';

interface Step2_ImageProps {
  imagePreview: string | null;
  onImageChange: (file: File | null) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Step2_Image: React.FC<Step2_ImageProps> = ({ imagePreview, onImageChange, onNext, onBack }) => {
  const { t } = useLanguage();

  return (
    <StepWrapper
      title={t('step2_title')}
      subtitle={t('step2_subtitle')}
      onNext={onNext}
      onBack={onBack}
    >
      <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
        <div className="space-y-1 text-center">
          {imagePreview ? (
            <>
              <img src={imagePreview} alt={t('step2_image_alt')} className="mx-auto h-32 w-32 object-cover rounded-md" />
              <button onClick={() => onImageChange(null)} className="text-sm text-red-500 hover:text-red-700 font-semibold mt-2">{t('step2_remove_button')}</button>
            </>
          ) : (
            <>
              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="flex text-sm text-gray-600">
                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-brand-accent hover:text-brand-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-brand-accent">
                  <span>{t('step2_upload_button')}</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={(e) => onImageChange(e.target.files ? e.target.files[0] : null)} />
                </label>
                <p className="pl-1">{t('step2_drag_drop')}</p>
              </div>
              <p className="text-xs text-gray-500">{t('step2_file_types')}</p>
            </>
          )}
        </div>
      </div>
    </StepWrapper>
  );
};
