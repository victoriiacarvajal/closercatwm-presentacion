# Homepage Redesign Specification
## Basado en Framework de Anthony Pierri para Homepages B2B SaaS

**Fecha:** Enero 2026  
**Versión:** 1.0  
**Objetivo:** Rediseñar la homepage de CloserCat para soportar estrategia multi-tier y multi-segmento, eliminando los "4 bad habits" identificados por Anthony Pierri.

---

## 📋 Contexto y Problema Actual

### Estado Actual de `LandingApp.tsx`

**Problemas identificados según framework de Pierri:**

1. **Bad Habit #1: Hablando a Múltiples Audiencias Simultáneamente**
   - **Evidencia:** Hero mezcla "equipos de ventas y admisiones" sin priorización
   - **Evidencia:** Formulario ofrece 4 casos de uso (Ecommerce, B2B, Soporte, Educación) sin jerarquía
   - **Impacto:** Mensaje diluido que no resuena fuertemente con ningún segmento específico

2. **Bad Habit #2: Audiencia Demasiado Genérica**
   - **Evidencia:** No está claro si hablamos a Director de Admisiones, agente de ventas, o CEO
   - **Impacto:** Falta de especificidad reduce conversión porque nadie se siente directamente interpelado

3. **Bad Habit #3: Multi-Order Benefits Sin Contexto**
   - **Evidencia:** "Automatizan cientos de consultas" es vago
   - **Evidencia:** No queda claro QUÉ hace el producto específicamente
   - **Impacto:** Visitantes no entienden las capabilities concretas del producto

4. **Bad Habit #4: Vision Messaging (Menor)**
   - **Evidencia:** Frases como "potenciada por inteligencia artificial" son buzzwords sin contexto
   - **Impacto:** Menor, pero contribuye a falta de claridad

### Estrategia de Negocio Multi-Tier

CloserCat busca operar en 3 tiers simultáneos:

- **Tier 1 (Básico):** Emprendedores/microempresas - Self-service, PLG motion
- **Tier 2 (Industria-Específico):** Educación (con Q10), Ecommerce, B2B - Sales-led
- **Tier 3 (Pilotos):** Otras industrias - Venta a resultados, custom deals

**Desafío:** ¿Cómo crear una homepage que sirva a 3 tiers sin caer en los "bad habits"?

---

## 🎯 Solución Propuesta: Homepage "Hub" con Segmentación Inmediata

### Concepto Central

**En lugar de:** Una homepage que intenta hablar a todos simultáneamente  
**Implementar:** Una homepage "hub" que segmenta inmediatamente al visitante hacia su landing específica

### Por Qué Esta Solución

**Según el framework de Pierri:**

> "There's no such thing as 'writing a page for the enterprise.' In the same way you can't write a letter to your cousin, your grandma, your spouse, and your employer at the same time… you actually need to pick a primary audience."

**Nuestra adaptación:** No intentamos escribir para todos. Dejamos que el usuario se auto-segmente en los primeros 5 segundos.

**Ventajas:**
1. ✅ Evita hablar a múltiples audiencias simultáneamente (Bad Habit #1)
2. ✅ Cada segmento ve messaging ultra-específico en su landing
3. ✅ Permite pricing/CTA diferenciado por tier
4. ✅ Métricas claras de conversión por segmento
5. ✅ Escalable: agregar industria = agregar landing page

---

## 🏗️ Arquitectura de Información

### Estructura de Páginas

```
closercat.com/
├── index.html (Homepage Hub) ← NUEVO
├── emprendedores/ (Tier 1: Básico) ← NUEVO
├── educacion/ (Tier 2: Industria-específico) ← MIGRAR contenido actual aquí
├── ecommerce/ (Tier 2: Placeholder) ← NUEVO
├── b2b/ (Tier 2: Placeholder) ← NUEVO
├── soporte/ (Tier 2: Placeholder) ← NUEVO
├── otras-industrias/ (Tier 3: Pilotos) ← NUEVO
├── producto/ (Existente)
├── precios/ (Existente, pero ACTUALIZAR con 3 tiers)
└── demo/ (Existente, pero ACTUALIZAR con parámetro ?segment=)
```

### Flujo del Usuario

```
Usuario llega a closercat.com
    ↓
Ve selector de segmentos (6 opciones)
    ↓
Click en su segmento (ej: "Educación")
    ↓
Redirige a /educacion con messaging específico
    ↓
Lee problema, solución, caso de estudio
    ↓
Click "Agendar demo"
    ↓
Formulario pre-llenado con segment=educacion
    ↓
Conversión
```

---

## 📄 Especificación Detallada: Homepage Hub

### Archivo: `LandingApp.tsx` (Reemplazar contenido actual)

### Sección 1: Hero Hub

**Objetivo:** Segmentar al visitante en <5 segundos

**Wireframe:**
```
┌─────────────────────────────────────────────────────┐
│  Logo                                    [Producto] │
│                                          [Precios]  │
│                                          [Recursos] │
├─────────────────────────────────────────────────────┤
│                                                     │
│  🎯 WhatsApp profesional para tu negocio           │
│                                                     │
│  Elige tu perfil para ver cómo CloserCat           │
│  se adapta a tus necesidades:                       │
│                                                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐         │
│  │ 🚀       │  │ 🎓       │  │ 🛒       │         │
│  │Emprende- │  │Educación │  │Ecommerce │         │
│  │dores     │  │          │  │          │         │
│  │$49/mes   │  │Integra-  │  │Próxima-  │         │
│  │          │  │ción Q10  │  │mente     │         │
│  └──────────┘  └──────────┘  └──────────┘         │
│                                                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐         │
│  │ 🤝       │  │ 💬       │  │ 🏢       │         │
│  │B2B       │  │Soporte   │  │Otra      │         │
│  │          │  │          │  │Industria │         │
│  │Próxima-  │  │Próxima-  │  │Piloto a  │         │
│  │mente     │  │mente     │  │resultados│         │
│  └──────────┘  └──────────┘  └──────────┘         │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Código de Referencia:**

```tsx
<section className="hero-hub">
  <div className="max-w-4xl mx-auto text-center px-6 py-20">
    <h1 className="text-5xl font-extrabold mb-4">
      WhatsApp profesional para tu negocio
    </h1>
    <p className="text-xl text-gray-700 mb-12">
      Elige tu perfil para ver cómo CloserCat se adapta a tus necesidades:
    </p>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Tier 1: Básico */}
      <SegmentCard
        href="/emprendedores"
        icon="🚀"
        title="Emprendedor / Microempresa"
        description="1-5 personas, WhatsApp personal"
        badge="Desde $49/mes"
        badgeColor="blue"
      />

      {/* Tier 2: Educación (Featured) */}
      <SegmentCard
        href="/educacion"
        icon="🎓"
        title="Institución Educativa"
        description="Integración nativa con Q10 CRM"
        badge="Integración completa"
        badgeColor="green"
        featured={true}
      />

      {/* Tier 2: Ecommerce */}
      <SegmentCard
        href="/ecommerce"
        icon="🛒"
        title="Ecommerce"
        description="Catálogo de productos + pagos"
        badge="Próximamente"
        badgeColor="gray"
      />

      {/* Tier 2: B2B */}
      <SegmentCard
        href="/b2b"
        icon="🤝"
        title="B2B / Prospección"
        description="Calificación de leads"
        badge="Próximamente"
        badgeColor="gray"
      />

      {/* Tier 2: Soporte */}
      <SegmentCard
        href="/soporte"
        icon="💬"
        title="Soporte al Cliente"
        description="Tickets y FAQs automáticos"
        badge="Próximamente"
        badgeColor="gray"
      />

      {/* Tier 3: Pilotos */}
      <SegmentCard
        href="/otras-industrias"
        icon="🏢"
        title="Otra Industria"
        description="Piloto personalizado a resultados"
        badge="Paga por resultados"
        badgeColor="purple"
      />
    </div>
  </div>
