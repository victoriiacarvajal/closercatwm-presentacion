import React, { useState, useEffect } from 'react';

const MESSAGES = [
    {
        category: "Narrativa de Marca",
        text: "CloserCat Pro es tu nuevo agente autónomo de ventas.",
        highlight: "No reemplaza a tus vendedores. Los libera para cerrar más."
    },
    {
        category: "Para Profesionales Independientes",
        text: "Si te bloquean WhatsApp, ¿pierdes tu negocio?",
        highlight: "Backup automático y CRM personal para proteger tus relaciones."
    },
    {
        category: "Para Emprendedores y PyMEs",
        text: "¿Tus vendedores usan su WhatsApp personal?",
        highlight: "Centralízalos en un dashboard unificado sin cambiar de número."
    },
    {
        category: "Para Sector Educación",
        text: "WhatsApp automatizado e integrado con Q10.",
        highlight: "Matrículas, soporte y cobranza en piloto automático."
    },
    {
        category: "Para Grandes Empresas",
        text: "¿Dudas sobre WhatsApp Business API?",
        highlight: "Pilotos a resultados: Solo pagas si cumplimos tus KPIs."
    },
    {
        category: "Filosofía CloserCat",
        text: "No somos un simple chatbot.",
        highlight: "Somos tu equipo comercial digital trabajando 24/7."
    }
];

export default function BrandMessagingCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFading, setIsFading] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsFading(true);
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % MESSAGES.length);
                setIsFading(false);
            }, 800); // 800ms fade out
        }, 6000); // Change every 6 seconds

        return () => clearInterval(interval);
    }, []);

    const currentMessage = MESSAGES[currentIndex];

    return (
        <section className="py-24 bg-gradient-to-b from-white to-gray-50 border-t border-gray-100 overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5"></div>

            <div className="max-w-4xl mx-auto px-6 relative z-10 min-h-[200px] flex flex-col items-center justify-center text-center">
                <div
                    className={`transition-all duration-1000 ease-in-out transform ${isFading ? 'opacity-0 translate-y-4 scale-95' : 'opacity-100 translate-y-0 scale-100'
                        }`}
                >
                    <div className="inline-block px-3 py-1 mb-6 rounded-full bg-purple-50 text-brand-purple-closer border border-purple-100 text-xs font-poppins font-semibold uppercase tracking-widest">
                        {currentMessage.category}
                    </div>

                    <h3 className="text-2xl md:text-4xl font-poppins font-light leading-snug text-gray-800 mb-6">
                        {currentMessage.text}
                    </h3>

                    <p className="text-xl md:text-2xl font-poppins font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                        {currentMessage.highlight}
                    </p>
                </div>

                {/* Indicators */}
                <div className="flex gap-2 mt-12">
                    {MESSAGES.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => {
                                setIsFading(true);
                                setTimeout(() => {
                                    setCurrentIndex(idx);
                                    setIsFading(false);
                                }, 500);
                            }}
                            className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentIndex ? 'w-8 bg-brand-purple-closer' : 'w-2 bg-gray-200 hover:bg-gray-300'
                                }`}
                            aria-label={`Ir al mensaje ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
