# Especificación de Implementación: Sistema de Pricing Multi-Tier CloserCat

**Fecha:** Enero 2026  
**Versión:** 1.0  
**Objetivo:** Implementar sistema de pricing de 3 tiers con lógica de marketplace, mensajería y casos de uso.

---

## 📋 Contexto General

CloserCat opera con 3 tiers de pricing:

1. **Tier Emprendedor:** 2 planes (Gratuito + Lite)
2. **Tier Industria:** Planes de suscripción por volumen (Growth, Pro, Enterprise)
3. **Tier Pilotos:** Pricing a resultados con conversión a suscripción

Este documento especifica la lógica de implementación para cada tier, con énfasis en el modelo de marketplace del tier gratuito.

---

## 🎯 TIER 1: EMPRENDEDOR

### Plan 1: Gratuito "Red CloserCat" 🆓

#### Concepto Central

**Modelo de Marketplace/Networking:** CloserCat actúa como intermediario con un número único compartido.

**Flujo de Usuario:**

```
┌─────────────────────────────────────────────────────────────┐
│ Cliente Potencial                                           │
│ "Busco servicio de plomería en Bogotá"                     │
└─────────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────────┐
│ Envía mensaje a: +57 XXX XXX XXXX (Número de CloserCat)   │
└─────────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────────┐
│ IA de CloserCat:                                            │
│ 1. Analiza la consulta                                      │
│ 2. Busca en directorio de emprendedores registrados        │
│ 3. Identifica "Plomería Pérez" (tiene KB configurada)      │
│ 4. Responde usando KB de "Plomería Pérez"                  │
│    "Hola! Plomería Pérez ofrece..."                        │
└─────────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────────┐
│ Si cliente muestra interés real:                            │
│ IA: "¿Quieres que te contacte el dueño directamente?"      │
│ Cliente: "Sí"                                               │
└─────────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────────┐
│ Sistema notifica a "Plomería Pérez" vía WhatsApp personal: │
│                                                              │
│ "🔔 Nuevo lead calificado:                                  │
│  Nombre: Juan Cliente                                       │
│  Teléfono: +57 300 123 4567                                │
│  Interés: Reparación de tubería                            │
│  Contexto: [Resumen de conversación]                       │
│                                                              │
│  Contáctalo en las próximas 2 horas para cerrar."          │
└─────────────────────────────────────────────────────────────┘
```

**Flujo Alternativo: Código de Referencia**

```
Cliente potencial envía: "Hola, vengo de parte de PLOMERIA123"
                        ↓
IA detecta código → Enruta directamente a "Plomería Pérez"
                        ↓
Conversación se comporta como si fuera la cuenta propia del emprendedor
                        ↓
IA responde usando KB de "Plomería Pérez" exclusivamente
```

#### Especificaciones Técnicas

**Base de Datos: Tabla `marketplace_profiles`**

```sql
CREATE TABLE marketplace_profiles (
  id UUID PRIMARY KEY,
  business_name VARCHAR(255) NOT NULL,
  owner_whatsapp VARCHAR(20) NOT NULL, -- WhatsApp personal del dueño
  referral_code VARCHAR(50) UNIQUE, -- Ej: "PLOMERIA123"
  category VARCHAR(100), -- Ej: "Plomería", "Belleza", "Consultoría"
  location JSONB, -- {"city": "Bogotá", "zone": "Norte"}
  knowledge_base_id UUID REFERENCES knowledge_bases(id),
  monthly_messages_used INT DEFAULT 0,
  monthly_messages_limit INT DEFAULT 210,
  status VARCHAR(20) DEFAULT 'active', -- active, suspended, churned
  created_at TIMESTAMP DEFAULT NOW()
);
```

**Tabla `marketplace_conversations`**

```sql
CREATE TABLE marketplace_conversations (
  id UUID PRIMARY KEY,
  profile_id UUID REFERENCES marketplace_profiles(id),
  customer_phone VARCHAR(20) NOT NULL,
  customer_name VARCHAR(255),
  conversation_summary TEXT,
  messages_count INT DEFAULT 0,
  status VARCHAR(20), -- active, lead_qualified, closed
  lead_notified_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);
```

**Tabla `marketplace_messages`**

