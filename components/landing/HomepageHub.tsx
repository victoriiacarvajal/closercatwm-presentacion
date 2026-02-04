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
            Elige tu perfil para ver cómo CloserCat adapta WhatsApp a tus necesidades:
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
              Nacimos buscando bienestar financiero
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto mb-12">
              Entendimos que no hay bienestar sin generación de ingresos. CloserCat es nuestra respuesta tecnológica para automatizar el crecimiento de tu empresa.
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

            <a href="/recursos" className="group block max-w-2xl mx-auto bg-gray-50 hover:bg-white border text-left border-gray-200 hover:border-amber-400 rounded-xl p-8 transition-all shadow-sm hover:shadow-md relative overflow-hidden">
              <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
                <div className="bg-amber-100 text-amber-700 p-4 rounded-full text-3xl group-hover:scale-110 transition-transform shrink-0">
                  🔬
                </div>
                <div className="text-center md:text-left">
                  <div className="text-xs uppercase tracking-wider font-bold text-amber-600 mb-2">
                    Librería de Estrategia
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-amber-700 transition-colors mb-2">
                    Las 7 Fallas Estructurales
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    ¿Sabes por qué tu WhatsApp vende menos de lo que debería? Diagnostica tu operación contra los 7 errores más comunes.
                  </p>
                  <div className="inline-flex items-center gap-2 text-sm font-bold text-amber-700 bg-amber-50 px-4 py-2 rounded-lg group-hover:bg-amber-100 transition-colors">
                    Explorar el Hub de Investigación <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </div>

              {/* Decorative Background */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
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
