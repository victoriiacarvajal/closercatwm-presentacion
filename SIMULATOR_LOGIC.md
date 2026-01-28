# Lógica de Cálculo del Simulador CloserCat

Este documento detalla las reglas de negocio, constantes y fórmulas matemáticas utilizadas por el simulador para generar proyecciones de costos, ROI y crecimiento.

---

## 1. Mapeo de Variables de Entrada

### Paso 1: Estructura del Equipo
### Paso 1: Estructura del Equipo
### Paso 1: Estructura del Equipo
- `personalLinesCount`: Cantidad de líneas de WhatsApp personales (Vendedores).
- `institutionalLinesCount`: Cantidad de líneas de WhatsApp Business API (Empresa).
- `numberOfSalesReps`: Calculado como la suma de las líneas anteriores (estimación de volumen).
- `managementStrategy` (Descentralizada/Mixta/Institucional): **Define el modelo de costos.**
  - **Descentralizada**: Paralelo institucional. Costo mensual $0 + 1 Setup Institucional.
  - **Mixta**: Costo personal ($25k/línea) + 1 Setup Institucional.
  - **Institucional**: Costo Setup ($450k/línea).

### Paso 2: Integraciones y Servicios
- `integrationsNeeded`: Lista de integraciones (CRM, ERP, etc.) con sus respectivos costos mensuales y de setup.
- `needsCampaigns`, `campaignContacts`, `campaignsPerMonth`: Determinan el volumen de mensajes salientes (outbound).
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

### Costos de Líneas y Migración
- **Línea Personal (Protocolo Web)**: **$25.000** por línea / mes.
- **Línea Institucional (API)**: **$0** mensual (costo absorbido en consumo).
- **Setup Institucional**: **$450.000** por línea (Único pago).
- **Mensaje Histórico (Migración)**: **$50** por mensaje (Parsing + Embedding).

---

## 3. Fórmulas de Cálculo

### Volumen Total de Mensajes
`TotalMessages = ConversationsPerMonth * EstimatedAvgTurns`

### Desglose de Tráfico
1. `IA_Messages = TotalMessages * (Delegation% / 100)`
2. `Residual_Messages = TotalMessages - IA_Messages`

### Cálculo de Costo Operativo
1. `IA_Cost = (Text_Msgs * 180) + (Audio_Msgs * Adj_Audio_Cost) + (Image_Msgs * 247) + (Doc_Msgs * 180)`
2. `Residual_Cost = Residual_Messages * 3`
3. `Base_Cost = IA_Cost + Residual_Cost`
4. `Adjusted_Base_Cost = Base_Cost` (Sin multiplicadores de equipo).

### Costo de Líneas (Mensual vs Setup)
El costo depende de la Estrategia seleccionada:
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
`Total_Monthly_Cost = Adjusted_Base_Cost + Line_Monthly_Fees + Integration_Monthly_Fees + Service_Monthly_Fees`

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
