# Plan de Ajustes: Homepage según Especificación de Pricing Multi-Tier

**Fecha:** Enero 2026  
**Objetivo:** Refinar implementación del homepage para alinearse con el sistema de pricing de 3 tiers

---

## 📊 Análisis: Estado Actual vs. Especificación

### Discrepancias Identificadas

#### 1. **Tier Emprendedor - Plan Gratuito**
**Especificación:** Modelo de Marketplace/Red CloserCat
- Número compartido de CloserCat
- IA actúa como intermediario
- Emprendedor NO tiene línea propia
- 210 mensajes/mes
- Notificación de leads calificados
- Código de referencia para enrutamiento

**Estado Actual en Homepage:**
- `LandingEmprendedores.tsx` menciona "Número WhatsApp Business separado"
- No explica el modelo de marketplace
- No menciona código de referencia
- No explica que es un número compartido

**❌ PROBLEMA:** La landing actual sugiere que el emprendedor tiene su propia línea, cuando en realidad usa el número de CloserCat.

#### 2. **Tier Emprendedor - Plan Lite**
**Especificación:** BYOW (Bring Your Own WhatsApp)
- Setup único: $450.000 COP
- 420 mensajes/mes GRATIS (≈60 conversaciones)
- Mensualidad: $0 perpetuo
- Paquetes on-demand para excedente

**Estado Actual en Homepage:**
- `LandingEmprendedores.tsx` muestra pricing "$49/mes"
- No menciona setup único
- No explica que es perpetuo
- No menciona paquetes on-demand

**❌ PROBLEMA:** El pricing mostrado no coincide con la especificación.

#### 3. **Tier Industria - Casos de Uso**
**Especificación:** Solo 1 caso de uso por tenant
- Ecommerce, B2B, Soporte, o Educación
- Múltiples casos = pricing custom (+30% por adicional)

**Estado Actual en Homepage:**
- `HomepageHub.tsx` muestra múltiples segmentos como opciones
- No explica restricción de 1 caso de uso
- No menciona pricing custom para múltiples

**⚠️ PROBLEMA:** No hay claridad sobre la restricción de casos de uso.

#### 4. **Tier Pilotos**
**Especificación:** Pricing a resultados
- Discovery gratuito
- Piloto 60 días con 2 modelos (fixed_reduced o results_only)
- Conversión a suscripción con 3 opciones

**Estado Actual en Homepage:**
- `LandingOtrasIndustrias.tsx` menciona "Paga por resultados"
- No explica las opciones de pricing
- No menciona discovery gratuito
- No explica conversión post-piloto

**⚠️ PROBLEMA:** Falta detalle sobre estructura del piloto.

---

## 🎯 Ajustes Necesarios

### Ajuste 1: Refinar LandingEmprendedores.tsx

#### Cambios en Hero Section

**Actual:**
```tsx
<h1>Separa tu WhatsApp personal del de tu negocio</h1>
<p>Sin contratar equipo ni pagar miles de dólares. CloserCat te da un número profesional con IA que responde 24/7.</p>

<div>
  <strong>Número WhatsApp Business separado</strong> para tu negocio
</div>
```

**Propuesto:**
```tsx
<h1>Empieza gratis en la Red CloserCat o activa tu línea propia</h1>
<p>Dos opciones para emprendedores: Marketplace gratuito o línea WhatsApp Business propia con pago único.</p>
```

#### Cambios en Pricing Section

**Actual:**
```tsx
<div className="pricing-card">
  <div className="text-5xl font-mono">$49</div>
  <span>/mes</span>
</div>
```

**Propuesto:**
```tsx
{/* Plan 1: Gratuito */}
<div className="pricing-card">
  <Badge color="green">Red CloserCat</Badge>
  <div className="text-5xl font-mono">$0</div>
  <p>Gratis para siempre</p>
  <ul>
    <li>210 mensajes IA/mes</li>
    <li>Número compartido de CloserCat</li>
    <li>Código de referencia único</li>
    <li>Notificaciones de leads calificados</li>
  </ul>
</div>

{/* Plan 2: Lite */}
<div className="pricing-card featured">
  <Badge color="purple">Plan Lite</Badge>
  <div className="text-5xl font-mono">$450K</div>
  <p>Pago único + $0/mes perpetuo</p>
  <ul>
    <li>420 mensajes IA/mes GRATIS</li>
    <li>Tu propia línea WhatsApp Business</li>
    <li>≈60 conversaciones/mes</li>
    <li>Paquetes on-demand disponibles</li>
  </ul>
</div>
```

