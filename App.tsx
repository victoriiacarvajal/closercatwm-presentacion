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

  const orderedSlides: SlideData[] = SLIDE_ORDER
    .map((id) => SLIDES.find((s) => s.id === id))
    .filter((s): s is SlideData => Boolean(s));

  const currentSlideData = orderedSlides[currentSlideIndex] || orderedSlides[0];
  const totalSlides = orderedSlides.length;

  const nextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => Math.min(prev + 1, totalSlides - 1));
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => Math.max(prev - 1, 0));
  }, []);

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
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const renderSlideContent = () => {
    const data = currentSlideData;
    switch (data.type) {
      case SlideType.COVER: return <CoverSlide data={data} />;
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
    <div className="w-screen h-screen bg-gray-200 flex items-center justify-center p-2 font-sans overflow-hidden">
      {/* Aspect Ratio Container (16:9) 
          max-w-[177.78vh] ensures width doesn't exceed 16/9 of height (preventing vertical overflow)
          w-full ensures it fills width if height is not the bottleneck
      */}
      <div className="relative aspect-video w-full max-w-[177.78vh] max-h-full shadow-2xl rounded-xl overflow-hidden bg-white mx-auto">
        <SlideLayout slideNumber={currentSlideIndex + 1} totalSlides={totalSlides}>
          {renderSlideContent()}
        </SlideLayout>

        {/* Floating Controls */}
        <div className="absolute bottom-6 right-6 flex items-center gap-2 bg-white/90 backdrop-blur border border-gray-200 p-2 rounded-full shadow-lg z-50 opacity-0 hover:opacity-100 transition-opacity duration-300">
            <button onClick={prevSlide} disabled={currentSlideIndex === 0} className="p-2 hover:bg-gray-100 rounded-full disabled:opacity-30 text-gray-700">
                <ChevronLeft size={20} />
            </button>
            <span className="text-xs font-mono font-medium w-12 text-center text-gray-500">
                {currentSlideIndex + 1}/{totalSlides}
            </span>
            <button onClick={nextSlide} disabled={currentSlideIndex === totalSlides - 1} className="p-2 hover:bg-gray-100 rounded-full disabled:opacity-30 text-gray-700">
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