import React from 'react';

interface SlideLayoutProps {
  children: React.ReactNode;
  slideNumber: number;
  totalSlides: number;
}

// Generated SVG Data URI for CloserCat Logo (Simulating a local file)
const LOGO_URL = "/logo-closercat.png";

const SlideLayout: React.FC<SlideLayoutProps> = ({ children, slideNumber, totalSlides }) => {
  return (
    <div className="w-full h-full flex flex-col relative bg-white overflow-hidden shadow-2xl rounded-xl border border-gray-100">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-cyan/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-purple/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

      {/* Header Area */}
      <div className="w-full px-8 py-6 flex justify-between items-center z-10 h-20">
        <div className="flex items-center">
            {/* Logo Image (oculto en la slide 1 para dar protagonismo al logo principal de portada) */}
            {slideNumber !== 1 && (
              <img src={LOGO_URL} alt="CloserCat Logo" className="h-14 w-auto object-contain" />
            )}
        </div>
        <div className="text-xs font-mono text-gray-400">
          {slideNumber} / {totalSlides}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden relative z-10">
        {children}
      </div>

      {/* Footer Line */}
      <div className="h-1.5 w-full bg-gray-100 mt-auto">
        <div 
            className="h-full bg-gradient-to-r from-brand-cyan to-brand-purple transition-all duration-500 ease-out" 
            style={{ width: `${(slideNumber / totalSlides) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default SlideLayout;