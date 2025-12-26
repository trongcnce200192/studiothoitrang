import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

interface FeatureSectionProps {
  title: string;
  description: string;
  label1: string;
  label2: string;
  actionLabel: string;
  promptTemplate: string;
}

export const FeatureSection: React.FC<FeatureSectionProps> = ({
  title, description, label1, label2, actionLabel, promptTemplate
}) => {
  const [img1, setImg1] = useState<string | null>(null);
  const [img2, setImg2] = useState<string | null>(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  // Lấy API Key từ biến môi trường đã cấu hình trên Vercel
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, setImg: (val: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImg(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const runAI = async () => {
    if (!img1 || !img2) return alert("Vui lòng chọn đủ 2 ảnh!");
    setLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const parts = [
        { text: promptTemplate },
        { inlineData: { mimeType: "image/jpeg", data: img1.split(',')[1] } },
        { inlineData: { mimeType: "image/jpeg", data: img2.split(',')[1] } },
      ];
      const res = await model.generateContent(parts);
      setResult(res.response.text());
    } catch (error) {
      setResult("Lỗi: " + error);
    }
    setLoading(false);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">{label1}</label>
          <input type="file" onChange={(e) => handleImageChange(e, setImg1)} className="w-full text-sm" />
          {img1 && <img src={img1} className="mt-2 h-40 rounded-lg object-cover" />}
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">{label2}</label>
          <input type="file" onChange={(e) => handleImageChange(e, setImg2)} className="w-full text-sm" />
          {img2 && <img src={img2} className="mt-2 h-40 rounded-lg object-cover" />}
        </div>
      </div>

      <button 
        onClick={runAI} 
        disabled={loading}
        className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors disabled:bg-gray-400"
      >
        {loading ? "AI đang phân tích..." : actionLabel}
      </button>

      {result && (
        <div className="mt-6 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
          <p className="font-bold text-indigo-900 mb-2">Kết quả từ AI:</p>
          <div className="text-gray-700 whitespace-pre-wrap">{result}</div>
        </div>
      )}
    </div>
  );
};
