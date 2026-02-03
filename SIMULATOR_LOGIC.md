# Lógica de Cálculo del Simulador CloserCat

Este documento detalla las reglas de negocio, constantes y fórmulas matemáticas utilizadas por el simulador para generar proyecciones de costos, ROI y crecimiento.

---

## 1. Mapeo de Variables de Entrada

### Paso 1: Estructura del Equipo
### Paso 1: Estructura del Equipo
### Paso 1: Estructura del Equipo (Step 4 UI)
- `personalLinesCount`: Cantidad de líneas de WhatsApp personales (Vendedores).
- `institutionalLinesCount`: Cantidad de líneas de WhatsApp Business API (Empresa).
- `numberOfSalesReps`: Calculado como la suma de las líneas anteriores.
- `managementStrategy` (Descentralizada/Mixta/Institucional): Define costos de setup y mensualidad de líneas.

### Paso 2: Integraciones y Servicios (Step 5 UI)
- `integrationsNeeded`: Lista de integraciones (CRM, ERP, etc.) con sus respectivos costos mensuales y de setup.
- `needsCampaigns`: Habilita envío de campañas masivas.
  - `campaignContacts` * `campaignsPerMonth` = Volumen de Mensajes Outbound.
  - **Costo CloserCat**: $66/msg (Procesamiento).
  - **Costo Meta**: $60/msg (Pago directo a Meta - Marketing).
- `needsMigrationAssistance`: Habilita el cálculo de costo de migración de historial.
  - `linesToMigrate`: Cantidad de líneas a procesar.
  - `migrationContactsPerLine`: Promedio de contactos por línea.
  - `migrationAvgMsgsPerContact`: Volumen histórico promedio de mensajes por contacto.

### Paso 3: Volumen y Negocio
- `conversationsPerMonth`: Volumen total de chats entrantes al mes.
- `estimatedAvgTurns`: Cantidad de mensajes promedio por conversación (flujo actual).
- `iaDelegationPercentage` (% Delegación): Cuántos de esos mensajes resuelve la IA vs. cuántos quedan en custodia (humano).
- `conversionRate` (% Conversión Actual): Baseline de éxito de ventas actual.
- `avgTicket` (Ticket Promedio): Valor promedio en COP de cada venta.
- `monthlyGrowthRate` (% Crecimiento): Proyección de incremento mensual de volumen.

---

## 2. Constantes de Costos

### Costos de IA por Mensaje (COP)
- **Texto**: $180
- **Audio**: $256 (Base 60s, ajustado proporcionalmente al tiempo promedio).
- **Imagen**: $247
- **Documento**: $180
- **Residual (Tráfico Humano)**: $3 (Costo de custodia/sincronización).

### Servicios de Valor Agregado (Monthly)
- **Asesoría de Prompting**:
  - **Standard**: $0 (Incluido - Configuración base).
  - **Custom/Híbrida**: **$250.000** mes (Ajuste a medida, optimización mensual).
- **Intelligence Reports (Market Analysis)**: **$450.000** mes.
- **Capacidad KB (Base de Conocimiento)**:
  - **Base (0 - 500 items)**: **$0** (Incluido).
  - **Tramo 1 (501 - 2,000 items)**: **$40.000** por cada bloque de 500 items adicionales.
  - **Tramo 2 (> 2,000 items)**: **$120.000** por cada bloque de 1,000 items adicionales.

### Costos de Líneas y Migración
- **Línea Personal (Protocolo Web)**: **$25.000** por línea / mes.
- **Línea Institucional (API)**: **$0** mensual (costo absorbido en consumo).
- **Setup Institucional**: **$450.000** por línea (Único pago).
- **Mensaje Histórico (Migración)**: **$50** por mensaje (Parsing + Embedding).

---

## 3. Fórmulas de Cálculo

### Volumen y Distribución de Mensajes

El cálculo ya no aplica multimedia como un porcentaje del total de mensajes, sino como una **frecuencia de aparición por conversación**, lo que evita la sobreestimación masiva.

