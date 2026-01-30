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
  // CTA props
  showCtaButton?: boolean;
  hasPartnerConfig?: boolean;
  ctaUrl?: string | null;
  rootPartnerCtaUrl?: string | null;
  rootCustomerCtaUrl?: string | null;
}

// Generated SVG Data URI for CloserCat Logo (Simulating a local file)
const LOGO_URL = "/logo-closercat.png";

const SlideLayout: React.FC<SlideLayoutProps> = ({
  children,
  slideNumber,
  totalSlides,
  partnerLogoUrl,
  onNextSlide,
  onPrevSlide,
  canNavigate = true,
  showCtaButton = false,
  hasPartnerConfig = false,
  ctaUrl,
  rootPartnerCtaUrl,
  rootCustomerCtaUrl,
}) => {
  const [showPartnerInHeader, setShowPartnerInHeader] = React.useState(true);
  const [showCtaOptions, setShowCtaOptions] = React.useState(false);
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
      className="w-full h-full flex flex-col relative bg-transparent overflow-hidden rounded-none md:rounded-[2rem]"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 bg-brand-cyan/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 bg-brand-purple/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

      {/* Header Area */}
      <div className="w-full px-4 md:px-8 py-3 md:py-4 flex justify-between items-center z-30 h-12 md:h-16 relative glass-panel">
        {/* Izquierda: Logo */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Logo (oculto en slide 1 para dar protagonismo al logo principal de portada) */}
          {slideNumber !== 1 && (
            <>
              <img src={LOGO_URL} alt="CloserCat Logo" className="h-8 md:h-12 w-auto object-contain" />
              {partnerLogoUrl && showPartnerInHeader && (
                <img
                  src={partnerLogoUrl}
                  alt="Partner Logo"
                  className="h-8 md:h-12 w-auto object-contain"
                  onError={() => setShowPartnerInHeader(false)}
                />
              )}
            </>
          )}
        </div>

        {/* Derecha: Botón Empezar O Indicador de slides */}
        <div className="flex items-center gap-3">
          {/* Botón Empezar (solo si showCtaButton=true y no es slide 1) */}
          {showCtaButton && slideNumber !== 1 && (hasPartnerConfig ? ctaUrl : (rootPartnerCtaUrl || rootCustomerCtaUrl)) && (
            <div className="relative z-50">
              {/* Caso 1: Hay partner - un solo link */}
              {hasPartnerConfig && ctaUrl && (
                <a
                  href={ctaUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center px-4 md:px-6 py-1.5 md:py-2 rounded-full bg-gradient-to-r from-brand-purple to-brand-cyan text-white font-semibold text-xs md:text-sm shadow-md hover:opacity-90"
                >
                  Empezar
                </a>
              )}

              {/* Caso 2: Sin partner - menú con dos opciones */}
              {!hasPartnerConfig && (rootPartnerCtaUrl || rootCustomerCtaUrl) && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowCtaOptions((prev) => !prev);
                    }}
                    className="inline-flex items-center justify-center px-4 md:px-6 py-1.5 md:py-2 rounded-full bg-gradient-to-r from-brand-purple to-brand-cyan text-white font-semibold text-xs md:text-sm shadow-md hover:opacity-90"
                  >
                    Empezar
                  </button>

                  {showCtaOptions && (
                    <div
                      className="absolute right-0 top-full mt-2 w-56 md:w-64 bg-white rounded-xl shadow-2xl border border-gray-200 py-3 px-3 text-left z-[100]"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <p className="text-[10px] md:text-xs uppercase font-semibold text-gray-400 mb-2 px-2">¿Cómo te interesa?</p>
                      <div className="space-y-1">
                        {rootPartnerCtaUrl && (
                          <a
                            href={rootPartnerCtaUrl}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="block w-full text-xs md:text-sm px-3 py-2.5 rounded-lg hover:bg-brand-purple/10 text-gray-800 cursor-pointer"
                          >
                            Como <span className="font-semibold">partner / reseller</span>
                          </a>
                        )}
                        {rootCustomerCtaUrl && (
                          <a
                            href={rootCustomerCtaUrl}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="block w-full text-xs md:text-sm px-3 py-2.5 rounded-lg hover:bg-brand-purple/10 text-gray-800 cursor-pointer"
                          >
                            Para <span className="font-semibold">mi negocio</span>
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* Indicador de slide (siempre visible) */}
          <div className="text-xs md:text-sm font-mono text-gray-400">
            {slideNumber} / {totalSlides}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className={`flex-1 overflow-y-auto md:overflow-hidden relative z-10 slide-entry-animation`} key={slideNumber} ref={contentRef}>
        {children}
      </div>

      {/* Pronounced Navigation Arrows */}
      <div className={`absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 md:px-8 z-50 pointer-events-none transition-opacity duration-500 ${canNavigate ? 'opacity-100' : 'opacity-0'}`}>
        {/* Previous Button */}
        <div className="flex flex-col items-center gap-2 group">
          <button
            onClick={onPrevSlide}
            disabled={!onPrevSlide || slideNumber === 1}
            className="pointer-events-auto flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-white text-gray-800 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 transition-all duration-300 hover:scale-110 active:scale-95 disabled:opacity-0 disabled:pointer-events-none hover:text-brand-purple"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" strokeWidth={3} />
          </button>
          {slideNumber !== 1 && (
            <span className="hidden md:block text-[10px] font-bold text-gray-400 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Anterior</span>
          )}
        </div>

        {/* Next Button */}
        <div className="flex flex-col items-center gap-2 group">
          <button
            onClick={onNextSlide}
            disabled={!onNextSlide || slideNumber === totalSlides}
            className={`pointer-events-auto flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-white text-gray-800 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 transition-all duration-300 hover:scale-110 active:scale-95 disabled:opacity-0 disabled:pointer-events-none hover:text-brand-purple ${slideNumber === 1 ? 'animate-pulse ring-4 ring-brand-purple/20' : ''}`}
            aria-label="Siguiente"
          >
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8" strokeWidth={3} />
          </button>
          {slideNumber !== totalSlides && (
            <span className="hidden md:block text-[10px] font-bold text-gray-400 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Siguiente</span>
          )}
        </div>
      </div>

      {/* Premium Progress Bar */}
      <div className="h-1.5 w-full bg-gray-100/30 mt-auto relative overflow-hidden backdrop-blur-sm">
        <div
          className="h-full bg-gradient-to-r from-brand-cyan to-brand-purple transition-all duration-700 ease-out shadow-[0_0_12px_rgba(131,54,255,0.6)]"
          style={{ width: `${(slideNumber / totalSlides) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default SlideLayout;