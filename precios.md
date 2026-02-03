# DOCUMENTO INTEGRAL DE PRECIOS Y SERVICIOS CLOSERCAT 2025
[cite_start]**Versión Oficial (Noviembre 2025)** [cite: 3]
*Precios en COP. No incluyen costos de Meta/WhatsApp Business API.*

---

## 1. Planes de Suscripción (IA + Plataforma)
*Contrato anual. Mensajes acumulables mes a mes durante el año.*

| Plan | $/msg | Detalle Mensual | Beneficios Destacados | Soporte (SLA) |
| :--- | :--- | :--- | :--- | :--- |
| **Starter** | $161 | [cite_start]2.000 msgs ($322.000) [cite: 19] | Activación WA, Configuración inicial, Contact Enrichment y Knowledge Base. | Email (< 48h) |
| **Growth** | $144 | [cite_start]10.000 msgs ($1.449.000) [cite: 19] | +10% excedente sin costo, Guardrails con incident tracking. | Chat & Email (< 24h) |
| **Pro** | $136 | 25.000 msgs ($3.400.000) | +15% excedente sin costo, 5 campañas simultáneas (50k targets c/u). | Prioritario (< 12h) |
| **Enterprise** | $128 | 100.000 msgs ($12.800.000) | +20% excedente sin costo, SLA garantizado, 10% desc. en integraciones. | Dedicado 24/7 (< 1h) |

---

## 2. Precios On-Demand (Sin Contrato)
[cite_start]*Aplicable a retail y partners.* [cite: 4]

### 2.1. [cite_start]Paquetes de Mensajes (Retail) [cite: 11]
| Paquete | Mensajes | Expiración | Precio Final | $/msg |
| :--- | :--- | :--- | :--- | :--- |
| **Starter** | 1,000 | 90 días | $180.000 | $180 |
| **Growth** | 5,000 | 120 días | $810.000 | $162 |
| **Pro** | 10,000 | 180 días | $1.530.000 | $153 |
| **Enterprise** | 25,000 | 365 días | $3.600.000 | $144 |

### 2.2. [cite_start]Costos Unitarios por Tipo de Mensaje [cite: 7]
* [cite_start]**Texto IA:** $180 COP/msg [cite: 7]
* [cite_start]**Audio IA:** $256 COP/msg [cite: 7]
* [cite_start]**Imagen IA:** $247 COP/msg [cite: 7]
* [cite_start]**Campaña Mktg:** $66 COP/msg [cite: 7]
* [cite_start]**Recargo:** Si audio/imagen supera el 20% del tráfico → +$50-70/msg. [cite: 10]

---

## 3. Solo Plataforma (Licencia por Contactos)
*No incluye mensajes ni servicios de IA. Es decir, la empresa paga directamente al proveedor de IA por cada mensaje que envíe CloserCat*

* **Hasta 5.000 contactos activos:** ≈ $390.000 COP/mes. Incluye reglas, plantillas y campañas.
* **Hasta 20.000 contactos activos:** ≈ $780.000 COP/mes. Ideal para mid-market con varios vendedores.
* **Hasta 50.000 contactos activos:** ≈ $1.560.000 COP/mes. 5 campañas simultáneas, 50k targets por campaña.
* **+50.000 contactos (Enterprise):** Desde ≈ $3.120.000 COP/mes. Ajustado según países e integraciones.

---

## 4. Implementación y Servicios Adicionales
### Hitos de Implementación
1. **Setup Técnico:** Conexión API oficial, importación de historial y roles.
2. **Calibración IA:** Knowledge Base, Guardrails y personalización de tono.
3. **Go-Live:** Despliegue comercial y monitoreo de optimización.

### Tabla de Add-Ons
| Servicio | Precio (COP) | Detalle |
| :--- | :--- | :--- |
| **Activación número WA Business** | ≈ $450.000 | Pago único (configuración técnica). |
| **Línea Adicional WhatsApp** | ≈ $100.000 | Al mes por cada línea activa. |
| **Integraciones CRM/ERP a medida** | Desde ≈ $3.500.000 | Proyecto custom vía webhooks/n8n. |
| **Customización avanzada IA** | ≈ $1.200.000 | Diseño de prompts y pruebas guiadas. |
| **Onboarding Asistido** | ≈ $600.000 | Sesión de 2 horas con expertos. |
| **Consultoría Discovery & ROI** | ≈ $800.000 | Diagnóstico y caso de negocio (2-3h). |

