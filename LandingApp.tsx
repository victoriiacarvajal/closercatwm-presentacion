import React, { useEffect, useMemo, useRef, useState } from 'react';

type LeadFormState = {
  name: string;
  company: string;
  whatsapp: string;
  email: string;
  monthlyVolumeEstimate: string;
  useCase: string;
  crm: string;
  website: string; // honeypot
};

function getUtm(params: URLSearchParams) {
  return {
    utm_source: params.get('utm_source') || undefined,
    utm_medium: params.get('utm_medium') || undefined,
    utm_campaign: params.get('utm_campaign') || undefined,
    utm_term: params.get('utm_term') || undefined,
    utm_content: params.get('utm_content') || undefined,
  };
}

function clarityEvent(name: string) {
  if (typeof window === 'undefined') return;
  const w = window as any;
  if (typeof w.clarity === 'function') {
    try {
      w.clarity('event', name);
    } catch {
      // ignore
    }
  }
}

function useSectionViewEvent(sectionId: string, eventName: string) {
  const firedRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const el = document.getElementById(sectionId);
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') return;

    const obs = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting && !firedRef.current) {
          firedRef.current = true;
          clarityEvent(eventName);
        }
      },
      { threshold: 0.35 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [eventName, sectionId]);
}

function useScrollDepthEvents() {
  const firedRef = useRef<Record<string, boolean>>({});

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handler = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop || 0;
      const scrollable = Math.max(1, doc.scrollHeight - window.innerHeight);
      const pct = Math.round((scrollTop / scrollable) * 100);

      const thresholds = [25, 50, 75, 100] as const;
      thresholds.forEach((t) => {
        if (pct >= t && !firedRef.current[String(t)]) {
          firedRef.current[String(t)] = true;
          clarityEvent(`scroll_${t}`);
        }
      });
    };

    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);
}

function recommendPreset(input: { useCase: string; monthlyVolumeEstimate: string; crm: string }): string {
  const volume = Number((input.monthlyVolumeEstimate || '').replace(/[^0-9]/g, ''));
  const useCase = (input.useCase || '').toLowerCase();
  const crm = (input.crm || '').toLowerCase();

  if (crm.includes('q10') || useCase.includes('educ')) return 'wamedium';
  if (!Number.isNaN(volume) && volume >= 20000) return 'wamedium';
  return 'waquick';
}

const DEFAULT_FORM_STATE: LeadFormState = {
  name: '',
  company: '',
  whatsapp: '',
  email: '',
  monthlyVolumeEstimate: '',
  useCase: '',
  crm: '',
  website: '',
};

