import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SlideLayoutProps {
  children: React.ReactNode;
  slideNumber: number;
  totalSlides: number;
  partnerLogoUrl?: string;
  onNextSlide?: () => void;
  onPrevSlide?: () => void;
  canNavigate?: boolean;
}

// Generated SVG Data URI for CloserCat Logo (Simulating a local file)
const LOGO_URL = "/logo-closercat.png";

const SlideLayout: React.FC<SlideLayoutProps> = ({ children, slideNumber, totalSlides, partnerLogoUrl, onNextSlide, onPrevSlide, canNavigate = true }) => {
  const [showPartnerInHeader, setShowPartnerInHeader] = React.useState(true);
  const touchStartRef = React.useRef<{ x: number; y: number } | null>(null);
  const contentRef = React.useRef<HTMLDivElement | null>(null);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length !== 1) return;
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  // En mobile, cuando cambia el slide, hacemos un pequeño auto-scroll hacia abajo
  // para revelar que hay más contenido (por ejemplo, videos o imágenes al final).
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.innerWidth >= 768) return; // Solo mobile

    const el = contentRef.current;
    if (!el) return;

    // Volver al inicio al cambiar de slide
    el.scrollTo({ top: 0, behavior: 'auto' });

    const maxScroll = el.scrollHeight - el.clientHeight;
    if (maxScroll < 120) return; // Si casi no hay contenido extra, no hacemos nudge

    const target = Math.min(180, maxScroll);
    const timeoutId = window.setTimeout(() => {
      el.scrollTo({ top: target, behavior: 'smooth' });
    }, 700);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [slideNumber]);

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
                    className="h-10 sm:h-12 md:h-14 w-auto object-contain"
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
      <div className="flex-1 overflow-y-auto md:overflow-hidden relative z-10 pb-4 sm:pb-6" ref={contentRef}>
        {children}
      </div>

      <div className={`absolute inset-y-0 left-0 right-0 flex items-center justify-between px-2 sm:px-4 md:px-6 z-20 pointer-events-none ${canNavigate ? '' : 'opacity-0'}`}>
        <button
          onClick={onPrevSlide}
          disabled={!onPrevSlide || slideNumber === 1}
          className="pointer-events-auto flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-brand-purple to-brand-cyan text-white shadow-lg hover:opacity-90 disabled:opacity-30 disabled:shadow-none"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
        </button>
        <button
          onClick={onNextSlide}
          disabled={!onNextSlide || slideNumber === totalSlides}
          className="pointer-events-auto flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-brand-purple to-brand-cyan text-white shadow-lg hover:opacity-90 disabled:opacity-30 disabled:shadow-none"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
        </button>
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