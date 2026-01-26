# Especificación de Integración: WhatsApp Backup + CRM Personal en Homepage CloserCat

**Fecha:** Enero 2026  
**Versión:** 1.0  
**Destinatario:** Equipo de desarrollo web  
**Contexto:** Integración de nueva línea de negocio (Backup + CRM Personal) en homepage existente

---

## 📋 Contexto General

### Estado Actual del Proyecto

El sitio web de CloserCat ya tiene implementado:

1. **Homepage Hub Multi-Tier** basado en framework de Anthony Pierri
2. **Sistema de segmentación** por query params (`?segment=educacion`, `?segment=emprendedores`, etc.)
3. **6 segmentos activos:**
   - Emprendedores (Tier 1 - BYOW)
   - Educación (Tier 2 - Integración Q10)
   - Ecommerce (Placeholder)
   - B2B (Placeholder)
   - Soporte (Placeholder)
   - Otras Industrias (Tier 3 - Pilotos)
4. **Arquitectura SPA** React + Vite sin React Router
5. **Tracking** con Microsoft Clarity
6. **Integración** con Make.com para captura de leads

### Nueva Línea de Negocio a Integrar

**WhatsApp Backup + CRM Personal para Profesionales Independientes**

- **Mercado objetivo:** Profesionales que dependen de WhatsApp para generar ingresos (consultores, asesores, coaches, abogados, contadores)
- **Propuesta de valor:** Backup continuo + CRM de relaciones + IA asistente
- **Pricing:** 3 planes escalonados ($19K-29K, $39K-49K, $79K-99K COP/mes)
- **Diferenciación vs. CloserCat actual:** Enfoque en relaciones personales y continuidad de negocio, no en operaciones comerciales masivas

---

## 🎯 Objetivo de Esta Especificación

Integrar la nueva línea de negocio en el Homepage Hub existente de manera coherente, manteniendo:

1. **Arquitectura actual** (query params, sin routing)
2. **Diseño y UX** establecidos
3. **Framework de messaging** de Anthony Pierri
4. **Sistema de tracking** existente
5. **Flujos de conversión** a Make.com y presentaciones

---

## 🏗️ Cambios Arquitectónicos Requeridos

### 1. Actualizar Homepage Hub

#### 1.1 Agregar Nuevo Segmento "Profesionales Independientes"

**Ubicación:** `components/landing/HomepageHub.tsx`

**Acción:** Agregar una séptima card de segmento

**Especificaciones:**
- **Posición:** Primera card del grid (featured)
- **Icon:** 💼
- **Título:** "Profesional Independiente"
- **Descripción:** "Backup + CRM personal de relaciones"
- **Badge:** "Desde $19K/mes"
- **Badge Color:** blue
- **Featured:** true (destacar visualmente)
- **Query param:** `?segment=profesionales-independientes`

**Tracking:**
- Evento al hacer click: `segment_click_profesionales_independientes`
- UTM params: `utm_source=homepage&utm_medium=segment_selector&utm_campaign=profesionales_independientes`

#### 1.2 Reordenar Grid de Segmentos

**Nuevo orden sugerido (3 cards en grid 3x3):**

Fila 1:
1. **Profesionales Independientes** (featured - destacar con borde/sombra)
2. Emprendedores
3. Educación

Fila 3:
7. Otras Industrias (centrado, span 3 columnas en desktop)

**Responsive:**
- Mobile: 1 columna, "Profesionales Independientes" primero
- Tablet: 2 columnas
- Desktop: 3 columnas

---

### 2. Crear Nueva Landing Page

#### 2.1 Archivo Nuevo

**Nombre:** `components/landing/LandingProfesionalesIndependientes.tsx`

**Estructura:** Seguir el mismo patrón de `LandingEducacion.tsx` pero adaptado al ICP

#### 2.2 Secciones Requeridas

**Orden de secciones:**

1. **Hero Section**
   - Badge de segmento: "💼 Para Profesionales que Viven de sus Relaciones"
   - H1 (Positioning statement)
   - Subheading (1st order benefit)
   - 3 bullets de value props
   - CTA primario: "Ver planes y precios"
   - CTA secundario: "Agendar asesoría"
   - Video/screenshot del producto

