
export type ContentType = 'social' | 'description' | 'email' | 'blog' | 'seo';

export const CONTENT_TYPES: ContentType[] = [
  'social',
  'description',
  'email',
  'blog',
  'seo',
];

export type Language = 'en' | 'hi' | 'bn' | 'ta' | 'te' | 'mr';

export const LANGUAGES: Language[] = [
  'en',
  'hi',
  'bn',
  'ta',
  'te',
  'mr'
];

// e.g., { social: "...", description: "..." }
export type GeneratedContentSet = Partial<Record<ContentType, string>>;

// The part of the analysis that gets translated
export interface TranslatedAnalysis {
    targetAudience: string;
    sellingPoints: string[];
    sentiment: string;
}

// A single payload for one language
export interface LocalizedPayload {
  analysis: TranslatedAnalysis;
  content: GeneratedContentSet;
}

// The full set of localized data, keyed by language code
export type LocalizedData = Partial<Record<Language, LocalizedPayload>>;

export interface OutputData {
  localizedData: LocalizedData;
}
