# Plan de Implementación: Homepage Hub Multi-Tier
## CloserCat - Rediseño según Framework Anthony Pierri

**Fecha:** Enero 2026  
**Versión:** 1.0  
**Contexto:** Adaptación del spec `HOMEPAGE_REDESIGN_SPEC.md` a la estructura actual del proyecto

---

## 📊 Análisis: Estado Actual vs. Propuesta

### Estructura Actual del Proyecto

**Arquitectura:**
- SPA React + Vite sin routing (React Router)
- `App.tsx` decide entre `PresentationApp` (deck de slides) y `LandingApp` (landing page)
- Lógica de detección por `presentationId` en query params
- Sistema de presets: `waquick`, `wamedium`, `nqprws`, `ticsia`
- Tracking con Microsoft Clarity

**Componentes Existentes:**
```
├── App.tsx                    → Router principal (decide modo)
├── PresentationApp.tsx        → Deck de presentación (slides)
├── LandingApp.tsx             → Landing page actual (single-page)
├── components/
│   ├── SlideLayout.tsx
│   └── SlideTemplates.tsx
├── constants.tsx              → Slides y configuración
└── types.ts
```

**Flujo Actual:**
1. Usuario entra a `/` → `LandingApp` (landing page genérica)
2. Usuario entra a `/?presentationId=waquick` → `PresentationApp` (deck)
3. Formulario en `LandingApp` → redirige a presentación personalizada

### Propuesta del Spec (HOMEPAGE_REDESIGN_SPEC.md)

**Arquitectura Multi-Tier:**
```
closercat.com/
├── index.html (Homepage Hub)           ← NUEVO
├── emprendedores/                      ← NUEVO (Tier 1)
├── educacion/                          ← MIGRAR contenido actual
├── ecommerce/                          ← PLACEHOLDER
├── b2b/                                ← PLACEHOLDER
├── soporte/                            ← PLACEHOLDER
├── otras-industrias/                   ← NUEVO (Tier 3)
```

**Problema:** El spec propone routing real (`/educacion`, `/emprendedores`), pero el proyecto actual:
- **NO tiene React Router**
- `App.tsx` fuerza redirect a `/` si `pathname !== '/' && pathname !== '/index.html'`
- Sistema de presets funciona por query params, no por paths

---

## 🎯 Solución Adaptada: Homepage Hub SIN Routing

### Concepto Central

**En lugar de:** Crear rutas reales `/educacion`, `/emprendedores`  
**Implementar:** Homepage Hub con segmentación por **query params** (compatible con arquitectura actual)

### Mapeo de Segmentos a Presets

| Segmento (Spec)      | Preset Actual | Query Param                    | Tier |
|----------------------|---------------|--------------------------------|------|
| Emprendedores        | `waquick`     | `?segment=emprendedores`       | 1    |
| Educación            | `wamedium`    | `?segment=educacion`           | 2    |
| Ecommerce            | N/A           | `?segment=ecommerce`           | 2    |
| B2B                  | N/A           | `?segment=b2b`                 | 2    |
| Soporte              | N/A           | `?segment=soporte`             | 2    |
| Otras Industrias     | N/A           | `?segment=otras-industrias`    | 3    |

### Flujo del Usuario (Adaptado)

```
Usuario llega a closercat.com/
    ↓
Ve Homepage Hub (selector de 6 segmentos)
    ↓
Click en segmento (ej: "Educación")
    ↓
Redirige a /?segment=educacion
    ↓
LandingApp detecta segment y renderiza landing específica
    ↓
Usuario completa formulario
    ↓
Redirige a /?presentationId=wamedium (deck personalizado)
    ↓
CTA "Agendar demo" en presentación
```

**Ventajas:**
- ✅ Mantiene arquitectura actual (sin React Router)
- ✅ Compatible con sistema de presets existente
- ✅ Tracking por segmento con query params
- ✅ URLs compartibles: `closercat.com/?segment=educacion`
- ✅ Escalable: agregar segmento = agregar case en `LandingApp`

