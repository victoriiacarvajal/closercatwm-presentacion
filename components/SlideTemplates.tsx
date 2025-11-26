import React from 'react';
import { SlideData } from '../types';
import { Check, User, Bot, ArrowRight, Zap, Shield, PlayCircle } from 'lucide-react';

interface TemplateProps {
  data: SlideData;
  partnerLogoUrl?: string;
}

// 1. Cover Slide
export const CoverSlide: React.FC<TemplateProps> = ({ data, partnerLogoUrl }) => {
  const [isVideoOpen, setIsVideoOpen] = React.useState(false);
  const [showPartnerLogo, setShowPartnerLogo] = React.useState(true);

  const isLocalVideo = !!(data.videoUrl && data.videoUrl.startsWith('/') && /\.(mp4|webm|ogg)$/i.test(data.videoUrl));

  const handleOpenVideo = () => {
    if (!data.videoUrl || isLocalVideo) return;
    setIsVideoOpen(true);
  };

  const handleCloseVideo = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsVideoOpen(false);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center text-center px-4 sm:px-8 md:px-16 relative">
      <div className="mb-6 sm:mb-8 flex flex-col items-center gap-3">
        <div className="flex items-center justify-center gap-3 sm:gap-4">
          <img
            src="/logo-closercat.png"
            alt="CloserCat Logo"
            className="h-16 sm:h-20 md:h-24 mx-auto object-contain drop-shadow-xl"
          />
          {partnerLogoUrl && showPartnerLogo && (
            <>
              <span className="text-xs sm:text-sm text-gray-300 font-medium">x</span>
              <img
                src={partnerLogoUrl}
                alt="Partner Logo"
                className="h-10 sm:h-12 mx-auto object-contain"
                onError={() => setShowPartnerLogo(false)}
              />
            </>
          )}
        </div>
      </div>
      <h2 className="text-2xl sm:text-3xl text-brand-cyan font-medium mb-10 sm:mb-16 max-w-4xl">{data.subtitle}</h2>
      
      <div 
        className="w-full max-w-4xl aspect-video bg-gray-100 rounded-xl border-2 border-gray-200 flex items-center justify-center relative overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500 group"
        onClick={handleOpenVideo}
        style={!isLocalVideo && data.videoUrl ? { cursor: 'pointer' } : undefined}
      >
          {isLocalVideo ? (
            <video
              src={data.videoUrl}
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              loop
              muted
              controls
            />
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
      <div className="mt-16 text-gray-400 font-bold tracking-widest uppercase text-base"></div>

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
  <div className="h-full flex flex-col justify-center px-4 sm:px-10 md:px-24">
    <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold text-gray-900 mb-8 sm:mb-12 md:mb-16 border-l-[8px] md:border-l-[12px] border-brand-purple pl-4 sm:pl-8 md:pl-10">{data.title}</h2>
    <div className="space-y-5 sm:space-y-6 md:space-y-8">
      {data.bullets?.map((item, i) => (
        <div key={i} className="flex items-center gap-4 sm:gap-6 md:gap-8 group">
            <span className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-gray-200 group-hover:text-brand-cyan transition-colors">
                {(i + 1).toString().padStart(2, '0')}
            </span>
            <div className="text-xl sm:text-2xl md:text-3xl font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                {item.substring(3)} {/* Remove number from string since we render it separately */}
            </div>
        </div>
      ))}
    </div>
  </div>
);

// 3. Transition Slide
export const TransitionSlide: React.FC<TemplateProps> = ({ data }) => (
  <div className="h-full flex flex-col items-center justify-center bg-gray-900 text-white relative overflow-hidden px-4 sm:px-8">
     <div className="absolute inset-0 bg-gradient-to-br from-brand-purple to-brand-cyan opacity-20"></div>
    <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-4 sm:mb-6 md:mb-8 text-center z-10 px-2 sm:px-6 md:px-12 leading-tight max-w-6xl">{data.title}</h1>
    {data.subtitle && <h2 className="text-xl sm:text-2xl md:text-4xl font-light text-brand-cyan z-10 text-center max-w-4xl">{data.subtitle}</h2>}
  </div>
);

// 4. Standard Slide (Title + Bullets/Content)
export const StandardSlide: React.FC<TemplateProps> = ({ data }) => {
  const [isVideoOpen, setIsVideoOpen] = React.useState(false);

  const isLocalVideo = !!(data.videoUrl && data.videoUrl.startsWith('/') && /\.(mp4|webm|ogg)$/i.test(data.videoUrl));

  const handleOpenVideo = () => {
    if (!data.videoUrl) return;
    setIsVideoOpen(true);
  };

  const handleCloseVideo = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsVideoOpen(false);
  };

  return (
    <div className="h-full flex flex-col px-4 sm:px-8 md:px-20 py-6 md:py-12 relative">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-gray-900 mb-3 md:mb-4">{data.title}</h2>
      {data.subtitle && <h3 className="text-lg sm:text-xl md:text-2xl text-brand-purple font-medium mb-6 md:mb-12">{data.subtitle}</h3>}
      
      <div className="flex-1 flex flex-col md:flex-row gap-6 md:gap-16 items-start md:items-center">
          <div className="flex-1 space-y-5 sm:space-y-6 md:space-y-8">
              {data.content && <p className="text-base sm:text-lg md:text-2xl text-gray-600 leading-relaxed mb-4 md:mb-8">{data.content}</p>}
              {data.bullets?.map((bull, i) => (
                  <div key={i} className="flex gap-3 sm:gap-4">
                      <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-brand-cyan mt-2.5 sm:mt-3.5 flex-shrink-0" />
                      <p className="text-base sm:text-lg md:text-2xl text-gray-700 leading-snug">{bull}</p>
                  </div>
              ))}
               {data.extraText && (
                  <div className="mt-6 md:mt-10 p-4 sm:p-6 md:p-8 bg-brand-cyan/10 border-l-4 md:border-l-8 border-brand-cyan rounded-r-xl">
                      <p className="font-bold text-brand-cyan text-base sm:text-lg md:text-xl">{data.extraText}</p>
                  </div>
              )}
          </div>
          
          {/* Updated Image Column: Now flex-1 (50% width) to match SplitImageSlide proportions */}
          {data.imagePlaceholder && (
               <div className="flex-1 self-stretch flex items-center justify-center pl-0 md:pl-6 mt-6 md:mt-0">
                   <div 
                      className="w-full bg-gray-100 rounded-2xl flex items-center justify-center text-center p-4 sm:p-6 relative overflow-hidden border border-gray-200 shadow-2xl aspect-square transform hover:scale-[1.01] transition-transform group"
                      onClick={handleOpenVideo}
                      style={!isLocalVideo && data.videoUrl ? { cursor: 'pointer' } : undefined}
                   >
                       {isLocalVideo ? (
                          <video
                            src={data.videoUrl}
                            className="absolute inset-0 w-full h-full object-cover"
                            autoPlay
                            loop
                            muted
                            controls
                          />
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

  const isLocalVideo = !!(data.videoUrl && data.videoUrl.startsWith('/') && /\.(mp4|webm|ogg)$/i.test(data.videoUrl));

  const handleOpenVideo = () => {
    if (!data.videoUrl) return;
    setIsVideoOpen(true);
  };

  const handleCloseVideo = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsVideoOpen(false);
  };

  return (
    <div className="h-full flex flex-col md:flex-row px-4 sm:px-8 md:px-20 py-6 md:py-12 gap-6 md:gap-16 relative">
        <div className="flex-1 flex flex-col justify-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4 sm:mb-6 md:mb-8 leading-tight">{data.title}</h2>
            {data.content && <p className="text-base sm:text-lg md:text-2xl text-gray-600 mb-6 sm:mb-8 md:mb-10 leading-relaxed">{data.content}</p>}
            
            <div className="space-y-4 sm:space-y-5 md:space-y-6">
                 {data.bullets?.map((bull, i) => (
                    <div key={i} className="flex gap-4 items-start">
                        <Check className="w-5 h-5 sm:w-6 sm:h-6 text-brand-green mt-1 flex-shrink-0" />
                        <p className="text-base sm:text-lg md:text-xl text-gray-700 font-medium leading-snug">{bull}</p>
                    </div>
                ))}
            </div>

            {data.extraText && (
                 <div className="mt-6 md:mt-12 pt-4 md:pt-8 border-t border-gray-200">
                    <p className="text-brand-purple font-semibold italic text-base sm:text-lg md:text-xl">{data.extraText}</p>
                </div>
            )}
        </div>
        <div className="flex-1 h-full flex items-center justify-center p-4 sm:p-6 mt-6 md:mt-0">
             <div 
                className="w-full aspect-square bg-white rounded-3xl shadow-2xl border border-gray-100 flex items-center justify-center relative overflow-hidden transform hover:scale-[1.02] transition-transform group"
                onClick={handleOpenVideo}
                style={!isLocalVideo && data.videoUrl ? { cursor: 'pointer' } : undefined}
             >
                {isLocalVideo ? (
                  <video
                    src={data.videoUrl}
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    controls
                  />
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
                              <PlayCircle className="w-20 h-20 textwhite fill-white/20" />
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

  const isLocalVideo = !!(data.videoUrl && data.videoUrl.startsWith('/') && /\.(mp4|webm|ogg)$/i.test(data.videoUrl));

  const handleOpenVideo = () => {
    if (!data.videoUrl) return;
    setIsVideoOpen(true);
  };

  const handleCloseVideo = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsVideoOpen(false);
  };

  return (
    <div className="h-full flex flex-col px-4 sm:px-8 md:px-16 py-6 md:py-10 relative">
      <div className="mb-6 md:mb-8 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-gray-900">{data.title}</h2>
        <p className="text-lg sm:text-xl md:text-2xl text-brand-cyan mt-2 md:mt-3">{data.subtitle}</p>
      </div>
      <div
        className="flex-1 bg-gray-900 rounded-2xl shadow-2xl overflow-hidden relative border-4 border-gray-800 flex items-center justify-center group"
        onClick={handleOpenVideo}
        style={!isLocalVideo && data.videoUrl ? { cursor: 'pointer' } : undefined}
      >
        {isLocalVideo ? (
          <video
            src={data.videoUrl}
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            controls
          />
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
  <div className="h-full flex flex-col px-4 sm:px-8 md:px-16 py-6 md:py-10">
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-gray-900 mb-2 sm:mb-3">{data.title}</h2>
    {data.subtitle && <p className="text-base sm:text-lg md:text-xl text-gray-500 mb-6 md:mb-10">{data.subtitle}</p>}
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 flex-1">
      {data.columns?.map((col, i) => (
        <div key={i} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:border-brand-cyan/50 transition-colors flex flex-col">
          <h3 className="font-bold text-2xl text-brand-purple mb-6 border-b border-gray-100 pb-3">{col.title}</h3>
          <ul className="space-y-4 flex-1">
            {col.content.map((item: string, j: number) => (
              <li key={j} className="flex gap-4 items-start">
                <Check className="w-5 h-5 sm:w-6 sm:h-6 text-brand-green mt-1 flex-shrink-0" />
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
        <div key={i} className={`flex-1 rounded-3xl p-6 sm:p-8 md:p-10 border-2 shadow-sm ${i === 0 ? 'bg-brand-green/5 border-brand-green/30' : 'bg-gray-50 border-gray-200'}`}>
          <h3 className="font-bold text-xl sm:text-2xl md:text-3xl mb-4 sm:mb-6 md:mb-8 flex items-center gap-3">
            {col.title}
          </h3>
          <ul className="space-y-4 sm:space-y-5 md:space-y-6 mb-6 md:mb-10">
            {col.content.map((item: string, j: number) => (
              <li key={j} className="flex gap-3 sm:gap-4 text-base sm:text-lg md:text-xl text-gray-700 leading-snug">
                {i === 0 ? <Check className="w-6 h-6 text-brand-green shrink-0" /> : <div className="w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center text-xs text-gray-500 shrink-0">M</div>}
                {item}
              </li>
            ))}
          </ul>
          <div className="h-32 sm:h-40 bg-white rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center text-xs sm:text-sm text-gray-400 font-mono text-center px-4 sm:px-6 relative overflow-hidden group">
            {/* Placeholder for screenshot inside comparison */}
            <div className="absolute inset-0 bg-gray-50 flex items-center justify-center">
              <PlayCircle className="w-10 h-10 text-gray-300 group-hover:text-brand-cyan transition-colors" />
            </div>
            <span className="relative z-10">{col.extra}</span>
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
    
    <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-md flex-1 max-w-full">
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
          {[
            ["IA entrenada con TUS datos conversacionales", "✅", "⚠️ FAQs genéricas / scripts", "N/A", "❌"],
            ["Modo IA asistida + modo manual en la misma conversación", "✅", "❌ Auto 100%", "✅ Manual sin IA", "⚠️ Limitado"],
            ["Guardrails + escalación a humano ante riesgo", "✅", "❌", "✅ Sin automatización", "⚠️ Básico"],
            ["Escucha en ráfaga y comprensión multimodal", "✅", "⚠️ Solo texto", "✅ Humano", "⚠️ Limitado"],
            ["Pipeline conversacional: estados y seguimientos", "✅", "❌", "❌", "⚠️ Pipeline no conversacional"],
            ["Datos conversacionales estructurados para el negocio", "✅", "❌", "❌", "⚠️ Datos sueltos"],
            ["Segmentación y campañas por comportamiento conversacional", "✅", "❌", "❌", "⚠️ Segmentación solo CRM"],
            ["Dashboard de campañas y métricas en tiempo real", "✅", "❌", "❌", "✅ No enfocado en WhatsApp"],
            ["Integraciones abiertas sobre datos conversacionales", "✅", "⚠️ Limitadas", "❌", "✅ No conversacional-first"],
          ].map((row, i) => (
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
      <p className="text-2xl font-bold text-brand-purple bg-brand-purple/5 py-3 rounded-xl inline-block px-10 shadow-sm border border-brand-purple/10">{data.footerText}</p>
    </div>
  </div>
);

// 10. Pricing (Supports 1 or 2 models per tier)
export const PricingSlide: React.FC<TemplateProps> = ({ data }) => (
  <div className="h-full flex flex-col px-4 sm:px-8 md:px-10 py-6 md:py-8 bg-gray-50/50">
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
            className={`relative flex flex-col h-full bg-white rounded-2xl shadow-lg border-2 ${
              isPopular ? 'border-brand-purple scale-105 z-10 shadow-2xl' : 'border-transparent shadow-md'
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
                className={`w-full py-2 sm:py-3 rounded-xl text-sm sm:text-base font-bold transition-colors shadow-sm ${
                  isPopular ? 'bg-brand-purple text-white hover:bg-purple-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
                    <div className="flex-1 bg-white p-4 sm:p-5 md:p-6 rounded-xl shadow-md border-t-8 border-brand-cyan flex flex-col transform hover:-translate-y-1 transition-transform">
                        <h3 className="font-bold text-base sm:text-lg md:text-xl text-gray-800 mb-3 md:mb-4 uppercase tracking-wide flex items-center gap-2">
                            <div className="bg-brand-cyan/10 text-brand-cyan w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border border-brand-cyan/20">{i+1}</div>
                            {col.title}
                        </h3>
                        <ul className="space-y-2 sm:space-y-3">
                             {col.content.map((item: string, j: number) => (
                                <li key={j} className="text-sm sm:text-base md:text-lg text-gray-600 flex gap-2 sm:gap-3 items-start leading-snug">
                                    <div className="w-1.5 h-1.5 rounded-full bg-brand-purple mt-2 shrink-0" />
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
            <div className="bg-gray-50 rounded-2xl p-4 sm:p-5 md:p-6 border border-gray-200 flex flex-col">
                <h3 className="font-bold text-xl sm:text-2xl text-brand-purple mb-4 sm:mb-5 flex items-center gap-3">
                    <Zap className="w-6 h-6 fill-current" /> Servicios Adicionales
                </h3>
                <div className="space-y-3 sm:space-y-4 flex-1 overflow-auto pr-1 sm:pr-2">
                    {data.addOns?.map((addon, i) => (
                        <div key={i} className="flex justify-between items-center border-b border-gray-200 pb-3 last:border-0 last:pb-0">
                            <div>
                                <p className="font-bold text-gray-800 text-sm sm:text-base md:text-lg">{addon.title}</p>
                                <p className="text-xs sm:text-sm text-gray-500 font-medium">{addon.detail}</p>
                            </div>
                            <div className="text-right font-mono font-bold text-brand-cyan text-sm sm:text-base md:text-xl whitespace-nowrap ml-2 sm:ml-4">
                                {addon.price}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Support SLA */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 flex flex-col">
                <h3 className="font-bold text-2xl text-brand-purple mb-5 flex items-center gap-3">
                    <Shield className="w-6 h-6 fill-current" /> Niveles de Soporte
                </h3>
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white flex-1">
                    <table className="w-full text-base h-full">
                        <thead className="bg-gray-100 text-gray-600 font-bold uppercase text-xs tracking-wider">
                            <tr>
                                <th className="p-3 text-left">Plan</th>
                                <th className="p-3 text-left">Canal</th>
                                <th className="p-3 text-right">SLA</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {data.supportLevels?.map((level, i) => (
                                <tr key={i} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-3 font-bold text-gray-800">{level.plan}</td>
                                    <td className="p-3 text-gray-600">{level.channel}</td>
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