import React, { useEffect } from 'react';
import SegmentCard from '../shared/SegmentCard';
import BrandMessagingCarousel from '../shared/BrandMessagingCarousel';
import { clarityEvent } from '../../utils/tracking';

export default function HomepageHub() {
  useEffect(() => {
    clarityEvent('homepage_hub_view');
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header Logo Area */}
      <div className="pt-12 pb-6 flex justify-center bg-white">
        <img
          src="/logo-closercat.png"
          alt="CloserCat Pro"
          className="h-28 w-auto md:h-36"
        />
      </div>

      {/* Hero: Brand Messaging Carousel (Dynamic Educational Content) */}
      <BrandMessagingCarousel />

      {/* Segment Selection */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xl font-inter mb-12" style={{ color: '#4b5563' }}>
            Tu negocio no es igual al de todos. Elige tu perfil para ver tu solución a medida:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20">
            {/* Profesionales Independientes */}
            <SegmentCard
              segment="profesionales-independientes"
              icon="💼"
              title="Profesional Independiente"
              description="Respaldo automático de WhatsApp, CRM personal y protección anti-bloqueo."
              badge="Desde $19K COP/mes"
              badgeColor="blue"
            />

            {/* Tier 1: Emprendedor (FEATURED) */}
            <SegmentCard
              segment="emprendedores"
              icon="🚀"
              title="Empresas y Equipos Comerciales"
              description="Centraliza los WhatsApps personales de tu equipo comercial en un solo dashboard."
              badge="Cotización a medida"
              badgeColor="blue"
              featured={true}
            />
          </div>

          {/* Trust Section: Founders */}
          <div className="border-t border-gray-100 pt-16 pb-8">
            <h2 className="text-2xl font-poppins font-bold text-gray-900 mb-4">
              Tecnología con Propósito: Liderazgo que entiende el problema
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto mb-12">
              No somos solo desarrolladores. Somos empresarios que sufrimos el caos de WhatsApp y construimos la solución que el mercado necesitaba.
            </p>

            <div className="flex flex-col md:flex-row justify-center items-start gap-12 max-w-3xl mx-auto text-left">
              {/* Victoria Carvajal */}
              <a
                href="https://www.linkedin.com/in/victoriiacarvajal/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 hover:bg-gray-50 p-4 rounded-xl transition-colors flex-1"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center border-2 border-transparent group-hover:border-purple-400 transition-all shrink-0">
                  <span className="text-2xl">👩‍💻</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors">Victoria Carvajal</h3>
                  <p className="text-xs uppercase font-bold tracking-wider text-purple-600 mb-2">Visionaria & CEO</p>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Liderazgo estratégico y visión de impacto. La infraestructura que da soporte empresarial a nuestra innovación.
                  </p>
                </div>
              </a>

              {/* Rogert Ovalle */}
              <a
                href="https://www.linkedin.com/in/rogertovalle"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 hover:bg-gray-50 p-4 rounded-xl transition-colors flex-1"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center border-2 border-transparent group-hover:border-blue-400 transition-all shrink-0">
                  <span className="text-2xl">👨‍💻</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">Rogert Ovalle</h3>
                  <p className="text-xs uppercase font-bold tracking-wider text-blue-600 mb-2">AI Product Manager</p>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Ejecución técnica y validación de producto. El puente entre los agentes de IA y tu mercado.
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* Resources Section (Updated to Hub) */}
          <div className="border-t border-gray-100 pt-16 pb-8">
            <h2 className="text-2xl font-poppins font-bold text-gray-900 mb-8">
              CloserCat Research
            </h2>

            <a href="/recursos" className="group block max-w-2xl mx-auto bg-purple-50 hover:bg-white border text-left border-purple-100 hover:border-brand-purple-closer rounded-xl p-8 transition-all shadow-sm hover:shadow-md relative overflow-hidden">
              <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
                <div className="bg-white text-brand-purple-closer border border-purple-100 p-4 rounded-full text-3xl group-hover:scale-110 transition-transform shrink-0 shadow-sm">
                  🔬
                </div>
                <div className="text-center md:text-left">
                  <div className="text-xs uppercase tracking-wider font-bold text-brand-purple-closer mb-2">
                    Librería de Estrategia
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-brand-purple-closer transition-colors mb-2">
                    Las 7 Fallas Estructurales
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    ¿Sabes por qué tu WhatsApp vende menos de lo que debería? Diagnostica tu operación contra los 7 errores más comunes.
                  </p>
                  <div className="inline-flex items-center gap-2 text-sm font-bold text-brand-purple-closer bg-white border border-purple-100 px-4 py-2 rounded-lg group-hover:bg-purple-50 transition-colors shadow-sm">
                    Explorar el Hub de Investigación <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </div>

              {/* Decorative Background */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-200/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
            </a>
          </div>

          {/* Footer Origin Message */}
          <div className="mt-12 pt-8 text-sm text-gray-400 font-inter">
            Hecho con amor desde Colombia 🇨🇴
          </div>
        </div>
      </section>
    </div>
  );
}