---

## 🏗️ Arquitectura de Implementación

### Estructura de Archivos (Propuesta)

```
closercat-presentation/
├── App.tsx                              → Sin cambios (decide modo)
├── PresentationApp.tsx                  → Sin cambios (deck)
├── LandingApp.tsx                       → REFACTOR COMPLETO
│
├── components/
│   ├── landing/
│   │   ├── HomepageHub.tsx             ← NUEVO (selector de segmentos)
│   │   ├── SegmentCard.tsx             ← NUEVO (card de segmento)
│   │   ├── LandingEducacion.tsx        ← NUEVO (landing específica)
│   │   ├── LandingEmprendedores.tsx    ← NUEVO (landing específica)
│   │   ├── LandingOtrasIndustrias.tsx  ← NUEVO (landing específica)
│   │   ├── LandingPlaceholder.tsx      ← NUEVO (ecommerce, b2b, soporte)
│   │   ├── HeroSection.tsx             ← COMPONENTE REUTILIZABLE
│   │   ├── ProblemSection.tsx          ← COMPONENTE REUTILIZABLE
│   │   ├── ValuePropsSection.tsx       ← COMPONENTE REUTILIZABLE
│   │   ├── FormSection.tsx             ← COMPONENTE REUTILIZABLE
│   │   └── SocialProofSection.tsx      ← COMPONENTE REUTILIZABLE
│   │
│   ├── SlideLayout.tsx                 → Sin cambios
│   └── SlideTemplates.tsx              → Sin cambios
│
├── constants.tsx                        → Sin cambios
├── types.ts                             → EXTENDER (tipos de segmentos)
└── utils/
    ├── segmentDetection.ts             ← NUEVO (lógica de segmentación)
    └── presetRecommendation.ts         ← NUEVO (mapeo segment → preset)
```

### Lógica de `LandingApp.tsx` (Refactorizado)

```tsx
function LandingApp() {
  const params = new URLSearchParams(window.location.search);
  const segment = params.get('segment');

  // Sin segment → Homepage Hub
  if (!segment) {
    return <HomepageHub />;
  }

  // Con segment → Landing específica
  switch (segment) {
    case 'educacion':
      return <LandingEducacion />;
    case 'emprendedores':
      return <LandingEmprendedores />;
    case 'otras-industrias':
      return <LandingOtrasIndustrias />;
    case 'ecommerce':
    case 'b2b':
    case 'soporte':
      return <LandingPlaceholder segment={segment} />;
    default:
      // Segment inválido → volver a hub
      window.location.href = '/';
      return null;
  }
}
```

---

## 📋 Plan de Implementación (6 Fases)

### **FASE 1: Refactor de LandingApp + Homepage Hub** ⏱️ 2-3 días

#### Objetivos
- Crear Homepage Hub con selector de 6 segmentos
- Implementar lógica de routing por query params
- Tracking de clicks por segmento

#### Tareas

**1.1 Crear componentes base**
- [ ] `components/landing/HomepageHub.tsx`
  - Hero con título "WhatsApp profesional para tu negocio"
  - Grid de 6 `SegmentCard` (3x2 en desktop, 1 col en mobile)
  - Sección "¿Por qué CloserCat?" (3 value props genéricas)
  - Social proof agregado (logos + métricas)
  
- [ ] `components/landing/SegmentCard.tsx`
  ```tsx
  interface SegmentCardProps {
    segment: 'emprendedores' | 'educacion' | 'ecommerce' | 'b2b' | 'soporte' | 'otras-industrias';
    icon: string;
    title: string;
    description: string;
    badge: string;
    badgeColor: 'blue' | 'green' | 'gray' | 'purple';
    featured?: boolean;
  }
  ```
  - Click → `window.location.href = '/?segment={segment}&utm_source=homepage&utm_medium=segment_selector'`
  - Tracking: `clarityEvent('segment_click_' + segment)`

