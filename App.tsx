import React, { useState, useEffect, useCallback } from 'react';
import { SLIDES } from './constants';
import { SlideType, SlideData } from './types';
import SlideLayout from './components/SlideLayout';
import LandingApp from './LandingApp';
import {
  CoverSlide, AgendaSlide, TransitionSlide, StandardSlide,
  SplitImageSlide, DashboardSlide, GridSlide, SplitTextSlide,
  ComparisonTableSlide, PricingSlide, TimelineSlide, CalendlySlide, PricingLogicSlide
} from './components/SlideTemplates';
import { ChevronLeft, ChevronRight, Maximize, Minimize } from 'lucide-react';
import { clarityEvent, sendWebhookEvent, trackFunnelEvent, decodeQuoteData, isValidQuoteId } from './utils/tracking';
import SEOManager from './components/shared/SEOManager';

// URLs genéricas por defecto (puedes reemplazarlas por las reales)
const GENERIC_CUSTOMER_CTA_URL = 'https://calendly.com/rogertovalle?a1=CloserCat%20Pro%20-%20Cliente';
const GENERIC_PARTNER_CTA_URL = 'https://calendly.com/rogertovalle/?a1=CloserCat%20Pro%20-%20Partnership';
const SECRET_KEY = 'closercat-2025';

function claritySet(key: string, value: unknown) {
  if (typeof window === 'undefined') return;
  // @ts-ignore
  if (window.clarity) window.clarity('set', key, value);
}


// Configuración por partner: URLs separadas para partner y cliente
const PARTNER_CONFIG: Record<string, { partnerCtaUrl?: string; customerCtaUrl?: string }> = {
  wsi: {
    customerCtaUrl: 'https://www.wsiworld.lat/henry-guzman',
  },
  vc: {
    customerCtaUrl: 'https://calendly.com/victoriia-carvajal?a1=CloserCat%20Pro',
  },
  ticsia: {
    customerCtaUrl: '#',
  },
};

// Lista de partners válidos para slugs dinámicos en presentationId (base-partner)
const VALID_PARTNER_SLUGS = Object.keys(PARTNER_CONFIG);

// Orden explícito de los slides según la narrativa acordada.
// No todos los IDs definidos en constants.tsx aparecen aquí; algunos quedan fuera del flujo.
const SLIDE_ORDER: number[] = [
  // Introducción, contexto y problema
  1, 2, 3, 4, 6, 8,
  // Bloque de features conversacionales (cómo opera CloserCat en cada conversación)
  24, 25, 26, 16, 27, 28, 40, 14, 15, 41, 18, 19, 13,
  // Integraciones y marketing conversacional
  35, 32, 31, 12,
  // Panel unificado, operación y pasos siguientes
  20, 21, 42, 22, 38, 23, 43,
  // Cierre con llamada a la acción
  36,
];

// IDs de slides de precios/implementación que pueden ocultarse según el contexto de la presentación
const HIDE_PRICING_SLIDE_IDS: number[] = [22, 23, 38];

// Mapa de presets opacos base: presentationId -> configuración interna
// Ejemplos:
//   "nqprws"  → preset completo y estático (incluye partnerSlug)
//   "waquick" → preset base sin partner; el slug viene en presentationId (waquick-wsi)
const PRESENTATION_PRESETS: Record<string, {
  partnerSlug?: string;
  hidePricing?: boolean;
  slideOrder?: number[];  // orden custom opcional
  ctaUrl?: string;        // URL de "Agendar" específica del preset
  showCtaButton?: boolean; // mostrar botón "Empezar" en header
}> = {
  ticsia: {
    partnerSlug: 'ticsia',
    hidePricing: false,
    showCtaButton: false,
  },
  nqprws: {
    partnerSlug: 'wsi',
    hidePricing: true,
    showCtaButton: true,
  },
  // Pitch rápido WhatsApp (6 slides, ~2 minutos de lectura)
  waquick: {
    hidePricing: true,
    showCtaButton: true,
    slideOrder: [
      1,   // Portada CloserCat
      6,   // El problema del caos WhatsApp (dolor)
      8,   // Transición "Con CloserCat"
      28,  // Contact Enrichment (diferenciador clave)
      10,  // Lo que nos hace diferentes
      36,  // CTA cierre
    ]
  },
  // Versión media: problema + solución + campañas (9 slides)
  wamedium: {
    hidePricing: true,
    showCtaButton: true,
    slideOrder: [
      1,   // Portada
      24,  // Todo comienza con conversación
      28,  // Contact Enrichment
      16,  // Guardrails
      31,  // Dashboard campañas
      21,  // Comparativa
      36,  // CTA
    ],
  },
  // Nueva Versión: Post-Cotización / Foco Producto (Para llevar desde el simulador)
  prodemo: {
    hidePricing: false,
    showCtaButton: true,
    slideOrder: [
      1,   // Portada
      24,  // Todo comienza con una conversación
      26,  // La IA entiende texto, imágenes y audios
      12,  // Nuevas conversaciones en 3 clics
      8,   // TRANSITION: Con CloserCat... (BOTÓN AGENDAR)
      27,  // Estado de cada conversación en tiempo real
      13,  // Encuentra cualquier conversación en segundos
      18,  // Nunca más pierdas una conversación importante
      19,  // Seguimientos automáticos
      14,  // IA vs Manual
      15,  // Plantillas WABA
      41,  // Media Gallery
      16,  // Guardrails
      35,  // TRANSITION: De la operación diaria... (BOTÓN AGENDAR)
      28,  // Contact Enrichment
      40,  // 11+ campos extraídos
      31,  // Mide cada campaña en tiempo real
      32,  // Integraciones
      49,  // Próximos pasos / ROI
    ]
  },
};