#### Nueva Sección: Comparación de Planes

```tsx
<section className="py-20 bg-gray-50">
  <h2>¿Cuál plan es para ti?</h2>
  
  <div className="comparison-table">
    <table>
      <thead>
        <tr>
          <th>Característica</th>
          <th>Plan Gratuito</th>
          <th>Plan Lite</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Línea WhatsApp</td>
          <td>Número compartido de CloserCat</td>
          <td>Tu propia línea Business</td>
        </tr>
        <tr>
          <td>Mensajes IA/mes</td>
          <td>210 mensajes</td>
          <td>420 mensajes</td>
        </tr>
        <tr>
          <td>Costo mensual</td>
          <td>$0 perpetuo</td>
          <td>$0 perpetuo</td>
        </tr>
        <tr>
          <td>Costo inicial</td>
          <td>$0</td>
          <td>$450.000 (una vez)</td>
        </tr>
        <tr>
          <td>Código de referencia</td>
          <td>✅ Sí</td>
          <td>✅ Sí</td>
        </tr>
        <tr>
          <td>Campañas masivas</td>
          <td>❌ No</td>
          <td>💎 On-demand</td>
        </tr>
      </tbody>
    </table>
  </div>
</section>
```

#### Nueva Sección: Cómo Funciona el Marketplace

```tsx
<section className="py-20 bg-white">
  <h2>Cómo funciona la Red CloserCat (Plan Gratuito)</h2>
  
  <div className="flow-diagram">
    <div className="step">
      <div className="step-number">1</div>
      <h3>Cliente busca tu servicio</h3>
      <p>Envía mensaje al número de CloserCat o usa tu código de referencia</p>
    </div>
    
    <div className="step">
      <div className="step-number">2</div>
      <h3>IA responde por ti</h3>
      <p>Usando tu Knowledge Base, responde preguntas sobre precios, servicios, disponibilidad</p>
    </div>
    
    <div className="step">
      <div className="step-number">3</div>
      <h3>Lead calificado detectado</h3>
      <p>Cuando el cliente muestra interés real, recibes notificación en tu WhatsApp personal</p>
    </div>
    
    <div className="step">
      <div className="step-number">4</div>
      <h3>Tú cierras la venta</h3>
      <p>Aceptas el lead y recibes el número del cliente para contactarlo directamente</p>
    </div>
  </div>
  
  <div className="highlight-box">
    <strong>🔒 Privacidad protegida:</strong> No compartimos el número del cliente hasta que tú aceptes el lead.
  </div>
</section>
```

---

### Ajuste 2: Refinar HomepageHub.tsx

#### Cambios en SegmentCards

**Actual:**
```tsx
<SegmentCard
  segment="emprendedores"
  icon="🚀"
  title="Emprendedor / Microempresa"
  description="1-5 personas, WhatsApp personal"
  badge="Desde $49/mes"
  badgeColor="blue"
/>
```

**Propuesto:**
```tsx
<SegmentCard
  segment="emprendedores"
  icon="🚀"
  title="Emprendedor / Microempresa"
  description="Marketplace gratis o línea propia con pago único"
  badge="Desde $0 - Sin mensualidad"
  badgeColor="blue"
/>
```

#### Cambios en Educación Card

**Actual:**
```tsx
<SegmentCard
  segment="educacion"
  icon="🎓"
  title="Institución Educativa"
  description="Integración nativa con Q10 CRM"
  badge="Integración completa"
  badgeColor="green"
  featured={true}
/>
```

**Propuesto:**
```tsx
<SegmentCard
  segment="educacion"
  icon="🎓"
  title="Institución Educativa"
  description="Admisiones automatizadas con Q10 CRM"
  badge="1 caso de uso incluido"
  badgeColor="green"
  featured={true}
/>
```

#### Nueva Sección: Restricción de Casos de Uso