**1.2 Refactorizar `LandingApp.tsx`**
- [ ] Extraer landing actual a componente temporal `LandingGeneric.tsx`
- [ ] Implementar switch por `segment` query param
- [ ] Agregar fallback a `HomepageHub` si no hay segment

**1.3 Tracking**
- [ ] Evento `homepage_hub_view` al cargar hub
- [ ] Eventos `segment_click_{segment}` por cada card
- [ ] Propagación de UTMs en todos los links

**1.4 Testing**
- [ ] Responsive (mobile/tablet/desktop)
- [ ] Navegación entre hub y landings
- [ ] Tracking en Clarity

---

### **FASE 2: Landing /educacion (Tier 2)** ⏱️ 3-4 días

#### Objetivos
- Implementar landing completa según framework de Pierri
- Migrar contenido actual de `LandingApp` a esta landing específica
- Formulario con redirect a `?presentationId=wamedium`

#### Tareas

**2.1 Crear `LandingEducacion.tsx`**

Estructura completa:
1. **Hero Section**
   - Badge: "🎓 Para Instituciones Educativas en LATAM"
   - H1: Positioning statement (vs. WhatsApp manual + Q10 desconectado)
   - Subheading: 1st order benefit
   - 3 bullets de value props
   - CTA primario: "Agendar demo personalizada" (scroll a form)
   - CTA secundario: "Ver video (1 min)" (modal)
   - Video/screenshot del producto

2. **Problem Section**
   - Título: "El caos que viven equipos de admisiones hoy"
   - 2 columnas:
     - Escenario típico (5 pain points con ❌)
     - Costo real del caos (3 métricas: $ perdido, horas manuales, % conversión)
   - Quote de Director de Admisiones (real o anónimo específico)

3. **Solution Intro**
   - Título: "CloserCat: Tu equipo de admisiones con superpoderes"
   - 3 cards: IA educativa, Integración Q10, Control humano

4. **Value Propositions (4 capabilities)**
   - Cada value prop: Feature → Capability → Benefit
   - Layout alternado (imagen izq/der)
   - Screenshots reales del producto
   
   Value Props:
   - 🤖 Responde automáticamente con IA (GPT-4)
   - 🔄 Sincronización automática con Q10
   - 📢 Campañas masivas de matrícula
   - 🛡️ Control humano total con Guardrails

5. **Case Study** (migrar del actual, mejorar placeholders)
   - Institución con 5,000+ estudiantes
   - Métricas: antes/después
   - Testimonial real (NO "Contacto (placeholder)")

6. **How It Works** (4 pasos)
   - Onboarding → Configuración → Automatización → Optimización

7. **Integraciones**
   - Q10 como hero
   - Webhooks, HubSpot, Salesforce

8. **Social Proof**
   - Testimonios específicos de educación
   - Logos de instituciones (si existen)

9. **Risk Reversal**
   - Garantías: "15 días gratis", "Sin compromiso", "Soporte en español"

10. **Form Section**
    - Campos: nombre, empresa, whatsapp, email, volumen, caso de uso, CRM
    - Honeypot field (anti-spam)
    - Submit → POST a Make webhook → redirect a `?presentationId=wamedium&leadId={id}`

11. **FAQs**
    - 6-8 preguntas específicas de educación

**2.2 Componentes reutilizables**
- [ ] `HeroSection.tsx` (parametrizable por segmento)
- [ ] `ProblemSection.tsx` (recibe pain points como props)
- [ ] `ValuePropsSection.tsx` (recibe array de value props)
- [ ] `FormSection.tsx` (recibe segment, ctaUrl, webhookUrl)

**2.3 Assets necesarios**
- [ ] Screenshots del producto (mínimo 4)
- [ ] Video demo (1-2 min) o placeholder
- [ ] Testimonial real o mejorar placeholder
- [ ] Logos de clientes educación (opcional)

