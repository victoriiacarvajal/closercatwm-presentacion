import React from 'react';
import ResourceLayout from '../ResourceLayout';

export default function Falla7PersuasionAusente() {
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "El Bot que Solo Informa (Pero Nunca Vende): El error del recepcionista digital",
        "author": {
            "@type": "Person",
            "name": "CloserCat Research Team"
        },
        "publisher": {
            "@type": "Organization",
            "name": "CloserCat",
            "url": "https://closercat.pro"
        },
        "datePublished": "2026-02-03",
        "description": "El 85% de los bots se limitan a responder preguntas, dejando la venta en manos del cliente. Aprende a convertir tu chat en un vendedor proactivo."
    };

    return (
        <ResourceLayout
            title="El Bot que Solo Informa (Pero Nunca Vende): El error del recepcionista digital"
            subtitle="Responder dudas no es vender. La mayoría de empresas tienen un excelente servicio al cliente, pero una pésima estrategia de cierre."
            category="Estrategia Comercial"
            readTime="9 min lectura"
            date="Febrero 3, 2026"
            keyTakeaways={[
                "Ping Pong Informativo: Responder preguntas indefinidamente sin avanzar hacia el cierre.",
                "Síndrome del Recepcionista: Tu bot es amable y útil, pero pasivo. Espera órdenes en lugar de guiar.",
                "La Regla del CTA: Cada mensaje debe terminar con una pregunta o una llamada a la acción.",
                "Solución: Scripts persuasivos que lideren la conversación."
            ]}
        >
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />

            <p className="lead text-xl md:text-2xl font-medium text-brand-black/80 border-b border-brand-gray-smoke pb-8 font-poppins">
                Si tu estrategia de WhatsApp es "esperar a que el cliente pregunte y responder", no estás vendiendo, estás despachando.
            </p>

            <p className="text-xl text-gray-700 leading-relaxed mb-10">
                Existe una confusión fundamental entre <strong>Soporte</strong> (reactivo) y <strong>Ventas</strong> (proactivo). La mayoría de implementaciones de WhatsApp Business, incluso con IA, están diseñadas para soporte, no para conversión.
            </p>

            <div className="bg-brand-gray-smoke border-l-4 border-orange-500 p-8 my-10 not-italic rounded-r-2xl">
                <h3 className="font-poppins font-bold text-orange-600 text-xs uppercase tracking-widest mb-3">La Falla Más Común</h3>
                <p className="mb-0 text-gray-700 text-xl leading-relaxed">
                    Es el patrón con mayor prevalencia en nuestro estudio: el <strong className="text-orange-600">85.7%</strong> de las conversaciones carecen de intentos de cierre o dirección proactiva.
                </p>
            </div>

            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-brand-black mt-24 mb-10 tracking-tight leading-tight">La Trampa del "Ping Pong"</h2>

            <p className="text-xl text-gray-700 leading-relaxed mb-10">
                El "Ping Pong Informativo" es una muerte lenta para la venta. Se ve así:
            </p>

            <ul className="space-y-6 my-16">
                <li className="text-xl text-gray-700 leading-relaxed">
                    — Cliente: "¿Tienen color rojo?" <br />
                    — Empresa: "Sí, sí tenemos." (Silencio...)
                </li>
                <li className="text-xl text-gray-700 leading-relaxed">
                    — Cliente: "¿Y qué garantía tiene?" <br />
                    — Empresa: "1 año." (Silencio...)
                </li>
                <li className="text-xl text-gray-700 leading-relaxed">
                    — Cliente: "Ah, bueno, gracias." <br />
                    — Empresa: "De nada."
                </li>
            </ul>

            <p className="text-xl text-gray-700 leading-relaxed mb-10">
                En este escenario, la carga de mantener viva la conversación recae 100% en el cliente. Y el cliente siempre elegirá el camino de menor resistencia: dejar de escribir.
            </p>

            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-brand-black mt-24 mb-10 tracking-tight leading-tight">El Principio de Liderazgo Conversacional</h2>

            <p className="text-xl text-gray-700 leading-relaxed mb-10">
                El vendedor (sea humano o bot) <strong>siempre</strong> debe tener el control del siguiente paso.
            </p>

            <blockquote className="border-l-4 border-brand-blue-primary bg-brand-gray-smoke p-12 my-20 not-italic rounded-r-xl text-2xl text-gray-800 font-medium leading-relaxed">
                "Nunca termines un mensaje con un punto final. Termínalo con una pregunta."
            </blockquote>

            <p className="text-xl text-gray-700 leading-relaxed mb-10">
                Mira la diferencia: <br /><br />
                — Empresa: "Sí tenemos en rojo. <strong>¿Te gustaría ver fotos de cómo luce o prefieres ver la talla?</strong>"
            </p>

            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-brand-black mt-24 mb-10 tracking-tight leading-tight">Convertir Información en Argumentos</h2>

            <p className="text-xl text-gray-700 leading-relaxed mb-10">
                Un "Bot Recepcionista" entrega datos crudos. Un "Cyborg Vendedor" contextualiza el dato para el beneficio del cliente.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
                <div className="bg-brand-gray-smoke/50 border border-gray-100 rounded-3xl p-8 transition-all hover:bg-white hover:shadow-xl group/card">
                    <h4 className="font-poppins font-bold text-brand-black mb-3 text-xl group-hover/card:text-brand-purple-closer transition-colors tracking-tight">Informativo (Pasivo)</h4>
                    <p className="text-base text-gray-600 leading-relaxed font-inter">"El curso dura 4 semanas y es online."</p>
                </div>
                <div className="bg-brand-gray-smoke/50 border border-gray-100 rounded-3xl p-8 transition-all hover:bg-white hover:shadow-xl group/card">
                    <h4 className="font-poppins font-bold text-brand-black mb-3 text-xl group-hover/card:text-brand-blue-primary transition-colors tracking-tight">Persuasivo (Activo)</h4>
                    <p className="text-base text-gray-600 leading-relaxed font-inter">"Al ser 100% online y durar solo 4 semanas, podrás certificarte antes de fin de mes sin pausar tu trabajo actual. ¿Te interesa empezar esta semana?"</p>
                </div>
            </div>

            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-brand-black mt-24 mb-10 tracking-tight leading-tight">Preguntas Frecuentes sobre Scripts de Venta</h2>

            <h3 className="text-3xl md:text-4xl font-poppins font-bold text-brand-black mt-20 mb-8 tracking-tight leading-tight">¿No es muy agresivo preguntar siempre?</h3>
            <p className="text-xl text-gray-700 leading-relaxed mb-10">
                No si la pregunta genuinamente ayuda al cliente a avanzar. Preguntar "¿Qué medio de pago prefieres?" es ayudar, no presionar. Dejar el chat en silencio sí es grosero.
            </p>

            <div className="h-12" />

            <h3 className="text-3xl md:text-4xl font-poppins font-bold text-brand-black mt-20 mb-8 tracking-tight leading-tight">¿La IA puede ser persuasiva?</h3>
            <p className="text-xl text-gray-700 leading-relaxed mb-10">
                Sí, pero debe ser entrenada con <a href="/recursos/falla-2-memoria-inexistente" className="text-brand-purple-closer hover:underline font-semibold">contexto de ventas</a>, no solo con manuales técnicos. Necesita instrucciones sobre tono, cierre y manejo de objeciones.
            </p>

            <div className="bg-brand-gray-smoke/30 border-l-4 border-brand-blue-primary p-6 my-12 rounded-r-xl">
                <p className="text-base text-gray-700 mb-0">
                    <strong className="text-brand-black">Metodología:</strong> Análisis del Patrón #5 (Ausencia de Persuasión) en 14 empresas latinas. <a href="/recursos/estudio-anatomia-conversaciones" className="text-brand-purple-closer hover:underline">Ver estudio completo</a>.
                </p>
            </div>

            <div className="my-16 bg-gradient-brand-subtle border border-brand-purple-closer/20 rounded-[2.5rem] p-10 md:p-14 text-center">
                <h3 className="text-brand-black font-poppins font-bold text-2xl md:text-3xl mb-4 tracking-tight">Convierte tu IA en tu Mejor Vendedor</h3>
                <p className="text-gray-700 mb-6 max-w-lg mx-auto font-inter text-xl">
                    Deja de informar y empieza a cerrar. Diseñamos scripts que guían, persuaden y venden.
                </p>
                <a
                    href="https://calendar.app.google/e84524233"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-brand-black rounded-full hover:bg-brand-purple-closer hover:shadow-lg hover:-translate-y-1"
                >
                    Mejorar mis Scripts
                </a>
            </div>
        </ResourceLayout>
    );
}
