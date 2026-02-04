import React, { useEffect } from 'react';
import { ArrowLeft, Shield, Brain, Users, Zap } from 'lucide-react';
import { clarityEvent } from '../../utils/tracking';

const PILLARS = [
    {
        id: 'continuidad',
        icon: <Shield size={32} />,
        color: 'bg-brand-gray-smoke text-red-600 border-red-100',
        category: 'Seguridad',
        title: 'La fragilidad de tu negocio: Por qué un bloqueo de WhatsApp cuesta millones',
        desc: 'El error no es técnico, es de diseño. Descubre por qué el 90% de los bloqueos son prevenibles.',
        link: '/recursos/falla-1-continuidad-rota',
        isNew: true
    },
    {
        id: 'memoria',
        icon: <Brain size={32} />,
        color: 'bg-brand-gray-smoke text-brand-blue-primary border-brand-blue-primary/30',
        category: 'Gestión Relacional',
        title: 'El Costo Oculto del Chat: Cuando tus clientes son efímeros',
        desc: 'WhatsApp no es un CRM. Aprende a separar el "flujo" del "capital" relacional.',
        link: '/recursos/falla-2-memoria-inexistente',
        isNew: true
    },
    {
        id: 'automatizacion',
        icon: <Zap size={32} />,
        color: 'bg-brand-gray-smoke text-brand-purple-closer border-brand-purple-closer/30',
        category: 'Automatización',
        title: 'La Paradoja de la Automatización: Por qué los bots puros matan la venta consultiva',
        desc: 'Los chatbots filtran, no cierran. Descubre el modelo híbrido.',
        link: '/recursos/falla-3-automatizacion-mal-entendida',
        isNew: true
    },
    {
        id: 'escalamiento',
        icon: <Users size={32} />,
        color: 'bg-brand-gray-smoke text-orange-600 border-orange-100',
        category: 'Equipos',
        title: 'Silos de Silencio: Por qué tu equipo pierde contexto cada vez que escala',
        desc: 'Centralización sin sacrificar la identidad personal del vendedor.',
        link: '/recursos/falla-4-escalamiento-caotico',
        isNew: true
    },
    {
        id: 'promesas',
        icon: <Zap size={32} />,
        color: 'bg-brand-gray-smoke text-red-500 border-red-100',
        category: 'Expectativas',
        title: 'La Gran Mentira de la Bienvenida: Por qué tu saludo mata la venta',
        desc: 'Prometes inmediatez, entregas burocracia. El error #1 en conversión.',
        link: '/recursos/falla-5-promesas-rotas',
        isNew: true
    },
    {
        id: 'silencio',
        icon: <Shield size={32} />,
        color: 'bg-brand-gray-smoke text-gray-600 border-gray-200',
        category: 'Gestión de Espera',
        title: 'El Silencio que Mata Ventas: Gestión de la espera en tiempos de inmediatez',
        desc: 'El 57% de las ventas se pierden por mala gestión del silencio.',
        link: '/recursos/falla-6-silencio-mortal',
        isNew: true
    },
    {
        id: 'persuasion',
        icon: <Brain size={32} />,
        color: 'bg-brand-gray-smoke text-brand-purple-closer border-brand-purple-closer/30',
        category: 'Estrategia Comercial',
        title: 'El Bot que Solo Informa (Pero Nunca Vende)',
        desc: 'La diferencia entre un recepcionista digital y un vendedor cyborg.',
        link: '/recursos/falla-7-persuasion-ausente',
        isNew: true
    }
];