**2.4 Integración con Make**
- [ ] Crear webhook en Make para captura de leads
- [ ] Variable de entorno: `VITE_MAKE_WEBHOOK_URL`
- [ ] Payload: event, timestamp, utm, lead data, recommended_preset
- [ ] Configurar notificación (email/Slack/WhatsApp)

**2.5 Testing**
- [ ] Flujo completo: Hub → Landing → Form → Presentación
- [ ] Validación de formulario
- [ ] Tracking de eventos
- [ ] Responsive

---

### **FASE 3: Landing /emprendedores (Tier 1)** ⏱️ 2-3 días

#### Objetivos
- Landing simplificada para self-service
- CTA "Empezar gratis" (no demo)
- Pricing visible ($49/mes)

#### Tareas

**3.1 Crear `LandingEmprendedores.tsx`**

Estructura:
1. **Hero**
   - Badge: "🚀 Para Emprendedores y Microempresas"
   - H1: "Separa tu WhatsApp personal del de tu negocio"
   - Subheading: "Sin contratar equipo ni pagar miles de dólares"
   - Value props: Número separado, IA básica, Inbox organizado, Plantillas
   - CTA: "Empezar gratis por 14 días" → signup flow (si existe) o form

2. **Problem Section**
   - Escenario: WhatsApp personal mezclado con clientes
   - Pain points: Mensajes perdidos, respuesta tardía, sin historial

3. **Value Props (simplificadas)**
   - 3 capabilities (sin integraciones complejas)
   - Screenshots simples

4. **Pricing**
   - Card destacada: $49/mes
   - Features: 500 conversaciones, 1 número, IA básica, plantillas, soporte email

5. **How It Works** (3 pasos)
   - Registro → Conectar WhatsApp → Configurar IA

6. **FAQs**
   - Preguntas de emprendedores

7. **Form/CTA**
   - Si existe signup: botón directo
   - Si no: form simplificado → redirect a `?presentationId=waquick`

**3.2 Decisión crítica: ¿Existe flujo de signup self-service?**
- [ ] Investigar si existe endpoint/flujo de registro
- [ ] Si NO existe: form captura lead → redirect a presentación → CTA agendar
- [ ] Si SÍ existe: botón directo a signup

---

### **FASE 4: Landing /otras-industrias (Tier 3)** ⏱️ 2 días

#### Objetivos
- Landing para pilotos a resultados
- Formulario extendido (industria, KPI objetivo)
- Aplicación al programa de pilotos

#### Tareas

**4.1 Crear `LandingOtrasIndustrias.tsx`**

Estructura:
1. **Hero**
   - Badge: "🏢 Piloto Personalizado"
   - H1: "Piloto a resultados: Paga solo si funciona"
   - Subheading: "¿Tu industria no está en nuestra lista? Creamos un piloto personalizado"

2. **How It Works** (4 pasos)
   - Discovery call → Propuesta de KPIs → Piloto 60 días → Pago por resultados

3. **Industries Piloteadas**
   - Grid de ejemplos: Salud, Real Estate, Consultoría, Automotriz

4. **Form Extendido**
   - Campos adicionales:
     - Industria
     - Volumen mensual estimado
     - Proceso actual (textarea)
     - KPI objetivo
   - Submit → Make webhook → notificación a sales

5. **Social Proof**
   - Testimonios de pilotos exitosos (si existen)

---

### **FASE 5: Placeholders (Ecommerce, B2B, Soporte)** ⏱️ 1 día

#### Objetivos
- Landings placeholder para segmentos futuros
- Formulario "Notifícame cuando esté disponible"

#### Tareas

**5.1 Crear `LandingPlaceholder.tsx`**

```tsx
interface LandingPlaceholderProps {
  segment: 'ecommerce' | 'b2b' | 'soporte';
}
```

Estructura:
1. **Hero**
   - Título: "Próximamente: CloserCat para {Ecommerce/B2B/Soporte}"
   - Descripción de lo que estará disponible

2. **Preview de Features**
   - 3-4 capabilities planeadas

3. **Form "Notifícame"**
   - Campos: nombre, email, empresa
   - Submit → Make webhook → lista de espera

