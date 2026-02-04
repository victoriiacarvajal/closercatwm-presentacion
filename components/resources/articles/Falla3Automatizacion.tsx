import React from 'react';
import ResourceLayout from '../ResourceLayout';

export default function Falla3Automatizacion() {
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "La Paradoja de la Automatización: Por qué los bots puros matan la venta consultiva",
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
        "description": "Automatizar el 100% de la conversación reduce la conversión a cero en servicios de alto valor. Descubre el modelo Híbrido: Bots que filtran, Humanos que cierran."
    };

    return (
        <ResourceLayout
            title="La Paradoja de la Automatización: Por qué los bots puros matan la venta consultiva"
            subtitle="El sueño de 'vender mientras duermes' es una pesadilla de 'perder clientes mientras despiertas' si no entiendes la psicología de la confianza."
            category="Automatización"
            readTime="9 min lectura"
            date="Febrero 3, 2026"
            keyTakeaways={[
                "En ventas B2B o consultivas, la gente compra confianza, no commodities. Un bot no puede generar confianza.",
                "La 'automatización prematura' es la causa #1 de abandono. El cliente detecta el bot en <3 segundos.",
                "El rol de la IA no es reemplazar al vendedor, es quitarle el trabajo sucio (cualificación y agendamiento).",
                "Modelo CloserCat: IA para la logística del chat, Humano para la lógica de la venta."
            ]}
        >
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />

            <p className="lead text-lg md:text-xl font-medium text-brand-black/80 border-b border-brand-gray-smoke pb-8">
                Existe una obsesión peligrosa en el mercado: "Quiero un bot que venda por mí".
            </p>

            <p className="text-xl text-gray-700 leading-relaxed mb-10">
                Esta promesa, vendida por gurús de dropshipping, es letal para cualquier negocio que venda servicios, consultoría o productos de alto valor (High-Ticket).
            </p>

            <p className="text-xl text-gray-700 leading-relaxed mb-10">
                Antes de automatizar, asegúrate de tener <a href="/recursos/falla-1-continuidad-rota" className="text-brand-purple-closer hover:underline font-semibold">continuidad operacional</a>. Un bot sin backup es un riesgo doble.
            </p>

            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-brand-black mt-24 mb-10 tracking-tight leading-tight">El Valle Inquietante de las Ventas</h2>

            <p className="text-xl text-gray-700 leading-relaxed mb-10">
                Cuanto más intenta un bot parecer humano sin serlo, más rechazo genera. En psicología esto se llama <em>The Uncanny Valley</em>.
            </p>

            <div className="bg-brand-gray-smoke border-l-4 border-orange-500 p-8 my-10 not-italic rounded-r-2xl">
                <h3 className="font-poppins font-bold text-orange-600 text-xs uppercase tracking-widest mb-3">El Costo del Valle Inquietante</h3>
                <p className="mb-0 text-gray-700 text-xl leading-relaxed">
                    En nuestro estudio, el 63% de los clientes abandonaron conversaciones donde detectaron respuestas "demasiado perfectas" o "demasiado rápidas" sin contexto humano.
                </p>
            </div>

            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-brand-black mt-24 mb-10 tracking-tight leading-tight">Filtros vs. Cierres: Entendiendo los Roles</h2>

            <p className="text-xl text-gray-700 leading-relaxed mb-10">
                La automatización no es el enemigo. El enemigo es usarla en la etapa incorrecta del embudo.
            </p>

            <h3 className="text-3xl md:text-4xl font-poppins font-bold text-brand-black mt-20 mb-8 tracking-tight leading-tight">Lo que SÍ debe hacer un Bot (Logística)</h3>
            <ul className="space-y-6 my-16">
                <li className="text-xl text-gray-700 leading-relaxed">Responder "¿Qué precio tiene?" a las 3 AM.</li>
                <li className="text-xl text-gray-700 leading-relaxed">Enviar el portafolio PDF.</li>
                <li className="text-xl text-gray-700 leading-relaxed">Agendar una cita en el calendario.</li>
                <li className="text-xl text-gray-700 leading-relaxed">Cualificar: "¿Eres empresa o persona?"</li>
            </ul>

            <h3 className="text-3xl md:text-4xl font-poppins font-bold text-brand-black mt-20 mb-8 tracking-tight leading-tight">Lo que NUNCA debe hacer un Bot (Lógica y Emoción)</h3>
            <ul className="space-y-6 my-16">
                <li className="text-xl text-gray-700 leading-relaxed">Manejar objeciones de precio ("Es muy caro").</li>
                <li className="text-xl text-gray-700 leading-relaxed">Entender matices ("Lo necesito, pero para el otro mes").</li>
                <li className="text-xl text-gray-700 leading-relaxed">Generar empatía y rapport.</li>
            </ul>

            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-brand-black mt-24 mb-10 tracking-tight leading-tight">El Modelo Híbrido de CloserCat</h2>

            <p className="text-xl text-gray-700 leading-relaxed mb-10">
                Nuestra propuesta es simple: <strong>Cyborg Sales.</strong>
            </p>

            <p className="text-xl text-gray-700 leading-relaxed mb-10">
                Usamos IA para detectar la intención y preparar el terreno, pero dejamos el tiro final al humano.
            </p>

            <p className="text-xl text-gray-700 leading-relaxed mb-10">
                Este modelo funciona especialmente bien cuando <a href="/recursos/falla-4-escalamiento-caotico" className="text-brand-purple-closer hover:underline font-semibold">gestionas equipos</a>, permitiendo supervisión sin microgestión.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
                <div className="bg-brand-gray-smoke/50 border border-gray-100 rounded-3xl p-8 transition-all hover:bg-white hover:shadow-xl group/card">
                    <h4 className="font-poppins font-bold text-brand-black mb-3 text-xl group-hover/card:text-brand-purple-closer transition-colors tracking-tight">Modo Guardián</h4>
                    <p className="text-base text-gray-600 leading-relaxed font-inter">La IA responde las preguntas frecuentes y filtra a los curiosos. Solo te notifica cuando hay un lead caliente (Hot Lead).</p>
                </div>
                <div className="bg-brand-gray-smoke/50 border border-gray-100 rounded-3xl p-8 transition-all hover:bg-white hover:shadow-xl group/card">
                    <h4 className="font-poppins font-bold text-brand-black mb-3 text-xl group-hover/card:text-brand-blue-primary transition-colors tracking-tight">Modo Copiloto</h4>
                    <p className="text-base text-gray-600 leading-relaxed font-inter">Mientras tú escribes, la IA te sugiere la mejor respuesta basada en tus mejores cierres históricos, pero TÚ pulsas enviar.</p>
                </div>
            </div>

            <blockquote className="border-l-4 border-brand-blue-primary bg-brand-gray-smoke p-12 my-20 not-italic rounded-r-xl text-2xl text-gray-800 font-medium leading-relaxed">
                "Automatiza la burocracia, humaniza la venta."
            </blockquote>

            <div className="bg-brand-gray-smoke/30 border-l-4 border-brand-blue-primary p-6 my-12 rounded-r-xl">
                <p className="text-base text-gray-700 mb-0">
                    <strong className="text-brand-black">Metodología:</strong> Los datos presentados en este artículo provienen de nuestro estudio de 14 empresas donde identificamos 159 oportunidades de mejora en conversaciones de WhatsApp Business. <a href="/recursos/estudio-anatomia-conversaciones" className="text-brand-purple-closer hover:underline">Ver estudio completo</a>.
                </p>
            </div>

            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-brand-black mt-24 mb-10 tracking-tight leading-tight">Preguntas Frecuentes sobre Automatización en WhatsApp</h2>

            <h3 className="text-3xl md:text-4xl font-poppins font-bold text-brand-black mt-20 mb-8 tracking-tight leading-tight">¿Cuándo debo automatizar mi WhatsApp de ventas?</h3>
            <p className="text-xl text-gray-700 leading-relaxed mb-10">
                Automatiza tareas logísticas (responder precio, enviar PDF, agendar citas, cualificar leads). <br /><br />
                NUNCA automatices la negociación, manejo de objeciones o cierre de venta en servicios de alto valor.
            </p>

            <div className="h-12" />

            <h3 className="text-3xl md:text-4xl font-poppins font-bold text-brand-black mt-20 mb-8 tracking-tight leading-tight">¿Los chatbots funcionan para vender servicios profesionales?</h3>
            <p className="text-xl text-gray-700 leading-relaxed mb-10">
                Solos, no. En ventas consultivas, el cliente compra confianza, no información. <br /><br />
                Un bot puede filtrar curiosos, pero el cierre debe ser humano. El modelo híbrido (IA + Humano) es la solución.
            </p>

            <div className="h-12" />

            <h3 className="text-3xl md:text-4xl font-poppins font-bold text-brand-black mt-20 mb-8 tracking-tight leading-tight">¿Cómo evito que los clientes detecten que es un bot?</h3>
            <p className="text-xl text-gray-700 leading-relaxed mb-10">
                No intentes ocultarlo. Sé transparente: "Hola, soy el asistente de [Nombre]. Te ayudo con info básica. Si necesitas algo específico, te conecto con [Nombre] directamente." <br /><br />
                La honestidad genera más confianza que la simulación.
            </p>

            <div className="my-16 bg-gradient-brand-subtle border border-brand-purple-closer/20 rounded-[2.5rem] p-10 md:p-14 text-center">
                <h3 className="text-brand-black font-poppins font-bold text-2xl md:text-3xl mb-4 tracking-tight">Deja de perder ventas por pereza</h3>
                <p className="text-gray-700 mb-10 max-w-lg mx-auto font-inter text-xl">
                    Implementa un sistema que filtre a los curiosos y te ponga a hablar solo con quien tiene la tarjeta en la mano.
                </p>
                <a
                    href="/?mode=presentation&presentationId=prodemo"
                    className="inline-flex items-center gap-3 text-white px-10 py-4 rounded-2xl font-poppins font-bold shadow-xl hover:shadow-brand-purple-closer/20 hover:scale-105 active:scale-95 transition-all"
                    style={{ background: 'linear-gradient(135deg, #08C4F4 0%, #8336FF 100%)' }}
                >
                    Ver Cómo Funciona IA + Humano <span className="text-brand-blue-primary">→</span>
                </a>
            </div>

        </ResourceLayout>
    );
}
