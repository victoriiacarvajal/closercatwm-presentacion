# Plan de Ajuste Visual - Alineación con Guía de Marca CloserCat Pro

## 📋 Análisis de Situación Actual

### ✅ Assets Disponibles
- **Logo:** `logo-closercat.png` (gato astronauta con gradiente azul-púrpura)
- **Screenshots:** 15+ imágenes del producto en `/public`
- **Videos:** 10+ demos del producto en `/public`

### ❌ Desalineaciones Detectadas

#### 1. Paleta de Colores
**Actual:**
- Colores genéricos de Tailwind (blue-600, purple-600, gray-900)
- Sin uso del gradiente de marca

**Debe ser:**
- Azul principal: `#08C4F4`
- Azul oscuro: `#104E8B`
- Púrpura Closer: `#8336FF`
- Violeta profundo: `#5F2DA5`
- Gris humo: `#F2F2F5`
- Negro intenso: `#121212`

#### 2. Tipografía
**Actual:**
- Sin fuentes específicas (usando defaults del sistema)

**Debe ser:**
- Títulos: Poppins (semi bold)
- Textos: Inter (regular)
- Estadísticas: Roboto Mono

#### 3. Logo
**Actual:**
- Usado en algunos componentes pero no consistentemente
- Falta en landings nuevas

**Debe ser:**
- Header de todas las landings
- Favicon
- Footer (opcional)

#### 4. Screenshots
**Actual:**
- Placeholders genéricos (emojis)

**Debe ser:**
- Screenshots reales del producto disponibles en `/public`

---

## 🎯 Plan de Implementación

### Fase 1: Sistema de Diseño Base
**Objetivo:** Crear variables CSS con la paleta oficial y configurar fuentes

**Archivos a modificar:**
- `index.css` - Variables CSS de marca
- `index.html` - Importar fuentes de Google Fonts
- `tailwind.config.js` - Extender con colores de marca

**Tareas:**
1. Definir CSS variables con colores oficiales
2. Importar Poppins, Inter, Roboto Mono
3. Configurar Tailwind para usar colores de marca
4. Crear clases utility personalizadas

---

### Fase 2: Componentes Compartidos
**Objetivo:** Actualizar componentes con colores y tipografía de marca

**Archivos a modificar:**
- `components/shared/Badge.tsx` - Colores de marca
- `components/shared/CTAButton.tsx` - Gradiente azul-púrpura
- `components/shared/SegmentCard.tsx` - Colores y tipografía
- `components/shared/ValuePropCard.tsx` - Tipografía Poppins
- `components/shared/FormSection.tsx` - Estilos de marca

**Tareas:**
1. Reemplazar colores genéricos con variables de marca
2. Aplicar Poppins a títulos
3. Aplicar Inter a textos
4. Usar gradiente en CTAs principales
5. Ajustar espaciado según guía

---

### Fase 3: Header Global con Logo
**Objetivo:** Crear header consistente con logo en todas las landings

**Archivos a crear:**
- `components/shared/Header.tsx` - Header reutilizable

**Archivos a modificar:**
- `components/landing/HomepageHub.tsx`
- `components/landing/LandingEducacion.tsx`
- `components/landing/LandingEmprendedores.tsx`
- `components/landing/LandingOtrasIndustrias.tsx`
- `components/landing/LandingPlaceholder.tsx`

**Tareas:**
1. Crear componente Header con logo
2. Incluir navegación (si aplica)
3. CTA "Agendar demo" con gradiente
4. Sticky header con backdrop blur
5. Responsive mobile

---

### Fase 4: Screenshots Reales
**Objetivo:** Reemplazar placeholders con screenshots del producto

**Mapeo de screenshots:**
```
Hero sections:
- closercat-dashboard.png → Vista general del producto
- closercat-conversacion.png → Ejemplo de conversación

Value Props (Educación):
- closercat-conversacion.png → IA responde automáticamente
- closercat-integracion.png → Sincronización Q10
- closercat-campañas.png → Campañas masivas
- closercat-guardrails-v1.mp4 → Control humano (video)

Value Props (Emprendedores):
- closercat-imagen-celular.png → Número profesional
- closercat-imagen-ia.png → IA responde
- closercat-dashboard.png → Inbox organizado

Otras secciones:
- closercat-contexto.png → Knowledge Base
- closercat-cierre.png → Cierre de conversaciones
- closercat-multimedia.png → Mensajes multimedia
```