```tsx
<section className="py-16 bg-white">
  <div className="max-w-4xl mx-auto px-6">
    <h2 className="text-3xl font-poppins font-bold text-center mb-8">
      Elige tu caso de uso principal
    </h2>
    
    <p className="text-center font-inter mb-8" style={{ color: '#4b5563' }}>
      Los planes Growth y Pro incluyen <strong>1 caso de uso</strong>. 
      ¿Necesitas múltiples casos? Contáctanos para pricing personalizado.
    </p>
    
    <div className="grid md:grid-cols-4 gap-4">
      <div className="use-case-card">
        <div className="text-3xl mb-2">🛒</div>
        <h3 className="font-poppins font-semibold">Ecommerce</h3>
        <p className="text-sm font-inter">Catálogo, precios, inventario</p>
      </div>
      
      <div className="use-case-card">
        <div className="text-3xl mb-2">🤝</div>
        <h3 className="font-poppins font-semibold">B2B</h3>
        <p className="text-sm font-inter">Servicios, cotizaciones</p>
      </div>
      
      <div className="use-case-card">
        <div className="text-3xl mb-2">💬</div>
        <h3 className="font-poppins font-semibold">Soporte</h3>
        <p className="text-sm font-inter">FAQs, tickets</p>
      </div>
      
      <div className="use-case-card">
        <div className="text-3xl mb-2">🎓</div>
        <h3 className="font-poppins font-semibold">Educación</h3>
        <p className="text-sm font-inter">Admisiones, Q10</p>
      </div>
    </div>
    
    <div className="mt-8 p-4 bg-purple-50 rounded-lg border border-purple-200">
      <p className="text-sm font-inter">
        <strong>💡 ¿Necesitas Ecommerce + Soporte?</strong> 
        Pricing custom: +30% por cada caso de uso adicional.
      </p>
    </div>
  </div>
</section>
```

---

### Ajuste 3: Refinar LandingEducacion.tsx

#### Cambios en Pricing Mention

**Agregar clarificación:**
```tsx
<section className="py-16 bg-gray-50">
  <div className="max-w-4xl mx-auto px-6 text-center">
    <h2 className="text-3xl font-poppins font-bold mb-4">
      Pricing para instituciones educativas
    </h2>
    
    <p className="text-lg font-inter mb-8">
      Planes desde 10,000 mensajes/mes con integración Q10 incluida en Pro y Enterprise
    </p>
    
    <div className="inline-block p-4 bg-blue-50 rounded-lg border border-blue-200">
      <p className="text-sm font-inter">
        <strong>📌 Caso de uso único:</strong> Los planes estándar incluyen 1 caso de uso (Educación/Admisiones). 
        Para agregar Soporte o Marketing, consulta pricing custom.
      </p>
    </div>
  </div>
</section>
```

---

### Ajuste 4: Refinar LandingOtrasIndustrias.tsx

#### Cambios en Hero Section

**Actual:**
```tsx
<h1>Piloto a resultados: Paga solo si funciona</h1>
<p>¿Tu industria no está en nuestra lista? Creamos un piloto personalizado y solo cobras si alcanzas tus KPIs.</p>
```

**Propuesto:**
```tsx
<h1>Piloto a resultados: Paga solo si funciona</h1>
<p>¿Tu industria no está en nuestra lista? Piloto de 60 días con 2 opciones de pricing y conversión a suscripción si cumples KPIs.</p>
```

#### Nueva Sección: Opciones de Pricing del Piloto

