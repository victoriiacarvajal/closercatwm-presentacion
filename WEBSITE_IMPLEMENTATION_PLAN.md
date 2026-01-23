# Plan de acción — Website por defecto + Presentación por custom-url + Flujo formulario → presentación

## 0. Contexto y objetivo
Quieres que el sitio tenga **2 modos**:

1) **Website/Landing por defecto** cuando alguien entra “normal” (sin custom-url).
2) **Presentación (deck) como hoy** cuando alguien llega por un **custom-url** (hoy, en la práctica, se activa por `presentationId` en query string y/o `partner`/presets).

Y además un flujo de conversión:

- En el website, en vez de empujar de inmediato a Calendly, usar un **formulario de calificación/captura** para tener datos de contacto y poder “contactar de una”.
- Tras completar ese formulario (y/o tras confirmar la reunión, según el flujo elegido), redirigir a una **presentación personalizada** (custom-url) para “enganchar” y luego ahí sí dejar el CTA de agendar.

Este documento traduce `WEBSITE_SPEC.md` a cambios concretos sobre la implementación actual.

---

## 1. Estado actual (implementación hoy)

### 1.1 SPA sin routing real
- Proyecto Vite + React.
- `index.tsx` monta un único `App`.
- No existe React Router.

### 1.2 El `App.tsx` es solo “presentación”
- Renderiza el deck basado en `SLIDES` (`constants.tsx`) y `SLIDE_ORDER`.
- La “navegación” está bloqueada salvo:
  - preset válido (`presentationId`), o
  - desbloqueo por `SECRET_KEY`.

### 1.3 Detección de “modo presentación” hoy
- Se lee `presentationId` desde `window.location.search`.
- Si `presentationId` corresponde a preset:
  - habilita navegación
  - setea CTAs
  - guarda `closercat_referral_url`.
- Si no hay preset:
  - intenta redirigir a `closercat_referral_url` guardada.

### 1.4 Restricción importante
- `App.tsx` **fuerza** que `pathname` sea `/` o `/index.html`; si no, redirige a `/`.
  - Esto impide rutas tipo `/agenda`, `/privacy`, `/terms`.
  - También impide “custom-url” por path.

---

## 2. Propuesta de solución (arquitectura mínima)

### 2.1 Introducir un “modo website” y un “modo presentation”
Sin meter routing aún, lo más seguro es:

- Crear un componente `LandingApp` (website).
- Extraer la lógica actual a `PresentationApp`.
- En `App.tsx` decidir cuál renderizar según URL.

#### Heurística sugerida
- **Presentation mode** si:
  - existe `presentationId` válido (preset actual), o
  - existe `partner` válido (compatibilidad antigua), o
  - existe un flag futuro tipo `mode=presentation`.
- **Website mode (default)** si:
  - no hay `presentationId`/`partner`.

Esto mantiene el “custom-url” actual intacto, y te permite que `/` sea website por defecto.

### 2.2 Ajuste crítico: eliminar/limitar el auto-redirect a `closercat_referral_url`
Si dejamos el comportamiento actual, un usuario que una vez vio una presentación quedará “secuestrado” y al volver a `/` lo mandará a la presentación.

Opciones:
- **Opción recomendada:** deshabilitar ese redirect cuando la intención es website por defecto.
- Alternativa: solo redirigir si hay un query flag explícito, por ejemplo `?resume=1`.

---

## 3. Flujo de conversión (recomendación)

Tu mensaje mezcla dos ideas (presentación después de formulario vs después de confirmar reunión). Propongo soportar ambos, pero arrancar con uno claro.

### 3.1 Flujo recomendado (Form → Presentación → CTA Agendar)
1) Usuario entra al website (`/`).
2) CTA primario “Agendar demo” NO abre Calendly directamente; abre **formulario** (modal o sección `#agenda`).
3) Submit del formulario:
   - Se registra lead (mínimo: persistencia local + evento tracking; ideal: endpoint externo).
   - Se redirige a un **custom-url de presentación** (ej: `/?presentationId=wamedium`).
4) En la presentación, CTA de agendar (Calendly) está disponible.

Esto encaja con: “formulario para filtrar con datos de contacto, luego presentacion, y ahí CTA para agendar”.

### 3.2 Flujo alterno (Agendar → Confirmación → Presentación)
Si prefieres que el usuario agende primero:
1) Website → Calendly.
2) Calendly redirect (post scheduling) → `/?presentationId=<preset>&scheduled=1&...`.

Requisito: configurar Calendly para redirigir a esa URL.

---

## 4. “Custom-url” de presentación: formato y generación

### 4.1 Mantener compatibilidad
Hoy el mecanismo real es `/?presentationId=...`.

Recomendación MVP:
- Mantener este formato.
- Si deseas URLs bonitas:
  - configurar redirecciones en hosting (Netlify) tipo `/wamedium` → `/?presentationId=wamedium`.
  - esto es infra, no código.

### 4.2 “Presentación personalizada” sin backend
Sin backend no puedes “crear” una presentación única por lead, pero sí puedes:
- escoger preset por segmento (ej: `waquick`, `wamedium`, `nqprws`).
- adjuntar query params (ej: `leadId`, `utm_*`) para tracking.
- guardar el payload del formulario en `localStorage` y usarlo para:
  - personalizar copy ligero (“Hola, equipo de {empresa}…”), si lo deseas.

### 4.3 Si quieres personalización real/única
Se requiere un backend mínimo (serverless) para:
- crear `leadId`.
- almacenar lead.
- generar `presentationId` firmado (opcional) → mapping a preset/ctaUrl.

---

## 5. Implementación del website (según `WEBSITE_SPEC.md`)

