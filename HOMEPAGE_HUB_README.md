# Homepage Hub Multi-Tier - Guía de Implementación

## 🎉 Implementación Completada

Se ha implementado exitosamente el sistema de Homepage Hub Multi-Tier según el framework de Anthony Pierri.

## 📁 Estructura de Archivos Creados

### Componentes Landing
```
components/
├── landing/
│   ├── HomepageHub.tsx              ✅ Hub principal con selector de 6 segmentos
│   ├── LandingEducacion.tsx         ✅ Landing completa para instituciones educativas
│   ├── LandingEmprendedores.tsx     ✅ Landing para emprendedores (Tier 1)
│   ├── LandingOtrasIndustrias.tsx   ✅ Landing para pilotos personalizados
│   └── LandingPlaceholder.tsx       ✅ Placeholder para ecommerce, b2b, soporte
│
└── shared/
    ├── SegmentCard.tsx              ✅ Card de segmento con tracking
    ├── CTAButton.tsx                ✅ Botón CTA reutilizable
    ├── Badge.tsx                    ✅ Badge de segmento
    ├── ValuePropCard.tsx            ✅ Card de value proposition
    └── FormSection.tsx              ✅ Formulario con integración Make
```

### Utilidades
```
utils/
├── tracking.ts                      ✅ Funciones de tracking (Clarity)
└── presetRecommendation.ts          ✅ Lógica de segmentación y presets
```

### Archivos Actualizados
```
├── LandingApp.tsx                   ✅ Refactorizado con sistema de segmentos
├── types.ts                         ✅ Tipos extendidos para segmentos
├── vite-env.d.ts                    ✅ Declaración de variables de entorno
└── .env.local.example               ✅ Ejemplo actualizado
```

### Backups
```
├── LandingApp_BACKUP.tsx            ✅ Backup del landing original
```

## 🚀 Cómo Usar

### 1. Configurar Variables de Entorno

Copia `.env.local.example` a `.env.local`:

```bash
cp .env.local.example .env.local
```

Edita `.env.local` y configura:

```bash
# REQUERIDO: Webhook de Make para captura de leads
VITE_MAKE_WEBHOOK_URL=https://hook.us1.make.com/tu_webhook_id

# Opcional: Clarity para analytics
VITE_CLARITY_PROJECT_ID=tu_proyecto_clarity
```

### 2. Crear Webhook en Make.com