const PresentationApp: React.FC<{ quoteData?: any }> = ({ quoteData }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [partnerLogoUrl, setPartnerLogoUrl] = useState<string | null>(null);
  const [hasUserNavigated, setHasUserNavigated] = useState(false);
  const [hasAutoDemoRun, setHasAutoDemoRun] = useState(false);
  const [hidePricing, setHidePricing] = useState(false);
  const [customSlideOrder, setCustomSlideOrder] = useState<number[] | null>(null);
  const [scale, setScale] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [showCtaButton, setShowCtaButton] = useState(false);
  const [ctaUrl, setCtaUrl] = useState<string | null>(GENERIC_CUSTOMER_CTA_URL); // usado en slide de cierre (cliente)
  const [rootPartnerCtaUrl, setRootPartnerCtaUrl] = useState<string | null>(GENERIC_PARTNER_CTA_URL);
  const [rootCustomerCtaUrl, setRootCustomerCtaUrl] = useState<string | null>(GENERIC_CUSTOMER_CTA_URL);
  const [hasPartnerConfig, setHasPartnerConfig] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [hasPreset, setHasPreset] = useState(false);
  const secretBufferRef = React.useRef('');

  const canNavigate = isUnlocked || hasPreset;

  const baseOrder = customSlideOrder || SLIDE_ORDER;
  const effectiveSlideOrder = hidePricing
    ? baseOrder.filter((id) => !HIDE_PRICING_SLIDE_IDS.includes(id))
    : baseOrder;

  const orderedSlides: SlideData[] = effectiveSlideOrder
    .map((id) => SLIDES.find((s) => s.id === id))
    .filter((s): s is SlideData => Boolean(s));

  const currentSlideData = orderedSlides[currentSlideIndex] || orderedSlides[0];
  const totalSlides = orderedSlides.length;

  // Implementación del salto al cierre
  const jumpToLastSlide = useCallback(() => {
    setCurrentSlideIndex(orderedSlides.length - 1);
    trackFunnelEvent('presentation_jump_to_cta', {
      fromIndex: currentSlideIndex,
      slideId: currentSlideData?.id
    }, quoteData);
  }, [orderedSlides.length, currentSlideIndex, currentSlideData?.id, quoteData]);

  // Detectar configuración de presentación desde la URL (ruta + query string)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Normalizar rutas: removimos la redirección agresiva para permitir rutas "a la medida"
    const { pathname } = window.location;
    const path = pathname.replace(/^\/|\/$/g, '');

    const params = new URLSearchParams(window.location.search);
    const queryPresentationId = params.get('presentationId') || params.get('partner');

    // Priorizamos el path (waquick-wsi) sobre el query param (?presentationId=...)
    const rawPresentationId = path || queryPresentationId;

    let basePresetId: string | null = null;
    let partnerSlugFromPreset: string | null = null;

    if (rawPresentationId) {
      // 1) Compatibilidad directa: el id completo existe como preset estático
      if (PRESENTATION_PRESETS[rawPresentationId]) {
        basePresetId = rawPresentationId;
      } else {
        // 2) Formato dinámico base-partner (ej. waquick-wsi)
        const [maybeBase, maybePartner] = rawPresentationId.split('-', 2);

        if (
          maybeBase &&
          PRESENTATION_PRESETS[maybeBase] &&
          maybePartner &&
          VALID_PARTNER_SLUGS.includes(maybePartner)
        ) {
          basePresetId = maybeBase;
          partnerSlugFromPreset = maybePartner;
          claritySet('presentationId', rawPresentationId);
          claritySet('presetId', basePresetId);
          claritySet('partnerSlug', partnerSlugFromPreset);
        } else {
          // presentationId inválido → enviar a la raíz y salir
          window.location.href = '/';
          return;
        }
      }
    }

    const preset = basePresetId ? PRESENTATION_PRESETS[basePresetId] : undefined;

    if (preset) {
      setHasPreset(true);
      setIsUnlocked(true);

      const partnerSlug = partnerSlugFromPreset || preset.partnerSlug;
      let partnerCtaFromConfig: string | null = null;
      let customerCtaFromConfig: string | null = null;

      if (partnerSlug) {
        setPartnerLogoUrl(`/partners/${partnerSlug}.png`);
        const cfg = PARTNER_CONFIG[partnerSlug];
        if (cfg) {
          partnerCtaFromConfig = cfg.partnerCtaUrl ?? null;
          customerCtaFromConfig = cfg.customerCtaUrl ?? null;
          setHasPartnerConfig(true);
        } else {
          setHasPartnerConfig(false);
        }
      } else {
        setHasPartnerConfig(false);
      }

      setHidePricing(Boolean(preset.hidePricing));
      setShowCtaButton(Boolean(preset.showCtaButton));
      if (preset.slideOrder) {
        setCustomSlideOrder(preset.slideOrder);
      }

      // Actualizar CTAs raíz (portada)
      setRootPartnerCtaUrl(partnerCtaFromConfig || GENERIC_PARTNER_CTA_URL);
      setRootCustomerCtaUrl(customerCtaFromConfig || GENERIC_CUSTOMER_CTA_URL);

      // Prioridad para CTA de cierre: preset.ctaUrl → CTA cliente del partner → CTA genérica cliente
      setCtaUrl(
        preset.ctaUrl ||
        customerCtaFromConfig ||
        GENERIC_CUSTOMER_CTA_URL
      );

      // Tracking en Clarity para esta presentación
      if (rawPresentationId) {
        claritySet('presentationId', rawPresentationId);
      }
      if (basePresetId) {
        claritySet('presetId', basePresetId);
      }
      if (partnerSlug) {
        claritySet('partnerSlug', partnerSlug);
      }

      // Guardar SIEMPRE la última URL de referido con presentationId para futuras redirecciones
      try {
        window.localStorage.setItem('closercat_referral_url', window.location.pathname + window.location.search);
      } catch {
        // Ignorar errores de acceso a localStorage
      }
      return;
    }

    setHasPreset(false);

    // Si no hay preset pero existe una URL de referido guardada y estamos en la raíz, redirigir allí
    try {
      const storedReferral = window.localStorage.getItem('closercat_referral_url');
      if (storedReferral && window.location.search === '') {
        window.location.href = storedReferral;
        return;
      }
    } catch {
      // Ignorar errores de acceso a localStorage
    }

    // Fallback: compatibilidad con parámetros antiguos directos
    const slug = params.get('partner');
    if (slug) {
      setPartnerLogoUrl(`/partners/${slug}.png`);
      const cfg = PARTNER_CONFIG[slug];
      if (cfg) {
        setRootPartnerCtaUrl(cfg.partnerCtaUrl ?? GENERIC_PARTNER_CTA_URL);
        setRootCustomerCtaUrl(cfg.customerCtaUrl ?? GENERIC_CUSTOMER_CTA_URL);
        setCtaUrl(cfg.customerCtaUrl ?? GENERIC_CUSTOMER_CTA_URL);
        setHasPartnerConfig(true);
      } else {
        setRootPartnerCtaUrl(GENERIC_PARTNER_CTA_URL);
        setRootCustomerCtaUrl(GENERIC_CUSTOMER_CTA_URL);
        setCtaUrl(GENERIC_CUSTOMER_CTA_URL);
        setHasPartnerConfig(false);
      }
    } else {
      // Sin partner explícito
      setRootPartnerCtaUrl(GENERIC_PARTNER_CTA_URL);
      setRootCustomerCtaUrl(GENERIC_CUSTOMER_CTA_URL);
      setCtaUrl(GENERIC_CUSTOMER_CTA_URL);
      setHasPartnerConfig(false);
    }
    const hidePricingFlag = params.get('hidePricing');
    if (hidePricingFlag === '1' || hidePricingFlag === 'true') {
      setHidePricing(true);
    }

    // Sin preset específico ni partner conocido: usar URLs genéricas
    setCtaUrl(GENERIC_CUSTOMER_CTA_URL);
    setIsUnlocked(false);
  }, []);

  // Tracking de slide actual en Clarity
  useEffect(() => {
    if (!currentSlideData) return;
    claritySet('slide_index', currentSlideIndex + 1);
    claritySet('slide_id', currentSlideData.id);
    claritySet('slide_type', currentSlideData.type);
  }, [currentSlideIndex, currentSlideData]);

  // Detectar mobile vs desktop y calcular escala solo para desktop
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateLayout = () => {
      const { innerWidth, innerHeight } = window;
      const mobile = innerWidth < 768;
      setIsMobile(mobile);

      if (mobile) {
        setScale(1); // En mobile no escalamos
        return;
      }

      // Desktop: frame fijo 1920x1080 escalado
      const padding = 32;
      const availableW = innerWidth - padding;
      const availableH = innerHeight - padding;
      const designW = 2200;
      const designH = 1080;
      const scaleX = availableW / designW;
      const scaleY = availableH / designH;
      setScale(Math.min(scaleX, scaleY, 1));
    };

    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
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
      // Registrar secuencia para la clave secreta (solo caracteres relevantes)
      const char = e.key.length === 1 ? e.key.toLowerCase() : '';
      if (/[a-z0-9-]/.test(char)) {
        secretBufferRef.current = (secretBufferRef.current + char).slice(-SECRET_KEY.length);
        if (!isUnlocked && secretBufferRef.current === SECRET_KEY) {
          setIsUnlocked(true);
        }
      }

      if (!canNavigate) return;

      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Space') {
        handleUserNext();
      } else if (e.key === 'ArrowLeft') {
        handleUserPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleUserNext, handleUserPrev, canNavigate, isUnlocked]);

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

  // Tracking de progreso de diapositivas
  useEffect(() => {
    if (!currentSlideData) return;
    trackFunnelEvent('presentacion_slide_view', {
      slide_id: currentSlideData.id,
      slide_index: currentSlideIndex,
      slide_title: currentSlideData.title,
      presentation_id: window.location.search.includes('prodemo') ? 'prodemo' : 'standard'
    }, quoteData);
  }, [currentSlideIndex, currentSlideData, quoteData]);

  const renderSlideContent = () => {
    const data = currentSlideData;
    const commonProps = {
      data,
      partnerLogoUrl,
      personalizedData: quoteData,
      ctaUrl: data.id === 36 ? ctaUrl : undefined,
      onCtaClick: (data.type === SlideType.TRANSITION || data.id === 1) ? jumpToLastSlide : undefined,
      rootPartnerCtaUrl,
      rootCustomerCtaUrl,
    };

    switch (data.type) {
      case SlideType.COVER:
        return (
          <CoverSlide
            {...commonProps}
            partnerLogoUrl={partnerLogoUrl || undefined}
            rootPartnerCtaUrl={!canNavigate ? rootPartnerCtaUrl || undefined : undefined}
            rootCustomerCtaUrl={!canNavigate ? rootCustomerCtaUrl || undefined : undefined}
          />
        );
      case SlideType.AGENDA: return <AgendaSlide {...commonProps} />;
      case SlideType.TRANSITION: {
        const isCtaSlide = data.id === 36;
        if (isCtaSlide) {
          if (hasPartnerConfig) {
            return <TransitionSlide {...commonProps} ctaUrl={ctaUrl || undefined} />;
          }
          return (
            <TransitionSlide
              {...commonProps}
              rootPartnerCtaUrl={rootPartnerCtaUrl || undefined}
              rootCustomerCtaUrl={rootCustomerCtaUrl || undefined}
            />
          );
        }
        return <TransitionSlide {...commonProps} />;
      }
      case SlideType.STANDARD: return <StandardSlide {...commonProps} />;
      case SlideType.SPLIT_IMAGE: return <SplitImageSlide {...commonProps} />;
      case SlideType.DASHBOARD: return <DashboardSlide {...commonProps} />;
      case SlideType.GRID: return <GridSlide {...commonProps} />;
      case SlideType.SPLIT_TEXT: return <SplitTextSlide {...commonProps} />;
      case SlideType.COMPARISON_TABLE: return <ComparisonTableSlide {...commonProps} />;
      case SlideType.PRICING: return <PricingSlide {...commonProps} />;
      case SlideType.TIMELINE: return <TimelineSlide {...commonProps} />;
      case SlideType.CALENDLY: return <CalendlySlide {...commonProps} />;
      case SlideType.PRICING_LOGIC: return <PricingLogicSlide {...commonProps} />;
      default: return <div className="p-10">Unknown Slide Type</div>;
    }
  };

  return (
    <div className="w-screen h-screen mesh-gradient flex items-center justify-center font-sans overflow-hidden">
      {/* Mobile: full screen fluido | Desktop: frame fijo 1920x1080 escalado */}
      <div
        className={`relative shadow-[0_0_120px_rgba(131,54,255,0.3)] overflow-hidden bg-white/10 backdrop-blur-3xl ${isMobile ? 'w-full h-full rounded-none' : 'rounded-[3rem] border border-white/20'
          }`}
        style={
          isMobile
            ? undefined
            : {
              width: 2200,
              height: 1080,
              transform: `scale(${scale})`,
              transformOrigin: 'center center',
            }
        }
      >
        <SlideLayout
          slideNumber={currentSlideIndex + 1}
          totalSlides={totalSlides}
          partnerLogoUrl={partnerLogoUrl || undefined}
          onNextSlide={canNavigate ? handleUserNext : undefined}
          onPrevSlide={canNavigate ? handleUserPrev : undefined}
          canNavigate={canNavigate}
          showCtaButton={showCtaButton}
          hasPartnerConfig={hasPartnerConfig}
          ctaUrl={ctaUrl}
          rootPartnerCtaUrl={rootPartnerCtaUrl}
          rootCustomerCtaUrl={rootCustomerCtaUrl}
        >
          {renderSlideContent()}
        </SlideLayout>

        {/* Floating Controls (solo cuando la navegación está habilitada) */}
        {canNavigate && (
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
        )}

      </div>
    </div>
  );
};

