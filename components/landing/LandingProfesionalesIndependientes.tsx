import React, { useEffect, useRef } from 'react';
import Badge from '../shared/Badge';
import CTAButton from '../shared/CTAButton';
import ValuePropCard from '../shared/ValuePropCard';
import PricingCard from '../shared/PricingCard';
import ProfesionalesIndependientesForm from '../shared/ProfesionalesIndependientesForm';
import Header from '../shared/Header';
import { clarityEvent, trackPricingCardView, trackPricingCardClick } from '../../utils/tracking';

export default function LandingProfesionalesIndependientes() {
    const formRef = useRef<HTMLDivElement>(null);
    const pricingSectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        clarityEvent('landing_profesionales_independientes_view');

        // Scroll tracking for pricing section
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        clarityEvent('scroll_pricing_section');
                        // Track individual pricing card views
                        trackPricingCardView('backup');
                        trackPricingCardView('crm_personal');
                        trackPricingCardView('crm_ai');
                    }
                });
            },
            { threshold: 0.5 }
        );

        if (pricingSectionRef.current) {
            observer.observe(pricingSectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const scrollToForm = (preSelectedPlan?: string) => {
        formRef.current?.scrollIntoView({ behavior: 'smooth' });
        // If a plan is pre-selected, we'll pass it to the form component
        if (preSelectedPlan) {
            // Store in sessionStorage to be picked up by form
            sessionStorage.setItem('preSelectedPlan', preSelectedPlan);
        }
    };

    const scrollToPricing = () => {
        pricingSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const valueProps = [
        {
            icon: '💾',
            title: 'Backup continuo 24/7',
            feature: 'Sistema de snapshots incrementales cada 6 horas con almacenamiento encriptado en servidor propio. Retención configurable y exportación a múltiples formatos.',
            capability: 'Respaldo automático de todas tus conversaciones sin intervención manual. Si pierdes tu teléfono, te roban la línea o te bloquean la cuenta, recuperas todo en minutos.',
            benefit: '<strong>Tu negocio no se detiene.</strong> Recuperas todos tus contactos y conversaciones inmediatamente, sin perder ni un solo cliente o aliado importante.',
            screenshot: '/placeholder-backup.png',
        },
        {
            icon: '📇',
            title: 'CRM de relaciones personales',
            feature: 'Fichas enriquecidas automáticamente desde conversaciones, con notas privadas, etiquetas personalizables, recordatorios de follow-up y segmentación avanzada por tipo, ciudad o última interacción.',
            capability: 'Organiza cada contacto con contexto completo. Sabes exactamente a quién contactar hoy, qué prometiste, cuándo dar seguimiento y cómo segmentar tu red.',
            benefit: '<strong>Nunca más olvidas dar seguimiento.</strong> Reactivas leads tibios, cultivas aliados y mantienes clientes activos con recordatorios automáticos.',
            screenshot: '/placeholder-crm.png',
        },
        {
            icon: '🤖',
            title: 'IA asistente inteligente',
            feature: 'Contestador automático que consulta tu Knowledge Base (servicios, precios, FAQs) para responder consultas repetitivas 24/7. Clasifica mensajes y genera borradores personalizados.',
            capability: 'La IA responde automáticamente consultas básicas mientras tú te enfocas en cerrar negocios. Límites de seguridad (50-100 respuestas/mes) evitan abusos.',
            benefit: '<strong>78% de consultas básicas resueltas automáticamente.</strong> Tu tiempo se libera para atender lo importante: cerrar negocios y cultivar relaciones clave.',
            screenshot: '/placeholder-ia.png',
        },
    ];

    return (
        <div className="min-h-screen bg-white">
            <Header showNav={false} ctaText="Empezar ahora" ctaAction={() => scrollToForm()} />

            {/* Hero Section */}
            <section className="py-16 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <Badge color="blue" icon="💼">
                                Para Profesionales que Viven de sus Relaciones
                            </Badge>

                            <h1 className="text-5xl font-poppins font-extrabold leading-tight mb-4 mt-4" style={{ color: '#121212' }}>
                                Si mañana te bloquean el WhatsApp, tu base de datos de clientes y aliados sigue viva
                            </h1>

                            <p className="text-xl font-inter mb-6" style={{ color: '#4b5563' }}>
                                Deja de temer perder tu teléfono o que te bloqueen la cuenta. Tu red de contactos está respaldada 24/7, organizada con notas y recordatorios, y una IA contesta lo básico mientras tú atiendes lo importante.
                            </p>

                            <div className="space-y-3 mb-8">
                                <div className="flex items-start gap-3">
                                    <div className="mt-1 h-2.5 w-2.5 rounded-full" style={{ backgroundColor: '#08C4F4' }} />
                                    <div className="font-inter" style={{ color: '#121212' }}>
                                        <strong>Backup automático</strong> de todas tus conversaciones cada 6 horas
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="mt-1 h-2.5 w-2.5 rounded-full" style={{ backgroundColor: '#08C4F4' }} />
                                    <div className="font-inter" style={{ color: '#121212' }}>
                                        <strong>CRM personal</strong> con notas, etiquetas y recordatorios por contacto
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="mt-1 h-2.5 w-2.5 rounded-full" style={{ backgroundColor: '#08C4F4' }} />
                                    <div className="font-inter" style={{ color: '#121212' }}>
                                        <strong>IA asistente</strong> que responde consultas básicas 24/7
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <CTAButton
                                    variant="primary"
                                    onClick={scrollToPricing}
                                    tracking="cta_ver_planes_profesionales"
                                >
                                    Ver planes y precios
                                </CTAButton>
                                <CTAButton
                                    variant="secondary"
                                    onClick={() => scrollToForm()}
                                    tracking="cta_asesoria_profesionales"
                                >
                                    Agendar asesoría
                                </CTAButton>
                            </div>

                            <div className="mt-3 text-xs font-inter" style={{ color: '#6b7280' }}>
                                7 días gratis · Sin compromiso · Cancela cuando quieras
                            </div>
                        </div>

                        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 shadow-sm">
                            <div className="aspect-video bg-gray-200 rounded-xl flex items-center justify-center">
                                <div className="text-6xl">💼</div>
                            </div>
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
                            El riesgo que corres hoy
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mb-12">
                        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8">
                            <div className="text-5xl mb-4">📱</div>
                            <h3 className="text-xl font-poppins font-bold mb-3" style={{ color: '#121212' }}>
                                Si te bloquean la cuenta...
                            </h3>
                            <p className="text-sm font-inter mb-4" style={{ color: '#4b5563' }}>
                                Pierdes 200-1,000 contactos de clientes, aliados y leads acumulados en años
                            </p>
                            <div className="p-4 bg-white rounded-xl border border-red-100">
                                <div className="text-2xl font-mono font-extrabold text-red-600">
                                    30-50%
                                </div>
                                <div className="text-xs font-inter" style={{ color: '#4b5563' }}>
                                    de tus ingresos mensuales se evaporan
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8">
                            <div className="text-5xl mb-4">🤯</div>
                            <h3 className="text-xl font-poppins font-bold mb-3" style={{ color: '#121212' }}>
                                Cientos de chats sin estructura
                            </h3>
                            <p className="text-sm font-inter mb-4" style={{ color: '#4b5563' }}>
                                No sabes a quién dar seguimiento, qué prometiste, cuándo contactar
                            </p>
                            <div className="p-4 bg-white rounded-xl border border-orange-100">
                                <div className="text-2xl font-mono font-extrabold text-orange-600">
                                    2-3 horas/día
                                </div>
                                <div className="text-xs font-inter" style={{ color: '#4b5563' }}>
                                    respondiendo lo mismo una y otra vez
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8">
                            <div className="text-5xl mb-4">❄️</div>
                            <h3 className="text-xl font-poppins font-bold mb-3" style={{ color: '#121212' }}>
                                Contactos que se enfrían
                            </h3>
                            <p className="text-sm font-inter mb-4" style={{ color: '#4b5563' }}>
                                Leads tibios que olvidas seguir, aliados que no cultivas, clientes que no reactivas
                            </p>
                            <div className="p-4 bg-white rounded-xl border border-blue-100">
                                <div className="text-2xl font-mono font-extrabold" style={{ color: '#08C4F4' }}>
                                    20-30%
                                </div>
                                <div className="text-xs font-inter" style={{ color: '#4b5563' }}>
                                    de leads se pierden por olvido
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 bg-gray-50 rounded-2xl border border-gray-200">
                        <div className="flex items-start gap-4">
                            <div className="text-4xl">😰</div>
                            <div>
                                <p className="text-lg font-inter italic mb-3" style={{ color: '#121212' }}>
                                    "Si mañana me bloquean el WhatsApp, pierdo 5 años de contactos. Eso es mi negocio completo. No puedo dormir tranquilo así."
                                </p>
                                <div className="text-sm font-poppins font-semibold" style={{ color: '#4b5563' }}>
                                    — Asesor Inmobiliario, 800+ contactos activos
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
                        CloserCat: Tu red de contactos, protegida y organizada
                    </h2>
                    <p className="text-xl font-inter mb-8" style={{ color: '#4b5563' }}>
                        Reemplaza WhatsApp manual con un sistema que combina:
                    </p>

                    <div className="grid md:grid-cols-3 gap-6 text-left">
                        <div className="p-6 bg-white rounded-xl border border-gray-200">
                            <div className="text-3xl mb-3">💾</div>
                            <h3 className="font-poppins font-bold mb-2" style={{ color: '#121212' }}>Backup continuo</h3>
                            <p className="text-sm font-inter" style={{ color: '#6b7280' }}>
                                Snapshots cada 6 horas. Si pierdes tu teléfono, recuperas todo en minutos.
                            </p>
                        </div>

                        <div className="p-6 bg-white rounded-xl border border-gray-200">
                            <div className="text-3xl mb-3">📇</div>
                            <h3 className="font-poppins font-bold mb-2" style={{ color: '#121212' }}>CRM personal</h3>
                            <p className="text-sm font-inter" style={{ color: '#6b7280' }}>
                                Notas, etiquetas y recordatorios. Nunca olvidas dar seguimiento.
                            </p>
                        </div>

                        <div className="p-6 bg-white rounded-xl border border-gray-200">
                            <div className="text-3xl mb-3">🤖</div>
                            <h3 className="font-poppins font-bold mb-2" style={{ color: '#121212' }}>IA asistente</h3>
                            <p className="text-sm font-inter" style={{ color: '#6b7280' }}>
                                Responde consultas básicas 24/7. Tú te enfocas en cerrar negocios.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section ref={pricingSectionRef} className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-3xl font-poppins font-bold text-center mb-4" style={{ color: '#121212' }}>
                        Elige tu nivel de protección
                    </h2>

                    <p className="text-center font-inter mb-12" style={{ color: '#4b5563' }}>
                        Planes diseñados para profesionales independientes
                    </p>

                    <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        <PricingCard
                            title="Plan Backup"
                            price="$30K"
                            period="/mes"
                            description="Para quien solo quiere asegurar que no pierde sus chats y contactos"
                            badge="Protección básica"
                            badgeColor="blue"
                            features={[
                                'Respaldo continuo de 1 número WhatsApp',
                                'Retención de 3 meses de historial',
                                'Exportación a Excel/CSV',
                                'Búsqueda básica de chats',
                                'Recuperación en caso de pérdida'
                            ]}
                            ctaText="Empezar backup ahora"
                            ctaAction={() => {
                                trackPricingCardClick('backup', 'Empezar backup ahora');
                                scrollToForm('Backup ($19K-29K)');
                            }}
                        />

                        <PricingCard
                            title="Plan CRM Personal"
                            price="$50K"
                            period="/mes"
                            description="Para consultores, asesores y coaches que viven de sus relaciones"
                            badge="Más popular"
                            badgeColor="green"
                            featured={true}
                            features={[
                                'Todo del Plan Backup',
                                'Fichas de contacto enriquecidas',
                                'Notas, etiquetas y recordatorios',
                                'Segmentación por tipo, ciudad, inactividad',
                                'Reportes básicos de actividad'
                            ]}
                            ctaText="Empezar ahora"
                            ctaAction={() => {
                                trackPricingCardClick('crm_personal', 'Empezar ahora');
                                scrollToForm('CRM Personal ($39K-49K)');
                            }}
                        />

                        <PricingCard
                            title="Plan CRM + IA"
                            price="$100K"
                            period="/mes"
                            description="Para quien atiende muchos nuevos contactos y necesita automatización inteligente"
                            badge="Automatización completa"
                            badgeColor="purple"
                            features={[
                                'Todo del Plan CRM Personal',
                                'Contestador automático con IA (50-100 respuestas/mes)',
                                'Knowledge Base administrable',
                                'Clasificación inteligente de mensajes',
                                'Borradores de mensajes personalizados'
                            ]}
                            ctaText="Empezar prueba gratis"
                            ctaAction={() => {
                                trackPricingCardClick('crm_ai', 'Empezar prueba gratis');
                                scrollToForm('CRM + IA ($79K-99K)');
                            }}
                        />
                    </div>
                </div>
            </section>

            {/* Value Propositions */}
            <section className="bg-gray-50 py-20">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-4xl font-poppins font-extrabold text-center mb-16" style={{ color: '#121212' }}>
                        Cómo CloserCat protege y potencia tu negocio
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
            <section className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-4xl font-poppins font-extrabold text-center mb-12" style={{ color: '#121212' }}>
                        Cómo funciona
                    </h2>

                    <div className="grid md:grid-cols-4 gap-6">
                        {[
                            { num: '1', title: 'Registro', desc: 'Crea tu cuenta en 2 minutos' },
                            { num: '2', title: 'Conexión WhatsApp', desc: 'Conecta tu número actual o uno nuevo' },
                            { num: '3', title: 'Configuración', desc: 'Personaliza notas, etiquetas y Knowledge Base' },
                            { num: '4', title: 'Automatización', desc: 'El backup y la IA empiezan a trabajar 24/7' },
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

            {/* Social Proof */}
            <section className="py-12 bg-gray-50">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <p className="text-sm font-inter mb-6" style={{ color: '#6b7280' }}>Profesionales que confían en CloserCat</p>

                    <div className="grid grid-cols-3 gap-8">
                        <div>
                            <div className="text-4xl font-mono font-bold" style={{ color: '#8336FF' }}>50K+</div>
                            <div className="text-sm font-inter" style={{ color: '#6b7280' }}>Contactos respaldados</div>
                        </div>
                        <div>
                            <div className="text-4xl font-mono font-bold" style={{ color: '#08C4F4' }}>15 horas/sem</div>
                            <div className="text-sm font-inter" style={{ color: '#6b7280' }}>Tiempo ahorrado</div>
                        </div>
                        <div>
                            <div className="text-4xl font-mono font-bold" style={{ color: '#8336FF' }}>78%</div>
                            <div className="text-sm font-inter" style={{ color: '#6b7280' }}>Consultas automatizadas</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Risk Reversal */}
            <section className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-3xl font-poppins font-bold text-center mb-8" style={{ color: '#121212' }}>
                        Prueba sin riesgo
                    </h2>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center p-6 bg-gray-50 rounded-xl border border-gray-200">
                            <div className="text-4xl mb-3">✅</div>
                            <h3 className="font-poppins font-bold mb-2" style={{ color: '#121212' }}>7 días gratis</h3>
                            <p className="text-sm font-inter" style={{ color: '#6b7280' }}>
                                Prueba cualquier plan sin pagar nada
                            </p>
                        </div>

                        <div className="text-center p-6 bg-gray-50 rounded-xl border border-gray-200">
                            <div className="text-4xl mb-3">🔓</div>
                            <h3 className="font-poppins font-bold mb-2" style={{ color: '#121212' }}>Sin compromiso</h3>
                            <p className="text-sm font-inter" style={{ color: '#6b7280' }}>
                                No pedimos tarjeta de crédito para empezar
                            </p>
                        </div>

                        <div className="text-center p-6 bg-gray-50 rounded-xl border border-gray-200">
                            <div className="text-4xl mb-3">↩️</div>
                            <h3 className="font-poppins font-bold mb-2" style={{ color: '#121212' }}>Cancela cuando quieras</h3>
                            <p className="text-sm font-inter" style={{ color: '#6b7280' }}>
                                Sin penalización. Mantienes acceso a tus backups por 30 días
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Form Section */}
            <div ref={formRef}>
                <ProfesionalesIndependientesForm
                    preSelectedPlan={typeof window !== 'undefined' ? sessionStorage.getItem('preSelectedPlan') || '' : ''}
                />
            </div>

            {/* FAQs */}
            <section className="py-16 bg-white">
                <div className="max-w-3xl mx-auto px-6">
                    <h2 className="text-4xl font-poppins font-extrabold text-center mb-12" style={{ color: '#121212' }}>
                        Preguntas frecuentes
                    </h2>

                    <div className="space-y-6">
                        {[
                            {
                                q: '¿Necesito WhatsApp Business API?',
                                a: 'Depende del plan. Plan Backup funciona con tu WhatsApp normal. Planes con IA requieren WhatsApp Business API (te ayudamos a configurarlo).',
                            },
                            {
                                q: '¿Qué pasa si cambio de número?',
                                a: 'Puedes migrar tu backup al nuevo número sin perder historial. El proceso toma menos de 24 horas.',
                            },
                            {
                                q: '¿Puedo exportar mis datos en cualquier momento?',
                                a: 'Sí, exportación ilimitada a Excel/CSV/JSON. Tus datos son tuyos.',
                            },
                            {
                                q: '¿Cómo funciona el límite de 50-100 respuestas IA/mes?',
                                a: 'Solo cuentan las respuestas automáticas de la IA. Mensajes manuales no consumen cuota. Si necesitas más, puedes comprar paquetes adicionales.',
                            },
                            {
                                q: '¿Puedo cancelar en cualquier momento?',
                                a: 'Sí, sin penalización. Mantienes acceso a tus backups por 30 días adicionales.',
                            },
                            {
                                q: '¿Mis contactos verán que uso un bot?',
                                a: 'No. La IA responde desde tu número normal. Puedes configurar si quieres que se identifique o no.',
                            },
                            {
                                q: '¿Qué tan seguro es el backup?',
                                a: 'Encriptación end-to-end en tránsito y en reposo. Servidores en AWS con certificación SOC2. Solo tú tienes acceso a tus datos.',
                            },
                            {
                                q: '¿Puedo probar antes de pagar?',
                                a: 'Sí, 7 días gratis en cualquier plan. No pedimos tarjeta de crédito.',
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
