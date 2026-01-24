import React, { useEffect } from 'react';
import SegmentCard from '../shared/SegmentCard';
import { clarityEvent } from '../../utils/tracking';

export default function HomepageHub() {
  useEffect(() => {
    clarityEvent('homepage_hub_view');
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Hub */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold mb-4" style={{ color: '#111827' }}>
            WhatsApp profesional para tu negocio
          </h1>
          <p className="text-xl mb-12" style={{ color: '#4b5563' }}>
            Elige tu perfil para ver cómo CloserCat se adapta a tus necesidades:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tier 1: Básico */}
            <SegmentCard
              segment="emprendedores"
              icon="🚀"
              title="Emprendedor / Microempresa"
              description="1-5 personas, WhatsApp personal"
              badge="Desde $49/mes"
              badgeColor="blue"
            />

            {/* Tier 2: Educación (Featured) */}
            <SegmentCard
              segment="educacion"
              icon="🎓"
              title="Institución Educativa"
              description="Integración nativa con Q10 CRM"
              badge="Integración completa"
              badgeColor="green"
              featured={true}
            />

            {/* Tier 2: Ecommerce */}
            <SegmentCard
              segment="ecommerce"
              icon="🛒"
              title="Ecommerce"
              description="Catálogo de productos + pagos"
              badge="Próximamente"
              badgeColor="gray"
            />

            {/* Tier 2: B2B */}
            <SegmentCard
              segment="b2b"
              icon="🤝"
              title="B2B / Prospección"
              description="Calificación de leads"
              badge="Próximamente"
              badgeColor="gray"
            />

            {/* Tier 2: Soporte */}
            <SegmentCard
              segment="soporte"
              icon="💬"
              title="Soporte al Cliente"
              description="Tickets y FAQs automáticos"
              badge="Próximamente"
              badgeColor="gray"
            />

            {/* Tier 3: Pilotos */}
            <SegmentCard
              segment="otras-industrias"
              icon="🏢"
              title="Otra Industria"
              description="Piloto personalizado a resultados"
              badge="Paga por resultados"
              badgeColor="purple"
            />
          </div>
        </div>
      </section>

      {/* ¿Por qué CloserCat? */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6" style={{ color: '#111827' }}>
            La plataforma de WhatsApp Business con IA más completa de LATAM
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            <div>
              <div className="text-4xl mb-3">🤖</div>
              <h3 className="font-semibold mb-2" style={{ color: '#111827' }}>IA que entiende tu negocio</h3>
              <p className="text-sm" style={{ color: '#6b7280' }}>
                GPT-4 + Knowledge Base personalizada para respuestas precisas
              </p>
            </div>
            
            <div>
              <div className="text-4xl mb-3">🔄</div>
              <h3 className="font-semibold mb-2" style={{ color: '#111827' }}>Integraciones nativas</h3>
              <p className="text-sm" style={{ color: '#6b7280' }}>
                Q10, HubSpot, Salesforce, o cualquier CRM vía webhooks
              </p>
            </div>
            
            <div>
              <div className="text-4xl mb-3">🛡️</div>
              <h3 className="font-semibold mb-2" style={{ color: '#111827' }}>Control humano total</h3>
              <p className="text-sm" style={{ color: '#6b7280' }}>
                Guardrails bloquean respuestas inapropiadas automáticamente
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-sm mb-6" style={{ color: '#6b7280' }}>Empresas que confían en CloserCat</p>
          
          <div className="grid grid-cols-3 gap-8 mt-12">
            <div>
              <div className="text-3xl font-bold" style={{ color: '#111827' }}>500K+</div>
              <div className="text-sm" style={{ color: '#6b7280' }}>Mensajes procesados</div>
            </div>
            <div>
              <div className="text-3xl font-bold" style={{ color: '#111827' }}>&lt;3 seg</div>
              <div className="text-sm" style={{ color: '#6b7280' }}>Tiempo de respuesta</div>
            </div>
            <div>
              <div className="text-3xl font-bold" style={{ color: '#111827' }}>78%</div>
              <div className="text-sm" style={{ color: '#6b7280' }}>Conversaciones automatizadas</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