const RootApp: React.FC = () => {
  if (typeof window === 'undefined') return <LandingApp />;

  const params = new URLSearchParams(window.location.search);
  const path = window.location.pathname.replace(/^\/|\/$/g, '');

  // 1. Detect Mode
  const mode = params.get('mode');

  // 2. Detect Presentation (Path prioritized over Query)
  const presentationFromPath = path && (PRESENTATION_PRESETS[path] || path.includes('-')) ? path : null;
  const presentationFromQuery = params.get('presentationId') || params.get('partner');
  const activePresentationId = presentationFromPath || presentationFromQuery;

  // 3. Detect Segment (Path prioritized over Query)
  const validSegments = [
    'emprendedores', 'formacion', 'ecommerce', 'b2b', 'soporte',
    'otras-industrias', 'profesionales-independientes',
    'recursos/estudio-anatomia-conversaciones',
    'recursos', 'recursos/falla-1-continuidad-rota',
    'recursos/falla-2-memoria-inexistente',
    'recursos/falla-3-automatizacion-mal-entendida',
    'recursos/falla-4-escalamiento-caotico',
    'recursos/falla-5-promesas-rotas',
    'recursos/falla-6-silencio-mortal',
    'recursos/falla-7-persuasion-ausente'
  ];
  const segmentFromPath = validSegments.includes(path) ? path : null;
  const segmentFromQuery = params.get('segment');
  const activeSegment = segmentFromPath || segmentFromQuery;

  // 4. Quote Resolution (For prodemo)
  const quoteId = params.get('quoteId');
  const qdata = params.get('qdata');
  let resolvedQuote = null;

  if (qdata) {
    resolvedQuote = decodeQuoteData(qdata);
  }

  if (!resolvedQuote && quoteId) {
    const stored = localStorage.getItem(`cc_quote_${quoteId}`);
    if (stored) {
      try {
        resolvedQuote = JSON.parse(stored);
      } catch (e) {
        console.error('Error parsing stored quote:', e);
      }
    }
  }

  // 5. Decision Logic
  const isSegment = Boolean(activeSegment);
  const isPresentation = (mode === 'presentation' || Boolean(activePresentationId)) && !isSegment;

  // Si es prodemo pero no hay datos válidos (ni en URL ni en localStorage),
  // verificamos el patrón del ID antes de permitir mostrar la presentación genérica
  if (activePresentationId === 'prodemo' && !resolvedQuote) {
    if (!isValidQuoteId(quoteId)) {
      return <LandingApp />;
    }
    // Si el patrón es válido pero no hay data, se mostrará con valores por defecto/genéricos
  }

  return (
    <>
      <SEOManager />
      {isPresentation ? (
        <PresentationApp quoteData={resolvedQuote} />
      ) : (
        <LandingApp />
      )}
    </>
  );
};

export default RootApp;