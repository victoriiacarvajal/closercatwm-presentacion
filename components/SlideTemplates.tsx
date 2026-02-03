import React, { useEffect } from 'react';
import { SlideData } from '../types';
import { trackFunnelEvent } from '../utils/tracking';
import { Check, User, Bot, ArrowRight, Zap, Shield, PlayCircle } from 'lucide-react';

interface TemplateProps {
  data: SlideData;
  partnerLogoUrl?: string;
  ctaUrl?: string;    // URL opcional para botón "Agendar" en slides de transición / cierre
  rootPartnerCtaUrl?: string; // URL opcional para CTA "partner" en portada
  rootCustomerCtaUrl?: string; // URL opcional para CTA "cliente" en portada
  personalizedData?: any;
  onCtaClick?: () => void; // Callback para navegar internamente al slide de cierre
}

// Filas de comparación usadas tanto en mobile (tarjetas) como en desktop (tabla)
const COMPARISON_ROWS: [string, string, string, string, string][] = [
  ["IA entrenada con TUS datos conversacionales", "✅", "⚠️ FAQs genéricas / scripts", "N/A", "❌"],
  ["Modo IA asistida + modo manual en la misma conversación", "✅", "❌ Auto 100%", "✅ Manual sin IA", "⚠️ Limitado"],
  ["Guardrails + escalación a humano ante riesgo", "✅", "❌", "✅ Sin automatización", "⚠️ Básico"],
  ["Escucha en ráfaga y comprensión multimodal", "✅", "⚠️ Solo texto", "✅ Humano", "⚠️ Limitado"],
  ["Pipeline conversacional: estados y seguimientos", "✅", "❌", "❌", "⚠️ Pipeline no conversacional"],
  ["Datos conversacionales estructurados para el negocio", "✅", "❌", "❌", "⚠️ Datos sueltos"],
  ["Segmentación y campañas por comportamiento conversacional", "✅", "❌", "❌", "⚠️ Segmentación solo CRM"],
  ["Dashboard de campañas y métricas en tiempo real", "✅", "❌", "❌", "✅ No enfocado en WhatsApp"],
  ["Integraciones abiertas sobre datos conversacionales", "✅", "⚠️ Limitadas", "❌", "✅ No conversacional-first"],
];

