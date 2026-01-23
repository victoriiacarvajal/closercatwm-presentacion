import { SlideData, SlideType } from './types';
import React from 'react';


// Icons used in content (represented as strings for rendering logic or just text)
export const SLIDES: SlideData[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // SECCIÓN 1: APERTURA Y CONTEXTO
  // ═══════════════════════════════════════════════════════════════════════════

  // SLIDE 1: PORTADA
  {
    id: 1,
    type: SlideType.COVER,
    title: "CloserCat",
    subtitle: "Convierte el caos de WhatsApp en una oportunidad para escalar tu operación de ventas",
    imagePlaceholder: "Screenshot del Dashboard de CloserCat",
    imageUrl: "/closercat-dashboard.png",
    videoUrl: "/vista-global-closercat.mp4",
  },

  // SLIDE 2: PROGRAMA
  {
    id: 2,
    type: SlideType.AGENDA,
    title: "Programa",
    bullets: [
      "01 El caos actual de WhatsApp y cuánto te cuesta",
      "02 Cómo CloserCat convierte cada chat en oportunidad",
      "03 IA + equipo comercial: cada uno hace lo que mejor sabe",
      "04 Operación diaria sin conversaciones perdidas",
      "05 Contact Enrichment: perfiles que se construyen solos",
      "06 Plantillas, campañas y marketing conversacional que sí convierten",
      "07 Integraciones + Analytics: datos conectados a tu CRM y reporting",
      "08 Cuánto cuesta y cómo empezamos"
    ]
  },

  // SLIDE 3: TRANSICIÓN
  {
    id: 3,
    type: SlideType.TRANSITION,
    title: "El caos de WhatsApp comercial",
    subtitle: "tiene solución inteligente"
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SECCIÓN 2: SOBRE CLOSERCAT Y VISIÓN
  // ═══════════════════════════════════════════════════════════════════════════

  // SLIDE 4: SOBRE CLOSERCAT
  {
    id: 4,
    type: SlideType.SPLIT_IMAGE,
    title: "Estamos aquí para empoderarte",
    content: "CloserCat nace de la frustración de ver cómo equipos talentosos pierden oportunidades por la desorganización de WhatsApp Business. Centralizamos, automatizamos con IA y te ayudamos a escalar tu operación de ventas sin perder control sobre cada conversación.",
    imagePlaceholder: "Equipo trabajando con dashboard CloserCat",
    imageUrl: "/closercat-imagen-celular.png",
    videoUrl: "",
  },

  // SLIDE 5: NUESTRA VISIÓN
  {
    id: 5,
    type: SlideType.SPLIT_IMAGE,
    title: "Transformamos WhatsApp en tu mejor canal de ventas",
    content: "Donde la IA aprende de tus mejores closers y tu equipo mantiene el control para escalar la operación sin perder calidad humana.",
    imagePlaceholder: "Conversaciones caóticas vs Dashboard Organizado",
    imageUrl: "/closercat-imagen-ia.png",
    videoUrl: "",
  },

  // SLIDE 5B: TODO COMIENZA CON UNA CONVERSACIÓN
  {
    id: 24,
    type: SlideType.SPLIT_IMAGE,
    title: "Todo comienza con una conversación",
    content: "Cada oportunidad nace cuando un cliente escribe por WhatsApp. CloserCat escucha en tiempo real, espera que el cliente termine su idea y responde una sola vez con todo el contexto.",
    bullets: [
      "Notificación instantánea de nueva conversación",
      "El usuario puede enviar mensajes en ráfaga (el sistema espera 3 segundos)",
      "La IA consolida todos los mensajes antes de responder, como haría tu mejor closer",
      "Una única respuesta coherente y contextual"
    ],
    extraText: "Burst buffer inteligente: si el cliente envía 5 mensajes seguidos, la IA responde una sola vez con todo el contexto.",
    imagePlaceholder: "Conversación con mensajes en ráfaga y respuesta inteligente",
    imageUrl: "/closercat-conversacion.png",
    videoUrl: "/closercat-conversation-v2.mp4",
  },

  // SLIDE 5C: CASOS DE USO DEL ASISTENTE
  {
    id: 25,
    type: SlideType.STANDARD,
    title: "Configura una IA que vende como tu negocio",
    subtitle: "Una IA exclusiva para tu negocio",
    content: "CloserCat se configura con la información de tu negocio y se especializa en los casos de uso que más impacto tienen en tus ingresos.",
    bullets: [
      "🛒 Ecommerce: catálogo de productos con búsqueda semántica, precios y disponibilidad",
      "🎯 B2B/Prospección: servicios, calificación de leads y agendamiento automático",
      "🛟 Soporte: FAQs y base de conocimiento documental con respuestas precisas",
      "🤖 Un asistente entrenado solo con tu operación, no con plantillas genéricas"
    ],
    extraText: "Cada caso de uso activa un Knowledge Base especializado: Productos para ecommerce, Servicios para B2B, FAQs para soporte. La IA adapta su comportamiento según el contexto.",
    imagePlaceholder: "Pantalla de configuración del asistente (casos de uso y datos del negocio)",
    imageUrl: "/closercat-configuracion-asistente.png",
    videoUrl: "/closercat-casos-de-uso-v1.mp4",
  },

  // SLIDE 5C-2: CONFIGURACIÓN DEL ASISTENTE (USE CASE + KB)
  {
    id: 45,
    type: SlideType.SPLIT_IMAGE,
    title: "Configura tu Asistente en un solo lugar",
    subtitle: "Caso de uso + Knowledge Base en un drawer unificado",
    content: "El asistente de CloserCat se configura desde un panel único donde defines el caso de uso principal y el conocimiento que la IA puede usar.",
    bullets: [
      "⚙️ Selector de caso de uso: Ecommerce, B2B, Soporte u otros personalizados",
      "🧠 Tabs condicionales: Productos, Servicios o FAQs según tu caso de uso",
      "📚 Knowledge Base siempre activo: la IA siempre tiene acceso a tu catálogo y documentación",
      "🎯 Comportamiento de la IA adaptado al contexto elegido (ventas, soporte, prospección)"
    ],
    extraText: "El objetivo es que configures al asistente una sola vez y luego puedas iterar fácilmente sobre producto, servicios y FAQs sin tocar prompts técnicos.",
    imagePlaceholder: "Drawer de configuración del asistente con tabs de KB",
    imageUrl: "/closercat-configuracion-asistente.png",
    videoUrl: "",
  },

  // SLIDE 5D: COMPRENSIÓN MULTIMODAL
  {
    id: 26,
    type: SlideType.STANDARD,
    title: "La IA entiende texto, imágenes y audios como tu mejor vendedor",
    content: "El asistente entiende mucho más que texto: aprovecha todo lo que tus clientes comparten para responder mejor y avanzar hacia el cierre.",
    bullets: [
      "📝 Textos: mensajes completos con contexto de toda la conversación",
      "🖼️ Imágenes: productos, documentos, capturas (metadata procesada)",
      "🎤 Audios: notas de voz transcritas automáticamente por Azure Speech",
      "🧠 Generación de respuestas basada en todas las señales disponibles"
    ],
    extraText: "La IA combina texto, imágenes y audio para mantener una sola línea de conversación coherente. Transcripción de audio en tiempo real.",
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SECCIÓN 3: EL PROBLEMA Y SU IMPACTO
  // ═══════════════════════════════════════════════════════════════════════════

  // SLIDE 6: EL PROBLEMA
  {
    id: 6,
    type: SlideType.STANDARD,
    title: "El caos de WhatsApp comercial hoy",
    subtitle: "Los equipos de ventas enfrentan retos que cuestan tiempo, dinero y bloquean el crecimiento:",
    bullets: [
      "📱 Conversaciones desperdigadas en múltiples dispositivos y números",
      "🔍 Pérdida de contexto: ¿Qué le prometiste a este cliente hace 2 semanas?",
      "⏰ Respuestas 4+ horas tarde = leads que le escriben a tu competencia",
      "📊 Cero métricas: imposible medir el desempeño real del equipo",
      "🗃️ Desorganización: conversaciones perdidas en el historial infinito",
      "❌ Sin seguimiento: hasta 60% de leads se olvidan y nunca se cierran"
    ],
    extraText: "El 78% de compradores elige al proveedor que responde primero."
  },

  // SLIDE 7: IMPACTO
  {
    id: 7,
    type: SlideType.STANDARD,
    title: "Lo que el desorden en WhatsApp te hace perder cada mes",
    content: "Cada minuto extra sin responder baja tu probabilidad de cierre.",
    bullets: [
      "$15,000 – $50,000 en oportunidades que nunca se cierran (cada mes)",
      "20–30 horas/semana pagando a tu equipo por buscar conversaciones",
      "40% de leads nunca reciben seguimiento inicial",
      "Clientes frustrados que terminan comprando a otro proveedor"
    ],
    imagePlaceholder: "Gráfico descendente conversión vs tiempo",
    imageUrl: "",
    videoUrl: "",
  },

  // SLIDE 7B: CÓMO FUNCIONA EN 60 SEGUNDOS
  {
    id: 44,
    type: SlideType.STANDARD,
    title: "Cómo funciona CloserCat en 60 segundos",
    subtitle: "De mensaje en WhatsApp a respuesta con IA y datos listos para tu CRM",
    bullets: [
      "📱 Cliente envía mensaje en WhatsApp (texto, audio o imagen)",
      "🌐 WhatsApp notifica a CloserCat vía webhook en tiempo real",
      "⏳ Burst buffer de 3 segundos: se agrupan mensajes en ráfaga",
      "🧠 IA responde usando historial + perfil del contacto + Knowledge Base",
      "🛡️ Guardrails revisa cada respuesta antes de enviarla",
      "📊 Todo queda registrado y listo para campañas, Analytics y CRM"
    ],
    extraText: "Este flujo es igual para todos los casos de uso: ventas, soporte y prospección. Siempre con control humano y trazabilidad completa.",
  },

  // SLIDE 8: TRANSICIÓN
  {
    id: 8,
    type: SlideType.TRANSITION,
    title: "Con CloserCat",
    subtitle: "cada conversación es una oportunidad organizada"
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SECCIÓN 4: CENTRO DE COMANDO Y DIFERENCIADORES
  // ═══════════════════════════════════════════════════════════════════════════

  // SLIDE 9: CENTRO DE COMANDO
  {
    id: 9,
    type: SlideType.DASHBOARD,
    title: "¿Cómo escalarías tu operación si todo tu equipo vendiera desde un solo panel?",
    subtitle: "Un solo panel para gestionar todas tus conversaciones comerciales, sin abrir WhatsApp.",
    imagePlaceholder: "DASHBOARD COMPLETO: Barra superior (Plantillas, Cierre), Panel de conversaciones, Filtros",
    imageUrl: "/closercat-dashboard.png",
    videoUrl: "",
  },

  // SLIDE 10: DIFERENCIADORES
  {
    id: 10,
    type: SlideType.STANDARD,
    title: "Lo que nos hace diferentes",
    subtitle: "A diferencia de un chatbot genérico, CloserCat está diseñado para cerrar ventas:",
    bullets: [
      "✓ Aprende de TUS conversaciones, no de templates genéricos",
      "✓ La IA sugiere y tu equipo decide qué se envía",
      "✓ Burst buffer de 3 segundos: procesa múltiples mensajes antes de responder",
      "✓ Guardrails con 8 tipos de validación: nunca da información fuera de tus políticas",
      "✓ Contact Enrichment: extrae datos del cliente automáticamente",
      "✓ Integración nativa con WhatsApp Business API oficial"
    ],
    imagePlaceholder: "Comparativa CloserCat vs Chatbot Genérico",
    imageUrl: "/closercat-integracion.png",
    videoUrl: "",
  },

  // SLIDE 11: ACCESOS RÁPIDOS (GRID)
  {
    id: 11,
    type: SlideType.GRID,
    title: "Accesos rápidos para vender más rápido",
    columns: [
      { title: "1️⃣ PLANTILLAS 📝", content: ["Plantillas WABA aprobadas por Meta", "Seguimientos, objeciones, demos", "Variables dinámicas personalizadas"] },
      { title: "2️⃣ CIERRE ✅", content: ["Estados automáticos por IA", "Cierre positivo, negativo, en riesgo", "Métricas de éxito por agente"] },
      { title: "3️⃣ MEDIA GALLERY 🖼️", content: ["500MB de almacenamiento por cuenta", "Imágenes, videos y documentos", "Validación automática WhatsApp"] },
      { title: "4️⃣ CAMPAÑAS 🎯", content: ["Hasta 50,000 contactos por campaña", "Segmentación avanzada por 24+ campos", "Métricas en tiempo real"] }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SECCIÓN 5: OPERACIÓN DIARIA
  // ═══════════════════════════════════════════════════════════════════════════

  // SLIDE 12: INICIAR CONVERSACIÓN
  {
    id: 12,
    type: SlideType.SPLIT_IMAGE,
    title: "Nuevas conversaciones en 3 clics",
    bullets: [
      "Paso 1: Click en 'INICIAR NUEVA CONVERSACIÓN'",
      "Paso 2: Ingresa número de WhatsApp o nombre",
      "Paso 3: Selecciona campaña/etiquetas (opcional)",
      "Paso 4: ¡Comienza a vender!"
    ],
    extraText: "Beneficio clave: sin cambiar de app, sin perder contexto y sin saltar entre pantallas. La ventana de 24 horas se abre automáticamente.",
    imagePlaceholder: "Botón Cyan brillante INICIAR NUEVA CONVERSACIÓN",
    imageUrl: "/closercat-conversacion.png",
    videoUrl: "/closercat-mensaje-1-a-1.mp4",
  },

  // SLIDE 13: BÚSQUEDA
  {
    id: 13,
    type: SlideType.SPLIT_IMAGE,
    title: "Encuentra cualquier conversación en segundos",
    bullets: [
      "🔍 Búsqueda avanzada: encuentra cualquier chat en segundos por nombre, teléfono o palabras clave.",
      "🎚️ Filtros potentes: por estado, recencia, origen o campaña.",
      "✅ Checkbox: 'Mostrar archivadas' para ver también el archivo histórico"
    ],
    extraText: "Búsqueda, filtros y ordenamiento se aplican en tiempo real, sin recargar la pantalla. Historial completo de todas las conversaciones.",
    imagePlaceholder: "Panel de Filtrar y Buscar expandido",
    imageUrl: "/closercat-busqueda.png",
    videoUrl: "/closercat-buscador-v3.mp4",
  },

  // SLIDE 14: IA VS MANUAL
  {
    id: 14,
    type: SlideType.SPLIT_IMAGE,
    title: "Activa o desactiva la IA según cada conversación",
    content: "La IA no reemplaza a tu equipo: los acompaña. Puedes activar o desactivar la IA conversación por conversación, y cuando está en modo manual tus comerciales responden directamente con todo el contexto.",
    bullets: [
      "🤖 Modo IA ACTIVADA: la IA propone respuestas basadas en Knowledge Base y contexto.",
      "✍️ Modo MANUAL: tu equipo responde directamente usando texto, imágenes, audios o documentos.",
      "🔁 Cambio rápido entre modos sin salir de la conversación.",
      "⚡ AI Auto-Disable: se desactiva automáticamente en cierre positivo o violación crítica."
    ],
    extraText: "El sistema detecta automáticamente cuándo la conversación llegó a buen término y desactiva la IA para evitar respuestas innecesarias.",
    imagePlaceholder: "Interfaz mostrando el toggle IA activada/desactivada",
    imageUrl: "/closercat-modo-ia-manual.png",
    videoUrl: "/closercat-human-message-v1.mp4",
  },

  // SLIDE 15: PLANTILLAS (SPLIT_IMAGE)
  {
    id: 15,
    type: SlideType.SPLIT_IMAGE,
    title: "Plantillas WABA para mensajes manuales mucho más rápido",
    content: "Plantillas aprobadas por Meta, listas para usar. Pensadas para que tu equipo envíe mensajes manuales más rápido, sin empezar desde cero y aprovechando lo que ya funciona.",
    bullets: [
      "📋 SEGUIMIENTO POST-DEMO: 'Gracias por tu tiempo...'",
      "💰 CIERRE CONSULTIVO: 'Propuesta personalizada lista'",
      "🔥 MANEJO DE OBJECIONES: 'Comparativa vs. competencia'",
      "❄️ REACTIVACIÓN: 'Nueva oferta exclusiva para ti'"
    ],
    extraText: "Las plantillas usan variables dinámicas ({{nombre}}, {{producto}}) que se llenan automáticamente con datos del contacto.",
    imagePlaceholder: "Interfaz de Configuración de Plantillas",
    imageUrl: "/closercat-plantillas.png",
    videoUrl: "",
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SECCIÓN 6: GUARDRAILS Y SEGURIDAD DE IA
  // ═══════════════════════════════════════════════════════════════════════════

  // SLIDE 16: GUARDRAILS
  {
    id: 16,
    type: SlideType.SPLIT_IMAGE,
    title: "Guardrails: la IA nunca se sale de tus políticas",
    bullets: [
      "🔒 Cada respuesta se valida contra tus políticas antes de enviarse",
      "✅ 8 tipos de chequeos automáticos: descuentos, datos sensibles, promesas imposibles…",
      "🚨 Si hay riesgo, se bloquea el mensaje y se escala a tu equipo",
      "📊 Queda registro de cada incidente para aprender y ajustar la política"
    ],
    extraText: "Piensa en Guardrails como un 'juez IA' que revisa cada mensaje antes de salir. Si detecta algo crítico —por ejemplo, que el cliente pide 50% de descuento— bloquea la respuesta y notifica al supervisor en lugar de prometer algo imposible.",
    imagePlaceholder: "Toggle Guardrails activado con indicador visual",
    imageUrl: "",
    videoUrl: "/closercat-guardrails-v1.mp4",
  },

  // SLIDE 16B: ESTADO DE CONVERSACIÓN EN TIEMPO REAL
  {
    id: 27,
    type: SlideType.STANDARD,
    title: "Estado de cada conversación en tiempo real",
    subtitle: "Prioriza dónde intervenir para cerrar más",
    content: "CloserCat clasifica automáticamente cada conversación según su avance hacia el cierre. La IA evalúa el contexto y asigna el estado basándose en tu política de cierre configurada.",
    bullets: [
      "🔵 Iniciada: conversación recién comenzada",
      "🟡 En progreso: interacción activa hacia el objetivo",
      "🟠 En riesgo: posibilidad alta de perder la oportunidad",
      "🟢 Cierre positivo: objetivo alcanzado (venta, cita, etc.) — IA se desactiva automáticamente",
      "🔴 Cierre negativo: oportunidad perdida o descartada"
    ],
    extraText: "La clasificación es automática: la IA analiza cada mensaje contra tu closure_policy y actualiza el estado en tiempo real. Tu equipo puede enfocarse en conversaciones 'En riesgo' que necesitan intervención humana.",
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SECCIÓN 7: CONTACT ENRICHMENT (NUEVO)
  // ═══════════════════════════════════════════════════════════════════════════

  // SLIDE 16C: EXTRACCIÓN ESTRUCTURADA DE DATOS (MEJORADO)
  {
    id: 28,
    type: SlideType.SPLIT_IMAGE,
    title: "Enriquecimiento del Contacto: el perfil del cliente se construye solo",
    content: "Mientras la conversación fluye, CloserCat extrae automáticamente 11+ campos del contacto sin intervención manual. Cero trabajo de captura de datos.",
    bullets: [
      "👤 Datos básicos: nombre completo, email, ubicación",
      "🏢 Datos B2B: empresa, cargo, industria, tamaño",
      "💰 Datos de venta: presupuesto, timeline, necesidades específicas",
      "🎯 Intención: nivel de interés y etapa del funnel"
    ],
    extraText: "Tiempo de enriquecimiento: < 2 segundos por mensaje. Los datos fluyen automáticamente a campañas, segmentación y CRM. Tu equipo de ventas recibe leads pre-calificados con toda la información.",
    imagePlaceholder: "Conversación de WhatsApp → Perfil de contacto enriquecido",
    imageUrl: "/closercat-contexto.png",
    videoUrl: "/closercat-contact-extraction-v1.mp4",
  },

  // SLIDE 28B: CAMPOS QUE SE EXTRAEN (NUEVO)
  {
    id: 40,
    type: SlideType.STANDARD,
    title: "11+ campos extraídos automáticamente de cada conversación",
    subtitle: "De conversación natural a datos accionables",
    content: "La IA analiza cada mensaje buscando información estructurada. Todo se actualiza en tiempo real sin intervención manual.",
    bullets: [
      "📝 Nombre completo y email detectados del texto",
      "🏢 Empresa, cargo e industria inferidos del contexto",
      "👥 Tamaño de empresa ('Somos 50 personas' → 50)",
      "💰 Presupuesto y timeline ('$10K para enero')",
      "📍 Ubicación geográfica (ciudad, país)",
      "🎯 Necesidades específicas y objeciones capturadas"
    ],
    extraText: "Confidence threshold configurable (default 0.7). Si la IA no está segura, no actualiza el campo. Puedes corregir manualmente y el sistema aprende de las correcciones.",
  },

  // SLIDE 28C: CONTACTS MANAGEMENT (24+ CAMPOS)
  {
    id: 46,
    type: SlideType.SPLIT_IMAGE,
    title: "Contacts Management: tu base de contactos lista para segmentar",
    subtitle: "24+ campos estructurados que alimentan campañas y Analytics",
    content: "Mientras Contact Enrichment extrae datos de las conversaciones, el módulo de Contacts Management los organiza en una ficha completa por contacto.",
    bullets: [
      "👥 24+ campos predefinidos: rol, industria, tamaño de empresa, ubicación, canal, etc.",
      "📥 Importación masiva desde CSV para migrar bases históricas",
      "🎯 Filtros avanzados para construir audiencias precisas en campañas",
      "⚙️ Custom fields ilimitados para adaptar la ficha a tu negocio"
    ],
    extraText: "Contacts Management es la ‘capa de datos’ que conecta conversaciones, campañas y reporting. Todo parte de una ficha de contacto bien estructurada.",
    imagePlaceholder: "Tabla de contactos con múltiples columnas y filtros",
    imageUrl: "/closercat-contacts.png",
    videoUrl: "",
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SECCIÓN 8: CAMPAÑAS Y MARKETING
  // ═══════════════════════════════════════════════════════════════════════════

  // SLIDE 17: CAMPAÑAS
  {
    id: 17,
    type: SlideType.STANDARD,
    title: "Organiza tus campañas y ve qué realmente vende",
    bullets: [
      "📱 Campaña Black Friday: 35% tasa de cierre, $45k en pipeline visible",
      "🎓 Campaña Demo Educativa: 87 leads calificados listos para ventas",
      "🌎 Campaña Expansión LATAM: performance por región y segmento"
    ],
    extraText: "Hasta 50,000 contactos por campaña. Rate de envío ~4,800/hora. Métricas en tiempo real y ROI medible por campaña.",
    imagePlaceholder: "Panel de CAMPAÑAS con métricas",
    imageUrl: "/closercat-campañas.png",
    videoUrl: "",
  },

  // SLIDE 17B: CAMPAÑAS - MÉTODO 1 CSV
  {
    id: 29,
    type: SlideType.SPLIT_IMAGE,
    title: "Campañas – Método 1: importa tu base y dispara mensajes masivos",
    content: "Crea campañas importando tu base de contactos existente mediante un archivo CSV.",
    bullets: [
      "Importa contactos desde archivos CSV o Excel (hasta 10MB / ~100,000 filas)",
      "Mapeo de campos personalizados para cada negocio",
      "Uso de variables dinámicas dentro de las plantillas WABA",
      "Ideal para bases de datos históricas que ya tienes",
      "Permite iniciar rápidamente campañas a gran escala"
    ],
    extraText: "Ejemplo: importar leads desde tu CRM actual o desde hojas de cálculo. Los contactos importados también se enriquecen automáticamente cuando responden.",
    imagePlaceholder: "Modal de campañas mostrando pestaña CSV",
    imageUrl: "/closercat-csv.png",
    videoUrl: "",
  },

  // SLIDE 17C: CAMPAÑAS - CONSTRUCTOR DE AUDIENCIAS (MEJORADO)
  {
    id: 30,
    type: SlideType.SPLIT_IMAGE,
    title: "Campañas – Método 2: segmentación avanzada con 24+ campos",
    subtitle: "Audiencias hiper-segmentadas basadas en datos reales",
    content: "Usa los datos extraídos automáticamente por Contact Enrichment para crear audiencias precisas.",
    bullets: [
      "🏢 Por empresa: industria, tamaño, ubicación",
      "💼 Por contacto: cargo, departamento, seniority",
      "🎯 Por comportamiento: estado de cierre, engagement bucket",
      "⚙️ Custom fields ilimitados para tu negocio"
    ],
    extraText: "Ejemplo: 'CTOs de Fintechs en CDMX con 50-200 empleados que están en estado En Progreso'. +40% en tasa de respuesta con segmentación precisa.",
    imagePlaceholder: "Constructor de audiencias con filtros avanzados",
    imageUrl: "/closercat-audiencias.png",
    videoUrl: "",
  },

  // SLIDE 17D: DASHBOARD DE CAMPAÑAS
  {
    id: 31,
    type: SlideType.SPLIT_IMAGE,
    title: "Mide cada campaña en tiempo real.",
    subtitle: "Mide el impacto de cada envío",
    content: "Cada campaña cuenta con un dashboard completo para entender qué está funcionando y dónde intervenir.",
    bullets: [
      "Métricas clave: enviados, entregados, leídos, respondidos",
      "Pestañas para Resumen, Audiencias, CSV, Targets y Configuración",
      "Estimación de tiempo: 1,000 contactos ≈ 12-15 min, 10,000 ≈ 2-3 horas",
      "Visión consolidada del performance de tus esfuerzos conversacionales"
    ],
    extraText: "5 campañas simultáneas por tenant. Rate limiting automático según límites de WhatsApp (~80 msg/segundo).",
    imagePlaceholder: "Dashboard de campañas con métricas y pestañas",
    imageUrl: "/closercat-dashboard-campanas.png",
    videoUrl: "/closercat-campañas-v1.mp4",
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SECCIÓN 9: MEDIA GALLERY (NUEVO)
  // ═══════════════════════════════════════════════════════════════════════════

  // SLIDE 17E: MEDIA GALLERY (NUEVO)
  {
    id: 41,
    type: SlideType.STANDARD,
    title: "Media Gallery: todos tus archivos en un solo lugar",
    subtitle: "Gestión centralizada de imágenes, videos y documentos",
    content: "Sube archivos una vez y reutilízalos en todas tus plantillas y campañas. Validación automática según límites de WhatsApp.",
    bullets: [
      "🖼️ Imágenes: JPG, PNG hasta 5MB — headers de plantillas",
      "🎥 Videos: MP4 hasta 16MB — contenido multimedia",
      "📄 Documentos: PDF, Word, Excel hasta 100MB — adjuntos",
      "📊 500MB de almacenamiento por cuenta (ampliable)",
      "✅ Drag & drop con validación instantánea"
    ],
    extraText: "Grid responsive con preview, filtros por tipo y búsqueda por nombre. Las URLs de Azure se regeneran automáticamente cada 5 días.",
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SECCIÓN 10: GESTIÓN Y SEGUIMIENTOS
  // ═══════════════════════════════════════════════════════════════════════════

  // SLIDE 18: ARCHIVADO
  {
    id: 18,
    type: SlideType.SPLIT_IMAGE,
    title: "Nunca más pierdas una conversación importante",
    content: "Sistema de archivado completo con búsqueda y restauración en segundos, tanto de forma automática como manual.",
    bullets: [
      "📦 Archivado automático y manual de conversaciones inactivas sin perder historial",
      "🔍 Búsqueda en el archivo completo por nombre, teléfono o contenido",
      "↩️ Restauración con un clic cuando la conversación se reactiva",
      "📜 Hilos previos: acceso rápido a todo el historial relevante"
    ],
    extraText: "Recupera contexto de conversaciones de hace 6 meses en segundos. Historial completo de mensajes sin límite de retención.",
    imagePlaceholder: "Panel de Archivados",
    imageUrl: "/closercat-contexto.png",
    videoUrl: "/closercat-gestion-conversacion-v1.mp4",
  },

  // SLIDE 19: SEGUIMIENTOS (MEJORADO)
  {
    id: 19,
    type: SlideType.STANDARD,
    title: "Seguimientos automáticos: nunca olvides una oportunidad",
    bullets: [
      "📅 Programa recordatorios: 'Contactar en 3 días' con fecha y hora específica",
      "⏰ Notificaciones automáticas cuando llega el momento de actuar",
      "🔄 Cancelación automática si el cliente responde antes del seguimiento",
      "📊 Dashboard: vista de hoy, semana y mes priorizada por impacto"
    ],
    extraText: "Los seguimientos programados aumentan tu tasa de cierre hasta un 40%. La IA puede retomar automáticamente conversaciones inactivas después de 24 horas si está configurado.",
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SECCIÓN 11: INTEGRACIONES
  // ═══════════════════════════════════════════════════════════════════════════

  // SLIDE 19A: TRANSICIÓN A MARKETING E INTEGRACIONES
  {
    id: 35,
    type: SlideType.TRANSITION,
    title: "De la operación diaria al marketing conversacional",
    subtitle: "Integra tus datos y campañas para escalar aún más tus ventas"
  },

  // SLIDE 19B: VISIÓN GENERAL DE INTEGRACIONES
  {
    id: 32,
    type: SlideType.SPLIT_IMAGE,
    title: "Integraciones: CloserCat se conecta a tu stack actual",
    subtitle: "La conversación no vive aislada, vive conectada",
    content: "La información que CloserCat organiza está pensada para conectarse fácilmente con tus sistemas existentes.",
    bullets: [
      "Arquitectura abierta con webhooks en tiempo real",
      "Datos conversacionales estructurados y exportables (JSON)",
      "Analytics & Reporting: reportes HTML/JSON basados en data nativa de CloserCat",
      "Dos métodos principales: Webhooks + Integración CRM nativa (Q10)",
      "Flujo bidireccional de información entre CloserCat y tus herramientas"
    ],
    extraText: "Hasta 20 webhooks configurables por cuenta. CloserCat no reemplaza tu stack, lo potencia conectándose donde ya trabajas hoy.",
    imagePlaceholder: "Vista de integraciones conectando CloserCat con tu stack actual",
    imageUrl: "/closercat-integracion.png",
    videoUrl: "/closercat-integrations-v1.mp4",
  },

  // SLIDE 19C: INTEGRACIONES POR WEBHOOKS (MEJORADO)
  {
    id: 33,
    type: SlideType.SPLIT_IMAGE,
    title: "Método 1: Webhooks con seguridad enterprise",
    subtitle: "Conecta con n8n, Make, Zapier y más",
    content: "Emite eventos de conversación en tiempo real para disparar automatizaciones en tus herramientas favoritas.",
    bullets: [
      "📡 Eventos: nuevos mensajes, cambios de estado, cierres, enriquecimiento",
      "🔐 Seguridad HMAC SHA-256 para verificar autenticidad",
      "🔄 Retry automático: 3 reintentos con backoff exponencial (1s, 2s, 4s...)",
      "📊 Monitoreo: logs de entrega, fallos y reintentos"
    ],
    extraText: "Timeout configurable 1-60 segundos. Payload máximo 1MB. Ejemplo: cuando una conversación llega a 'Cierre positivo', envía automáticamente el lead a tu CRM y notifica en Slack.",
    imagePlaceholder: "Diagrama CloserCat → Webhook → n8n/Make → CRM/Slack",
    imageUrl: "/closercat-webhooks.png",
    videoUrl: "",
  },

  // SLIDE 19D: INTEGRACIONES CRM NATIVAS
  {
    id: 34,
    type: SlideType.SPLIT_IMAGE,
    title: "Método 2: Integración Q10 CRM nativa",
    subtitle: "Una sola verdad entre conversaciones y CRM",
    content: "Sincronización bidireccional entre CloserCat y Q10 CRM para que ambos sistemas compartan la misma realidad.",
    bullets: [
      "Envía datos de conversaciones y cierres directamente a Q10",
      "Recibe información del CRM para enriquecer las respuestas de la IA",
      "Contact Enrichment → Q10 automático sin intervención manual",
      "Evita duplicados y mantiene una sola fuente de verdad"
    ],
    extraText: "La IA puede usar datos históricos del CRM durante la conversación para personalizar aún más sus respuestas. Otras integraciones CRM disponibles vía webhooks + n8n/Make.",
    imagePlaceholder: "Diagrama de doble flecha CloserCat ↔ Q10 CRM",
    imageUrl: "/closercat-crm.png",
    videoUrl: "",
  },

  {
    id: 37,
    type: SlideType.STANDARD,
    title: "Analytics & Reporting: convierte conversaciones en decisiones",
    subtitle: "Data nativa de CloserCat + módulos por CRM (ej: Q10)",
    content: "CloserCat materializa reportes con métricas accionables basadas en la actividad real del tenant (conversaciones, cierres, campañas, enriquecimiento e integraciones). Cada CRM puede tener su propio módulo de analítica para reflejar su funnel y campos.",
    bullets: [
      "Reportes materializados en background (runs: pending/running/completed/failed)",
      "Export HTML listo para compartir + JSON para BI/pipelines",
      "Secciones y métricas adaptables por CRM (Q10 como primer módulo)",
      "Trazabilidad: cada métrica se conecta a data conversacional de CloserCat"
    ],
    extraText: "El objetivo no es solo ‘ver números’: es conectar WhatsApp → operación → CRM → gerencia con reporting reproducible y customizable por integración.",
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SECCIÓN 12: COMPARATIVA
  // ═══════════════════════════════════════════════════════════════════════════

  // SLIDE 20: TRANSICIÓN
  {
    id: 20,
    type: SlideType.TRANSITION,
    title: "CloserCat vs. La competencia",
    subtitle: "No todas las soluciones de WhatsApp venden igual"
  },

  // SLIDE 21: TABLA COMPARATIVA
  {
    id: 21,
    type: SlideType.COMPARISON_TABLE,
    title: "¿Por qué CloserCat?",
    footerText: "CloserCat combina IA + humanos en la misma conversación, enriquecimiento de contactos automático y datos conversacionales integrables de punta a punta para escalar tus ventas"
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SECCIÓN 13: ROLES Y PERMISOS (NUEVO)
  // ═══════════════════════════════════════════════════════════════════════════

  // SLIDE 21B: ROLES Y PERMISOS (NUEVO)
  {
    id: 42,
    type: SlideType.STANDARD,
    title: "Control granular: cada quien ve lo que necesita",
    subtitle: "Roles y permisos para equipos de cualquier tamaño",
    content: "CloserCat maneja tres niveles de acceso para que puedas escalar tu equipo de forma segura.",
    bullets: [
      "👤 Usuario Normal: gestiona sus conversaciones asignadas, envía mensajes, usa plantillas",
      "🔧 Admin de Tenant: configura IA, crea campañas, gestiona usuarios, ve métricas globales",
      "⚡ Super Admin: acceso multi-tenant, configuración avanzada, soporte técnico"
    ],
    extraText: "Multi-tenant nativo: cada cuenta está completamente aislada. Un admin no puede ver datos de otro tenant.",
  },

  {
    id: 47,
    type: SlideType.STANDARD,
    title: "Operación diaria sin sorpresas: qué pasa cuando algo falla",
    subtitle: "Troubleshooting diseñado para equipos reales",
    bullets: [
      "🤖 IA no responde: revisa toggle de IA, estado de guardrails y mensajes de circuito abierto",
      "🖼️ Imágenes que no cargan: URLs se regeneran automáticamente; si persiste, revisa cuota de storage",
      "📢 Campañas lentas: límites de WhatsApp (~80 msg/seg) protegen tu número del spam",
      "🔌 Integraciones/CRM: logs y circuit breaker para detectar y aislar fallos externos"
    ],
    extraText: "La plataforma incluye mensajes claros en UI, páginas de ayuda y límites documentados para que sepas qué está pasando y qué hacer sin depender de soporte técnico cada vez.",
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SECCIÓN 14: PRECIOS Y SERVICIOS
  // ═══════════════════════════════════════════════════════════════════════════

  // SLIDE 22: PRECIOS POR MENSAJES (SUSCRIPCIÓN)
  {
    id: 22,
    type: SlideType.PRICING,
    title: "Planes de suscripción para operar WhatsApp en serio",
    subtitle: "Contrato anual. Mensajes que se acumulan mes a mes. Precios en COP (no incluyen costos de Meta/WhatsApp Business API).",
    columns: [
      {
        title: "Starter",
        priceMessage: "161 COP",
        unitMessage: "/msg",
        detailMessage: "Paquete mensual 2.000 msgs ≈ 322.000 COP/mes",
        pricePlatform: "",
        unitPlatform: "",
        detailPlatform: "",
        features: [
          "Activación de WhatsApp y configuración inicial incluidas",
          "Mensajes se acumulan mes a mes durante el año",
          "Uso de la plataforma incluso si la IA está apagada",
          "Contact Enrichment y Knowledge Base incluidos",
          "Ideal para equipos pequeños que recién formalizan el canal"
        ]
      },
      {
        title: "Growth",
        priceMessage: "144 COP",
        unitMessage: "/msg",
        detailMessage: "Paquete mensual 10.000 msgs ≈ 1.449.000 COP/mes",
        pricePlatform: "",
        unitPlatform: "",
        detailPlatform: "",
        features: [
          "Todo lo de Starter",
          "Hasta +10% de exceso mensual sin costo antes de adelantar pago",
          "Guardrails avanzados con incident tracking",
          "Uso intensivo de la plataforma por varios vendedores sin costos extra de licencia"
        ]
      },
      {
        title: "Pro",
        priceMessage: "136 COP",
        unitMessage: "/msg",
        detailMessage: "Paquete mensual 25.000 msgs ≈ 3.400.000 COP/mes",
        pricePlatform: "",
        unitPlatform: "",
        detailPlatform: "",
        features: [
          "Todo lo de Growth",
          "Hasta +15% de exceso mensual sin costo",
          "5% de descuento en proyectos de integración",
          "5 campañas simultáneas con 50,000 targets cada una",
          "Pensado para marcas con varias campañas y números en paralelo"
        ]
      },
      {
        title: "Enterprise",
        priceMessage: "128 COP",
        unitMessage: "/msg",
        detailMessage: "Paquete mensual 100.000 msgs ≈ 12.800.000 COP/mes",
        pricePlatform: "",
        unitPlatform: "",
        detailPlatform: "",
        features: [
          "Todo lo de Pro",
          "Hasta +20% de exceso mensual sin costo",
          "10% de descuento en integraciones a medida",
          "SLA garantizado para operaciones que viven en WhatsApp"
        ]
      }
    ],
    footerText: "On-Demand (sin contrato): Starter 1.000 msgs = 180.000 COP (180 COP/msg, 90 días); Growth 5.000 msgs = 810.000 COP (162 COP/msg, 120 días); Pro 10.000 msgs = 1.530.000 COP (153 COP/msg, 180 días).\nUn mensaje = cada respuesta enviada. Conversación abierta dentro de ventana 24h = mensajes ilimitados de respuesta.\nPrecios corporativos (mayoreo): para >100.000 msgs/mes, IA entre ~157 y 122 COP/msg según volumen, contrato anual y condiciones."
  },

  // SLIDE 23: IMPLEMENTACIÓN Y SERVICIOS
  {
    id: 23,
    type: SlideType.TIMELINE,
    title: "Implementación y servicios: de cero a equipo en producción",
    columns: [
      { title: "Hito 1: Setup Técnico", content: ["Conexión WhatsApp API oficial", "Importación de historial", "Configuración de roles y permisos"] },
      { title: "Hito 2: Calibración IA", content: ["Configuración de Knowledge Base", "Definición de Guardrails y políticas", "Personalización de tono y casos de uso"] },
      { title: "Hito 3: Go-Live", content: ["Despliegue a equipo comercial", "Monitoreo de Contact Enrichment", "Ajustes de optimización"] }
    ],
    addOns: [
      { title: "Activación de número WhatsApp Business", price: "≈ 450.000 COP", detail: "Pago único por número (configuración técnica + multiusuario básico)" },
      { title: "Línea Adicional WhatsApp", price: "≈ 100.000 COP", detail: "/mes por línea activa (equivalente a USD 25 aprox)" },
      { title: "Integración Q10 CRM nativa", price: "Desde ≈ 1.500.000 COP", detail: "Pago único, sincronización bidireccional (≈ USD 375)" },
      { title: "Integraciones CRM/ERP a la medida", price: "Desde ≈ 3.500.000 COP", detail: "Proyecto custom vía webhooks + n8n/Make (≈ USD 875)" },
      { title: "Customización avanzada del asistente", price: "≈ 1.200.000 COP", detail: "Diseño de prompts + combinación de casos de uso + pruebas guiadas (≈ USD 300)" },
      { title: "Onboarding Asistido", price: "≈ 600.000 COP", detail: "Sesión de 2 horas con equipo experto (equivalente a USD 150 aprox.)" },
      { title: "Consultoría Light – Discovery & ROI", price: "≈ 800.000 COP", detail: "Sesión de diagnóstico (2-3h): entendemos tu operación, construimos un caso de negocio con números reales y estimamos presupuesto mensual + retorno de inversión esperado (≈ USD 200)" }
    ],
    supportLevels: [
      { plan: "Starter", channel: "Email", sla: "Respuesta < 48h" },
      { plan: "Growth", channel: "Chat & Email", sla: "Respuesta < 24h" },
      { plan: "Pro", channel: "Prioritario", sla: "Respuesta < 12h" },
      { plan: "Enterprise", channel: "Dedicado 24/7", sla: "SLA < 1h Garantizado" }
    ]
  },

  // SLIDE 24: SOLO PLATAFORMA (POR CONTACTOS ACTIVOS)
  {
    id: 38,
    type: SlideType.GRID,
    title: "Solo plataforma CloserCat (traes tu API/IA)",
    subtitle: "Licencia de software por contactos activos. No incluye mensajes (Meta/CPaaS) ni servicios de IA.",
    columns: [
      {
        title: "Hasta 5.000 contactos activos",
        content: [
          "≈ 390.000 COP/mes (≈ USD 100).",
          "Incluye panel, reglas, plantillas, campañas y reporting.",
          "Media Gallery 500MB incluida.",
          "Ideal para equipos pequeños con infraestructura de WhatsApp/IA propia."
        ]
      },
      {
        title: "Hasta 20.000 contactos activos",
        content: [
          "≈ 780.000 COP/mes (≈ USD 200).",
          "Pensado para mid-market con varios vendedores y campañas activas.",
          "Todo el valor de la plataforma sin tocar tu stack de mensajes/IA actual."
        ]
      },
      {
        title: "Hasta 50.000 contactos activos",
        content: [
          "≈ 1.560.000 COP/mes (≈ USD 400).",
          "Para marcas que ya viven en WhatsApp y necesitan un centro de comando.",
          "Hasta 50,000 targets por campaña, 5 campañas simultáneas."
        ]
      },
      {
        title: "+50.000 contactos activos (Enterprise)",
        content: [
          "Desde ≈ 3.120.000 COP/mes (≈ USD 800+/mes), negociado caso a caso.",
          "Se ajusta según número de equipos, países, integraciones y SLA requerido.",
          "Pensado para bancos, telcos, retailers grandes y operaciones multi-país."
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SECCIÓN 15: CAPACIDADES Y LÍMITES (NUEVO)
  // ═══════════════════════════════════════════════════════════════════════════

  // SLIDE 38B: LÍMITES Y CAPACIDADES (NUEVO)
  {
    id: 43,
    type: SlideType.STANDARD,
    title: "Capacidad que escala contigo",
    subtitle: "Límites transparentes diseñados para operaciones reales",
    content: "CloserCat está diseñado para soportar operaciones de alto volumen sin sorpresas.",
    bullets: [
      "📨 Campañas: hasta 50,000 contactos por campaña, ~4,800/hora",
      "📚 Knowledge Base: 10,000 items (productos + servicios + FAQs)",
      "🔗 Webhooks: 20 suscripciones con retry automático",
      "👥 Contactos: sin límite, historial completo ilimitado",
      "🖼️ Storage: 500MB media gallery (ampliable)"
    ],
    extraText: "Todos los límites son configurables según tu plan. Habla con nosotros si necesitas más capacidad.",
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SECCIÓN 16: CIERRE
  // ═══════════════════════════════════════════════════════════════════════════

  // SLIDE 25: CIERRE Y CTA
  {
    id: 36,
    type: SlideType.TRANSITION,
    title: "¿Escalamos juntos tu operación de ventas en WhatsApp?",
    subtitle: "Agendemos una sesión para ver tu caso, tus datos actuales y cómo configurar CloserCat para tu negocio."
  },
];