---

## 5. Mayoreo y Capacidades Escalables
### [cite_start]Precios de Referencia (Contrato Anual) [cite: 50]
* [cite_start]**100K - 500K msgs/mes:** $136/msg. [cite: 50]
* [cite_start]**>500K msgs/mes:** $122/msg (piso absoluto). [cite: 48, 50]

### Límites del Sistema
* **Campañas:** 50,000 contactos por campaña (~4,800/hora).
* **Knowledge Base:** 10,000 items (productos/FAQs).
* **Webhooks:** 20 suscripciones con retry automático.
* **Storage:** 500MB media gallery.

---

## 6. Modelo de Precios: Operaciones Comerciales (Equipos de Ventas)
*Servicio especializado para empresas con equipos comerciales que usan WhatsApp para vender.*

### 6.1. Componentes del Cálculo de Cotización

La cotización para Operaciones Comerciales se calcula con **4 componentes principales:**

#### A) Costo Base de Mensajes
Se calcula usando los **costos unitarios** de la sección 2.2:
- Texto IA: $180/msg
- Audio IA: $256/msg
- Imagen IA: $247/msg
- Campaña: $66/msg

**Fórmula:**
```
Costo Base = (# mensajes texto × $180) + (# mensajes audio × $256) + 
             (# mensajes imagen × $247) + (# mensajes campaña × $66)
```

**Ejemplo:**
- 2,000 mensajes texto/mes = 2,000 × $180 = $360,000
- 300 mensajes audio/mes = 300 × $256 = $76,800
- 200 mensajes imagen/mes = 200 × $247 = $49,400
- **Total Costo Base:** $486,200/mes

#### B) Costos de Líneas y Sincronización
Ya no se aplica un multiplicador porcentual por el tamaño del equipo. En su lugar, se cobran cargos directos por conectividad:

- **Línea Personal (WA Web):** $25,000 COP/mes por cada línea vinculada.
- **Línea Institucional (API):** $450,000 COP (Setup único por línea). Sin cargo mensual por CloserCat.

**Estrategias de Gestión:**
1. **Descentralizada:** Solo se paga Setup de 1 línea institucional. WhatsApps personales no tienen costo de sincronización.
2. **Mixta:** Cargos por líneas personales ($25k/mes) + Setup institucional.
3. **Institucional:** Solo Setup por cada línea API habilitada.

**Fórmula:**
```
Costo Ajustado = Costo Base × (1 + Multiplicador)
```

**Ejemplo (10 comerciales):**
```
Costo Ajustado = $486,200 × 1.10 = $534,820
```

#### C) Costos de Integraciones
Según la tabla de Add-Ons (sección 4):

| Integración | Costo Mensual | Costo Único (Setup) |
| :--- | :--- | :--- |
| **CRM Custom (HubSpot, Salesforce, etc.)** | $500,000/mes | $3,500,000 (una vez) |
| **ERP Custom** | $800,000/mes | $3,500,000 (una vez) |
| **Sistema Propio (Webhooks)** | $300,000/mes | $2,000,000 (una vez) |

**Nota:** Los costos únicos se amortizan en 12 meses para la cotización mensual.

**Ejemplo (CRM Custom):**
```
Costo Mensual = $500,000
Amortización Setup = $3,500,000 / 12 = $291,667
Total Integración = $791,667/mes (primer año)
```

#### D) Servicios a Demanda
Costos mensuales recurrentes:

| Servicio | Costo | Detalle |
| :--- | :--- | :--- |
| **Campañas Masivas** | $66/msg | Basado en volumen de contactos abordados |
| **Intelligence Reports** | $450,000/mes | Análisis de Sentiment y tendencias de mercado |
| **Asesoría Prompting Custom** | $250,000/mes | Diseño de tono de voz y personalidad IA |
| **Capacidad KB Extra** | Ver abajo | Bloques adicionales de conocimiento |
| **Migración Histórica** | $50/msg | Procesamiento y vectorización de chats antiguos |
| **Líneas Adicionales** | $100,000/línea | Cargo por gestión de línea extra (Setup) |
| **Onboarding Asistido** | $600,000 | Pago único, sesión de 2 horas |