```sql
CREATE TABLE marketplace_messages (
  id UUID PRIMARY KEY,
  conversation_id UUID REFERENCES marketplace_conversations(id),
  profile_id UUID REFERENCES marketplace_profiles(id),
  message_type VARCHAR(20), -- inbound, outbound_ai, outbound_manual
  content TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Lógica de Negocio

**1. Registro de Emprendedor en Marketplace**

```python
def register_marketplace_profile(
    business_name: str,
    owner_whatsapp: str,
    category: str,
    location: dict,
    knowledge_base_data: dict
) -> MarketplaceProfile:
    """
    Registra un emprendedor en el marketplace.
    
    Args:
        business_name: Nombre del negocio
        owner_whatsapp: WhatsApp personal del dueño (para notificaciones)
        category: Categoría del negocio
        location: {"city": "Bogotá", "zone": "Norte"}
        knowledge_base_data: {
            "products": [...],
            "services": [...],
            "faqs": [...]
        }
    
    Returns:
        MarketplaceProfile con referral_code generado
    """
    # Generar código de referencia único
    referral_code = generate_referral_code(business_name)
    
    # Crear Knowledge Base
    kb = create_knowledge_base(knowledge_base_data)
    
    # Crear perfil
    profile = MarketplaceProfile.create(
        business_name=business_name,
        owner_whatsapp=owner_whatsapp,
        referral_code=referral_code,
        category=category,
        location=location,
        knowledge_base_id=kb.id,
        monthly_messages_limit=210
    )
    
    return profile
```

**2. Enrutamiento de Mensajes Entrantes**

```python
async def handle_marketplace_message(
    from_number: str,
    message_content: str,
    closercat_number: str = "+57XXXXXXXXX"
) -> dict:
    """
    Maneja mensaje entrante al número de CloserCat.
    
    Flujo:
    1. Detectar si hay código de referencia
    2. Si hay código → Enrutar a perfil específico
    3. Si no hay código → Buscar en directorio por categoría/ubicación
    4. Responder usando KB del perfil identificado
    """
    
    # Paso 1: Detectar código de referencia
    referral_code = extract_referral_code(message_content)
    
    if referral_code:
        # Enrutamiento directo
        profile = MarketplaceProfile.get_by_code(referral_code)
        if not profile:
            return {"error": "Código no válido"}
    else:
        # Búsqueda en directorio
        intent = analyze_intent(message_content)
        # intent = {"category": "plomería", "location": "Bogotá"}
        
        profile = find_best_match_profile(intent)
        if not profile:
            return {"message": "No encontramos negocios que coincidan. ¿Puedes ser más específico?"}
    
    # Paso 2: Verificar límite de mensajes
    if profile.monthly_messages_used >= profile.monthly_messages_limit:
        # Notificar al dueño que alcanzó límite
        notify_owner_limit_reached(profile)
        return {"message": "Este negocio alcanzó su límite mensual. Intenta el próximo mes."}
    
    # Paso 3: Obtener o crear conversación
    conversation = get_or_create_conversation(
        profile_id=profile.id,
        customer_phone=from_number
    )
    
    # Paso 4: Generar respuesta usando KB del perfil
    ai_response = await generate_ai_response(
        message=message_content,
        knowledge_base_id=profile.knowledge_base_id,
        conversation_history=conversation.get_history(),
        system_prompt=f"Eres el asistente de {profile.business_name}. Responde consultas usando la información del negocio."
    )
    
    # Paso 5: Guardar mensaje y actualizar contador
    save_message(conversation.id, profile.id, message_content, "inbound")
    save_message(conversation.id, profile.id, ai_response, "outbound_ai")
    profile.increment_messages_used()
    
    # Paso 6: Detectar si es lead calificado
    if is_lead_qualified(conversation):
        notify_owner_new_lead(profile, conversation, from_number)
        conversation.update_status("lead_qualified")
    
    return {
        "response": ai_response,
        "profile": profile.business_name
    }
```

**3. Detección de Lead Calificado**

```python
def is_lead_qualified(conversation: MarketplaceConversation) -> bool:
    """
    Determina si una conversación es un lead calificado.
    
    Criterios:
    - Cliente preguntó por precios
    - Cliente preguntó cómo contactar/comprar
    - Cliente dio su nombre/datos de contacto
    - Conversación tiene >3 mensajes
    """
    history = conversation.get_history()
    
    # Analizar con IA si hay intención de compra
    intent_analysis = analyze_purchase_intent(history)
    
    return (
        intent_analysis["purchase_intent_score"] > 0.7 and
        len(history) >= 3
    )
```

**4. Notificación al Dueño**

```python
def notify_owner_new_lead(
    profile: MarketplaceProfile,
    conversation: MarketplaceConversation,
    customer_phone: str
):
    """
    Notifica al dueño del negocio sobre un nuevo lead calificado.
    
    IMPORTANTE: No se comparte el número del cliente hasta que el dueño
    confirme que quiere contactarlo.
    """
    
    summary = generate_conversation_summary(conversation)
    
    message = f"""
🔔 **Nuevo lead calificado para {profile.business_name}**

📊 Resumen de conversación:
{summary}

💬 Interés detectado:
{conversation.detected_interest}

📞 ¿Quieres contactar a este cliente?
Responde "SÍ" para recibir su número de WhatsApp.
    """
    
    # Enviar notificación al WhatsApp personal del dueño
    send_whatsapp_message(
        to=profile.owner_whatsapp,
        message=message
    )
    
    # Guardar que se notificó
    conversation.update(lead_notified_at=datetime.now())