4. **CTA Alternativo**
   - "¿No puedes esperar? Aplica a nuestro programa de pilotos"
   - Link a `?segment=otras-industrias`

---

### **FASE 6: Navegación, Pricing y Pulido** ⏱️ 2-3 días

#### Objetivos
- Header con dropdown "Soluciones"
- Página `/precios` con 3 tiers (si se agrega routing)
- Testing completo de flujos
- SEO básico

#### Tareas

**6.1 Header Global**
- [ ] Actualizar header en `LandingApp` (si existe)
- [ ] Dropdown "Soluciones":
  - Por Industria: Educación, Ecommerce (badge "Próximamente"), B2B, Soporte
  - Por Tamaño: Emprendedores, Empresas
  - Piloto Personalizado
- [ ] Links: Producto, Precios, Recursos
- [ ] Botón CTA: "Agendar Demo"

**6.2 Página de Pricing (Opcional)**

**Opción A (Sin routing):**
- Crear `?page=pricing` → renderiza componente `PricingPage`
- 3 tiers: Starter ($49), Educación ($299+), Enterprise (Custom)
- Tabla de comparación

**Opción B (Con routing - requiere React Router):**
- Agregar React Router
- Ruta `/precios`
- Configurar hosting para SPA (Netlify redirects)

**Decisión:** Empezar con Opción A (sin routing)

**6.3 SEO Básico**
- [ ] Actualizar `index.html`:
  ```html
  <title>CloserCat - WhatsApp Business con IA para LATAM</title>
  <meta name="description" content="Plataforma de WhatsApp Business con IA para instituciones educativas, emprendedores y empresas en LATAM. Integración nativa con Q10 CRM.">
  <meta property="og:title" content="CloserCat - WhatsApp Business con IA">
  <meta property="og:description" content="Automatiza consultas, sincroniza con tu CRM y cierra más ventas con IA.">
  <meta property="og:image" content="/og-image.png">
  ```

**6.4 Testing de Flujos Completos**
- [ ] Flujo Educación: Hub → Landing → Form → Presentación → CTA
- [ ] Flujo Emprendedores: Hub → Landing → Form/Signup
- [ ] Flujo Pilotos: Hub → Landing → Form → Notificación sales
- [ ] Flujo Placeholder: Hub → Landing → Notifícame
- [ ] Tracking en Clarity de todos los eventos
- [ ] Responsive en todos los segmentos

**6.5 Performance**
- [ ] Lazy load de imágenes
- [ ] Lazy load de video
- [ ] Optimizar bundle size
- [ ] Lighthouse audit (target: >90 en mobile)

---

## 🎨 Sistema de Diseño (Mantener Consistencia)

### Tipografía
```css
/* Headings */
font-family: 'Poppins', sans-serif;
font-weight: 700-900;

/* Body */
font-family: 'Inter', sans-serif;
font-weight: 400-600;
```

### Colores
```css
/* Brand */
--brand-blue-primary: #3b82f6;
--brand-purple-closer: #8b5cf6;

/* Grays */
--gray-50: #f9fafb;
--gray-100: #f3f4f6;
--gray-600: #4b5563;
--gray-900: #111827;

/* Tier badges */
--tier1-blue: #3b82f6;
--tier2-green: #10b981;
--tier3-purple: #8b5cf6;
```

### Spacing
```css
/* Secciones */
padding-y: 80px (desktop), 48px (mobile)

/* Cards */
padding: 32px (desktop), 24px (mobile)
border-radius: 16px
```

### Componentes Reutilizables

**Badge de Segmento:**
```tsx
<Badge color="blue" icon="🎓">
  Para Instituciones Educativas en LATAM
</Badge>
```

**Value Prop Card:**
```tsx
<ValuePropCard
  icon="🤖"
  title="IA que entiende tu negocio"
  feature="GPT-4 consulta automáticamente tu Knowledge Base..."
  capability="Puedes automatizar respuestas a consultas repetitivas 24/7..."
  benefit="78% de consultas resueltas automáticamente..."
  screenshot="/screenshots/ai-response.png"
  imagePosition="right"
/>
```