2. **Problem Section**
   - Título: "El riesgo que corres hoy"
   - 3 columnas de pain points:
     - Si te bloquean la cuenta (pérdida de ingresos)
     - Desorden en relaciones (oportunidades perdidas)
     - Tiempo en respuestas repetitivas
   - Quote de persona real (Director, Asesor, Consultor)

3. **Solution Intro**
   - Título: "CloserCat: Tu red de contactos, protegida y organizada"
   - 3 cards: Backup continuo, CRM personal, IA asistente

4. **Pricing Section** (CRÍTICO - diferente a otras landings)
   - Título: "Elige tu nivel de protección"
   - 3 pricing cards lado a lado:
     - Plan Backup ($30K/mes)
     - Plan CRM Personal ($50K/mes) - DESTACADO
     - Plan CRM + IA ($100K/mes)
   - Cada card debe incluir:
     - Precio mensual
     - Lista de features incluidas
     - ICP específico (para quién es ideal)
     - CTA diferenciado por plan
   - Tabla comparativa debajo (opcional)

5. **Value Propositions** (3 capabilities principales)
   - Backup continuo (Feature → Capability → Benefit)
   - CRM de relaciones (Feature → Capability → Benefit)
   - IA asistente (Feature → Capability → Benefit)
   - Layout alternado (imagen izq/der)

6. **How It Works** (4 pasos)
   - Registro → Conexión WhatsApp → Configuración → Automatización

7. **Social Proof**
   - Testimonios específicos de profesionales independientes
   - Métricas: contactos respaldados, tiempo ahorrado, leads recuperados

8. **Risk Reversal**
   - Garantías: "7 días gratis", "Sin compromiso", "Cancela cuando quieras"

9. **Form Section**
   - Campos específicos (ver sección 2.3)
   - Submit → Make webhook → redirect según plan seleccionado

10. **FAQs**
    - 6-8 preguntas específicas de este segmento

#### 2.3 Formulario Específico

**Campos requeridos:**

- **Nombre completo** (text, required)
- **WhatsApp** (tel, required, validación formato internacional)
- **Email** (email, required)
- **Profesión** (select, required)
  - Opciones: Consultor, Asesor Inmobiliario, Coach, Abogado, Contador, Corredor de Bolsa, Asesor de Seguros, Community Manager, Otro
- **Número de contactos activos estimados** (select, required)
  - Opciones: Menos de 100, 100-500, 500-1000, Más de 1000
- **Plan de interés** (select, required)
  - Opciones: Backup ($19K-29K), CRM Personal ($39K-49K), CRM + IA ($79K-99K), No estoy seguro
- **¿Qué te preocupa más?** (textarea, optional)

**Honeypot field:** Incluir campo oculto anti-spam

**Payload a Make.com:**

```json
{
  "event": "lead_submit",
  "created_at": "timestamp",
  "page_url": "URL completa",
  "user_agent": "string",
  "utm": {
    "utm_source": "string",
    "utm_medium": "string",
    "utm_campaign": "string"
  },
  "segment": "profesionales-independientes",
  "lead": {
    "name": "string",
    "whatsapp": "string",
    "email": "string",
    "profession": "string",
    "contacts_estimate": "string",
    "plan_interest": "string",
    "main_concern": "string"
  },
  "recommended_preset": "waquick" // o el que corresponda
}
```

**Redirect post-submit:**
- Si plan_interest = "Backup" o "CRM Personal" → `?presentationId=waquick`
- Si plan_interest = "CRM + IA" → `?presentationId=wamedium`
- Si plan_interest = "No estoy seguro" → `?presentationId=waquick`

---

### 3. Actualizar LandingApp.tsx

#### 3.1 Agregar Case en Switch

**Ubicación:** `LandingApp.tsx`, función principal

**Acción:** Agregar nuevo case para el segmento

