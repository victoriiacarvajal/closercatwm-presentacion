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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Profesionales Independientes */}
            <SegmentCard
              segment="profesionales-independientes"
              icon="💼"
              title="Profesional Independiente"
              description="Respaldo automático de WhatsApp, CRM personal y protección anti-bloqueo."
              badge="Desde $19K/mes"
              badgeColor="blue"
            />

            {/* Tier 1: Emprendedor (FEATURED) */}
            <SegmentCard
              segment="emprendedores"
              icon="🚀"
              title="Emprendedor / Microempresa"
              description="Centraliza los WhatsApps personales de tu equipo comercial en un solo dashboard."
              badge="Desde $0 - Sin mensualidad"
              badgeColor="blue"
              featured={true}
            />

            {/* Tier 2: Formación */}
            <SegmentCard
              segment="formacion"
              icon="🎓"
              title="Educación / Formación"
              description="Automatización de WhatsApp integrada nativamente con Q10 para matrículas y soporte."
              badge="Integración Q10 disponible"
              badgeColor="green"
            />

            {/* Tier 3: Pilotos */}
            <SegmentCard
              segment="otras-industrias"
              icon="🏢"
              title="Otra Industria"
              description="Implementa WhatsApp Business API con un piloto de riesgo compartido a resultados."
              badge="Paga por resultados"
              badgeColor="purple"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
