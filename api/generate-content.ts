import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI, Type } from '@google/genai';
import type { ContentType, Language } from '../types';

const PROMPT_CONTENT_TYPE_LABELS_EN: Record<ContentType, string> = {
  social: 'Social Media Post (e.g., Instagram, Facebook)',
  description: 'Product Description (for e-commerce sites)',
  email: 'Email Newsletter Announcement',
  blog: 'Short Blog Post',
  seo: 'SEO Keywords & Meta Description',
};

const PROMPT_LANGUAGE_LABELS_EN: Record<Language, string> = {
  en: 'English',
  hi: 'Hindi',
  bn: 'Bengali',
  ta: 'Tamil',
  te: 'Telugu',
  mr: 'Marathi',
};

const ALLOWED_CONTENT_TYPES = Object.keys(
  PROMPT_CONTENT_TYPE_LABELS_EN
) as ContentType[];

const ALLOWED_LANGUAGES = Object.keys(
  PROMPT_LANGUAGE_LABELS_EN
) as Language[];

const MAX_DESCRIPTION_LENGTH = 5000;
const MAX_IMAGE_BASE64_LENGTH = 10_000_000;

const generateContentPrompt = (
  description: string,
  selectedContentTypes: ContentType[],
  selectedLanguages: Language[],
  hasImage: boolean,
) => {
  const contentTypesString = selectedContentTypes
    .map(type => PROMPT_CONTENT_TYPE_LABELS_EN[type])
    .join(', ');

  const uniqueTargetLanguages =
    selectedLanguages.length > 0
      ? Array.from(new Set(selectedLanguages))
      : ['en'];

  const languagesString = uniqueTargetLanguages
    .map(lang => PROMPT_LANGUAGE_LABELS_EN[lang as Language])
    .join(', ');

  return `Analyze the following product description ${
    hasImage ? 'and image' : ''
  } for an artisan craft.
Based on the analysis, generate marketing content as requested.

**Product Description:** "${description}"

**Main Task:**
For EACH of the following languages (${languagesString}):
1.  **Analysis Task:**
    -   **Target Audience:** Describe the ideal customer for this product in 1-2 sentences.
    -   **Key Selling Points:** List 3-5 unique selling points or emotional hooks.
    -   **Overall Sentiment:** Describe the sentiment or feeling the product evokes (e.g., rustic, modern, whimsical).
2.  **Content Generation Task:**
    -   Generate the following content types: ${contentTypesString}.

Return the entire response as a single JSON object. Do not include any markdown formatting (e.g., \`\`\`json).
The JSON structure should follow the provided schema precisely.
`;
};

