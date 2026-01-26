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

#### B) Factor Multiplicador por Tamaño de Equipo
Se aplica un multiplicador sobre el costo base según el número de comerciales:

| Rango de Comerciales | Multiplicador | Justificación |
| :--- | :--- | :--- |
| 1-5 comerciales | +0% | Sin recargo (operación pequeña) |
| 6-10 comerciales | +10% | Sincronización multi-número básica |
| 11-20 comerciales | +20% | Complejidad media de coordinación |
| 21-50 comerciales | +30% | Alta complejidad de gestión |
| 50+ comerciales | +50% | Enterprise, múltiples equipos/regiones |

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

| Servicio | Costo Mensual | Detalle |
| :--- | :--- | :--- |
| **Campañas Masivas** | $66/msg | Basado en volumen de contactos abordados |
| **Reportes Personalizados** | $200,000 | Dashboards custom + exportación |
| **Migración Asistida** | $800,000 | Pago único, incluye invitaciones automáticas |
| **Líneas Adicionales** | $100,000/línea | Por cada número WhatsApp extra |
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

- **Optimista (-20%):** Escenario ideal, bajo uso de multimedia, sin picos
- **Esperado:** Promedio ponderado = (Optimista + 4×Base + Pesimista) / 6
- **Pesimista (+30%):** Escenario conservador, alto uso multimedia, picos de demanda

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
1. Mensajes totales = 1,500 conv × 3 turnos = 4,500 msgs/mes
   - Texto (70%): 3,150 × $180 = $567,000
   - Audio (20%): 900 × $256 = $230,400
   - Imagen (10%): 450 × $247 = $111,150
   Costo Base = $908,550

2. Factor Equipo (5 comerciales): +0%
   Costo Ajustado = $908,550

3. Integraciones:
   - CRM Custom: $500,000/mes
   - Setup amortizado: $291,667/mes
   Total Integraciones = $791,667

4. Servicios a Demanda:
   - Campañas (500 × 1 × $66): $33,000
   - Reportes: $200,000
   Total Servicios = $233,000

TOTAL MENSUAL = $908,550 + $791,667 + $233,000 = $1,933,217

Proyección PERT:
- Optimista: $1,760,174
- Esperado: $2,200,217
- Pesimista: $2,860,282
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
1. Mensajes totales = 3,000 × 4 = 12,000 msgs/mes
   - Texto (80%): 9,600 × $180 = $1,728,000
   - Audio (15%): 1,800 × $256 = $460,800
   - Imagen (5%): 600 × $247 = $148,200
   Costo Base = $2,337,000

2. Factor Equipo (15 comerciales): +20%
   Costo Ajustado = $2,337,000 × 1.20 = $2,804,400

3. Integraciones:
   - CRM Custom: $0/mes (setup $3.5M amortizado = $291,666/mes)
   - Sistema Propio: $300,000/mes (setup $2M amortizado = $166,667/mes)
   Total Integraciones = $591,667

4. Servicios a Demanda:
   - Campañas (2,000 × 2 × $66): $264,000
   - Migración Asistida: $800,000 (pago único, amortizado = $66,667/mes)
   Total Servicios = $330,667

TOTAL MENSUAL = $2,804,400 + $591,667 + $330,667 = $3,726,734

Proyección PERT:
- Optimista: $3,010,187
- Esperado: $3,762,734
- Pesimista: $4,891,554
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
1. Mensajes totales = 8,000 × 5 = 40,000 msgs/mes
   - Texto (65%): 26,000 × $180 = $4,680,000
   - Audio (25%): 10,000 × $256 = $2,560,000
   - Imagen (10%): 4,000 × $247 = $988,000
   Costo Base = $8,228,000

2. Factor Equipo (30 comerciales): +30%
   Costo Ajustado = $8,228,000 × 1.30 = $10,696,400

3. Integraciones:
   - CRM Custom: $500,000/mes + setup $291,667/mes
   - ERP Custom: $800,000/mes + setup $291,667/mes
   Total Integraciones = $1,883,334

4. Servicios a Demanda:
   - Campañas (10,000 × 4 × $66): $2,640,000
   - Reportes: $200,000
   - 3 Líneas adicionales: 3 × $100,000 = $300,000
   Total Servicios = $3,140,000

TOTAL MENSUAL = $10,696,400 + $1,883,334 + $3,140,000 = $15,719,734

Proyección PERT:
- Optimista: $10,703,787
- Esperado: $13,379,734
- Pesimista: $17,393,654
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

4. **Knowledge Base Unificado:**
   - Incluido en todos los planes
   - Límite: 10,000 items (productos/FAQs)
   - Sin costo adicional

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