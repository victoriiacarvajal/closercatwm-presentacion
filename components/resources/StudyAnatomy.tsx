import React, { useEffect } from 'react';
import { Share2, Clock, Calendar, ArrowRight, CheckCircle, AlertTriangle, BookOpen, ArrowLeft } from 'lucide-react';
import { clarityEvent } from '../../utils/tracking';

export default function StudyAnatomy() {
    useEffect(() => {
        clarityEvent('study_anatomy_view');

        // SEO Override
        document.title = 'Anatomía de las Conversaciones de WhatsApp que Fallan | CloserCat Estudio';
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute('content', 'Análisis profundo de 159 oportunidades de mejora en WhatsApp Business. Descubre por qué 85.7% de las empresas fallan en su estrategia conversacional.');
        } else {
            const meta = document.createElement('meta');
            meta.name = "description";
            meta.content = 'Análisis profundo de 159 oportunidades de mejora en WhatsApp Business. Descubre por qué 85.7% de las empresas fallan en su estrategia conversacional.';
            document.head.appendChild(meta);
        }
    }, []);

    const schemaData = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Anatomía de las Conversaciones de WhatsApp que Fallan: Estudio de 14 Empresas",
        "author": {
            "@type": "Person",
            "name": "Victoria Carvajal"
        },
        "publisher": {
            "@type": "Organization",
            "name": "CloserCat",
            "url": "https://closercat.pro"
        },
        "datePublished": "2026-02-03",
        "description": "Análisis exhaustivo de patrones conversacionales en WhatsApp Business basado en evaluación heurística.",
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://closercat.pro/recursos/estudio-anatomia-conversaciones"
        }
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "¿Qué es la evaluación heurística en conversaciones de WhatsApp?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "La evaluación heurística conversacional es un método sistemático que examina nueve dimensiones críticas: comprensión de intención, claridad de respuesta, capacidad persuasiva, tono conversacional, manejo de objeciones, fluidez, cierre efectivo, autonomía y alineación de objetivos."
                }
            },
            {
                "@type": "Question",
                "name": "¿Por qué el 85.7% de las conversaciones de WhatsApp carecen de estrategia persuasiva?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "La mayoría de las implementaciones se enfocan en ser informativas en lugar de persuasivas. No se diseñan flujos para identificar objeciones ni ofrecer alternativas, resultando en conversaciones que informan pero no convierten."
                }
            }
        ]
    };

    return (
        <div className="min-h-screen bg-white text-brand-black font-inter selection:bg-brand-blue-primary/20">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

            {/* Navigation */}
            <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b border-gray-200 z-50 h-16 flex items-center justify-between px-6 lg:px-12">
                <a href="/recursos" className="flex items-center gap-2 text-gray-500 hover:text-brand-purple-closer transition-colors font-poppins text-sm font-medium">
                    <ArrowLeft size={18} />
                    <span className="hidden sm:inline">Volver a Recursos</span>
                </a>
                <a href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                    <img
                        src="/logo-closercat.png"
                        alt="CloserCat Pro"
                        className="h-10 w-auto"
                    />
                </a>
                <a
                    href="/?mode=presentation&presentationId=prodemo"
                    className="text-sm font-poppins font-semibold text-white px-5 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                    style={{
                        background: 'linear-gradient(135deg, #08C4F4 0%, #8336FF 100%)',
                    }}
                >
                    Ver Demo
                </a>
            </nav>

            <main className="pt-32 pb-20 px-6 max-w-[800px] mx-auto">
                {/* Header */}
                <header className="mb-12 border-b-2 border-brand-blue-primary/30 pb-10">
                    <div className="text-brand-purple-closer font-poppins font-bold uppercase tracking-widest text-[10px] mb-4">
                        Investigación · Análisis Conversacional
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-5xl font-poppins font-extrabold leading-[1.1] mb-6 text-brand-black tracking-tight">
                        Anatomía de las Conversaciones de WhatsApp que Fallan
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-500 font-serif border-l-4 border-brand-purple-closer pl-6 leading-relaxed mb-8 italic">
                        Cómo la evaluación heurística revela patrones ocultos que separan las conversaciones exitosas de las oportunidades perdidas.
                    </p>
                    <div className="flex flex-wrap gap-6 text-sm text-gray-400 font-inter uppercase tracking-widest font-bold">
                        <div className="flex items-center gap-2">
                            <span className="bg-brand-gray-smoke p-1.5 rounded-full text-lg">👩‍💻</span>
                            <span className="text-brand-black">Victoria Carvajal</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar size={14} className="text-brand-blue-primary" />
                            <span>Febrero 2026</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock size={14} className="text-brand-blue-primary" />
                            <span>15 min de lectura</span>
                        </div>
                    </div>
                </header>

                {/* Abstract Box */}
                <div className="bg-brand-gray-smoke rounded-3xl p-8 my-12 font-inter border border-gray-100 shadow-sm relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="text-brand-purple-closer font-poppins font-bold uppercase text-[10px] tracking-widest mb-6">Resumen Ejecutivo</h3>
                        <p className="mb-8 text-brand-black/80 text-lg leading-relaxed">
                            Este artículo presenta los hallazgos de un análisis exhaustivo de interacciones conversacionales en WhatsApp Business, evaluando sistemáticamente 14 empresas a través de un framework heurístico de 9 dimensiones. Se identificaron 159 oportunidades de mejora y 43 buenas prácticas.
                        </p>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                            <div className="text-left">
                                <span className="block text-4xl font-mono font-bold text-brand-black tracking-tighter">14</span>
                                <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Empresas</span>
                            </div>
                            <div className="text-left">
                                <span className="block text-4xl font-mono font-bold text-brand-purple-closer tracking-tighter">159</span>
                                <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Oportunidades</span>
                            </div>
                            <div className="text-left">
                                <span className="block text-4xl font-mono font-bold text-brand-black tracking-tighter">14.5</span>
                                <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Turnos Avg</span>
                            </div>
                            <div className="text-left">
                                <span className="block text-4xl font-mono font-bold text-brand-blue-primary tracking-tighter">9</span>
                                <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Dimensiones</span>
                            </div>
                        </div>
                    </div>
                    {/* Decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                </div>

                {/* Introduction */}
                <section className="font-serif text-lg leading-loose text-gray-800 mb-12">
                    <p className="mb-6 text-xl text-gray-600 font-normal">
                        En la era de la automatización conversacional, existe una brecha notable entre las promesas de las tecnologías de chat y su desempeño real. Este estudio surge de una pregunta: ¿por qué el chat, diseñado para vender, frecuentemente resulta en abandono?
                    </p>
                    <p className="mb-6">
                        A diferencia de métricas de vanidad como "tasa de apertura", nuestra investigación adopta un enfoque heurístico centrado en la experiencia del usuario.
                    </p>
                    <p className="mb-8">
                        La hipótesis inicial sugería fallos técnicos. Los datos revelaron otra historia: <strong className="bg-amber-100 px-1">el 78.6% de los casos presentaban una desalineación fundamental entre expectativa y experiencia</strong>.
                    </p>

                    <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border-l-4 border-amber-400 p-6 rounded-r-lg shadow-sm my-8 font-inter text-base">
                        <div className="flex items-start gap-3">
                            <BookOpen className="text-amber-600 shrink-0 mt-1" size={20} />
                            <div>
                                <h4 className="font-bold text-amber-800 mb-2 uppercase text-xs tracking-wider">Insight Clave</h4>
                                <p className="text-amber-900/80 m-0">
                                    El problema no es que los bots no puedan resolver consultas, sino que las conversaciones no están diseñadas para <strong>retener, persuadir y cerrar</strong>.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Methodology */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold font-serif mb-8 mt-12">2. El Framework Heurístico</h2>
                    <p className="font-serif text-lg leading-loose text-gray-800 mb-6">
                        Nuestro framework evalúa nueve dimensiones interdependientes que determinan el éxito de una interacción.
                    </p>

                    <div className="grid gap-4 font-inter text-sm">
                        {[
                            { n: 1, t: "Comprensión de Intención", d: "¿El sistema entiende realmente lo que el usuario necesita?" },
                            { n: 2, t: "Claridad de Respuesta", d: "¿La información es específica y relevante?" },
                            { n: 3, t: "Capacidad Persuasiva", d: "¿El sistema guía hacia la acción o solo informa?" },
                            { n: 4, t: "Manejo de Objeciones", d: "¿Puede superar dudas y resistencias?" },
                            { n: 5, t: "Fluidez", d: "¿La conversación se siente natural y sin tropiezos?" },
                            { n: 8, t: "Autonomía y Escalación", d: "¿Sabe cuándo resolver y cuándo pasar a un humano?" }
                        ].map((item) => (
                            <div key={item.n} className="bg-white border border-gray-200 p-4 rounded-lg flex gap-4 hover:shadow-md transition-shadow">
                                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold shrink-0">
                                    {item.n}
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900">{item.t}</h4>
                                    <p className="text-gray-600 mt-1">{item.d}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Findings: 6 Patterns */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold font-serif mb-8">3. Los 6 Patrones Críticos de Fallo</h2>

                    {/* Pattern 1 */}
                    <div className="mb-12">
                        <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                            <span className="text-amber-600">Patrón 1:</span> La Brecha de Expectativas
                        </h3>
                        <div className="bg-white border-2 border-gray-100 rounded-xl p-6 shadow-sm mb-6">
                            <div className="flex items-baseline gap-2 mb-2">
                                <span className="text-4xl font-bold text-amber-500">78.6%</span>
                                <span className="text-gray-500 font-medium">de prevalencia</span>
                            </div>
                            <p className="text-lg text-gray-700 mb-4">
                                Las empresas prometen "atención personalizada con IA" pero entregan redirecciones a enlaces genéricos o tiempos de espera de 30+ minutos.
                            </p>
                            <ul className="space-y-2 mb-0 font-inter text-sm text-gray-600">
                                <li className="flex gap-2">
                                    <AlertTriangle size={16} className="text-red-400" />
                                    Mensajes de bienvenida que prometen inmediatez y no cumplen.
                                </li>
                                <li className="flex gap-2">
                                    <AlertTriangle size={16} className="text-red-400" />
                                    IA que termina pidiendo "llenar un formulario web".
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* PRODUCT BREAKOUT: Expectations */}
                    <div className="my-12 bg-blue-50 border border-blue-100 rounded-2xl p-8 text-center relative overflow-hidden">
                        <div className="relative z-10">
                            <h4 className="text-blue-900 font-bold text-lg mb-2">¿Cómo lo resuelve CloserCat?</h4>
                            <p className="text-blue-800/80 mb-6 max-w-lg mx-auto">
                                CloserCat alinea expectativa y realidad usando <strong>modelos híbridos transparentes</strong>. La IA maneja lo inmediato, y transfiere con contexto completo a humanos para lo complejo.
                            </p>
                            <a href="/?mode=presentation&presentationId=prodemo" className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20">
                                Ver Demo de Transferencia Híbrida <ArrowRight size={16} />
                            </a>
                        </div>
                        {/* Decorative mesh */}
                        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-400 via-transparent to-transparent"></div>
                    </div>

                    {/* Pattern 2: Context Loss */}
                    <div className="mb-12">
                        <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                            <span className="text-amber-600">Patrón 2:</span> El Síndrome del Contexto Perdido
                        </h3>
                        <div className="bg-white border-2 border-gray-100 rounded-xl p-6 shadow-sm mb-6">
                            <div className="flex items-baseline gap-2 mb-2">
                                <span className="text-4xl font-bold text-amber-500">64.3%</span>
                                <span className="text-gray-500 font-medium">de prevalencia</span>
                            </div>
                            <p className="text-lg text-gray-700 mb-4">
                                Las escalaciones a humano funcionan como "reinicios". El usuario debe repetir su consulta inicial, invalidando la eficiencia del bot.
                            </p>
                            <div className="font-mono text-xs bg-gray-900 text-gray-300 p-4 rounded-lg">
                                <div className="text-red-400 mb-1">// Experiencia Típica (Mala)</div>
                                <div className="mb-2">Bot: "Te paso con un asesor..."</div>
                                <div className="mb-2 text-gray-500">[5 min espera]</div>
                                <div>Agente: "Hola, ¿en qué te puedo ayudar?" <span className="text-red-400 text-[10px]">(CONTEXTO PERDIDO)</span></div>
                            </div>
                        </div>
                    </div>

                    {/* Pattern 3: Economy of Wait */}
                    <div className="mb-12">
                        <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                            <span className="text-amber-600">Patrón 3:</span> La Economía de la Espera
                        </h3>
                        <p className="font-serif text-lg leading-loose text-gray-800 mb-4">
                            Las esperas de 20-30 minutos sin comunicación intermedia son la norma. Sin embargo, el estudio reveló un hallazgo interesante:
                        </p>
                        <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-400">
                            <p className="font-bold text-yellow-900 mb-0">
                                Las empresas que envían mensajes de seguimiento cada 2-3 minutos ("Sigo buscando un asesor...") mantienen tasas de retención 2.5x superiores.
                            </p>
                        </div>
                    </div>

                    {/* PRODUCT BREAKOUT: Smart Wait */}
                    <div className="my-12 bg-purple-50 border border-purple-100 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8">
                        <div className="flex-1">
                            <h4 className="text-purple-900 font-bold text-xl mb-3">Solución: Espera Inteligente (Burst Buffer)</h4>
                            <p className="text-purple-800/80 mb-4">
                                CloserCat implementa la técnica de "Espera Inteligente": cuando hay cola, la IA entretiene al usuario pidiendo datos necesarios para la cotización, convirtiendo el tiempo muerto en tiempo productivo.
                            </p>
                        </div>
                        <div className="shrink-0">
                            <a href="/?mode=presentation&presentationId=prodemo" className="inline-flex items-center gap-2 bg-white text-purple-700 border-2 border-purple-100 px-5 py-2.5 rounded-lg font-bold hover:bg-purple-50 transition-colors">
                                Ver Smart Wait en Acción
                            </a>
                        </div>
                    </div>

                    {/* Pattern 5: Persuasion Void */}
                    <div className="mb-12">
                        <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                            <span className="text-amber-600">Patrón 5:</span> El Vacío Persuasivo
                        </h3>
                        <div className="bg-white border-2 border-gray-100 rounded-xl p-6 shadow-sm mb-6">
                            <div className="flex items-baseline gap-2 mb-2">
                                <span className="text-4xl font-bold text-red-500">85.7%</span>
                                <span className="text-gray-500 font-medium">Critico</span>
                            </div>
                            <p className="text-lg text-gray-700">
                                La inmensa mayoría de conversaciones son puramente informativas. No se identifican objeciones, no hay "upsell", y si el usuario dice "luego aviso", la conversación muere ahí.
                            </p>
                        </div>
                    </div>

                </section>

                {/* Best Practices */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold font-serif mb-8 bg-black text-white inline-block px-4 py-1 transform -rotate-1">Anatomía del Éxito</h2>
                    <p className="font-serif text-lg text-gray-800 mb-8">
                        Documentamos 43 instancias de "Excelencia Conversacional". Aquí las tácticas ganadoras:
                    </p>

                    <div className="space-y-8">
                        <div className="border-l-4 border-green-500 pl-6 py-2">
                            <h4 className="font-bold text-lg mb-2 font-inter">1. Transferencia con Contexto (Warm Handoff)</h4>
                            <p className="text-gray-600 mb-4">El agente recibe el historial y saluda reconociendo el problema.</p>
                            <div className="font-mono text-xs bg-gray-50 border border-gray-200 p-4 rounded-lg text-gray-600">
                                Agente: "Hola Juan, veo que ya cotizaste el plan Pro con nuestro asistente. ¿Quieres que procedamos al pago o tienes dudas sobre la garantía?"
                            </div>
                        </div>

                        <div className="border-l-4 border-green-500 pl-6 py-2">
                            <h4 className="font-bold text-lg mb-2 font-inter">2. Navegación con Confirmación</h4>
                            <p className="text-gray-600 mb-4">Confirmar intención antes de soltar un catálogo gigante.</p>
                            <div className="font-mono text-xs bg-gray-50 border border-gray-200 p-4 rounded-lg text-gray-600">
                                Bot: "Entiendo que buscas regalos. ¿Es para una ocasión especial o buscas ofertas generales?"
                            </div>
                        </div>
                    </div>
                </section>

                {/* Conclusions */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold font-serif mb-6">Conclusiones</h2>
                    <p className="font-serif text-lg leading-loose text-gray-800 mb-8">
                        El desafío principal en WhatsApp comercial no es tecnológico, es de <strong>diseño estratégico</strong>. La tecnología actual es capaz; falta la intencionalidad.
                    </p>
                    <div className="bg-gray-900 text-white p-8 rounded-2xl text-center">
                        <h3 className="text-2xl font-bold mb-4 font-poppins">¿Quieres aplicar estos hallazgos a tu empresa?</h3>
                        <p className="text-gray-300 mb-8 max-w-xl mx-auto">
                            CloserCat ya tiene incorporadas las 43 mejores prácticas detectadas en este estudio: retención automática, paso de contexto y manejo de objeciones.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href="/" className="bg-white text-black px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
                                Explorar CloserCat Pro
                            </a>
                            <a href="/?mode=presentation&presentationId=prodemo" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors">
                                Ver Demo
                            </a>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="border-t border-gray-200 pt-10 text-center text-gray-500 text-sm pb-10">
                    <p className="mb-4">© 2026 CloserCat Research Team</p>
                    <div className="flex justify-center gap-4">
                        <a href="/" className="hover:underline">Home</a>
                        <a href="https://linkedin.com/in/victoriiacarvajal" className="hover:underline">Autora</a>
                        <a href="/?mode=presentation&presentationId=prodemo" className="hover:underline">Producto</a>
                    </div>
                </footer>
            </main>
        </div>
    );
}