const getResponseSchema = (
  selectedContentTypes: ContentType[],
  selectedLanguages: Language[],
) => {
  const uniqueTargetLanguages =
    selectedLanguages.length > 0
      ? Array.from(new Set(selectedLanguages))
      : ['en'];

  const translatedAnalysisSchema = {
    type: Type.OBJECT,
    properties: {
      targetAudience: {
        type: Type.STRING,
        description: 'The ideal customer for this product.',
      },
      sellingPoints: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: 'List of unique selling points.',
      },
      sentiment: {
        type: Type.STRING,
        description: 'The sentiment the product evokes.',
      },
    },
    required: ['targetAudience', 'sellingPoints', 'sentiment'],
  };

  const contentProperties: { [key: string]: any } = {};

  selectedContentTypes.forEach(type => {
    contentProperties[type] = {
      type: Type.STRING,
      description: `The generated content for: ${PROMPT_CONTENT_TYPE_LABELS_EN[type]}`,
    };
  });

  const contentSchema = {
    type: Type.OBJECT,
    properties: contentProperties,
    required: selectedContentTypes,
  };

  const localizedPayloadSchema = {
    type: Type.OBJECT,
    properties: {
      analysis: translatedAnalysisSchema,
      content: contentSchema,
    },
    required: ['analysis', 'content'],
  };

  const localizedDataProperties: { [key: string]: any } = {};

  uniqueTargetLanguages.forEach(lang => {
    localizedDataProperties[lang] = localizedPayloadSchema;
  });

  return {
    type: Type.OBJECT,
    properties: {
      localizedData: {
        type: Type.OBJECT,
        properties: localizedDataProperties,
        required: uniqueTargetLanguages,
        description: 'Localized analysis and content, keyed by language code.',
      },
    },
    required: ['localizedData'],
  };
};

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  // Only allow POST requests.
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  // Make sure the server has the Gemini API key configured.
  if (!process.env.GEMINI_API_KEY) {
    console.error('GEMINI_API_KEY is not configured.');
    res.status(500).json({ error: 'Server configuration error.' });
    return;
  }

  try {
    const {
      description,
      imageBase64,
      imageMimeType,
      selectedContentTypes,
      selectedLanguages,
    } = req.body ?? {};

    // Basic request validation.
    if (
      typeof description !== 'string' ||
      description.trim().length === 0
    ) {
      res.status(400).json({ error: 'A valid description is required.' });
      return;
    }

    if (description.length > MAX_DESCRIPTION_LENGTH) {
      res.status(400).json({
        error: `Description must be ${MAX_DESCRIPTION_LENGTH} characters or less.`,
      });
      return;
    }

    if (!Array.isArray(selectedContentTypes)) {
      res.status(400).json({
        error: 'selectedContentTypes must be an array.',
      });
      return;
    }

    if (!Array.isArray(selectedLanguages)) {
      res.status(400).json({
        error: 'selectedLanguages must be an array.',
      });
      return;
    }

    if (selectedContentTypes.length === 0) {
      res.status(400).json({
        error: 'At least one content type must be selected.',
      });
      return;
    }

    if (selectedLanguages.length === 0) {
      res.status(400).json({
        error: 'At least one language must be selected.',
      });
      return;
    }

    const invalidContentTypes = selectedContentTypes.filter(
      type => !ALLOWED_CONTENT_TYPES.includes(type),
    );

    if (invalidContentTypes.length > 0) {
      res.status(400).json({
        error: 'Invalid content type provided.',
      });
      return;
    }

    const invalidLanguages = selectedLanguages.filter(
      language => !ALLOWED_LANGUAGES.includes(language),
    );

    if (invalidLanguages.length > 0) {
      res.status(400).json({
        error: 'Invalid language provided.',
      });
      return;
    }

    // Validate image input when provided.
    if (imageBase64 !== undefined && imageBase64 !== null) {
      if (typeof imageBase64 !== 'string') {
        res.status(400).json({
          error: 'Invalid image data.',
        });
        return;
      }

      if (imageBase64.length > MAX_IMAGE_BASE64_LENGTH) {
        res.status(400).json({
          error: 'Image is too large.',
        });
        return;
      }

      if (
        typeof imageMimeType !== 'string' ||
        !['image/jpeg', 'image/png', 'image/webp'].includes(imageMimeType)
      ) {
        res.status(400).json({
          error: 'Unsupported image type.',
        });
        return;
      }
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const prompt = generateContentPrompt(
      description.trim(),
      selectedContentTypes,
      selectedLanguages,
      !!imageBase64,
    );

    const responseSchema = getResponseSchema(
      selectedContentTypes,
      selectedLanguages,
    );

    const textPart = { text: prompt };

    const parts: (
      | { text: string }
      | {
          inlineData: {
            mimeType: string;
            data: string;
          };
        }
    )[] = [textPart];

    if (imageBase64) {
      parts.push({
        inlineData: {
          mimeType: imageMimeType,
          data: imageBase64,
        },
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: { parts },
      config: {
        responseMimeType: 'application/json',
        responseSchema,
        temperature: 0.7,
      },
    });

    const jsonString = response.text;

    if (!jsonString) {
      throw new Error('Received an empty response from the API.');
    }

    const parsedJson = JSON.parse(jsonString);

    if (!parsedJson.localizedData) {
      parsedJson.localizedData = {};
    }

    res.status(200).json(parsedJson);
  } catch (error) {
    // Keep detailed errors in server logs only.
    console.error('Error generating content:', error);

    res.status(500).json({
      error: 'Failed to generate marketing content.',
    });
  }
}