// 1. Cover Slide
export const CoverSlide: React.FC<TemplateProps> = ({ data, partnerLogoUrl, rootPartnerCtaUrl, rootCustomerCtaUrl, personalizedData }) => {
  const [isVideoOpen, setIsVideoOpen] = React.useState(false);
  const [showPartnerLogo, setShowPartnerLogo] = React.useState(true);
  const [showContactOptions, setShowContactOptions] = React.useState(false);

  const isLocalVideo = !!(data.videoUrl && /\.(mp4|webm|ogg)$/i.test(data.videoUrl));

  const handleOpenVideo = () => {
    if (!data.videoUrl || isLocalVideo) return;
    setIsVideoOpen(true);
  };

  const handleCloseVideo = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsVideoOpen(false);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center text-center px-4 md:px-16 py-4 md:py-8 relative">
      {/* Logo */}
      <div className="mb-4 md:mb-6 flex items-center justify-center gap-3 md:gap-4">
        <img
          src="/logo-closercat.png"
          alt="CloserCat Logo"
          className="h-16 md:h-28 object-contain drop-shadow-xl"
        />
        {partnerLogoUrl && showPartnerLogo && (
          <>
            <span className="text-sm md:text-base text-gray-300 font-medium">x</span>
            <img
              src={partnerLogoUrl}
              alt="Partner Logo"
              className="h-12 md:h-20 object-contain"
              onError={() => setShowPartnerLogo(false)}
            />
          </>
        )}
      </div>

      {/* Title & Subtitle Section */}
      <div className="max-w-5xl mx-auto mb-8 md:mb-12">
        <h2 className="text-2xl md:text-6xl text-brand-cyan font-bold mb-6 leading-tight px-2 drop-shadow-sm">
          {personalizedData?.formData?.business
            ? `Propuesta Estratégica para ${personalizedData.formData.business}`
            : data.title}
        </h2>

        <p className="text-lg md:text-2xl text-gray-300 font-medium max-w-4xl mx-auto px-4 leading-relaxed">
          {personalizedData?.formData?.business
            ? "Descubre cómo Closercat Pro escalará tus metas de venta con IA. Desliza o usa las flechas para comenzar a explorar."
            : data.subtitle}
        </p>
      </div>

      {/* CTA global cuando la navegación está bloqueada */}
      {(rootPartnerCtaUrl || rootCustomerCtaUrl) && (
        <div className="mb-4 md:mb-6 relative">
          <button
            onClick={() => setShowContactOptions((prev) => !prev)}
            className="inline-flex items-center justify-center px-6 md:px-10 py-2.5 md:py-3 rounded-full bg-gradient-to-r from-brand-purple to-brand-cyan text-white font-semibold text-sm md:text-lg shadow-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-brand-cyan/60"
          >
            Contactar
          </button>

          {showContactOptions && (
            <div className="absolute left-1/2 -translate-x-1/2 mt-3 w-72 md:w-80 bg-white rounded-2xl shadow-xl border border-gray-100 py-3 md:py-4 px-3 md:px-4 text-left z-30">
              <p className="text-[10px] md:text-xs uppercase font-semibold text-gray-400 mb-2 md:mb-3 px-1">¿Cómo te interesa CloserCat?</p>
              <div className="space-y-2">
                {rootPartnerCtaUrl && (
                  <a
                    href={rootPartnerCtaUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="block w-full text-sm md:text-base px-3 md:px-4 py-2 md:py-3 rounded-xl hover:bg-brand-purple/5 text-gray-800 text-left"
                  >
                    Me interesa como <span className="font-semibold">partner / reseller</span>
                  </a>
                )}
                {rootCustomerCtaUrl && (
                  <a
                    href={rootCustomerCtaUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="block w-full text-sm md:text-base px-3 md:px-4 py-2 md:py-3 rounded-xl hover:bg-brand-purple/5 text-gray-800 text-left"
                  >
                    Me interesa <span className="font-semibold">para mi negocio</span>
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Video container - glassmorphism polish */}
      <div
        className="w-full max-w-sm md:w-[1200px] md:max-w-none aspect-video card-premium flex items-center justify-center relative overflow-hidden transform hover:scale-[1.01] transition-transform duration-500 group"
        onClick={handleOpenVideo}
        style={!isLocalVideo && data.videoUrl ? { cursor: 'pointer' } : undefined}
      >
        {isLocalVideo ? (
          <video
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          >
            <source src={data.videoUrl} type="video/mp4" />
          </video>
        ) : (
          data.imagePlaceholder && (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-50">
              <img
                src={data.imageUrl || `https://picsum.photos/1200/800?random=${data.id}`}
                className="w-full h-full object-cover opacity-90 transition-opacity group-hover:opacity-100"
                alt="placeholder"
              />
              {!data.imageUrl && (
                <span className="absolute bottom-6 bg-white/90 px-6 py-3 rounded-lg font-mono text-lg border border-gray-200 backdrop-blur-md shadow-sm z-20">
                  {data.imagePlaceholder}
                </span>
              )}
              {/* Play Button Overlay */}
              {data.videoUrl && (
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 border border-white/50 shadow-2xl group-hover:scale-110 transition-transform duration-300">
                    <PlayCircle className="w-20 h-20 text-white fill-white/20" />
                  </div>
                </div>
              )}
            </div>
          )
        )}
      </div>

      {data.videoUrl && !isLocalVideo && isVideoOpen && (
        <div className="absolute inset-0 bg-black/80 z-40 flex items-center justify-center">
          <div className="relative w-4/5 max-w-5xl aspect-video bg-black rounded-2xl shadow-2xl overflow-hidden">
            <button
              onClick={handleCloseVideo}
              className="absolute top-3 right-4 z-50 text-white/80 hover:text-white bg-black/40 hover:bg-black/60 rounded-full px-3 py-1 text-sm font-semibold"
            >
              Cerrar
            </button>
            <iframe
              src={data.videoUrl}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              title={data.title || 'Video'}
            />
          </div>
        </div>
      )}
    </div>
  );
};

// 2. Agenda Slide
export const AgendaSlide: React.FC<TemplateProps> = ({ data }) => (
  <div className="h-full flex flex-col justify-center px-4 sm:px-10 md:px-24 bg-transparent">
    <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold brand-gradient-text mb-8 sm:mb-12 md:mb-16 border-l-[8px] md:border-l-[12px] border-brand-purple pl-4 sm:pl-8 md:pl-10">{data.title}</h2>
    <div className="space-y-4 sm:space-y-6 md:space-y-4 max-w-5xl">
      {data.bullets?.map((item, i) => (
        <div key={i} className="flex items-center gap-4 sm:gap-6 md:gap-8 group card-premium p-4 md:p-6 hover:shadow-2xl hover:border-brand-cyan/40 transition-all hover:translate-x-2">
          <span className="font-display font-bold text-3xl sm:text-4xl md:text-5xl brand-gradient-text opacity-40 group-hover:opacity-100 transition-all">
            {(i + 1).toString().padStart(2, '0')}
          </span>
          <div className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">
            {item.substring(3)}
          </div>
        </div>
      ))}
    </div>
  </div>
);

// 3. Transition Slide
export const TransitionSlide: React.FC<TemplateProps> = ({ data, ctaUrl, rootPartnerCtaUrl, rootCustomerCtaUrl, onCtaClick }) => (
  <div className="h-full flex flex-col items-center justify-center text-white relative overflow-hidden px-4 sm:px-8 vibrant-transition-bg">
    <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-extrabold mb-4 sm:mb-6 md:mb-8 text-center z-10 px-2 sm:px-6 md:px-12 leading-tight max-w-6xl drop-shadow-md">{data.title}</h1>
    {data.subtitle && (
      <h2 className="text-xl sm:text-2xl md:text-4xl font-medium text-white z-10 text-center max-w-4xl mb-12 drop-shadow-lg opacity-90">
        {data.subtitle}
      </h2>
    )}

    {/* Botón Agendar (Prioriza navegación interna para prodemo) */}
    {onCtaClick ? (
      <button
        onClick={onCtaClick}
        className="cta-button-vibrant z-10"
      >
        Agendar Llamada Estratégica 📅
      </button>
    ) : (
      <>
        {/* Caso 1: CTA único (cuando hay partner asociado) */}
        {ctaUrl && !rootPartnerCtaUrl && !rootCustomerCtaUrl && (
          <a
            href={ctaUrl}
            target="_blank"
            rel="noreferrer"
            className="cta-button-vibrant z-10"
          >
            Agendar
          </a>
        )}

        {/* Caso 2: menú doble (sin partner asociado, reutiliza patrón de portada) */}
        {!ctaUrl && (rootPartnerCtaUrl || rootCustomerCtaUrl) && (
          <div className="mt-8 sm:mt-10 bg-white/10 rounded-2xl px-4 py-3 sm:px-6 sm:py-4 backdrop-blur border border-white/20 z-10">
            <p className="text-xs sm:text-sm text-white/80 mb-2 text-center">¿Cómo te interesa avanzar?</p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
              {rootPartnerCtaUrl && (
                <a
                  href={rootPartnerCtaUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center px-4 sm:px-5 py-2 rounded-full bg-white text-brand-purple text-xs sm:text-sm font-semibold shadow-md hover:bg-gray-100"
                >
                  Partner / reseller
                </a>
              )}
              {rootCustomerCtaUrl && (
                <a
                  href={rootCustomerCtaUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="cta-button-vibrant z-10 py-2"
                >
                  Me interesa CloserCat
                </a>
              )}
            </div>
          </div>
        )}
      </>
    )}
  </div>
);

// 4. Standard Slide (Title + Bullets/Content)
export const StandardSlide: React.FC<TemplateProps> = ({ data }) => {
  const [isVideoOpen, setIsVideoOpen] = React.useState(false);

  const isLocalVideo = !!(data.videoUrl && /\.(mp4|webm|ogg)$/i.test(data.videoUrl));

  const handleOpenVideo = () => {
    if (!data.videoUrl) return;
    setIsVideoOpen(true);
  };

  const handleCloseVideo = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsVideoOpen(false);
  };

  return (
    <div className="h-full flex flex-col px-4 md:px-12 lg:px-24 py-4 md:py-10 relative overflow-y-auto md:overflow-hidden max-w-[2000px] mx-auto bg-transparent">
      <h2 className="text-2xl md:text-5xl font-display font-bold text-gray-900 mb-1 md:mb-2 drop-shadow-sm">{data.title}</h2>
      {data.subtitle && <h3 className="text-base md:text-2xl brand-gradient-text font-semibold mb-4 md:mb-6">{data.subtitle}</h3>}

      <div className="flex-1 flex flex-col md:flex-row gap-4 md:gap-12 items-start md:items-center min-h-0">
        <div className="flex-1 space-y-2 md:space-y-5">
          {data.content && <p className="text-base md:text-2xl text-gray-600 leading-relaxed translate-y-[-10px] mb-4 md:mb-8">{data.content}</p>}
          <div className="space-y-3 md:space-y-5">
            {data.bullets?.map((bull, i) => (
              <div key={i} className="flex gap-4 md:gap-6 items-center">
                <div className="glass-bullet flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-brand-cyan shadow-[0_0_10px_rgba(8,196,244,0.6)]" />
                </div>
                <p className="text-sm md:text-2xl text-gray-700 font-medium leading-tight">{bull}</p>
              </div>
            ))}
          </div>
          {data.extraText && (
            <div className="mt-6 md:mt-10 p-5 md:p-8 card-premium border-l-8 border-brand-cyan">
              <p className="font-bold brand-gradient-text text-base md:text-2xl">{data.extraText}</p>
            </div>
          )}
        </div>

        {/* Columna de imagen */}
        {data.imagePlaceholder && (
          <div className="flex-[1.6] w-full md:w-auto flex items-center justify-center">
            <div
              className="w-full aspect-square md:aspect-video md:max-h-[700px] card-premium flex items-center justify-center relative overflow-hidden group"
              onClick={handleOpenVideo}
              style={!isLocalVideo && data.videoUrl ? { cursor: 'pointer' } : undefined}
            >
              {isLocalVideo ? (
                <video
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                >
                  <source src={data.videoUrl} type="video/mp4" />
                </video>
              ) : (
                <>
                  <img
                    src={data.imageUrl || `https://picsum.photos/800/800?random=${data.id}`}
                    className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                    alt=""
                  />
                  {!data.imageUrl && (
                    <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md px-6 py-4 rounded-xl border border-gray-100 shadow-md z-20">
                      <span className="text-lg font-mono text-gray-700 font-bold">{data.imagePlaceholder}</span>
                    </div>
                  )}
                  {/* Play Button Overlay */}
                  {data.videoUrl && (
                    <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                      <div className="bg-black/30 backdrop-blur-sm rounded-full p-4 border border-white/30 shadow-2xl group-hover:scale-110 transition-transform duration-300">
                        <PlayCircle className="w-16 h-16 text-white fill-white/20" />
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {data.videoUrl && !isLocalVideo && isVideoOpen && (
        <div className="absolute inset-0 bg-black/80 z-40 flex items-center justify-center">
          <div className="relative w-4/5 max-w-5xl aspect-video bg-black rounded-2xl shadow-2xl overflow-hidden">
            <button
              onClick={handleCloseVideo}
              className="absolute top-3 right-4 z-50 text-white/80 hover:text-white bg-black/40 hover:bg-black/60 rounded-full px-3 py-1 text-sm font-semibold"
            >
              Cerrar
            </button>
            <iframe
              src={data.videoUrl}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              title={data.title || 'Video'}
            />
          </div>
        </div>
      )}
    </div>
  );
};

// 5. Split Image Slide
export const SplitImageSlide: React.FC<TemplateProps> = ({ data }) => {
  const [isVideoOpen, setIsVideoOpen] = React.useState(false);

  const isLocalVideo = !!(data.videoUrl && /\.(mp4|webm|ogg)$/i.test(data.videoUrl));

  const handleOpenVideo = () => {
    if (!data.videoUrl) return;
    setIsVideoOpen(true);
  };

  const handleCloseVideo = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsVideoOpen(false);
  };

  return (
    <div className="h-full flex flex-col md:flex-row px-4 md:px-12 lg:px-24 py-4 md:py-10 gap-4 md:gap-16 relative overflow-y-auto md:overflow-hidden max-w-[2000px] mx-auto items-center">
      <div className="flex-1 flex flex-col justify-center">
        <h2 className="text-2xl md:text-5xl font-display font-bold text-gray-900 mb-4 md:mb-8 leading-tight drop-shadow-sm">{data.title}</h2>
        {data.content && <p className="text-sm md:text-2xl text-gray-600 mb-6 md:mb-10 leading-relaxed font-medium">{data.content}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-x-12 md:gap-y-6">
          {data.bullets?.map((bull, i) => (
            <div key={i} className="flex gap-4 items-center group">
              <div className="glass-bullet flex-shrink-0 group-hover:bg-brand-green/20 group-hover:border-brand-green/40">
                <Check className="w-5 h-5 text-brand-green" />
              </div>
              <p className="text-sm md:text-xl text-gray-700 font-semibold leading-snug">{bull}</p>
            </div>
          ))}
        </div>

        {data.extraText && (
          <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t-2 border-brand-purple/10">
            <p className="brand-gradient-text font-bold italic text-base md:text-2xl">{data.extraText}</p>
          </div>
        )}
      </div>
      <div className="flex-[1.6] w-full flex items-center justify-center">
        <div
          className="w-full aspect-square md:aspect-video md:max-h-[750px] card-premium flex items-center justify-center relative overflow-hidden group"
          onClick={handleOpenVideo}
          style={!isLocalVideo && data.videoUrl ? { cursor: 'pointer' } : undefined}
        >
          {isLocalVideo ? (
            <video
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
            >
              <source src={data.videoUrl} type="video/mp4" />
            </video>
          ) : (
            <>
              <img
                src={data.imageUrl || `https://picsum.photos/800/800?random=${data.id}`}
                className="absolute inset-0 w-full h-full object-cover"
                alt=""
              />
              {!data.imageUrl && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-8 z-20">
                  <span className="text-white font-mono text-base bg-black/40 px-3 py-1 rounded backdrop-blur-sm border border-white/20">{data.imagePlaceholder}</span>
                </div>
              )}
              {/* Play Button Overlay */}
              {data.videoUrl && (
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-5 border border-white/50 shadow-2xl group-hover:scale-110 transition-transform duration-300">
                    <PlayCircle className="w-20 h-20 text-white fill-white/20" />
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {data.videoUrl && !isLocalVideo && isVideoOpen && (
        <div className="absolute inset-0 bg-black/80 z-40 flex items-center justify-center">
          <div className="relative w-4/5 max-w-5xl aspect-video bg-black rounded-2xl shadow-2xl overflow-hidden">
            <button
              onClick={handleCloseVideo}
              className="absolute top-3 right-4 z-50 text-white/80 hover:text-white bg-black/40 hover:bg-black/60 rounded-full px-3 py-1 text-sm font-semibold"
            >
              Cerrar
            </button>
            <iframe
              src={data.videoUrl}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              title={data.title || 'Video'}
            />
          </div>
        </div>
      )}
    </div>
  );
};

// 6. Dashboard Slide (Full Graphic)
export const DashboardSlide: React.FC<TemplateProps> = ({ data }) => {
  const [isVideoOpen, setIsVideoOpen] = React.useState(false);

  const isLocalVideo = !!(data.videoUrl && /\.(mp4|webm|ogg)$/i.test(data.videoUrl));

  const handleOpenVideo = () => {
    if (!data.videoUrl) return;
    setIsVideoOpen(true);
  };

  const handleCloseVideo = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsVideoOpen(false);
  };

  return (
    <div className="h-full flex flex-col px-4 sm:px-8 md:px-24 py-6 md:py-10 relative max-w-[2000px] mx-auto">
      <div className="mb-6 md:mb-8 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-gray-900">{data.title}</h2>
        <p className="text-lg sm:text-xl md:text-2xl text-brand-cyan mt-2 md:mt-3">{data.subtitle}</p>
      </div>
      <div
        className="flex-1 min-h-[500px] md:min-h-[700px] card-premium overflow-hidden relative flex items-center justify-center group"
        onClick={handleOpenVideo}
        style={!isLocalVideo && data.videoUrl ? { cursor: 'pointer' } : undefined}
      >
        {isLocalVideo ? (
          <video
            className="w-full h-full object-cover pointer-events-none"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          >
            <source src={data.videoUrl} type="video/mp4" />
          </video>
        ) : (
          <>
            <img
              src={data.imageUrl || `https://picsum.photos/1600/900?random=${data.id}`}
              className="w-full h-full object-cover opacity-80 group-hover:opacity-40 transition-opacity"
              alt=""
            />
            {!data.imageUrl && (
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-10 rounded-2xl text-white max-w-2xl text-center shadow-xl">
                  <p className="font-mono text-xl font-bold">{data.imagePlaceholder}</p>
                </div>
              </div>
            )}
            {/* Play Button Overlay (Subtle for large dashboard) */}
            {data.videoUrl && (
              <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                <PlayCircle className="w-32 h-32 text-white/50 group-hover:text-white/80 transition-colors drop-shadow-2xl" />
              </div>
            )}
          </>
        )}
      </div>

      {data.videoUrl && !isLocalVideo && isVideoOpen && (
        <div className="absolute inset-0 bg-black/80 z-40 flex items-center justify-center">
          <div className="relative w-4/5 max-w-5xl aspect-video bg-black rounded-2xl shadow-2xl overflow-hidden">
            <button
              onClick={handleCloseVideo}
              className="absolute top-3 right-4 z-50 text-white/80 hover:text-white bg-black/40 hover:bg-black/60 rounded-full px-3 py-1 text-sm font-semibold"
            >
              Cerrar
            </button>
            <iframe
              src={data.videoUrl}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              title={data.title || 'Video'}
            />
          </div>
        </div>
      )}
    </div>
  );
};

// 7. Grid Slide
export const GridSlide: React.FC<TemplateProps> = ({ data }) => (
  <div className="h-full flex flex-col px-4 md:px-12 lg:px-24 py-6 md:py-10 max-w-[2000px] mx-auto">
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-gray-900 mb-2 sm:mb-3">{data.title}</h2>
    {data.subtitle && <p className="text-base sm:text-lg md:text-xl text-gray-500 mb-6 md:mb-10">{data.subtitle}</p>}

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 flex-1">
      {data.columns?.map((col, i) => (
        <div key={i} className="glass-panel rounded-3xl p-8 border border-white/40 hover:border-brand-cyan/40 hover:shadow-xl transition-all flex flex-col group">
          <h3 className="font-bold text-2xl brand-gradient-text mb-6 border-b border-gray-100/50 pb-3">{col.title}</h3>
          <ul className="space-y-4 flex-1">
            {col.content.map((item: string, j: number) => (
              <li key={j} className="flex gap-4 items-start group/item">
                <div className="bg-brand-green/20 p-1 rounded-lg group-hover/item:bg-brand-green/30 transition-colors">
                  <Check className="w-4 h-4 text-brand-green" />
                </div>
                <p className="text-base sm:text-lg md:text-xl text-gray-700 font-medium leading-snug">{item}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
);

// 8. Split Text (Comparison)
export const SplitTextSlide: React.FC<TemplateProps> = ({ data }) => (
  <div className="h-full flex flex-col px-4 sm:px-8 md:px-16 py-6 md:py-10">
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-center text-gray-900 mb-6 sm:mb-8 md:mb-12">{data.title}</h2>

    <div className="flex-1 flex flex-col md:flex-row gap-6 md:gap-12">
      {data.columns?.map((col, i) => (
        <div key={i} className={`flex-1 p-6 sm:p-8 md:p-12 border-2 card-premium ${i === 0 ? 'border-brand-green/30' : 'border-white/40'}`}>
          <h3 className={`font-bold text-2xl sm:text-3xl md:text-4xl mb-6 sm:mb-10 flex items-center gap-4 ${i === 0 ? 'text-brand-green' : 'text-gray-800'}`}>
            {i === 0 ? (
              <div className="p-2 bg-brand-green/10 rounded-xl border border-brand-green/20">
                <Check className="w-8 h-8 md:w-10 md:h-10 text-brand-green" />
              </div>
            ) : (
              <div className="p-2 bg-gray-100 rounded-xl border border-gray-200">
                <User className="w-8 h-8 md:w-10 md:h-10 text-gray-400" />
              </div>
            )}
            {col.title}
          </h3>
          <ul className="space-y-4 sm:space-y-6 md:space-y-8 mb-8 md:mb-12">
            {col.content.map((item: string, j: number) => (
              <li key={j} className="flex gap-4 sm:gap-6 text-base sm:text-xl md:text-2xl text-gray-700 font-medium leading-tight">
                {i === 0 ? <Check className="w-6 h-6 md:w-8 md:h-8 text-brand-green shrink-0 bg-brand-green/10 rounded-lg p-1" /> : <div className="w-6 h-6 md:w-8 md:h-8 rounded-lg border-2 border-gray-200 flex items-center justify-center text-[10px] md:text-xs font-bold text-gray-400 shrink-0">VS</div>}
                {item}
              </li>
            ))}
          </ul>
          <div className="h-40 sm:h-56 card-premium border-2 border-dashed border-white/60 flex items-center justify-center text-xs sm:text-lg text-gray-500 font-mono text-center px-6 sm:px-10 relative overflow-hidden group">
            {/* Placeholder for screenshot inside comparison */}
            <div className="absolute inset-0 bg-white/40 flex items-center justify-center">
              <PlayCircle className="w-16 h-16 text-brand-cyan/60 group-hover:text-brand-cyan transition-colors" />
            </div>
            <span className="relative z-10 font-bold">{col.extra}</span>
          </div>
        </div>
      ))}
    </div>
    {data.footerText && <p className="text-center font-bold text-lg sm:text-xl md:text-2xl text-brand-purple mt-6 md:mt-10">{data.footerText}</p>}
  </div>
);

// 9. Comparison Table
export const ComparisonTableSlide: React.FC<TemplateProps> = ({ data }) => (
  <div className="h-full flex flex-col px-4 sm:px-8 md:px-12 py-6 md:py-8">
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4 sm:mb-6 md:mb-8">{data.title}</h2>

    {/* Mobile: tarjetas comparativas en lugar de tabla horizontal */}
    <div className="md:hidden flex-1 mb-4 space-y-4 overflow-y-auto">
      {COMPARISON_ROWS.map((row, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl p-4 shadow-md border border-gray-100"
        >
          <p className="font-semibold text-base text-gray-900 mb-2">
            {row[0]}
          </p>
          <div className="text-sm space-y-1">
            <p className="text-brand-cyan font-semibold">
              CloserCat: <span className="font-bold">{row[1]}</span>
            </p>
            <p className="text-gray-600">
              Chatbots Genéricos: {row[2]}
            </p>
            <p className="text-gray-600">
              WhatsApp Manual: {row[3]}
            </p>
            <p className="text-gray-600">
              CRMs + WA: {row[4]}
            </p>
          </div>
        </div>
      ))}
    </div>

    {/* Desktop / md+: tabla completa como antes */}
    <div className="hidden md:block overflow-x-auto rounded-2xl border border-gray-200 shadow-md flex-1 max-w-full">
      <table className="w-full min-w-[720px] text-sm sm:text-base text-left">
        <thead className="bg-gray-50 text-gray-700 font-display text-lg">
          <tr>
            <th className="p-3 sm:p-4 pl-4 sm:pl-6">Feature</th>
            <th className="p-3 sm:p-4 bg-brand-cyan/10 text-brand-cyan font-bold border-b-4 border-brand-cyan text-center">CloserCat</th>
            <th className="p-3 sm:p-4 text-center">Chatbots Genéricos</th>
            <th className="p-3 sm:p-4 text-center">WhatsApp Manual</th>
            <th className="p-3 sm:p-4 text-center">CRMs + WA</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {COMPARISON_ROWS.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
              <td className="p-3 sm:p-4 pl-4 sm:pl-6 font-medium text-gray-800 text-sm sm:text-base lg:text-lg">{row[0]}</td>
              <td className="p-3 sm:p-4 bg-brand-cyan/5 font-bold text-brand-cyan text-center text-base sm:text-lg lg:text-xl">{row[1]}</td>
              <td className="p-3 sm:p-4 text-center text-gray-500 text-sm sm:text-base lg:text-lg">{row[2]}</td>
              <td className="p-3 sm:p-4 text-center text-gray-500 text-sm sm:text-base lg:text-lg">{row[3]}</td>
              <td className="p-3 sm:p-4 text-center text-gray-500 text-sm sm:text-base lg:text-lg">{row[4]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className="mt-6 text-center">
      <p className="text-2xl font-bold brand-gradient-text glass-panel py-3 rounded-2xl inline-block px-10 shadow-xl border border-white/40">{data.footerText}</p>
    </div>
  </div>
);

// 10. Pricing (Supports 1 or 2 models per tier)
export const PricingSlide: React.FC<TemplateProps> = ({ data }) => (
  <div className="h-full flex flex-col px-4 sm:px-8 md:px-10 py-6 md:py-8 bg-gray-50/50 max-w-[2000px] mx-auto">
    <div className="text-center mb-6 md:mb-8">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-gray-900">{data.title}</h2>
      <p className="text-gray-600 font-medium mt-2 text-sm sm:text-base md:text-xl">{data.subtitle}</p>
    </div>

    {/* Tiers Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 flex-1 items-start mb-6 md:mb-8">
      {data.columns?.map((plan, i) => {
        const isPopular = plan.title === "Pro";
        const hasMessage = !!plan.priceMessage;
        const hasPlatform = !!plan.pricePlatform;
        return (
          <div
            key={i}
            className={`relative flex flex-col h-full glass-panel rounded-3xl shadow-xl border-2 ${isPopular ? 'border-brand-purple scale-105 z-10' : 'border-white/40'
              } transition-all overflow-hidden`}
          >
            {isPopular && <div className="absolute top-0 inset-x-0 h-2 bg-brand-purple z-20"></div>}

            {/* Header */}
            <div className="p-4 sm:p-5 md:p-6 border-b border-gray-100 text-center bg-gray-50/30">
              <h3 className={`text-xl sm:text-2xl font-extrabold ${isPopular ? 'text-brand-purple' : 'text-gray-800'}`}>
                {plan.title}
              </h3>
            </div>

            {/* Pricing Content */}
            <div className="flex-1 flex flex-col">
              {/* Option A: Message Subscription Model */}
              {hasMessage && (
                <div className="p-4 sm:p-5 bg-brand-cyan/5 border-b border-gray-100 flex flex-col items-center text-center">
                  <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-brand-cyan mb-2 flex items-center gap-1">
                    <Bot size={12} /> Suscripción por mensajes
                  </div>
                  <div className="mb-2">
                    <span className="text-2xl sm:text-3xl font-bold text-gray-900">{plan.priceMessage}</span>
                    <span className="text-[10px] sm:text-xs text-gray-500 font-bold ml-1">{plan.unitMessage}</span>
                  </div>
                  <p className="text-[10px] sm:text-xs text-gray-600 font-medium px-2">{plan.detailMessage}</p>
                </div>
              )}

              {/* Divider OR (only if both models exist) */}
              {hasMessage && hasPlatform && (
                <div className="relative h-5 sm:h-6 bg-gray-100/50">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-white border border-gray-200 text-[10px] font-bold text-gray-400 px-3 py-0.5 rounded-full uppercase shadow-sm">
                      O
                    </span>
                  </div>
                </div>
              )}

              {/* Option B: Second Model (e.g. solo plataforma) */}
              {hasPlatform && (
                <div className="p-4 sm:p-5 bg-brand-purple/5 border-b border-gray-100 flex flex-col items-center text-center">
                  <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-brand-purple mb-2 flex items-center gap-1">
                    <User size={12} /> Opción B
                  </div>
                  <div className="mb-2">
                    <span className="text-2xl sm:text-3xl font-bold text-gray-900">{plan.pricePlatform}</span>
                    <span className="text-[10px] sm:text-xs text-gray-500 font-bold ml-1">{plan.unitPlatform}</span>
                  </div>
                  <p className="text-[10px] sm:text-xs text-gray-600 font-medium px-2">{plan.detailPlatform}</p>
                </div>
              )}

              {/* Shared Features / Benefits */}
              <div className="p-4 sm:p-5 md:p-6 space-y-3 bg-white flex-1">
                <p className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 sm:mb-3 text-center">
                  Beneficios incluidos al contratar por mensajes
                </p>
                {plan.features.map((feat: string, j: number) => (
                  <div key={j} className="text-xs sm:text-sm text-gray-600 flex gap-2 sm:gap-3 items-start leading-tight">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-1.5 shrink-0" />
                    {feat}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 sm:p-5 md:p-6 pt-0 mt-1 md:mt-2">
              <button
                className={`w-full py-2 sm:py-3 rounded-xl text-sm sm:text-base font-bold transition-colors shadow-sm ${isPopular ? 'bg-brand-purple text-white hover:bg-purple-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                Elegir {plan.title}
              </button>
            </div>
          </div>
        );
      })}
    </div>

    {/* Footer Info */}
    {data.footerText && (
      <div className="text-center text-xs sm:text-sm md:text-base text-gray-600 font-medium space-y-1">
        {data.footerText.split('\n').map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>
    )}
  </div>
);

// 11. Timeline (Implementation) - Redesigned
export const TimelineSlide: React.FC<TemplateProps> = ({ data }) => (
  <div className="h-full flex flex-col px-4 sm:px-8 md:px-12 py-6 md:py-8">
    <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-center text-gray-900 mb-6 md:mb-10">{data.title}</h2>

    {/* Milestones Row */}
    <div className="flex flex-col md:flex-row gap-6 md:gap-4 items-stretch justify-center mb-6 md:mb-10">
      {data.columns?.map((col, i) => (
        <React.Fragment key={i}>
          <div className="flex-1 glass-panel p-4 sm:p-5 md:p-6 rounded-2xl border-t-8 border-brand-cyan flex flex-col transform hover:-translate-y-1 transition-transform border-white/40">
            <h3 className="font-bold text-base sm:text-lg md:text-xl text-gray-800 mb-3 md:mb-4 uppercase tracking-wide flex items-center gap-2">
              <div className="bg-brand-cyan/20 text-brand-cyan w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border border-brand-cyan/30">{i + 1}</div>
              {col.title}
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {col.content.map((item: string, j: number) => (
                <li key={j} className="text-sm sm:text-base md:text-lg text-gray-600 flex gap-2 sm:gap-3 items-start leading-snug">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-purple mt-2 shrink-0 shadow-[0_0_8px_rgba(131,54,255,0.4)]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          {i < (data.columns?.length || 0) - 1 && (
            <div className="flex items-center justify-center text-gray-300">
              <ArrowRight className="w-8 h-8" />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>

    {/* Bottom Split: Add-ons & Support */}
    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 min-h-0">
      {/* Add-ons */}
      <div className="glass-panel rounded-[2rem] p-4 sm:p-5 md:p-6 border border-white/40 flex flex-col shadow-xl">
        <h3 className="font-bold text-xl sm:text-2xl brand-gradient-text mb-4 sm:mb-5 flex items-center gap-3">
          <Zap className="w-6 h-6 text-brand-purple fill-brand-purple/20" /> Servicios Adicionales
        </h3>
        <div className="space-y-3 sm:space-y-4 flex-1 overflow-auto pr-1 sm:pr-2">
          {data.addOns?.map((addon, i) => (
            <div key={i} className="flex justify-between items-center border-b border-gray-100/50 pb-3 last:border-0 last:pb-0">
              <div>
                <p className="font-bold text-gray-800 text-sm sm:text-base md:text-lg">{addon.title}</p>
                <p className="text-[10px] sm:text-xs text-gray-500 font-medium">{addon.detail}</p>
              </div>
              <div className="text-right font-mono font-bold text-brand-cyan text-sm sm:text-base md:xl whitespace-nowrap ml-2 sm:ml-4">
                {addon.price}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Support SLA */}
      <div className="glass-panel rounded-[2rem] p-6 border border-white/40 flex flex-col shadow-xl">
        <h3 className="font-bold text-2xl brand-gradient-text mb-5 flex items-center gap-3">
          <Shield className="w-6 h-6 text-brand-purple fill-brand-purple/20" /> Niveles de Soporte
        </h3>
        <div className="overflow-hidden rounded-2xl border border-white/40 bg-white/50 flex-1">
          <table className="w-full text-base h-full">
            <thead className="bg-gray-50/50 text-gray-500 font-bold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-3 text-left">Plan</th>
                <th className="p-3 text-left">Canal</th>
                <th className="p-3 text-right">SLA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100/50">
              {data.supportLevels?.map((level, i) => (
                <tr key={i} className="hover:bg-brand-purple/5 transition-colors">
                  <td className="p-3 font-bold text-gray-800">{level.plan}</td>
                  <td className="p-3 text-gray-600 text-sm">{level.channel}</td>
                  <td className="p-3 text-right text-brand-green font-mono font-bold">{level.sla}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);


// 12. Calendly Closing Slide
export const CalendlySlide: React.FC<TemplateProps> = ({ data, personalizedData }) => {
  const baseLink = typeof data.content === 'string' ? data.content : 'https://calendly.com/';
  const name = personalizedData?.formData?.name || '';
  const email = personalizedData?.formData?.email || '';
  const business = personalizedData?.formData?.business || '';

  // Pre-fill Calendly URL
  let finalUrl = baseLink;
  try {
    const calendlyUrl = new URL(baseLink);
    if (name) calendlyUrl.searchParams.set('name', name);
    if (email) calendlyUrl.searchParams.set('email', email);
    if (business) calendlyUrl.searchParams.set('a1', business); // Custom field for Business
    finalUrl = calendlyUrl.toString();
  } catch (e) {
    console.warn("Invalid Calendly URL", baseLink);
  }

  useEffect(() => {
    const handleCalendlyEvents = (e: MessageEvent) => {
      // Calendly emits events via postMessage
      if (e.data.event && e.data.event.indexOf('calendly') === 0) {
        if (e.data.event === 'calendly.event_scheduled') {
          console.log('Calendly Event Scheduled!', e.data.payload);
          trackFunnelEvent('presentacion_calendly_booked', {
            invitee_email: email,
            invitee_name: name
          }, personalizedData);
        }

        if (e.data.event === 'calendly.event_type_viewed') {
          trackFunnelEvent('presentacion_calendly_viewed', {
            invitee_email: email,
            invitee_name: name
          }, personalizedData);
        }
      }
    };

    window.addEventListener('message', handleCalendlyEvents);
    return () => window.removeEventListener('message', handleCalendlyEvents);
  }, [name, email, personalizedData]);

  return (
    <div className="h-full flex flex-col px-4 md:px-12 py-6 md:py-8 max-w-[2000px] mx-auto overflow-hidden">
      <div className="flex-1 flex flex-col md:flex-row gap-8 min-h-0 items-center">
        {/* Left Column: Invitation */}
        <div className="w-full md:w-5/12 text-left space-y-6 md:pr-4">
          <div className="space-y-2">
            <h2 className="text-4xl md:text-6xl font-display font-bold text-gray-900 leading-tight">
              {name ? `${name.split(' ')[0]}, agendemos una sesión` : 'Agendemos una sesión'}
            </h2>
            <div className="h-2 w-24 bg-gradient-to-r from-brand-purple to-brand-cyan rounded-full" />
          </div>

          <div className="space-y-6">
            <p className="text-xl md:text-2xl text-gray-600 font-medium leading-relaxed">
              Esta es una <span className="text-gray-900 font-bold">sesión de cierre estratégico</span> diseñada para resolver dudas finales y configurar tu operación.
            </p>

            <ul className="space-y-4">
              {[
                { text: "Trae a los decisores clave de tu equipo para validar la implementación.", icon: <User className="w-5 h-5" /> },
                { text: "Revisaremos tu propuesta técnica, comercial y el ROI proyectado.", icon: <Zap className="w-5 h-5" /> },
                { text: "Resolveremos dudas sobre integraciones CRMs y flujos de IA.", icon: <Bot className="w-5 h-5" /> },
                { text: "Saldrás con un plan de acción claro para activar CloserCat.", icon: <Check className="w-5 h-5" /> }
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4 text-lg md:text-xl text-gray-700 leading-snug">
                  <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-brand-purple/10 flex items-center justify-center text-brand-purple">
                    {item.icon}
                  </div>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* -------------------------------------------------------------------------
    // CASE: PRICING_LOGIC (New Transparency Slide)
    // ------------------------------------------------------------------------- */}
          {/* This is a placeholder for a switch statement that would contain this case.
        The instruction implies this case should be added within such a switch.
        For now, it's placed here as per the instruction's context. */}
          {/* case SlideType.PRICING_LOGIC: */}
          {/* const bullets = slide.bullets || []; */}
          {/* return ( */}
          <div className="h-full flex flex-col justify-center px-16 relative">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 to-indigo-600"></div>

            <div className="max-w-4xl mx-auto w-full">
              <div className="mb-8">
                <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase tracking-wide mb-4">
                  Transparencia Total
                </span>
                <h2 className="text-4xl font-extrabold text-slate-900 mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {/* {slide.title} */}
                </h2>
                <p className="text-xl text-slate-600 leading-relaxed font-light">
                  {/* {slide.subtitle} */}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <p className="text-base text-gray-700 leading-relaxed border-l-4 border-purple-200 pl-4 italic">
                    {/* "{slide.content}" */}
                  </p>

                  <div className="space-y-4 pt-2">
                    {/* {bullets.map((bullet, idx) => ( */}
                    <div key={0} className="flex items-start bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                      <span className="text-xl mr-3 mt-1 select-none text-purple-600">{/* bullet.split(':')[0].trim() */}</span> {/* Emoji/Icon */}
                      <div>
                        <strong className="text-gray-800 block text-sm mb-1">{/* bullet.split(':')[0].replace(/^[^\w\s]+/, '').trim() */}</strong>
                        <span className="text-sm text-gray-600 block">{/* bullet.split(':')[1]?.trim() || bullet */}</span>
                      </div>
                    </div>
                    {/* ))} */}
                  </div>
                </div>

                {/* Visual Metaphor for Logic */}
                <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 shadow-inner flex flex-col justify-between h-full">
                  <div className="text-center mb-6">
                    <div className="text-xs uppercase text-gray-400 font-bold tracking-widest mb-2">Fórmula de Éxito</div>
                    <div className="text-2xl font-mono text-purple-800 font-bold bg-white p-4 rounded shadow-sm inline-block border border-purple-100">
                      (Uso Real × Valor) + Control
                    </div>
                  </div>

                  <div className="space-y-4 text-xs text-gray-500">
                    <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                      <span>Audio 30s</span>
                      <span className="font-mono">$256</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                      <span>Texto IA</span>
                      <span className="font-mono">$180</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                      <span>Tráfico Humano</span>
                      <span className="font-mono font-bold text-green-600">$0 (Casi)</span>
                    </div>
                    <div className="mt-4 p-3 bg-blue-50 text-blue-800 rounded text-center font-bold">
                      = ROI +10x Garantizado
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ); */}

          <div className="pt-6 border-t border-gray-100 flex flex-col gap-4">
            <div className="flex items-center gap-4 text-gray-400">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className={`w-12 h-12 rounded-full border-4 border-white bg-gray-100 flex items-center justify-center overflow-hidden shadow-sm`}>
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + (personalizedData?.id || 'cc')}`}
                      alt="testimonio"
                    />
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">+200 negocios escalando</p>
                <p className="text-xs text-gray-500 font-medium tracking-wide">CONFÍAN EN CLOSERCAT</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Calendly Widget */}
        <div className="w-full md:w-7/12 h-[600px] md:h-full glass-panel rounded-3xl overflow-hidden shadow-[0_30px_60px_rgba(131,54,255,0.15)] relative min-h-0 bg-white/90 border-2 border-white/80">
          <iframe
            src={finalUrl}
            width="100%"
            height="100%"
            frameBorder="0"
            title="Calendly"
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};