import React, { useState, useEffect } from 'react';
import { clarityEvent, getUtmParams } from '../../utils/tracking';
import { TeamStructureData } from '../../types';

interface ConversationTurn {
  id: string;
  speaker: 'customer' | 'ai';
  message: string;
}

interface MultimediaStats {
  audioPercentage: number;
  audioAvgMinutes: number;
  imagePercentage: number;
  documentPercentage: number;
  documentAvgPages: number;
}

interface ProjectionData {
  conversationsPerMonth: number;
  avgTurnsPerConversation: number;
  textMessages: number;
  audioMessages: number;
  imageMessages: number;
  documentMessages: number;
  totalMessages: number;
  baseCost: number;
  teamMultiplier: number;
  adjustedBaseCost: number;
  integrationMonthlyCost: number;
  integrationSetupAmortized: number;
  totalIntegrationCost: number;
  servicesCost: number;
  servicesSetupAmortized: number;
  totalServicesCost: number;
  volumeDiscount: number;
  volumeDiscountApplied: boolean;
  totalMonthlyCost: number;
  pessimisticCost: number;
  optimisticCost: number;
  expectedCost: number;
}

const PACKAGES = [
  { messages: 1000, price: 180000, expiration: '90 días', pricePerMsg: 180 },
  { messages: 5000, price: 810000, expiration: '120 días', pricePerMsg: 162 },
  { messages: 10000, price: 1530000, expiration: '180 días', pricePerMsg: 153 },
  { messages: 25000, price: 3600000, expiration: '365 días', pricePerMsg: 144 }
];

const COSTS = {
  text: 180,
  audio: 256,
  image: 247,
  document: 180,
  campaign: 66
};

const TEAM_MULTIPLIERS: Record<string, number> = {
  '1-5': 0.00,
  '6-10': 0.10,
  '11-20': 0.20,
  '21-50': 0.30,
  '50+': 0.50
};

const INTEGRATION_COSTS: Record<string, { monthly: number; setup: number }> = {
  crm_custom: { monthly: 500000, setup: 3500000 },
  erp_custom: { monthly: 800000, setup: 3500000 },
  custom_webhooks: { monthly: 300000, setup: 2000000 }
};

const SERVICES_COSTS = {
  campaign_msg: 66,
  custom_reports: 200000,
  migration_assisted: 800000,
  additional_line: 100000,
  onboarding: 600000
};

// Conversación precargada de ejemplo para reducir fricción
const DEFAULT_CONVERSATION: ConversationTurn[] = [
  { id: '1', speaker: 'customer', message: 'Hola, me interesa automatizar WhatsApp para mi negocio' },
  { id: '2', speaker: 'ai', message: '¡Perfecto! Con gusto te ayudo. ¿Podrías contarme un poco sobre tu negocio y qué tipo de conversaciones manejas?' },
  { id: '3', speaker: 'customer', message: 'Vendemos productos online y recibimos muchas consultas sobre precios, disponibilidad y envíos' },
  { id: '4', speaker: 'ai', message: 'Entiendo. CloserCat puede responder automáticamente esas consultas usando tu catálogo de productos. ¿Cuántas conversaciones aproximadamente recibes al día?' },
  { id: '5', speaker: 'customer', message: 'Entre 20 y 30 conversaciones diarias, pero a veces perdemos mensajes porque no damos abasto' },
  { id: '6', speaker: 'ai', message: 'Con CloserCat nunca perderás un mensaje. La IA responde 24/7 y tu equipo solo interviene cuando es necesario. ¿Te gustaría ver una demo?' },
];