### 6.2. Fórmula Completa de Cotización

```
Cotización Mensual = 
  (Costo Base × Factor Equipo) + 
  Costos Integraciones + 
  Servicios a Demanda
```

### 6.3. Proyección PERT (3 Escenarios)

Para dar rango de inversión, aplicamos metodología PERT:

- **Optimista (-10%):** Escenario ideal, bajo uso de multimedia o alta eficiencia de IA.
- **Esperado:** 100% de la proyección calculada.
- **Pesimista (+10%):** Escenario conservador, alto uso multimedia o picos de tráfico.

### 6.4. Ejemplos Completos de Cotización

#### Ejemplo 1: Operación Pequeña (5 comerciales)
**Inputs:**
- 5 comerciales
- 1,500 conversaciones/mes
- 3 turnos promedio por conversación
- 20% audio, 10% imagen, 70% texto
- Integración: CRM Custom (HubSpot)
- Servicios: Campañas (500 contactos, 1 vez/mes) + Reportes

**Cálculo:**
```
1. Distribución de Mensajes (Frecuencia en 1,500 conversaciones):
   - Audios: 1,500 × 0.20 = 300 msgs × $256 = $76,800
   - Imágenes: 1,500 × 0.10 = 150 msgs × $247 = $37,050
   - Unidades Multimedia: 0.20 + 0.10 = 0.30 unidades/conv.
   - Turnos de Texto: 3.0 (Avg) - 0.30 = 2.70 turnos/conv.
   - Texto: 1,500 × 2.70 = 4,050 msgs × $180 = $729,000
   Costo Base IA = $842,850

2. Costo de Líneas (5 comerciales):
   - Estrategia Descentralizada: $0/mes
   Costo Ajustado = $842,850

3. Integraciones y Servicios:
   - CRM Custom (Amortizado): $791,667/mes
   - Campañas (500 × $66): $33,000
   - Intelligence Reports: $450,000/mes
   Total Otros = $1,274,667

TOTAL MENSUAL = $842,850 + $1,274,667 = $2,117,517

Proyección PERT (+/- 10%):
- Optimista: $1,905,765
- Esperado: $2,117,517
- Pesimista: $2,329,268
```

#### Ejemplo 2: Operación Mediana (15 comerciales)
**Inputs:**
- 15 comerciales
- 3,000 conversaciones/mes
- 4 turnos promedio
- 15% audio, 5% imagen, 80% texto
- Integración: CRM Custom + Sistema Propio
- Servicios: Campañas (2,000 contactos, 2 veces/mes) + Migración Asistida

**Cálculo:**
```
1. Distribución de Mensajes (Frecuencia en 3,000 conversaciones):
   - Audios: 3,000 × 0.15 = 450 msgs × $256 = $115,200
   - Imágenes: 3,000 × 0.05 = 150 msgs × $247 = $37,050
   - Unidades Multimedia: 0.15 + 0.05 = 0.20 unidades/conv.
   - Turnos de Texto: 4.0 - 0.20 = 3.80 turnos/conv.
   - Texto: 3,000 × 3.80 = 11,400 msgs × $180 = $2,052,000
   Costo Base IA = $2,204,250

2. Costo de Líneas (Estrategia Mixta - 15 comerciales):
   - Líneas Personales: 15 × $25,000 = $375,000/mes
   Costo Operativo = $2,579,250

3. Integraciones y Servicios:
   - CRM + Sistema Propio (Amortizado): $591,667
   - Campañas (4,000 × $66): $264,000
   - Asesoría Prompting: $250,000/mes
   Total Otros = $1,105,667

TOTAL MENSUAL = $2,579,250 + $1,105,667 = $3,684,917

Proyección PERT (+/- 10%):
- Optimista: $3,316,425
- Esperado: $3,684,917
- Pesimista: $4,053,408
```

#### Ejemplo 3: Operación Grande (30 comerciales)
**Inputs:**
- 30 comerciales
- 8,000 conversaciones/mes
- 5 turnos promedio
- 25% audio, 10% imagen, 65% texto
- Integración: CRM Custom + ERP Custom
- Servicios: Campañas (10,000 contactos, 4 veces/mes) + Reportes + 3 líneas adicionales

