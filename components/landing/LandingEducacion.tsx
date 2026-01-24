import React, { useEffect } from 'react';
import Badge from '../shared/Badge';
import CTAButton from '../shared/CTAButton';
import ValuePropCard from '../shared/ValuePropCard';
import FormSection from '../shared/FormSection';
import Header from '../shared/Header';
import { clarityEvent } from '../../utils/tracking';

export default function LandingEducacion() {
  useEffect(() => {
    clarityEvent('landing_educacion_view');
  }, []);

  const scrollToForm = () => {
    document.getElementById('agenda')?.scrollIntoView({ behavior: 'smooth' });
  };

  const valueProps = [
    {
      icon: '🤖',
      title: 'Responde automáticamente con IA (GPT-4)',
      feature: 'IA consulta automáticamente tu Knowledge Base (programas académicos, precios, requisitos de admisión, becas disponibles) para generar respuestas precisas en lenguaje natural.',
      capability: 'Puedes automatizar respuestas a consultas repetitivas 24/7 sin intervención humana, manteniendo tono profesional y preciso.',
      benefit: '<strong>78% de consultas resueltas automáticamente</strong>, liberando a tu equipo para enfocarse en cerrar matrículas de leads calificados en lugar de responder "¿Cuánto cuesta?" todo el día.',
      screenshot: '/closercat-conversacion.png',
    },
    {
      icon: '🔄',
      title: 'Sincronización automática con Q10',
      feature: 'Integración bidireccional nativa con Q10 CRM que crea automáticamente oportunidades con todos los campos mapeados (programa de interés, sede, segmento, fuente).',
      capability: 'Cada lead de WhatsApp se registra automáticamente en Q10 con conversación completa, sin copiar/pegar ni trabajo manual.',
      benefit: '<strong>100% de leads registrados sin errores</strong>. Eliminas 25-30 horas/semana de trabajo manual y garantizas que ningún lead se pierda en el proceso.',
      screenshot: '/closercat-integracion.png',
    },
    {
      icon: '📢',
      title: 'Campañas masivas de matrícula',
      feature: 'Sistema de campañas con plantillas aprobadas por Meta, segmentación avanzada y envío controlado (hasta 10K mensajes/día cumpliendo límites de WhatsApp).',
      capability: 'Puedes enviar recordatorios de matrícula, anuncios de nuevos programas, o reactivación de leads fríos de forma masiva y segmentada.',
      benefit: '<strong>Reactivación de 20-30% de leads fríos</strong> en temporada baja, sin spam ni riesgo de bloqueo de tu número de WhatsApp.',
      screenshot: '/closercat-campañas.png',
    },
    {
      icon: '🛡️',
      title: 'Control humano total con Guardrails',
      feature: 'Sistema de seguridad automático que valida cada respuesta de IA antes de enviarla, bloqueando promesas no autorizadas, descuentos falsos, o revelación de identidad de IA.',
      capability: 'Puedes confiar en que la IA nunca prometerá becas no autorizadas, compartirá información sensible, o revelará ser un bot. Si detecta riesgo, bloquea y escala a humanos.',
      benefit: '<strong>Cero incidentes de promesas falsas</strong>. Mantienes control total sobre qué puede y no puede prometer la IA, protegiendo la reputación de tu institución.',
      screenshot: '/closercat-contexto.png',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header showNav={false} ctaText="Agendar demo" />
      {/* Hero Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge color="green" icon="🎓">
                Para Instituciones Educativas en LATAM
              </Badge>
              
              <h1 className="text-5xl font-poppins font-extrabold leading-tight mb-4 mt-4" style={{ color: '#121212' }}>
                Reemplaza el caos de WhatsApp manual con un sistema centralizado que responde en &lt;3 segundos y sincroniza automáticamente con Q10
              </h1>
              
              <p className="text-xl font-inter mb-6" style={{ color: '#4b5563' }}>
                Tu equipo de admisiones deja de responder "¿Cuánto cuesta?" todo el día. CloserCat maneja consultas repetitivas 24/7 mientras tu equipo cierra matrículas.
              </p>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-2.5 w-2.5 rounded-full" style={{ backgroundColor: '#3b82f6' }} />
                  <div style={{ color: '#111827' }}>
                    <strong>78% de consultas resueltas automáticamente</strong> (precios, requisitos, horarios, becas)
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-2.5 w-2.5 rounded-full" style={{ backgroundColor: '#3b82f6' }} />
                  <div style={{ color: '#111827' }}>
                    <strong>Cada lead se crea automáticamente en Q10</strong> con programa de interés, sede y conversación completa
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-2.5 w-2.5 rounded-full" style={{ backgroundColor: '#3b82f6' }} />
                  <div style={{ color: '#111827' }}>
                    <strong>Campañas masivas de matrícula</strong> (hasta 10K mensajes/día cumpliendo límites de WhatsApp)
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <CTAButton
                  variant="primary"
                  onClick={scrollToForm}
                  tracking="cta_demo_educacion"
                >
                  Agendar demo personalizada
                </CTAButton>
                <CTAButton
                  variant="secondary"
                  tracking="cta_video_educacion"
                >
                  Ver video (1 min)
                </CTAButton>
              </div>
              
              <div className="mt-3 text-xs" style={{ color: '#6b7280' }}>
                15 minutos · Sin compromiso · Respuesta en 24 horas
              </div>
            </div>
            
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 shadow-sm">
              <div className="aspect-video bg-gray-200 rounded-xl flex items-center justify-center">
                <div className="text-6xl">🎓</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: '#6b7280' }}>
              El Problema
            </div>
            <h2 className="text-4xl font-extrabold" style={{ color: '#111827' }}>
              El caos que viven equipos de admisiones hoy
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8">
              <h3 className="text-xl font-bold mb-4" style={{ color: '#111827' }}>
                📱 Escenario típico: Temporada de matrículas
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">❌</span>
                  <span style={{ color: '#4b5563' }}>
                    <strong>500+ consultas diarias</strong> desperdigadas en 4-5 dispositivos diferentes (WhatsApp personal de cada asesor)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">❌</span>
                  <span style={{ color: '#4b5563' }}>
                    <strong>Tiempo de respuesta: 4+ horas</strong> (el lead ya le escribió a 3 instituciones más)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">❌</span>
                  <span style={{ color: '#4b5563' }}>
                    <strong>Copiar/pegar manualmente</strong> cada lead a Q10 (con errores y campos incompletos)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">❌</span>
                  <span style={{ color: '#4b5563' }}>
                    <strong>30-40% de leads perdidos</strong> por respuesta tardía o falta de seguimiento
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">❌</span>
                  <span style={{ color: '#4b5563' }}>
                    <strong>Equipo quemado</strong> respondiendo "¿Cuánto cuesta el programa de contabilidad?" 100 veces al día
                  </span>
                </li>
              </ul>
            </div>
            
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8">
              <h3 className="text-xl font-bold mb-4" style={{ color: '#111827' }}>
                💰 Costo real de este caos
              </h3>
              <div className="space-y-6">
                <div className="p-5 bg-white rounded-xl border border-red-100">
                  <div className="text-3xl font-extrabold text-red-600 mb-2">
                    $15K - $50K USD/mes
                  </div>
                  <div className="text-sm" style={{ color: '#4b5563' }}>
                    En matrículas perdidas por respuesta tardía (basado en ticket promedio de $500-1,000 USD por estudiante)
                  </div>
                </div>
                
                <div className="p-5 bg-white rounded-xl border border-orange-100">
                  <div className="text-3xl font-extrabold text-orange-600 mb-2">
                    25-30 horas/semana
                  </div>
                  <div className="text-sm" style={{ color: '#4b5563' }}>
                    En trabajo manual de copy/paste a Q10, búsqueda de conversaciones, y coordinación entre asesores
                  </div>
                </div>
                
                <div className="p-5 bg-white rounded-xl border border-blue-100">
                  <div className="text-3xl font-extrabold text-blue-600 mb-2">
                    78%
                  </div>
                  <div className="text-sm" style={{ color: '#4b5563' }}>
                    De estudiantes elige la institución que <strong>responde primero</strong> (estudio de comportamiento de leads educativos en LATAM)
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 p-8 bg-gray-50 rounded-2xl border border-gray-200">
            <div className="flex items-start gap-4">
              <div className="text-4xl">😰</div>
              <div>
                <p className="text-lg italic mb-3" style={{ color: '#111827' }}>
                  "En temporada alta, perdemos el control. Los leads llegan por Facebook, Instagram, Google... y todos terminan en WhatsApp. Pero cada asesor tiene su propio número. No sabemos quién respondió qué, ni si el lead ya está en Q10. Es un caos total."
                </p>
                <div className="text-sm font-semibold" style={{ color: '#4b5563' }}>
                  — Director de Admisiones, Institución Educativa con 3,500+ estudiantes
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Intro */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold mb-4" style={{ color: '#111827' }}>
            CloserCat: Tu equipo de admisiones con superpoderes
          </h2>
          <p className="text-xl mb-8" style={{ color: '#4b5563' }}>
            Reemplaza WhatsApp manual con un sistema centralizado que combina:
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="p-6 bg-white rounded-xl border border-gray-200">
              <div className="text-3xl mb-3">🤖</div>
              <h3 className="font-bold mb-2" style={{ color: '#111827' }}>IA que entiende educación</h3>
              <p className="text-sm" style={{ color: '#6b7280' }}>
                GPT-4 entrenado con tu Knowledge Base de programas, precios, requisitos y becas
              </p>
            </div>
            
            <div className="p-6 bg-white rounded-xl border border-gray-200">
              <div className="text-3xl mb-3">🔄</div>
              <h3 className="font-bold mb-2" style={{ color: '#111827' }}>Integración nativa Q10</h3>
              <p className="text-sm" style={{ color: '#6b7280' }}>
                Única plataforma en LATAM con sincronización bidireccional automática con Q10 CRM
              </p>
            </div>
            
            <div className="p-6 bg-white rounded-xl border border-gray-200">
              <div className="text-3xl mb-3">🛡️</div>
              <h3 className="font-bold mb-2" style={{ color: '#111827' }}>Control humano total</h3>
              <p className="text-sm" style={{ color: '#6b7280' }}>
                Guardrails bloquean respuestas inapropiadas. Tu equipo puede tomar control en 1 click.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-extrabold text-center mb-16" style={{ color: '#111827' }}>
            Cómo CloserCat transforma tu proceso de admisiones
          </h2>
          
          <div className="space-y-12">
            {valueProps.map((prop, index) => (
              <ValuePropCard
                key={index}
                {...prop}
                imagePosition={index % 2 === 0 ? 'right' : 'left'}
                capabilityNumber={index + 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-extrabold text-center mb-12" style={{ color: '#111827' }}>
            Cómo funciona
          </h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { num: '1', title: 'Onboarding', desc: 'Conectamos tu WhatsApp Business y Q10 en 15 minutos' },
              { num: '2', title: 'Configuración', desc: 'Cargamos tu Knowledge Base de programas y precios' },
              { num: '3', title: 'Automatización', desc: 'La IA empieza a responder consultas 24/7' },
              { num: '4', title: 'Optimización', desc: 'Mejoramos respuestas basado en feedback de tu equipo' },
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
        segment="educacion"
        title="Agenda una demo personalizada"
        subtitle="Completa el formulario y te contactaremos en menos de 24 horas"
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
                q: '¿Cuánto tiempo toma la implementación?',
                a: 'El onboarding completo toma entre 1-2 semanas. La conexión técnica (WhatsApp + Q10) se hace en 15 minutos. El resto del tiempo es configuración de tu Knowledge Base y entrenamiento del equipo.',
              },
              {
                q: '¿La IA puede cometer errores o dar información incorrecta?',
                a: 'La IA solo responde basándose en tu Knowledge Base oficial. Además, nuestro sistema de Guardrails valida cada respuesta antes de enviarla, bloqueando automáticamente cualquier promesa no autorizada o información incorrecta.',
              },
              {
                q: '¿Qué pasa si un lead hace una pregunta compleja que la IA no puede responder?',
                a: 'La IA detecta automáticamente cuando una consulta está fuera de su alcance y escala la conversación a un humano de tu equipo. Tu equipo recibe una notificación instantánea y puede tomar control en 1 click.',
              },
              {
                q: '¿Necesitamos cambiar nuestro número de WhatsApp actual?',
                a: 'No. Podemos migrar tu número actual a WhatsApp Business API sin perder tu historial ni contactos. Alternativamente, podemos configurar un número nuevo si lo prefieres.',
              },
              {
                q: '¿Cuánto cuesta?',
                a: 'El plan para instituciones educativas empieza en $299/mes con todo incluido: integración Q10, Knowledge Base ilimitada, campañas masivas, y soporte prioritario. Sin costos de setup ni contratos anuales.',
              },
              {
                q: '¿Qué tan segura es la integración con Q10?',
                a: 'Usamos la API oficial de Q10 con autenticación OAuth 2.0. Tus datos nunca se almacenan fuera de tu instancia de Q10. La sincronización es bidireccional y en tiempo real.',
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