```

**5. Compartir Número del Cliente**

```python
async def handle_owner_response(
    owner_whatsapp: str,
    response: str,
    conversation_id: str
):
    """
    Maneja la respuesta del dueño a la notificación de lead.
    """
    
    if response.upper() in ["SÍ", "SI", "YES", "QUIERO"]:
        conversation = MarketplaceConversation.get(conversation_id)
        
        # Ahora sí compartir el número
        message = f"""
✅ Perfecto! Aquí está la información de contacto:

👤 Cliente: {conversation.customer_name or "No proporcionó nombre"}
📞 WhatsApp: {conversation.customer_phone}

📝 Contexto completo:
{conversation.get_full_history()}

💡 Recomendación: Contáctalo en las próximas 2 horas para mayor conversión.
        """
        
        send_whatsapp_message(
            to=owner_whatsapp,
            message=message
        )
        
        conversation.update_status("closed")
```

#### Límites y Restricciones

**Límites del Plan Gratuito:**

```python
MARKETPLACE_FREE_LIMITS = {
    "monthly_messages": 210,  # Mensajes de respuesta IA por mes
    "knowledge_base_items": 50,  # Productos/servicios/FAQs
    "categories": 1,  # Solo 1 categoría de negocio
    "locations": 1,  # Solo 1 ubicación
    "referral_codes": 1,  # 1 código de referencia
    "concurrent_conversations": 10,  # Máximo 10 conversaciones activas
}
```

**Restricciones:**

- ❌ No tiene línea propia de WhatsApp Business
- ❌ No puede enviar campañas masivas
- ❌ No puede iniciar conversaciones (solo responder)
- ❌ No tiene acceso a Contact Enrichment
- ❌ No tiene Guardrails personalizados
- ❌ No tiene integraciones CRM
- ❌ No ve números de clientes hasta que solicita contacto

**Beneficios:**

- ✅ Aparece en directorio de CloserCat
- ✅ IA responde 24/7 usando su Knowledge Base
- ✅ Recibe notificaciones de leads calificados
- ✅ Puede usar código de referencia para marketing propio
- ✅ Dashboard básico con métricas

---

### Plan 2: Lite "Pago Único" 💎

#### Concepto

**BYOW (Bring Your Own WhatsApp):** Cliente tiene su propia línea de WhatsApp Business.

**Pricing:**
- **Setup Único:** $450.000 COP (activación WA Business + configuración)
- **Mensualidad:** $0 COP (perpetuo)
- **Incluido:** 420 mensajes/mes GRATIS (≈60 conversaciones)
- **Excedente:** Paquetes on-demand

#### Definición de Mensajes vs. Conversaciones

**IMPORTANTE:** El límite es de **420 MENSAJES**, no conversaciones.

**Cálculo:**
```
420 mensajes/mes ÷ 7 mensajes promedio por conversación = ~60 conversaciones/mes
```

**Ejemplo de Conversación:**

```
Mensaje 1 (Cliente): "Hola, quiero información de precios"
Mensaje 2 (IA): "¡Hola! Te cuento sobre nuestros precios..."  ← Cuenta 1 mensaje
Mensaje 3 (Cliente): "¿Tienen descuentos?"
Mensaje 4 (IA): "Sí, tenemos descuentos del 10%..."  ← Cuenta 1 mensaje
Mensaje 5 (Cliente): "Perfecto, ¿cómo compro?"
Mensaje 6 (IA): "Puedes comprar por..."  ← Cuenta 1 mensaje
Mensaje 7 (Cliente): "Gracias"
Mensaje 8 (IA): "¡Con gusto! ¿Algo más?"  ← Cuenta 1 mensaje