</section>
```

**Componente `SegmentCard`:**

```tsx
interface SegmentCardProps {
  href: string;
  icon: string;
  title: string;
  description: string;
  badge: string;
  badgeColor: 'blue' | 'green' | 'gray' | 'purple';
  featured?: boolean;
}

function SegmentCard({ href, icon, title, description, badge, badgeColor, featured }: SegmentCardProps) {
  return (
    <a
      href={href}
      className={`
        block p-8 rounded-2xl border-2 transition-all hover:scale-105
        ${featured 
          ? 'border-blue-500 bg-blue-50 shadow-lg' 
          : 'border-gray-200 bg-white hover:border-gray-300'
        }
      `}
    >
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      <span className={`
        inline-block px-3 py-1 rounded-full text-xs font-semibold
        ${badgeColor === 'blue' ? 'bg-blue-100 text-blue-700' : ''}
        ${badgeColor === 'green' ? 'bg-green-100 text-green-700' : ''}
        ${badgeColor === 'gray' ? 'bg-gray-100 text-gray-600' : ''}
        ${badgeColor === 'purple' ? 'bg-purple-100 text-purple-700' : ''}
      `}>
        {badge}
      </span>
    </a>
  );
}
```

**Justificación (Framework de Pierri):**

> "The purpose of your homepage: Drive potential customers to take an action."

En este caso, la acción es **auto-segmentarse**. No intentamos vender en la homepage hub, solo dirigir al visitante a su landing específica donde SÍ aplicamos el framework completo (Hero → Problem → Solution → Value Props → CTA).

---

### Sección 2: "¿Por qué CloserCat?" (Breve)

**Objetivo:** Dar contexto mínimo antes de que el usuario elija segmento

**Contenido:**

```tsx
<section className="bg-white py-16">
  <div className="max-w-4xl mx-auto px-6 text-center">
    <h2 className="text-3xl font-bold mb-6">
      La plataforma de WhatsApp Business con IA más completa de LATAM
    </h2>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
      <div>
        <div className="text-4xl mb-3">🤖</div>
        <h3 className="font-semibold mb-2">IA que entiende tu negocio</h3>
        <p className="text-sm text-gray-600">
          GPT-4 + Knowledge Base personalizada para respuestas precisas
        </p>
      </div>
      
      <div>
        <div className="text-4xl mb-3">🔄</div>
        <h3 className="font-semibold mb-2">Integraciones nativas</h3>
        <p className="text-sm text-gray-600">
          Q10, HubSpot, Salesforce, o cualquier CRM vía webhooks
        </p>
      </div>
      
      <div>
        <div className="text-4xl mb-3">🛡️</div>
        <h3 className="font-semibold mb-2">Control humano total</h3>
        <p className="text-sm text-gray-600">
          Guardrails bloquean respuestas inapropiadas automáticamente
        </p>
      </div>
    </div>
  </div>
