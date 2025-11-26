import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SlideLayoutProps {
  children: React.ReactNode;
  slideNumber: number;
  totalSlides: number;
  partnerLogoUrl?: string;
  onNextSlide?: () => void;
  onPrevSlide?: () => void;
}

// Generated SVG Data URI for CloserCat Logo (Simulating a local file)
const LOGO_URL = "/logo-closercat.png";

const SlideLayout: React.FC<SlideLayoutProps> = ({ children, slideNumber, totalSlides, partnerLogoUrl, onNextSlide, onPrevSlide }) => {
  const [showPartnerInHeader, setShowPartnerInHeader] = React.useState(true);
  const touchStartRef = React.useRef<{ x: number; y: number } | null>(null);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length !== 1) return;
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!touchStartRef.current || e.changedTouches.length !== 1) return;
    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchStartRef.current.x;
    const dy = touch.clientY - touchStartRef.current.y;
    touchStartRef.current = null;

    // Detectar swipe horizontal claro (más desplazamiento horizontal que vertical)
    if (Math.abs(dx) < 40 || Math.abs(dx) <= Math.abs(dy)) return;

    if (dx < 0) {
      onNextSlide?.();
    } else {
      onPrevSlide?.();
    }
  };

  return (
    <div
      className="w-full h-full flex flex-col relative bg-white overflow-hidden shadow-2xl rounded-none md:rounded-xl border border-gray-100"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 bg-brand-cyan/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 bg-brand-purple/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

      {/* Header Area */}
      <div className="w-full px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 flex justify-between items-center z-10 h-14 sm:h-16 md:h-20">
        <div className="flex items-center gap-3">
            {/* Logo Image (oculto en la slide 1 para dar protagonismo al logo principal de portada) */}
            {slideNumber !== 1 && (
              <>
                <img src={LOGO_URL} alt="CloserCat Logo" className="h-10 sm:h-12 md:h-14 w-auto object-contain" />
                {partnerLogoUrl && showPartnerInHeader && (
                  <img
                    src={partnerLogoUrl}
                    alt="Partner Logo"
                    className="h-8 sm:h-9 md:h-10 w-auto object-contain"
                    onError={() => setShowPartnerInHeader(false)}
                  />
                )}
              </>
            )}
        </div>
        <div className="text-[10px] sm:text-xs font-mono text-gray-400">
          {slideNumber} / {totalSlides}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto md:overflow-hidden relative z-10 pb-4 sm:pb-6">
        {children}
      </div>

      {/* Mobile swipe hint */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 md:hidden flex items-center gap-2 text-[11px] text-gray-400 animate-bounce pointer-events-none z-20">
        <ChevronLeft className="w-3 h-3" />
        <span>Desliza para navegar</span>
        <ChevronRight className="w-3 h-3" />
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