1. Ve a [Make.com](https://www.make.com)
2. Crea un nuevo escenario
3. Agrega módulo "Custom Webhook"
4. Copia la URL del webhook
5. Configura acciones:
   - Guardar en Google Sheets / Airtable / CRM
   - Enviar notificación (Email/Slack/WhatsApp)
   - (Opcional) Enriquecer con Clearbit/Apollo

**Payload que recibirás:**
```json
{
  "event": "lead_submit",
  "created_at": "2026-01-23T14:30:00.000Z",
  "page_url": "https://closercat.com/?segment=educacion",
  "user_agent": "Mozilla/5.0...",
  "utm": {
    "utm_source": "homepage",
    "utm_medium": "segment_selector",
    "utm_campaign": "educacion"
  },
  "segment": "educacion",
  "lead": {
    "name": "Juan Pérez",
    "company": "Universidad XYZ",
    "whatsapp": "+57 300 123 4567",
    "email": "juan@universidad.com",
    "monthlyVolumeEstimate": "5000",
    "useCase": "Educación",
    "crm": "Q10"
  },
  "recommended_preset": "wamedium"
}
```

### 3. Ejecutar Localmente

```bash
npm install
npm run dev
```

### 4. Navegar por el Sistema

**Homepage Hub (sin query params):**
```
http://localhost:5173/
```

**Landings Específicas:**
```
http://localhost:5173/?segment=educacion
http://localhost:5173/?segment=emprendedores
http://localhost:5173/?segment=otras-industrias
http://localhost:5173/?segment=ecommerce        (placeholder)
http://localhost:5173/?segment=b2b              (placeholder)
http://localhost:5173/?segment=soporte          (placeholder)
```

**Presentaciones (sistema existente):**
```
http://localhost:5173/?presentationId=wamedium
http://localhost:5173/?presentationId=waquick
```

## 📊 Flujos de Usuario

### Flujo 1: Educación (Tier 2 - Sales-led)
```
1. Usuario entra a / → Ve Homepage Hub
2. Click en "Educación" → Redirige a /?segment=educacion
3. Lee landing específica de educación
4. Completa formulario
5. Redirige a /?presentationId=wamedium (deck personalizado)
6. CTA "Agendar demo" en presentación
```

### Flujo 2: Emprendedores (Tier 1 - Self-service)
```
1. Usuario entra a / → Ve Homepage Hub
2. Click en "Emprendedores" → Redirige a /?segment=emprendedores
3. Lee landing con pricing ($49/mes)
4. Completa formulario "Empezar gratis"
5. Redirige a /?presentationId=waquick (deck corto)
6. CTA signup/demo
```

### Flujo 3: Otras Industrias (Tier 3 - Custom)
```
1. Usuario entra a / → Ve Homepage Hub
2. Click en "Otra Industria" → Redirige a /?segment=otras-industrias
3. Lee propuesta de piloto a resultados
4. Completa formulario extendido (industria, KPI, proceso)
5. Notificación a sales → Llamada de discovery
```

### Flujo 4: Placeholders (Ecommerce, B2B, Soporte)
```
1. Usuario entra a / → Ve Homepage Hub
2. Click en segmento placeholder → Redirige a /?segment=ecommerce
3. Ve landing "Próximamente"
4. Completa formulario "Notifícame"
5. Agregado a lista de espera
```

## 🎯 Eventos de Tracking (Clarity)

### Homepage Hub
- `homepage_hub_view` - Vista del hub
- `segment_click_educacion` - Click en card de educación
- `segment_click_emprendedores` - Click en emprendedores
- `segment_click_otras_industrias` - Click en otras industrias
- `segment_click_ecommerce` - Click en ecommerce
- `segment_click_b2b` - Click en B2B
- `segment_click_soporte` - Click en soporte

### Landings Específicas
- `landing_educacion_view` - Vista landing educación
- `landing_emprendedores_view` - Vista landing emprendedores
- `landing_otras_industrias_view` - Vista landing otras industrias
- `landing_placeholder_{segment}_view` - Vista placeholders

### CTAs
- `cta_demo_educacion` - Click "Agendar demo" en educación
- `cta_signup_emprendedores` - Click "Empezar gratis" en emprendedores
- `cta_piloto_otras_industrias` - Click aplicar a pilotos
- `cta_video_educacion` - Click ver video

### Formularios
- `form_submit_educacion` - Submit formulario educación
- `form_submit_emprendedores` - Submit formulario emprendedores
- `form_submit_otras_industrias` - Submit formulario pilotos
- `form_submit_placeholder_{segment}` - Submit waitlist

## 🎨 Personalización

### Agregar Nuevo Segmento

1. **Actualizar tipos** (`types.ts`):
```typescript
export type SegmentType = 
  | 'emprendedores' 
  | 'educacion'
  | 'tu-nuevo-segmento';  // ← Agregar aquí
```

2. **Crear componente landing**:
```tsx
// components/landing/LandingTuSegmento.tsx
import React, { useEffect } from 'react';
import { clarityEvent } from '../../utils/tracking';

export default function LandingTuSegmento() {
  useEffect(() => {
    clarityEvent('landing_tu_segmento_view');
  }, []);

  return (
    <div>
      {/* Tu landing aquí */}
    </div>
  );
}
```

3. **Agregar card en HomepageHub** (`components/landing/HomepageHub.tsx`):
```tsx
<SegmentCard
  segment="tu-nuevo-segmento"
  icon="🎯"
  title="Tu Segmento"
  description="Descripción breve"
  badge="Badge text"
  badgeColor="blue"
/>
```

4. **Agregar case en LandingApp** (`LandingApp.tsx`):
```tsx
case 'tu-nuevo-segmento':
  return <LandingTuSegmento />;
```

5. **Actualizar preset recommendation** (`utils/presetRecommendation.ts`):
```typescript
case 'tu-nuevo-segmento':
  return 'wamedium'; // o el preset que corresponda
```

## 🔧 Troubleshooting

### Error: "Property 'env' does not exist on type 'ImportMeta'"
✅ **Solucionado** - Se creó `vite-env.d.ts` con las declaraciones de tipos.

### Formulario no envía datos
1. Verifica que `VITE_MAKE_WEBHOOK_URL` esté configurado en `.env.local`
2. Verifica que el webhook de Make esté activo
3. Revisa la consola del navegador para errores

### Tracking no funciona
1. Verifica que Microsoft Clarity esté configurado en `index.html`
2. Verifica que `VITE_CLARITY_PROJECT_ID` esté en `.env.local`
3. Abre Clarity dashboard para ver eventos en tiempo real

### Segmento no redirige correctamente
1. Verifica que el segmento esté en el tipo `SegmentType` en `types.ts`
2. Verifica que haya un case en el switch de `LandingApp.tsx`
3. Revisa la consola para errores de routing

## 📈 Métricas de Éxito

### KPIs a Monitorear

**Homepage Hub:**
- % de visitantes que hacen click en algún segmento: **Target >60%**
- Distribución de clicks por segmento
- Bounce rate: **Target <40%**

**Landing Educación:**
- Conversión a demo agendada: **Target 2-5%**
- Tiempo en página: **Target >2 min**
- Scroll depth: **Target >75%**

**Landing Emprendedores:**
- Conversión a signup: **Target 5-10%**
- Activación en 7 días: **Target >50%**

**Landing Otras Industrias:**
- Aplicaciones a pilotos: **Target 1-3%**
- Calidad (campos completos): **Target >80%**

## 🚢 Deploy

### Netlify / Vercel

1. Conecta tu repositorio
2. Configura variables de entorno en el dashboard:
   - `VITE_MAKE_WEBHOOK_URL`
   - `VITE_CLARITY_PROJECT_ID`
3. Build command: `npm run build`
4. Publish directory: `dist`

### Variables de Entorno en Producción

⚠️ **IMPORTANTE**: No commitees `.env.local` al repositorio. Configura las variables en el dashboard de tu hosting.

## 📚 Recursos

- **Framework de Pierri**: [Fletch PMM](https://www.fletchpmm.com/)
- **Spec Original**: `HOMEPAGE_REDESIGN_SPEC.md`
- **Plan de Implementación**: `PLAN_IMPLEMENTACION_HOMEPAGE_HUB.md`
- **Microsoft Clarity**: [clarity.microsoft.com](https://clarity.microsoft.com/)
- **Make.com**: [make.com](https://www.make.com)

## ✅ Checklist de Implementación

- [x] Estructura de componentes creada
- [x] Homepage Hub implementado
- [x] Landing Educación completa
- [x] Landing Emprendedores completa
- [x] Landing Otras Industrias completa
- [x] Placeholders para segmentos futuros
- [x] Sistema de tracking implementado
- [x] Formularios con integración Make
- [x] Tipos TypeScript actualizados
- [x] Variables de entorno configuradas
- [x] Backup del código original
- [ ] Configurar webhook en Make.com (manual)
- [ ] Agregar screenshots reales del producto (manual)
- [ ] Conseguir testimoniales reales (manual)
- [ ] Grabar video demo 1-2 min (manual)
- [ ] Testing en diferentes navegadores
- [ ] Testing responsive mobile/tablet
- [ ] Deploy a producción

## 🎯 Próximos Pasos

1. **Configurar Make Webhook** - Crear escenario en Make.com
2. **Assets** - Conseguir screenshots, video, testimoniales
3. **Testing** - Probar todos los flujos en local
4. **Deploy** - Subir a producción
5. **A/B Testing** - Hub vs. landing original
6. **Optimización** - Basado en métricas de Clarity

---

**Implementado:** Enero 2026  
**Framework:** Anthony Pierri - Homepage Guide  
**Versión:** 1.0
