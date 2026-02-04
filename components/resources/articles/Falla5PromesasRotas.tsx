import React from 'react';
import ResourceLayout from '../ResourceLayout';

export default function Falla5PromesasRotas() {
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "La Gran Mentira de la Bienvenida: Por qué tu mensaje de saludo te está costando clientes",
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
        "description": "El 78% de los leads se sienten decepcionados tras el primer mensaje. Descubre cómo alinear expectativas y evitar el 'Link Dump' que mata la conversión."
    };

    return (
        <ResourceLayout
            title="La Gran Mentira de la Bienvenida: Por qué tu saludo mata la venta"
            subtitle="Prometes atención inmediata, pero entregas un menú de opciones frío y genérico. El Patrón #1 de abandono en WhatsApp."
            category="Expectativas"
            readTime="8 min lectura"
            date="Febrero 3, 2026"
            keyTakeaways={[
                "El 'Link Dump': Enviar un PDF o link de precios en el primer mensaje reduce la respuesta en un 60%.",
                "Falsa Inmediatez: Responder en 1 segundo no sirve si la respuesta es irrelevante.",
                "Efecto Recepcionista: Tu bot actúa como barrera, no como anfitrión.",
                "Solución: Bienvenida Contextual que reconozca la intención del cliente."
            ]}
        >
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />

            <p className="lead text-xl md:text-2xl font-medium text-brand-black/80 border-b border-brand-gray-smoke pb-8 font-poppins">
                El cliente escribe esperando hablar con un experto. Tú le respondes con un directorio telefónico.
            </p>

            <p className="text-xl text-gray-700 leading-relaxed mb-10">
                Es la disonancia cognitiva más común en el comercio conversacional: tu publicidad promete "Atención Personalizada", pero tu WhatsApp entrega "Autoservicio Burocrático".
            </p>

            <div className="bg-brand-gray-smoke border-l-4 border-orange-500 p-8 my-10 not-italic rounded-r-2xl">
                <h3 className="font-poppins font-bold text-orange-600 text-xs uppercase tracking-widest mb-3">Dato del Estudio</h3>
                <p className="mb-0 text-gray-700 text-xl leading-relaxed">
                    Identificamos que el <strong className="text-orange-600">78.6%</strong> de las empresas fallan en este primer contacto, generando una caída inmediata en la confianza.
                </p>
            </div>

            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-brand-black mt-24 mb-10 tracking-tight leading-tight">La Anatomía del "Link Dump"</h2>

            <p className="text-xl text-gray-700 leading-relaxed mb-10">
                El error técnico más frecuente es el "vómito de información" (Link Dump). Ocurre cuando, ante un "Hola, precio", el bot responde con:
            </p>

            <ul className="space-y-6 my-16">
                <li className="text-xl text-gray-700 leading-relaxed">
                    ❌ Un PDF de 15 páginas.
                </li>
                <li className="text-xl text-gray-700 leading-relaxed">
                    ❌ Un enlace a la web ("mira aquí").
                </li>
                <li className="text-xl text-gray-700 leading-relaxed">
                    ❌ Un menú de 8 opciones numéricas.
                </li>
            </ul>

            <p className="text-xl text-gray-700 leading-relaxed mb-10">
                Esto grita: "No tengo tiempo para ti, búscalo tú mismo". Y el cliente, que tiene otras 5 pestañas abiertas de tu competencia, simplemente se va.
            </p>

            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-brand-black mt-24 mb-10 tracking-tight leading-tight">Inmediatez vs. Relevancia</h2>

            <p className="text-xl text-gray-700 leading-relaxed mb-10">
                Hemos confundido velocidad con eficacia. Responder en 0.5 segundos con un mensaje genérico es peor que responder en 5 minutos con un mensaje relevante.
            </p>

            <blockquote className="border-l-4 border-brand-blue-primary bg-brand-gray-smoke p-12 my-20 not-italic rounded-r-xl text-2xl text-gray-800 font-medium leading-relaxed">
                "La gente no quiere respuestas rápidas; quiere soluciones rápidas. Un mensaje de bienvenida inútil es solo ruido veloz."
            </blockquote>

            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-brand-black mt-24 mb-10 tracking-tight leading-tight">Cómo arreglar tu Bienvenida (Matriz de Intención)</h2>

            <p className="text-xl text-gray-700 leading-relaxed mb-10">
                En lugar de un saludo único ("Hola, bienvenido a X"), debes implementar una <strong>Bienvenida Contextual</strong>.
            </p>

            <p className="text-xl text-gray-700 leading-relaxed mb-10">
                Si vienes de un anuncio de "Zapatos Rojos", el saludo debe ser: "Hola! Veo que te gustaron los zapatos rojos. ¿Qué talla buscas?".
            </p>

            <p className="text-xl text-gray-700 leading-relaxed mb-10">
                Esto requiere conectar tu pauta con tu <a href="/recursos/falla-3-automatizacion-mal-entendida" className="text-brand-purple-closer hover:underline font-semibold">estrategia de automatización</a>.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
                <div className="bg-brand-gray-smoke/50 border border-gray-100 rounded-3xl p-8 transition-all hover:bg-white hover:shadow-xl group/card">
                    <h4 className="font-poppins font-bold text-brand-black mb-3 text-xl group-hover/card:text-brand-purple-closer transition-colors tracking-tight">Bienvenida Genérica</h4>
                    <p className="text-base text-gray-600 leading-relaxed font-inter">"Hola, somos Empresa X. Aquí está nuestro menú: 1. Ventas, 2. Soporte..." (Tasa de respuesta: 12%)</p>
                </div>
                <div className="bg-brand-gray-smoke/50 border border-gray-100 rounded-3xl p-8 transition-all hover:bg-white hover:shadow-xl group/card">
                    <h4 className="font-poppins font-bold text-brand-black mb-3 text-xl group-hover/card:text-brand-blue-primary transition-colors tracking-tight">Bienvenida Contextual</h4>
                    <p className="text-base text-gray-600 leading-relaxed font-inter">"Hola! Vi que te interesó el modelo X. Excelente elección. ¿Lo buscas para uso personal o regalo?" (Tasa de respuesta: 45%)</p>
                </div>
            </div>

            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-brand-black mt-24 mb-10 tracking-tight leading-tight">Preguntas Frecuentes sobre Mensajes de Bienvenida</h2>

            <h3 className="text-3xl md:text-4xl font-poppins font-bold text-brand-black mt-20 mb-8 tracking-tight leading-tight">¿Debo dar el precio en el primer mensaje?</h3>
            <p className="text-xl text-gray-700 leading-relaxed mb-10">
                Nunca. El precio sin valor es solo un número caro. Antes de dar el precio, haz al menos una pregunta de cualificación que demuestre interés en su necesidad.
            </p>

            <div className="h-12" />

            <h3 className="text-3xl md:text-4xl font-poppins font-bold text-brand-black mt-20 mb-8 tracking-tight leading-tight">¿Es bueno usar botones en la bienvenida?</h3>
            <p className="text-xl text-gray-700 leading-relaxed mb-10">
                Sí, los botones reducen la fricción cognitiva. Pero úsalos para guiar la conversación ("Quiero comprar" / "Tengo dudas"), no para mandarlos a otro lado ("Ir a la web").
            </p>

            <div className="bg-brand-gray-smoke/30 border-l-4 border-brand-blue-primary p-6 my-12 rounded-r-xl">
                <p className="text-base text-gray-700 mb-0">
                    <strong className="text-brand-black">Metodología:</strong> Análisis de 159 conversaciones reales en 14 empresas del sector servicios y high-ticket en Latam. <a href="/recursos/estudio-anatomia-conversaciones" className="text-brand-purple-closer hover:underline">Ver estudio completo</a>.
                </p>
            </div>

            <div className="my-16 bg-gradient-brand-subtle border border-brand-purple-closer/20 rounded-[2.5rem] p-10 md:p-14 text-center">
                <h3 className="text-brand-black font-poppins font-bold text-2xl md:text-3xl mb-4 tracking-tight">Recupera el 60% de tus leads</h3>
                <p className="text-gray-700 mb-6 max-w-lg mx-auto font-inter text-xl">
                    Deja de quemar dinero en pauta para luego espantar a los clientes en la puerta.
                </p>
                <a
                    href="https://calendar.app.google/e84524233"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-brand-black rounded-full hover:bg-brand-purple-closer hover:shadow-lg hover:-translate-y-1"
                >
                    Auditar mi Bienvenida
                </a>
            </div>
        </ResourceLayout>
    );
}