export default function ConversationSimulator() {
  const [step, setStep] = useState<'simulator' | 'multimedia' | 'volume' | 'teamStructure' | 'form' | 'results'>('simulator');
  const [conversation, setConversation] = useState<ConversationTurn[]>(DEFAULT_CONVERSATION);
  const [currentMessage, setCurrentMessage] = useState('');
  const [currentSpeaker, setCurrentSpeaker] = useState<'customer' | 'ai'>('customer');

  const [multimediaStats, setMultimediaStats] = useState<MultimediaStats>({
    audioPercentage: 0,
    audioAvgMinutes: 0,
    imagePercentage: 0,
    documentPercentage: 0,
    documentAvgPages: 0
  });

  const [conversationsPerMonth, setConversationsPerMonth] = useState<number>(0);
  const [projection, setProjection] = useState<ProjectionData | null>(null);

  const [teamStructure, setTeamStructure] = useState<TeamStructureData>({
    numberOfSalesReps: '1-5',
    currentWhatsAppType: 'personal',
    hasInstitutionalNumber: false,
    integrationsNeeded: [],
    needsCampaigns: false,
    campaignContacts: 0,
    campaignsPerMonth: 0,
    needsCustomReports: false,
    needsMigrationAssistance: false,
    needsOnboarding: false,
    industry: '',
    primaryUseCase: '',
    operationDescription: ''
  });

  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    email: '',
    business: ''
  });

  const [hasAutoPrinted, setHasAutoPrinted] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [editingTurnId, setEditingTurnId] = useState<string | null>(null);
  const [editingMessage, setEditingMessage] = useState('');

  const addTurn = () => {
    if (!currentMessage.trim()) return;

    const newTurn: ConversationTurn = {
      id: Date.now().toString(),
      speaker: currentSpeaker,
      message: currentMessage.trim()
    };

    setConversation([...conversation, newTurn]);
    setCurrentMessage('');
    setCurrentSpeaker(currentSpeaker === 'customer' ? 'ai' : 'customer');
  };

  const removeTurn = (id: string) => {
    setConversation(conversation.filter(turn => turn.id !== id));
  };

  const startEditTurn = (id: string, currentMessage: string) => {
    setEditingTurnId(id);
    setEditingMessage(currentMessage);
  };

  const saveEditTurn = () => {
    if (!editingMessage.trim() || !editingTurnId) return;

    setConversation(conversation.map(turn =>
      turn.id === editingTurnId
        ? { ...turn, message: editingMessage.trim() }
        : turn
    ));
    setEditingTurnId(null);
    setEditingMessage('');
  };

  const cancelEditTurn = () => {
    setEditingTurnId(null);
    setEditingMessage('');
  };

  const handleContinueToMultimedia = () => {
    if (conversation.length < 4) {
      alert('Por favor simula al menos 4 turnos de conversación (2 intercambios)');
      return;
    }
    clarityEvent('simulator_conversation_completed');
    setStep('multimedia');
  };

  const handleContinueToVolume = () => {
    clarityEvent('simulator_multimedia_completed');
    setStep('volume');
  };

  const calculateProjection = (monthlyConversations: number) => {
    const avgTurns = conversation.length;
    const aiTurns = conversation.filter(t => t.speaker === 'ai').length;

    // Calcular mensajes por tipo
    const totalMessagesPerConversation = aiTurns;
    const totalMonthlyMessages = monthlyConversations * totalMessagesPerConversation;

    // Distribución de multimedia
    const audioMessages = Math.round(totalMonthlyMessages * (multimediaStats.audioPercentage / 100));
    const imageMessages = Math.round(totalMonthlyMessages * (multimediaStats.imagePercentage / 100));
    const documentMessages = Math.round(totalMonthlyMessages * (multimediaStats.documentPercentage / 100));
    const textMessages = totalMonthlyMessages - audioMessages - imageMessages - documentMessages;

    // Costos
    const textCost = textMessages * COSTS.text;
    const audioCost = audioMessages * COSTS.audio;
    const imageCost = imageMessages * COSTS.image;
    const documentCost = documentMessages * COSTS.document;

    const baseCost = textCost + audioCost + imageCost + documentCost;

    // Proyección PERT: Optimista (-20%), Pesimista (+30%), Esperado (weighted avg)
    const optimisticCost = Math.round(baseCost * 0.8);
    const pessimisticCost = Math.round(baseCost * 1.3);
    const expectedCost = Math.round((optimisticCost + (baseCost * 4) + pessimisticCost) / 6);

    return {
      conversationsPerMonth: monthlyConversations,
      avgTurnsPerConversation: avgTurns,
      textMessages,
      audioMessages,
      imageMessages,
      documentMessages,
      totalMessages: totalMonthlyMessages,
      pessimisticCost,
      optimisticCost,
      expectedCost
    };
  };

  const handleContinueToForm = () => {
    if (conversationsPerMonth < 10) {
      alert('Por favor ingresa al menos 10 conversaciones mensuales');
      return;
    }

    const projectionData = calculateProjection(conversationsPerMonth);
    setProjection(projectionData);
    clarityEvent('simulator_volume_completed');
    setStep('form');
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.whatsapp || !formData.email) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    try {
      // UTM y metadatos similares a FormSection
      const params = new URLSearchParams(window.location.search);
      const utm = getUtmParams(params);

      // Preparar datos para webhook
      const payload = {
        event: 'simulator_submit',
        action: 'simulator_quote',
        created_at: new Date().toISOString(),
        page_url: window.location.href,
        user_agent: navigator.userAgent,
        utm,
        lead: formData,
        simulation: {
          conversation,
          multimediaStats,
          projection,
        },
      };

      const webhookUrl = import.meta.env?.VITE_MAKE_WEBHOOK_URL;
      if (webhookUrl) {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      clarityEvent('simulator_form_submitted');
      setStep('results');
    } catch (error) {
      console.error('Error enviando webhook de simulador:', error);
      alert('Hubo un error al enviar tu información. Por favor intenta de nuevo.');
    }
  };

  const handleRequestDemo = async () => {
    try {
      const params = new URLSearchParams(window.location.search);
      const utm = getUtmParams(params);

      const payload = {
        event: 'simulator_action',
        action: 'request_demo',
        created_at: new Date().toISOString(),
        page_url: window.location.href,
        user_agent: navigator.userAgent,
        utm,
        lead: formData,
      };

      const webhookUrl = import.meta.env?.VITE_MAKE_WEBHOOK_URL;
      if (webhookUrl) {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      clarityEvent('simulator_demo_requested');
      setShowDemoModal(true);
    } catch (error) {
      console.error('Error enviando webhook de demo:', error);
    }
  };

  // Auto-impresión al llegar a resultados (una sola vez por ciclo)
  useEffect(() => {
    if (step === 'results' && !hasAutoPrinted) {
      const timer = setTimeout(() => {
        window.print();
        setHasAutoPrinted(true);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [step, hasAutoPrinted]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handlePrint = () => {
    window.print();
  };

  // Step 1: Simulador de conversación
  const renderSimulator = () => (
    <div>
      <h3 className="text-2xl font-poppins font-bold mb-2" style={{ color: '#121212' }}>
        Paso 1: Simula una conversación típica
      </h3>
      <p className="font-inter text-sm mb-6" style={{ color: '#6b7280' }}>
        Hemos precargado un ejemplo de conversación de ventas. Puedes editarla, eliminar turnos o agregar nuevos para que refleje tu negocio.
      </p>

      {/* Conversation Display */}
      <div className="mb-6 bg-gray-50 rounded-xl p-6 min-h-[300px] max-h-[400px] overflow-y-auto">
        {conversation.length === 0 ? (
          <div className="text-center py-12">
            <span className="text-6xl mb-4 block">💬</span>
            <p className="font-inter text-sm" style={{ color: '#6b7280' }}>
              Empieza agregando el primer mensaje del cliente
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {conversation.map((turn) => (
              <div
                key={turn.id}
                className={`flex ${turn.speaker === 'customer' ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`max-w-[80%] ${turn.speaker === 'customer' ? 'order-1' : 'order-2'}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-poppins font-semibold" style={{ color: '#6b7280' }}>
                      {turn.speaker === 'customer' ? '👤 Cliente' : '🤖 IA'}
                    </span>
                    <button
                      onClick={() => startEditTurn(turn.id, turn.message)}
                      className="text-xs text-blue-500 hover:text-blue-700"
                      title="Editar mensaje"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => removeTurn(turn.id)}
                      className="text-xs text-red-500 hover:text-red-700"
                      title="Eliminar mensaje"
                    >
                      ✕
                    </button>
                  </div>
                  {editingTurnId === turn.id ? (
                    <div className="space-y-2">
                      <textarea
                        value={editingMessage}
                        onChange={(e) => setEditingMessage(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg font-inter text-sm resize-none"
                        rows={3}
                        autoFocus
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={saveEditTurn}
                          className="px-3 py-1 bg-green-500 text-white rounded text-xs font-poppins font-semibold hover:bg-green-600"
                        >
                          ✓ Guardar
                        </button>
                        <button
                          onClick={cancelEditTurn}
                          className="px-3 py-1 bg-gray-300 text-gray-700 rounded text-xs font-poppins font-semibold hover:bg-gray-400"
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`p-3 rounded-lg ${turn.speaker === 'customer'
                          ? 'bg-white border border-gray-200'
                          : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                        }`}
                    >
                      <p className="font-inter text-sm">{turn.message}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="space-y-4">
        <div className="flex gap-2 mb-2">
          <button
            onClick={() => setCurrentSpeaker('customer')}
            className={`flex-1 py-2 px-4 rounded-lg font-poppins font-semibold text-sm transition-all ${currentSpeaker === 'customer'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
          >
            👤 Cliente
          </button>
          <button
            onClick={() => setCurrentSpeaker('ai')}
            className={`flex-1 py-2 px-4 rounded-lg font-poppins font-semibold text-sm transition-all ${currentSpeaker === 'ai'
                ? 'bg-purple-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
          >
            🤖 IA
          </button>
        </div>

        <div className="flex gap-2">
          <textarea
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            placeholder={`Escribe el mensaje del ${currentSpeaker === 'customer' ? 'cliente' : 'asistente IA'}...`}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg font-inter text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
            rows={3}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                addTurn();
              }
            }}
          />
        </div>

        <div className="flex justify-between items-center">
          <p className="text-xs font-inter" style={{ color: '#6b7280' }}>
            💡 Presiona Enter para agregar. Shift+Enter para nueva línea.
          </p>
          <button
            onClick={addTurn}
            className="px-6 py-2 rounded-lg font-poppins font-semibold text-white"
            style={{ background: 'linear-gradient(135deg, #08C4F4 0%, #8336FF 100%)' }}
          >
            Agregar turno
          </button>
        </div>

        {conversation.length >= 4 && (
          <div className="mt-6 text-center">
            <button
              onClick={handleContinueToMultimedia}
              className="px-8 py-4 rounded-xl font-poppins font-bold text-lg text-white transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #08C4F4 0%, #8336FF 100%)' }}
            >
              Continuar al siguiente paso →
            </button>
            <p className="mt-2 text-xs font-inter" style={{ color: '#6b7280' }}>
              {conversation.length} turnos simulados
            </p>
          </div>
        )}
      </div>
    </div>
  );

  // Step 2: Estadísticas de multimedia
  const renderMultimedia = () => (
    <div>
      <h3 className="text-2xl font-poppins font-bold mb-2" style={{ color: '#121212' }}>
        Paso 2: Características de tus conversaciones
      </h3>
      <p className="font-inter text-sm mb-8" style={{ color: '#6b7280' }}>
        De cada 10 conversaciones, ¿cuántas incluyen estos elementos?
      </p>

      <div className="space-y-6">
        {/* Audio */}
        <div className="p-6 bg-gray-50 rounded-xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🎤</span>
            <div className="flex-1">
              <h4 className="font-poppins font-bold" style={{ color: '#121212' }}>Mensajes de audio</h4>
              <p className="text-xs font-inter" style={{ color: '#6b7280' }}>Notas de voz del cliente</p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-sm font-poppins font-semibold mb-2" style={{ color: '#121212' }}>
                De cada 10 conversaciones, ¿cuántas incluyen audio?
              </label>
              <input
                type="number"
                min="0"
                max="10"
                value={multimediaStats.audioPercentage / 10}
                onChange={(e) => setMultimediaStats({
                  ...multimediaStats,
                  audioPercentage: Math.min(100, Math.max(0, parseFloat(e.target.value) * 10))
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {multimediaStats.audioPercentage > 0 && (
              <div>
                <label className="block text-sm font-poppins font-semibold mb-2" style={{ color: '#121212' }}>
                  Duración promedio del audio (minutos)
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  value={multimediaStats.audioAvgMinutes}
                  onChange={(e) => setMultimediaStats({
                    ...multimediaStats,
                    audioAvgMinutes: Math.max(0, parseFloat(e.target.value) || 0)
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            )}
          </div>
        </div>

        {/* Images */}
        <div className="p-6 bg-gray-50 rounded-xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🖼️</span>
            <div className="flex-1">
              <h4 className="font-poppins font-bold" style={{ color: '#121212' }}>Imágenes</h4>
              <p className="text-xs font-inter" style={{ color: '#6b7280' }}>Fotos de productos, capturas, etc.</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-poppins font-semibold mb-2" style={{ color: '#121212' }}>
              De cada 10 conversaciones, ¿cuántas incluyen imágenes?
            </label>
            <input
              type="number"
              min="0"
              max="10"
              value={multimediaStats.imagePercentage / 10}
              onChange={(e) => setMultimediaStats({
                ...multimediaStats,
                imagePercentage: Math.min(100, Math.max(0, parseFloat(e.target.value) * 10))
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* Documents */}
        <div className="p-6 bg-gray-50 rounded-xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">📄</span>
            <div className="flex-1">
              <h4 className="font-poppins font-bold" style={{ color: '#121212' }}>Documentos</h4>
              <p className="text-xs font-inter" style={{ color: '#6b7280' }}>PDFs, contratos, cotizaciones</p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-sm font-poppins font-semibold mb-2" style={{ color: '#121212' }}>
                De cada 10 conversaciones, ¿cuántas incluyen documentos?
              </label>
              <input
                type="number"
                min="0"
                max="10"
                value={multimediaStats.documentPercentage / 10}
                onChange={(e) => setMultimediaStats({
                  ...multimediaStats,
                  documentPercentage: Math.min(100, Math.max(0, parseFloat(e.target.value) * 10))
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {multimediaStats.documentPercentage > 0 && (
              <div>
                <label className="block text-sm font-poppins font-semibold mb-2" style={{ color: '#121212' }}>
                  Páginas promedio por documento
                </label>
                <input
                  type="number"
                  min="1"
                  value={multimediaStats.documentAvgPages}
                  onChange={(e) => setMultimediaStats({
                    ...multimediaStats,
                    documentAvgPages: Math.max(1, parseInt(e.target.value) || 1)
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 flex gap-4">
        <button
          onClick={() => setStep('simulator')}
          className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-lg font-poppins font-semibold text-gray-700 hover:bg-gray-50"
        >
          ← Volver
        </button>
        <button
          onClick={handleContinueToVolume}
          className="flex-1 px-6 py-3 rounded-lg font-poppins font-bold text-white"
          style={{ background: 'linear-gradient(135deg, #08C4F4 0%, #8336FF 100%)' }}
        >
          Continuar →
        </button>
      </div>
    </div>
  );

  // Step 3: Volumen mensual
  const renderVolume = () => (
    <div>
      <h3 className="text-2xl font-poppins font-bold mb-2" style={{ color: '#121212' }}>
        Paso 3: Volumen mensual estimado
      </h3>
      <p className="font-inter text-sm mb-8" style={{ color: '#6b7280' }}>
        ¿Cuántas conversaciones como la que simulaste esperas tener al mes?
      </p>

      <div className="p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border-2 border-purple-200">
        <label className="block text-lg font-poppins font-bold mb-4 text-center" style={{ color: '#121212' }}>
          Conversaciones mensuales estimadas
        </label>
        <input
          type="number"
          min="10"
          value={conversationsPerMonth || ''}
          onChange={(e) => setConversationsPerMonth(parseInt(e.target.value) || 0)}
          placeholder="Ej: 500"
          className="w-full px-6 py-4 border-2 border-purple-300 rounded-lg font-mono text-2xl text-center focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <p className="mt-4 text-xs text-center font-inter" style={{ color: '#6b7280' }}>
          💡 Considera leads, clientes actuales y consultas de soporte
        </p>
      </div>

      <div className="mt-8 flex gap-4">
        <button
          onClick={() => setStep('multimedia')}
          className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-lg font-poppins font-semibold text-gray-700 hover:bg-gray-50"
        >
          ← Volver
        </button>
        <button
          onClick={handleContinueToForm}
          className="flex-1 px-6 py-3 rounded-lg font-poppins font-bold text-white"
          style={{ background: 'linear-gradient(135deg, #08C4F4 0%, #8336FF 100%)' }}
        >
          Ver proyección →
        </button>
      </div>
    </div>
  );

  // Step 4: Formulario
  const renderForm = () => (
    <div>
      <div className="text-center mb-8">
        <div className="inline-block p-4 bg-purple-100 rounded-full mb-4">
          <span className="text-4xl">🎯</span>
        </div>
        <h3 className="text-2xl font-poppins font-bold mb-2" style={{ color: '#121212' }}>
          Paso 4: Recibe tu cotización personalizada
        </h3>
        <p className="font-inter text-sm" style={{ color: '#6b7280' }}>
          Completa estos datos para recibir tu análisis completo
        </p>
      </div>

      <form onSubmit={handleSubmitForm} className="max-w-2xl mx-auto space-y-4">
        <div>
          <label className="block font-poppins font-semibold text-sm mb-2" style={{ color: '#121212' }}>
            Nombre completo *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Ej: Juan Pérez"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg font-inter focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        <div>
          <label className="block font-poppins font-semibold text-sm mb-2" style={{ color: '#121212' }}>
            WhatsApp *
          </label>
          <input
            type="tel"
            value={formData.whatsapp}
            onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
            placeholder="Ej: +57 300 123 4567"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg font-inter focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        <div>
          <label className="block font-poppins font-semibold text-sm mb-2" style={{ color: '#121212' }}>
            Email *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Ej: juan@empresa.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg font-inter focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        <div>
          <label className="block font-poppins font-semibold text-sm mb-2" style={{ color: '#121212' }}>
            Nombre de tu negocio (opcional)
          </label>
          <input
            type="text"
            value={formData.business}
            onChange={(e) => setFormData({ ...formData, business: e.target.value })}
            placeholder="Ej: Mi Tienda Online"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg font-inter focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="mt-8 flex gap-4">
          <button
            type="button"
            onClick={() => setStep('volume')}
            className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-lg font-poppins font-semibold text-gray-700 hover:bg-gray-50"
          >
            ← Volver
          </button>
          <button
            type="submit"
            className="flex-1 px-6 py-3 rounded-lg font-poppins font-bold text-white"
            style={{ background: 'linear-gradient(135deg, #08C4F4 0%, #8336FF 100%)' }}
          >
            Ver mi cotización →
          </button>
        </div>

        <p className="mt-4 text-xs text-center font-inter" style={{ color: '#6b7280' }}>
          🔒 Tus datos están seguros. Solo los usaremos para enviarte tu cotización.
        </p>
      </form>
    </div>
  );

  // Vista de impresión dedicada (oculta en pantalla, visible solo al imprimir)
  const renderPrintView = () => {
    if (!projection) return null;

    const recommendedPackage = PACKAGES.find(pkg => pkg.messages >= projection.totalMessages) || PACKAGES[PACKAGES.length - 1];
    const today = new Date().toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' });

    return (
      <div className="hidden print:block" style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px' }}>
        {/* Header con logo y datos */}
        <div className="flex justify-between items-start mb-4 pb-3 border-b-2 border-gray-300">
          <div>
            <h1 className="text-2xl font-bold mb-1" style={{ color: '#8336FF', fontFamily: 'Poppins, sans-serif' }}>CloserCat</h1>
            <p className="text-xs text-gray-600">Automatización de WhatsApp con IA</p>
          </div>
          <div className="text-right">
            <h2 className="text-xl font-bold mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>COTIZACIÓN</h2>
            <p className="text-xs text-gray-600">{today}</p>
          </div>
        </div>

        {/* Información del cliente */}
        <div className="mb-4">
          <h3 className="text-sm font-bold mb-2 pb-1 border-b border-gray-300" style={{ fontFamily: 'Poppins, sans-serif' }}>Información del Cliente</h3>
          <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-xs">
            <div><strong>Nombre:</strong> {formData.name}</div>
            <div><strong>WhatsApp:</strong> {formData.whatsapp}</div>
            <div><strong>Email:</strong> {formData.email}</div>
            {formData.business && <div><strong>Negocio:</strong> {formData.business}</div>}
          </div>
        </div>

        {/* Proyección PERT */}
        <div className="mb-4">
          <h3 className="text-sm font-bold mb-2 pb-1 border-b border-gray-300" style={{ fontFamily: 'Poppins, sans-serif' }}>Proyección de Inversión Mensual (PERT)</h3>
          <div className="grid grid-cols-3 gap-2 mb-2">
            <div className="text-center p-2 bg-gray-100 border border-gray-300">
              <div className="text-xs font-semibold mb-1 text-gray-600">Optimista</div>
              <div className="text-lg font-bold" style={{ color: '#10b981' }}>{formatCurrency(projection.optimisticCost)}</div>
              <div className="text-xs text-gray-500">-20%</div>
            </div>
            <div className="text-center p-2 bg-gray-100 border-2 border-gray-800">
              <div className="text-xs font-semibold mb-1 text-gray-600">Esperado</div>
              <div className="text-xl font-bold" style={{ color: '#8336FF' }}>{formatCurrency(projection.expectedCost)}</div>
              <div className="text-xs text-gray-500">Promedio</div>
            </div>
            <div className="text-center p-2 bg-gray-100 border border-gray-300">
              <div className="text-xs font-semibold mb-1 text-gray-600">Pesimista</div>
              <div className="text-lg font-bold" style={{ color: '#ef4444' }}>{formatCurrency(projection.pessimisticCost)}</div>
              <div className="text-xs text-gray-500">+30%</div>
            </div>
          </div>
          <p className="text-xs text-center text-gray-600">Basado en {projection.conversationsPerMonth} conversaciones/mes · {projection.avgTurnsPerConversation} turnos promedio</p>
        </div>

        {/* Desglose de mensajes */}
        <div className="mb-4">
          <h3 className="text-sm font-bold mb-2 pb-1 border-b border-gray-300" style={{ fontFamily: 'Poppins, sans-serif' }}>Desglose de Mensajes Mensuales</h3>
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="text-left py-1">Tipo de Mensaje</th>
                <th className="text-right py-1">Cantidad</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="py-1">Mensajes de texto</td>
                <td className="text-right font-mono">{projection.textMessages.toLocaleString()}</td>
              </tr>
              {projection.audioMessages > 0 && (
                <tr className="border-b border-gray-200">
                  <td className="py-1">Mensajes de audio</td>
                  <td className="text-right font-mono">{projection.audioMessages.toLocaleString()}</td>
                </tr>
              )}
              {projection.imageMessages > 0 && (
                <tr className="border-b border-gray-200">
                  <td className="py-1">Mensajes con imagen</td>
                  <td className="text-right font-mono">{projection.imageMessages.toLocaleString()}</td>
                </tr>
              )}
              {projection.documentMessages > 0 && (
                <tr className="border-b border-gray-200">
                  <td className="py-1">Mensajes con documento</td>
                  <td className="text-right font-mono">{projection.documentMessages.toLocaleString()}</td>
                </tr>
              )}
              <tr className="border-t-2 border-gray-800 font-bold">
                <td className="py-1">TOTAL MENSAJES</td>
                <td className="text-right font-mono text-sm" style={{ color: '#8336FF' }}>{projection.totalMessages.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Paquete recomendado */}
        <div className="mb-4 p-3 bg-gray-100 border-2 border-gray-800">
          <h3 className="text-sm font-bold mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>Paquete Recomendado</h3>
          <div className="text-xs">
            <p className="mb-1"><strong>Paquete:</strong> {recommendedPackage.messages.toLocaleString()} mensajes</p>
            <p className="mb-1"><strong>Precio:</strong> {formatCurrency(recommendedPackage.price)}</p>
            <p className="mb-1"><strong>Vigencia:</strong> {recommendedPackage.expiration}</p>
            <p><strong>Costo por mensaje:</strong> ${recommendedPackage.pricePerMsg} COP</p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-3 border-t-2 border-gray-300 text-center text-xs text-gray-600">
          <p className="mb-1"><strong>CloserCat</strong> - Automatización de WhatsApp con IA</p>
          <p>www.closercat.com · contacto@closercat.com</p>
          <p className="mt-2 text-xs">Esta cotización es válida por 30 días a partir de la fecha de emisión.</p>
        </div>
      </div>
    );
  };

  // Step 5: Resultados con proyección PERT (vista web)
  const renderResults = () => {
    if (!projection) return null;

    const recommendedPackage = PACKAGES.find(pkg => pkg.messages >= projection.totalMessages) || PACKAGES[PACKAGES.length - 1];

    return (
      <div>
        {/* Vista web (oculta al imprimir) */}
        <div className="print:hidden">
          {/* Botón discreto de impresión en la parte superior (solo en pantalla) */}
          <div className="flex justify-end mb-4">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-gray-300 rounded-lg font-poppins font-medium text-gray-700 hover:bg-gray-50"
            >
              <span>🖨️</span>
              <span>Imprimir cotización</span>
            </button>
          </div>

          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-green-100 rounded-full mb-4">
              <span className="text-4xl">✅</span>
            </div>
            <h3 className="text-2xl font-poppins font-bold mb-2" style={{ color: '#121212' }}>
              Tu cotización personalizada
            </h3>
            <p className="font-inter text-sm" style={{ color: '#6b7280' }}>
              Hola {formData.name}, aquí está tu análisis completo
            </p>
          </div>

          {/* Proyección PERT */}
          <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border-2 border-purple-200">
            <h4 className="font-poppins font-bold mb-4 text-center" style={{ color: '#121212' }}>
              Proyección de Inversión Mensual (PERT)
            </h4>

            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div className="text-center p-4 bg-green-100 rounded-lg">
                <div className="text-xs font-poppins font-semibold mb-1" style={{ color: '#6b7280' }}>
                  Escenario Optimista
                </div>
                <div className="text-2xl font-mono font-bold" style={{ color: '#10b981' }}>
                  {formatCurrency(projection.optimisticCost)}
                </div>
                <div className="text-xs font-inter mt-1" style={{ color: '#6b7280' }}>-20% del base</div>
              </div>

              <div className="text-center p-4 bg-purple-100 rounded-lg border-2 border-purple-400">
                <div className="text-xs font-poppins font-semibold mb-1" style={{ color: '#6b7280' }}>
                  Costo Esperado
                </div>
                <div className="text-3xl font-mono font-bold" style={{ color: '#8336FF' }}>
                  {formatCurrency(projection.expectedCost)}
                </div>
                <div className="text-xs font-inter mt-1" style={{ color: '#6b7280' }}>Promedio ponderado</div>
              </div>

              <div className="text-center p-4 bg-red-100 rounded-lg">
                <div className="text-xs font-poppins font-semibold mb-1" style={{ color: '#6b7280' }}>
                  Escenario Pesimista
                </div>
                <div className="text-2xl font-mono font-bold" style={{ color: '#ef4444' }}>
                  {formatCurrency(projection.pessimisticCost)}
                </div>
                <div className="text-xs font-inter mt-1" style={{ color: '#6b7280' }}>+30% del base</div>
              </div>
            </div>

            <p className="text-xs text-center font-inter" style={{ color: '#6b7280' }}>
              💡 Proyección basada en {projection.conversationsPerMonth} conversaciones/mes con {projection.avgTurnsPerConversation} turnos promedio
            </p>
          </div>

          {/* Desglose de mensajes */}
          <div className="mb-8 p-6 bg-white rounded-xl border border-gray-200">
            <h4 className="font-poppins font-bold mb-4" style={{ color: '#121212' }}>
              Desglose de mensajes mensuales
            </h4>

            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-inter text-sm">💬 Mensajes de texto</span>
                <span className="font-mono font-bold">{projection.textMessages.toLocaleString()}</span>
              </div>
              {projection.audioMessages > 0 && (
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-inter text-sm">🎤 Mensajes de audio</span>
                  <span className="font-mono font-bold">{projection.audioMessages.toLocaleString()}</span>
                </div>
              )}
              {projection.imageMessages > 0 && (
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-inter text-sm">🖼️ Mensajes con imagen</span>
                  <span className="font-mono font-bold">{projection.imageMessages.toLocaleString()}</span>
                </div>
              )}
              {projection.documentMessages > 0 && (
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-inter text-sm">📄 Mensajes con documento</span>
                  <span className="font-mono font-bold">{projection.documentMessages.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between items-center p-3 bg-purple-100 rounded-lg border-2 border-purple-300">
                <span className="font-poppins font-bold">Total mensajes</span>
                <span className="font-mono font-bold text-xl" style={{ color: '#8336FF' }}>
                  {projection.totalMessages.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Paquete recomendado */}
          <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border-2 border-purple-200">
            <div className="flex items-start gap-4">
              <div className="text-4xl">💡</div>
              <div className="flex-1">
                <h4 className="font-poppins font-bold mb-2" style={{ color: '#121212' }}>
                  Paquete Recomendado
                </h4>
                <p className="font-inter text-sm mb-3" style={{ color: '#4b5563' }}>
                  <strong>{recommendedPackage.messages.toLocaleString()} mensajes</strong> por {formatCurrency(recommendedPackage.price)}
                </p>
                <p className="font-inter text-xs" style={{ color: '#6b7280' }}>
                  Expira en {recommendedPackage.expiration} · ${recommendedPackage.pricePerMsg}/mensaje
                </p>
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex gap-4">
            <button
              onClick={() => {
                setStep('simulator');
                setHasAutoPrinted(false);
              }}
              className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-lg font-poppins font-semibold text-gray-700 hover:bg-gray-50"
            >
              ← Recalcular
            </button>
            <button
              onClick={handleRequestDemo}
              className="flex-1 px-6 py-3 rounded-lg font-poppins font-bold text-white"
              style={{ background: 'linear-gradient(135deg, #08C4F4 0%, #8336FF 100%)' }}
            >
              Ver demostración
            </button>
          </div>
        </div>

        {/* Vista de impresión (oculta en pantalla) */}
        {renderPrintView()}
      </div>
    );
  };

  return (
    <>
      <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 shadow-lg">
        {step === 'simulator' && renderSimulator()}
        {step === 'multimedia' && renderMultimedia()}
        {step === 'volume' && renderVolume()}
        {step === 'form' && renderForm()}
        {step === 'results' && renderResults()}
      </div>

      {/* Modal de confirmación de demo */}
      {showDemoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl animate-fadeIn">
            <div className="text-center">
              <div className="inline-block p-4 bg-green-100 rounded-full mb-4">
                <span className="text-5xl">✅</span>
              </div>
              <h3 className="text-2xl font-poppins font-bold mb-3" style={{ color: '#121212' }}>
                ¡Demo solicitada!
              </h3>
              <p className="font-inter text-base mb-6" style={{ color: '#4b5563' }}>
                Te enviamos un correo a <strong>{formData.email}</strong> con un video demostrativo de la plataforma.
              </p>
              <p className="font-inter text-sm mb-6" style={{ color: '#6b7280' }}>
                Revisa tu bandeja de entrada en los próximos minutos. Si no lo ves, verifica tu carpeta de spam.
              </p>
              <button
                onClick={() => setShowDemoModal(false)}
                className="w-full px-6 py-3 rounded-lg font-poppins font-bold text-white"
                style={{ background: 'linear-gradient(135deg, #08C4F4 0%, #8336FF 100%)' }}
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
