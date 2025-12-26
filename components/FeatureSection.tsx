import React, { useState } from 'react';
import { ImageUploader } from './ImageUploader';
import { FashionFeatureProps, ImageFile } from '../types';
import { analyzeFashionImages } from '../services/geminiService';

export const FeatureSection: React.FC<FashionFeatureProps> = ({ 
  title, 
  description,
  label1, 
  label2, 
  actionLabel, 
  promptTemplate 
}) => {
  const [image1, setImage1] = useState<ImageFile | null>(null);
  const [image2, setImage2] = useState<ImageFile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleExecute = async () => {
    if (!image1 || !image2) return;

    setIsLoading(true);
    setResult(null);
    setError(null);

    try {
      // The service call simulates the AI processing by getting a description
      const responseText = await analyzeFashionImages(
        image1.base64, 
        image2.base64, 
        promptTemplate
      );
      setResult(responseText);
    } catch (err) {
      setError("Có lỗi xảy ra khi xử lý. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  const isReady = image1 !== null && image2 !== null;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 scroll-mt-20">
      <div className="mb-6 border-b border-gray-100 pb-4">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          {title}
        </h2>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <ImageUploader 
          label={label1} 
          image={image1} 
          onImageSelected={setImage1} 
          disabled={isLoading}
        />
        <ImageUploader 
          label={label2} 
          image={image2} 
          onImageSelected={setImage2} 
          disabled={isLoading}
        />
      </div>

      <div className="flex flex-col items-center">
        <button
          onClick={handleExecute}
          disabled={!isReady || isLoading}
          className={`
            w-full md:w-auto px-8 py-3 rounded-full font-bold text-white shadow-lg transition-all transform
            flex items-center justify-center gap-2
            ${!isReady || isLoading 
              ? 'bg-gray-300 cursor-not-allowed shadow-none' 
              : 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 hover:-translate-y-0.5 shadow-indigo-200'
            }
          `}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Đang xử lý...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 8V3a1 1 0 01-3.27-2.984l3.15-3.097z" clipRule="evenodd" />
              </svg>
              {actionLabel}
            </>
          )}
        </button>

        {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg w-full text-center text-sm">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-6 w-full animate-fadeIn">
            <div className="bg-gray-900 text-gray-100 p-6 rounded-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-400 to-pink-500"></div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Kết quả phân tích từ Gemini AI</h3>
              <p className="whitespace-pre-wrap leading-relaxed">
                {result}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
