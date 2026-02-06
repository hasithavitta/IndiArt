
import { GoogleGenAI, Type } from "@google/genai";
import { fileToBase64 } from "../utils/fileUtils";
import type { ContentType, Language, OutputData } from "../types";

// English labels specifically for constructing the API prompt
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


const generateContentPrompt = (
  description: string,
  selectedContentTypes: ContentType[],
  selectedLanguages: Language[],
  hasImage: boolean,
) => {
  const contentTypesString = selectedContentTypes.map(type => PROMPT_CONTENT_TYPE_LABELS_EN[type]).join(', ');
  
  const uniqueTargetLanguages = selectedLanguages.length > 0 
    ? Array.from(new Set(selectedLanguages)) 
    : ['en'];
  const languagesString = uniqueTargetLanguages.map(lang => PROMPT_LANGUAGE_LABELS_EN[lang]).join(', ');

  let prompt = `Analyze the following product description ${hasImage ? 'and image' : ''} for an artisan craft.
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

  return prompt;
};

const getResponseSchema = (selectedContentTypes: ContentType[], selectedLanguages: Language[]) => {
  const uniqueTargetLanguages = selectedLanguages.length > 0 
    ? Array.from(new Set(selectedLanguages))
    : ['en'];

  const translatedAnalysisSchema = {
    type: Type.OBJECT,
    properties: {
      targetAudience: { type: Type.STRING, description: 'The ideal customer for this product.' },
      sellingPoints: { type: Type.ARRAY, items: { type: Type.STRING }, description: 'List of unique selling points.' },
      sentiment: { type: Type.STRING, description: 'The sentiment the product evokes.' },
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
      content: contentSchema
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
      }
    },
    required: ['localizedData'],
  };
};

export const generateMarketingContent = async (
  description: string,
  imageFile: File | null,
  selectedContentTypes: ContentType[],
  selectedLanguages: Language[]
): Promise<OutputData> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = generateContentPrompt(description, selectedContentTypes, selectedLanguages, !!imageFile);
  const responseSchema = getResponseSchema(selectedContentTypes, selectedLanguages);
  
  const textPart = { text: prompt };
  const parts: ( {text: string} | {inlineData: {mimeType: string, data: string}} )[] = [textPart];

  if (imageFile) {
    const base64Image = await fileToBase64(imageFile);
    const imagePart = {
      inlineData: {
        mimeType: imageFile.type,
        data: base64Image,
      },
    };
    parts.push(imagePart);
  }

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: { parts },
        config: {
          responseMimeType: 'application/json',
          responseSchema: responseSchema,
          temperature: 0.7,
        },
    });

    const jsonString = response.text;
    if (!jsonString) {
        throw new Error("Received an empty response from the API.");
    }

    const parsedJson = JSON.parse(jsonString);

    if (!parsedJson.localizedData) {
      parsedJson.localizedData = {};
    }
    
    return parsedJson as OutputData;
    
  } catch (error) {
    console.error("Error generating content:", error);
    let errorMessage = "Failed to generate marketing content. Please try again.";
    if (error instanceof Error) {
        errorMessage = `Failed to generate marketing content: ${error.message}.`;
    }
    throw new Error(errorMessage);
  }
};
