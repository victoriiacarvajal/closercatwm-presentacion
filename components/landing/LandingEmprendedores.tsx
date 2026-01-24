import React, { useEffect } from 'react';
import Badge from '../shared/Badge';
import CTAButton from '../shared/CTAButton';
import ValuePropCard from '../shared/ValuePropCard';
import PricingCard from '../shared/PricingCard';
import UseCaseCard from '../shared/UseCaseCard';
import ConversationSimulator from '../shared/ConversationSimulator';
import FormSection from '../shared/FormSection';
import Header from '../shared/Header';
import FlowDiagram from '../shared/FlowDiagram';
import { clarityEvent } from '../../utils/tracking';

export default function LandingEmprendedores() {
  useEffect(() => {
    clarityEvent('landing_emprendedores_view');
  }, []);

  const scrollToForm = () => {
    document.getElementById('agenda')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header showNav={false} ctaText="Empezar gratis" />
      {/* Hero Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge color="blue" icon="🚀">
                Para Emprendedores y Microempresas
              </Badge>
              
              <h1 className="text-5xl font-poppins font-extrabold leading-tight mb-4 mt-4" style={{ color: '#121212' }}>
                Empieza gratis en la Red CloserCat o activa tu línea propia
              </h1>
              
              <p className="text-xl font-inter mb-6" style={{ color: '#4b5563' }}>
                Dos opciones para emprendedores: Marketplace gratuito o línea WhatsApp Business propia con pago único.
              </p>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-2.5 w-2.5 rounded-full" style={{ backgroundColor: '#08C4F4' }} />
                  <div className="font-inter" style={{ color: '#121212' }}>
                    <strong>Número WhatsApp Business separado</strong> para tu negocio
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-2.5 w-2.5 rounded-full" style={{ backgroundColor: '#08C4F4' }} />
                  <div className="font-inter" style={{ color: '#121212' }}>
                    <strong>IA responde consultas básicas</strong> (precios, horarios, disponibilidad)
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-2.5 w-2.5 rounded-full" style={{ backgroundColor: '#08C4F4' }} />
                  <div className="font-inter" style={{ color: '#121212' }}>
                    <strong>Inbox organizado</strong> por conversación y etiquetas
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-2.5 w-2.5 rounded-full" style={{ backgroundColor: '#08C4F4' }} />
                  <div className="font-inter" style={{ color: '#121212' }}>
                    <strong>Plantillas de respuesta rápida</strong> para consultas frecuentes
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <CTAButton
                  variant="primary"
                  onClick={scrollToForm}
                  tracking="cta_signup_emprendedores"
                >
                  Empezar gratis por 14 días
                </CTAButton>
              </div>
              
              <div className="mt-3 text-xs font-inter" style={{ color: '#6b7280' }}>
                Sin tarjeta de crédito · Cancela cuando quieras
              </div>
            </div>
            
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 shadow-sm overflow-hidden">
              <img 
                src="/closercat-imagen-celular.png" 
                alt="CloserCat en móvil" 
                className="w-full h-auto rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-poppins font-extrabold mb-4" style={{ color: '#121212' }}>
              El problema que vives hoy
            </h2>
            <p className="text-xl font-inter" style={{ color: '#4b5563' }}>
              Mezclas clientes con familia en el mismo WhatsApp
            </p>
          </div>
          
          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-red-500 font-bold text-xl">❌</span>
                <div>
                  <strong style={{ color: '#111827' }}>Mensajes perdidos:</strong>
                  <span style={{ color: '#6b7280' }}> Un cliente te escribe mientras estás en una conversación familiar y se pierde entre 50 mensajes</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 font-bold text-xl">❌</span>
                <div>
                  <strong style={{ color: '#111827' }}>Respondes tarde:</strong>
                  <span style={{ color: '#6b7280' }}> Estás ocupado y no puedes responder al instante. El cliente se va con la competencia</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 font-bold text-xl">❌</span>
                <div>
                  <strong style={{ color: '#111827' }}>Sin historial organizado:</strong>
                  <span style={{ color: '#6b7280' }}> No recuerdas qué prometiste a cada cliente ni cuándo fue la última vez que hablaron</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 font-bold text-xl">❌</span>
                <div>
                  <strong style={{ color: '#111827' }}>Trabajas 24/7:</strong>
                  <span style={{ color: '#6b7280' }}> Los clientes te escriben a cualquier hora y sientes que nunca puedes desconectarte</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-extrabold text-center mb-16" style={{ color: '#111827' }}>
            Cómo CloserCat soluciona esto
          </h2>
          
          <div className="space-y-12">
            <ValuePropCard
              icon="📱"
              title="Número profesional separado"
              feature="Te damos un número WhatsApp Business exclusivo para tu negocio, completamente separado de tu WhatsApp personal."
              capability="Puedes mantener tu vida personal privada mientras atiendes a clientes de forma profesional."
              benefit="<strong>100% de separación</strong> entre trabajo y vida personal. Tus clientes ven un perfil profesional con horarios de atención."
              imagePosition="right"
            />
            
            <ValuePropCard
              icon="🤖"
              title="IA responde mientras duermes"
              feature="Configuras respuestas automáticas para preguntas frecuentes: precios, horarios, disponibilidad, formas de pago."
              capability="La IA responde automáticamente consultas básicas 24/7, incluso cuando estás ocupado o fuera de horario."
              benefit="<strong>Nunca pierdes un cliente</strong> por responder tarde. La IA mantiene la conversación caliente hasta que puedas atender."
              imagePosition="left"
            />
            
            <ValuePropCard
              icon="📊"
              title="Inbox organizado y profesional"
              feature="Todas tus conversaciones en un solo lugar, organizadas por etiquetas (nuevo, interesado, cliente, cerrado)."
              capability="Puedes ver el historial completo de cada cliente, qué prometiste, y hacer seguimiento sin perder información."
              benefit="<strong>Cierras 30% más ventas</strong> porque haces seguimiento oportuno y nunca olvidas un lead."
              imagePosition="right"
            />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-poppins font-extrabold mb-4" style={{ color: '#121212' }}>
              Elige tu plan
            </h2>
            <p className="text-xl font-inter" style={{ color: '#4b5563' }}>
              Sin contratos anuales ni costos ocultos
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">
            <PricingCard
              title="Red CloserCat"
              price="$0"
              period="/mes"
              description="Gratis para siempre"
              badge="Plan Gratuito"
              badgeColor="green"
              features={[
                '210 mensajes IA/mes incluidos',
                'Número compartido de CloserCat',
                'Código de referencia único',
                'Notificaciones de leads calificados',
                'Dashboard básico',
                'Apareces en directorio CloserCat',
                'Pago por consumo adicional'
              ]}
              ctaText="Empezar gratis"
              ctaAction={scrollToForm}
            />
            
            <PricingCard
              title="Plan Lite"
              price="$450K"
              period="pago único"
              description="Luego pago por consumo"
              badge="Más Popular"
              badgeColor="purple"
              featured={true}
              features={[
                'Tu propia línea WhatsApp Business',
                'Número nuevo exclusivo',
                'Knowledge Base (200 productos/servicios)',
                'Inbox centralizado',
                'Contact Enrichment básico',
                'Pago por consumo on-demand',
                'Soporte email (<48h)'
              ]}
              ctaText="Activar línea propia"
              ctaAction={scrollToForm}
            />
            
            <PricingCard
              title="Plan BYOW"
              price="$1.2M"
              period="migración"
              description="Luego pago por consumo"
              badge="Bring Your Own WhatsApp"
              badgeColor="blue"
              features={[
                'Migración completa de WhatsApp Business',
                'Conservas tu número y contactos',
                'Enriquecimiento de contactos (conversaciones)',
                'Knowledge Base (200 productos/servicios)',
                'Campañas masivas disponibles',
                'Pago por consumo on-demand',
                'Soporte prioritario (<24h)'
              ]}
              ctaText="Migrar mi WhatsApp"
              ctaAction={scrollToForm}
            />
          </div>
          
          <div className="mt-12 text-center space-y-4">
            <p className="font-inter text-sm" style={{ color: '#6b7280' }}>
              💡 <strong>¿Cuál elegir?</strong> Gratuito si empiezas. Lite si quieres línea nueva. BYOW si ya tienes WhatsApp Business con contactos.
            </p>
            <p className="font-inter text-sm" style={{ color: '#121212' }}>
              <strong>Modelo de pago:</strong> Todos los planes funcionan con pago por consumo. Usa la calculadora abajo para estimar tu costo mensual.
            </p>
          </div>
        </div>
      </section>
      
      {/* Simulador de Conversación */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-poppins font-bold mb-4" style={{ color: '#121212' }}>
              Simula y cotiza tu inversión
            </h2>
            <p className="text-xl font-inter" style={{ color: '#4b5563' }}>
              Construye una conversación real y descubre cuánto te costaría automatizarla con IA
            </p>
          </div>
          
          <ConversationSimulator />
          
          <div className="mt-8 text-center">
            <p className="font-inter text-sm" style={{ color: '#6b7280' }}>
              💡 Modelo de pago por consumo: solo pagas por lo que usas. Los paquetes no expiran hasta la fecha indicada.
            </p>
          </div>
        </div>
      </section>
      
      {/* Casos de Uso */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-poppins font-bold text-center mb-4" style={{ color: '#121212' }}>
            Elige tu caso de uso
          </h2>
          
          <p className="text-center font-inter mb-12" style={{ color: '#4b5563' }}>
            Tanto en el plan gratuito como en Lite, puedes usar:
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <UseCaseCard
              icon="🛒"
              title="Ecommerce"
              description="Vende productos por WhatsApp con catálogo automatizado"
              features={[
                'Catálogo de productos',
                'Consulta de precios',
                'Gestión de pedidos'
              ]}
            />
            
            <UseCaseCard
              icon="🤝"
              title="Prospección"
              description="Califica leads y cierra ventas de servicios profesionales"
              features={[
                'Calificación de leads',
                'Seguimiento automático',
                'Cotizaciones rápidas'
              ]}
            />
            
            <UseCaseCard
              icon="💬"
              title="Soporte"
              description="Atiende clientes 24/7 con FAQs automatizadas"
              features={[
                'FAQs automatizadas',
                'Gestión de tickets',
                'Escalamiento a humanos'
              ]}
            />
          </div>
        </div>
      </section>
      
      {/* Cómo funciona el Marketplace */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-poppins font-bold text-center mb-4" style={{ color: '#121212' }}>
            Cómo funciona la Red CloserCat (Plan Gratuito)
          </h2>
          
          <p className="text-center font-inter mb-12" style={{ color: '#4b5563' }}>
            Un número compartido que conecta clientes con tu negocio
          </p>
          
          <FlowDiagram
            steps={[
              {
                number: 1,
                title: 'Cliente busca tu servicio',
                description: 'Envía mensaje al número de CloserCat o usa tu código de referencia'
              },
              {
                number: 2,
                title: 'IA responde por ti',
                description: 'Usando tu Knowledge Base, responde preguntas sobre precios, servicios, disponibilidad'
              },
              {
                number: 3,
                title: 'Lead calificado detectado',
                description: 'Cuando el cliente muestra interés real, recibes notificación en tu WhatsApp personal'
              },
              {
                number: 4,
                title: 'Tú cierras la venta',
                description: 'Aceptas el lead y recibes el número del cliente para contactarlo directamente'
              }
            ]}
          />
          
          <div className="mt-12 p-6 bg-white rounded-xl border-2 border-blue-200 max-w-3xl mx-auto">
            <p className="text-center font-inter" style={{ color: '#121212' }}>
              <strong>🔒 Privacidad protegida:</strong> No compartimos el número del cliente hasta que tú aceptes el lead.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-extrabold text-center mb-12" style={{ color: '#111827' }}>
            Cómo funciona
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { num: '1', title: 'Regístrate', desc: 'Crea tu cuenta en 2 minutos sin tarjeta de crédito' },
              { num: '2', title: 'Conecta WhatsApp', desc: 'Te damos un número nuevo o migramos tu número actual' },
              { num: '3', title: 'Configura IA', desc: 'Defines respuestas automáticas para preguntas frecuentes' },
            ].map((step) => (
              <div key={step.num} className="text-center">
                <div className="w-12 h-12 rounded-full bg-blue-600 text-white font-bold text-xl flex items-center justify-center mx-auto mb-4">
                  {step.num}
                </div>
                <h3 className="font-bold mb-2" style={{ color: '#111827' }}>{step.title}</h3>
                <p className="text-sm" style={{ color: '#6b7280' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <FormSection 
        segment="emprendedores"
        title="Empieza gratis por 14 días"
        subtitle="Sin tarjeta de crédito · Cancela cuando quieras"
        ctaText="Empezar ahora"
      />

      {/* FAQs */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-extrabold text-center mb-12" style={{ color: '#111827' }}>
            Preguntas frecuentes
          </h2>
          
          <div className="space-y-6">
            {[
              {
                q: '¿Necesito un número nuevo o puedo usar mi número actual?',
                a: 'Puedes elegir: te damos un número nuevo gratis, o migramos tu número actual a WhatsApp Business API (sin perder contactos ni historial).',
              },
              {
                q: '¿Qué pasa después de los 14 días gratis?',
                a: 'Si decides continuar, se cobra automáticamente $49/mes. Si no te convence, cancelas antes y no pagas nada. Sin contratos ni penalizaciones.',
              },
              {
                q: '¿La IA puede responder cualquier pregunta?',
                a: 'La IA responde preguntas que tú configures (precios, horarios, disponibilidad). Para preguntas complejas, te notifica para que respondas tú personalmente.',
              },
              {
                q: '¿Puedo usar esto desde mi celular?',
                a: 'Sí. Tienes acceso web (desde cualquier navegador) y app móvil para iOS y Android. Puedes responder desde donde estés.',
              },
              {
                q: '¿Qué pasa si supero las 500 conversaciones?',
                a: 'Te avisamos cuando llegues a 400. Si superas 500, puedes actualizar al plan siguiente ($99/mes con 2,000 conversaciones) o pagar $0.10 por conversación extra.',
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