```tsx
<section className="py-20 bg-white">
  <div className="max-w-6xl mx-auto px-6">
    <h2 className="text-3xl font-poppins font-bold text-center mb-12">
      Elige tu modelo de piloto
    </h2>
    
    <div className="grid md:grid-cols-2 gap-8">
      {/* Opción 1: Pago Fijo Reducido */}
      <div className="pricing-card">
        <Badge color="blue">Pago Fijo Reducido</Badge>
        <div className="text-4xl font-mono font-bold mt-4 mb-2" style={{ color: '#08C4F4' }}>
          $2.000.000
        </div>
        <p className="text-sm font-inter mb-6">50% del costo real + garantía</p>
        
        <ul className="space-y-3 text-left">
          <li className="flex items-start gap-2">
            <span>✅</span>
            <span className="font-inter">Piloto de 60 días</span>
          </li>
          <li className="flex items-start gap-2">
            <span>✅</span>
            <span className="font-inter">10,000 mensajes incluidos</span>
          </li>
          <li className="flex items-start gap-2">
            <span>✅</span>
            <span className="font-inter"><strong>Reembolso 100%</strong> si no cumple KPIs</span>
          </li>
          <li className="flex items-start gap-2">
            <span>✅</span>
            <span className="font-inter">Discovery gratuito (2-3 horas)</span>
          </li>
        </ul>
      </div>
      
      {/* Opción 2: 100% Resultados */}
      <div className="pricing-card featured" style={{ borderColor: '#8336FF' }}>
        <Badge color="purple">100% Pago por Resultados</Badge>
        <div className="text-4xl font-mono font-bold mt-4 mb-2" style={{ color: '#8336FF' }}>
          $0
        </div>
        <p className="text-sm font-inter mb-6">Paga solo si cumple KPIs</p>
        
        <ul className="space-y-3 text-left">
          <li className="flex items-start gap-2">
            <span>✅</span>
            <span className="font-inter">Piloto de 60 días</span>
          </li>
          <li className="flex items-start gap-2">
            <span>✅</span>
            <span className="font-inter">Sin costo inicial</span>
          </li>
          <li className="flex items-start gap-2">
            <span>✅</span>
            <span className="font-inter"><strong>$4.000.000</strong> solo si cumple KPIs</span>
          </li>
          <li className="flex items-start gap-2">
            <span>✅</span>
            <span className="font-inter">Discovery gratuito (2-3 horas)</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</section>
```

#### Nueva Sección: Post-Piloto

```tsx
<section className="py-20 bg-gray-50">
  <div className="max-w-4xl mx-auto px-6">
    <h2 className="text-3xl font-poppins font-bold text-center mb-8">
      Después del piloto exitoso
    </h2>
    
    <p className="text-center font-inter mb-12">
      Si cumples tus KPIs, puedes elegir entre 3 modelos de suscripción:
    </p>
    
    <div className="space-y-6">
      <div className="model-card">
        <h3 className="font-poppins font-bold">1. Suscripción Estándar</h3>
        <p className="font-inter">Mensualidad fija según plan (Growth, Pro, Enterprise)</p>
        <p className="text-sm font-inter text-gray-600">Ideal para: Volumen predecible</p>
      </div>
      
      <div className="model-card">
        <h3 className="font-poppins font-bold">2. Modelo Híbrido</h3>
        <p className="font-inter">50% mensualidad + 10% de performance fee</p>
        <p className="text-sm font-inter text-gray-600">Ideal para: Compartir riesgo y upside</p>
      </div>
      
      <div className="model-card">
        <h3 className="font-poppins font-bold">3. Solo Resultados</h3>
        <p className="font-inter">$0 base + 20% de performance fee (mínimo $2M/mes)</p>
        <p className="text-sm font-inter text-gray-600">Ideal para: Máxima alineación de incentivos</p>
      </div>
    </div>
    
    <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
      <p className="text-sm font-inter">
        <strong>⚠️ Importante:</strong> Integraciones custom y configuraciones especiales se cobran aparte en todos los modelos.
      </p>
    </div>
  </div>
</section>
```

---

## 🔧 Componentes Nuevos Necesarios

### 1. PricingCard Component

```tsx
// components/shared/PricingCard.tsx
interface PricingCardProps {
  title: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  badge?: string;
  badgeColor?: 'blue' | 'green' | 'purple' | 'gray';
  featured?: boolean;
  ctaText?: string;
  ctaAction?: () => void;
}

export default function PricingCard({ ... }: PricingCardProps) {
  // Implementar card de pricing reutilizable
}
```

### 2. ComparisonTable Component

```tsx
// components/shared/ComparisonTable.tsx
interface ComparisonTableProps {
  columns: string[];
  rows: {
    feature: string;
    values: (string | boolean | JSX.Element)[];
  }[];
}

export default function ComparisonTable({ ... }: ComparisonTableProps) {
  // Implementar tabla de comparación reutilizable
}
```

### 3. FlowDiagram Component

```tsx
// components/shared/FlowDiagram.tsx
interface FlowStep {
  number: number;
  title: string;
  description: string;
  icon?: string;
}

interface FlowDiagramProps {
  steps: FlowStep[];
  orientation?: 'horizontal' | 'vertical';
}

export default function FlowDiagram({ ... }: FlowDiagramProps) {
  // Implementar diagrama de flujo reutilizable
}
```