</section>
```

**Justificación:**

Esta sección es mínima y genérica a propósito. Solo busca dar credibilidad antes de la segmentación. El messaging específico está en cada landing.

---

### Sección 3: Social Proof Agregado

**Objetivo:** Credibilidad general antes de segmentar

```tsx
<section className="py-12 bg-gray-50">
  <div className="max-w-4xl mx-auto px-6 text-center">
    <p className="text-sm text-gray-600 mb-6">Empresas que confían en CloserCat</p>
    
    <div className="flex justify-center items-center gap-12 flex-wrap opacity-60">
      {/* Logos de clientes (si existen) */}
      <img src="/logos/cliente-1.png" alt="Cliente 1" className="h-8" />
      <img src="/logos/cliente-2.png" alt="Cliente 2" className="h-8" />
      <img src="/logos/cliente-3.png" alt="Cliente 3" className="h-8" />
    </div>
    
    <div className="grid grid-cols-3 gap-8 mt-12">
      <div>
        <div className="text-3xl font-bold text-gray-900">500K+</div>
        <div className="text-sm text-gray-600">Mensajes procesados</div>
      </div>
      <div>
        <div className="text-3xl font-bold text-gray-900">&lt;3 seg</div>
        <div className="text-sm text-gray-600">Tiempo de respuesta</div>
      </div>
      <div>
        <div className="text-3xl font-bold text-gray-900">78%</div>
        <div className="text-sm text-gray-600">Conversaciones automatizadas</div>
      </div>
    </div>
  </div>
</section>
```

---

## 📄 Especificación: Landing Page `/educacion`

### Objetivo

Aplicar el framework completo de Pierri para el segmento de Educación (Tier 2).

### Estructura (Basada en Framework de Pierri)

```
1. Hero (Positioning Statement)
2. Problem Section (Día en la vida del Director de Admisiones)
3. Solution Intro (Competitive positioning vs. WhatsApp manual + Q10 desconectado)
4. Value Propositions (4 capabilities con features + benefits)
5. Case Study (Institución con 5,000+ estudiantes)
6. How It Works (Flujo simplificado)
7. Integraciones (Q10 como hero)
8. Social Proof (Testimonios específicos de educación)
9. Risk Reversal (Garantías)
10. Form (Demo personalizada)
11. FAQs (Específicas de educación)
```

### Sección 1: Hero (Educación)

**Positioning Statement:**

> "Positioning = Product Differentiation + Customer Segmentation"

**Nuestra fórmula:**
- **Segmento:** Instituciones educativas en LATAM (específicamente Directores/Coordinadores de Admisiones)
- **Diferenciación:** Única integración nativa con Q10 CRM + IA entrenada en lenguaje educativo
- **Reference Point:** Competitive (vs. "WhatsApp manual + Q10 desconectado")

**Código:**

```tsx
<section className="hero-educacion">
  <div className="max-w-6xl mx-auto px-6 py-16">
    <div className="grid md:grid-cols-2 gap-12 items-center">
      <div>
        {/* Badge de segmento */}
        <div className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-semibold mb-4">
          🎓 Para Instituciones Educativas en LATAM
        </div>
        
        {/* H1: Positioning statement */}
        <h1 className="text-5xl font-extrabold leading-tight mb-4">
          Reemplaza el caos de WhatsApp manual con un sistema centralizado 
          que responde en &lt;3 segundos y sincroniza automáticamente con Q10
        </h1>
        
        {/* Subheading: 1st order benefit */}
        <p className="text-xl text-gray-700 mb-6">
          Tu equipo de admisiones deja de responder "¿Cuánto cuesta?" 
          todo el día. CloserCat maneja consultas repetitivas 24/7 
          mientras tu equipo cierra matrículas.
        </p>
        
        {/* Value props bullets (1st order benefits) */}
        <div className="space-y-3 mb-8">
          <div className="flex items-start gap-3">
            <div className="mt-1 h-2.5 w-2.5 rounded-full bg-blue-600" />
            <div>
              <strong>78% de consultas resueltas automáticamente</strong> 
              (precios, requisitos, horarios, becas)
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="mt-1 h-2.5 w-2.5 rounded-full bg-blue-600" />
            <div>
              <strong>Cada lead se crea automáticamente en Q10</strong> 
              con programa de interés, sede y conversación completa
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="mt-1 h-2.5 w-2.5 rounded-full bg-blue-600" />
            <div>
              <strong>Campañas masivas de matrícula</strong> 
              (hasta 10K mensajes/día cumpliendo límites de WhatsApp)
            </div>
          </div>
        </div>
        
        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={scrollToDemo}
            className="px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800"
          >
            Agendar demo personalizada
          </button>
          <button
            onClick={openVideo}
            className="px-6 py-3 border border-gray-300 bg-white rounded-xl font-semibold hover:bg-gray-50"
          >
            Ver video (1 min)
          </button>
        </div>
        
        <div className="mt-3 text-xs text-gray-600">
          15 minutos · Sin compromiso · Respuesta en 24 horas
        </div>
      </div>
      
      {/* Video/Screenshot */}
      <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <video
          className="w-full rounded-xl"
          src="/vista-global-closercat.mp4"
          controls
          preload="metadata"
        />
      </div>
    </div>
  </div>
