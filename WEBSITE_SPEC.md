# Especificación Web CloserCat (MVP orientado a reuniones)

## 1. Objetivo
Construir una página web de CloserCat cuyo **objetivo principal es agendar reuniones** (demo/diagnóstico) con clientes potenciales. **No hay onboarding autogestionado**.

- **North Star Metric (NSM):** reuniones agendadas (Calendly/forma) por semana.
- **Eventos secundarios:** clicks en CTA, scroll depth, visitas a sección “Cómo funciona”, envío de formulario.

## 2. Público y propuesta de valor
### 2.1 Usuarios objetivo
- **Dueños/Directores comerciales** que operan ventas por WhatsApp.
- **Heads de soporte/operaciones** con alto volumen de conversaciones.
- **Instituciones educativas** (caso Q10) con funnel de admisiones.

### 2.2 Propuesta de valor (resumen)
CloserCat convierte el caos de WhatsApp en un canal escalable:
- **Panel único multiusuario**
- **IA con control humano**
- **Guardrails** (seguridad de respuestas)
- **Contact Enrichment + Contacts Management**
- **Campañas**
- **Integraciones** (webhooks + CRM)
- **Analytics & Reporting** (data nativa CloserCat + módulos por CRM, ejemplo: Q10)

Fuente de la narrativa: `docs/presentacion/constants.tsx`.

## 3. Identidad de marca (CloserCat)
### 3.1 Look & feel
- **Tema:** Light por defecto + Dark mode (por `prefers-color-scheme` o `data-theme="dark"`).
- **Color acento principal:** gradiente **brand cyan/blue → purple**.
- **Tokens base (según `styles/brand.css`):**
  - `--brand-blue-primary`: `#08C4F4`
  - `--brand-purple-closer`: `#8336FF`
  - `--brand-bg-light`: `#F2F2F5`
  - `--brand-bg-dark`: `#121212`
  - `--brand-surface-dark`: `#1E1E1E`
- **Fondos:** superficies claras (light) y oscuras (dark) con contraste alto; sombras con tintes azul/morado.
- **Estilo:** “operación seria” (enterprise-lite) pero moderno.

### 3.2 Tipografía
- UI: **Inter**
- Headings: **Poppins**
- Code/snippets (si aplica): **Roboto Mono**

### 3.3 Componentes
- Bootstrap 5.3 + estilos de marca (alineado a `styles/brand.css`).

## 4. Arquitectura de información
### 4.1 MVP: estructura recomendada
- **Single-page landing** (`/`) con secciones.
- **Ruta /agenda** (opcional) como página ligera enfocada solo a conversión (embed calendario + FAQ). Puede ser la misma landing con anchor `#agenda`.
- **Páginas legales mínimas**:
  - `/privacy` (Política de privacidad)
  - `/terms` (Términos)

### 4.2 IA / contenido fuente (mapa desde slides)
Cada sección del sitio corresponde a bloques del deck:
- Portada/valor: slides 1, 4, 5
- Problema + Impacto: slides 6, 7
- Cómo funciona en 60s: slide 44
- Dashboard / centro de comando: slide 9
- Diferenciadores: slide 10
- Accesos rápidos/features: slide 11
- Operación diaria: slides 12–15
- Guardrails: slides 16, 27
- Contact Enrichment: slides 28, 40
- Contacts Management: slide 46
- Campañas: slides 17, 29, 30, 31
- Media Gallery: slide 41
- Seguimientos/archivado: slides 18, 19
- Integraciones: slides 32–34
- Analytics & Reporting (Q10): slide 37
- Roles: slide 42
- Troubleshooting: slide 47
- Pricing + implementación: slides 22, 23, 38, 43
- Cierre CTA: slide 36

## 5. Página principal (/) — especificación por secciones
### 5.1 Header (sticky)
**Objetivo:** navegación + CTA siempre visible.
- Logo CloserCat
- Links ancla:
  - Producto
  - Cómo funciona
  - IA + seguridad
  - Campañas
  - Integraciones
  - Analytics
- CTA primario (botón): **“Agendar demo”** (scroll a `#agenda` o abre `/agenda`).
- CTA secundario (link): **“Ver demo (video)”** (modal).

### 5.2 Hero (above the fold)
**Copy (base):**
- H1: “CloserCat”
- Subheadline: “Convierte el caos de WhatsApp en una oportunidad para escalar tu operación de ventas”
- Bullets de valor (3):
  - “Un solo panel multiusuario (sin abrir WhatsApp)”
  - “IA con guardrails y control humano”
  - “Contact Enrichment + campañas + reporting”
- CTAs:
  - Primario: **Agendar demo**
  - Secundario: **Ver video (1 min)**

**Media:** video corto (del deck) o screenshot.

### 5.3 Sección: El problema (dolor)
**Objetivo:** elevar urgencia.
- Title: “El caos de WhatsApp comercial hoy”
- Bullets (del slide 6) condensados.

### 5.4 Sección: Impacto económico
**Objetivo:** cuantificar costo.
- Title: “Lo que el desorden en WhatsApp te hace perder cada mes”
- Bullets (slide 7)
- Microcopy: “El 78% de compradores elige al proveedor que responde primero.”

### 5.5 Sección: Cómo funciona en 60 segundos
**Objetivo:** credibilidad y comprensión rápida.
- Title: “Cómo funciona en 60 segundos”
- Visual: diagrama vertical (6 pasos) con iconos.
- Contenido basado en slide 44.

