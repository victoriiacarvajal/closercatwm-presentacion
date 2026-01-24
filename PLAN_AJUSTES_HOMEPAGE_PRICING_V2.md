# Plan de Ajustes: Homepage según Pricing Multi-Tier (v2 - Corregido)

**Fecha:** Enero 2026  
**Versión:** 2.0 (Corregida)

---

## 🎯 Arquitectura Corregida

### Casos de Uso (Transversales a todos los Tiers)

**Disponibles para Emprendedores, Industrias y Pilotos:**

1. **🛒 Ecommerce** - Catálogo de productos, precios, inventario
2. **🤝 Prospección** - Calificación de leads, seguimiento comercial
3. **💬 Soporte** - FAQs, tickets, troubleshooting

**Estos 3 casos de uso están desarrollados y funcionan en todos los tiers.**

### Soluciones por Industria (Tier 2)

**Industrias específicas con landing pages dedicadas:**

1. **🎓 Educación/Formación** (Landing específica)
   - Universidades
   - Colegios
   - Academias
   - Workshops
   - Cursos
   - Programas de certificación
   - **Integración Q10** para admisiones

2. **🏢 Otras Industrias** (Pilotos)
   - Healthcare
   - Real Estate
   - Automotive
   - Etc.

---

## 📊 Nueva Estructura del Homepage

### HomepageHub.tsx

```
┌─────────────────────────────────────────────────────────┐
│ Hero: "WhatsApp profesional para tu negocio"            │
│ Elige tu perfil:                                        │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│ TIER 1: EMPRENDEDOR                                     │
│ 🚀 Emprendedor / Microempresa                           │
│ "Marketplace gratis o línea propia con pago único"      │
│ Badge: "Desde $0 - Sin mensualidad"                     │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│ TIER 2: SOLUCIONES POR INDUSTRIA                        │
│                                                          │
│ 🎓 Educación/Formación (FEATURED)                       │
│ "Admisiones automatizadas - Universidades a Workshops"  │
│ Badge: "Integración Q10 disponible"                     │
│                                                          │
│ [Otras industrias disponibles como pilotos]             │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│ TIER 3: PILOTOS                                         │
│ 🏢 Otra Industria                                       │
│ "Piloto personalizado a resultados"                     │
│ Badge: "Paga por resultados"                            │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│ CASOS DE USO DISPONIBLES (Todos los tiers)             │
│                                                          │
│ 🛒 Ecommerce  |  🤝 Prospección  |  💬 Soporte          │
│                                                          │
│ "Elige el caso de uso que mejor se adapte a tu negocio" │
└─────────────────────────────────────────────────────────┘
```

---

## 🔧 Ajustes Específicos por Landing

### 1. HomepageHub.tsx

#### Cambios en Segment Cards

**ANTES:**
```tsx
<SegmentCard segment="ecommerce" badge="Próximamente" />
<SegmentCard segment="b2b" badge="Próximamente" />
<SegmentCard segment="soporte" badge="Próximamente" />
```

**DESPUÉS:**
```tsx
{/* Tier 1: Emprendedor */}
<SegmentCard
  segment="emprendedores"
  icon="🚀"
  title="Emprendedor / Microempresa"
  description="Marketplace gratis o línea propia con pago único"
  badge="Desde $0 - Sin mensualidad"
  badgeColor="blue"
/>

{/* Tier 2: Educación/Formación (Featured) */}
<SegmentCard
  segment="educacion"
  icon="🎓"
  title="Educación / Formación"
  description="Universidades, colegios, academias, workshops, cursos"
  badge="Integración Q10 disponible"
  badgeColor="green"
  featured={true}
/>

{/* Tier 3: Pilotos */}
<SegmentCard
  segment="otras-industrias"
  icon="🏢"
  title="Otra Industria"
  description="Piloto personalizado a resultados"
  badge="Paga por resultados"
  badgeColor="purple"
/>
```

#### Nueva Sección: Casos de Uso Transversales