**CTA Button:**
```tsx
<CTAButton 
  variant="primary" 
  onClick={scrollToForm}
  tracking="cta_demo_educacion"
>
  Agendar demo personalizada
</CTAButton>

<CTAButton 
  variant="secondary" 
  onClick={openVideo}
  tracking="cta_video_open"
>
  Ver video (1 min)
</CTAButton>
```

---

## 📊 Tracking y Analytics

### Eventos de Clarity/GA4

**Homepage Hub:**
```tsx
clarityEvent('homepage_hub_view');
```

**Clicks en Segmentos:**
```tsx
clarityEvent('segment_click_educacion');
clarityEvent('segment_click_emprendedores');
clarityEvent('segment_click_ecommerce');
clarityEvent('segment_click_b2b');
clarityEvent('segment_click_soporte');
clarityEvent('segment_click_otras_industrias');
```

**Landings Específicas:**
```tsx
clarityEvent('landing_educacion_view');
clarityEvent('landing_emprendedores_view');
clarityEvent('landing_otras_industrias_view');
```

**CTAs por Tier:**
```tsx
// Tier 1 (Self-service)
clarityEvent('cta_signup_emprendedores');

// Tier 2 (Sales-led)
clarityEvent('cta_demo_educacion');

// Tier 3 (Custom)
clarityEvent('cta_piloto_otras_industrias');
```

**Formularios:**
```tsx
clarityEvent('form_submit_educacion');
clarityEvent('form_submit_emprendedores');
clarityEvent('form_submit_otras_industrias');
clarityEvent('form_submit_placeholder');
```

**Scroll Depth:**
```tsx
clarityEvent('scroll_25');
clarityEvent('scroll_50');
clarityEvent('scroll_75');
clarityEvent('scroll_100');
```

### UTM Parameters

Propagación automática en todos los links:
```tsx
const utmParams = new URLSearchParams(window.location.search);
const utm = {
  utm_source: utmParams.get('utm_source') || 'homepage',
  utm_medium: utmParams.get('utm_medium') || 'segment_selector',
  utm_campaign: utmParams.get('utm_campaign') || 'educacion',
};

// En CTAs
const ctaUrl = `/?presentationId=wamedium&${new URLSearchParams(utm)}`;
```

---

## 🚨 Errores Críticos a Evitar (Checklist)

### ❌ NO HACER

- [ ] **NO mezclar audiencias en una misma landing**
  - Ejemplo: No poner "Para educación, ecommerce y B2B" en el mismo hero

- [ ] **NO usar multi-order benefits sin contexto**
  - ❌ "Aumenta tus ingresos"
  - ✅ "78% de consultas resueltas automáticamente, liberando a tu equipo para cerrar matrículas"

- [ ] **NO usar placeholders en testimonios**
  - ❌ "Contacto (placeholder)"
  - ✅ Nombre real + cargo + empresa O anónimo específico

- [ ] **NO hablar de "empresas" genéricamente**
  - ❌ "Para empresas que quieren automatizar"
  - ✅ "Para instituciones educativas que gestionan 500+ consultas en temporada de matrículas"

- [ ] **NO mezclar CTAs de diferentes tiers**
  - Tier 1 → "Empezar gratis" (self-service)
  - Tier 2 → "Agendar demo" (sales-led)
  - Tier 3 → "Aplicar al programa" (custom)

### ✅ SÍ HACER

- [ ] **SÍ usar positioning statement claro en cada hero**
  - Formato: "Para [SEGMENTO], reemplaza [TOOL ACTUAL] con [DIFERENCIACIÓN]"

- [ ] **SÍ mostrar capabilities específicas**
  - No "automatización", sino "IA responde consultas de precios usando tu Knowledge Base"