**Cálculo:**
```
1. Distribución de Mensajes (Frecuencia en 8,000 conversaciones):
   - Audios: 8,000 × 0.25 = 2,000 msgs × $256 = $512,000
   - Imágenes: 8,000 × 0.10 = 800 msgs × $247 = $197,600
   - Unidades Multimedia: 0.25 + 0.10 = 0.35 unidades/conv.
   - Turnos de Texto: 5.0 - 0.35 = 4.65 turnos/conv.
   - Texto: 8,000 × 4.65 = 37,200 msgs × $180 = $6,696,000
   Costo Base IA = $7,405,600

2. Costo de Líneas (Estrategia Institucional - 30 comerciales):
   - Líneas institucionales (Setup amortizado): (4 líneas * $450k) / 12 = $150,000/mes
   - 3 líneas adicionales (Fee mensual): 3 * $100,000 = $300,000
   Costo Operativo = $7,855,600

3. Integraciones y Servicios:
   - CRM + ERP (Amortizado): $1,883,334
   - Campañas (40,000 × $66): $2,640,000
   - Intelligence Reports: $450,000/mes
   Total Otros = $4,973,334

TOTAL MENSUAL = $7,855,600 + $4,973,334 = $12,828,934

Proyección PERT (+/- 10%):
- Optimista: $11,546,041
- Esperado: $12,828,934
- Pesimista: $14,111,827
```

### 6.5. Descuentos por Volumen

Para operaciones grandes (>25,000 msgs/mes), considerar aplicar precios de suscripción anual:

| Volumen Mensual | Precio/msg Sugerido | Plan Equivalente |
| :--- | :--- | :--- |
| 25,000 - 50,000 msgs | $136 | Pro |
| 50,000 - 100,000 msgs | $128 | Enterprise |
| 100,000 - 500,000 msgs | $136 | Mayoreo |
| >500,000 msgs | $122 | Piso absoluto |

**Ejemplo de descuento (Operación Grande):**
```
Costo Base Original = $8,228,000 (40,000 msgs a precio on-demand)
Costo Base con Descuento = 40,000 × $136 = $5,440,000
Ahorro = $2,788,000/mes (34% de descuento)
```

### 6.6. Consideraciones Especiales

1. **Recargo por Multimedia Excesivo:**
   - Si audio + imagen > 20% del tráfico → aplicar recargo de $50-70/msg adicional
   - Ejemplo: 35% multimedia → recargo de $60/msg en mensajes multimedia

2. **Migración Gradual:**
   - Costo de migración asistida ($800K) incluye:
     - Configuración de invitaciones automáticas
     - Plantillas personalizadas
     - Monitoreo de adopción (3 meses)
   - Se amortiza en 12 meses si es contrato anual

3. **Sincronización Multi-Número:**
   - Incluida en el factor multiplicador de equipo
   - No hay costo adicional por sincronizar números de comerciales
   - Límite: hasta 100 números por cuenta

4. **Knowledge Base Dinámico:**
   - **Incluido:** 500 items (productos/FAQs).
   - **Tramo 1 (501-2000):** $40,000 por cada bloque de 500 extra.
   - **Tramo 2 (>2000):** $120,000 por cada bloque de 1000 extra.

5. **Onboarding y Capacitación:**
   - Recomendado para equipos >10 comerciales
   - Costo: $600,000 pago único
   - Incluye: 2 horas de sesión + materiales + seguimiento 30 días

### 6.7. Modelo de Contrato Recomendado

Para Operaciones Comerciales, se recomienda:

**Opción A: Contrato Anual con Descuento**
- Precio/msg según volumen (tabla 6.5)
- Mensajes acumulables mes a mes
- 10% descuento en integraciones
- Soporte prioritario incluido

**Opción B: On-Demand Flexible**
- Precio/msg según tabla 2.2
- Sin compromiso de volumen
- Pago por consumo real
- Ideal para pilotos o estacionalidad

**Recomendación:** Opción A para equipos >10 comerciales con volumen predecible.

---

> **Nota:** Un mensaje se define como cada respuesta enviada. Las conversaciones abiertas dentro de la ventana de 24h permiten mensajes ilimitados de respuesta.