**Especificaciones:**
- Detectar query param `segment=profesionales-independientes`
- Renderizar componente `<LandingProfesionalesIndependientes />`
- Tracking: `clarityEvent('landing_profesionales_independientes_view')`

#### 3.2 Actualizar Tipos

**Ubicación:** `types.ts`

**Acción:** Extender tipo `SegmentType`

**Agregar:** `'profesionales-independientes'` a la unión de tipos

---

### 4. Actualizar Componentes Reutilizables

#### 4.1 PricingCard Component (NUEVO)

**Ubicación:** `components/shared/PricingCard.tsx`

**Propósito:** Card reutilizable para mostrar planes de pricing

**Props requeridas:**
- `tier`: string (backup, crm_personal, crm_ai)
- `price`: string (ej: "$19K-29K/mes")
- `features`: array de strings
- `icp`: string (descripción del cliente ideal)
- `ctaText`: string
- `ctaUrl`: string
- `featured`: boolean (opcional, para destacar plan recomendado)
- `onCtaClick`: función de tracking

**Uso:** Exclusivo para landing de Profesionales Independientes (por ahora)

#### 4.2 Actualizar FormSection Component

**Ubicación:** `components/shared/FormSection.tsx`

**Acción:** Hacer más flexible para soportar campos dinámicos

**Especificaciones:**
- Aceptar prop `customFields` para agregar campos específicos por segmento
- Mantener compatibilidad con formularios existentes
- Validación de campos según tipo

---

### 5. Actualizar Sistema de Tracking

#### 5.1 Nuevos Eventos de Clarity

**Eventos a implementar:**

**Homepage Hub:**
- `segment_click_profesionales_independientes`

**Landing Profesionales Independientes:**
- `landing_profesionales_independientes_view`
- `pricing_card_backup_view`
- `pricing_card_crm_personal_view`
- `pricing_card_crm_ai_view`
- `cta_backup_click`
- `cta_crm_personal_click`
- `cta_crm_ai_click`
- `cta_asesoria_click`
- `form_submit_profesionales_independientes`

**Scroll tracking:**
- `scroll_pricing_section` (cuando usuario llega a sección de pricing)
- `scroll_value_props` (cuando usuario llega a value propositions)

#### 5.2 Actualizar Utilidad de Tracking

**Ubicación:** `utils/tracking.ts`

**Acción:** Agregar funciones helper específicas

**Funciones sugeridas:**
- `trackPricingCardView(tier: string)`
- `trackPricingCardClick(tier: string, ctaText: string)`
- `trackPlanSelection(plan: string)`

---

### 6. Actualizar Sistema de Preset Recommendation

#### 6.1 Mapeo de Segmento a Preset

**Ubicación:** `utils/presetRecommendation.ts`

**Acción:** Agregar case para nuevo segmento

**Lógica:**
```
segment = "profesionales-independientes"
  ↓
Si plan_interest = "Backup" o "CRM Personal"
  → preset = "waquick"
  
Si plan_interest = "CRM + IA"
  → preset = "wamedium"
  
Si plan_interest = "No estoy seguro"
  → preset = "waquick"
```

---

## 🎨 Especificaciones de Diseño

### 1. Pricing Cards (Componente Nuevo)

#### 1.1 Diseño Visual

**Estructura de cada card:**
- Header con badge del plan
- Precio destacado (font-size grande, bold)
- Línea divisoria
- Lista de features con checkmarks
- Descripción del ICP (texto pequeño, cursiva)
- CTA button
- Footer con microcopy (ej: "Sin compromiso")

**Estados:**
- Default
- Hover (elevación, sombra)
- Featured (borde destacado, badge "Más popular")

