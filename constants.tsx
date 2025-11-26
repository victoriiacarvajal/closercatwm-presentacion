import { SlideData, SlideType } from './types';
import React from 'react';

// Icons used in content (represented as strings for rendering logic or just text)
export const SLIDES: SlideData[] = [
  // SLIDE 1: PORTADA
  {
    id: 1,
    type: SlideType.COVER,
    title: "CloserCat",
    subtitle: "Convierte el caos de WhatsApp en una oportunidad para escalar tu operación de ventas",
    imagePlaceholder: "Screenshot del Dashboard de CloserCat",
    imageUrl: "/closercat-dashboard.png", // PEGA AQUÍ LA URL DE TU IMAGEN
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
      "05 Plantillas, campañas y marketing conversacional que sí convierten",
      "06 Integraciones, comparativa y diferenciales clave",
      "07 Cuánto cuesta y cómo empezamos"
    ]
  },
  // SLIDE 3: TRANSICIÓN
  {
    id: 3,
    type: SlideType.TRANSITION,
    title: "El caos de WhatsApp comercial",
    subtitle: "tiene solución inteligente"
  },
  // SLIDE 4: SOBRE CLOSERCAT
  {
    id: 4,
    type: SlideType.SPLIT_IMAGE,
    title: "Estamos aquí para empoderarte",
    content: "CloserCat nace de la frustración de ver cómo equipos talentosos pierden oportunidades por la desorganización de WhatsApp Business. Centralizamos, automatizamos con IA y te ayudamos a escalar tu operación de ventas sin perder control sobre cada conversación.",
    imagePlaceholder: "Equipo trabajando con dashboard CloserCat",
    imageUrl: "/closercat-imagen-celular.png", // PEGA AQUÍ LA URL DE TU IMAGEN
    videoUrl: "",
  },
  // SLIDE 5: NUESTRA VISIÓN
  {
    id: 5,
    type: SlideType.SPLIT_IMAGE,
    title: "Transformamos WhatsApp en tu mejor canal de ventas",
    content: "Donde la IA aprende de tus mejores closers y tu equipo mantiene el control para escalar la operación sin perder calidad humana.",
    imagePlaceholder: "Conversaciones caóticas vs Dashboard Organizado",
    imageUrl: "/closercat-imagen-ia.png", // PEGA AQUÍ LA URL DE TU IMAGEN
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
      "El usuario puede enviar mensajes en ráfaga",
      "La IA espera el contexto completo antes de responder, como haría tu mejor closer",
      "Una única respuesta coherente y contextual"
    ],
    extraText: "",
    imagePlaceholder: "Conversación con mensajes en ráfaga y respuesta inteligente",
    imageUrl: "/closercat-conversacion.png", // PEGA AQUÍ LA URL DE TU IMAGEN
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
      "🛒 Venta transaccional: recomendación de productos y recepción de pedidos",
      "🎯 Prospección: informa, califica y agenda sin que tu equipo toque el teclado",
      "🛟 Servicio al cliente: FAQs y base de conocimiento documental",
      "🤖 Un asistente entrenado solo con tu operación, no con plantillas genéricas"
    ],
    extraText: "Cada configuración es exclusiva para tu negocio. Puedes combinar casos de uso según la etapa del cliente y, si se requiere manejar múltiples casos de uso en una misma conversación, hacemos una revisión y ajuste personalizados para garantizar coherencia.",
    imagePlaceholder: "Pantalla de configuración del asistente (casos de uso y datos del negocio)",
    imageUrl: "/closercat-configuracion-asistente.png", // PEGA AQUÍ LA URL DE TU IMAGEN
    videoUrl: "/closercat-casos-de-uso-v1.mp4", // PEGA AQUÍ LA URL DE TU VIDEO DE CONFIGURACIÓN
  },
  // SLIDE 5D: COMPRENSIÓN MULTIMODAL (solo texto)
  {
    id: 26,
    type: SlideType.STANDARD,
    title: "La IA entiende texto, imágenes y audios como tu mejor vendedor",
    content: "El asistente entiende mucho más que texto: aprovecha todo lo que tus clientes comparten para responder mejor y avanzar hacia el cierre.",
    bullets: [
      "📝 Textos: mensajes completos con contexto de la conversación",
      "🖼️ Imágenes: productos, documentos, capturas y más",
      "🎤 Audios: notas de voz transcritas y entendidas por la IA",
      "🧠 Generación de respuestas basada en todas las señales disponibles"
    ],
    extraText: "La IA combina texto, imágenes y audio para mantener una sola línea de conversación coherente.",
  },
  // SLIDE 6: EL PROBLEMA
  {
    id: 6,
    type: SlideType.STANDARD,
    title: "01 El caos de WhatsApp comercial hoy",
    subtitle: "Los equipos de ventas enfrentan retos que cuestan tiempo, dinero y bloquean el crecimiento:",
    bullets: [
      "📱 Conversaciones desperdigadas en múltiples dispositivos y números",
      "🔍 Pérdida de contexto: ¿Qué le prometiste a este cliente hace 2 semanas?",
      "⏰ Respuestas 4+ horas tarde = leads que le escriben a tu competencia",
      "📊 Cero métricas: imposible medir el desempeño real del equipo",
      "🗃️ Desorganización: conversaciones perdidas en el historial infinito",
      "❌ Sin seguimiento: hasta 60% de leads se olvidan y nunca se cierran"
    ],
    extraText: "El 78% de compradores B2B elige al proveedor que responde primero."
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
    imageUrl: "", // PEGA AQUÍ LA URL DE TU IMAGEN
    videoUrl: "",
  },
  // SLIDE 8: TRANSICIÓN
  {
    id: 8,
    type: SlideType.TRANSITION,
    title: "Con CloserCat",
    subtitle: "cada conversación es una oportunidad organizada"
  },
  // SLIDE 9: CENTRO DE COMANDO
  {
    id: 9,
    type: SlideType.DASHBOARD,
    title: "¿Cómo escalarías tu operación si todo tu equipo vendiera desde un solo panel?",
    subtitle: "Un solo panel para gestionar todas tus conversaciones comerciales, sin abrir WhatsApp.",
    imagePlaceholder: "DASHBOARD COMPLETO: Barra superior (Plantillas, Cierre), Panel de conversaciones, Filtros",
    imageUrl: "/closercat-dashboard.png", // PEGA AQUÍ LA URL DE TU IMAGEN
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
      "✓ Escucha en ráfaga: procesa múltiples mensajes antes de responder",
      "✓ Guardrails inteligentes: nunca da información fuera de tus políticas",
      "✓ Integración nativa con WhatsApp Business API"
    ],
    imagePlaceholder: "Comparativa CloserCat vs Chatbot Genérico",
    imageUrl: "/closercat-integracion.png", // PEGA AQUÍ LA URL DE TU IMAGEN
    videoUrl: "",
  },
  // SLIDE 11: ACCESOS RÁPIDOS (GRID)
  {
    id: 11,
    type: SlideType.GRID,
    title: "Accesos rápidos para vender más rápido",
    columns: [
      { title: "1️⃣ PLANTILLAS 📝", content: ["Acceso instantáneo a plantillas probadas", "Seguimientos, objeciones, demos", "Personaliza con tu voz de marca"] },
      { title: "2️⃣ CIERRE ✅", content: ["Marca conversaciones como cerradas", "Seguimiento de conversiones", "Métricas de éxito por agente"] },
      { title: "3️⃣ INTEGRACIONES 🔗", content: ["Conecta WhatsApp Business API", "CRMs, Zapier, Make, Google Sheets", "Flujo de datos automatizado"] },
      { title: "4️⃣ CAMPAÑAS 🎯", content: ["Organiza por producto o región", "Tracking de ROI por campaña", "A/B testing de mensajes"] }
    ]
  },
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
    extraText: "Beneficio clave: sin cambiar de app, sin perder contexto y sin saltar entre pantallas.",
    imagePlaceholder: "Botón Cyan brillante INICIAR NUEVA CONVERSACIÓN",
    imageUrl: "/closercat-conversacion.png", // PEGA AQUÍ LA URL DE TU IMAGEN
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
    extraText: "Búsqueda, filtros y ordenamiento se aplican en tiempo real, sin recargar la pantalla.",
    imagePlaceholder: "Panel de Filtrar y Buscar expandido",
    imageUrl: "/closercat-busqueda.png", // PEGA AQUÍ LA URL DE TU IMAGEN
    videoUrl: "/closercat-buscador-v3.mp4",
  },
  // SLIDE 14: IA VS MANUAL
  {
    id: 14,
    type: SlideType.SPLIT_IMAGE,
    title: "Activa o desactiva la IA según cada conversación",
    content: "La IA no reemplaza a tu equipo: los acompaña. Puedes activar o desactivar la IA conversación por conversación, y cuando está en modo manual tus comerciales responden directamente con todo el contexto.",
    bullets: [
      "🤖 Modo IA ACTIVADA: la IA propone respuestas basadas en entrenamiento y tú decides qué se envía.",
      "✍️ Modo MANUAL: tu equipo responde directamente usando texto, imágenes, audios o documentos.",
      "🔁 Cambio rápido entre modos sin salir de la conversación."
    ],
    extraText: "En esta vista puedes ver el toggle de IA y cómo cambia el flujo entre modo automático y manual.",
    imagePlaceholder: "Interfaz mostrando el toggle IA activada/desactivada",
    imageUrl: "/closercat-modo-ia-manual.png", // PEGA AQUÍ LA URL DE TU IMAGEN
    videoUrl: "/closercat-human-message-v1.mp4", // PEGA AQUÍ LA URL DE TU VIDEO DEMO IA ON/OFF
  },
  // SLIDE 15: PLANTILLAS (SPLIT_IMAGE)
  {
    id: 15,
    type: SlideType.SPLIT_IMAGE,
    title: "Plantillas para enviar mensajes manuales mucho más rápido",
    content: "Todas personalizables. Pensadas para que tu equipo envíe mensajes manuales más rápido, sin empezar desde cero y aprovechando lo que ya funciona.",
    bullets: [
      "📋 SEGUIMIENTO POST-DEMO: 'Gracias por tu tiempo...'",
      "💰 CIERRE CONSULTIVO: 'Propuesta personalizada lista'",
      "🔥 MANEJO DE OBJECIONES: 'Comparativa vs. competencia'",
      "❄️ REACTIVACIÓN: 'Nueva oferta exclusiva para ti'"
    ],
    imagePlaceholder: "Interfaz de Configuración de Plantillas",
    imageUrl: "/closercat-plantillas.png", // PEGA AQUÍ LA URL DE TU IMAGEN
    videoUrl: "",
  },
  // SLIDE 16: GUARDRAILS
  {
    id: 16,
    type: SlideType.SPLIT_IMAGE,
    title: "Guardrails: la IA nunca se sale de tus políticas",
    bullets: [
      "❌ Temas prohibidos (ej: descuentos sin autorización)",
      "❌ Bloqueo de información sensible o fuera de política",
      "✅ Evaluación previa de cada respuesta antes de enviarse",
      "✅ Escalación automática a supervisor cuando hay riesgo",
      "✅ Alineación con tono de marca y directrices legales (ej. GDPR)"
    ],
    extraText: "Cada respuesta se evalúa para mitigar riesgos: proteger la reputación de tu empresa, evitar compromisos que no debe asumir y mantener siempre alineación con las instrucciones generales. Ejemplo: Cliente pide 50% descuento → la IA escala a manager en lugar de prometer algo imposible.",
    imagePlaceholder: "Toggle Guardrails activado con indicador visual",
    imageUrl: "", // PEGA AQUÍ LA URL DE TU IMAGEN
    videoUrl: "/closercat-guardrails-v1.mp4",
  },
  // SLIDE 16B: ESTADO DE CONVERSACIÓN EN TIEMPO REAL
  {
    id: 27,
    type: SlideType.STANDARD,
    title: "Estado de cada conversación en tiempo real",
    subtitle: "Prioriza dónde intervenir para cerrar más",
    content: "CloserCat clasifica automáticamente cada conversación según su avance hacia el cierre.",
    bullets: [
      "🔵 Iniciada: conversación recién comenzada",
      "🟡 En progreso: interacción activa hacia el objetivo",
      "🟠 En riesgo: posibilidad alta de perder la oportunidad",
      "🟢 Cierre positivo: objetivo alcanzado (venta, cita, etc.)",
      "🔴 Cierre negativo: oportunidad perdida o descartada"
    ],
    extraText: "Esta clasificación permite a tu equipo enfocarse en las conversaciones que más impacto tienen en el negocio.",
  },
  // SLIDE 16C: EXTRACCIÓN ESTRUCTURADA DE DATOS
  {
    id: 28,
    type: SlideType.SPLIT_IMAGE,
    title: "De conversación natural a datos accionables",
    content: "Mientras la conversación fluye, CloserCat extrae y organiza datos clave del contacto de forma estructurada.",
    bullets: [
      "Mantiene actualizado el contexto del contacto",
      "Extrae nombre, intereses, necesidades y objeciones",
      "Prepara la información para enviarla a tu CRM o BI",
      "Enriquecimiento progresivo del perfil con cada interacción"
    ],
    extraText: "Los datos conversacionales dejan de vivir solo en WhatsApp y se convierten en un activo reutilizable.",
    imagePlaceholder: "Conversación de WhatsApp transformada en JSON estructurado",
    imageUrl: "/closercat-contexto.png", // PEGA AQUÍ LA URL DE TU IMAGEN
    videoUrl: "/closercat-contact-extraction-v1.mp4",
  },
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
    extraText: "Funcionalidades: etiquetado automático, métricas en tiempo real y ROI medible por campaña.",
    imagePlaceholder: "Panel de CAMPAÑAS con métricas",
    imageUrl: "/closercat-campañas.png", // PEGA AQUÍ LA URL DE TU IMAGEN
    videoUrl: "",
  },
  // SLIDE 17B: CAMPAÑAS - MÉTODO 1 CSV
  {
    id: 29,
    type: SlideType.SPLIT_IMAGE,
    title: "Campañas – Método 1: importa tu base y dispara mensajes masivos",
    content: "Crea campañas importando tu base de contactos existente mediante un archivo CSV.",
    bullets: [
      "Importa contactos desde archivos CSV o Excel",
      "Mapeo de campos personalizados para cada negocio",
      "Uso de variables dinámicas dentro de las plantillas",
      "Ideal para bases de datos históricas que ya tienes",
      "Permite iniciar rápidamente campañas a gran escala"
    ],
    extraText: "Ejemplo: importar leads desde tu CRM actual o desde hojas de cálculo.",
    imagePlaceholder: "Modal de campañas mostrando pestaña CSV",
    imageUrl: "/closercat-csv.png", // PEGA AQUÍ LA URL DE TU IMAGEN
    videoUrl: "",
  },
  // SLIDE 17C: CAMPAÑAS - CONSTRUCTOR DE AUDIENCIAS
  {
    id: 30,
    type: SlideType.SPLIT_IMAGE,
    title: "Campañas – Método 2: audiencias para marketing 1 a 1",
    subtitle: "Segmentación inteligente basada en comportamiento",
    content: "Usa toda la data recolectada en conversaciones para iniciar mensajes de marketing 1 a 1 altamente relevantes.",
    bullets: [
      "Segmentación por datos de contacto y atributos personalizados (ej. producto de interés)",
      "Filtros por comportamiento conversacional y estado de cierre (ej. interesados sin compra)",
      "Audiencias dinámicas que se actualizan con cada nueva conversación",
      "Desencadena campañas de marketing 1 a 1 con mensajes relevantes para cada segmento"
    ],
    extraText: "Tus campañas dejan de ser listas estáticas y se vuelven audiencias vivas basadas en comportamiento real.",
    imagePlaceholder: "Constructor de audiencias con filtros avanzados",
    imageUrl: "/closercat-audiencias.png", // PEGA AQUÍ LA URL DE TU IMAGEN
    videoUrl: "",
  },
  // SLIDE 17D: DASHBOARD DE CAMPAÑAS
  {
    id: 31,
    type: SlideType.SPLIT_IMAGE,
    title: "Mide cada campaña en tiempo real (sin Excel)",
    subtitle: "Mide el impacto de cada envío",
    content: "Cada campaña cuenta con un dashboard completo para entender qué está funcionando y dónde intervenir.",
    bullets: [
      "Métricas clave: enviados, entregados, leídos, respondidos",
      "Pestañas para Resumen, Audiencias, CSV, Targets y Configuración",
      "Botón 'Nueva campaña' siempre visible para iterar rápido",
      "Visión consolidada del performance de tus esfuerzos conversacionales"
    ],
    imagePlaceholder: "Dashboard de campañas con métricas y pestañas",
    imageUrl: "/closercat-dashboard-campanas.png", // PEGA AQUÍ LA URL DE TU IMAGEN
    videoUrl: "/closercat-campañas-v1.mp4",
  },
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
    extraText: "Recupera contexto de conversaciones de hace 6 meses en segundos, ya sea que se hayan archivado automáticamente o por decisión de tu equipo.",
    imagePlaceholder: "Panel de Archivados",
    imageUrl: "/closercat-contexto.png", // PEGA AQUÍ LA URL DE TU IMAGEN
    videoUrl: "/closercat-gestion-conversacion-v1.mp4",
  },
  // SLIDE 19: SEGUIMIENTOS
  {
    id: 19,
    type: SlideType.STANDARD,
    title: "Nunca olvides una oportunidad",
    bullets: [
      "📅 Programa recordatorios claros (automáticos o manuales): 'Contactar en 3 días'",
      "⏰ Alertas automáticas por Email/Slack si no hay respuesta",
      "📊 Dashboard: vista de hoy, semana y mes priorizada por impacto"
    ],
    extraText: "Los seguimientos programados, combinando automatización y acción manual de tu equipo, aumentan tu tasa de cierre hasta un 40%.",
  },
  // BLOQUE DE INTEGRACIONES
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
      "Arquitectura abierta preparada para integraciones",
      "Datos conversacionales estructurados y exportables",
      "Dos métodos principales: Webhooks en tiempo real e integraciones CRM nativas",
      "Flujo bidireccional de información entre CloserCat y tus herramientas"
    ],
    extraText: "CloserCat no reemplaza tu stack, lo potencia conectándose donde ya trabajas hoy.",
    imagePlaceholder: "Vista de integraciones conectando CloserCat con tu stack actual",
    imageUrl: "/closercat-integracion.png", // PEGA AQUÍ LA URL DE TU IMAGEN DE INTEGRACIONES
    videoUrl: "/closercat-integrations-v1.mp4", // PEGA AQUÍ LA URL DE TU VIDEO DE INTEGRACIONES
  },
  // SLIDE 19C: INTEGRACIONES POR WEBHOOKS
  {
    id: 33,
    type: SlideType.SPLIT_IMAGE,
    title: "Método 1: Webhooks en tiempo real",
    subtitle: "Conecta con n8n, Make, Zapier y más",
    content: "Emite eventos de conversación en tiempo real para disparar automatizaciones en tus herramientas favoritas.",
    bullets: [
      "Eventos cuando hay nuevos mensajes, cambios de estado o cierres",
      "Compatible con n8n, Make, Zapier y otros orquestadores",
      "Payload JSON estructurado listo para leer en tus flujos",
      "Permite orquestar flujos complejos sin tocar el core de CloserCat"
    ],
    extraText: "Ejemplo: cuando una conversación llega a 'Cierre positivo', envía automáticamente el lead a tu CRM, notifica a tu equipo en Slack y todo sin tocar tu core.",
    imagePlaceholder: "Diagrama CloserCat → Webhook → n8n/Make → CRM/Slack",
    imageUrl: "/closercat-webhooks.png", // PEGA AQUÍ LA URL DE TU IMAGEN
    videoUrl: "",
  },
  // SLIDE 19D: INTEGRACIONES CRM NATIVAS
  {
    id: 34,
    type: SlideType.SPLIT_IMAGE,
    title: "Método 2: Integraciones CRM nativas",
    subtitle: "Una sola verdad entre conversaciones y CRM",
    content: "Sincronización bidireccional entre CloserCat y tu CRM para que ambos sistemas compartan la misma realidad.",
    bullets: [
      "Envía datos de conversaciones y cierres directamente a tu CRM",
      "Recibe información del CRM para enriquecer las respuestas de la IA",
      "Sincronización automática en ambas direcciones",
      "Evita duplicados y mantiene una sola fuente de verdad"
    ],
    extraText: "La IA puede usar datos históricos del CRM durante la conversación para personalizar aún más sus respuestas y aumentar tus tasas de cierre.",
    imagePlaceholder: "Diagrama de doble flecha CloserCat ↔ CRM",
    imageUrl: "/closercat-crm.png", // PEGA AQUÍ LA URL DE TU IMAGEN
    videoUrl: "",
  },
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
    footerText: "CloserCat es el único que combina IA + humanos en la misma conversación y datos conversacionales de punta a punta para escalar tus ventas"
  },
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
        // Campos de plataforma vacíos: este slide es solo de mensajes
        pricePlatform: "",
        unitPlatform: "",
        detailPlatform: "",
        features: [
          "Activación de WhatsApp y configuración inicial incluidas",
          "Mensajes se acumulan mes a mes durante el año",
          "Uso de la plataforma incluso si la IA está apagada",
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
          "Mensajes acumulables durante el año",
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
    footerText: "On-Demand (sin contrato): Starter 1.000 msgs = 180.000 COP (180 COP/msg, 90 días); Growth 5.000 msgs = 810.000 COP (162 COP/msg, 120 días); Pro 10.000 msgs = 1.530.000 COP (153 COP/msg, 180 días).\nSuscripción por mensajes (recomendado): 2.000–100.000 msgs/mes entre 161–128 COP/msg, con activación, configuración y beneficios de exceso incluidos según tier.\nPrecios corporativos (mayoreo): para >100.000 msgs/mes, IA entre ~157 y 122 COP/msg según volumen, contrato anual y condiciones."
  },
  // SLIDE 23: IMPLEMENTACIÓN Y SERVICIOS
  {
    id: 23,
    type: SlideType.TIMELINE,
    title: "Implementación y servicios: de cero a equipo en producción",
    columns: [ // Milestones columns
      { title: "Hito 1: Setup Técnico", content: ["Conexión WhatsApp API", "Importación de historial", "Configuración de roles y permisos"] },
      { title: "Hito 2: Calibración IA", content: ["Entrenamiento con tus datos", "Definición de Guardrails", "Personalización de tono"] },
      { title: "Hito 3: Go-Live", content: ["Despliegue a equipo comercial", "Monitoreo en tiempo real", "Ajustes de optimización"] }
    ],
    addOns: [
      { title: "Activación de número WhatsApp Business", price: "≈ 450.000 COP", detail: "Pago único por número (configuración técnica + multiusuario básico)" },
      { title: "Línea Adicional WhatsApp", price: "≈ 100.000 COP", detail: "/mes por línea activa (equivalente a USD 25 aprox)" },
      { title: "Integración CRM/ERP estándar", price: "Desde ≈ 1.500.000 COP", detail: "Pago único, conectores soportados (≈ USD 375)" },
      { title: "Integraciones CRM/ERP a la medida", price: "Desde ≈ 3.500.000 COP", detail: "Proyecto custom sobre APIs propias (≈ USD 875)" },
      { title: "Customización avanzada del asistente", price: "≈ 1.200.000 COP", detail: "Diseño de prompts + combinación de casos de uso + pruebas guiadas (≈ USD 300)" },
      { title: "Onboarding Asistido", price: "≈ 600.000 COP", detail: "Sesión de 2 horas con equipo experto (equivalente a USD 150 aprox.)" }
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
          "Licencia de software pura: los mensajes y la IA los pagas a tu proveedor."
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
  // SLIDE 25: CIERRE Y CTA
  {
    id: 36,
    type: SlideType.TRANSITION,
    title: "¿Escalamos juntos tu operación de ventas en WhatsApp?",
    subtitle: "Agendemos una sesión para ver tu caso, tus datos actuales y cómo configurar CloserCat para tu negocio."
  },
];