import React, { useEffect } from 'react';
import Badge from '../shared/Badge';
import CTAButton from '../shared/CTAButton';
import ValuePropCard from '../shared/ValuePropCard';
import PricingCard from '../shared/PricingCard';
import FormSection from '../shared/FormSection';
import Header from '../shared/Header';
import EducationContactForm from './EducationContactForm';
import { clarityEvent } from '../../utils/tracking';

export default function LandingFormacion() {
  useEffect(() => {
    clarityEvent('landing_formacion_view');
  }, []);

  const scrollToForm = () => {
    document.getElementById('agenda')?.scrollIntoView({ behavior: 'smooth' });
  };

  const valueProps = [
    {
      icon: '🤖',
      title: 'Responde automáticamente con IA (GPT-4)',
      feature: 'IA consulta automáticamente tu Knowledge Base (programas, cursos, precios, requisitos, horarios, becas) para generar respuestas precisas en lenguaje natural.',
      capability: 'Puedes automatizar respuestas a consultas repetitivas 24/7 sin intervención humana, manteniendo tono profesional y preciso.',
      benefit: '<strong>78% de consultas resueltas automáticamente</strong>, liberando a tu equipo para enfocarse en cerrar inscripciones de leads calificados en lugar de responder "¿Cuánto cuesta?" todo el día.',
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
      title: 'Campañas masivas de inscripción',
      feature: 'Sistema de campañas con plantillas aprobadas por Meta, segmentación avanzada y envío controlado (hasta 10K mensajes/día cumpliendo límites de WhatsApp).',
      capability: 'Puedes enviar recordatorios de inscripción, anuncios de nuevos programas/cursos, o reactivación de leads fríos de forma masiva y segmentada.',
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
                Para Educación y Formación en LATAM
              </Badge>

              <h1 className="text-5xl font-poppins font-extrabold leading-tight mb-4 mt-4" style={{ color: '#121212' }}>
                Automatiza admisiones y consultas en educación y formación
              </h1>

              <p className="text-xl font-inter mb-6" style={{ color: '#4b5563' }}>
                Desde universidades hasta workshops: IA que responde sobre programas, precios, requisitos y agenda citas.
                <strong> Integración nativa con Q10 CRM</strong> para instituciones educativas.
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200">
                  <span className="text-2xl">🎓</span>
                  <div>
                    <h3 className="font-poppins font-semibold text-sm" style={{ color: '#121212' }}>Instituciones Educativas</h3>
                    <p className="text-xs font-inter" style={{ color: '#6b7280' }}>Universidades, colegios, institutos</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200">
                  <span className="text-2xl">📚</span>
                  <div>
                    <h3 className="font-poppins font-semibold text-sm" style={{ color: '#121212' }}>Academias y Cursos</h3>
                    <p className="text-xs font-inter" style={{ color: '#6b7280' }}>Academias, workshops, certificaciones</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-2.5 w-2.5 rounded-full" style={{ backgroundColor: '#08C4F4' }} />
                  <div className="font-inter" style={{ color: '#121212' }}>
                    <strong>78% de consultas resueltas automáticamente</strong> (precios, requisitos, horarios, becas)
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-2.5 w-2.5 rounded-full" style={{ backgroundColor: '#08C4F4' }} />
                  <div className="font-inter" style={{ color: '#121212' }}>
                    <strong>Cada lead se crea automáticamente en Q10</strong> con programa de interés, sede y conversación completa
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-2.5 w-2.5 rounded-full" style={{ backgroundColor: '#08C4F4' }} />
                  <div className="font-inter" style={{ color: '#121212' }}>
                    <strong>Campañas masivas de inscripción</strong> (hasta 10K mensajes/día cumpliendo límites de WhatsApp)
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <CTAButton
                  variant="primary"
                  onClick={scrollToForm}
                  tracking="cta_demo_formacion"
                >
                  Agendar demo personalizada
                </CTAButton>
                <CTAButton
                  variant="secondary"
                  tracking="cta_video_formacion"
                >
                  Ver video (1 min)
                </CTAButton>
              </div>

              <div className="mt-3 text-xs font-inter" style={{ color: '#6b7280' }}>
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

      {/* Tipos de Formación */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-poppins font-bold text-center mb-4" style={{ color: '#121212' }}>
            Para todo tipo de formación
          </h2>

          <p className="text-center font-inter mb-12" style={{ color: '#4b5563' }}>
            CloserCat se adapta a cualquier modelo educativo:
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="text-4xl mb-3">🏛️</div>
              <h3 className="font-poppins font-bold mb-2" style={{ color: '#121212' }}>Educación Superior</h3>
              <ul className="space-y-2 text-sm font-inter" style={{ color: '#4b5563' }}>
                <li>• Universidades</li>
                <li>• Institutos técnicos</li>
                <li>• Programas de posgrado</li>
                <li>• Educación continua</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="font-poppins font-bold mb-2" style={{ color: '#121212' }}>Formación Profesional</h3>
              <ul className="space-y-2 text-sm font-inter" style={{ color: '#4b5563' }}>
                <li>• Academias especializadas</li>
                <li>• Certificaciones</li>
                <li>• Bootcamps</li>
                <li>• Cursos online</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="text-4xl mb-3">✨</div>
              <h3 className="font-poppins font-bold mb-2" style={{ color: '#121212' }}>Talleres y Workshops</h3>
              <ul className="space-y-2 text-sm font-inter" style={{ color: '#4b5563' }}>
                <li>• Talleres presenciales</li>
                <li>• Workshops especializados</li>
                <li>• Cursos cortos</li>
                <li>• Capacitaciones corporativas</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="text-xs font-poppins font-semibold uppercase tracking-wide mb-3" style={{ color: '#6b7280' }}>
              El Problema
            </div>
            <h2 className="text-4xl font-poppins font-extrabold" style={{ color: '#121212' }}>
              El caos que viven equipos de admisiones hoy
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8">
              <h3 className="text-xl font-poppins font-bold mb-4" style={{ color: '#121212' }}>
                📱 Escenario típico: Temporada de inscripciones
              </h3>
              <ul className="space-y-3 text-sm font-inter">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">❌</span>
                  <span style={{ color: '#4b5563' }}>
                    <strong>500+ consultas diarias</strong> desperdigadas en 4-5 dispositivos diferentes (WhatsApp personal de cada asesor)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">❌</span>
                  <span style={{ color: '#4b5563' }}>
                    <strong>Tiempo de respuesta: 4+ horas</strong> (el lead ya le escribió a 3 competidores más)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">❌</span>
                  <span style={{ color: '#4b5563' }}>
                    <strong>Copiar/pegar manualmente</strong> cada lead al CRM (con errores y campos incompletos)
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
                    <strong>Equipo quemado</strong> respondiendo "¿Cuánto cuesta?" 100 veces al día
                  </span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8">
              <h3 className="text-xl font-poppins font-bold mb-4" style={{ color: '#121212' }}>
                💰 Costo real de este caos
              </h3>
              <div className="space-y-6">
                <div className="p-5 bg-white rounded-xl border border-red-100">
                  <div className="text-3xl font-mono font-extrabold text-red-600 mb-2">
                    $60M - $200M COP/mes
                  </div>
                  <div className="text-sm font-inter" style={{ color: '#4b5563' }}>
                    En inscripciones perdidas por respuesta tardía (basado en matrícula promedio de $2M - $5M COP por estudiante)
                  </div>
                </div>

                <div className="p-5 bg-white rounded-xl border border-orange-100">
                  <div className="text-3xl font-mono font-extrabold text-orange-600 mb-2">
                    25-30 horas/semana
                  </div>
                  <div className="text-sm font-inter" style={{ color: '#4b5563' }}>
                    En trabajo manual de copy/paste al CRM, búsqueda de conversaciones, y coordinación entre asesores
                  </div>
                </div>

                <div className="p-5 bg-white rounded-xl border border-blue-100">
                  <div className="text-3xl font-mono font-extrabold" style={{ color: '#08C4F4' }}>
                    78%
                  </div>
                  <div className="text-sm font-inter" style={{ color: '#4b5563' }}>
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
                <p className="text-lg font-inter italic mb-3" style={{ color: '#121212' }}>
                  "En temporada alta, perdemos el control. Los leads llegan por Facebook, Instagram, Google... y todos terminan en WhatsApp. Pero cada asesor tiene su propio número. No sabemos quién respondió qué, ni si el lead ya está en el CRM. Es un caos total."
                </p>
                <div className="text-sm font-poppins font-semibold" style={{ color: '#4b5563' }}>
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
          <h2 className="text-4xl font-poppins font-extrabold mb-4" style={{ color: '#121212' }}>
            CloserCat: Tu equipo de admisiones con superpoderes
          </h2>
          <p className="text-xl font-inter mb-8" style={{ color: '#4b5563' }}>
            Reemplaza WhatsApp manual con un sistema centralizado que combina:
          </p>

          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="p-6 bg-white rounded-xl border border-gray-200">
              <div className="text-3xl mb-3">🤖</div>
              <h3 className="font-poppins font-bold mb-2" style={{ color: '#121212' }}>IA que entiende educación</h3>
              <p className="text-sm font-inter" style={{ color: '#6b7280' }}>
                GPT-4 entrenado con tu Knowledge Base de programas, precios, requisitos y becas
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-gray-200">
              <div className="text-3xl mb-3">🔄</div>
              <h3 className="font-poppins font-bold mb-2" style={{ color: '#121212' }}>Integración nativa Q10</h3>
              <p className="text-sm font-inter" style={{ color: '#6b7280' }}>
                Única plataforma en LATAM con sincronización bidireccional automática con Q10 CRM
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-gray-200">
              <div className="text-3xl mb-3">🛡️</div>
              <h3 className="font-poppins font-bold mb-2" style={{ color: '#121212' }}>Control humano total</h3>
              <p className="text-sm font-inter" style={{ color: '#6b7280' }}>
                Guardrails bloquean respuestas inapropiadas. Tu equipo puede tomar control en 1 click.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-poppins font-extrabold text-center mb-16" style={{ color: '#121212' }}>
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

      {/* Education Contact Form (Replaces Calculator) */}
      <EducationContactForm />



      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-poppins font-extrabold text-center mb-12" style={{ color: '#121212' }}>
            Cómo funciona
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { num: '1', title: 'Onboarding', desc: 'Conectamos tu WhatsApp Business y CRM en 15 minutos' },
              { num: '2', title: 'Configuración', desc: 'Cargamos tu Knowledge Base de programas y precios' },
              { num: '3', title: 'Automatización', desc: 'La IA empieza a responder consultas 24/7' },
              { num: '4', title: 'Optimización', desc: 'Mejoramos respuestas basado en feedback de tu equipo' },
            ].map((step) => (
              <div key={step.num} className="text-center">
                <div
                  className="w-12 h-12 rounded-full text-white font-poppins font-bold text-xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: 'linear-gradient(135deg, #08C4F4 0%, #8336FF 100%)' }}
                >
                  {step.num}
                </div>
                <h3 className="font-poppins font-bold mb-2" style={{ color: '#121212' }}>{step.title}</h3>
                <p className="text-sm font-inter" style={{ color: '#6b7280' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* FAQs */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-poppins font-extrabold text-center mb-12" style={{ color: '#121212' }}>
            Preguntas frecuentes
          </h2>

          <div className="space-y-6">
            {[
              {
                q: '¿Cuánto tiempo toma la implementación?',
                a: 'El onboarding completo toma entre 1-2 semanas. La conexión técnica (WhatsApp + CRM) se hace en 15 minutos. El resto del tiempo es configuración de tu Knowledge Base y entrenamiento del equipo.',
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
                a: 'El plan para instituciones educativas se adapta al tamaño de tu institución. Solicita una cotización personalizada para conocer el plan ideal para tu volumen de estudiantes.',
              },
              {
                q: '¿Qué tan segura es la integración con Q10?',
                a: 'Usamos la API oficial de Q10 con autenticación OAuth 2.0. Tus datos nunca se almacenan fuera de tu instancia de Q10. La sincronización es bidireccional y en tiempo real.',
              },
            ].map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-6">
                <h3 className="font-poppins font-bold mb-2" style={{ color: '#121212' }}>{faq.q}</h3>
                <p className="text-sm font-inter" style={{ color: '#6b7280' }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