**Colores por tier:**
- Backup: Blue (#3b82f6)
- CRM Personal: Green (#10b981) - FEATURED
- CRM + IA: Purple (#8b5cf6)

#### 1.2 Responsive

**Desktop (≥1024px):**
- 3 cards en fila
- Ancho igual para las 3
- Card featured ligeramente más alta (transform: scale(1.05))

**Tablet (768px - 1023px):**
- 3 cards en fila, más compactas
- Featured sin scale

**Mobile (<768px):**
- 1 card por fila (stack vertical)
- Featured primero
- Padding reducido

### 2. Hero Section Específico

#### 2.1 Positioning Statement (H1)

**Fórmula de Pierri aplicada:**
```
Para [SEGMENTO] que [CONTEXTO/PROBLEMA],
[PRODUCTO] reemplaza [HERRAMIENTA ACTUAL]
con [DIFERENCIACIÓN]
```

**Aplicado a este segmento:**
```
"Si mañana te bloquean el WhatsApp,
tu base de datos de clientes y aliados sigue viva"
```

**Alternativas a testear:**
```
Opción A: "Tu WhatsApp, respaldado, organizado y más inteligente:
          nunca pierdes un cliente ni un contacto clave"

Opción B: "Backup continuo + CRM personal + IA asistente:
          para profesionales que viven de sus relaciones"
```

#### 2.2 Subheading (1st Order Benefit)

**Debe responder:** ¿Qué puede hacer el usuario que antes no podía?

**Propuesta:**
```
"Deja de temer perder tu teléfono o que te bloqueen la cuenta.
Tu red de contactos está respaldada 24/7, organizada con notas
y recordatorios, y una IA contesta lo básico mientras tú
atiendes lo importante."
```

### 3. Problem Section Específico

#### 3.1 Pain Points (3 columnas)

**Estructura de cada pain point:**
- Icon grande (emoji)
- Título del problema
- Descripción (2-3 líneas)
- Métrica de impacto (número destacado)

**Pain Points específicos:**

1. **📱 Riesgo de pérdida**
   - Título: "Si te bloquean la cuenta..."
   - Descripción: "Pierdes 200-1,000 contactos de clientes, aliados y leads acumulados en años"
   - Métrica: "30-50% de tus ingresos mensuales se evaporan"

2. **🤯 Desorden total**
   - Título: "Cientos de chats sin estructura"
   - Descripción: "No sabes a quién dar seguimiento, qué prometiste, cuándo contactar"
   - Métrica: "2-3 horas/día respondiendo lo mismo"

3. **❄️ Oportunidades perdidas**
   - Título: "Contactos que se enfríen"
   - Descripción: "Leads tibios que olvidas seguir, aliados que no cultivas, clientes que no reactivas"
   - Métrica: "20-30% de leads se pierden por olvido"

#### 3.2 Quote de Persona Real

**Formato:**
```
"[Quote específico y emocional sobre el problema]"
— [Profesión], [Contexto cuantificado]
```

**Ejemplo:**
```
"Si mañana me bloquean el WhatsApp, pierdo 5 años de contactos.
Eso es mi negocio completo. No puedo dormir tranquilo así."
— Asesor Inmobiliario, 800+ contactos activos
```

**Instrucciones:**
- Si no hay testimonial real, usar anónimo específico
- NUNCA usar "Contacto (placeholder)"
- Debe ser creíble y específico

---

## 📊 Especificaciones de Contenido

### 1. Messaging por Plan

#### Plan 1: Backup ($19K-29K/mes)

**Headline:** "Protege tu activo más valioso"

**Features:**
- Respaldo continuo de 1 número WhatsApp
- Retención de 3 meses de historial
- Exportación a Excel/CSV
- Búsqueda básica de chats
- Recuperación en caso de pérdida

**ICP:** "Para quien solo quiere asegurar que no pierde sus chats y contactos"

**CTA:** "Empezar backup ahora"

#### Plan 2: CRM Personal ($39K-49K/mes) - FEATURED

**Headline:** "Organiza tus relaciones como un profesional"

**Features:**
- Todo del Plan Backup
- Fichas de contacto enriquecidas
- Notas, etiquetas y recordatorios
- Segmentación por tipo de relación, ciudad, inactividad
- Reportes básicos (contactos tocados, sin contacto hace X días)

**ICP:** "Para consultores, asesores y coaches que viven de sus relaciones"

**CTA:** "Empezar ahora" (destacado)

#### Plan 3: CRM + IA ($79K-99K/mes)

**Headline:** "Automatiza lo básico, enfócate en lo importante"

**Features:**
- Todo del Plan CRM Personal
- Contestador automático con IA (50-100 respuestas/mes)
- Knowledge Base administrable
- Clasificación inteligente de mensajes
- Campañas relacionales asistidas (100 contactos/mes)
- Borradores de mensajes personalizados

**ICP:** "Para quien atiende muchos nuevos contactos y necesita automatización inteligente"

**CTA:** "Empezar prueba gratis"

### 2. Value Propositions (3 principales)

#### Value Prop 1: Backup Continuo

**Capability:** "Respaldo automático 24/7 de todas tus conversaciones"

**Feature:**
- Sistema de snapshots incrementales cada 6 horas
- Almacenamiento encriptado en servidor propio
- Retención configurable (3 meses en plan básico)
- Exportación a múltiples formatos

**Benefit:**
"Si pierdes tu teléfono, te roban la línea o te bloquean la cuenta, recuperas todos tus contactos y conversaciones en minutos. Tu negocio no se detiene."

**Screenshot sugerido:** Panel de backups con timeline de snapshots

#### Value Prop 2: CRM de Relaciones

**Capability:** "Organiza cada contacto con contexto completo"

**Feature:**
- Fichas enriquecidas automáticamente desde conversaciones
- Sistema de notas privadas por contacto
- Etiquetas personalizables (cliente, lead, aliado, mentor, etc.)
- Recordatorios de follow-up
- Segmentación avanzada (por ciudad, tipo, última interacción)

**Benefit:**
"Nunca más olvidas dar seguimiento a un lead tibio o reactivar un cliente inactivo. Sabes exactamente a quién contactar hoy y por qué."

**Screenshot sugerido:** Vista de ficha de contacto con notas y timeline

#### Value Prop 3: IA Asistente

**Capability:** "Contestador automático que responde usando tu información"

**Feature:**
- IA consulta tu Knowledge Base (servicios, precios, FAQs)
- Responde automáticamente consultas repetitivas 24/7
- Clasifica mensajes (nuevo, recurrente, urgente)
- Genera borradores personalizados para campañas
- Límites de seguridad (50-100 respuestas/mes)

**Benefit:**
"78% de consultas básicas resueltas automáticamente. Tu equipo (o tú) se enfoca en cerrar negocios, no en responder '¿Cuánto cuesta?' todo el día."

**Screenshot sugerido:** Conversación con IA respondiendo + panel de configuración de KB

### 3. FAQs Específicas

**Preguntas sugeridas (6-8):**

1. **¿Necesito WhatsApp Business API?**
   - Respuesta: Depende del plan. Plan Backup funciona con tu WhatsApp normal. Planes con IA requieren WhatsApp Business API (te ayudamos a configurarlo).

2. **¿Qué pasa si cambio de número?**
   - Respuesta: Puedes migrar tu backup al nuevo número sin perder historial. El proceso toma menos de 24 horas.

3. **¿Puedo exportar mis datos en cualquier momento?**
   - Respuesta: Sí, exportación ilimitada a Excel/CSV/JSON. Tus datos son tuyos.

4. **¿Cómo funciona el límite de 50-100 respuestas IA/mes?**
   - Respuesta: Solo cuentan las respuestas automáticas de la IA. Mensajes manuales no consumen cuota. Si necesitas más, puedes comprar paquetes adicionales.

5. **¿Puedo cancelar en cualquier momento?**
   - Respuesta: Sí, sin penalización. Mantienes acceso a tus backups por 30 días adicionales.

6. **¿Mis contactos verán que uso un bot?**
   - Respuesta: No. La IA responde desde tu número normal. Puedes configurar si quiere que se identifique o no.

7. **¿Qué tan seguro es el backup?**
   - Respuesta: Encriptación end-to-end en tránsito y en reposo. Servidores en AWS con certificación SOC2. Solo tú tienes acceso a tus datos.

8. **¿Puedo probar antes de pagar?**
   - Respuesta: Sí, 7 días gratis en cualquier plan. No pedimos tarjeta de crédito.

---

## 🔄 Flujos de Usuario

### Flujo 1: Usuario Nuevo (Descubrimiento)

```
1. Usuario llega a closercat.com/
   ↓
2. Ve Homepage Hub con 7 segmentos
   ↓
3. Click en "Profesional Independiente" (primera card, featured)
   ↓ Tracking: segment_click_profesionales_independientes
   ↓
4. Redirige a /?segment=profesionales-independientes
   ↓ Tracking: landing_profesionales_independientes_view
   ↓
5. Lee Hero + Problem Section
   ↓ Scroll tracking: scroll_25, scroll_50
   ↓
6. Llega a Pricing Section
   ↓ Tracking: scroll_pricing_section
   ↓
7. Compara 3 planes
   ↓ Tracking: pricing_card_backup_view, pricing_card_crm_personal_view, pricing_card_crm_ai_view
   ↓
8. Click en CTA de plan de interés (ej: "Empezar ahora" en CRM Personal)
   ↓ Tracking: cta_crm_personal_click
   ↓
9. Scroll a formulario
   ↓
10. Completa formulario con plan pre-seleccionado
    ↓
11. Submit
    ↓ Tracking: form_submit_profesionales_independientes
    ↓ POST a Make webhook
    ↓
12. Redirige a /?presentationId=wamedium&leadId={id}
    ↓
13. Ve presentación personalizada
    ↓
14. CTA final: "Agendar llamada de onboarding"
```

### Flujo 2: Usuario Directo a Pricing

```
1. Usuario llega a /?segment=profesionales-independientes (link directo)
   ↓
2. Lee Hero rápidamente
   ↓
3. Click en CTA primario "Ver planes y precios"
   ↓ Scroll automático a Pricing Section
   ↓ Tracking: cta_ver_planes_click
   ↓
4. Compara planes
   ↓
5. [Continúa desde paso 8 del Flujo 1]
```

### Flujo 3: Usuario Indeciso

```
1. Usuario llega a landing
   ↓
2. Lee todo el contenido
   ↓
3. Llega a Pricing pero no hace click en ningún plan
   ↓
4. Scroll hasta FAQs
   ↓
5. Lee FAQs
   ↓
6. Click en CTA secundario "Agendar asesoría"
   ↓ Tracking: cta_asesoria_click
   ↓
7. Scroll a formulario con plan_interest = "No estoy seguro"
   ↓
8. Submit
   ↓
9. Redirige a /?presentationId=waquick
   ↓
10. CTA: "Agendar llamada de diagnóstico"
```

---

## 📱 Especificaciones Responsive

### Breakpoints

**Usar los mismos breakpoints del proyecto:**
- Mobile: < 768px
- Tablet: 768px - 1023px
- Desktop: ≥ 1024px

### Ajustes por Sección

#### Hero Section
- **Desktop:** 2 columnas (texto izq, video/screenshot der)
- **Tablet:** 2 columnas compactas
- **Mobile:** 1 columna (texto arriba, media abajo)

#### Problem Section
- **Desktop:** 3 columnas (pain points lado a lado)
- **Tablet:** 2 columnas (tercero abajo, centrado)
- **Mobile:** 1 columna (stack vertical)

#### Pricing Section (CRÍTICO)
- **Desktop:** 3 cards en fila, featured con scale(1.05)
- **Tablet:** 3 cards en fila sin scale, padding reducido
- **Mobile:** 1 card por fila, featured primero, sin scale

#### Value Props
- **Desktop:** Alternado (imagen-texto, texto-imagen)
- **Tablet:** Igual que desktop
- **Mobile:** Stack vertical (texto arriba, imagen abajo siempre)

#### Form Section
- **Desktop:** 2 columnas para campos cortos
- **Tablet:** 2 columnas
- **Mobile:** 1 columna

---

## 🧪 Testing y Validación

### Checklist de Funcionalidad

**Navegación:**
- [ ] Click en card "Profesionales Independientes" en Homepage Hub redirige correctamente
- [ ] Query param `?segment=profesionales-independientes` carga landing correcta
- [ ] UTM params se propagan correctamente en todos los links

**Pricing Cards:**
- [ ] 3 cards se muestran correctamente en todos los breakpoints
- [ ] Card featured tiene estilo destacado
- [ ] Hover states funcionan
- [ ] CTAs de cada card tienen tracking específico

**Formulario:**
- [ ] Todos los campos validan correctamente
- [ ] Select de "Plan de interés" pre-selecciona si viene de CTA específico
- [ ] Honeypot field está oculto
- [ ] Submit envía payload correcto a Make webhook
- [ ] Redirect post-submit funciona según plan seleccionado

**Tracking:**
- [ ] Todos los eventos de Clarity se disparan correctamente
- [ ] Scroll tracking funciona (25%, 50%, 75%, pricing section)
- [ ] UTMs se preservan en formulario y redirect

**Responsive:**
- [ ] Layout se adapta correctamente en mobile/tablet/desktop
- [ ] Pricing cards son usables en mobile (no muy pequeñas)
- [ ] Formulario es fácil de completar en mobile
- [ ] Imágenes/videos cargan lazy y optimizados

**Performance:**
- [ ] LCP < 2.5s
- [ ] No hay layout shifts (CLS < 0.1)
- [ ] Imágenes en WebP
- [ ] Video lazy-loaded

### A/B Testing Sugerido (Fase 2)

**Test 1: Positioning Statement**
- Variante A: "Si mañana te bloquean el WhatsApp, tu base de datos de clientes y aliados sigue viva"
- Variante B: "Tu WhatsApp, respaldado, organizado y más inteligente"
- Métrica: Scroll depth + conversión a formulario

**Test 2: Pricing Card Featured**
- Variante A: CRM Personal featured (plan medio)
- Variante B: CRM + IA featured (plan alto)
- Métrica: Conversión por plan

**Test 3: CTA Primario en Hero**
- Variante A: "Ver planes y precios"
- Variante B: "Empezar prueba gratis"
- Métrica: Click-through rate

---

## 🚨 Errores Críticos a Evitar

### ❌ NO HACER

1. **NO mezclar audiencias**
   - Esta landing es SOLO para profesionales independientes
   - No mencionar "empresas", "equipos", "instituciones"
   - Mantener foco en relaciones personales, no operaciones masivas

2. **NO usar placeholders genéricos**
   - Evitar "Contacto (placeholder)" en testimoniales
   - Evitar "Lorem ipsum" en cualquier parte
   - Si no hay dato real, usar anónimo específico creíble

3. **NO diluir el mensaje de pricing**
   - Los 3 planes deben estar claros y diferenciados
   - No agregar "planes custom" o "contacta ventas" en esta landing
   - Pricing transparente, sin asteriscos confusos

4. **NO romper la arquitectura de query params**
   - Mantener sistema de `?segment=` existente
   - No intentar agregar routing real sin consultar
   - Preservar compatibilidad con sistema de presets

5. **NO ignorar el framework de Pierri**
   - Hero debe tener positioning statement claro
   - Problem section debe construir empatía específica
   - Value props deben seguir Feature → Capability → Benefit
   - No usar multi-order benefits sin contexto

### ✅ SÍ HACER

1. **SÍ mantener coherencia visual**
   - Usar mismos colores, tipografías, espaciados del proyecto
   - Reutilizar componentes existentes cuando sea posible
   - Seguir mismo patrón de secciones que otras landings

2. **SÍ ser específico en messaging**
   - Hablar directamente al ICP (consultores, asesores, coaches)
   - Usar números concretos (200-1,000 contactos, 30-50% ingresos)
   - Ejemplos reales de profesiones y casos de uso

3. **SÍ optimizar para conversión**
   - CTA primario siempre visible
   - Pricing section destacada y fácil de comparar
   - Formulario simple y rápido de completar
   - Risk reversal claro (7 días gratis, sin compromiso)

4. **SÍ trackear todo**
   - Cada CTA con evento específico
   - Scroll depth por sección
   - Interacciones con pricing cards
   - Tiempo en página

5. **SÍ pensar en mobile-first**
   - Mayoría de tráfico será mobile
   - Pricing cards deben ser usables en pantalla pequeña
   - Formulario fácil de completar con teclado móvil

---

## 📦 Entregables Esperados

### Archivos Nuevos

1. `components/landing/LandingProfesionalesIndependientes.tsx`
2. `components/shared/PricingCard.tsx`
3. Assets:
   - Screenshots del producto (mínimo 3)
   - Video demo o placeholder (1-2 min)
   - Imágenes optimizadas (WebP)

### Archivos Modificados

1. `components/landing/HomepageHub.tsx` (agregar 7ma card)
2. `LandingApp.tsx` (agregar case en switch)
3. `types.ts` (extender SegmentType)
4. `utils/tracking.ts` (agregar eventos)
5. `utils/presetRecommendation.ts` (agregar mapeo)
6. `components/shared/FormSection.tsx` (hacer más flexible)

### Documentación

1. Actualizar `HOMEPAGE_HUB_README.md` con:
   - Nuevo segmento en lista
   - Nuevo flujo de usuario
   - Nuevos eventos de tracking
   - Instrucciones de testing

---

## 🎯 Métricas de Éxito

### KPIs a Monitorear

**Homepage Hub:**
- % de clicks en "Profesionales Independientes" vs otros segmentos
- Target: >25% (debe ser el más clickeado por ser featured)

**Landing Profesionales Independientes:**
- Bounce rate: Target <40%
- Tiempo en página: Target >2 min
- Scroll depth: Target >75% llegan a pricing
- Conversión a formulario: Target 3-7%

**Pricing Section:**
- % de usuarios que llegan a pricing: Target >60%
- Distribución de clicks por plan:
  - Backup: 20-30%
  - CRM Personal: 40-50% (featured)
  - CRM + IA: 20-30%

**Formulario:**
- Tasa de completado: Target >70%
- Tiempo promedio de llenado: Target <2 min
- Distribución de profesiones (para validar ICP)

---

## 📞 Contacto y Soporte

**Para dudas sobre:**
- **Producto/Features:** Consultar con equipo de producto
- **Pricing/Planes:** Revisar `informe-ejecutivo-whatsapp-backup`
- **Diseño/UX:** Seguir `HOMEPAGE_REDESIGN_SPEC.md`
- **Arquitectura:** Revisar `PLAN_IMPLEMENTACION_HOMEPAGE_HUB.md`

**Decisiones que requieren aprobación:**
- Cambios en pricing mostrado
- Cambios en flujo de formulario
- Modificaciones a arquitectura de query params
- Nuevos componentes que afecten otras landings

---

## ✅ Checklist Final Pre-Deploy

**Funcionalidad:**
- [ ] Navegación desde Homepage Hub funciona
- [ ] Todas las secciones renderizan correctamente
- [ ] Pricing cards son interactivas y trackean
- [ ] Formulario valida y envía a Make
- [ ] Redirect post-submit funciona
- [ ] Tracking de Clarity funciona en todos los eventos

**Contenido:**
- [ ] Todos los textos están finalizados (no hay placeholders)
- [ ] Pricing es correcto ($19K-29K, $39K-49K, $79K-99K)
- [ ] Features por plan son precisas
- [ ] FAQs responden dudas reales
- [ ] Testimoniales son creíbles (reales o anónimos específicos)

**Diseño:**
- [ ] Coherencia visual con resto del sitio
- [ ] Responsive funciona en mobile/tablet/desktop
- [ ] Imágenes optimizadas (WebP, lazy-load)
- [ ] Video carga correctamente
- [ ] Hover states y animaciones funcionan

**Performance:**
- [ ] LCP < 2.5s
- [ ] CLS < 0.1
- [ ] Lighthouse score >90 en mobile

**SEO:**
- [ ] Meta title y description específicos
- [ ] H1 único y claro
- [ ] OpenGraph tags
- [ ] Canonical URL

---

**Fin del documento**

**Versión:** 1.0  
**Última actualización:** Enero 2026  
**Próxima revisión:** Post-lanzamiento (análisis de métricas)
