import React, { useEffect, useState } from 'react';
import Badge from '../shared/Badge';
import Header from '../shared/Header';
import { clarityEvent } from '../../utils/tracking';
import { SegmentType } from '../../types';

interface LandingPlaceholderProps {
  segment: SegmentType;
}

const SEGMENT_CONFIG = {
  ecommerce: {
    icon: '🛒',
    title: 'Ecommerce',
    description: 'Catálogo de productos, pagos automáticos y seguimiento de pedidos',
    features: [
      'Catálogo de productos con imágenes y precios',
      'Procesamiento de pagos vía WhatsApp',
      'Seguimiento automático de pedidos',
      'Notificaciones de envío y entrega',
      'Recuperación de carritos abandonados',
    ],
  },
  b2b: {
    icon: '🤝',
    title: 'B2B / Prospección',
    description: 'Calificación de leads, seguimiento de oportunidades y CRM integrado',
    features: [
      'Calificación automática de leads (BANT)',
      'Seguimiento de pipeline de ventas',
      'Integración con CRMs empresariales',
      'Reportes de actividad de ventas',
      'Secuencias de follow-up automatizadas',
    ],
  },
  soporte: {
    icon: '💬',
    title: 'Soporte al Cliente',
    description: 'Tickets automáticos, FAQs y escalamiento inteligente',
    features: [
      'Sistema de tickets automático',
      'Base de conocimiento con FAQs',
      'Escalamiento inteligente a agentes',
      'SLA y tiempos de respuesta',
      'Satisfacción del cliente (CSAT)',
    ],
  },
};

export default function LandingPlaceholder({ segment }: LandingPlaceholderProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const config = SEGMENT_CONFIG[segment as keyof typeof SEGMENT_CONFIG];

  useEffect(() => {
    clarityEvent(`landing_placeholder_${segment}_view`);
  }, [segment]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      clarityEvent(`form_submit_placeholder_${segment}`);

      const payload = {
        event: 'waitlist_submit',
        created_at: new Date().toISOString(),
        segment,
        name,
        email,
        company,
      };

      const webhookUrl = (window as any).VITE_MAKE_WEBHOOK_URL;
      if (webhookUrl) {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      setSubmitted(true);
    } catch (error) {
      console.error('Waitlist submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!config) {
    window.location.href = '/';
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header showNav={false} ctaText="Unirme a lista de espera" />
      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Badge color="gray" icon={config.icon}>
            Próximamente
          </Badge>
          
          <h1 className="text-5xl font-poppins font-extrabold leading-tight mb-4 mt-4" style={{ color: '#121212' }}>
            CloserCat para {config.title}
          </h1>
          
          <p className="text-xl font-inter mb-8" style={{ color: '#4b5563' }}>
            {config.description}
          </p>

          <div className="inline-block px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg text-sm" style={{ color: '#1e40af' }}>
            🚀 Lanzamiento estimado: Q2 2026
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-poppins font-extrabold text-center mb-12" style={{ color: '#121212' }}>
            Qué estará disponible
          </h2>
          
          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            <ul className="space-y-4">
              {config.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-blue-500 font-bold text-xl">✓</span>
                  <span style={{ color: '#4b5563' }}>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Waitlist Form */}
      <section className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-poppins font-extrabold mb-4" style={{ color: '#121212' }}>
              Únete a la lista de espera
            </h2>
            <p className="text-lg font-inter" style={{ color: '#6b7280' }}>
              Sé de los primeros en acceder cuando lancemos
            </p>
          </div>

          {submitted ? (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-2xl font-bold mb-2" style={{ color: '#111827' }}>
                ¡Gracias por registrarte!
              </h3>
              <p style={{ color: '#6b7280' }}>
                Te notificaremos por email cuando CloserCat para {config.title} esté disponible.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold mb-2">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Juan Pérez"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="juan@empresa.com"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-semibold mb-2">
                    Empresa
                  </label>
                  <input
                    type="text"
                    id="company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Mi Empresa S.A."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {isSubmitting ? 'Enviando...' : 'Notifícame cuando esté disponible'}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* CTA Alternativo */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-extrabold mb-4" style={{ color: '#111827' }}>
            ¿No puedes esperar?
          </h2>
          <p className="text-lg mb-8" style={{ color: '#6b7280' }}>
            Aplica a nuestro programa de pilotos y trabajamos contigo para crear una solución personalizada
          </p>
          <a
            href="/?segment=otras-industrias"
            className="inline-block px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-all"
            style={{ textDecoration: 'none' }}
          >
            Aplicar al programa de pilotos
          </a>
        </div>
      </section>
    </div>
  );
}