</section>
```

**Justificación (Framework):**

> "The goal is to include as much basic information as possible—without being too hard to scan—that will answer all the key questions: i.e. what is the product, who is it for, what use case does it address, etc."

**Checklist del Hero:**
- ✅ **Quién:** Instituciones educativas en LATAM
- ✅ **Qué:** Sistema centralizado de WhatsApp con IA
- ✅ **Diferenciación:** Integración nativa Q10 + respuestas <3 seg
- ✅ **Use case:** Admisiones (consultas repetitivas + registro de leads)
- ✅ **Benefit:** Equipo se enfoca en cerrar, no en responder

---

### Sección 2: Problem Section (Educación)

**Objetivo:** Construir empatía mostrando el "día en la vida" del Director de Admisiones

**Por qué esta sección (Framework):**

> "It's here that you call out the problem your prospects are experiencing. The vast majority of early stage startups don't do this... because they haven't actually picked a target customer. This builds tremendous empathy and attracts your best fit customers while turning away bad fit leads."

**Código:**

```tsx
<section className="problem-section bg-white py-20">
  <div className="max-w-6xl mx-auto px-6">
    <div className="text-center mb-12">
      <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-3">
        El Problema
      </div>
      <h2 className="text-4xl font-extrabold">
        El caos que viven equipos de admisiones hoy
      </h2>
    </div>
    
    <div className="grid md:grid-cols-2 gap-8">
      {/* Escenario: Día típico */}
      <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8">
        <h3 className="text-xl font-bold mb-4">
          📱 Escenario típico: Temporada de matrículas
        </h3>
        <ul className="space-y-3 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-red-500 font-bold">❌</span>
            <span>
              <strong>500+ consultas diarias</strong> desperdigadas en 4-5 
              dispositivos diferentes (WhatsApp personal de cada asesor)
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-500 font-bold">❌</span>
            <span>
              <strong>Tiempo de respuesta: 4+ horas</strong> 
              (el lead ya le escribió a 3 instituciones más)
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-500 font-bold">❌</span>
            <span>
              <strong>Copiar/pegar manualmente</strong> cada lead a Q10 
              (con errores y campos incompletos)
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-500 font-bold">❌</span>
            <span>
              <strong>30-40% de leads perdidos</strong> por respuesta tardía 
              o falta de seguimiento
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-500 font-bold">❌</span>
            <span>
              <strong>Equipo quemado</strong> respondiendo "¿Cuánto cuesta el 
              programa de contabilidad?" 100 veces al día
            </span>
          </li>
        </ul>
      </div>
      
      {/* Impacto económico */}
      <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8">
        <h3 className="text-xl font-bold mb-4">
          💰 Costo real de este caos
        </h3>
        <div className="space-y-6">
          <div className="p-5 bg-white rounded-xl border border-red-100">
            <div className="text-3xl font-extrabold text-red-600 mb-2">
              $15K - $50K USD/mes
            </div>
            <div className="text-sm text-gray-700">
              En matrículas perdidas por respuesta tardía 
              (basado en ticket promedio de $500-1,000 USD por estudiante)
            </div>
          </div>
          
          <div className="p-5 bg-white rounded-xl border border-orange-100">
            <div className="text-3xl font-extrabold text-orange-600 mb-2">
              25-30 horas/semana
            </div>
            <div className="text-sm text-gray-700">
              En trabajo manual de copy/paste a Q10, búsqueda de conversaciones, 
              y coordinación entre asesores
            </div>
          </div>
          
          <div className="p-5 bg-white rounded-xl border border-blue-100">
            <div className="text-3xl font-extrabold text-blue-600 mb-2">
              78%
            </div>
            <div className="text-sm text-gray-700">
              De estudiantes elige la institución que <strong>responde primero</strong> 
              (estudio de comportamiento de leads educativos en LATAM)
            </div>
          </div>
        </div>
      </div>
    </div>
    
    {/* Quote de persona real */}
    <div className="mt-12 p-8 bg-gray-50 rounded-2xl border border-gray-200">
      <div className="flex items-start gap-4">
        <div className="text-4xl">😰</div>
        <div>
          <p className="text-lg italic text-gray-900 mb-3">
            "En temporada alta, perdemos el control. Los leads llegan por 
            Facebook, Instagram, Google... y todos terminan en WhatsApp. 
            Pero cada asesor tiene su propio número. No sabemos quién 
            respondió qué, ni si el lead ya está en Q10. Es un caos total."
          </p>
          <div className="text-sm font-semibold">
            — Director de Admisiones, Institución Educativa con 3,500+ estudiantes
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

**Justificación:**

Esta sección usa **contextual positioning** (el use case de "gestionar admisiones en temporada alta") para mostrar los pain points específicos. No hablamos de "empresas" genéricamente, sino del **día específico** de un Director de Admisiones.

---

### Sección 3: Solution Intro

**Objetivo:** Transición del problema a la solución

**Código:**

```tsx
<section className="solution-intro py-16">
  <div className="max-w-4xl mx-auto px-6 text-center">
    <h2 className="text-4xl font-extrabold mb-4">
      CloserCat: Tu equipo de admisiones con superpoderes
    </h2>
    <p className="text-xl text-gray-700 mb-8">
      Reemplaza WhatsApp manual con un sistema centralizado que combina:
    </p>
    
    <div className="grid md:grid-cols-3 gap-6 text-left">
      <div className="p-6 bg-white rounded-xl border border-gray-200">
        <div className="text-3xl mb-3">🤖</div>
        <h3 className="font-bold mb-2">IA que entiende educación</h3>
        <p className="text-sm text-gray-600">
          GPT-4 entrenado con tu Knowledge Base de programas, precios, 
          requisitos y becas
        </p>
      </div>
      
      <div className="p-6 bg-white rounded-xl border border-gray-200">
        <div className="text-3xl mb-3">🔄</div>
        <h3 className="font-bold mb-2">Integración nativa Q10</h3>
        <p className="text-sm text-gray-600">
          Única plataforma en LATAM con sincronización bidireccional 
          automática con Q10 CRM
        </p>
      </div>
      
      <div className="p-6 bg-white rounded-xl border border-gray-200">
        <div className="text-3xl mb-3">🛡️</div>
        <h3 className="font-bold mb-2">Control humano total</h3>
        <p className="text-sm text-gray-600">
          Guardrails bloquean respuestas inapropiadas. Tu equipo puede 
          tomar control en 1 click.
        </p>
      </div>
    </div>
  </div>
</section>
```

---

### Sección 4: Value Propositions (Educación)

**Objetivo:** Mostrar capabilities específicas con features + benefits

**Framework de Pierri:**

> "Value Propositions — the value you're proposing to the target customer that (ideally) they will pay you for."