const LandingApp: React.FC = () => {
  const params = useMemo(() => {
    if (typeof window === 'undefined') return new URLSearchParams();
    return new URLSearchParams(window.location.search);
  }, []);

  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [form, setForm] = useState<LeadFormState>(DEFAULT_FORM_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const makeWebhookUrl: string | undefined = (import.meta as any).env?.VITE_MAKE_WEBHOOK_URL;

  useScrollDepthEvents();
  useSectionViewEvent('caso-estudio', 'case_study_view');
  useSectionViewEvent('founder', 'founder_story_view');
  useSectionViewEvent('risk-reversal', 'risk_reversal_view');

  const scrollToAgenda = () => {
    clarityEvent('cta_book_demo_click');
    const el = document.getElementById('agenda');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setSubmitError(null);

    clarityEvent('form_submit');

    if (!form.name || !form.company || !form.whatsapp || !form.email) {
      setSubmitError('Por favor completa nombre, empresa, WhatsApp y email.');
      return;
    }

    if (form.website) {
      setSubmitError('No se pudo enviar el formulario.');
      return;
    }

    if (!makeWebhookUrl) {
      setSubmitError('Falta configurar el webhook de Make (VITE_MAKE_WEBHOOK_URL).');
      return;
    }

    const recommendedPreset = recommendPreset({
      useCase: form.useCase,
      monthlyVolumeEstimate: form.monthlyVolumeEstimate,
      crm: form.crm,
    });

    const payload = {
      event: 'lead_submit',
      created_at: new Date().toISOString(),
      page_url: typeof window !== 'undefined' ? window.location.href : undefined,
      user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
      utm: getUtm(params),
      lead: {
        name: form.name,
        company: form.company,
        whatsapp: form.whatsapp,
        email: form.email,
        monthly_volume_estimate: form.monthlyVolumeEstimate,
        use_case: form.useCase,
        crm: form.crm,
      },
      recommended_preset: recommendedPreset,
    };

    try {
      setIsSubmitting(true);

      try {
        window.localStorage.setItem('closercat_lead', JSON.stringify(payload));
      } catch {
        // ignore
      }

      const res = await fetch(makeWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        setSubmitError('No se pudo enviar. Intenta nuevamente o escríbenos directamente.');
        return;
      }

      const nextUrl = `/?presentationId=${encodeURIComponent(recommendedPreset)}`;
      window.location.href = nextUrl;
    } catch {
      setSubmitError('No se pudo enviar. Revisa tu conexión e intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F2F5] text-gray-900">
      <header className="sticky top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-[var(--brand-blue-primary)] to-[var(--brand-purple-closer)]" />
            <div className="font-[Poppins] text-lg font-semibold">CloserCat</div>
          </div>

          <div className="hidden items-center md:flex">
            <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700">Beta</span>
          </div>

          <nav className="hidden items-center gap-5 text-sm md:flex">
            <a href="#producto" className="text-gray-700 hover:text-gray-900">Producto</a>
            <a href="#como" className="text-gray-700 hover:text-gray-900">Cómo funciona</a>
            <a href="#ia" className="text-gray-700 hover:text-gray-900">IA + Seguridad</a>
            <a href="#campanas" className="text-gray-700 hover:text-gray-900">Campañas</a>
            <a href="#integraciones" className="text-gray-700 hover:text-gray-900">Integraciones</a>
            <a href="#analytics" className="text-gray-700 hover:text-gray-900">Analytics</a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                clarityEvent('cta_video_open');
                setIsVideoOpen(true);
              }}
              className="hidden rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 md:inline-flex"
            >
              ▶ Ver demo (1 min)
            </button>
            <button
              type="button"
              onClick={scrollToAgenda}
              className="rounded-full bg-gradient-to-r from-[var(--brand-blue-primary)] to-[var(--brand-purple-closer)] px-5 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-95"
            >
              Agendar demo
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-6xl px-6 pb-14 pt-12">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <div className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-semibold text-gray-800 shadow-sm">
                🎯 Beta Privada · Espacios Limitados
              </div>
              <h1 className="mt-4 font-[Poppins] text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
                Equipos de ventas y admisiones automatizan cientos de consultas diarias en WhatsApp sin perder leads.
              </h1>
              <p className="mt-4 text-lg text-gray-700">
                Responde en segundos, 24/7, y deja cada lead registrado en tu CRM (por ejemplo Q10) sin trabajo manual. Tu equipo solo toma los casos que necesitan atención humana.
              </p>
              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-2.5 w-2.5 rounded-full bg-[var(--brand-blue-primary)]" />
                  <div className="text-gray-800">Respuestas en menos de 3 segundos, 24/7</div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-2.5 w-2.5 rounded-full bg-[var(--brand-blue-primary)]" />
                  <div className="text-gray-800">Cero leads perdidos por respuesta tardía</div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-2.5 w-2.5 rounded-full bg-[var(--brand-blue-primary)]" />
                  <div className="text-gray-800">Sync automático con Q10 (sin copiar/pegar)</div>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={scrollToAgenda}
                  className="rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800"
                >
                  Quiero una demo
                </button>
                <button
                  type="button"
                  onClick={() => {
                    clarityEvent('cta_video_open');
                    setIsVideoOpen(true);
                  }}
                  className="rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Ver video (1 min)
                </button>
              </div>

              <div className="mt-3 text-xs text-gray-600">15 minutos · Sin compromiso · Respuesta en 24 horas</div>
            </div>

            <div className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm">
              <video
                className="h-full w-full rounded-xl"
                src="/vista-global-closercat.mp4"
                controls
                preload="metadata"
              />
              <div className="mt-3 text-xs text-gray-500">Demo rápida del producto (video).</div>
            </div>
          </div>
        </section>

        <section id="producto" className="mx-auto max-w-6xl px-6 pb-14">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
              <div className="font-[Poppins] text-xl font-bold">El caos de WhatsApp comercial hoy</div>
              <div className="mt-3 space-y-2 text-sm text-gray-700">
                <div>Conversaciones desperdigadas en 3–5 dispositivos diferentes.</div>
                <div>Respuestas en 4+ horas (el cliente ya le escribió a la competencia).</div>
                <div>Seguimiento manual y pérdida de contexto en el historial.</div>
              </div>
            </div>
            <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
              <div className="font-[Poppins] text-xl font-bold">Impacto económico</div>
              <div className="mt-3 space-y-2 text-sm text-gray-700">
                <div>$15,000–$50,000 en oportunidades que no se cierran cada mes.</div>
                <div>20–30 horas/semana buscando conversaciones y contexto.</div>
                <div className="text-gray-900">El 78% de compradores elige al proveedor que responde primero.</div>
              </div>
            </div>
          </div>
        </section>

        <section id="caso-estudio" className="bg-white py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">Caso de Estudio</div>
            <div className="mt-3 font-[Poppins] text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
              Cómo una institución educativa con 5,000+ estudiantes automatizó la mayoría de sus consultas sin perder calidad
            </div>

            <div className="mt-10 grid gap-8 md:grid-cols-2">
              <div className="rounded-2xl border border-black/5 bg-white p-8 shadow-sm">
                <div className="font-[Poppins] text-lg font-bold text-gray-900">El problema antes de CloserCat</div>
                <div className="mt-4 space-y-3 text-sm text-gray-700">
                  <div>Consultas repetidas (precios, requisitos, horarios) que consumían al equipo.</div>
                  <div>Leads sin seguimiento por picos de demanda (matrículas, becas, campañas).</div>
                  <div>Información dispersa: no se sabía quién respondió ni qué se prometió.</div>
                  <div>Registro manual de leads en Q10 con retrasos y errores.</div>
                </div>
              </div>

              <div className="rounded-2xl border border-black/5 bg-white p-8 shadow-sm">
                <div className="font-[Poppins] text-lg font-bold text-gray-900">Resultados con CloserCat</div>
                <div className="mt-6 grid gap-4">
                  <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
                    <div className="border-l-4 border-blue-500 pl-4">
                      <div className="text-4xl font-extrabold text-gray-900">78%</div>
                      <div className="mt-1 text-sm text-gray-700">Conversaciones resueltas automáticamente (sin perder tono humano)</div>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
                    <div className="border-l-4 border-purple-500 pl-4">
                      <div className="text-4xl font-extrabold text-gray-900">4h → 15min</div>
                      <div className="mt-1 text-sm text-gray-700">Tiempo promedio de respuesta en horas pico</div>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
                    <div className="border-l-4 border-green-500 pl-4">
                      <div className="text-4xl font-extrabold text-gray-900">100%</div>
                      <div className="mt-1 text-sm text-gray-700">Leads creados en Q10 sin trabajo manual</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-gray-100 bg-gray-50 p-8">
              <div className="grid gap-6 md:grid-cols-[56px_1fr] md:items-start">
                <div className="h-14 w-14 rounded-full bg-gradient-to-br from-[var(--brand-blue-primary)] to-[var(--brand-purple-closer)]" />
                <div>
                  <div className="text-lg italic text-gray-900">
                    “Pasamos de vivir apagando incendios en WhatsApp a tener un proceso controlado. Ahora el equipo se enfoca en cerrar, no en responder lo mismo todo el día.”
                  </div>
                  <div className="mt-4 text-sm font-semibold text-gray-900">Contacto (placeholder)</div>
                  <div className="text-sm text-gray-600">Directora de Admisiones · Institución Educativa</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="como" className="mx-auto max-w-6xl px-6 pb-14">
          <div className="rounded-2xl border border-black/5 bg-white p-8 shadow-sm">
            <div className="font-[Poppins] text-2xl font-extrabold">Cómo funciona en 60 segundos</div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                'Cliente envía mensaje en WhatsApp (texto, audio o imagen)',
                'WhatsApp notifica a CloserCat en tiempo real',
                'Agrupación inteligente de mensajes para entender el contexto',
                'IA responde usando historial + perfil + base de conocimiento',
                'Sistema de seguridad valida cada respuesta antes de enviarla',
                'Todo queda listo para campañas, Analytics y CRM',
              ].map((t, idx) => (
                <div key={idx} className="flex gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-sm font-bold text-gray-800">
                    {idx + 1}
                  </div>
                  <div className="text-sm text-gray-800">{t}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-sm text-gray-700">
              ¿Quieres verlo en acción?{' '}
              <button
                type="button"
                onClick={() => {
                  clarityEvent('cta_video_open');
                  setIsVideoOpen(true);
                }}
                className="font-semibold text-gray-900 underline underline-offset-4 hover:opacity-80"
              >
                Ver demo en video
              </button>
              .
            </div>
          </div>
        </section>

        <section id="ia" className="mx-auto max-w-6xl px-6 pb-14">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
              <div className="font-[Poppins] text-xl font-bold">IA + control humano</div>
              <div className="mt-3 text-sm text-gray-700">
                La IA propone y tu equipo mantiene el control. Puedes activar/desactivar la IA por conversación y tomar el relevo en cualquier momento.
              </div>
            </div>
            <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
              <div className="font-[Poppins] text-xl font-bold">Sistema de seguridad automático</div>
              <div className="mt-3 text-sm text-gray-700">
                Nunca tendrás que preocuparte porque la IA prometa descuentos no autorizados o comparta información sensible. Si detecta riesgo, bloquea y escala a humanos.
              </div>
            </div>
          </div>
        </section>

        <section id="campanas" className="mx-auto max-w-6xl px-6 pb-14">
          <div className="rounded-2xl border border-black/5 bg-white p-8 shadow-sm">
            <div className="font-[Poppins] text-2xl font-extrabold">Campañas y marketing conversacional medible</div>
            <div className="mt-3 text-sm text-gray-700">
              Envía hasta 10,000 mensajes diarios cumpliendo límites de WhatsApp. Ideal para recordatorios de matrícula, lanzamientos de programas y reactivación de leads.
            </div>
          </div>
        </section>

        <section id="integraciones" className="mx-auto max-w-6xl px-6 pb-14">
          <div className="rounded-2xl border border-black/5 bg-white p-8 shadow-sm">
            <div className="font-[Poppins] text-2xl font-extrabold">Integraciones</div>
            <div className="mt-3 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-5">
                <div className="flex items-center gap-2">
                  <div className="font-semibold">Q10 (nativo)</div>
                  <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">Única integración nativa en LATAM</span>
                </div>
                <div className="mt-2 text-sm text-gray-700">Sincronización bidireccional para mantener una sola fuente de verdad entre conversaciones y pipeline.</div>
              </div>
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-5">
                <div className="font-semibold">Integraciones en tiempo real (webhooks)</div>
                <div className="mt-2 text-sm text-gray-700">Conecta con Make/Zapier/n8n, Slack y otros CRMs usando eventos de lead, conversación y campañas.</div>
              </div>
            </div>
          </div>
        </section>

        <section id="analytics" className="mx-auto max-w-6xl px-6 pb-14">
          <div className="rounded-2xl border border-black/5 bg-white p-8 shadow-sm">
            <div className="font-[Poppins] text-2xl font-extrabold">Analytics & Reporting</div>
            <div className="mt-3 text-sm text-gray-700">
              Reportes automáticos en HTML (para compartir) y JSON (para tu equipo de BI). Visualiza respuesta, conversión y carga operativa por canal/campaña.
            </div>
          </div>
        </section>

        <section id="founder" className="mx-auto max-w-6xl px-6 pb-14">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
              <div className="aspect-[4/3] w-full rounded-2xl bg-gradient-to-br from-[var(--brand-blue-primary)] to-[var(--brand-purple-closer)]" />
            </div>
            <div className="rounded-2xl border border-black/5 bg-white p-8 shadow-sm">
              <div className="font-[Poppins] text-2xl font-extrabold">Por qué construimos CloserCat</div>
              <div className="mt-4 space-y-4 text-sm text-gray-700">
                <div>
                  En LATAM, WhatsApp es el canal más importante para ventas y admisiones. Pero cuando llegan picos de demanda, el equipo termina respondiendo tarde o perdiendo el hilo.
                </div>
                <div>
                  Vimos dos extremos: chatbots genéricos que no entienden el negocio, o soluciones “enterprise” que son lentas de implementar y difíciles de operar.
                </div>
                <div className="font-semibold text-gray-900">
                  CloserCat nace para darte respuestas rápidas y consistentes, con control humano, y con integración real al CRM (Q10) para que nada se pierda.
                </div>
              </div>
              <div className="mt-6 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[var(--brand-blue-primary)] to-[var(--brand-purple-closer)]" />
                <div>
                  <div className="text-sm font-semibold text-gray-900">Roger (placeholder)</div>
                  <div className="text-sm text-gray-600">Fundador, CloserCat</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-14">
          <div className="rounded-2xl border border-black/5 bg-white p-8 shadow-sm">
            <div className="text-center font-[Poppins] text-2xl font-extrabold">Construido con tecnología de clase mundial</div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6 text-center">
                <div className="text-4xl">🤖</div>
                <div className="mt-3 font-semibold text-gray-900">GPT-4 + Azure</div>
                <div className="mt-2 text-sm text-gray-600">Misma IA que usa GitHub Copilot</div>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6 text-center">
                <div className="text-4xl">🔒</div>
                <div className="mt-3 font-semibold text-gray-900">Seguridad Enterprise</div>
                <div className="mt-2 text-sm text-gray-600">Validación automática para evitar respuestas inapropiadas</div>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6 text-center">
                <div className="text-4xl">⚡</div>
                <div className="mt-3 font-semibold text-gray-900">&lt; 3 segundos</div>
                <div className="mt-2 text-sm text-gray-600">Latencia de respuesta</div>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6 text-center">
                <div className="text-4xl">🔄</div>
                <div className="mt-3 font-semibold text-gray-900">Integración Q10</div>
                <div className="mt-2 text-sm text-gray-600">Diseñada para instituciones educativas en LATAM</div>
              </div>
            </div>
          </div>
        </section>

        <section id="risk-reversal" className="mx-auto max-w-6xl px-6 pb-14">
          <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 p-10 text-center text-white shadow-sm md:p-12">
            <div className="font-[Poppins] text-3xl font-extrabold">Prueba CloserCat sin riesgo</div>
            <div className="mt-3 text-white/90">Setup gratuito + 30 días de prueba</div>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">
                <div className="text-4xl">✅</div>
                <div className="mt-3 font-semibold">Implementación incluida</div>
                <div className="mt-2 text-sm text-white/90">Te ayudamos a configurar todo en 1 semana</div>
              </div>
              <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">
                <div className="text-4xl">🎓</div>
                <div className="mt-3 font-semibold">Training completo</div>
                <div className="mt-2 text-sm text-white/90">Capacitamos a tu equipo desde el día 1</div>
              </div>
              <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">
                <div className="text-4xl">💬</div>
                <div className="mt-3 font-semibold">Soporte directo</div>
                <div className="mt-2 text-sm text-white/90">Línea directa con el equipo fundador</div>
              </div>
            </div>
            <div className="mt-10 flex flex-col items-center justify-center gap-3">
              <button
                type="button"
                onClick={scrollToAgenda}
                className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-gray-900 hover:bg-white/90"
              >
                Agendar demo personalizada
              </button>
              <div className="text-xs text-white/90">15 minutos · Sin compromiso · Respuesta en 24 horas</div>
            </div>
          </div>
        </section>

        <section id="agenda" className="mx-auto max-w-6xl px-6 pb-20">
          <div className="rounded-3xl bg-gradient-to-r from-[var(--brand-blue-primary)] to-[var(--brand-purple-closer)] p-[1px]">
            <div className="rounded-3xl bg-white p-8">
              <div className="font-[Poppins] text-2xl font-extrabold">Agendemos una demo (primero, cuéntanos de tu operación)</div>
              <div className="mt-2 text-sm text-gray-700">
                Te contactaremos en menos de 24 horas con una demo personalizada.
              </div>

              <form onSubmit={onSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
                <input
                  className="hidden"
                  value={form.website}
                  onChange={(e) => setForm((p) => ({ ...p, website: e.target.value }))}
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="md:col-span-1">
                  <label className="text-xs font-semibold text-gray-700">Nombre</label>
                  <input
                    className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-gray-400"
                    value={form.name}
                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                    placeholder="Tu nombre"
                  />
                </div>

                <div className="md:col-span-1">
                  <label className="text-xs font-semibold text-gray-700">Empresa</label>
                  <input
                    className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-gray-400"
                    value={form.company}
                    onChange={(e) => setForm((p) => ({ ...p, company: e.target.value }))}
                    placeholder="Nombre de la empresa"
                  />
                </div>

                <div className="md:col-span-1">
                  <label className="text-xs font-semibold text-gray-700">WhatsApp</label>
                  <input
                    className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-gray-400"
                    value={form.whatsapp}
                    onChange={(e) => setForm((p) => ({ ...p, whatsapp: e.target.value }))}
                    placeholder="+57 ..."
                  />
                </div>

                <div className="md:col-span-1">
                  <label className="text-xs font-semibold text-gray-700">Email</label>
                  <input
                    className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-gray-400"
                    value={form.email}
                    onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                    placeholder="tu@empresa.com"
                    type="email"
                  />
                </div>

                <div className="md:col-span-1">
                  <label className="text-xs font-semibold text-gray-700">Volumen mensual estimado</label>
                  <input
                    className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-gray-400"
                    value={form.monthlyVolumeEstimate}
                    onChange={(e) => setForm((p) => ({ ...p, monthlyVolumeEstimate: e.target.value }))}
                    placeholder="Ej: 5000"
                  />
                </div>

                <div className="md:col-span-1">
                  <label className="text-xs font-semibold text-gray-700">Caso de uso</label>
                  <select
                    className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-gray-400"
                    value={form.useCase}
                    onChange={(e) => setForm((p) => ({ ...p, useCase: e.target.value }))}
                  >
                    <option value="">Selecciona</option>
                    <option value="Ecommerce">Ecommerce</option>
                    <option value="B2B/Prospección">B2B/Prospección</option>
                    <option value="Soporte">Soporte</option>
                    <option value="Educación">Educación</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="text-xs font-semibold text-gray-700">CRM actual</label>
                  <select
                    className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-gray-400"
                    value={form.crm}
                    onChange={(e) => setForm((p) => ({ ...p, crm: e.target.value }))}
                  >
                    <option value="">Selecciona</option>
                    <option value="Q10">Q10</option>
                    <option value="HubSpot">HubSpot</option>
                    <option value="Salesforce">Salesforce</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>

                {submitError && (
                  <div className="md:col-span-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">
                    {submitError}
                  </div>
                )}

                <div className="md:col-span-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-xs text-gray-500">
                    Al enviar aceptas que te contactemos para coordinar la demo.
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white disabled:opacity-60"
                  >
                    {isSubmitting ? 'Enviando…' : 'Continuar'}
                  </button>
                </div>
              </form>

              <div className="mt-4 text-sm text-gray-700">
                💡 ¿Tienes preguntas antes?{' '}
                <a href="#faqs" className="font-semibold text-gray-900 underline underline-offset-4 hover:opacity-80">
                  Ver FAQs
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="faqs" className="bg-white py-20">
          <div className="mx-auto max-w-4xl px-6">
            <div className="text-center font-[Poppins] text-3xl font-extrabold">Preguntas frecuentes</div>
            <div className="mt-10 divide-y divide-gray-100 rounded-2xl border border-gray-100 bg-white">
              {[
                {
                  q: '¿El AI realmente suena humano o es obvio que es un bot?',
                  a: 'Usa GPT-4 y se configura con el tono de tu institución. Además, puedes definir límites y frases permitidas para mantener consistencia. Si algo requiere intervención humana, tu equipo puede tomar el control.',
                },
                {
                  q: '¿Qué pasa si el AI dice algo incorrecto?',
                  a: 'Tenemos un sistema de seguridad que valida respuestas antes de enviarlas (por ejemplo: descuentos, información sensible o promesas no autorizadas). Cuando hay riesgo, se bloquea y escala a humanos.',
                },
                {
                  q: '¿Cuánto cuesta CloserCat?',
                  a: 'El pricing es personalizado según el volumen de conversaciones y nivel de integración. En beta privada tenemos condiciones preferenciales. Agenda una demo y te enviamos una propuesta.',
                },
                {
                  q: '¿Cuánto tiempo toma implementarlo?',
                  a: 'Con nuestra ayuda suele tomar 1 semana: conectamos WhatsApp Business, configuramos la base de conocimiento y dejamos el flujo integrado con Q10 (si aplica).',
                },
                {
                  q: '¿Funciona con mi CRM actual?',
                  a: 'Tenemos integración nativa con Q10. Para otros CRMs usamos integraciones en tiempo real (webhooks) que se conectan con Make/Zapier/n8n.',
                },
                {
                  q: '¿Qué pasa si WhatsApp cambia sus políticas?',
                  a: 'Usamos WhatsApp Business API oficial. Monitoreamos cambios y ajustamos el sistema para mantener cumplimiento y continuidad operativa.',
                },
                {
                  q: '¿Necesito conocimientos técnicos?',
                  a: 'No. La interfaz es simple y nosotros hacemos la configuración inicial. Tu equipo solo opera el panel y define reglas básicas.',
                },
                {
                  q: '¿Puedo desactivar el AI en cualquier momento?',
                  a: 'Sí. Puedes activar/desactivar la IA por conversación o globalmente con un solo click. Tu equipo siempre puede tomar el relevo.',
                },
              ].map((item, idx) => (
                <details
                  key={idx}
                  className="group p-6"
                  onToggle={(e) => {
                    const el = e.currentTarget;
                    if (el.open) clarityEvent(`faq_expand_${idx + 1}`);
                    if (el.open) clarityEvent('faq_expand');
                  }}
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-gray-900">
                    <span>{item.q}</span>
                    <span className="text-gray-400 group-open:rotate-180">⌄</span>
                  </summary>
                  <div className="mt-3 text-sm text-gray-700">{item.a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      {isVideoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6" onClick={() => setIsVideoOpen(false)}>
          <div className="w-full max-w-4xl rounded-2xl bg-white p-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <div className="font-[Poppins] text-lg font-bold">Demo (1 min)</div>
              <button className="rounded-lg px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100" onClick={() => setIsVideoOpen(false)}>
                Cerrar
              </button>
            </div>
            <video className="mt-3 h-full w-full rounded-xl" src="/vista-global-closercat.mp4" controls preload="metadata" />
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingApp;
