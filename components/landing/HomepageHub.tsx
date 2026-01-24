import React, { useEffect } from 'react';
import SegmentCard from '../shared/SegmentCard';
import UseCaseCard from '../shared/UseCaseCard';
import Header from '../shared/Header';
import { clarityEvent } from '../../utils/tracking';

export default function HomepageHub() {
  useEffect(() => {
    clarityEvent('homepage_hub_view');
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header showNav={false} />

      {/* Hero Hub */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-poppins font-extrabold mb-4" style={{ color: '#121212' }}>
            WhatsApp profesional para tu negocio
          </h1>
          <p className="text-xl font-inter mb-12" style={{ color: '#4b5563' }}>
            Elige tu perfil para ver cómo CloserCat se adapta a tus necesidades:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tier 1: Emprendedor */}
            <SegmentCard
              segment="emprendedores"
              icon="🚀"
              title="Emprendedor / Microempresa"
              description="Marketplace gratis o línea propia con pago único"
              badge="Desde $0 - Sin mensualidad"
              badgeColor="blue"
            />

            {/* Tier 2: Formación (Featured) */}
            <SegmentCard
              segment="formacion"
              icon="🎓"
              title="Educación / Formación"
              description="Universidades, colegios, academias, workshops, cursos"
              badge="Integración Q10 disponible"
              badgeColor="green"
              featured={true}
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

      {/* Casos de Uso Disponibles */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-poppins font-bold text-center mb-4" style={{ color: '#121212' }}>
            Casos de uso disponibles
          </h2>
          
          <p className="text-center font-inter mb-12" style={{ color: '#4b5563' }}>
            Independiente de tu tier, puedes usar CloserCat para:
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <UseCaseCard
              icon="🛒"
              title="Ecommerce"
              description="Catálogo de productos, consultas de precios, gestión de inventario y pedidos por WhatsApp."
              features={[
                'Catálogo automatizado',
                'Consulta de stock',
                'Procesamiento de pedidos'
              ]}
            />
            
            <UseCaseCard
              icon="🤝"
              title="Prospección"
              description="Calificación automática de leads, seguimiento comercial y cierre de ventas B2B."
              features={[
                'Calificación de leads',
                'Seguimiento automático',
                'Cotizaciones rápidas'
              ]}
            />
            
            <UseCaseCard
              icon="💬"
              title="Soporte"
              description="Atención al cliente 24/7, resolución de FAQs y gestión de tickets de soporte."
              features={[
                'FAQs automatizadas',
                'Gestión de tickets',
                'Escalamiento a humanos'
              ]}
            />
          </div>
          
          <div className="mt-12 text-center">
            <p className="font-inter text-sm" style={{ color: '#6b7280' }}>
              💡 <strong>Combina casos de uso:</strong> Usa Ecommerce + Soporte, o Prospección + Soporte según tus necesidades
            </p>
          </div>
        </div>
      </section>

      {/* ¿Por qué CloserCat? */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-poppins font-bold mb-6" style={{ color: '#121212' }}>
            La plataforma de WhatsApp Business con IA más completa de LATAM
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            <div>
              <div className="text-4xl mb-3">🤖</div>
              <h3 className="font-poppins font-semibold mb-2" style={{ color: '#121212' }}>IA que entiende tu negocio</h3>
              <p className="text-sm font-inter" style={{ color: '#6b7280' }}>
                GPT-4 + Knowledge Base personalizada para respuestas precisas
              </p>
            </div>
            
            <div>
              <div className="text-4xl mb-3">🔄</div>
              <h3 className="font-poppins font-semibold mb-2" style={{ color: '#121212' }}>Integraciones nativas</h3>
              <p className="text-sm font-inter" style={{ color: '#6b7280' }}>
                Q10, HubSpot, Salesforce, o cualquier CRM vía webhooks
              </p>
            </div>
            
            <div>
              <div className="text-4xl mb-3">🛡️</div>
              <h3 className="font-poppins font-semibold mb-2" style={{ color: '#121212' }}>Control humano total</h3>
              <p className="text-sm font-inter" style={{ color: '#6b7280' }}>
                Guardrails bloquean respuestas inapropiadas automáticamente
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-sm font-inter mb-6" style={{ color: '#6b7280' }}>Empresas que confían en CloserCat</p>
          
          <div className="grid grid-cols-3 gap-8 mt-12">
            <div>
              <div className="text-4xl font-mono font-bold" style={{ color: '#8336FF' }}>500K+</div>
              <div className="text-sm font-inter" style={{ color: '#6b7280' }}>Mensajes procesados</div>
            </div>
            <div>
              <div className="text-4xl font-mono font-bold" style={{ color: '#08C4F4' }}>&lt;3 seg</div>
              <div className="text-sm font-inter" style={{ color: '#6b7280' }}>Tiempo de respuesta</div>
            </div>
            <div>
              <div className="text-4xl font-mono font-bold" style={{ color: '#8336FF' }}>78%</div>
              <div className="text-sm font-inter" style={{ color: '#6b7280' }}>Conversaciones automatizadas</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