**Elementos de un Value Prop:**
1. **Use Case:** Gestionar admisiones en temporada alta
2. **Current Tool:** WhatsApp manual + Q10 desconectado
3. **Problem:** Respuesta tardía, leads perdidos, trabajo manual
4. **Capability:** Lo que el usuario PUEDE HACER con CloserCat
5. **Feature:** La parte del producto que hace posible la capability
6. **Benefit:** El outcome de aplicar la capability al use case

**Código:**

```tsx
<section className="value-props bg-white py-20">
  <div className="max-w-6xl mx-auto px-6">
    <h2 className="text-4xl font-extrabold text-center mb-16">
      Cómo CloserCat transforma tu proceso de admisiones
    </h2>
    
    <div className="space-y-12">
      {/* Value Prop 1 */}
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold mb-3">
            Capability #1
          </div>
          <h3 className="text-2xl font-bold mb-4">
            🤖 Responde automáticamente con IA (GPT-4)
          </h3>
          
          <div className="space-y-4 text-sm">
            <div>
              <strong className="text-gray-900">Feature:</strong>
              <p className="text-gray-700 mt-1">
                IA consulta automáticamente tu Knowledge Base (programas académicos, 
                precios, requisitos de admisión, becas disponibles) para generar 
                respuestas precisas en lenguaje natural.
              </p>
            </div>
            
            <div>
              <strong className="text-gray-900">Capability:</strong>
              <p className="text-gray-700 mt-1">
                Puedes automatizar respuestas a consultas repetitivas 24/7 sin 
                intervención humana, manteniendo tono profesional y preciso.
              </p>
            </div>
            
            <div>
              <strong className="text-gray-900">Benefit:</strong>
              <p className="text-gray-700 mt-1">
                <strong>78% de consultas resueltas automáticamente</strong>, 
                liberando a tu equipo para enfocarse en cerrar matrículas de 
                leads calificados en lugar de responder "¿Cuánto cuesta?" 
                todo el día.
              </p>
            </div>
          </div>
        </div>
        
        <div className="rounded-xl border border-gray-200 overflow-hidden">
          <img 
            src="/screenshots/ai-response-educacion.png" 
            alt="IA respondiendo consulta educativa"
            className="w-full"
          />
        </div>
      </div>
      
      {/* Value Prop 2 */}
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="order-2 md:order-1 rounded-xl border border-gray-200 overflow-hidden">
          <img 
            src="/screenshots/q10-sync.png" 
            alt="Sincronización con Q10"
            className="w-full"
          />
        </div>
        
        <div className="order-1 md:order-2">
          <div className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold mb-3">
            Capability #2
          </div>
          <h3 className="text-2xl font-bold mb-4">
            🔄 Sincronización automática con Q10
          </h3>
          
          <div className="space-y-4 text-sm">
            <div>
              <strong className="text-gray-900">Feature:</strong>
              <p className="text-gray-700 mt-1">
                Integración bidireccional nativa con Q10 CRM que crea 
                automáticamente oportunidades con todos los campos mapeados 
                (programa de interés, sede, segmento, fuente).
              </p>
            </div>
            
            <div>
              <strong className="text-gray-900">Capability:</strong>
              <p className="text-gray-700 mt-1">
                Cada lead de WhatsApp se registra automáticamente en Q10 
                con conversación completa, sin copiar/pegar ni trabajo manual.
              </p>
            </div>
            
            <div>
              <strong className="text-gray-900">Benefit:</strong>
              <p className="text-gray-700 mt-1">
                <strong>100% de leads registrados sin errores</strong>. 
                Eliminas 25-30 horas/semana de trabajo manual y garantizas 
                que ningún lead se pierda en el proceso.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Value Prop 3 */}
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <div className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold mb-3">
            Capability #3
          </div>
          <h3 className="text-2xl font-bold mb-4">
            📢 Campañas masivas de matrícula
          </h3>
          
          <div className="space-y-4 text-sm">
            <div>
              <strong className="text-gray-900">Feature:</strong>
              <p className="text-gray-700 mt-1">
                Sistema de campañas con plantillas aprobadas por Meta, 
                segmentación avanzada y envío controlado (hasta 10K mensajes/día 
                cumpliendo límites de WhatsApp).
              </p>
            </div>
            
            <div>
              <strong className="text-gray-900">Capability:</strong>
              <p className="text-gray-700 mt-1">
                Puedes enviar recordatorios de matrícula, anuncios de nuevos 
                programas, o reactivación de leads fríos de forma masiva y 
                segmentada.
              </p>
            </div>
            
            <div>
              <strong className="text-gray-900">Benefit:</strong>
              <p className="text-gray-700 mt-1">
                <strong>Reactivación de 20-30% de leads fríos</strong> en 
                temporada baja, sin spam ni riesgo de bloqueo de tu número 
                de WhatsApp.
              </p>
            </div>
          </div>
        </div>
        
        <div className="rounded-xl border border-gray-200 overflow-hidden">
          <img 
            src="/screenshots/campaigns-educacion.png" 
            alt="Campaña de matrícula"
            className="w-full"
          />
        </div>
      </div>
      
      {/* Value Prop 4 */}
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="order-2 md:order-1 rounded-xl border border-gray-200 overflow-hidden">
          <img 
            src="/screenshots/guardrails.png" 
            alt="Sistema de guardrails"
            className="w-full"
          />
        </div>
        
        <div className="order-1 md:order-2">
          <div className="inline-block px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold mb-3">
            Capability #4
          </div>
          <h3 className="text-2xl font-bold mb-4">
            🛡️ Control humano total con Guardrails
          </h3>
          
          <div className="space-y-4 text-sm">
            <div>
              <strong className="text-gray-900">Feature:</strong>
              <p className="text-gray-700 mt-1">
                Sistema de seguridad automático que valida cada respuesta de IA 
                antes de enviarla, bloqueando promesas no autorizadas, 
                descuentos falsos, o revelación de identidad de IA.
              </p>
            </div>
            
            <div>
              <strong className="text-gray-900">Capability:</strong>
              <p className="text-gray-700 mt-1">
                Puedes confiar en que la IA nunca prometerá becas no autorizadas, 
                compartirá información sensible, o revelará ser un bot. Si detecta 
                riesgo, bloquea y escala a humanos.
              </p>
            </div>
            
            <div>
              <strong className="text-gray-900">Benefit:</strong>
              <p className="text-gray-700 mt-1">
                <strong>Cero incidentes de promesas falsas</strong>. Mantienes 
                control total sobre qué puede y no puede prometer la IA, 
                protegiendo la reputación de tu institución.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

**Justificación:**

Cada value prop sigue la estructura **Feature → Capability → Benefit** del framework. No hablamos de "aumentar revenue" (multi-order benefit), sino de benefits de 1er orden específicos y medibles.

---

### Sección 5: Case Study (Mantener pero mejorar)

**Cambio crítico:** Reemplazar "Contacto (placeholder)" con información real o anónima específica.

```tsx
// ANTES (destruye credibilidad)
<div className="text-sm font-semibold text-gray-900">Contacto (placeholder)</div>