```tsx
<section className="py-20 bg-white">
  <div className="max-w-6xl mx-auto px-6">
    <h2 className="text-3xl font-poppins font-bold text-center mb-4" style={{ color: '#121212' }}>
      Casos de uso disponibles
    </h2>
    
    <p className="text-center font-inter mb-12" style={{ color: '#4b5563' }}>
      Independiente de tu tier, puedes usar CloserCat para:
    </p>
    
    <div className="grid md:grid-cols-3 gap-8">
      {/* Ecommerce */}
      <div className="use-case-card p-6 rounded-2xl border-2 border-gray-200 hover:border-blue-400 transition-all">
        <div className="text-5xl mb-4">🛒</div>
        <h3 className="text-xl font-poppins font-bold mb-3" style={{ color: '#121212' }}>
          Ecommerce
        </h3>
        <p className="font-inter text-sm mb-4" style={{ color: '#4b5563' }}>
          Catálogo de productos, consultas de precios, gestión de inventario y pedidos por WhatsApp.
        </p>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <span style={{ color: '#08C4F4' }}>✓</span>
            <span className="font-inter">Catálogo automatizado</span>
          </div>
          <div className="flex items-center gap-2">
            <span style={{ color: '#08C4F4' }}>✓</span>
            <span className="font-inter">Consulta de stock</span>
          </div>
          <div className="flex items-center gap-2">
            <span style={{ color: '#08C4F4' }}>✓</span>
            <span className="font-inter">Procesamiento de pedidos</span>
          </div>
        </div>
      </div>
      
      {/* Prospección */}
      <div className="use-case-card p-6 rounded-2xl border-2 border-gray-200 hover:border-blue-400 transition-all">
        <div className="text-5xl mb-4">🤝</div>
        <h3 className="text-xl font-poppins font-bold mb-3" style={{ color: '#121212' }}>
          Prospección
        </h3>
        <p className="font-inter text-sm mb-4" style={{ color: '#4b5563' }}>
          Calificación automática de leads, seguimiento comercial y cierre de ventas B2B.
        </p>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <span style={{ color: '#08C4F4' }}>✓</span>
            <span className="font-inter">Calificación de leads</span>
          </div>
          <div className="flex items-center gap-2">
            <span style={{ color: '#08C4F4' }}>✓</span>
            <span className="font-inter">Seguimiento automático</span>
          </div>
          <div className="flex items-center gap-2">
            <span style={{ color: '#08C4F4' }}>✓</span>
            <span className="font-inter">Cotizaciones rápidas</span>
          </div>
        </div>
      </div>
      
      {/* Soporte */}
      <div className="use-case-card p-6 rounded-2xl border-2 border-gray-200 hover:border-blue-400 transition-all">
        <div className="text-5xl mb-4">💬</div>
        <h3 className="text-xl font-poppins font-bold mb-3" style={{ color: '#121212' }}>
          Soporte
        </h3>
        <p className="font-inter text-sm mb-4" style={{ color: '#4b5563' }}>
          Atención al cliente 24/7, resolución de FAQs y gestión de tickets de soporte.
        </p>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <span style={{ color: '#08C4F4' }}>✓</span>
            <span className="font-inter">FAQs automatizadas</span>
          </div>
          <div className="flex items-center gap-2">
            <span style={{ color: '#08C4F4' }}>✓</span>
            <span className="font-inter">Gestión de tickets</span>
          </div>
          <div className="flex items-center gap-2">
            <span style={{ color: '#08C4F4' }}>✓</span>
            <span className="font-inter">Escalamiento a humanos</span>
          </div>
        </div>
      </div>
    </div>
    
    <div className="mt-12 text-center">
      <p className="font-inter text-sm" style={{ color: '#6b7280' }}>
        💡 <strong>Combina casos de uso:</strong> Usa Ecommerce + Soporte, o Prospección + Soporte según tus necesidades
      </p>
    </div>
  </div>
</section>
```

---

### 2. LandingEducacion.tsx → LandingFormacion.tsx

#### Cambios en Naming y Scope

**Renombrar archivo:** `LandingEducacion.tsx` → `LandingFormacion.tsx`

**Actualizar segment:** `educacion` → `formacion`

#### Cambios en Hero Section

**ANTES:**
```tsx
<h1>Admisiones automatizadas para instituciones educativas</h1>
<p>Integración nativa con Q10 CRM...</p>
```

**DESPUÉS:**
```tsx
<h1>Automatiza admisiones y consultas en educación y formación</h1>
<p className="text-xl font-inter mb-8" style={{ color: '#4b5563' }}>
  Desde universidades hasta workshops: IA que responde sobre programas, precios, requisitos y agenda citas.
  <strong> Integración nativa con Q10 CRM</strong> para instituciones educativas.
</p>

<div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto mb-8">
  <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200">
    <span className="text-2xl">🎓</span>
    <div>
      <h3 className="font-poppins font-semibold text-sm" style={{ color: '#121212' }}>Instituciones Educativas</h3>
      <p className="text-xs font-inter" style={{ color: '#6b7280' }}>Universidades, colegios, institutos</p>
    </div>
  </div>
  
  <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200">
    <span className="text-2xl">📚</span>
    <div>
      <h3 className="font-poppins font-semibold text-sm" style={{ color: '#121212' }}>Academias y Cursos</h3>
      <p className="text-xs font-inter" style={{ color: '#6b7280' }}>Academias, workshops, certificaciones</p>
    </div>
  </div>
</div>
```

#### Nueva Sección: Tipos de Formación