---

## 📋 Checklist de Implementación

### Fase 1: Componentes Reutilizables (1-2 horas)
- [ ] Crear `PricingCard.tsx` con estilos de marca
- [ ] Crear `ComparisonTable.tsx` responsive
- [ ] Crear `FlowDiagram.tsx` con animaciones opcionales

### Fase 2: LandingEmprendedores (2-3 horas)
- [ ] Actualizar hero section con 2 opciones de planes
- [ ] Reemplazar pricing section con 2 cards (Gratuito + Lite)
- [ ] Agregar sección "Cómo funciona el Marketplace"
- [ ] Agregar tabla de comparación de planes
- [ ] Actualizar todos los textos según especificación
- [ ] Agregar clarificación sobre 420 mensajes = ≈60 conversaciones

### Fase 3: HomepageHub (1 hora)
- [ ] Actualizar badge de emprendedores ("Desde $0")
- [ ] Agregar sección de restricción de casos de uso
- [ ] Actualizar descripciones de segment cards

### Fase 4: LandingEducacion (1 hora)
- [ ] Agregar sección de pricing mention
- [ ] Clarificar restricción de 1 caso de uso
- [ ] Mencionar add-ons disponibles (Q10 integration)

### Fase 5: LandingOtrasIndustrias (2 horas)
- [ ] Actualizar hero con opciones de piloto
- [ ] Agregar sección de 2 modelos de pricing
- [ ] Agregar sección post-piloto con 3 opciones
- [ ] Clarificar que integraciones se cobran aparte
- [ ] Agregar ejemplos de KPIs por industria

### Fase 6: Testing y Refinamiento (1 hora)
- [ ] Verificar consistencia de mensajes
- [ ] Verificar responsive en mobile
- [ ] Verificar colores de marca aplicados
- [ ] Testing de navegación entre landings

---

## 🎨 Consideraciones de Diseño

### Colores por Tier
- **Tier Emprendedor (Gratuito)**: Verde (#10B981) para "Gratis"
- **Tier Emprendedor (Lite)**: Púrpura (#8336FF) para "Featured"
- **Tier Industria**: Azul (#08C4F4) para planes estándar
- **Tier Pilotos**: Púrpura (#8336FF) para "Resultados"

### Tipografía
- **Precios**: Roboto Mono Bold
- **Títulos de planes**: Poppins Bold
- **Descripciones**: Inter Regular
- **Features**: Inter Regular con checkmarks

### Badges
- "Gratis para siempre" → Verde
- "Pago único" → Púrpura
- "1 caso de uso incluido" → Azul
- "Paga por resultados" → Púrpura

---

## 📝 Mensajes Clave a Comunicar

### Tier Emprendedor
1. **Plan Gratuito = Marketplace compartido**, no línea propia
2. **Código de referencia** para marketing propio
3. **Privacidad protegida**: Número del cliente solo cuando aceptas lead
4. **Plan Lite = Pago único de $450K**, luego $0/mes perpetuo
5. **420 mensajes ≈ 60 conversaciones/mes**

### Tier Industria
1. **Solo 1 caso de uso** en planes estándar
2. **Múltiples casos = +30% por adicional**
3. **Add-ons disponibles** según industria
4. **Integraciones nativas** en Pro/Enterprise

### Tier Pilotos
1. **Discovery gratuito** (2-3 horas)
2. **2 opciones de piloto**: Fijo reducido o 100% resultados
3. **60 días de duración**
4. **3 modelos post-piloto**: Subscription, Hybrid, Results-only
5. **Integraciones se cobran aparte**

---

## 🚀 Próximos Pasos

1. **Revisar y aprobar** este plan de ajustes
2. **Priorizar** qué ajustes implementar primero
3. **Crear componentes** reutilizables (PricingCard, etc.)
4. **Implementar** cambios por landing
5. **Testing** exhaustivo de mensajes y navegación
6. **Deploy** a staging para revisión

---

**Tiempo estimado total:** 8-10 horas de desarrollo  
**Prioridad:** Alta - Alineación crítica con modelo de negocio  
**Impacto:** Claridad en propuesta de valor y conversión mejorada