1. **Variables de Frecuencia (Paso 2):**
   - `Audio_Freq`, `Image_Freq`, `Doc_Freq` (Valores de 0 a 1, derivados de la entrada "0-10").

2. **Cálculo de Unidades por Conversación:**
   - `Multimedia_Units = Audio_Freq + Image_Freq + (Doc_Freq * Avg_Pages)`
   - `Text_Turns = max(0, EstimatedAvgTurns - Multimedia_Units)`

3. **Mensajes Totales Mensuales:**
   - `Text_Messages = ConversationsPerMonth * Text_Turns`
   - `Audio_Messages = ConversationsPerMonth * Audio_Freq`
   - `Image_Messages = ConversationsPerMonth * Image_Freq`
   - `Doc_Messages = ConversationsPerMonth * Doc_Freq * Avg_Pages`
   - `TotalMonthlyMessages = Text_Messages + Audio_Messages + Image_Messages + Doc_Messages`

### Desglose de Tráfico y Costos

1. **Mensajes Delegados a IA:**
   - `IA_Traffic_Messages = TotalMonthlyMessages * (iaDelegationPercentage / 100)`

2. **Cálculo de Costo Operativo (IA + Residual):**
   - `IA_Cost_Ratio = (iaDelegationPercentage / 100)`
   - `IA_Cost = (Text_Messages * IA_Cost_Ratio * 180) + 
              (Audio_Messages * IA_Cost_Ratio * Adj_Audio_Cost) + 
              (Image_Messages * IA_Cost_Ratio * 247) + 
              (Doc_Messages * IA_Cost_Ratio * 180)`
   - `Residual_Messages = TotalMonthlyMessages - IA_Traffic_Messages`
   - `Residual_Cost = Residual_Messages * 3`
   - `Base_Cost = IA_Cost + Residual_Cost`
   - `Adjusted_Base_Cost = Base_Cost`

### Costo de Servicios de Valor Agregado (KB, Prompting, Reports)
`Value_Added_Services = KB_Variable_Cost + Prompting_Cost + Market_Analysis_Cost`

### Costo de Líneas (Mensual vs Setup)
El costo depende de la Estrategia seleccionada:
- **Descentralizada**:
  - `Line_Monthly_Fee = 0` (WhatsApps personales del cliente).
  - `Line_Setup_Fee = 1 * 450,000` (Setup de 1 línea central para conectar IA).
- **Mixta**:
  - `Monthly_Line_Fee = PersonalLines * 25,000`
  - `Setup_Line_Fee = 1 * 450,000` (Setup de 1 línea central)
- **Institucional**:
  - `Monthly_Line_Fee = 0`
  - `Setup_Line_Fee = InstitutionalLines * 450,000`

### Costo de Migración (Setup)
Si se selecciona migración para líneas institucionales:
`Migration_Cost = LinesToMigrate * ContactsPerLine * MsgsPerContact * 50`

### Inversión Mensual Total
`Total_Monthly_Cost = Adjusted_Base_Cost + Line_Monthly_Fees + Value_Added_Services`

---

## 4. Análisis de Impacto y ROI

### Baseline (Status Quo)
- `Ingresos_Actuales = (ConversationsPerMonth * (Conversion_Rate / 100)) * Avg_Ticket`

### Escenarios de Mejora Relativa (CloserCat)
Se calculan 3 escenarios donde CloserCat optimiza la tasa de conversión actual:
- **Optimización (+10%)**: `Nueva_Tasa = Conversion_Rate * 1.1`
- **Recomendado (+20%)**: `Nueva_Tasa = Conversion_Rate * 1.2`
- **High Impact (+30%)**: `Nueva_Tasa = Conversion_Rate * 1.3`

### Utilidad Operativa Incremental
`Utilidad_Extra = (Nuevos_Ingresos - Ingresos_Actuales) - Total_Monthly_Cost`

### Proyección Anual (Interés Compuesto)
Calcula la suma de ingresos de 12 meses asumiendo que el volumen de conversaciones crece un `Growth_Rate%` cada mes, operando bajo el escenario de conversión "Recomendado (+20%)".