// DESPUÉS (opción 1: real)
<div className="text-sm font-semibold text-gray-900">María González</div>
<div className="text-sm text-gray-600">Directora de Admisiones · Universidad XYZ</div>

// DESPUÉS (opción 2: anónima pero específica)
<div className="text-sm font-semibold text-gray-900">Director de Admisiones</div>
<div className="text-sm text-gray-600">Institución Educativa con 5,000+ estudiantes · Colombia</div>
```

---

## 📄 Especificación: Landing Page `/emprendedores` (Tier 1)

### Positioning

- **Segmento:** Emprendedores y microempresas (1-5 personas)
- **Diferenciación:** Precio accesible + self-service
- **Reference Point:** Contextual (vs. "WhatsApp personal mezclado con trabajo")

### Hero

```tsx
<h1>Separa tu WhatsApp personal del de tu negocio</h1>
<p>
  Sin contratar equipo ni pagar miles de dólares. 
  CloserCat te da un número profesional con IA que responde 24/7.
</p>

// Value props
- ✅ Número WhatsApp Business separado
- ✅ IA responde consultas básicas (precios, horarios, disponibilidad)
- ✅ Inbox organizado por conversación
- ✅ Plantillas de respuesta rápida

// CTA
<button>Empieza gratis por 14 días</button> → Self-service signup
```

### Problem Section

```
"Hoy mezclas clientes con familia en el mismo WhatsApp. 
Pierdes mensajes importantes, respondes tarde porque estás ocupado, 
y no tienes historial organizado de qué prometiste a cada cliente."
```

### Pricing

```
$49/mes
- 500 conversaciones/mes
- 1 número WhatsApp Business
- IA básica (sin Knowledge Base avanzada)
- Plantillas de respuesta
- Soporte por email
```

### CTA

**Self-service:** Botón "Empezar gratis" que lleva a signup directo (no demo).

---

## 📄 Especificación: Landing Page `/otras-industrias` (Tier 3)

### Positioning

- **Segmento:** Empresas de industrias sin integración específica
- **Diferenciación:** Piloto a resultados (paga solo si funciona)
- **Reference Point:** Contextual (vs. "Proceso manual actual")

### Hero

```tsx
<h1>Piloto a resultados: Paga solo si funciona</h1>
<p>
  ¿Tu industria no está en nuestra lista? Creamos un piloto personalizado 
  y solo cobras si alcanzas tus KPIs.
</p>
```

### How It Works

```
1. Llamada de discovery (30 min)
   Entendemos tu proceso actual y pain points

2. Propuesta de KPIs
   Definimos métricas de éxito juntos
   Ejemplos: Reducir tiempo de respuesta 70%, aumentar conversión 30%

3. Piloto de 60 días
   Implementamos y medimos contra KPIs

4. Pago por resultados
   Solo pagas si cumplimos los KPIs acordados
```

### Industries Piloteadas

```
🏥 Salud (agendamiento de citas, recordatorios)
🏠 Real Estate (calificación de leads, tours virtuales)
💼 Consultoría (coordinación de propuestas, seguimiento)
🚗 Automotriz (cotizaciones, agendamiento de test drive)
```

### Form

```tsx
<form>
  <input name="industria" placeholder="¿En qué industria operas?" />
  <input name="volumen" placeholder="Volumen mensual de consultas estimado" />
  <textarea name="proceso_actual" placeholder="Describe tu proceso actual de atención" />
  <input name="kpi_objetivo" placeholder="¿Qué KPI quieres mejorar?" />
  
  <button>Aplicar al programa de pilotos</button>
</form>
```

---

## 🧭 Navegación Global

### Header

```tsx
<nav>
  <Logo href="/" />
  
  {/* Dropdown: Soluciones */}
  <Dropdown label="Soluciones">
    <DropdownSection title="Por Industria">
      <Link href="/educacion">🎓 Educación</Link>
      <Link href="/ecommerce">🛒 Ecommerce <Badge>Próximamente</Badge></Link>
      <Link href="/b2b">🤝 B2B</Link>
      <Link href="/soporte">💬 Soporte</Link>
    </DropdownSection>
    
    <DropdownDivider />
    
    <DropdownSection title="Por Tamaño">
      <Link href="/emprendedores">🚀 Emprendedores</Link>
      <Link href="/empresas">🏢 Empresas</Link>
    </DropdownSection>
    
    <DropdownDivider />
    
    <Link href="/otras-industrias">💡 Piloto Personalizado</Link>
  </Dropdown>

  <Link href="/producto">Producto</Link>
  <Link href="/precios">Precios</Link>
  <Link href="/recursos">Recursos</Link>
  
  <Button href="/demo">Agendar Demo</Button>
