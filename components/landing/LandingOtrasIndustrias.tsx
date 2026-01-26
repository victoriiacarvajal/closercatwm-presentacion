import React, { useEffect } from 'react';
import Badge from '../shared/Badge';
import PricingCard from '../shared/PricingCard';
import UseCaseCard from '../shared/UseCaseCard';
import ValuePropCard from '../shared/ValuePropCard';
import FormSection from '../shared/FormSection';
import Header from '../shared/Header';
import { clarityEvent } from '../../utils/tracking';

export default function LandingOtrasIndustrias() {
  useEffect(() => {
    clarityEvent('landing_otras_industrias_view');
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header showNav={false} ctaText="Aplicar al programa" />
      {/* Hero Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Badge color="purple" icon="🏢">
            Piloto Personalizado
          </Badge>

          <h1 className="text-5xl font-poppins font-extrabold leading-tight mb-4 mt-4" style={{ color: '#121212' }}>
            Piloto a resultados: Paga solo si funciona
          </h1>

          <p className="text-xl font-inter mb-8" style={{ color: '#4b5563' }}>
            ¿Tu industria no está en nuestra lista? Piloto de 60 días con 2 opciones de pricing y conversión a suscripción si cumples KPIs.
          </p>

          <div className="bg-purple-50 border border-purple-200 rounded-2xl p-8 text-left max-w-2xl mx-auto">
            <h3 className="font-poppins font-bold mb-4" style={{ color: '#121212' }}>
              ✨ Cómo funciona el programa de pilotos
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="font-bold text-purple-600">1.</span>
                <div>
                  <strong style={{ color: '#111827' }}>Llamada de discovery (30 min):</strong>
                  <span style={{ color: '#6b7280' }}> Entendemos tu proceso actual y pain points específicos</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-purple-600">2.</span>
                <div>
                  <strong style={{ color: '#111827' }}>Propuesta de KPIs:</strong>
                  <span style={{ color: '#6b7280' }}> Definimos métricas de éxito juntos (ej: reducir tiempo de respuesta 70%, aumentar conversión 30%)</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-purple-600">3.</span>
                <div>
                  <strong style={{ color: '#111827' }}>Piloto de 60 días:</strong>
                  <span style={{ color: '#6b7280' }}> Implementamos y medimos contra KPIs acordados</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-purple-600">4.</span>
                <div>
                  <strong style={{ color: '#111827' }}>Pago por resultados:</strong>
                  <span style={{ color: '#6b7280' }}> Solo pagas si cumplimos los KPIs acordados</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Industries Piloteadas */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-poppins font-extrabold mb-4" style={{ color: '#121212' }}>
              Industrias que hemos piloteado
            </h2>
            <p className="text-xl font-inter" style={{ color: '#4b5563' }}>
              Ejemplos de pilotos exitosos en diferentes sectores
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: '🏥',
                title: 'Salud',
                desc: 'Agendamiento de citas, recordatorios automáticos, confirmaciones',
                result: 'Reducción 65% en no-shows',
              },
              {
                icon: '🏠',
                title: 'Real Estate',
                desc: 'Calificación de leads, tours virtuales, seguimiento automatizado',
                result: 'Aumento 40% en conversión',
              },
              {
                icon: '💼',
                title: 'Consultoría',
                desc: 'Coordinación de propuestas, seguimiento de proyectos, facturación',
                result: 'Ahorro 20 horas/semana',
              },
              {
                icon: '🚗',
                title: 'Automotriz',
                desc: 'Cotizaciones automáticas, agendamiento de test drive, seguimiento',
                result: 'Aumento 35% en test drives',
              },
            ].map((industry, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="text-4xl mb-3">{industry.icon}</div>
                <h3 className="font-bold mb-2" style={{ color: '#111827' }}>{industry.title}</h3>
                <p className="text-sm mb-4" style={{ color: '#6b7280' }}>{industry.desc}</p>
                <div className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                  {industry.result}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Opciones de Pricing del Piloto */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-poppins font-bold text-center mb-4" style={{ color: '#121212' }}>
            Elige tu modelo de piloto
          </h2>

          <p className="text-center font-inter mb-12" style={{ color: '#4b5563' }}>
            Discovery gratuito (2-3 horas) + 60 días de piloto
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <PricingCard
              title="Pago Fijo Reducido"
              price="$2.000.000"
              description="50% del costo real + garantía"
              badge="Opción 1"
              badgeColor="blue"
              features={[
                'Piloto de 60 días',
                '10,000 mensajes incluidos',
                'Reembolso 100% si no cumple KPIs',
                'Discovery gratuito (2-3 horas)',
                'Soporte prioritario durante piloto'
              ]}
            />

            <PricingCard
              title="100% Pago por Resultados"
              price="$0"
              description="Paga solo si cumple KPIs"
              badge="Opción 2"
              badgeColor="purple"
              featured={true}
              features={[
                'Piloto de 60 días',
                'Sin costo inicial',
                '$4.000.000 solo si cumple KPIs',
                'Discovery gratuito (2-3 horas)',
                'Soporte prioritario durante piloto'
              ]}
            />
          </div>
        </div>
      </section>

      {/* Post-Piloto */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-poppins font-bold text-center mb-8" style={{ color: '#121212' }}>
            Después del piloto exitoso
          </h2>

          <p className="text-center font-inter mb-12" style={{ color: '#4b5563' }}>
            Si cumples tus KPIs, puedes elegir entre 3 modelos de suscripción:
          </p>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border-2 border-gray-200">
              <h3 className="font-poppins font-bold mb-2" style={{ color: '#121212' }}>1. Suscripción Estándar</h3>
              <p className="font-inter mb-2" style={{ color: '#4b5563' }}>Mensualidad fija según plan (Growth, Pro, Enterprise)</p>
              <p className="text-sm font-inter" style={{ color: '#6b7280' }}>Ideal para: Volumen predecible</p>
            </div>

            <div className="bg-white p-6 rounded-xl border-2 border-gray-200">
              <h3 className="font-poppins font-bold mb-2" style={{ color: '#121212' }}>2. Modelo Híbrido</h3>
              <p className="font-inter mb-2" style={{ color: '#4b5563' }}>50% mensualidad + 10% de performance fee</p>
              <p className="text-sm font-inter" style={{ color: '#6b7280' }}>Ideal para: Compartir riesgo y upside</p>
            </div>

            <div className="bg-white p-6 rounded-xl border-2 border-gray-200">
              <h3 className="font-poppins font-bold mb-2" style={{ color: '#121212' }}>3. Solo Resultados</h3>
              <p className="font-inter mb-2" style={{ color: '#4b5563' }}>$0 base + 20% de performance fee (mínimo $2M/mes)</p>
              <p className="text-sm font-inter" style={{ color: '#6b7280' }}>Ideal para: Máxima alineación de incentivos</p>
            </div>
          </div>

          <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-sm font-inter" style={{ color: '#121212' }}>
              <strong>⚠️ Importante:</strong> Integraciones custom y configuraciones especiales se cobran aparte en todos los modelos.
            </p>
          </div>
        </div>
      </section>

      {/* Why Pilot */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-extrabold text-center mb-12" style={{ color: '#111827' }}>
            ¿Por qué ofrecemos pilotos a resultados?
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-bold mb-3" style={{ color: '#111827' }}>
                🎯 Para ti
              </h3>
              <ul className="space-y-2 text-sm" style={{ color: '#6b7280' }}>
                <li>• <strong>Cero riesgo:</strong> Solo pagas si funciona</li>
                <li>• <strong>Solución personalizada:</strong> Adaptada a tu industria específica</li>
                <li>• <strong>Validación rápida:</strong> Sabes en 60 días si vale la pena</li>
                <li>• <strong>KPIs claros:</strong> Métricas medibles desde el día 1</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-bold mb-3" style={{ color: '#111827' }}>
                🚀 Para nosotros
              </h3>
              <ul className="space-y-2 text-sm" style={{ color: '#6b7280' }}>
                <li>• <strong>Aprendemos:</strong> Entendemos nuevas industrias</li>
                <li>• <strong>Innovamos:</strong> Creamos soluciones únicas</li>
                <li>• <strong>Expandimos:</strong> Validamos nuevos mercados</li>
                <li>• <strong>Ganamos juntos:</strong> Solo cobramos si generas valor</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section con campos extendidos */}
      <FormSection
        segment="otras-industrias"
        title="Aplica al programa de pilotos"
        subtitle="Completa el formulario y te contactaremos en 24 horas para agendar la llamada de discovery"
        showExtendedFields={true}
        ctaText="Aplicar al programa"
      />

      {/* Casos de Uso Disponibles (Moved from Hub) */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-poppins font-bold text-center mb-4" style={{ color: '#121212' }}>
            Explora casos de uso para tu piloto
          </h2>

          <p className="text-center font-inter mb-12" style={{ color: '#4b5563' }}>
            Podemos adaptar cualquiera de estos flujos a tu industria:
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
        </div>
      </section>

      {/* Why CloserCat (Moved from Hub) */}
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

      {/* Social Proof (Moved from Hub) */}
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

      {/* What Happens Next */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-extrabold text-center mb-12" style={{ color: '#111827' }}>
            Qué pasa después de aplicar
          </h2>

          <div className="space-y-6">
            {[
              {
                step: '24 horas',
                title: 'Revisión de aplicación',
                desc: 'Nuestro equipo revisa tu aplicación y valida que tu caso de uso sea viable para un piloto.',
              },
              {
                step: '2-3 días',
                title: 'Llamada de discovery',
                desc: 'Agendamos una llamada de 30 minutos para entender tu proceso actual, pain points, y definir KPIs.',
              },
              {
                step: '1 semana',
                title: 'Propuesta personalizada',
                desc: 'Te enviamos una propuesta con KPIs específicos, timeline, y condiciones del piloto.',
              },
              {
                step: '60 días',
                title: 'Ejecución del piloto',
                desc: 'Implementamos, medimos, y optimizamos. Al final evaluamos si cumplimos los KPIs.',
              },
            ].map((phase, index) => (
              <div key={index} className="flex gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-full bg-purple-100 text-purple-700 font-bold flex items-center justify-center text-sm text-center">
                    {phase.step}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold mb-2" style={{ color: '#111827' }}>{phase.title}</h3>
                  <p className="text-sm" style={{ color: '#6b7280' }}>{phase.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-extrabold text-center mb-12" style={{ color: '#111827' }}>
            Preguntas frecuentes
          </h2>

          <div className="space-y-6">
            {[
              {
                q: '¿Qué industrias NO son viables para un piloto?',
                a: 'Industrias altamente reguladas donde no podemos garantizar compliance (ej: banca, seguros) o casos de uso con volumen muy bajo (<50 consultas/mes) donde es difícil medir impacto.',
              },
              {
                q: '¿Cuánto cuesta si el piloto es exitoso?',
                a: 'Depende de la complejidad y volumen. Típicamente entre $299-$999/mes. Lo definimos juntos en la propuesta antes de empezar el piloto.',
              },
              {
                q: '¿Qué pasa si NO cumplimos los KPIs?',
                a: 'No pagas nada. Literalmente cero. Asumimos el riesgo completo de la implementación.',
              },
              {
                q: '¿Puedo cancelar el piloto antes de los 60 días?',
                a: 'Sí, sin penalización. Si ves que no va a funcionar, puedes cancelar en cualquier momento.',
              },
              {
                q: '¿Necesito equipo técnico para implementar?',
                a: 'No. Nosotros manejamos toda la implementación técnica. Solo necesitas tiempo para la llamada de discovery y feedback durante el piloto.',
              },
            ].map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-6">
                <h3 className="font-bold mb-2" style={{ color: '#111827' }}>{faq.q}</h3>
                <p className="text-sm" style={{ color: '#6b7280' }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
