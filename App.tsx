import React, { useState, useEffect, useCallback } from 'react';
import { SLIDES } from './constants';
import { SlideType, SlideData } from './types';
import SlideLayout from './components/SlideLayout';
import { 
  CoverSlide, AgendaSlide, TransitionSlide, StandardSlide, 
  SplitImageSlide, DashboardSlide, GridSlide, SplitTextSlide, 
  ComparisonTableSlide, PricingSlide, TimelineSlide 
} from './components/SlideTemplates';
import { ChevronLeft, ChevronRight, Maximize, Minimize } from 'lucide-react';

// Orden explícito de los slides según la narrativa acordada.
// No todos los IDs definidos en constants.tsx aparecen aquí; algunos quedan fuera del flujo.
const SLIDE_ORDER: number[] = [
  // Introducción, contexto y problema
  1, 2, 3, 4, 6, 8,
  // Bloque de features conversacionales (cómo opera CloserCat en cada conversación)
  24, 25, 26, 16, 27, 28, 14, 15, 18, 19, 13,
  // Integraciones y marketing conversacional
  35, 32, 31, 12,
  // Panel unificado, operación y pasos siguientes
  20, 21, 22, 38, 23,
  // Cierre con llamada a la acción
  36,
];

const App: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [partnerLogoUrl, setPartnerLogoUrl] = useState<string | null>(null);
  const [hasUserNavigated, setHasUserNavigated] = useState(false);
  const [hasAutoDemoRun, setHasAutoDemoRun] = useState(false);

  const orderedSlides: SlideData[] = SLIDE_ORDER
    .map((id) => SLIDES.find((s) => s.id === id))
    .filter((s): s is SlideData => Boolean(s));

  const currentSlideData = orderedSlides[currentSlideIndex] || orderedSlides[0];
  const totalSlides = orderedSlides.length;

  // Detect partner from query string once on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('partner');
    if (slug) {
      setPartnerLogoUrl(`/partners/${slug}.png`);
    }
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => Math.min(prev + 1, totalSlides - 1));
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  const handleUserNext = useCallback(() => {
    setHasUserNavigated(true);
    nextSlide();
  }, [nextSlide]);

  const handleUserPrev = useCallback(() => {
    setHasUserNavigated(true);
    prevSlide();
  }, [prevSlide]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        handleUserNext();
      } else if (e.key === 'ArrowLeft') {
        handleUserPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleUserNext, handleUserPrev]);

  // Demo automática en mobile: avanzar y volver una vez en la slide 1
  useEffect(() => {
    if (hasAutoDemoRun || hasUserNavigated) return;
    if (currentSlideIndex !== 0) return;
    if (typeof window === 'undefined' || window.innerWidth >= 768) return;

    setHasAutoDemoRun(true);

    let backTimeout: number | undefined;
    const nextTimeout = window.setTimeout(() => {
      nextSlide();
      backTimeout = window.setTimeout(() => {
        prevSlide();
      }, 1200);
    }, 2500);

    return () => {
      window.clearTimeout(nextTimeout);
      if (backTimeout !== undefined) {
        window.clearTimeout(backTimeout);
      }
    };
  }, [currentSlideIndex, hasAutoDemoRun, hasUserNavigated, nextSlide, prevSlide]);

  const renderSlideContent = () => {
    const data = currentSlideData;
    switch (data.type) {
      case SlideType.COVER: return <CoverSlide data={data} partnerLogoUrl={partnerLogoUrl || undefined} />;
      case SlideType.AGENDA: return <AgendaSlide data={data} />;
      case SlideType.TRANSITION: return <TransitionSlide data={data} />;
      case SlideType.STANDARD: return <StandardSlide data={data} />;
      case SlideType.SPLIT_IMAGE: return <SplitImageSlide data={data} />;
      case SlideType.DASHBOARD: return <DashboardSlide data={data} />;
      case SlideType.GRID: return <GridSlide data={data} />;
      case SlideType.SPLIT_TEXT: return <SplitTextSlide data={data} />;
      case SlideType.COMPARISON_TABLE: return <ComparisonTableSlide data={data} />;
      case SlideType.PRICING: return <PricingSlide data={data} />;
      case SlideType.TIMELINE: return <TimelineSlide data={data} />;
      default: return <div className="p-10">Unknown Slide Type</div>;
    }
  };

  return (
    <div className="w-screen h-screen bg-gray-200 flex items-stretch justify-stretch md:items-center md:justify-center p-0 sm:p-2 font-sans overflow-hidden">
      {/* En mobile usamos full-screen vertical; en md+ mantenemos frame 16:9 centrado */}
      <div className="relative w-full h-full md:h-auto md:aspect-video md:max-w-[177.78vh] md:max-h-full shadow-2xl md:rounded-xl overflow-hidden bg-white mx-auto">
        <SlideLayout
          slideNumber={currentSlideIndex + 1}
          totalSlides={totalSlides}
          partnerLogoUrl={partnerLogoUrl || undefined}
          onNextSlide={handleUserNext}
          onPrevSlide={handleUserPrev}
        >
          {renderSlideContent()}
        </SlideLayout>

        {/* Floating Controls */}
        <div className="absolute bottom-6 right-6 flex items-center gap-2 bg-white/90 backdrop-blur border border-gray-200 p-2 rounded-full shadow-lg z-50 opacity-0 hover:opacity-100 transition-opacity duration-300">
            <button onClick={handleUserPrev} disabled={currentSlideIndex === 0} className="p-2 hover:bg-gray-100 rounded-full disabled:opacity-30 text-gray-700">
                <ChevronLeft size={20} />
            </button>
            <span className="text-xs font-mono font-medium w-12 text-center text-gray-500">
                {currentSlideIndex + 1}/{totalSlides}
            </span>
            <button onClick={handleUserNext} disabled={currentSlideIndex === totalSlides - 1} className="p-2 hover:bg-gray-100 rounded-full disabled:opacity-30 text-gray-700">
                <ChevronRight size={20} />
            </button>
            <div className="w-px h-4 bg-gray-300 mx-1"></div>
             <button onClick={toggleFullscreen} className="p-2 hover:bg-gray-100 rounded-full text-gray-700">
                {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
            </button>
        </div>
      </div>
    </div>
  );
};

export default App;