</nav>
```

---

## 📊 Página de Pricing (Actualizar)

### Estructura de 3 Tiers

```tsx
<section id="pricing">
  <h1>Pricing adaptado a tu etapa</h1>
  <p>Desde emprendedores hasta empresas, tenemos un plan para ti</p>
  
  <div className="pricing-grid">
    {/* Tier 1 */}
    <PricingCard
      tier="Starter"
      price="$49/mes"
      audience="Emprendedores y microempresas"
      features={[
        "1 número WhatsApp Business",
        "500 conversaciones/mes",
        "IA básica (sin Knowledge Base)",
        "Plantillas de respuesta",
        "Soporte por email"
      ]}
      cta="Empezar gratis"
      ctaLink="/signup"
      ctaType="self-service"
    />
    
    {/* Tier 2 */}
    <PricingCard
      tier="Educación"
      price="Desde $299/mes"
      audience="Instituciones educativas"
      featured={true}
      features={[
        "Todo en Starter +",
        "Integración nativa Q10 CRM",
        "Knowledge Base ilimitada",
        "Campañas masivas (10K/día)",
        "Analytics avanzado",
        "Onboarding + soporte prioritario"
      ]}
      cta="Agendar demo"
      ctaLink="/demo?segment=educacion"
      ctaType="sales-led"
    />
    
    {/* Tier 3 */}
    <PricingCard
      tier="Enterprise / Piloto"
      price="Custom"
      audience="Otras industrias"
      features={[
        "Todo en Educación +",
        "Integraciones personalizadas",
        "SLA garantizado",
        "Pricing a resultados disponible",
        "Dedicated success manager",
        "Soporte 24/7"
      ]}
      cta="Hablar con ventas"
      ctaLink="/contacto?tier=enterprise"
      ctaType="sales-led"
    />
  </div>
  
  {/* Comparación detallada */}
  <div className="comparison-table mt-16">
    <h2>Comparación detallada</h2>
    <table>
      <thead>
        <tr>
          <th>Feature</th>
          <th>Starter</th>
          <th>Educación</th>
          <th>Enterprise</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Conversaciones/mes</td>
          <td>500</td>
          <td>Ilimitadas</td>
          <td>Ilimitadas</td>
        </tr>
        <tr>
          <td>Integración CRM</td>
          <td>Webhooks básicos</td>
          <td>Q10 nativo</td>
          <td>Custom</td>
        </tr>
        <tr>
          <td>Knowledge Base</td>
          <td>❌</td>
          <td>✅ Ilimitada</td>
          <td>✅ Ilimitada</td>
        </tr>
        <tr>
          <td>Campañas masivas</td>
          <td>❌</td>
          <td>✅ 10K/día</td>
          <td>✅ Custom</td>
        </tr>
        <tr>
          <td>Soporte</td>
          <td>Email</td>
          <td>Prioritario</td>
          <td>24/7 + CSM</td>
        </tr>
      </tbody>
    </table>
  </div>
</section>
```

---

## 🎯 Tracking y Analytics

### UTM Parameters por Segmento

```tsx
// Cuando usuario hace click en segmento, agregar UTM
<a href="/educacion?utm_source=homepage&utm_medium=segment_selector&utm_campaign=educacion">
  🎓 Educación
</a>

// En formulario de demo, capturar segment
<input type="hidden" name="segment" value={getSegmentFromURL()} />
```

### Eventos de Clarity/GA4

```tsx
// Homepage hub
clarityEvent('homepage_hub_view');

// Click en segmento
clarityEvent('segment_click_educacion');
clarityEvent('segment_click_emprendedores');
clarityEvent('segment_click_otras_industrias');

// Landing específica
clarityEvent('landing_educacion_view');
clarityEvent('landing_emprendedores_view');

// CTA por tier
clarityEvent('cta_demo_educacion'); // Sales-led
clarityEvent('cta_signup_emprendedores'); // Self-service
clarityEvent('cta_piloto_otras_industrias'); // Custom
```

---

## ✅ Checklist de Implementación

### Fase 1: Homepage Hub (Semana 1)

- [ ] Crear nuevo `LandingApp.tsx` con estructura de hub
- [ ] Implementar componente `SegmentCard`
- [ ] Agregar sección "¿Por qué CloserCat?" (breve)
- [ ] Agregar social proof agregado
- [ ] Configurar tracking de clicks por segmento
- [ ] Testing responsive (mobile/tablet/desktop)

### Fase 2: Landing `/educacion` (Semana 1-2)

- [ ] Migrar contenido actual a `/educacion`
- [ ] Reescribir Hero según framework (positioning statement)
- [ ] Crear Problem Section específica de admisiones
- [ ] Implementar 4 Value Props con estructura Feature→Capability→Benefit
- [ ] Conseguir testimonio real o mejorar placeholder
- [ ] Agregar screenshots reales del producto
- [ ] Configurar formulario con `?segment=educacion`

### Fase 3: Landing `/emprendedores` (Semana 2)

- [ ] Crear estructura de landing
- [ ] Hero con positioning contextual (vs. WhatsApp personal)
- [ ] Problem section específica de emprendedores
- [ ] Value props simplificadas (sin integraciones complejas)
- [ ] CTA self-service "Empezar gratis"
- [ ] Implementar flujo de signup (si no existe)

### Fase 4: Landing `/otras-industrias` (Semana 3)

- [ ] Crear estructura de landing
- [ ] Hero con propuesta de piloto a resultados
- [ ] Sección "How It Works" (4 pasos)
- [ ] Ejemplos de industrias piloteadas
- [ ] Formulario extendido (industria, KPI objetivo, proceso actual)
- [ ] Configurar notificación a sales cuando llega aplicación

### Fase 5: Navegación y Pricing (Semana 3-4)

- [ ] Actualizar header con dropdown "Soluciones"
- [ ] Crear página `/precios` con 3 tiers
- [ ] Tabla de comparación detallada
- [ ] Links cruzados entre páginas
- [ ] Testing de flujos completos

### Fase 6: Placeholders Futuros (Semana 4)

- [ ] Crear placeholders para `/ecommerce`, `/b2b`, `/soporte`
- [ ] Formulario de "Notifícame cuando esté disponible"
- [ ] Documentar estructura para futuras landings

---

## 📐 Principios de Diseño (Mantener Consistencia)

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

```tsx
// Badge de segmento
<Badge color="blue">Para Instituciones Educativas</Badge>