### 5.6 Sección: Centro de comando (Dashboard)
**Objetivo:** aterrizar el “producto”.
- Screenshot grande del dashboard.
- Mensaje: “Un solo panel para gestionar conversaciones comerciales, sin abrir WhatsApp.”

### 5.7 Sección: Diferenciadores
**Objetivo:** posicionamiento vs chatbot genérico.
- Tabla/Lista comparativa corta (5–6 puntos del slide 10).

### 5.8 Sección: Módulos clave (grid)
**Objetivo:** scannability.
- Grid 2x2:
  - Plantillas
  - Cierre
  - Media Gallery
  - Campañas

### 5.9 Sección: IA + equipo (operación diaria)
Subsecciones ligeras (cards):
- “Nuevas conversaciones en 3 clics”
- “Búsqueda y filtros”
- “IA vs Manual”
- “Plantillas WABA”

### 5.10 Sección: Configuración del Asistente (Use Case + KB)
**Objetivo:** explicar que la IA es configurable por negocio.
- Mostrar que existe un panel único:
  - Caso de uso
  - KB condicional (Productos/Servicios/FAQs)
- Imagen: `/closercat-configuracion-asistente.png`

### 5.11 Sección: Guardrails y seguridad
**Objetivo:** confianza.
- Explicar “juez”/validaciones.
- Mencionar incident tracking.

### 5.12 Sección: Contact Enrichment
**Objetivo:** valor de data.
- “11+ campos en tiempo real”

### 5.13 Sección: Contacts Management (24+ campos)
**Objetivo:** conectar enrichment → segmentación → reporting.
- Explicar:
  - 24+ campos
  - custom fields
  - import CSV
  - filtros para audiencias

### 5.14 Sección: Campañas
**Objetivo:** marketing conversacional medible.
- Método 1: CSV
- Método 2: Audiencias (24+ campos)
- Dashboard de campañas (tiempos estimados, límites WhatsApp)

### 5.15 Sección: Integraciones
**Objetivo:** “no reemplaza tu stack”.
- Webhooks (seguridad HMAC, retries)
- CRM nativo Q10

### 5.16 Sección: Analytics & Reporting (Q10 como ejemplo)
**Objetivo:** reposicionar analytics.
- Title: “Analytics & Reporting: convierte conversaciones en decisiones”
- Puntos:
  - data nativa CloserCat
  - reportes materializados
  - export HTML/JSON
  - módulos por CRM (Q10)

### 5.17 Sección: Roles y permisos
**Objetivo:** escalabilidad del equipo.
- Normal / Admin / Super Admin

### 5.18 Sección: Operación real (Troubleshooting)
**Objetivo:** reducir objeciones.
- IA no responde
- Imágenes expiran
- Campañas tardan
- Integraciones externas

### 5.19 Sección: Planes / implementación (sin self-serve)
**Objetivo:** encuadrar oferta sin fricción.
- Mostrar rangos/planes “desde…” (sin checkout).
- Explicar “Implementación y servicios: de cero a producción”.
- CTA fuerte hacia reunión.

### 5.20 Sección final CTA (Agenda)
Anchor `#agenda`.
- Title: “¿Escalamos juntos tu operación de ventas en WhatsApp?”
- Sub: “Agendemos una sesión para ver tu caso…”
- Opciones:
  1) **Embed Calendly**
  2) Formulario + selección de horario (si no hay calendly)

**Campos del formulario (si aplica):**
- Nombre
- Empresa
- WhatsApp
- Email
- Volumen mensual estimado
- Caso de uso (Ecommerce/B2B/Soporte/Educación)
- CRM actual (Q10 / HubSpot / Salesforce / Otro)
- Botón: “Agendar”

## 6. Conversión y UX
### 6.1 CTAs
- Primario: **Agendar demo**
- Secundario: **Ver video**
- Terciario: **Hablar por WhatsApp** (opcional, pero puede canibalizar reuniones; usar con cuidado).

### 6.2 Prueba social (si hay)
Si hay logos/clientes/casos, incluir sección breve.

### 6.3 Objecciones
FAQ cerca del CTA:
- “¿Necesito WhatsApp Business API?”
- “¿Puedo usarlo sin IA?”
- “¿Qué CRMs integran?”
- “¿Cuánto tarda una implementación?”

## 7. Requisitos técnicos
### 7.1 Performance
- LCP < 2.5s
- Imágenes optimizadas (WebP)
- Video lazy-loaded

### 7.2 Accesibilidad
- Contraste AA
- Focus states
- Navegación por teclado
- Labels en inputs

### 7.3 Tracking
Eventos mínimos:
- `cta_book_demo_click`
- `cta_video_open`
- `form_submit`
- `calendly_scheduled` (si disponible)
- `scroll_50`, `scroll_90`

UTMs preservados en enlaces CTA.

## 8. SEO
- Title/description por página.
- H1 único.
- OpenGraph.
- Schema.org:
  - Organization
  - Product

## 9. Entregables
- Landing page (1 página) + /agenda opcional
- Páginas legales
- Assets:
  - screenshots y videos (referenciados en `constants.tsx`)

## 10. Criterios de aceptación (MVP)
- La página carga correctamente en móvil/desktop.
- CTA “Agendar demo” siempre accesible.
- Se puede agendar reunión sin crear cuenta.
- Tracking básico funcionando.
- Mantiene identidad visual (brand `#08C4F4` + `#8336FF`, soporte light/dark) coherente con CloserCat.
