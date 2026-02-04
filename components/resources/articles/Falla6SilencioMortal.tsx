import React from 'react';
import ResourceLayout from '../ResourceLayout';

export default function Falla6SilencioMortal() {
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "El Silencio que Mata Ventas: Gestión de la espera en tiempos de inmediatez",
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
        "description": "El 57% de las empresas pierden ventas por 'abandono silencioso'. Aprende a gestionar la ansiedad del cliente durante la espera."
    };

    return (
        <ResourceLayout
            title="El Silencio que Mata Ventas: Gestión de la espera en tiempos de inmediatez"
            subtitle="No es el tiempo de espera lo que molesta al cliente, es la incertidumbre. El Patrón #3 de fricción comercial."
            category="Gestión de Espera"
            readTime="7 min lectura"
            date="Febrero 3, 2026"
            keyTakeaways={[
                "Ansiedad del Doble Check: El silencio en un canal instantáneo se interpreta como rechazo.",
                "Efecto 'Visto': Dejar en visto sin respuesta rápida es el pecado capital de WhatsApp.",
                "Espera Activa: Cómo mantener al cliente 'caliente' mientras un humano se desocupa.",
                "Solución: Mensajes de estado y gestión de expectativas."
            ]}
        >
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />

            <p className="lead text-xl md:text-2xl font-medium text-brand-black/80 border-b border-brand-gray-smoke pb-8 font-poppins">
                En WhatsApp, 10 minutos de silencio se sienten como 2 horas en una sala de espera física.
            </p>

            <p className="text-xl text-gray-700 leading-relaxed mb-10">
                La inmediatez del canal ha re-configurado nuestro cerebro. Cuando vemos el "Doble Check Azul" y no hay respuesta, nuestra mente no piensa "está ocupado", piensa "me está ignorando".
            </p>

            <div className="bg-brand-gray-smoke border-l-4 border-orange-500 p-8 my-10 not-italic rounded-r-2xl">
                <h3 className="font-poppins font-bold text-orange-600 text-xs uppercase tracking-widest mb-3">Dato Crítico</h3>
                <p className="mb-0 text-gray-700 text-xl leading-relaxed">
                    El <strong>57.1%</strong> de las empresas analizadas dejan al cliente en "limbo" durante transferencias o consultas internas, causando abandono silencioso.
                </p>
            </div>

            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-brand-black mt-24 mb-10 tracking-tight leading-tight">El Vacío de Información</h2>

            <p className="text-xl text-gray-700 leading-relaxed mb-10">
                El problema no es que tardes en responder. El problema es que el cliente <strong>no sabe qué está pasando</strong>.
            </p>

            <p className="text-xl text-gray-700 leading-relaxed mb-10">
                Escenario típico de fracaso:
            </p>

            <ul className="space-y-6 my-16">
                <li className="text-xl text-gray-700 leading-relaxed">
                    1. Cliente pregunta precio.
                </li>
                <li className="text-xl text-gray-700 leading-relaxed">
                    2. Vendedor lo lee (Doble Check Azul).
                </li>
                <li className="text-xl text-gray-700 leading-relaxed">
                    3. Vendedor va a buscar el dato al Excel o CRM.
                </li>
                <li className="text-xl text-gray-700 leading-relaxed">
                    4. Pasan 8 minutos.
                </li>
                <li className="text-xl text-gray-700 leading-relaxed">
                    5. Cliente asume desinterés y escribe a la competencia.
                </li>
            </ul>

            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-brand-black mt-24 mb-10 tracking-tight leading-tight">La Técnica de la "Espera Activa"</h2>

            <p className="text-xl text-gray-700 leading-relaxed mb-10">
                Para solucionar esto, no necesitas más personal, necesitas <a href="/recursos/falla-3-automatizacion-mal-entendida" className="text-brand-purple-closer hover:underline font-semibold">automatizar la empatía</a>.
            </p>

            <blockquote className="border-l-4 border-brand-blue-primary bg-brand-gray-smoke p-12 my-20 not-italic rounded-r-xl text-2xl text-gray-800 font-medium leading-relaxed">
                "La ansiedad del cliente se resetea cada vez que recibe una actualización de estado."
            </blockquote>

            <p className="text-xl text-gray-700 leading-relaxed mb-10">
                Si vas a tardar, <strong>avisa</strong>: "Dame un momento, estoy verificando el inventario para ti...". Ese simple mensaje compra 5-10 minutos de paciencia y buena voluntad.
            </p>

            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-brand-black mt-24 mb-10 tracking-tight leading-tight">Errores de Escalabilidad</h2>

            <p className="text-xl text-gray-700 leading-relaxed mb-10">
                Este problema se multiplica exponencialmente cuando <a href="/recursos/falla-4-escalamiento-caotico" className="text-brand-purple-closer hover:underline font-semibold">escalas tu equipo</a>. Las transferencias entre Bot y Humano, o entre Hunter y Closer, son los puntos donde más ventas se caen por silencio.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
                <div className="bg-brand-gray-smoke/50 border border-gray-100 rounded-3xl p-8 transition-all hover:bg-white hover:shadow-xl group/card">
                    <h4 className="font-poppins font-bold text-brand-black mb-3 text-xl group-hover/card:text-brand-purple-closer transition-colors tracking-tight">Transferencia Ciega</h4>
                    <p className="text-base text-gray-600 leading-relaxed font-inter">"Te paso con un asesor". (Pasan 20 minutos de silencio). El cliente siente que lo colgaron.</p>
                </div>
                <div className="bg-brand-gray-smoke/50 border border-gray-100 rounded-3xl p-8 transition-all hover:bg-white hover:shadow-xl group/card">
                    <h4 className="font-poppins font-bold text-brand-black mb-3 text-xl group-hover/card:text-brand-blue-primary transition-colors tracking-tight">Transferencia Asistida</h4>
                    <p className="text-base text-gray-600 leading-relaxed font-inter">"Estoy conectando con Juan, nuestro especialista. Él leerá lo que me dijiste para no repetir. Dame 2 min." (Conserva contexto y calma).</p>
                </div>
            </div>

            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-brand-black mt-24 mb-10 tracking-tight leading-tight">Preguntas Frecuentes sobre Tiempos de Respuesta</h2>

            <h3 className="text-3xl md:text-4xl font-poppins font-bold text-brand-black mt-20 mb-8 tracking-tight leading-tight">¿Cuál es el tiempo máximo de respuesta aceptable?</h3>
            <p className="text-xl text-gray-700 leading-relaxed mb-10">
                Para el primer mensaje: menos de 5 minutos. Durante una conversación activa: menos de 2 minutos. Si vas a tardar más, debes usar un mensaje de "Espera Activa".
            </p>

            <div className="h-12" />

            <h3 className="text-3xl md:text-4xl font-poppins font-bold text-brand-black mt-20 mb-8 tracking-tight leading-tight">¿Los mensajes automáticos de "Fuera de Horario" sirven?</h3>
            <p className="text-xl text-gray-700 leading-relaxed mb-10">
                Sí, pero solo si gestionan expectativas. "Volvemos a las 8am" es bueno. "No estamos disponibles" es malo. Mejor aún: "No estamos, pero puedes ir viendo nuestro catálogo aquí mientras volvemos a las 8am".
            </p>

            <div className="bg-brand-gray-smoke/30 border-l-4 border-brand-blue-primary p-6 my-12 rounded-r-xl">
                <p className="text-base text-gray-700 mb-0">
                    <strong className="text-brand-black">Metodología:</strong> Basado en el Patrón #3 de nuestro Diagnóstico Ejecutivo de Ventas en WhatsApp. <a href="/recursos/estudio-anatomia-conversaciones" className="text-brand-purple-closer hover:underline">Ver estudio completo</a>.
                </p>
            </div>

            <div className="my-16 bg-gradient-brand-subtle border border-brand-purple-closer/20 rounded-[2.5rem] p-10 md:p-14 text-center">
                <h3 className="text-brand-black font-poppins font-bold text-2xl md:text-3xl mb-4 tracking-tight">Automatiza la Paciencia</h3>
                <p className="text-gray-700 mb-6 max-w-lg mx-auto font-inter text-xl">
                    Implementa flujos de "Espera Activa" y deja de perder ventas por ansiedad.
                </p>
                <a
                    href="https://calendar.app.google/e84524233"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-brand-black rounded-full hover:bg-brand-purple-closer hover:shadow-lg hover:-translate-y-1"
                >
                    Diagnosticar mis Tiempos
                </a>
            </div>
        </ResourceLayout>
    );
}
