import { fileToBase64 } from "../utils/fileUtils";
import type { ContentType, Language, OutputData } from "../types";

export const generateMarketingContent = async (
  description: string,
  imageFile: File | null,
  selectedContentTypes: ContentType[],
  selectedLanguages: Language[]
): Promise<OutputData> => {
  let imageBase64: string | null = null;
  let imageMimeType: string | null = null;

  if (imageFile) {
    imageBase64 = await fileToBase64(imageFile);
    imageMimeType = imageFile.type;
  }

  try {
    const response = await fetch('/api/generate-content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        description,
        imageBase64,
        imageMimeType,
        selectedContentTypes,
        selectedLanguages,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({ error: `Server responded with ${response.status}` }));
      throw new Error(errorBody.error || `Server responded with ${response.status}`);
    }

    const parsedJson = await response.json();

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