- [ ] **SÍ usar social proof específico por segmento**
  - En educación: Testimonios de Directores de Admisiones
  - En emprendedores: Testimonios de dueños de microempresas

- [ ] **SÍ medir conversión por segmento**
  - Tracking separado para cada landing
  - A/B testing de messaging por segmento

---

## 🎯 Métricas de Éxito

### KPIs por Landing

**Homepage Hub:**
- % de visitantes que hacen click en algún segmento: **Target >60%**
- Distribución de clicks por segmento
- Bounce rate: **Target <40%**

**Landing Educación:**
- Conversión a demo agendada: **Target 2-5%**
- Tiempo en página: **Target >2 min**
- Scroll depth: **Target >75% llegan a value props**

**Landing Emprendedores:**
- Conversión a signup: **Target 5-10%**
- Activación en primeros 7 días: **Target >50%**

**Landing Otras Industrias:**
- Aplicaciones al programa de pilotos: **Target 1-3%**
- Calidad de aplicaciones (completan todos los campos): **Target >80%**

### A/B Testing (Fase 2)

**Test 1: Hub vs. Landing Actual**
- Variante A: Homepage Hub (nueva)
- Variante B: Landing actual (control)
- Métrica: Conversión a demo/signup
- Duración: 2 semanas

**Test 2: Positioning Statement (Educación)**
- Variante A: "Reemplaza el caos de WhatsApp manual..."
- Variante B: "Automatiza admisiones con IA..."
- Métrica: Scroll depth + conversión
- Duración: 1 semana

---

## 📦 Entregables por Fase

### Fase 1: Homepage Hub
- [ ] `HomepageHub.tsx` funcional
- [ ] `SegmentCard.tsx` con tracking
- [ ] Refactor de `LandingApp.tsx`
- [ ] Tracking de eventos en Clarity
- [ ] README actualizado con nuevos query params

### Fase 2: Landing Educación
- [ ] `LandingEducacion.tsx` completa (11 secciones)
- [ ] 4 componentes reutilizables (Hero, Problem, ValueProps, Form)
- [ ] Integración con Make webhook
- [ ] Assets: 4 screenshots + video/placeholder
- [ ] Testimonial real o mejorado

### Fase 3: Landing Emprendedores
- [ ] `LandingEmprendedores.tsx` completa
- [ ] Pricing card destacada
- [ ] CTA self-service (signup o form)

### Fase 4: Landing Otras Industrias
- [ ] `LandingOtrasIndustrias.tsx` completa
- [ ] Formulario extendido
- [ ] Notificación a sales configurada

### Fase 5: Placeholders
- [ ] `LandingPlaceholder.tsx` parametrizable
- [ ] Form "Notifícame" con webhook

### Fase 6: Navegación y Pulido
- [ ] Header con dropdown
- [ ] Página de pricing (query param)
- [ ] SEO básico
- [ ] Testing completo de flujos
- [ ] Lighthouse audit >90

---

## 🛠️ Stack Técnico

### Dependencias Actuales (Mantener)
- React 18
- TypeScript
- Vite
- Lucide React (iconos)
- Microsoft Clarity (tracking)

### Dependencias Nuevas (Opcional)
- `react-hook-form` (validación de formularios) - **Recomendado**
- `zod` (validación de schemas) - **Recomendado**
- `framer-motion` (animaciones) - **Opcional**

### Variables de Entorno

Crear `.env.local`:
```bash
# Make Webhook para captura de leads
VITE_MAKE_WEBHOOK_URL=https://hook.us1.make.com/xxxxx

# Clarity (ya existe)
VITE_CLARITY_PROJECT_ID=xxxxx

# Calendly URLs (ya existen en código)
VITE_CALENDLY_CUSTOMER_URL=https://calendly.com/rogertovalle?a1=CloserCat%20Pro%20-%20Cliente
VITE_CALENDLY_PARTNER_URL=https://calendly.com/rogertovalle/?a1=CloserCat%20Pro%20-%20Partnership
```

---

## 📅 Timeline Estimado

