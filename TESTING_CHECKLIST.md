# Testing Checklist - Homepage Hub Multi-Tier

## 🧪 Testing Local

### Pre-requisitos
- [ ] `.env.local` configurado con `VITE_MAKE_WEBHOOK_URL`
- [ ] `npm install` ejecutado
- [ ] `npm run dev` corriendo en http://localhost:5173

---

## 1️⃣ Homepage Hub

### Funcionalidad
- [ ] Cargar `/` muestra Homepage Hub (no landing antigua)
- [ ] Se ven 6 cards de segmentos en grid 3x2 (desktop)
- [ ] Card "Educación" tiene borde azul destacado (featured)
- [ ] Sección "¿Por qué CloserCat?" muestra 3 value props
- [ ] Sección social proof muestra 3 métricas

### Tracking
- [ ] Abrir Clarity → Ver evento `homepage_hub_view`
- [ ] Click en cada card → Ver eventos `segment_click_{segment}`

### Responsive
- [ ] Mobile: Cards en 1 columna
- [ ] Tablet: Cards en 2 columnas
- [ ] Desktop: Cards en 3 columnas

---

## 2️⃣ Landing Educación

### Navegación
- [ ] Click en card "Educación" → Redirige a `/?segment=educacion`
- [ ] URL contiene `utm_source=homepage&utm_medium=segment_selector`

### Secciones
- [ ] **Hero**: Badge verde, título, 3 bullets, 2 CTAs, placeholder video
- [ ] **Problem**: 2 columnas (escenario + costo), quote testimonial
- [ ] **Solution Intro**: 3 cards (IA, Q10, Guardrails)
- [ ] **Value Props**: 4 capabilities con layout alternado
- [ ] **How It Works**: 4 pasos numerados
- [ ] **Form**: Todos los campos visibles, honeypot oculto
- [ ] **FAQs**: 6 preguntas expandibles

### CTAs
- [ ] "Agendar demo personalizada" → Scroll a formulario
- [ ] "Ver video (1 min)" → Click registrado (sin modal por ahora)

### Formulario
- [ ] Llenar todos los campos requeridos
- [ ] Submit → Envía a Make webhook
- [ ] Submit → Redirige a `/?presentationId=wamedium&segment=educacion`
- [ ] Verificar payload en Make:
  ```json
  {
    "segment": "educacion",
    "lead": { "name": "...", "company": "..." },
    "recommended_preset": "wamedium"
  }
  ```

### Tracking
- [ ] Vista landing → `landing_educacion_view`
- [ ] Click CTA demo → `cta_demo_educacion`
- [ ] Submit form → `form_submit_educacion`

### Responsive
- [ ] Mobile: Hero en 1 columna, value props stack vertical
- [ ] Tablet: Grid 2 columnas funciona
- [ ] Desktop: Todo en layout correcto

---

## 3️⃣ Landing Emprendedores

### Navegación
- [ ] Click en card "Emprendedores" → `/?segment=emprendedores`

### Secciones
- [ ] **Hero**: Badge azul, título, 4 bullets, 1 CTA
- [ ] **Problem**: Lista de 4 pain points con ❌
- [ ] **Value Props**: 3 capabilities (número profesional, IA, inbox)
- [ ] **Pricing**: Card destacada con $49/mes, features listados
- [ ] **How It Works**: 3 pasos
- [ ] **Form**: Campos básicos, CTA "Empezar ahora"
- [ ] **FAQs**: 5 preguntas

### Formulario
- [ ] Submit → Redirige a `/?presentationId=waquick&segment=emprendedores`
- [ ] Preset recomendado: `waquick`

### Tracking
- [ ] Vista → `landing_emprendedores_view`
- [ ] Click CTA → `cta_signup_emprendedores`
- [ ] Submit → `form_submit_emprendedores`

---

## 4️⃣ Landing Otras Industrias

### Navegación
- [ ] Click en card "Otra Industria" → `/?segment=otras-industrias`

### Secciones
- [ ] **Hero**: Badge morado, propuesta piloto, 4 pasos
- [ ] **Industries**: Grid 4 industrias con resultados
- [ ] **Why Pilot**: 2 columnas (para ti / para nosotros)
- [ ] **Form**: Campos extendidos (industria, KPI, proceso)
- [ ] **What Happens Next**: Timeline 4 fases
- [ ] **FAQs**: 5 preguntas

### Formulario Extendido
- [ ] Campos adicionales visibles: `industria`, `kpiObjetivo`, `procesoActual`
- [ ] Submit → Redirige a `/?presentationId=wamedium&segment=otras-industrias`
- [ ] Payload incluye campos extendidos

### Tracking
- [ ] Vista → `landing_otras_industrias_view`
- [ ] Submit → `form_submit_otras_industrias`

---

## 5️⃣ Placeholders (Ecommerce, B2B, Soporte)

### Navegación
- [ ] Click "Ecommerce" → `/?segment=ecommerce`
- [ ] Click "B2B" → `/?segment=b2b`
- [ ] Click "Soporte" → `/?segment=soporte`

### Contenido
- [ ] Badge gris "Próximamente"
- [ ] Título correcto por segmento
- [ ] Features preview (5 items)
- [ ] Form "Únete a la lista de espera"
- [ ] CTA alternativo → Link a `/?segment=otras-industrias`

### Formulario Waitlist
- [ ] Campos: nombre, email, empresa
- [ ] Submit → Envía a Make con `event: "waitlist_submit"`
- [ ] Submit → Muestra mensaje de confirmación ✅
- [ ] NO redirige a presentación

### Tracking
- [ ] Vista → `landing_placeholder_{segment}_view`
- [ ] Submit → `form_submit_placeholder_{segment}`

