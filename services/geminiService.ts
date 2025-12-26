import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Sends two images and a prompt to Gemini to generate a description.
 * Uses gemini-3-flash-preview as it supports multimodal inputs (text + images) efficiently.
 */
export const analyzeFashionImages = async (
  base64Image1: string,
  base64Image2: string,
  promptText: string
): Promise<string> => {
  try {
    // Ensure base64 strings are clean (remove data:image/...;base64, prefix if present)
    const cleanBase64_1 = base64Image1.split(',')[1] || base64Image1;
    const cleanBase64_2 = base64Image2.split(',')[1] || base64Image2;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          {
            text: promptText
          },
          {
            inlineData: {
              mimeType: 'image/jpeg', // Assuming JPEG for simplicity, usually handled dynamically
              data: cleanBase64_1
            }
          },
          {
            text: " (Ảnh 1 - Image 1)"
          },
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: cleanBase64_2
            }
          },
           {
            text: " (Ảnh 2 - Image 2)"
          }
        ]
      },
      config: {
        systemInstruction: "Bạn là một trợ lý thời trang AI chuyên nghiệp. Hãy phân tích hình ảnh đầu vào và mô tả kết quả hình dung một cách sinh động, hấp dẫn và tập trung vào các yếu tố thời trang.",
        temperature: 0.7,
      }
    });

    return response.text || "Không nhận được phản hồi từ AI.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Có lỗi xảy ra khi kết nối với Gemini AI.");
  }
};