| Fase | Duración | Dependencias |
|------|----------|--------------|
| Fase 1: Homepage Hub | 2-3 días | Ninguna |
| Fase 2: Landing Educación | 3-4 días | Assets (screenshots, video, testimonial) |
| Fase 3: Landing Emprendedores | 2-3 días | Decisión sobre signup flow |
| Fase 4: Landing Otras Industrias | 2 días | Ninguna |
| Fase 5: Placeholders | 1 día | Ninguna |
| Fase 6: Navegación y Pulido | 2-3 días | Todas las fases anteriores |

**Total:** 12-16 días (2-3 semanas)

### Ruta Crítica
1. Assets para Educación (screenshots, video, testimonial)
2. Configuración de Make webhook
3. Decisión sobre signup flow para Emprendedores

---

## 🚀 Próximos Pasos Inmediatos

### 1. Aprobación de Plan
- [ ] Revisar este plan con el equipo
- [ ] Confirmar priorización de segmentos (Educación primero)
- [ ] Aprobar arquitectura sin routing (query params)

### 2. Preparación de Assets
- [ ] Conseguir 4 screenshots del producto (dashboard, IA, Q10, campañas)
- [ ] Grabar video demo 1-2 min O usar placeholder
- [ ] Conseguir testimonial real de cliente educación O mejorar placeholder
- [ ] Logos de clientes (opcional)

### 3. Setup Técnico
- [ ] Crear webhook en Make para captura de leads
- [ ] Configurar notificaciones (email/Slack/WhatsApp)
- [ ] Agregar variables de entorno

### 4. Iniciar Fase 1
- [ ] Crear branch `feature/homepage-hub`
- [ ] Implementar `HomepageHub.tsx`
- [ ] Implementar `SegmentCard.tsx`
- [ ] Refactorizar `LandingApp.tsx`

---

## 📚 Referencias

### Framework de Anthony Pierri
- **Concepto:** Positioning = Differentiation + Segmentation
- **Estructura de Homepage:** Hero → Problem → Solution → Value Props → Case Study → CTA
- **Value Prop Canvas:** Feature → Capability → Benefit
- **Evitar:** Multi-audience messaging, generic positioning, multi-order benefits sin contexto

### Documentos del Proyecto
- `HOMEPAGE_REDESIGN_SPEC.md` - Spec completo del rediseño
- `WEBSITE_IMPLEMENTATION_PLAN.md` - Plan original de website
- `WEBSITE_SPEC.md` - Spec de website genérico

### Recursos Externos
- [Anthony Pierri - Homepage Guide](https://www.fletchpmm.com/)
- [Microsoft Clarity](https://clarity.microsoft.com/)
- [Make.com Webhooks](https://www.make.com/en/help/tools/webhooks)

---

## ✅ Criterios de Aceptación Final

### Funcionalidad
- [ ] Usuario entra a `/` → ve Homepage Hub
- [ ] Click en segmento → redirige a `/?segment={segment}`
- [ ] Landing específica se renderiza según segment
- [ ] Formulario captura lead → envía a Make → redirige a presentación
- [ ] Tracking funciona en todos los eventos

### Performance
- [ ] Lighthouse score >90 en mobile
- [ ] First Contentful Paint <1.5s
- [ ] Time to Interactive <3s
- [ ] Lazy load de imágenes y video

### SEO
- [ ] Meta tags correctos
- [ ] Open Graph tags
- [ ] URLs compartibles con query params

### Tracking
- [ ] Todos los eventos en Clarity
- [ ] UTMs propagados correctamente
- [ ] Conversión por segmento medible

### UX
- [ ] Responsive en mobile/tablet/desktop
- [ ] Navegación intuitiva
- [ ] CTAs claros por tier
- [ ] Formularios con validación

---

**Documento creado:** Enero 2026  
**Autor:** Equipo CloserCat  
**Basado en:** HOMEPAGE_REDESIGN_SPEC.md + Arquitectura actual del proyecto  
**Versión:** 1.0
