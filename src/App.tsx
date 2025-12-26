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

  // Lấy API Key từ biến môi trường (Vite yêu cầu tiền tố VITE_)
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>, setImg: (val: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImg(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!img1 || !img2) return alert("Vui lòng tải đủ 2 ảnh");
    setLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = promptTemplate;
      const parts = [
        { text: prompt },
        { inlineData: { mimeType: "image/jpeg", data: img1.split(',')[1] } },
        { inlineData: { mimeType: "image/jpeg", data: img2.split(',')[1] } },
      ];
      const res = await model.generateContent(parts);
      setResult(res.response.text());
    } catch (error) {
      setResult("Có lỗi xảy ra: " + error);
    }
    setLoading(false);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 text-sm">{description}</p>
      
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">{label1}</label>
          <input type="file" onChange={(e) => handleImage(e, setImg1)} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"/>
          {img1 && <img src={img1} className="mt-2 h-40 w-full object-cover rounded-lg border" />}
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">{label2}</label>
          <input type="file" onChange={(e) => handleImage(e, setImg2)} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"/>
          {img2 && <img src={img2} className="mt-2 h-40 w-full object-cover rounded-lg border" />}
        </div>
      </div>

      <button 
        onClick={handleSubmit}
        disabled={loading}
        className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all disabled:bg-gray-300"
      >
        {loading ? "Đang xử lý..." : actionLabel}
      </button>

      {result && (
        <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
          <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">{result}</p>
        </div>
      )}
    </div>
  );
};
