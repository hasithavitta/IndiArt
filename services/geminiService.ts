import { GoogleGenAI, Type } from "@google/genai";
import { fileToBase64 } from "../utils/fileUtils";
import type { ContentType, Language, OutputData } from "../types";

// Initialize the GoogleGenAI client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// English labels specifically for constructing the API prompt
const PROMPT_CONTENT_TYPE_LABELS_EN: Record<ContentType, string> = {
  social: 'Social Media Post (e.g., Instagram, Facebook)',
  description: 'Product Description (for e-commerce sites)',
  email: 'Email Newsletter Announcement',
  blog: 'Short Blog Post',
  seo: 'SEO Keywords & Meta Description',
  video: 'Short-form Video (e.g., Reel, Short)',
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
  const hasVideo = selectedContentTypes.includes('video');
  const textContentTypes = selectedContentTypes.filter(type => type !== 'video');
  const contentTypesString = textContentTypes.map(type => PROMPT_CONTENT_TYPE_LABELS_EN[type]).join(', ');
  
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
`;

  if (textContentTypes.length > 0) {
    prompt += `2.  **Content Generation Task:**
    -   Generate the following content types: ${contentTypesString}.
`;
  }
  
  if (hasVideo) {
    prompt += `
**Separate Video Suggestions Task (in English only):**
1.  **Video Caption:** Write a short, catchy caption for an Instagram Reel or YouTube Short. Include relevant hashtags.
2.  **Audio Suggestion:** Suggest a type of trending audio or a specific song that would fit the video's mood (e.g., "upbeat indie folk," "calm lo-fi beat").
`;
  }

  prompt += `
Return the entire response as a single JSON object. Do not include any markdown formatting (e.g., \`\`\`json).
The JSON structure should follow the provided schema precisely.
`;

  return prompt;
};

const getResponseSchema = (selectedContentTypes: ContentType[], selectedLanguages: Language[]) => {
  const hasVideo = selectedContentTypes.includes('video');
  const textContentTypes = selectedContentTypes.filter(type => type !== 'video');

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
  if (textContentTypes.length > 0) {
    textContentTypes.forEach(type => {
      contentProperties[type] = {
        type: Type.STRING,
        description: `The generated content for: ${PROMPT_CONTENT_TYPE_LABELS_EN[type]}`,
      };
    });
  }
  const contentSchema = {
    type: Type.OBJECT,
    properties: contentProperties,
    required: textContentTypes,
  };

  const localizedPayloadProperties: any = {
      analysis: translatedAnalysisSchema
  };
  if (textContentTypes.length > 0) {
      localizedPayloadProperties.content = contentSchema;
  }
  const localizedPayloadSchema = {
    type: Type.OBJECT,
    properties: localizedPayloadProperties,
    required: textContentTypes.length > 0 ? ['analysis', 'content'] : ['analysis'],
  };

  const localizedDataProperties: { [key: string]: any } = {};
  uniqueTargetLanguages.forEach(lang => {
    localizedDataProperties[lang] = localizedPayloadSchema;
  });

  const mainProperties: any = {
    localizedData: {
      type: Type.OBJECT,
      properties: localizedDataProperties,
      required: uniqueTargetLanguages,
      description: 'Localized analysis and content, keyed by language code.',
    }
  };

  const requiredFields = ['localizedData'];
  
  if (hasVideo) {
    mainProperties.videoSuggestions = {
      type: Type.OBJECT,
      properties: {
        caption: { type: Type.STRING, description: 'A catchy caption for the video, including hashtags.' },
        audioSuggestion: { type: Type.STRING, description: 'A suggestion for trending audio or music genre.' },
      },
      required: ['caption', 'audioSuggestion'],
    };
    requiredFields.push('videoSuggestions');
  }
  
  return {
    type: Type.OBJECT,
    properties: mainProperties,
    required: requiredFields,
  };
};

export const generateMarketingContent = async (
  description: string,
  imageFile: File | null,
  selectedContentTypes: ContentType[],
  selectedLanguages: Language[]
): Promise<OutputData> => {
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
        model: 'gemini-2.5-flash',
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
    
    for (const lang in parsedJson.localizedData) {
        if (!parsedJson.localizedData[lang].content) {
            parsedJson.localizedData[lang].content = {};
        }
    }

    return parsedJson as OutputData;
    
  } catch (error) {
    console.error("Error generating content:", error);
    let errorMessage = "Failed to generate marketing content. Please try again.";
    if (error instanceof Error) {
        errorMessage = `Failed to generate marketing content: ${error.message}. The model may have returned an unexpected format. Please check the console for more details.`;
    }
    throw new Error(errorMessage);
  }
};

export const generateVideo = async (
  prompt: string,
  imageFile: File,
  onStatusUpdate: (status: string) => void
): Promise<string> => {
  onStatusUpdate("Warming up the virtual cameras...");

  const videoGenerationConfig: any = {
    model: 'veo-2.0-generate-001',
    prompt: prompt,
    config: {
      numberOfVideos: 1
    }
  };

  onStatusUpdate("Preparing your image for the video shoot...");
  const base64Image = await fileToBase64(imageFile);
  videoGenerationConfig.image = {
    imageBytes: base64Image,
    mimeType: imageFile.type,
  };

  try {
    let operation = await ai.models.generateVideos(videoGenerationConfig);
    
    const pollingStatuses = [
      "Storyboarding your vision...",
      "Setting up the lighting...",
      "Action! The cameras are rolling...",
      "Editing the footage...",
      "Adding special effects...",
      "Rendering the final cut...",
    ];
    let statusIndex = 0;

    while (!operation.done) {
      onStatusUpdate(pollingStatuses[statusIndex % pollingStatuses.length]);
      statusIndex++;
      await new Promise(resolve => setTimeout(resolve, 10000));
      operation = await ai.operations.getVideosOperation({ operation: operation });
    }

    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;

    if (!downloadLink) {
      throw new Error("Video generation completed, but no download link was provided.");
    }

    onStatusUpdate("Downloading your masterpiece...");
    const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
    if (!response.ok) {
        throw new Error(`Failed to download video: ${response.statusText}`);
    }

    const videoBlob = await response.blob();
    const videoUrl = URL.createObjectURL(videoBlob);

    onStatusUpdate("Video generation complete!");
    return videoUrl;
  } catch (error) {
    console.error("Error generating video:", error);
    let errorMessage = "Failed to generate video. Please try again.";
    if (error instanceof Error) {
        errorMessage = `Video generation failed: ${error.message}.`;
    }
    throw new Error(errorMessage);
  }
};