---

## 6️⃣ Integración con Sistema Existente

### Presentaciones
- [ ] `/?presentationId=wamedium` → Muestra PresentationApp (no LandingApp)
- [ ] `/?presentationId=waquick` → Muestra PresentationApp
- [ ] Navegación de slides funciona
- [ ] CTAs en slides funcionan

### Flujo Completo
- [ ] Homepage Hub → Landing Educación → Form → Presentación wamedium
- [ ] Homepage Hub → Landing Emprendedores → Form → Presentación waquick
- [ ] Presentación → CTA Calendly funciona

---

## 7️⃣ Tracking Global

### Microsoft Clarity
- [ ] Abrir dashboard de Clarity
- [ ] Filtrar por últimos 30 min
- [ ] Verificar eventos:
  - `homepage_hub_view`
  - `segment_click_*`
  - `landing_*_view`
  - `cta_*`
  - `form_submit_*`
  - `scroll_25`, `scroll_50`, `scroll_75`, `scroll_100`

### UTM Propagation
- [ ] Entrar con UTMs: `/?utm_source=facebook&utm_campaign=test`
- [ ] Click en segmento → UTMs se mantienen
- [ ] Submit form → Payload incluye UTMs
- [ ] Redirect a presentación → UTMs se mantienen

---

## 8️⃣ Edge Cases

### Segment Inválido
- [ ] `/?segment=invalido` → Redirige a `/`
- [ ] `/?segment=` → Muestra Homepage Hub

### Sin Webhook Configurado
- [ ] Comentar `VITE_MAKE_WEBHOOK_URL` en `.env.local`
- [ ] Reiniciar dev server
- [ ] Submit form → Muestra error o continúa sin enviar

### Honeypot
- [ ] Abrir DevTools → Console
- [ ] Llenar campo oculto `website` con valor
- [ ] Submit → No envía (spam detectado)

### Campos Requeridos
- [ ] Dejar campo "Nombre" vacío → Submit bloqueado
- [ ] Dejar campo "Email" vacío → Submit bloqueado
- [ ] Email inválido → Validación HTML5

---

## 9️⃣ Performance

### Lighthouse Audit
- [ ] Abrir DevTools → Lighthouse
- [ ] Run audit en modo Mobile
- [ ] Performance: **Target >90**
- [ ] Accessibility: **Target >90**
- [ ] Best Practices: **Target >90**
- [ ] SEO: **Target >90**

### Métricas
- [ ] First Contentful Paint: **<1.5s**
- [ ] Time to Interactive: **<3s**
- [ ] Largest Contentful Paint: **<2.5s**

### Lazy Loading
- [ ] Imágenes tienen `loading="lazy"`
- [ ] Screenshots no bloquean render inicial

---

## 🔟 Cross-Browser

### Desktop
- [ ] Chrome: Todo funciona
- [ ] Firefox: Todo funciona
- [ ] Safari: Todo funciona
- [ ] Edge: Todo funciona

### Mobile
- [ ] Chrome Android: Responsive correcto
- [ ] Safari iOS: Responsive correcto
- [ ] Touch targets >44px

---

## 1️⃣1️⃣ Accesibilidad

### Keyboard Navigation
- [ ] Tab navega por todos los links/botones
- [ ] Enter activa CTAs
- [ ] Form navegable con teclado

### Screen Reader
- [ ] Headings en orden lógico (h1 → h2 → h3)
- [ ] Alt text en imágenes (cuando se agreguen)
- [ ] Labels en inputs del form

### Contraste
- [ ] Texto cumple WCAG AA (4.5:1)
- [ ] CTAs tienen contraste suficiente

---

## 1️⃣2️⃣ Regresión

### Landing Original
- [ ] Backup existe: `LandingApp_BACKUP.tsx`
- [ ] Si algo falla, se puede restaurar

### Presentaciones
- [ ] Sistema de presets sigue funcionando
- [ ] Partners (wsi, vc, ticsia) funcionan
- [ ] Slide order correcto
- [ ] Tracking en presentaciones funciona

---

## ✅ Criterios de Aceptación Final

- [ ] Homepage Hub se muestra por defecto en `/`
- [ ] 6 segmentos redirigen correctamente
- [ ] 3 landings completas funcionan (educación, emprendedores, otras-industrias)
- [ ] 3 placeholders funcionan (ecommerce, b2b, soporte)
- [ ] Formularios envían a Make webhook
- [ ] Formularios redirigen a presentación correcta
- [ ] Tracking funciona en todos los eventos
- [ ] UTMs se propagan correctamente
- [ ] Responsive funciona en mobile/tablet/desktop
- [ ] Performance >90 en Lighthouse
- [ ] Sistema de presentaciones sigue funcionando
- [ ] No hay errores en consola

---

## 🐛 Bugs Conocidos

### TypeScript Warnings (No críticos)
- ⚠️ `key` prop en map de ValuePropCard - No afecta funcionalidad
- ✅ `import.meta.env` - Resuelto con `vite-env.d.ts`

### Por Implementar (Manual)
- [ ] Screenshots reales del producto (actualmente placeholders)
- [ ] Video demo real (actualmente placeholder)
- [ ] Testimoniales reales (actualmente texto genérico)
- [ ] Logos de clientes (opcional)

---

## 📝 Notas de Testing

**Fecha:** _____________  
**Tester:** _____________  
**Ambiente:** Local / Staging / Producción  
**Navegador:** _____________  
**Resolución:** _____________  

**Issues encontrados:**
1. _____________
2. _____________
3. _____________

**Observaciones:**
_____________________________________________
_____________________________________________
_____________________________________________