### 5.1 Componentes nuevos
- `components/landing/LandingPage.tsx`
  - Header sticky con anchors.
  - Secciones 5.2–5.20 del spec.
- `components/landing/AgendaSection.tsx`
  - Formulario (campos del spec).
  - Submit handling + redirección.
- `components/landing/VideoModal.tsx`
  - CTA “Ver video”.

### 5.2 Estilos / UI framework
El spec habla de Bootstrap 5.3 + `styles/brand.css`, pero hoy el repo no tiene `styles/`.

Opciones:
- **A (rápida):** CSS propio (sin Bootstrap) con tokens básicos.
- **B (alineada spec):** agregar Bootstrap:
  - vía CDN en `index.html`, o
  - via `npm i bootstrap` e import en CSS.

Decisión recomendada:
- Empezar con **A** para iterar rápido.
- Migrar a **B** si el look&feel requiere componentes Bootstrap.

---

## 6. Cambios concretos por archivo (propuesto)

### 6.1 `App.tsx`
- Extraer la lógica actual a `PresentationApp` (mismo comportamiento).
- Crear `LandingApp`.
- Decidir vista:
  - si `presentationId`/`partner` válido → `PresentationApp`.
  - si no → `LandingApp`.
- Eliminar/limitar:
  - `pathname` normalization que hoy bloquea rutas.
  - auto-redirect a `closercat_referral_url`.

### 6.2 `constants.tsx`
- Ya está alineado a los slides que el spec mapea.
- Pendiente opcional: incluir en `SLIDE_ORDER` los nuevos slides si quieres que aparezcan en el flujo default.

### 6.3 `index.html`
- Si se adopta Bootstrap CDN, se agrega link.
- Metadatos SEO (title/description/OG) según spec.

### 6.4 Nuevo: `components/landing/*`
- Implementar secciones.
- Asegurar performance: lazy load de video.

---

## 7. Formulario: comportamiento detallado

### 7.1 Campos (del spec)
- Nombre
- Empresa
- WhatsApp
- Email
- Volumen mensual estimado
- Caso de uso
- CRM actual

### 7.2 Submit (MVP)
- Validación mínima.
- Guardar payload:
  - `localStorage.setItem('closercat_lead', JSON.stringify({...}))`
- Tracking: `form_submit`.
- Redirección:
  - `window.location.href = '/?presentationId=wamedium'` (o preset que definas)

### 7.3 Persistencia sin backend: Make Webhook (recomendado)

#### 7.3.1 Setup en Make
- Crear un escenario en Make con un módulo **Custom webhook**.
- Copiar la URL del webhook.
- En el escenario:
  - Guardar en Google Sheets / Airtable / CRM.
  - Enviar notificación (Email/Slack/WhatsApp interno).
  - (Opcional) Enriquecer con Clearbit/Apollo si aplica.

#### 7.3.2 Configuración en el frontend
- Usar variable de entorno:
  - `VITE_MAKE_WEBHOOK_URL` (URL completa del webhook de Make)

El submit del formulario hará:
- `POST` JSON al webhook.
- Si responde OK: redirigir a presentación.
- Si falla: mostrar error y permitir reintento (sin perder datos capturados).

#### 7.3.3 Payload recomendado
Enviar un JSON con:
- `event`: `lead_submit`
- `created_at`: ISO timestamp
- `page_url`
- `user_agent`
- `utm`: `{ utm_source, utm_medium, utm_campaign, utm_term, utm_content }` (si existen)
- `lead`:
  - `name`, `company`, `whatsapp`, `email`
  - `monthly_volume_estimate`
  - `use_case`
  - `crm`
- `recommended_preset`: `waquick` / `wamedium` (según reglas)

#### 7.3.4 Seguridad (realista sin backend)
Un webhook público puede recibir spam. Mitigaciones prácticas sin montar servidor:
- En Make: filtrar por campos requeridos + validaciones.
- Añadir **honeypot field** (campo oculto) y descartar si viene lleno.
- Rate limiting y/o captcha (Turnstile) si aparece spam (fase 2).
- (Opcional) agregar un query param tipo `?source=closercat-site` para clasificar tráfico (no es seguridad real).

---

## 8. Tracking (Clarity + eventos)

En `App.tsx` ya existe `claritySet`. Falta instrumentación por eventos.

- `cta_book_demo_click`
- `cta_video_open`
- `form_submit`
- `scroll_50`, `scroll_90`

Plan:
- Implementar un helper `track(eventName, data?)`.
- Guardar UTMs de `window.location.search` y propagarlos en CTAs.

---

## 9. Riesgos / decisiones abiertas

- **Routing real (/privacy, /terms, /agenda):**
  - si lo necesitas, hay que introducir React Router + configuración de hosting SPA.
  - si no, usar anchors en una sola página (MVP) y modales para legales.

- **“Custom-url” por path:**
  - hoy no existe y está explícitamente bloqueado.
  - se puede lograr con redirects del hosting.

- **Personalización post-form:**
  - sin backend, solo personalización ligera client-side.

---

## 10. Milestones (orden recomendado)

1) **Refactor App en 2 modos** (Landing vs Presentation) sin cambiar behavior del deck.
2) **Implementar Landing MVP** con secciones críticas: Hero, Problema, Impacto, Cómo funciona, CTA/Form.
3) **Implementar Form → Redirect a presentación** + tracking.
4) Opcional: agregar legales, SEO, Bootstrap/tokens, y routing si se decide.

---

## 11. Criterios de aceptación (para este cambio)

- Entrar a `/` sin query params muestra el website.
- Entrar a `/?presentationId=waquick` (o preset válido) sigue mostrando la presentación como hoy.
- El formulario del website redirige a una presentación al completarse.
- No hay redirecciones inesperadas a `closercat_referral_url` que bloqueen el website.