```tsx
<section className="py-20 bg-gray-50">
  <div className="max-w-6xl mx-auto px-6">
    <h2 className="text-3xl font-poppins font-bold text-center mb-4" style={{ color: '#121212' }}>
      Para todo tipo de formación
    </h2>
    
    <p className="text-center font-inter mb-12" style={{ color: '#4b5563' }}>
      CloserCat se adapta a cualquier modelo educativo:
    </p>
    
    <div className="grid md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <div className="text-4xl mb-3">🏛️</div>
        <h3 className="font-poppins font-bold mb-2" style={{ color: '#121212' }}>Educación Superior</h3>
        <ul className="space-y-2 text-sm font-inter" style={{ color: '#4b5563' }}>
          <li>• Universidades</li>
          <li>• Institutos técnicos</li>
          <li>• Programas de posgrado</li>
          <li>• Educación continua</li>
        </ul>
      </div>
      
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <div className="text-4xl mb-3">🎯</div>
        <h3 className="font-poppins font-bold mb-2" style={{ color: '#121212' }}>Formación Profesional</h3>
        <ul className="space-y-2 text-sm font-inter" style={{ color: '#4b5563' }}>
          <li>• Academias especializadas</li>
          <li>• Certificaciones</li>
          <li>• Bootcamps</li>
          <li>• Cursos online</li>
        </ul>
      </div>
      
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <div className="text-4xl mb-3">✨</div>
        <h3 className="font-poppins font-bold mb-2" style={{ color: '#121212' }}>Talleres y Workshops</h3>
        <ul className="space-y-2 text-sm font-inter" style={{ color: '#4b5563' }}>
          <li>• Talleres presenciales</li>
          <li>• Workshops especializados</li>
          <li>• Cursos cortos</li>
          <li>• Capacitaciones corporativas</li>
        </ul>
      </div>
    </div>
  </div>
</section>
```

---

### 3. LandingEmprendedores.tsx

#### Sección de Casos de Uso

```tsx
<section className="py-20 bg-white">
  <div className="max-w-6xl mx-auto px-6">
    <h2 className="text-3xl font-poppins font-bold text-center mb-4" style={{ color: '#121212' }}>
      Elige tu caso de uso
    </h2>
    
    <p className="text-center font-inter mb-12" style={{ color: '#4b5563' }}>
      Tanto en el plan gratuito como en Lite, puedes usar:
    </p>
    
    <div className="grid md:grid-cols-3 gap-6">
      <div className="p-6 rounded-xl border-2 border-gray-200">
        <div className="text-4xl mb-3">🛒</div>
        <h3 className="font-poppins font-bold mb-2" style={{ color: '#121212' }}>Ecommerce</h3>
        <p className="text-sm font-inter" style={{ color: '#4b5563' }}>
          Vende productos por WhatsApp con catálogo automatizado
        </p>
      </div>
      
      <div className="p-6 rounded-xl border-2 border-gray-200">
        <div className="text-4xl mb-3">🤝</div>
        <h3 className="font-poppins font-bold mb-2" style={{ color: '#121212' }}>Prospección</h3>
        <p className="text-sm font-inter" style={{ color: '#4b5563' }}>
          Califica leads y cierra ventas de servicios profesionales
        </p>
      </div>
      
      <div className="p-6 rounded-xl border-2 border-gray-200">
        <div className="text-4xl mb-3">💬</div>
        <h3 className="font-poppins font-bold mb-2" style={{ color: '#121212' }}>Soporte</h3>
        <p className="text-sm font-inter" style={{ color: '#4b5563' }}>
          Atiende clientes 24/7 con FAQs automatizadas
        </p>
      </div>
    </div>
  </div>
</section>
```

---

## 📋 Checklist de Implementación Actualizado

### Fase 1: Componentes Reutilizables (1h)
- [ ] Crear `PricingCard.tsx`
- [ ] Crear `ComparisonTable.tsx`
- [ ] Crear `FlowDiagram.tsx`
- [ ] Crear `UseCaseCard.tsx` (nuevo)

### Fase 2: HomepageHub (2h)
- [ ] Actualizar SegmentCards (solo 3: Emprendedor, Formación, Pilotos)
- [ ] Eliminar cards de Ecommerce, B2B, Soporte como segmentos
- [ ] Agregar sección "Casos de Uso Disponibles" (Ecommerce, Prospección, Soporte)
- [ ] Actualizar descripciones y badges

### Fase 3: LandingFormacion (antes Educacion) (2h)
- [ ] Renombrar archivo y componente
- [ ] Actualizar hero para incluir todo tipo de formación
- [ ] Agregar sección "Tipos de Formación" (Superior, Profesional, Talleres)
- [ ] Mantener integración Q10 como diferenciador
- [ ] Actualizar screenshots y ejemplos

### Fase 4: LandingEmprendedores (2h)
- [ ] Agregar sección de casos de uso disponibles
- [ ] Actualizar pricing (Gratuito vs. Lite)
- [ ] Agregar explicación de marketplace
- [ ] Tabla de comparación

### Fase 5: LandingOtrasIndustrias (1h)
- [ ] Actualizar con opciones de piloto
- [ ] Clarificar que casos de uso están disponibles

### Fase 6: Actualizar Routing (30min)
- [ ] Cambiar `segment=educacion` → `segment=formacion`
- [ ] Actualizar `LandingApp.tsx` para usar `LandingFormacion`

### Fase 7: Testing (1h)
- [ ] Verificar navegación
- [ ] Verificar responsive
- [ ] Verificar consistencia de mensajes

---

**Tiempo total estimado:** 9-10 horas