// Card de value prop
<ValuePropCard
  icon="🤖"
  title="IA que entiende tu negocio"
  feature="..."
  capability="..."
  benefit="..."
  screenshot="/path/to/image.png"
/>

// CTA Button
<CTAButton variant="primary">Agendar demo</CTAButton>
<CTAButton variant="secondary">Ver video</CTAButton>
```

---

## 🚨 Errores Críticos a Evitar

### ❌ NO HACER

1. **NO mezclar audiencias en una misma landing**
   - Ejemplo: No poner "Para educación, ecommerce y B2B" en el mismo hero

2. **NO usar multi-order benefits sin contexto**
   - ❌ "Aumenta tus ingresos"
   - ✅ "78% de consultas resueltas automáticamente, liberando a tu equipo para cerrar matrículas"

3. **NO usar placeholders en testimonios**
   - ❌ "Contacto (placeholder)"
   - ✅ Nombre real + cargo + empresa O anónimo específico

4. **NO hablar de "empresas" genéricamente**
   - ❌ "Para empresas que quieren automatizar"
   - ✅ "Para instituciones educativas que gestionan 500+ consultas en temporada de matrículas"

5. **NO mezclar CTAs de diferentes tiers**
   - Tier 1 → "Empezar gratis" (self-service)
   - Tier 2 → "Agendar demo" (sales-led)
   - Tier 3 → "Aplicar al programa" (custom)

### ✅ SÍ HACER

1. **SÍ usar positioning statement claro en cada hero**
   - Formato: "Para [SEGMENTO], reemplaza [TOOL ACTUAL] con [DIFERENCIACIÓN]"

2. **SÍ mostrar capabilities específicas**
   - No "automatización", sino "IA responde consultas de precios usando tu Knowledge Base"

3. **SÍ usar social proof específico por segmento**
   - En `/educacion`: Testimonios de Directores de Admisiones
   - En `/emprendedores`: Testimonios de dueños de microempresas

4. **SÍ medir conversión por segmento**
   - Tracking separado para cada landing
   - A/B testing de messaging por segmento

---

## 📚 Referencias del Framework

### Fuente Principal

**"The Ultimate Guide to Homepages"** - Anthony Pierri (Fletch PMM)

### Conceptos Clave Aplicados

1. **Positioning = Differentiation + Segmentation**
   - Aplicado en cada landing con segmento específico + diferenciación clara

2. **Competitive vs. Contextual Positioning**
   - Educación: Competitive (vs. WhatsApp manual + Q10 desconectado)
   - Emprendedores: Contextual (vs. WhatsApp personal mezclado)
   - Pilotos: Contextual (vs. Proceso manual actual)

3. **Value Prop Canvas: Feature → Capability → Benefit**
   - Aplicado en sección de Value Props de cada landing

4. **Homepage Structure**
   - Hero → Problem → Solution → Value Props → Case Study → CTA
   - Aplicado en `/educacion` y `/emprendedores`

5. **Avoiding Bad Habits**
   - ✅ No hablamos a múltiples audiencias (hub segmenta)
   - ✅ No elegimos audiencia demasiado senior (Directores, no CEOs)
   - ✅ No usamos multi-order benefits sin contexto
   - ✅ No usamos vision messaging

---

## 🎯 Métricas de Éxito

### KPIs por Landing

**Homepage Hub:**
- % de visitantes que hacen click en algún segmento
- Distribución de clicks por segmento
- Bounce rate

**Landing `/educacion`:**
- Conversión a demo agendada
- Tiempo en página
- Scroll depth (¿llegan a value props?)

**Landing `/emprendedores`:**
- Conversión a signup (self-service)
- Activación en primeros 7 días

**Landing `/otras-industrias`:**
- Aplicaciones al programa de pilotos
- Calidad de aplicaciones (¿completan todos los campos?)

### Objetivo de Conversión

- **Tier 1 (Emprendedores):** 5-10% signup rate
- **Tier 2 (Educación):** 2-5% demo booking rate
- **Tier 3 (Pilotos):** 1-3% application rate

---

## 📞 Próximos Pasos

1. **Revisar y aprobar esta especificación**
2. **Priorizar qué landing implementar primero** (recomendación: Hub + Educación)
3. **Conseguir assets faltantes:**
   - Screenshots reales del producto
   - Testimonios reales (o mejorar placeholders)
   - Logos de clientes (si existen)
4. **Implementar Fase 1 (Homepage Hub)**
5. **A/B testing:** Hub vs. landing actual para medir impacto
6. **Iterar basado en métricas**

---

**Documento creado:** Enero 2026  
**Autor:** Equipo CloserCat  
**Framework base:** Anthony Pierri - The Ultimate Guide to Homepages  
**Versión:** 1.0
