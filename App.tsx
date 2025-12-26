import React from 'react';
import { FeatureSection } from './components/FeatureSection';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              Fashion AI Mini
            </h1>
          </div>
          <span className="text-xs font-medium px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full">
            Powered by Gemini
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 space-y-12">
        
        {/* Intro */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
            Studio Thời Trang từ Nguyễn Chí Trọng
          </h2>
          <p className="text-gray-600">
            liên hệ 0362423528
          </p>
        </div>

        {/* Chức năng 1: Thay đổi trang phục */}
        <FeatureSection
          title="1. Thay đổi trang phục (Virtual Try-On)"
          description="Hình dung người mẫu sẽ trông như thế nào khi mặc bộ trang phục mới."
          label1="Ảnh Người mẫu"
          label2="Ảnh Trang phục / Áo mới"
          actionLabel="Thực hiện Thay đồ"
          promptTemplate="Hãy đóng vai một chuyên gia thời trang. Dựa trên 2 bức ảnh được cung cấp: Ảnh 1 là người mẫu, Ảnh 2 là trang phục. Hãy tưởng tượng và mô tả chi tiết, sống động kết quả khi người mẫu trong Ảnh 1 mặc bộ trang phục trong Ảnh 2. Nhận xét về độ phù hợp, phom dáng và phong cách tổng thể."
        />

        {/* Chức năng 2: Thay đổi chất liệu */}
        <FeatureSection
          title="2. Thay đổi chất liệu (Texture Change)"
          description="Áp dụng một họa tiết hoặc chất liệu mới lên bề mặt của đối tượng."
          label1="Ảnh Đối tượng (Áo/Váy/Sofa...)"
          label2="Ảnh Mẫu vải / Chất liệu mới"
          actionLabel="Thực hiện Đổi chất liệu"
          promptTemplate="Hãy đóng vai một nhà thiết kế vật liệu. Dựa trên 2 bức ảnh: Ảnh 1 là đối tượng gốc, Ảnh 2 là mẫu bề mặt/chất liệu (texture). Hãy mô tả chi tiết kết quả khi chất liệu của đối tượng trong Ảnh 1 được thay thế hoàn toàn bằng chất liệu trong Ảnh 2. Chú ý đến cách ánh sáng phản chiếu và độ nhám của bề mặt mới."
        />

        {/* Chức năng 3: Thêm phụ kiện */}
        <FeatureSection
          title="3. Thêm phụ kiện (Add Accessory)"
          description="Thử nghiệm phối hợp phụ kiện mới vào trang phục hiện tại."
          label1="Ảnh Người mẫu"
          label2="Ảnh Phụ kiện (Túi/Mũ/Kính...)"
          actionLabel="Thực hiện Thêm phụ kiện"
          promptTemplate="Hãy đóng vai một stylist chuyên nghiệp. Dựa trên 2 bức ảnh: Ảnh 1 là người mẫu, Ảnh 2 là phụ kiện thời trang. Hãy tưởng tượng và mô tả vẻ ngoài của người mẫu trong Ảnh 1 khi được phối thêm phụ kiện từ Ảnh 2. Phụ kiện này nên được đặt ở vị trí nào là hợp lý nhất? Nó thay đổi tổng thể outfit như thế nào?"
        />

      </main>

      {/* Footer */}
      <footer className="text-center py-8 text-gray-400 text-sm border-t border-gray-200 mt-12 bg-white">
        <p>© 2024 Fashion AI Mini. Built with React & Gemini API.</p>
      </footer>
    </div>
  );
};

export default App;
