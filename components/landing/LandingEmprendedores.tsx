import React, { useEffect, useState } from 'react';
import Badge from '../shared/Badge';
import CTAButton from '../shared/CTAButton';
import ValuePropCard from '../shared/ValuePropCard';
import UseCaseCard from '../shared/UseCaseCard';
import ConversationSimulator from '../shared/ConversationSimulator';
import FormSection from '../shared/FormSection';
import Header from '../shared/Header';
import { clarityEvent } from '../../utils/tracking';

export default function LandingEmprendedores() {
    useEffect(() => {
        clarityEvent('landing_emprendedores_view');
    }, []);

    const scrollToSimulator = () => {
        document.getElementById('simulator')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-white">
            <Header showNav={false} ctaText="Solicitar cotización" ctaAction={scrollToSimulator} />

            {/* Hero Section */}
            <section className="py-16 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <Badge color="blue" icon="🚀">
                                Para Equipos Comerciales y Operaciones de Ventas
                            </Badge>

                            <h1 className="text-5xl font-poppins font-extrabold leading-tight mb-4 mt-4" style={{ color: '#121212' }}>
                                Centraliza los WhatsApp de tu equipo comercial sin perder la cercanía del número personal
                            </h1>

                            <p className="text-xl font-inter mb-6" style={{ color: '#4b5563' }}>
                                Sincroniza todos los números de tus vendedores en una plataforma unificada. Migra gradualmente a WhatsApp API sin perder clientes.
                            </p>

                            <div className="space-y-3 mb-8">
                                <div className="flex items-start gap-3">
                                    <div className="mt-1 h-2.5 w-2.5 rounded-full" style={{ backgroundColor: '#08C4F4' }} />
                                    <div className="font-inter" style={{ color: '#121212' }}>
                                        <strong>Sincronización multi-número:</strong> Todos los WhatsApp en un solo dashboard
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="mt-1 h-2.5 w-2.5 rounded-full" style={{ backgroundColor: '#08C4F4' }} />
                                    <div className="font-inter" style={{ color: '#121212' }}>
                                        <strong>Knowledge Base unificado:</strong> Respuestas consistentes para todo el equipo
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="mt-1 h-2.5 w-2.5 rounded-full" style={{ backgroundColor: '#08C4F4' }} />
                                    <div className="font-inter" style={{ color: '#121212' }}>
                                        <strong>Migración gradual:</strong> Invitaciones automáticas para adoptar número institucional
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <CTAButton
                                    variant="primary"
                                    onClick={scrollToSimulator}
                                    tracking="cta_hero_quote"
                                >
                                    Solicitar cotización personalizada
                                </CTAButton>
                            </div>

                            <div className="mt-3 text-xs font-inter" style={{ color: '#6b7280' }}>
                                Cotización en 24h · Configuración a medida · Sin compromiso
                            </div>
                        </div>

                        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 shadow-sm overflow-hidden">
                            <img
                                src="/closercat-imagen-celular.png"
                                alt="CloserCat Dashboard Unificado"
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
                            El caos de gestionar ventas con WhatsApp personal
                        </h2>
                        <p className="text-xl font-inter" style={{ color: '#4b5563' }}>
                            Cuando cada vendedor usa su propio número, pierdes el control
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-xl border border-gray-200">
                            <div className="text-4xl mb-4">🔍</div>
                            <h3 className="font-bold mb-2 text-lg" style={{ color: '#121212' }}>Pérdida de Control</h3>
                            <p className="text-sm text-gray-600">No sabes qué se promete o negocia. 70% de gerentes no tienen visibilidad real de los leads.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-gray-200">
                            <div className="text-4xl mb-4">🤯</div>
                            <h3 className="font-bold mb-2 text-lg" style={{ color: '#121212' }}>Conocimiento Disperso</h3>
                            <p className="text-sm text-gray-600">Cada vendedor responde diferente. Precios inconsistentes. El onboarding toma meses.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-gray-200">
                            <div className="text-4xl mb-4">💔</div>
                            <h3 className="font-bold mb-2 text-lg" style={{ color: '#121212' }}>Fuga de Clientes</h3>
                            <p className="text-sm text-gray-600">Si un vendedor renuncia, se lleva los clientes y el historial en su WhatsApp personal.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Solution Intro */}
            <section className="bg-white py-20">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-extrabold mb-4" style={{ color: '#111827' }}>
                            De WhatsApp personal a operación profesional
                        </h2>
                        <p className="text-xl text-gray-600">
                            Sincroniza, centraliza y migra gradualmente
                        </p>
                    </div>

                    <div className="space-y-12">
                        <ValuePropCard
                            icon="🔄"
                            title="Sincroniza todos los números"
                            feature="Conecta los WhatsApp personales de tu equipo a una cuenta central sin que cambien de número."
                            capability="Obtienes visibilidad completa de todas las conversaciones en un solo dashboard compartido."
                            benefit="<strong>Control total</strong> de tu operación comercial sin interrumpir el flujo de trabajo actual."
                            imagePosition="right"
                        />

                        <ValuePropCard
                            icon="📚"
                            title="Knowledge Base Unificado"
                            feature="Crea una base de conocimiento centralizada que todo el equipo y la IA pueden usar."
                            capability="Asegura que todos den la misma información sobre precios, stock y políticas."
                            benefit="<strong>Respuestas consistentes</strong> y onboarding de nuevos vendedores en días, no meses."
                            imagePosition="left"
                        />

                        <ValuePropCard
                            icon="🚀"
                            title="Migración Gradual a API"
                            feature="Sistema de invitaciones automáticas para mover clientes al número institucional institucional poco a poco."
                            capability="Permite profesionalizar la operación sin forzar un cambio abrupto que haga perder clientes."
                            benefit="<strong>Transición sin fricción</strong> hacia una operación 100% profesional y escalable."
                            imagePosition="right"
                        />
                    </div>
                </div>
            </section>

            {/* Cotización Section (Replaces Pricing) */}
            <section id="simulator" className="py-20 bg-gradient-to-b from-blue-50 to-white">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <Badge color="purple" icon="💰">Cotización Personalizada</Badge>
                        <h2 className="text-3xl font-poppins font-bold mb-4 mt-4" style={{ color: '#121212' }}>
                            Simula tu inversión mensual
                        </h2>
                        <p className="text-xl font-inter" style={{ color: '#4b5563' }}>
                            Cada operación es única. Configura tu equipo y volumen para obtener un estimado preciso.
                        </p>
                    </div>

                    <ConversationSimulator />

                    <div className="mt-8 text-center max-w-3xl mx-auto">
                        <p className="font-inter text-sm" style={{ color: '#6b7280' }}>
                            💡 <strong>Modelo flexible:</strong> El costo se ajusta a tu número de comerciales y volumen real. Incluye soporte prioritario y actualizaciones continuas.
                        </p>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-4xl font-extrabold text-center mb-12" style={{ color: '#111827' }}>
                        Cómo funciona el proceso
                    </h2>

                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { num: '1', title: 'Diagnóstico', desc: 'Analizamos tu operación actual y necesidades' },
                            { num: '2', title: 'Sincronización', desc: 'Conectamos los WhatsApp de tu equipo a la plataforma' },
                            { num: '3', title: 'Configuración', desc: 'Cargamos tu Knowledge Base y flujos de venta' },
                            { num: '4', title: 'Migración', desc: 'Activamos invitaciones para mover clientes gradualmente' },
                        ].map((step) => (
                            <div key={step.num} className="text-center relative">
                                <div className="w-12 h-12 rounded-full bg-blue-600 text-white font-bold text-xl flex items-center justify-center mx-auto mb-4 relative z-10">
                                    {step.num}
                                </div>
                                {step.num !== '4' && (
                                    <div className="hidden md:block absolute top-6 left-1/2 w-full h-0.5 bg-gray-200 -z-0"></div>
                                )}
                                <h3 className="font-bold mb-2" style={{ color: '#111827' }}>{step.title}</h3>
                                <p className="text-sm" style={{ color: '#6b7280' }}>{step.desc}</p>
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
                                q: '¿Mis vendedores pierden acceso a su WhatsApp personal?',
                                a: 'No. La sincronización funciona en paralelo. Ellos siguen usando su WhatsApp normalmente, pero tú obtienes visibilidad completa en el dashboard.',
                            },
                            {
                                q: '¿Cómo funciona la migración gradual?',
                                a: 'Configuramos mensajes automáticos que invitan a tus clientes a guardar el nuevo número institucional para obtener beneficios (soporte más rápido, catálogo actualizado, etc.).',
                            },
                            {
                                q: '¿Qué pasa si un vendedor renuncia?',
                                a: 'Al tener los contactos centralizados, la empresa conserva la relación. Puedes reasignar esos clientes a otro vendedor inmediatamente.',
                            },
                            {
                                q: '¿Se requiere tarjeta de crédito para cotizar?',
                                a: 'No. La cotización es gratuita y sin compromiso. Nuestro equipo analizará tu caso para darte la mejor propuesta.',
                            },
                            {
                                q: '¿Integran con mi CRM actual?',
                                a: 'Sí. Tenemos integraciones nativas y vía API/Webhooks con los principales CRMs (HubSpot, Salesforce, Zoho, Pipedrive, etc.).',
                            },
                            {
                                q: '¿Cómo se calcula el costo mensual?',
                                a: 'Se basa en el volumen de conversaciones, número de asientos (vendedores) y módulos adicionales que requieras.',
                            },
                        ].map((faq, index) => (
                            <div key={index} className="bg-white p-6 rounded-xl border border-gray-200">
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