Total: 4 mensajes de IA consumidos de los 420 mensuales
```

#### Especificaciones Técnicas

**Tabla `lite_accounts`**

```sql
CREATE TABLE lite_accounts (
  id UUID PRIMARY KEY,
  tenant_id UUID REFERENCES tenants(id),
  whatsapp_number VARCHAR(20) NOT NULL,
  setup_paid_at TIMESTAMP,
  setup_amount DECIMAL(10,2) DEFAULT 450000.00,
  monthly_messages_limit INT DEFAULT 420,
  monthly_messages_used INT DEFAULT 0,
  billing_cycle_start DATE,
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW()
);
```

**Tabla `lite_message_usage`**

```sql
CREATE TABLE lite_message_usage (
  id UUID PRIMARY KEY,
  account_id UUID REFERENCES lite_accounts(id),
  message_id UUID REFERENCES messages(id),
  message_type VARCHAR(20), -- ai_text, ai_audio, ai_image, campaign, manual
  cost_in_messages INT DEFAULT 1, -- Texto=1, Audio/Imagen pueden ser >1
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Lógica de Conteo de Mensajes

```python
def count_message_usage(
    account: LiteAccount,
    message_type: str,
    content: dict
) -> int:
    """
    Calcula cuántos mensajes consumir según el tipo.
    
    Tipos:
    - ai_text: 1 mensaje
    - ai_audio: 1 mensaje (mismo costo que texto)
    - ai_image: 1 mensaje (mismo costo que texto)
    - campaign: 1 mensaje por destinatario
    - manual: 0 mensajes (no consume cuota)
    
    Returns:
        Número de mensajes a descontar
    """
    
    if message_type == "manual":
        return 0  # Mensajes manuales no consumen cuota
    
    if message_type in ["ai_text", "ai_audio", "ai_image"]:
        return 1
    
    if message_type == "campaign":
        return len(content.get("recipients", []))
    
    return 1  # Default
```

**Verificación de Límite**

```python
async def can_send_ai_message(account: LiteAccount) -> bool:
    """
    Verifica si la cuenta puede enviar un mensaje de IA.
    """
    
    # Verificar si está en el ciclo actual
    if not is_in_current_billing_cycle(account):
        # Resetear contador si cambió el mes
        account.reset_monthly_usage()
    
    # Verificar límite
    if account.monthly_messages_used >= account.monthly_messages_limit:
        return False
    
    return True
```

**Manejo de Excedente**

```python
async def handle_message_over_limit(
    account: LiteAccount,
    message_content: str
) -> dict:
    """
    Maneja mensajes cuando se alcanzó el límite.
    
    Opciones:
    1. Notificar al dueño que alcanzó límite
    2. Ofrecer compra de paquete on-demand
    3. Desactivar IA temporalmente
    """
    
    # Notificar al admin del tenant
    notify_admin(
        tenant_id=account.tenant_id,
        message=f"""
⚠️ Alcanzaste el límite de 420 mensajes/mes

📊 Uso actual: {account.monthly_messages_used}/420

💡 Opciones:
1. Esperar al próximo ciclo (se resetea el {account.next_billing_cycle_start})
2. Comprar paquete adicional:
   - 1,000 msgs → $180K (90 días)
   - 5,000 msgs → $810K (120 días)
   
🔗 Comprar: https://closercat.com/buy-messages?account={account.id}
        """
    )
    
    # Desactivar IA temporalmente
    account.update(ai_enabled=False)
    
    # Enviar mensaje automático al cliente
    return {
        "message": "Gracias por tu mensaje. Un asesor te contactará pronto.",
        "ai_disabled": True
    }
```

#### Beneficios del Plan Lite

**Incluido:**
- ✅ Línea propia WhatsApp Business (número del cliente)
- ✅ 420 mensajes IA/mes GRATIS (≈60 conversaciones)
- ✅ Knowledge Base (hasta 200 productos/servicios)
- ✅ IA responde automáticamente (texto, audio, imagen)
- ✅ Inbox centralizado
- ✅ Plantillas de respuesta
- ✅ Contact Enrichment básico
- ✅ Soporte email (<48h)
- ✅ **BONUS:** Acceso al marketplace gratuito (puede ser recomendado)

**NO Incluido (Add-ons):**
- ❌ Campañas masivas (compra por separado)
- ❌ Integraciones CRM ($1.5M-$3.5M setup)
- ❌ Guardrails personalizados ($1.2M)
- ❌ Onboarding asistido ($600K)

#### Monetización de Excedente

**Paquetes On-Demand:**

```python
LITE_ADDON_PACKAGES = {
    "starter": {
        "messages": 1000,
        "price": 180000,  # COP
        "expiration_days": 90,
        "price_per_message": 180
    },
    "growth": {
        "messages": 5000,
        "price": 810000,
        "expiration_days": 120,
        "price_per_message": 162
    },
    "pro": {
        "messages": 10000,
        "price": 1530000,
        "expiration_days": 180,
        "price_per_message": 153
    }
}
```

**Tabla `lite_message_packages`**

```sql
CREATE TABLE lite_message_packages (
  id UUID PRIMARY KEY,
  account_id UUID REFERENCES lite_accounts(id),
  package_type VARCHAR(20), -- starter, growth, pro
  messages_purchased INT,
  messages_used INT DEFAULT 0,
  price_paid DECIMAL(10,2),
  purchased_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP,
  status VARCHAR(20) DEFAULT 'active' -- active, expired, consumed
);
```

---

## 🏢 TIER 2: INDUSTRIA-ESPECÍFICO

### Estructura de Planes

**Planes Base (Suscripción Anual):**

| Plan | Mensajes/mes | Precio/mes | $/msg | Excedente Gratis |
|------|--------------|------------|-------|------------------|
| Growth | 10,000 | $1.449.000 | $144 | +10% (1,000 msgs) |
| Pro | 25,000 | $3.400.000 | $136 | +15% (3,750 msgs) |
| Enterprise | 100,000 | $12.800.000 | $128 | +20% (20,000 msgs) |

### Casos de Uso: Restricción Importante

**REGLA:** Solo se puede seleccionar **1 caso de uso** por tenant en planes estándar.

**Casos de uso disponibles:**
1. **Ecommerce:** Catálogo de productos, precios, inventario
2. **B2B/Servicios:** Servicios profesionales, cotizaciones
3. **Soporte:** FAQs, tickets, troubleshooting
4. **Educación:** Programas académicos, admisiones (con Q10)

**Implementación:**

```sql
CREATE TABLE tenant_use_cases (
  id UUID PRIMARY KEY,
  tenant_id UUID REFERENCES tenants(id) UNIQUE, -- Solo 1 por tenant
  use_case_type VARCHAR(50) NOT NULL, -- ecommerce, b2b, support, education
  knowledge_base_config JSONB, -- Configuración específica del caso de uso
  created_at TIMESTAMP DEFAULT NOW()
);
```

**Validación:**

```python
def select_use_case(tenant_id: str, use_case_type: str) -> dict:
    """
    Permite seleccionar solo 1 caso de uso por tenant.
    
    Si el tenant ya tiene un caso de uso, debe eliminarlo primero
    o negociar un plan custom.
    """
    
    existing = TenantUseCase.get_by_tenant(tenant_id)
    
    if existing:
        return {
            "error": "Ya tienes un caso de uso configurado",
            "current_use_case": existing.use_case_type,
            "message": "Para usar múltiples casos de uso, contacta ventas para un plan custom"
        }
    
    # Crear caso de uso
    use_case = TenantUseCase.create(
        tenant_id=tenant_id,
        use_case_type=use_case_type,
        knowledge_base_config=get_default_kb_config(use_case_type)
    )
    
    return {"success": True, "use_case": use_case}
```

**Configuración de Knowledge Base por Caso de Uso:**

```python
def get_default_kb_config(use_case_type: str) -> dict:
    """
    Retorna configuración de KB según caso de uso.
    """
    
    configs = {
        "ecommerce": {
            "enabled_tabs": ["products"],
            "fields": ["name", "price", "description", "sku", "stock", "images"],
            "max_items": 10000
        },
        "b2b": {
            "enabled_tabs": ["services"],
            "fields": ["name", "description", "pricing_model", "duration"],
            "max_items": 500
        },
        "support": {
            "enabled_tabs": ["faqs"],
            "fields": ["question", "answer", "category", "priority"],
            "max_items": 1000
        },
        "education": {
            "enabled_tabs": ["programs", "faqs"],
            "fields": ["program_name", "duration", "price", "requirements", "campus"],
            "max_items": 200,
            "integrations": ["q10_crm"]
        }
    }
    
    return configs.get(use_case_type, {})
```

### Múltiples Casos de Uso: Plan Custom

**Escenario:** Cliente necesita Ecommerce + Soporte en la misma cuenta.

**Solución:** Negociación específica con pricing custom.

**Ejemplo de Pricing Custom:**

```python
def calculate_multi_use_case_pricing(
    base_plan: str,
    use_cases: list[str]
) -> dict:
    """
    Calcula pricing para múltiples casos de uso.
    
    Fórmula:
    - Caso de uso primario: Precio estándar
    - Casos adicionales: +30% del precio base por cada uno
    """
    
    base_prices = {
        "growth": 1449000,
        "pro": 3400000,
        "enterprise": 12800000
    }
    
    base_price = base_prices[base_plan]
    additional_use_cases = len(use_cases) - 1
    
    total_price = base_price * (1 + (additional_use_cases * 0.30))
    
    return {
        "base_plan": base_plan,
        "use_cases": use_cases,
        "base_price": base_price,
        "additional_cost": base_price * additional_use_cases * 0.30,
        "total_monthly_price": total_price,
        "requires_custom_contract": True
    }

# Ejemplo:
# Plan Pro + Ecommerce + Soporte
# Base: $3.4M
# Adicional: $3.4M * 0.30 = $1.02M
# Total: $4.42M/mes
```

### Add-ons por Industria

**Tabla `industry_addons`**

```sql
CREATE TABLE industry_addons (
  id UUID PRIMARY KEY,
  tenant_id UUID REFERENCES tenants(id),
  addon_type VARCHAR(50), -- q10_integration, shopify_integration, etc.
  setup_cost DECIMAL(10,2),
  monthly_cost DECIMAL(10,2) DEFAULT 0,
  status VARCHAR(20) DEFAULT 'active',
  purchased_at TIMESTAMP DEFAULT NOW()
);
```

**Catálogo de Add-ons:**

```python
INDUSTRY_ADDONS = {
    "education": {
        "q10_integration": {
            "name": "Integración Q10 CRM (Nativa)",
            "setup_cost": 1500000,
            "monthly_cost": 0,
            "included_in": ["pro", "enterprise"]
        },
        "q10_analytics": {
            "name": "Analytics Q10",
            "setup_cost": 0,
            "monthly_cost": 500000,
            "included_in": ["enterprise"]
        }
    },
    "ecommerce": {
        "shopify_integration": {
            "name": "Integración Shopify",
            "setup_cost": 2000000,
            "monthly_cost": 0,
            "included_in": ["enterprise"]
        },
        "payment_gateway": {
            "name": "Pasarela de Pagos",
            "setup_cost": 3000000,
            "monthly_cost": 0,
            "transaction_fee": 0.02  # 2%
        }
    },
    "b2b": {
        "hubspot_integration": {
            "name": "Integración HubSpot",
            "setup_cost": 3500000,
            "monthly_cost": 0
        },
        "salesforce_integration": {
            "name": "Integración Salesforce",
            "setup_cost": 3500000,
            "monthly_cost": 0
        }
    }
}
```

---

## 🧪 TIER 3: PILOTOS A RESULTADOS

### Estructura del Piloto

**Fase 1: Discovery (Gratuita)**
- Duración: 1 sesión de 2-3 horas
- Costo: $0 (incluido)
- Entregables: Diagnóstico, KPIs propuestos, caso de negocio

**Fase 2: Piloto (60 días)**

**Opciones de Pricing:**

```python
PILOT_PRICING_OPTIONS = {
    "fixed_reduced": {
        "name": "Pago Fijo Reducido",
        "upfront_cost": 2000000,  # 50% del costo real
        "included_messages": 10000,
        "guarantee": "Reembolso 100% si no cumple KPIs"
    },
    "results_only": {
        "name": "100% Pago por Resultados",
        "upfront_cost": 0,
        "success_payment": 4000000,
        "guarantee": "Paga solo si cumple KPIs"
    }
}
```

**Tabla `pilot_programs`**

```sql
CREATE TABLE pilot_programs (
  id UUID PRIMARY KEY,
  tenant_id UUID REFERENCES tenants(id),
  industry VARCHAR(100),
  pricing_model VARCHAR(50), -- fixed_reduced, results_only, hybrid
  kpis JSONB, -- [{"metric": "response_time", "target": "70% reduction"}]
  start_date DATE,
  end_date DATE,
  status VARCHAR(20), -- active, completed, failed, converted
  final_payment DECIMAL(10,2),
  converted_to_plan VARCHAR(50), -- growth, pro, enterprise, null
  created_at TIMESTAMP DEFAULT NOW()
);
```

**KPIs Típicos:**

```python
PILOT_KPI_TEMPLATES = {
    "healthcare": [
        {"metric": "appointment_booking_rate", "target": 0.40, "description": "40% de consultas resultan en cita agendada"},
        {"metric": "response_time_reduction", "target": 0.70, "description": "70% reducción en tiempo de respuesta"}
    ],
    "real_estate": [
        {"metric": "lead_qualification_rate", "target": 0.50, "description": "50% de leads calificados automáticamente"},
        {"metric": "tour_booking_rate", "target": 0.30, "description": "30% de consultas resultan en tour agendado"}
    ],
    "automotive": [
        {"metric": "test_drive_booking_rate", "target": 0.25, "description": "25% de consultas resultan en test drive"},
        {"metric": "quote_delivery_time", "target": 0.80, "description": "80% reducción en tiempo de entrega de cotización"}
    ]
}
```

### Conversión Post-Piloto

**Opciones de Suscripción:**

```python
def calculate_post_pilot_pricing(
    pilot: PilotProgram,
    selected_plan: str,
    pricing_model: str
) -> dict:
    """
    Calcula pricing post-piloto.
    
    Args:
        pilot: Programa de piloto completado
        selected_plan: growth, pro, enterprise
        pricing_model: subscription, hybrid, results_only
    """
    
    base_prices = {
        "growth": 1449000,
        "pro": 3400000,
        "enterprise": 12800000
    }
    
    if pricing_model == "subscription":
        # Suscripción estándar
        return {
            "model": "subscription",
            "monthly_cost": base_prices[selected_plan],
            "setup_cost": 3500000,  # Integraciones custom
            "onboarding_cost": 1200000
        }
    
    elif pricing_model == "hybrid":
        # Base fija + performance fee
        base_cost = base_prices[selected_plan] * 0.50  # 50% del precio estándar
        
        return {
            "model": "hybrid",
            "monthly_base": base_cost,
            "performance_fee_percentage": 0.10,  # 10% de ahorro/revenue
            "minimum_monthly": base_prices[selected_plan] * 0.50,
            "setup_cost": 3500000
        }
    
    elif pricing_model == "results_only":
        # Solo performance fee
        return {
            "model": "results_only",
            "monthly_base": 0,
            "performance_fee_percentage": 0.20,  # 20% de ahorro/revenue
            "minimum_monthly": 2000000,  # Mínimo garantizado
            "setup_cost": 3500000
        }
```

**Restricción Importante:**

**Integraciones y customizaciones se cobran APARTE en todos los modelos.**

```python
PILOT_ADDITIONAL_COSTS = {
    "crm_integration": {
        "cost": 3500000,
        "description": "Integración custom con CRM/ERP del cliente",
        "payment": "one_time"
    },
    "custom_ai_training": {
        "cost": 2000000,
        "description": "Entrenamiento de IA con datos específicos de la industria",
        "payment": "one_time"
    },
    "dedicated_infrastructure": {
        "cost": 10000000,
        "description": "Infraestructura dedicada (no compartida)",
        "payment": "monthly"
    }
}
```

---

## 📊 Resumen de Límites por Tier

### Tier Emprendedor

**Plan Gratuito (Marketplace):**
```python
FREE_LIMITS = {
    "monthly_messages": 210,
    "knowledge_base_items": 50,
    "categories": 1,
    "locations": 1,
    "concurrent_conversations": 10,
    "own_whatsapp_line": False,
    "campaigns": False,
    "integrations": False
}
```

**Plan Lite:**
```python
LITE_LIMITS = {
    "monthly_messages": 420,  # ≈60 conversaciones
    "knowledge_base_items": 200,
    "own_whatsapp_line": True,
    "campaigns": False,  # Compra on-demand
    "integrations": False,  # Compra on-demand
    "contact_enrichment": "basic",
    "guardrails": "basic"
}
```

### Tier Industria

```python
INDUSTRY_LIMITS = {
    "growth": {
        "monthly_messages": 10000,
        "free_overage": 1000,  # +10%
        "campaigns_simultaneous": 2,
        "targets_per_campaign": 10000,
        "knowledge_base_items": 10000,
        "integrations": "webhooks",
        "use_cases": 1  # Solo 1 caso de uso
    },
    "pro": {
        "monthly_messages": 25000,
        "free_overage": 3750,  # +15%
        "campaigns_simultaneous": 5,
        "targets_per_campaign": 50000,
        "knowledge_base_items": 10000,
        "integrations": "native_q10",
        "use_cases": 1  # Solo 1 caso de uso
    },
    "enterprise": {
        "monthly_messages": 100000,
        "free_overage": 20000,  # +20%
        "campaigns_simultaneous": "unlimited",
        "targets_per_campaign": "unlimited",
        "knowledge_base_items": "unlimited",
        "integrations": "custom",
        "use_cases": "negotiable"  # Múltiples casos = custom pricing
    }
}
```

---

## 🔧 Implementación: Checklist

### Fase 1: Tier Emprendedor (Semanas 1-3)

**Plan Gratuito (Marketplace):**
- [ ] Crear tabla `marketplace_profiles`
- [ ] Crear tabla `marketplace_conversations`
- [ ] Crear tabla `marketplace_messages`
- [ ] Implementar lógica de enrutamiento de mensajes
- [ ] Implementar detección de código de referencia
- [ ] Implementar búsqueda en directorio
- [ ] Implementar detección de lead calificado
- [ ] Implementar notificaciones al dueño
- [ ] Implementar compartir número solo cuando dueño acepta
- [ ] Crear dashboard para emprendedores
- [ ] Testing con 10 emprendedores beta

**Plan Lite:**
- [ ] Crear tabla `lite_accounts`
- [ ] Crear tabla `lite_message_usage`
- [ ] Crear tabla `lite_message_packages`
- [ ] Implementar conteo de mensajes (420/mes)
- [ ] Implementar verificación de límite
- [ ] Implementar notificación de límite alcanzado
- [ ] Implementar compra de paquetes on-demand
- [ ] Integrar con sistema de pagos
- [ ] Testing con 5 clientes beta

### Fase 2: Tier Industria (Semanas 4-6)

- [ ] Crear tabla `tenant_use_cases`
- [ ] Implementar restricción de 1 caso de uso por tenant
- [ ] Crear configuraciones de KB por caso de uso
- [ ] Implementar validación de caso de uso único
- [ ] Crear tabla `industry_addons`
- [ ] Implementar catálogo de add-ons por industria
- [ ] Crear flujo de compra de add-ons
- [ ] Implementar cálculo de pricing custom (múltiples casos de uso)
- [ ] Testing con 3 clientes por industria

### Fase 3: Tier Pilotos (Semanas 7-8)

- [ ] Crear tabla `pilot_programs`
- [ ] Implementar formulario de aplicación a piloto
- [ ] Crear templates de KPIs por industria
- [ ] Implementar tracking de KPIs durante piloto
- [ ] Implementar cálculo de pricing post-piloto
- [ ] Crear flujo de conversión a suscripción
- [ ] Implementar modelos de pricing (subscription, hybrid, results_only)
- [ ] Testing con 2 pilotos

### Fase 4: Integraciones (Semanas 9-10)

- [ ] Implementar sistema de pagos (Stripe/Mercado Pago)
- [ ] Integrar con WhatsApp Business API
- [ ] Crear flujo de onboarding por tier
- [ ] Implementar notificaciones automáticas
- [ ] Crear dashboards por tier
- [ ] Testing end-to-end

---

## 📝 Notas Finales

### Clarificaciones Importantes

1. **Marketplace Gratuito:**
   - Emprendedor NO ve números de clientes hasta que solicita contacto
   - Sistema actúa como intermediario
   - Código de referencia permite enrutamiento directo

2. **Plan Lite:**
   - Límite es de **420 MENSAJES**, no conversaciones
   - ≈60 conversaciones/mes (7 mensajes promedio por conversación)
   - Mensajes manuales NO consumen cuota

3. **Casos de Uso:**
   - Solo 1 caso de uso por tenant en planes estándar
   - Múltiples casos de uso = pricing custom (+30% por caso adicional)

4. **Pilotos:**
   - Integraciones y customizaciones se cobran APARTE
   - KPIs se definen en discovery
   - Conversión a suscripción tiene 3 modelos (subscription, hybrid, results_only)

### Próximos Pasos

1. Validar números de plan Lite (¿420 mensajes es sostenible?)
2. Definir comisión de marketplace gratuito (¿5% o 10%?)
3. Crear calculadora de pricing para sales
4. Documentar proceso de onboarding por tier
5. Crear templates de contratos por tier

---

**Documento creado:** Enero 2026  
**Versión:** 1.0  
**Para implementación por:** Equipo de desarrollo CloserCat
---

## 🚀 HEURÍSTICA DE COTIZACIÓN PARA EQUIPOS COMERCIALES (SIMULADOR)

Esta lógica se aplica en el simulador de la landing de Emprendedores/Empresas para determinar el "Costo Esperado" mensual.

### 1. Costo Base de Mensajería (IA vs Custodia)
Se divide el volumen total de mensajes según el **Nivel de Delegación a la IA (%)**.

- **Mensajes IA (Automatización Activa):**
  - `iaCost = (ia_msgs_texto * 180) + (ia_msgs_audio * 256) + (ia_msgs_imagen * 247) + (ia_msgs_doc * 180)`
- **Mensajes Residuales (Custodia y Enriquecimiento):**
  - `residualCost = residual_msgs * 3` (Valor fijo de $3 COP para permitir margen de descuento y responsabilidad).

### 1. Costo Base de Mensajería (IA vs Custodia)
... (Igual que antes)

### 2. Fee por Sincronización y Control de Líneas
Se elimina el "factor de estrategia" complejo. Se cobra por tipo de línea conectada:

- **Líneas Personales (No Institucionales):**
    - **Costo:** $10,000 COP/mes por línea sincronizada.
    - **Concepto:** Custodia de datos y sincronización de logs sin control total de la línea.
- **Líneas Institucionales (WhatsApp API):**
    - **Habilitación (Setup):** $450,000 COP (Pago Único).
    - **Mantenimiento Mensual:** $0 (Incluido en costos operativos).
- **Lógica de Vinculación:** Máximo 5 comerciales por cada línea institucional.

### 3. Integraciones CRM/ERP
Se diferencia entre plataformas SaaS populares y desarrollos a la medida.

- **CRMs SaaS (HubSpot, Salesforce, Pipedrive, Zoho, RD Station, Kommo):**
    - **Costo:** $300,000 COP (Pago Único - Setup Webhooks).
    - **Mensualidad:** $0 (Incluido en planes estándar).
- **Sistemas a la Medida / ERPs Legacy (Siesa, SAP, Oracle, Desarrollos Propios):**
    - **Costo:** Cotización a medida (mínimo $2,000,000 setup + fee mensual de mantenimiento).

### 4. Resumen de Cotización
Se presentan dos montos separados:
1. **Pago Único (Setup):** Habilitación de líneas + Configuración de Integraciones + Onboarding.
2. **Mensualidad (Recurrente):** (IA + Residual) + Fee Líneas Personales + Fee Líneas Institucionales + Servicios Recurrentes.
