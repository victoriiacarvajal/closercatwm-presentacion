import React, { useEffect } from 'react';
import { ArrowLeft, Shield, Brain, Users, Zap } from 'lucide-react';
import { clarityEvent } from '../../utils/tracking';

const PILLARS = [
    {
        id: 'continuidad',
        icon: <Shield size={32} />,
        color: 'bg-red-100 text-red-700',
        category: 'Seguridad',
        title: 'La fragilidad de tu negocio: Por qué un bloqueo de WhatsApp cuesta millones',
        desc: 'El error no es técnico, es de diseño. Descubre por qué el 90% de los bloqueos son prevenibles.',
        link: '/recursos/falla-1-continuidad-rota',
        isNew: true
    },
    {
        id: 'memoria',
        icon: <Brain size={32} />,
        color: 'bg-blue-100 text-blue-700',
        category: 'Gestión Relacional',
        title: 'El Costo Oculto del Chat: Cuando tus clientes son efímeros',
        desc: 'WhatsApp no es un CRM. Aprende a separar el "flujo" del "capital" relacional.',
        link: '/recursos/falla-2-memoria-inexistente',
        isNew: true
    },
    {
        id: 'automatizacion',
        icon: <Zap size={32} />,
        color: 'bg-purple-100 text-purple-700',
        category: 'Automatización',
        title: 'La Paradoja de la Automatización: Por qué los bots puros matan la venta consultiva',
        desc: 'Los chatbots filtran, no cierran. Descubre el modelo híbrido.',
        link: '/recursos/falla-3-automatizacion-mal-entendida',
        isNew: true
    },
    {
        id: 'escalamiento',
        icon: <Users size={32} />,
        color: 'bg-orange-100 text-orange-700',
        category: 'Equipos',
        title: 'Silos de Silencio: Por qué tu equipo pierde contexto cada vez que escala',
        desc: 'Centralización sin sacrificar la identidad personal del vendedor.',
        link: '/recursos/falla-4-escalamiento-caotico',
        isNew: true
    }
];

export default function ResourcesHub() {
    useEffect(() => {
        clarityEvent('resources_hub_view');
    }, []);

    return (
        <div className="min-h-screen bg-[#fffef9] font-sans">
            {/* Navigation */}
            <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b border-gray-200 z-50 h-16 flex items-center justify-between px-6 lg:px-12">
                <a href="/" className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors">
                    <ArrowLeft size={20} />
                    <span className="font-medium hidden sm:inline">Volver al Home</span>
                </a>
                <div className="flex items-center gap-2">
                    <span className="text-2xl">🐈</span>
                    <span className="font-bold font-poppins text-lg">CloserCat Research</span>
                </div>
                <div className="w-8"></div> {/* Spacer */}
            </nav>

            <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <span className="inline-block bg-amber-100 text-amber-800 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                        Ciencia de Ventas
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold font-serif mb-6 text-gray-900">
                        Las 4 Fallas Estructurales del WhatsApp Comercial
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed font-serif">
                        No hablamos de "tips". Hablamos de los quiebres fundamentales que impiden escalar tu operación de ventas conversacionales.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {PILLARS.map((pillar) => (
                        <a
                            key={pillar.id}
                            href={pillar.link}
                            className="group bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl hover:border-amber-400 transition-all relative overflow-hidden flex flex-col"
                        >
                            <div className="mb-6 flex justify-between items-start">
                                <div className={`p-4 rounded-xl ${pillar.color} group-hover:scale-110 transition-transform`}>
                                    {pillar.icon}
                                </div>
                                {pillar.isNew && (
                                    <span className="bg-black text-white text-xs px-2 py-1 rounded uppercase font-bold tracking-wider">
                                        Nuevo
                                    </span>
                                )}
                            </div>

                            <span className="text-xs uppercase font-bold text-gray-400 mb-2 tracking-widest">
                                Falla Estructural: {pillar.category}
                            </span>

                            <h3 className="text-2xl font-bold font-serif text-gray-900 mb-4 group-hover:text-amber-700 transition-colors">
                                {pillar.title}
                            </h3>

                            <p className="text-gray-600 mb-6 leading-relaxed">
                                {pillar.desc}
                            </p>

                            <div className="mt-auto flex items-center gap-2 text-amber-700 font-bold text-sm">
                                Leer Diagnóstico <span className="group-hover:translate-x-1 transition-transform">→</span>
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