export default function ResourcesHub() {
    useEffect(() => {
        clarityEvent('resources_hub_view');
    }, []);

    return (
        <div className="min-h-screen bg-white font-inter text-brand-black">
            {/* Navigation */}
            <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b border-gray-200 z-50 h-16 flex items-center justify-between px-6 lg:px-12">
                <a href="/" className="flex items-center gap-2 text-gray-500 hover:text-brand-purple-closer transition-colors font-poppins text-sm font-medium">
                    <ArrowLeft size={18} />
                    <span className="hidden sm:inline">Volver al Home</span>
                </a>
                <a href="/" className="hover:opacity-80 transition-opacity">
                    <img
                        src="/logo-closercat.png"
                        alt="CloserCat Pro"
                        className="h-10 w-auto"
                    />
                </a>
                <div className="w-8"></div> {/* Spacer */}
            </nav>

            <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <span className="inline-block bg-brand-purple-closer/10 text-brand-purple-closer px-4 py-1 rounded-full text-xs font-poppins font-bold uppercase tracking-widest mb-6">
                        Ciencia de Ventas
                    </span>
                    <h1 className="text-4xl md:text-6xl font-poppins font-extrabold mb-6 text-brand-black tracking-tight">
                        Las 7 Fallas Estructurales del WhatsApp Comercial
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed font-inter">
                        No explicamos "trucos". Diseccionamos los 7 errores de diseño que están saboteando tu máquina de ventas (y cómo corregirlos).
                    </p>
                </div>

                {/* ICP Filter */}
                <div className="flex flex-wrap justify-center gap-3 mb-16">
                    <button className="px-5 py-2.5 rounded-full text-sm font-poppins font-semibold bg-brand-purple-closer text-white shadow-sm hover:shadow-md transition-all">
                        Todos
                    </button>
                    <button className="px-5 py-2.5 rounded-full text-sm font-poppins font-semibold bg-gray-100 text-gray-600 hover:bg-brand-purple-closer/10 hover:text-brand-purple-closer transition-all">
                        Para Independientes
                    </button>
                    <button className="px-5 py-2.5 rounded-full text-sm font-poppins font-semibold bg-gray-100 text-gray-600 hover:bg-brand-purple-closer/10 hover:text-brand-purple-closer transition-all">
                        Para Equipos
                    </button>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {PILLARS.map((pillar) => (
                        <a
                            key={pillar.id}
                            href={pillar.link}
                            className="group bg-white border border-gray-100 rounded-3xl p-8 hover:shadow-2xl hover:border-brand-purple-closer transition-all relative overflow-hidden flex flex-col"
                        >
                            <div className="mb-8 flex justify-between items-start">
                                <div className={`p-4 rounded-2xl ${pillar.color} group-hover:scale-110 transition-transform shadow-sm`}>
                                    {pillar.icon}
                                </div>
                                {pillar.isNew && (
                                    <span
                                        className="text-white text-[10px] px-3 py-1 rounded-full uppercase font-bold tracking-tighter shadow-lg"
                                        style={{ background: 'linear-gradient(135deg, #08C4F4 0%, #8336FF 100%)' }}
                                    >
                                        Nuevo
                                    </span>
                                )}
                            </div>

                            <span className="text-[10px] uppercase font-bold text-gray-400 mb-3 tracking-[0.2em] font-poppins">
                                Falla Estructural: {pillar.category}
                            </span>

                            <h3 className="text-2xl font-poppins font-bold text-brand-black mb-4 group-hover:text-brand-purple-closer transition-colors">
                                {pillar.title}
                            </h3>

                            <p className="text-gray-500 mb-8 leading-relaxed font-inter text-sm">
                                {pillar.desc}
                            </p>

                            <div className="mt-auto flex items-center gap-2 text-brand-purple-closer font-poppins font-bold text-xs uppercase tracking-wider">
                                Analizar Diagnóstico <span className="text-brand-blue-primary group-hover:translate-x-1 transition-transform">→</span>
                            </div>
                        </a>
                    ))}
                </div>

                {/* Featured Study Box */}
                <div className="mt-20 bg-gray-900 rounded-3xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1">
                        <span className="text-amber-400 font-bold uppercase tracking-widest text-xs mb-4 block">
                            Investigación Fundacional
                        </span>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                            Anatomía de las Conversaciones que Fallan
                        </h2>
                        <p className="text-gray-400 text-lg mb-8">
                            Analizamos 14 empresas y descubrimos por qué el 85.7% de los chatbots pierden clientes por falta de diseño persuasivo.
                        </p>
                        <a href="/recursos/estudio-anatomia-conversaciones" className="inline-block bg-white text-black px-8 py-3 rounded-lg font-bold hover:bg-amber-400 transition-colors">
                            Leer Estudio Completo
                        </a>
                    </div>
                    <div className="md:w-1/3 flex justify-center">
                        <div className="text-9xl">🧬</div>
                    </div>
                </div>
            </main>
        </div>
    );
}