**Archivos a modificar:**
- Todos los componentes landing que usen placeholders

**Tareas:**
1. Reemplazar emojis con screenshots reales
2. Agregar lazy loading
3. Optimizar aspect ratios
4. Agregar alt text descriptivo
5. Considerar usar videos donde aplique

---

### Fase 5: Gradientes y Efectos Visuales
**Objetivo:** Aplicar gradiente de marca en elementos clave

**Elementos a actualizar:**
- CTAs principales → Gradiente azul (#08C4F4) a púrpura (#8336FF)
- Badges destacados → Gradiente sutil
- Secciones hero → Fondo con gradiente suave
- Cards featured → Border con gradiente

**Tareas:**
1. Crear clases CSS para gradientes
2. Aplicar en CTAButton variant="primary"
3. Aplicar en badges "featured"
4. Crear fondos sutiles con gradiente
5. Hover effects con gradiente

---

### Fase 6: Iconografía Personalizada
**Objetivo:** Usar iconografía consistente con la marca

**Opciones:**
1. Mantener emojis actuales (simple, funcional)
2. Crear iconos SVG personalizados con estilo de marca
3. Usar librería compatible (Lucide/Heroicons) con colores de marca

**Decisión recomendada:** Mantener emojis por ahora, crear SVGs custom en v2

**Tareas:**
1. Estandarizar tamaño de emojis (text-4xl, text-5xl)
2. Considerar agregar círculos con gradiente de fondo
3. Documentar emojis usados por sección

---

### Fase 7: Estadísticas y Números
**Objetivo:** Destacar métricas con Roboto Mono

**Elementos a actualizar:**
- Homepage Hub: "500K+ mensajes", "<3 seg", "78%"
- Landing Educación: "78% automatizado", "100% registrados"
- Landing Emprendedores: "$49/mes", "500 conversaciones"
- Todas las métricas numéricas

**Tareas:**
1. Aplicar Roboto Mono a números
2. Usar colores de marca para destacar
3. Aumentar font-weight
4. Agregar animaciones sutiles (opcional)

---

### Fase 8: Voz Visual Consistente
**Objetivo:** Asegurar que el diseño comunique los valores de marca

**Principios a aplicar:**
- **Inteligencia ágil:** Espacios limpios, transiciones suaves
- **Profesionalismo confiable:** Tipografía clara, jerarquía visual
- **Energía enfocada:** Gradientes vibrantes pero no excesivos
- **Autonomía amigable:** Gato como firma visual, tono cercano

**Tareas:**
1. Review de copy para tono de voz
2. Espaciado generoso (no apretujar)
3. Contraste suficiente (WCAG AA)
4. Animaciones sutiles, no distractoras

---

### Fase 9: Elementos de Marca Adicionales
**Objetivo:** Agregar elementos visuales de identidad

**Elementos a considerar:**
- Gato como avatar en testimoniales
- Cometas/elementos cósmicos sutiles en fondos
- Firma visual del gato en footers
- Frases de marca: "Cierra más, con menos desgaste"

**Tareas:**
1. Crear componente Footer con logo y frase
2. Agregar elementos decorativos sutiles
3. Considerar animaciones del gato (v2)

---

### Fase 10: Testing y Refinamiento
**Objetivo:** Validar consistencia visual en todos los breakpoints

**Checklist:**
- [ ] Colores de marca en todos los componentes
- [ ] Tipografía Poppins en títulos
- [ ] Tipografía Inter en textos
- [ ] Roboto Mono en estadísticas
- [ ] Logo visible en todas las páginas
- [ ] Screenshots reales (no placeholders)
- [ ] Gradientes en CTAs principales
- [ ] Responsive mobile/tablet/desktop
- [ ] Contraste WCAG AA
- [ ] Performance (Lighthouse >90)

---

## 📐 Especificaciones Técnicas

### Colores CSS Variables
```css
:root {
  /* Colores primarios */
  --brand-blue-primary: #08C4F4;
  --brand-blue-dark: #104E8B;
  --brand-purple-closer: #8336FF;
  --brand-purple-deep: #5F2DA5;
  
  /* Colores secundarios */
  --brand-gray-smoke: #F2F2F5;
  --brand-black: #121212;
  --brand-white: #FFFFFF;
  
  /* Gradientes */
  --gradient-primary: linear-gradient(135deg, #08C4F4 0%, #8336FF 100%);
  --gradient-subtle: linear-gradient(135deg, rgba(8,196,244,0.1) 0%, rgba(131,54,255,0.1) 100%);
}
```

### Tailwind Config Extension
```js
theme: {
  extend: {
    colors: {
      brand: {
        blue: {
          primary: '#08C4F4',
          dark: '#104E8B',
        },
        purple: {
          closer: '#8336FF',
          deep: '#5F2DA5',
        },
        gray: {
          smoke: '#F2F2F5',
        },
        black: '#121212',
      }
    },
    fontFamily: {
      poppins: ['Poppins', 'sans-serif'],
      inter: ['Inter', 'sans-serif'],
      mono: ['Roboto Mono', 'monospace'],
    },
  }
}
```

### Google Fonts Import
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=Inter:wght@300;400;500;600&family=Roboto+Mono:wght@400;500;700&display=swap" rel="stylesheet">
```

---

## 🎨 Ejemplos de Aplicación

### CTA Button con Gradiente
```tsx
<button className="px-6 py-3 bg-gradient-to-r from-brand-blue-primary to-brand-purple-closer text-white font-poppins font-semibold rounded-xl hover:opacity-90 transition-opacity">
  Agendar demo
</button>
```

### Título con Poppins
```tsx
<h1 className="font-poppins font-bold text-5xl text-brand-black">
  WhatsApp profesional para tu negocio
</h1>
```

### Estadística con Roboto Mono
```tsx
<div className="font-mono text-4xl font-bold text-brand-purple-closer">
  78%
</div>
```

### Badge con Gradiente
```tsx
<span className="px-3 py-1 bg-gradient-to-r from-brand-blue-primary/10 to-brand-purple-closer/10 border border-brand-purple-closer/20 rounded-full text-brand-purple-closer font-poppins font-semibold">
  Integración completa
</span>
```

---

## 📊 Priorización

### Alta Prioridad (Implementar YA)
1. ✅ Colores de marca (Fase 1)
2. ✅ Tipografía (Fase 1)
3. ✅ Header con logo (Fase 3)
4. ✅ Screenshots reales (Fase 4)
5. ✅ Gradientes en CTAs (Fase 5)

### Media Prioridad (Esta semana)
6. ⏳ Estadísticas con Roboto Mono (Fase 7)
7. ⏳ Footer con marca (Fase 9)
8. ⏳ Testing completo (Fase 10)

### Baja Prioridad (v2)
9. 📋 Iconografía custom SVG (Fase 6)
10. 📋 Animaciones del gato (Fase 9)
11. 📋 Elementos decorativos cósmicos (Fase 9)

---

## 🚀 Orden de Implementación Sugerido

1. **Sistema de diseño** (30 min)
   - CSS variables + Tailwind config + Fuentes

2. **Header global** (20 min)
   - Componente Header reutilizable

3. **Componentes compartidos** (40 min)
   - Badge, CTAButton, SegmentCard, ValuePropCard, FormSection

4. **Landings** (60 min)
   - HomepageHub, LandingEducacion, LandingEmprendedores, etc.

5. **Screenshots** (30 min)
   - Reemplazar placeholders con imágenes reales

6. **Refinamiento** (30 min)
   - Estadísticas, espaciado, detalles finales

**Total estimado:** ~3.5 horas

---

## ✅ Criterios de Aceptación

- [ ] Todos los colores usan variables de marca
- [ ] Títulos usan Poppins
- [ ] Textos usan Inter
- [ ] Números/estadísticas usan Roboto Mono
- [ ] Logo visible en header de todas las páginas
- [ ] CTAs principales tienen gradiente azul-púrpura
- [ ] Screenshots reales (no emojis) en value props
- [ ] Responsive funciona correctamente
- [ ] Contraste cumple WCAG AA
- [ ] Performance Lighthouse >90

---

**Versión:** 1.0  
**Fecha:** Enero 2026  
**Basado en:** Guía Visual de Marca CloserCat Pro v1.0
