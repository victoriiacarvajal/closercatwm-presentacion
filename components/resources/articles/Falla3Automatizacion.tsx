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

            <p className="lead text-xl">
                Existe una obsesión peligrosa en el mercado: "Quiero un bot que venda por mí".
            </p>

            <p>
                Esta promesa, vendida por gurús de dropshipping, es letal para cualquier negocio que venda servicios, consultoría o productos de alto valor (High-Ticket).
            </p>

            <h2>El Valle Inquietante de las Ventas</h2>

            <p>
                Cuanto más intenta un bot parecer humano sin serlo, más rechazo genera. En psicología esto se llama <em>The Uncanny Valley</em>.
            </p>

            <div className="bg-purple-50 border-l-4 border-purple-500 p-6 my-8 not-italic">
                <h3 className="font-bold text-purple-900 text-lg mb-2">Dato Crítico</h3>
                <p className="mb-0 text-purple-800">
                    Nuestra data muestra que la tasa de cierre cae un <strong>80%</strong> cuando el cliente descubre que está hablando con un bot en la fase de negociación.
                </p>
            </div>

            <h2>Filtros vs. Cierres: Entendiendo los Roles</h2>

            <p>
                La automatización no es el enemigo. El enemigo es usarla en la etapa incorrecta del embudo.
            </p>

            <h3>Lo que SÍ debe hacer un Bot (Logística)</h3>
            <ul className="list-disc pl-5 space-y-2 mb-6">
                <li>Responder "¿Qué precio tiene?" a las 3 AM.</li>
                <li>Enviar el portafolio PDF.</li>
                <li>Agendar una cita en el calendario.</li>
                <li>Cualificar: "¿Eres empresa o persona?"</li>
            </ul>

            <h3>Lo que NUNCA debe hacer un Bot (Lógica y Emoción)</h3>
            <ul className="list-disc pl-5 space-y-2 mb-6">
                <li>Manejar objeciones de precio ("Es muy caro").</li>
                <li>Entender matices ("Lo necesito, pero para el otro mes").</li>
                <li>Generar empatía y rapport.</li>
            </ul>

            <h2>El Modelo Híbrido de CloserCat</h2>

            <p>
                Nuestra propuesta es simple: <strong>Cyborg Sales.</strong>
            </p>

            <p>
                Usamos IA para detectar la intención y preparar el terreno, pero dejamos el tiro final al humano.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                    <h4 className="font-bold text-gray-900 mb-2">Modo Guardián</h4>
                    <p className="text-sm">La IA responde las preguntas frecuentes y filtra a los curiosos. Solo te notifica cuando hay un lead caliente (Hot Lead).</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                    <h4 className="font-bold text-gray-900 mb-2">Modo Copiloto</h4>
                    <p className="text-sm">Mientras tú escribes, la IA te sugiere la mejor respuesta basada en tus mejores cierres históricos, pero TÚ pulsas enviar.</p>
                </div>
            </div>

            <blockquote>
                "Automatiza la burocracia, humaniza la venta."
            </blockquote>

            <div className="my-12 bg-blue-50 border border-blue-100 rounded-2xl p-8 text-center">
                <h3 className="text-blue-900 font-bold text-xl mb-4">Deja de perder ventas por pereza</h3>
                <p className="text-blue-800/80 mb-6 max-w-lg mx-auto">
                    Implementa un sistema que filtre a los curiosos y te ponga a hablar solo con quien tiene la tarjeta en la mano.
                </p>
                <a href="/?mode=presentation&presentationId=prodemo" className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20">
                    Ver Modelo Híbrido
                </a>
            </div>

        </ResourceLayout>
    );
}
