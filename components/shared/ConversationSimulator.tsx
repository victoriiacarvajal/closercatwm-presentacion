import React, { useState, useEffect, useRef } from 'react';
import { clarityEvent, getUtmParams } from '../../utils/tracking';
import { TeamStructureData } from '../../types';

interface ConversationTurn {
  id: string;
  speaker: 'customer' | 'ai';
  message: string;
  type?: 'text' | 'audio' | 'image' | 'document';
  mediaLabel?: string;
  isIaResponse?: boolean;
}

interface DemoStep extends ConversationTurn {
  delayMs: number;
}

const DEMO_SCRIPT: DemoStep[] = [
  { id: '1', speaker: 'customer', message: 'Hola, información de precios', type: 'text', delayMs: 1000 },
  { id: '2', speaker: 'ai', message: '¡Hola! Claro que sí. Tenemos planes desde $19K COP. ¿Te gustaría ver el detalle por industria?', type: 'text', isIaResponse: true, delayMs: 1500 },
  { id: '3', speaker: 'customer', message: 'Client sends audio', type: 'audio', mediaLabel: '🎤 Audio (15s) recibido', delayMs: 2500 },
  { id: '4', speaker: 'ai', message: 'Entendido. Procesando tu consulta de audio... 🎧', type: 'text', isIaResponse: true, delayMs: 1500 },
  { id: '5', speaker: 'customer', message: 'Client sends photo', type: 'image', mediaLabel: '🖼️ Foto de producto recibida', delayMs: 2000 },
  { id: '6', speaker: 'ai', message: 'Veo que es un repuesto industrial. Procesando especificaciones...', type: 'text', isIaResponse: true, delayMs: 1500 },
  { id: '7', speaker: 'customer', message: 'Customer sends manual', type: 'document', mediaLabel: '📄 Manual.pdf (3 páginas)', delayMs: 2000 },
  { id: '8', speaker: 'ai', message: 'Leído 📚. El manual de 3 páginas ha sido procesado exitosamente por la IA.', type: 'text', isIaResponse: true, delayMs: 1500 },
  { id: '9', speaker: 'ai', message: 'Te he enviado la cotización oficial al correo. 🚀', type: 'text', isIaResponse: true, delayMs: 1500 },
];

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
  totalSetupCost: number;
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

const getTeamMultiplier = (reps: number): number => {
  if (reps <= 5) return 0.00;
  if (reps <= 10) return 0.10;
  if (reps <= 20) return 0.20;
  if (reps <= 50) return 0.30;
  return 0.50;
};

const STRATEGY_FACTORS: Record<string, number> = {
  decentralized: 1.0,
  transition: 1.15,
  mixed: 1.25,
  institutional: 1.40,
};

const REP_BASE_FEE = 19000;
const PERSONAL_LINE_FEE = 10000; // Fee por sincronización/custodia de línea personal
const INSTITUTIONAL_LINE_FEE = 0; // Sin cobro mensual para líneas API
const INSTITUTIONAL_SETUP_FEE = 450000;
const RESIDUAL_COST = 3;

const INTEGRATION_COSTS: Record<string, { monthly: number; setup: number }> = {
  crm_saas: { monthly: 0, setup: 300000 },
  crm_custom: { monthly: 500000, setup: 2000000 }, // Legacy/A la medida
  erp_custom: { monthly: 800000, setup: 3500000 },
  custom_webhooks: { monthly: 0, setup: 300000 }
};

const SERVICES_COSTS = {
  campaign_msg: 66,
  custom_reports: 200000,
  migration_assisted: 800000,
  additional_line: 100000,
  onboarding: 600000
};

export default function ConversationSimulator() {
  const [step, setStep] = useState<'simulator' | 'multimedia' | 'volume' | 'teamStructure' | 'form' | 'results'>('simulator');

  // Animation State
  const [animationStatus, setAnimationStatus] = useState<'idle' | 'playing' | 'completed'>('idle');
  const [visibleMessages, setVisibleMessages] = useState<ConversationTurn[]>([]);
  const [iaResponseCount, setIaResponseCount] = useState(0);
  const [estimatedAvgTurns, setEstimatedAvgTurns] = useState(6); // Default estimation
  const [iaDelegationPercentage, setIaDelegationPercentage] = useState(70);
  const [showEstimationModal, setShowEstimationModal] = useState(false);

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
    numberOfSalesReps: 5,
    whatsappOwnership: 'sellers',
    repsPerLine: 1,
    managementStrategy: 'decentralized',
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

  // Cargar script de Calendly (Original Logic)
  useEffect(() => {
    const head = document.querySelector('head');
    if (!document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]')) {
      const script = document.createElement('script');
      script.setAttribute('src', 'https://assets.calendly.com/assets/external/widget.js');
      head?.appendChild(script);

      const style = document.createElement('link');
      style.setAttribute('rel', 'stylesheet');
      style.setAttribute('href', 'https://assets.calendly.com/assets/external/widget.css');
      head?.appendChild(style);
    }
  }, []);

  const [hasAutoPrinted, setHasAutoPrinted] = useState(false);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [visibleMessages]);

  const startSimulation = () => {
    setAnimationStatus('playing');
    setVisibleMessages([]);
    setIaResponseCount(0);

    let currentStepIndex = 0;

    const playNextStep = () => {
      if (currentStepIndex >= DEMO_SCRIPT.length) {
        setAnimationStatus('completed');
        return;
      }

      const stepData = DEMO_SCRIPT[currentStepIndex];

      setTimeout(() => {
        setVisibleMessages(prev => [...prev, stepData]);

        if (stepData.isIaResponse) {
          setIaResponseCount(prev => prev + 1);
        } else if (stepData.type === 'document' && stepData.mediaLabel?.includes('3 páginas')) {
          setIaResponseCount(prev => prev + 3);
        }

        currentStepIndex++;
        playNextStep();
      }, stepData.delayMs);
    };

    playNextStep();
  };

  const calculateProjection = (monthlyConversations: number, teamData: TeamStructureData) => {
    const aiTurns = estimatedAvgTurns;
    const totalMonthlyMessages = monthlyConversations * aiTurns;

    // Split traffic: IA vs Residual (Custody)
    const iaTrafficMessages = Math.round(totalMonthlyMessages * (iaDelegationPercentage / 100));
    const residualTrafficMessages = totalMonthlyMessages - iaTrafficMessages;

    // IA Distribution based on multimedia mix
    const audioMessages = Math.round(iaTrafficMessages * (multimediaStats.audioPercentage / 10));
    const imageMessages = Math.round(iaTrafficMessages * (multimediaStats.imagePercentage / 10));
    const documentMessages = Math.round(iaTrafficMessages * (multimediaStats.documentPercentage / 10));
    const textMessages = iaTrafficMessages - audioMessages - imageMessages - documentMessages;

    // Audio cost proportional to duration (assuming base cost is for ~60s)
    const audioDurationRatio = (multimediaStats.audioAvgMinutes || 60) / 60; // Now stores seconds
    const adjustedAudioCost = COSTS.audio * audioDurationRatio;

    const iaCost = (textMessages * COSTS.text) + (audioMessages * adjustedAudioCost) + (imageMessages * COSTS.image) + (documentMessages * COSTS.document);
    const residualCost = residualTrafficMessages * RESIDUAL_COST;

    const baseCost = iaCost + residualCost;

    const teamMultiplier = getTeamMultiplier(teamData.numberOfSalesReps);
    const adjustedBaseCost = baseCost * (1 + teamMultiplier);

    // Fee de Líneas (Sincronización vs Control Total)
    let lineMonthlyFee = 0;
    let lineSetupFee = 0;

    if (teamData.whatsappOwnership === 'sellers') {
      // Líneas personales: solo fee de sincronización ($10k)
      lineMonthlyFee = teamData.numberOfSalesReps * PERSONAL_LINE_FEE;
    } else if (teamData.whatsappOwnership === 'company') {
      // Líneas institucionales: fee de mantenimiento ($40k) + setup ($450k)
      const numLines = Math.ceil(teamData.numberOfSalesReps / teamData.repsPerLine);
      lineMonthlyFee = numLines * INSTITUTIONAL_LINE_FEE;
      lineSetupFee = numLines * INSTITUTIONAL_SETUP_FEE;
    } else if (teamData.whatsappOwnership === 'mixed') {
      // Mix: Mitad personales, mitad institucionales (aprox)
      const institutionalReps = Math.ceil(teamData.numberOfSalesReps / 2);
      const personalReps = teamData.numberOfSalesReps - institutionalReps;

      const numInstitutionalLines = Math.ceil(institutionalReps / teamData.repsPerLine);

      lineMonthlyFee = (personalReps * PERSONAL_LINE_FEE) + (numInstitutionalLines * INSTITUTIONAL_LINE_FEE);
      lineSetupFee = numInstitutionalLines * INSTITUTIONAL_SETUP_FEE;
    }

    let integrationMonthlyCost = 0;
    let integrationSetupCost = 0;

    teamData.integrationsNeeded.forEach(integration => {
      const integrationConfig = INTEGRATION_COSTS[integration];
      if (integrationConfig) {
        integrationMonthlyCost += integrationConfig.monthly;
        integrationSetupCost += integrationConfig.setup;
      }
    });

    let servicesMonthlyCost = 0;
    let servicesSetupCost = 0;

    if (teamData.needsCampaigns && teamData.campaignContacts && teamData.campaignsPerMonth) {
      const campaignMsgsPerMonth = teamData.campaignContacts * teamData.campaignsPerMonth;
      servicesMonthlyCost += campaignMsgsPerMonth * SERVICES_COSTS.campaign_msg;
    }
    if (teamData.needsCustomReports) {
      servicesMonthlyCost += SERVICES_COSTS.custom_reports;
    }
    if (teamData.needsMigrationAssistance) {
      servicesSetupCost += SERVICES_COSTS.migration_assisted;
    }
    if (teamData.needsOnboarding) {
      servicesSetupCost += SERVICES_COSTS.onboarding;
    }

    // Totales separados
    const totalMonthlyCost = adjustedBaseCost + lineMonthlyFee + integrationMonthlyCost + servicesMonthlyCost;
    const totalSetupCost = lineSetupFee + integrationSetupCost + servicesSetupCost;

    let discountedBaseCost = adjustedBaseCost;
    let volumeDiscountApplied = false;

    if (totalMonthlyMessages >= 500000) {
      discountedBaseCost = totalMonthlyMessages * 122; // Example volume logic
      // In a real scenario, adjust this based on the specific volume buckets
    }

    const volumeDiscount = 0; // Simplified for now
    const finalMonthlyCost = totalMonthlyCost;

    const costForPERT = finalMonthlyCost;
    const optimisticCost = Math.round(costForPERT * 0.9);
    const pessimisticCost = Math.round(costForPERT * 1.1);
    const expectedCost = costForPERT;

    // Return the full projection object
    return {
      conversationsPerMonth: monthlyConversations,
      avgTurnsPerConversation: aiTurns * 2,
      textMessages,
      audioMessages,
      imageMessages,
      documentMessages,
      totalMessages: totalMonthlyMessages,
      baseCost,
      teamMultiplier,
      adjustedBaseCost,
      integrationMonthlyCost,
      totalIntegrationCost: integrationMonthlyCost, // For compatibility
      integrationSetupAmortized: 0, // No amortizing
      servicesCost: servicesMonthlyCost,
      totalServicesCost: servicesMonthlyCost,
      servicesSetupAmortized: 0,
      volumeDiscount,
      volumeDiscountApplied,
      totalMonthlyCost: finalMonthlyCost,
      totalSetupCost,
      pessimisticCost,
      optimisticCost,
      expectedCost
    };
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.whatsapp || !formData.email) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    try {
      const params = new URLSearchParams(window.location.search);
      const utm = getUtmParams(params);

      const payload = {
        event: 'simulator_submit',
        action: 'simulator_quote',
        created_at: new Date().toISOString(),
        page_url: window.location.href,
        user_agent: navigator.userAgent,
        utm,
        lead: formData,
        simulation: {
          estimatedAvgTurns,
          multimediaStats,
          teamStructure: {
            ...teamStructure,
            numberOfSalesReps: teamStructure.numberOfSalesReps,
            whatsappOwnership: teamStructure.whatsappOwnership,
            managementStrategy: teamStructure.managementStrategy,
            repsPerLine: teamStructure.repsPerLine
          },
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
        action: 'request_demo_calendly',
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

      clarityEvent('simulator_demo_calendly_click');

      // @ts-ignore
      if (window.Calendly) {
        // @ts-ignore
        window.Calendly.initPopupWidget({
          url: 'https://calendly.com/rogertovalle/30min?hide_gdpr_banner=1&primary_color=8336ff',
          prefill: {
            name: formData.name,
            email: formData.email,
            customAnswers: {
              a1: "CloserCat Pro - Cliente",
            }
          }
        });
      } else {
        window.open('https://calendly.com/rogertovalle/30min', '_blank');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleContinueToMultimedia = () => {
    setShowEstimationModal(false);
    setStep('multimedia');
  };

  const handleContinueToVolume = () => {
    clarityEvent('simulator_multimedia_completed');
    setStep('volume');
  };

  const handleContinueToTeamStructure = () => {
    if (conversationsPerMonth < 1) {
      alert('Por favor ingresa un volumen válido');
      return;
    }
    clarityEvent('simulator_volume_completed');
    setStep('teamStructure');
  };

  const handleContinueToForm = () => {
    const projectionData = calculateProjection(conversationsPerMonth, teamStructure);
    // Logic from original file to ensure volume discount check logic
    setProjection(projectionData);
    clarityEvent('simulator_team_structure_completed');
    setStep('form');
  };

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

  const renderProgressStepper = () => (
    <div className="flex items-center justify-between mb-8 px-4 overflow-x-auto">
      {[1, 2, 3, 4].map((s) => (
        <div key={s} className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold min-w-[2rem] ${(step === 'simulator' && s === 1) ||
            (step === 'multimedia' && s === 2) ||
            (step === 'volume' && s === 3) ||
            (step === 'teamStructure' && s === 4)
            ? 'bg-purple-600 text-white'
            : 'bg-gray-200 text-gray-500'
            }`}>
            {s}
          </div>
          {s < 4 && <div className="w-8 md:w-16 h-1 bg-gray-200 mx-1 md:mx-2" />}
        </div>
      ))}
      <div className="text-sm font-poppins font-semibold text-gray-600 ml-4 hidden md:block">
        {step === 'simulator' && 'Paso 1: ¿Qué cobramos?'}
        {step === 'multimedia' && 'Paso 2: Multimedia'}
        {step === 'volume' && 'Paso 3: Tu Volumen'}
        {step === 'teamStructure' && 'Paso 4: Tu Equipo'}
      </div>
    </div>
  );

  const renderSimulator = () => (
    <div className="relative">
      {/* Estimation Modal Overlay */}
      {showEstimationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-fade-in backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 w-full max-w-sm relative">
            <button
              onClick={() => setShowEstimationModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                📊
              </div>
              <h3 className="text-xl font-bold font-poppins text-gray-900 mb-2">Tu Estimación</h3>
              <p className="text-sm text-gray-600 mb-6 font-inter">
                Basado en la simulación, ¿cuántos mensajes de IA crees que respondes por venta?
              </p>

              <div className="flex items-center justify-center gap-4 mb-8">
                <button
                  onClick={() => setEstimatedAvgTurns(prev => Math.max(1, prev - 1))}
                  className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold text-xl transition-colors"
                >
                  -
                </button>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-600 font-mono">{estimatedAvgTurns}</div>
                  <div className="text-xs text-gray-400 uppercase tracking-widest mt-1">Mensajes</div>
                </div>
                <button
                  onClick={() => setEstimatedAvgTurns(prev => prev + 1)}
                  className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold text-xl transition-colors"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleContinueToMultimedia}
                className="w-full py-4 rounded-xl font-poppins font-bold text-white shadow-lg transform transition-all hover:scale-105 active:scale-95"
                style={{ background: 'linear-gradient(135deg, #08C4F4 0%, #8336FF 100%)' }}
              >
                Continuar al Paso 2 →
              </button>
            </div>
          </div>
        </div>
      )}

      <h3 className="text-2xl font-poppins font-bold mb-2" style={{ color: '#121212' }}>
        Paso 1: Entiende cómo calculamos el costo
      </h3>
      <p className="font-inter text-sm mb-6" style={{ color: '#6b7280' }}>
        En CloserCat pagas por el consumo de la IA. Mira esta simulación para entender qué cuenta.
      </p>

      <div className="mb-8 border border-gray-200 rounded-xl overflow-hidden bg-gray-50 flex flex-col md:flex-row min-h-[400px] md:h-[400px]">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col md:border-r border-gray-200 min-h-[300px] md:min-h-0">
          <div className="bg-white p-3 border-b border-gray-200 flex justify-between items-center shadow-sm z-10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs">👤</div>
              <div className="text-sm font-bold text-gray-700">Cliente Potencial</div>
            </div>
            <div className="text-xs text-gray-400">En línea</div>
          </div>

          <div ref={chatScrollRef} className="flex-1 p-3 md:p-4 overflow-y-auto space-y-3 md:space-y-4 bg-pattern relative">
            {animationStatus === 'idle' && (
              <div className="h-full flex flex-col items-center justify-center text-center p-4 md:p-6 bg-white/50 backdrop-blur-sm">
                <div className="text-4xl md:text-5xl mb-4 md:mb-6 animate-pulse">🎬</div>
                <h4 className="text-base md:text-lg font-bold text-gray-800 mb-2">Simulación de Ventas</h4>
                <p className="text-gray-500 text-xs md:text-sm mb-4 md:mb-6 max-w-xs mx-auto">
                  Dale play para ver cómo la IA gestiona texto, audio, imágenes y documentos en tiempo real.
                </p>
                <button
                  onClick={startSimulation}
                  className="px-6 md:px-8 py-2.5 md:py-3 bg-purple-600 text-white rounded-full font-bold hover:bg-purple-700 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 text-sm md:text-base"
                >
                  ▶️ Iniciar Ahora
                </button>
              </div>
            )}

            {visibleMessages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.speaker === 'customer' ? 'justify-start' : 'justify-end'} animate-fade-in`}>
                <div className={`max-w-[85%] md:max-w-[75%] rounded-2xl p-2.5 md:p-3 shadow-sm text-sm md:text-base ${msg.speaker === 'customer'
                  ? 'bg-white border border-gray-100 text-gray-800 rounded-bl-none'
                  : 'bg-purple-600 text-white rounded-br-none'
                  }`}>
                  {msg.type === 'audio' ? (
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs md:text-sm">▶️</div>
                      <div>
                        <div className="h-1 w-20 md:w-24 bg-gray-200 rounded mb-1"></div>
                        <span className="text-xs italic opacity-70">{msg.mediaLabel || 'Audio'}</span>
                      </div>
                    </div>
                  ) : msg.type === 'image' ? (
                    <div>
                      <div className="w-full h-24 md:h-32 bg-gray-200 rounded-lg mb-2 flex items-center justify-center text-3xl md:text-4xl">🖼️</div>
                      <span className="text-xs italic opacity-70 block">{msg.mediaLabel || 'Imagen'}</span>
                    </div>
                  ) : msg.type === 'document' ? (
                    <div className="flex items-center gap-2 md:gap-3 bg-opacity-10 bg-white p-1 rounded">
                      <div className="text-xl md:text-2xl">📄</div>
                      <span className="text-xs font-semibold underline">{msg.mediaLabel || 'Documento'}</span>
                    </div>
                  ) : (
                    <p className="text-sm leading-relaxed">{msg.message}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Counters Area */}
        <div className="w-full md:w-64 bg-white p-4 md:p-6 flex flex-col justify-center items-center shadow-inner relative overflow-hidden border-t md:border-t-0 md:border-l border-gray-200">
          <div className="text-center z-10">
            <h4 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-3">Mensajes Consumidos</h4>
            <div className={`text-7xl font-mono font-bold transition-all duration-300 ${animationStatus === 'playing' ? 'scale-110 text-purple-600' : 'text-gray-900'}`}>
              {iaResponseCount}
            </div>
            <p className="text-xs text-purple-600 font-semibold mt-2 bg-purple-50 px-2 py-1 rounded-full">
              Respuestas IA + Páginas
            </p>
          </div>

          {animationStatus === 'completed' && (
            <div className="mt-8 w-full animate-fade-in z-10">
              <div className="bg-yellow-50 border border-yellow-100 p-3 rounded-lg text-left mb-4">
                <p className="text-[10px] text-yellow-800 leading-tight">
                  💡 <strong>Insight:</strong> Procesamos audios, imágenes y PDFs automáticamente. Todo suma al contador de consumo.
                </p>
              </div>
              <button
                onClick={() => setShowEstimationModal(true)}
                className="w-full py-3 rounded-xl font-poppins font-bold text-white shadow-md transform transition-all hover:scale-105 active:scale-95"
                style={{ background: 'linear-gradient(135deg, #08C4F4 0%, #8336FF 100%)' }}
              >
                Calcular mi volumen →
              </button>
            </div>
          )}

          {/* Background decoration */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-32 h-32 bg-purple-50 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-32 h-32 bg-blue-50 rounded-full blur-3xl opacity-50"></div>
        </div>
      </div>
    </div>
  );

  const renderMultimedia = () => (
    <div>
      <h3 className="text-2xl font-poppins font-bold mb-2" style={{ color: '#121212' }}>
        Paso 2: Multimedia en tus conversaciones
      </h3>
      <p className="font-inter text-sm mb-8" style={{ color: '#6b7280' }}>
        De los {estimatedAvgTurns} mensajes estimados, ¿cómo se distribuye el contenido?
      </p>

      <div className="space-y-6">
        {/* Audio */}
        <div className="p-6 bg-gray-50 rounded-xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🎤</span>
            <div className="flex-1">
              <h4 className="font-poppins font-bold text-gray-900">Mensajes de audio</h4>
              <p className="text-xs font-inter text-gray-500">Notas de voz del cliente</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                De cada 10 conversaciones, ¿cuántas incluyen audio?
              </label>
              <input
                type="number"
                min="0"
                max="10"
                value={multimediaStats.audioPercentage / 10}
                onChange={(e) => setMultimediaStats({ ...multimediaStats, audioPercentage: Math.min(100, Math.max(0, parseInt(e.target.value) * 10)) })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>
            {multimediaStats.audioPercentage > 0 && (
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">
                  Duración promedio del audio (segundos)
                </label>
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={multimediaStats.audioAvgMinutes} // We reuse the variable name but now treat it as seconds
                  onChange={(e) => setMultimediaStats({ ...multimediaStats, audioAvgMinutes: Math.max(1, parseInt(e.target.value) || 0) })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
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
              <h4 className="font-poppins font-bold text-gray-900">Imágenes</h4>
              <p className="text-xs font-inter text-gray-500">Fotos de productos, capturas</p>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              De cada 10 conversaciones, ¿cuántas incluyen imágenes?
            </label>
            <input
              type="number"
              min="0"
              max="10"
              value={multimediaStats.imagePercentage / 10}
              onChange={(e) => setMultimediaStats({ ...multimediaStats, imagePercentage: Math.min(100, Math.max(0, parseInt(e.target.value) * 10)) })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>
        </div>

        {/* Documentos */}
        <div className="p-6 bg-gray-50 rounded-xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">📄</span>
            <div className="flex-1">
              <h4 className="font-poppins font-bold text-gray-900">Documentos</h4>
              <p className="text-xs font-inter text-gray-500">PDFs, contratos, presentaciones</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                De cada 10 conversaciones, ¿cuántas incluyen documentos?
              </label>
              <input
                type="number"
                min="0"
                max="10"
                value={multimediaStats.documentPercentage / 10}
                onChange={(e) => setMultimediaStats({ ...multimediaStats, documentPercentage: Math.min(100, Math.max(0, parseInt(e.target.value) * 10)) })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>
            {multimediaStats.documentPercentage > 0 && (
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">
                  Páginas promedio por documento
                </label>
                <input
                  type="number"
                  min="1"
                  value={multimediaStats.documentAvgPages}
                  onChange={(e) => setMultimediaStats({ ...multimediaStats, documentAvgPages: Math.max(1, parseInt(e.target.value) || 1) })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 flex gap-4">
        <button onClick={() => setStep('simulator')} className="flex-1 px-6 py-3 border border-gray-300 rounded-lg font-bold text-gray-600">
          ← Volver
        </button>
        <button
          onClick={handleContinueToVolume}
          className="flex-1 px-6 py-3 rounded-lg font-bold text-white bg-gradient-to-r from-blue-500 to-purple-600"
        >
          Continuar →
        </button>
      </div>
    </div>
  );

  const renderVolume = () => (
    <div>
      <h3 className="text-2xl font-poppins font-bold mb-2" style={{ color: '#121212' }}>
        Paso 3: Tu Volumen Estimado
      </h3>
      <p className="font-inter text-sm mb-8" style={{ color: '#6b7280' }}>
        ¿Cuántas conversaciones (leads/consultas) gestionas al mes?
      </p>

      <div className="p-10 bg-gradient-to-br from-purple-50 to-white rounded-xl border border-purple-200 shadow-sm text-center">
        <label className="block text-4xl font-bold text-purple-900 mb-6">
          {conversationsPerMonth}
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

      {/* Delegación IA */}
      <div className="mt-10 p-8 bg-white border border-gray-100 rounded-2xl shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h4 className="font-poppins font-bold text-gray-900">Estrategia de Automatización</h4>
            <p className="text-xs text-gray-500">¿Qué porcentaje de tus conversaciones delegarás a la IA?</p>
          </div>
          <div className="text-right">
            <span className="text-3xl font-mono font-bold text-purple-600">{iaDelegationPercentage}%</span>
            <span className="block text-[10px] text-gray-400 uppercase tracking-wider">IA Activa</span>
          </div>
        </div>

        <input
          type="range"
          min="10"
          max="100"
          step="5"
          value={iaDelegationPercentage}
          onChange={(e) => setIaDelegationPercentage(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
        />

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="p-3 bg-purple-50 rounded-xl border border-purple-100">
            <p className="text-[10px] font-bold text-purple-400 uppercase mb-1">Automatización</p>
            <p className="text-xs text-purple-700">La IA gestiona, califica y cierra por ti.</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
            <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Custodia Humana</p>
            <p className="text-xs text-gray-600">Gestión de humanos con datos organizados y custodia.</p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex gap-4">
        <button onClick={() => setStep('multimedia')} className="flex-1 px-6 py-3 border border-gray-300 rounded-lg font-bold text-gray-600">
          ← Volver
        </button>
        <button
          onClick={handleContinueToTeamStructure}
          className="flex-1 px-6 py-3 rounded-lg font-bold text-white bg-gradient-to-r from-blue-500 to-purple-600"
        >
          Continuar →
        </button>
      </div>
    </div>
  );

  const renderTeamStructure = () => (
    <div>
      <h3 className="text-2xl font-poppins font-bold mb-2" style={{ color: '#121212' }}>
        Paso 4: Estructura de tu equipo comercial
      </h3>
      <p className="font-inter text-sm mb-8" style={{ color: '#6b7280' }}>
        Cuéntanos sobre tu operación para darte una cotización precisa
      </p>

      <div className="space-y-6">
        {/* Número de comerciales */}
        <div className="p-6 bg-gray-50 rounded-xl">
          <label className="block text-sm font-poppins font-semibold mb-3" style={{ color: '#121212' }}>
            ¿Cuántos comerciales usan WhatsApp para vender?
          </label>
          <div className="flex items-center gap-4">
            <input
              type="number"
              min="1"
              max="200"
              value={teamStructure.numberOfSalesReps}
              onChange={(e) => setTeamStructure({ ...teamStructure, numberOfSalesReps: parseInt(e.target.value) || 1 })}
              className="w-32 px-4 py-3 border border-gray-300 rounded-lg font-mono text-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <span className="text-sm font-inter text-gray-500">comerciales activos</span>
          </div>
        </div>

        {/* Propiedad de las líneas */}
        <div className="p-6 bg-gray-50 rounded-xl">
          <label className="block text-sm font-poppins font-semibold mb-3" style={{ color: '#121212' }}>
            ¿De quién son las líneas de WhatsApp que se usarán?
          </label>
          <div className="space-y-2">
            {[
              { id: 'sellers', label: 'Son personales de los vendedores' },
              { id: 'company', label: 'Son de la empresa' },
              { id: 'mixed', label: 'Un mix (algunas personales, otras de empresa)' }
            ].map((option) => (
              <label key={option.id} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="whatsappOwnership"
                  value={option.id}
                  checked={teamStructure.whatsappOwnership === option.id}
                  onChange={(e) => setTeamStructure({ ...teamStructure, whatsappOwnership: e.target.value as any })}
                  className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-sm font-inter text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Vinculación por línea (solo si son de empresa o mix) */}
        {(teamStructure.whatsappOwnership === 'company' || teamStructure.whatsappOwnership === 'mixed') && (
          <div className="p-6 bg-purple-50 border border-purple-100 rounded-xl">
            <label className="block text-sm font-poppins font-semibold mb-3" style={{ color: '#121212' }}>
              En las líneas de empresa, ¿cuántos vendedores se vinculan a la misma línea?
            </label>
            <div className="flex items-center gap-4">
              <select
                value={teamStructure.repsPerLine}
                onChange={(e) => setTeamStructure({ ...teamStructure, repsPerLine: parseInt(e.target.value) })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg font-inter text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
              >
                {[1, 2, 3, 4, 5].map(num => (
                  <option key={num} value={num}>{num} {num === 1 ? 'vendedor' : 'vendedores'} por línea</option>
                ))}
              </select>
            </div>
            <p className="mt-2 text-xs text-gray-500 italic">Máximo 5 comerciales vinculados por línea para garantizar calidad.</p>
          </div>
        )}

        {/* Estrategia de gestión */}
        <div className="p-6 bg-gray-50 rounded-xl">
          <label className="block text-sm font-poppins font-semibold mb-3" style={{ color: '#121212' }}>
            ¿Cuál es tu estrategia de gestión para los próximos meses?
          </label>
          <div className="space-y-3">
            {[
              {
                id: 'decentralized',
                label: 'Mantener control exclusivo de vendedores',
                detail: 'Sin centralizar información, gestión exclusiva de cada comercial.'
              },
              {
                id: 'transition',
                label: 'Centralizar información con líneas propias',
                detail: 'Vendedores usan sus WhatsApps pero la empresa centraliza logs y posiciona una línea institucional.'
              },
              {
                id: 'mixed',
                label: 'Estrategia mixta controlada',
                detail: 'Control total de WhatsApps de vendedores e institucionales bajo supervisión.'
              },
              {
                id: 'institutional',
                label: 'Migrar 100% a línea institucional',
                detail: 'Toda la gestión se realiza a través de línea corporativa gestionada por la empresa.'
              }
            ].map((option) => (
              <label key={option.id} className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="managementStrategy"
                  value={option.id}
                  checked={teamStructure.managementStrategy === option.id}
                  onChange={(e) => setTeamStructure({ ...teamStructure, managementStrategy: e.target.value as any })}
                  className="mt-1 w-4 h-4 text-purple-600 focus:ring-purple-500"
                />
                <div>
                  <span className="block text-sm font-bold text-gray-800">{option.label}</span>
                  <span className="block text-xs text-gray-500 mt-1">{option.detail}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Integraciones */}
        <div className="p-6 bg-gray-50 rounded-xl">
          <label className="block text-sm font-poppins font-semibold mb-3" style={{ color: '#121212' }}>
            ¿Necesitas integraciones? (Opcional)
          </label>
          <div className="space-y-2">
            {[
              { id: 'crm_custom', label: 'CRM Personalizado / Hubspot / Salesforce' },
              { id: 'erp_custom', label: 'ERP / Sistema Administrativo' },
              { id: 'custom_webhooks', label: 'Webhooks Personalizados' }
            ].map((option) => (
              <label key={option.id} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="checkbox"
                  value={option.id}
                  checked={teamStructure.integrationsNeeded.includes(option.id)}
                  onChange={(e) => {
                    const newIntegrations = e.target.checked
                      ? [...teamStructure.integrationsNeeded, option.id]
                      : teamStructure.integrationsNeeded.filter(id => id !== option.id);
                    setTeamStructure({ ...teamStructure, integrationsNeeded: newIntegrations });
                  }}
                  className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-sm font-inter text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Campañas */}
        <div className="p-6 bg-gray-50 rounded-xl">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={teamStructure.needsCampaigns}
              onChange={(e) => setTeamStructure({ ...teamStructure, needsCampaigns: e.target.checked })}
              className="w-5 h-5 text-purple-600 focus:ring-purple-500 rounded"
            />
            <span className="text-sm font-poppins font-semibold" style={{ color: '#121212' }}>
              ¿Planeas enviar campañas masivas?
            </span>
          </label>

          {teamStructure.needsCampaigns && (
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-inter text-gray-600 mb-1">Contactos por campaña</label>
                <input
                  type="number"
                  placeholder="Ej: 1000"
                  value={teamStructure.campaignContacts || ''}
                  onChange={(e) => setTeamStructure({ ...teamStructure, campaignContacts: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-inter text-gray-600 mb-1">Campañas al mes</label>
                <input
                  type="number"
                  placeholder="Ej: 2"
                  value={teamStructure.campaignsPerMonth || ''}
                  onChange={(e) => setTeamStructure({ ...teamStructure, campaignsPerMonth: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 flex gap-4">
        <button
          onClick={() => setStep('volume')}
          className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-lg font-poppins font-semibold text-gray-700 hover:bg-gray-50"
        >
          ← Volver
        </button>
        <button
          onClick={handleContinueToForm}
          className="flex-1 px-6 py-3 rounded-lg font-poppins font-bold text-white bg-gradient-to-r from-blue-500 to-purple-600"
        >
          Ver Resultado →
        </button>
      </div>
    </div>
  );

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

    const today = new Date().toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' });

    return (

      <div className="hidden print:block fixed top-0 left-0 w-full h-full bg-white z-[9999]" style={{ margin: 0, padding: '20px' }}>
        <style dangerouslySetInnerHTML={{
          __html: `
          @media print {
            body * {
              visibility: hidden;
            }
            .print\\:block, .print\\:block * {
              visibility: visible;
            }
            .print\\:block {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
            }
            @page {
              size: auto;
              margin: 0mm;
            }
          }
        `}} />
        {/* Header con logo y datos */}
        <div className="flex justify-between items-start mb-4 pb-3 border-b-2 border-gray-300">
          <div>
            <img src="/logo-closercat.png" alt="CloserCat" className="h-8 mb-1" />
            <p className="text-xs text-gray-600">Automatización de WhatsApp para Equipos Comerciales</p>
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

        {/* Estructura del Equipo */}
        <div className="mb-4">
          <h3 className="text-sm font-bold mb-2 pb-1 border-b border-gray-300" style={{ fontFamily: 'Poppins, sans-serif' }}>Estructura del Equipo</h3>
          <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-xs">
            <div><strong>Comerciales:</strong> {teamStructure.numberOfSalesReps}</div>
            <div><strong>Integraciones:</strong> {teamStructure.integrationsNeeded.length > 0 ? teamStructure.integrationsNeeded.map(i => i.replace('_', ' ')).join(', ') : 'Ninguna'}</div>
            <div><strong>Industria:</strong> {teamStructure.industry || 'No especificada'}</div>
            <div><strong>Uso Principal:</strong> {teamStructure.primaryUseCase}</div>
          </div>
        </div>

        {/* Desglose de Inversión Mensual */}
        <div className="mb-4">
          <h3 className="text-sm font-bold mb-2 pb-1 border-b border-gray-300" style={{ fontFamily: 'Poppins, sans-serif' }}>Desglose de Inversión Mensual Estimada</h3>
          <table className="w-full text-xs">
            <tbody>
              <tr>
                <td className="py-1">Costo Base Operativo (Mensajes + IA)</td>
                <td className="text-right py-1">{formatCurrency(projection.adjustedBaseCost)}</td>
              </tr>
              {projection.totalIntegrationCost > 0 && (
                <tr>
                  <td className="py-1">Integraciones y Conectividad</td>
                  <td className="text-right py-1">{formatCurrency(projection.totalIntegrationCost)}</td>
                </tr>
              )}
              {projection.totalServicesCost > 0 && (
                <tr>
                  <td className="py-1">Servicios a Demanda (Campañas, Reportes)</td>
                  <td className="text-right py-1">{formatCurrency(projection.totalServicesCost)}</td>
                </tr>
              )}
              {projection.volumeDiscountApplied && projection.volumeDiscount > 0 && (
                <tr className="text-green-600 font-semibold">
                  <td className="py-1">Descuento por Volumen Aplicado</td>
                  <td className="text-right py-1">-{formatCurrency(projection.volumeDiscount)}</td>
                </tr>
              )}
              <tr className="font-bold border-t border-gray-300 bg-gray-50">
                <td className="py-2 pl-2">Inversión Mensual Esperada</td>
                <td className="text-right py-2 pr-2" style={{ color: '#8336FF', fontSize: '12px' }}>{formatCurrency(projection.expectedCost)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Proyección PERT */}
        <div className="mb-4">
          <h3 className="text-sm font-bold mb-2 pb-1 border-b border-gray-300" style={{ fontFamily: 'Poppins, sans-serif' }}>Escenarios de Inversión (PERT)</h3>
          <div className="grid grid-cols-3 gap-2 mb-2">
            <div className="text-center p-2 bg-gray-100 border border-gray-300">
              <div className="text-xs font-semibold mb-1 text-gray-600">Optimista</div>
              <div className="text-lg font-bold" style={{ color: '#10b981' }}>{formatCurrency(projection.optimisticCost)}</div>
              <div className="text-xs text-gray-500">-20%</div>
            </div>
            <div className="text-center p-2 bg-white border-2 border-purple-500 rounded relative">
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-purple-500 text-white text-[9px] px-2 rounded-full">RECOMENDADO</div>
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
          <p className="text-[9px] text-gray-500 italic mt-1">
            * El escenario esperado es un promedio ponderado basado en patrones de uso típicos.
          </p>
          <div className="mt-4 p-2 bg-gray-50 border border-gray-200 rounded text-[9px] text-gray-500 text-justify">
            <strong>Nota legal:</strong> Este documento es una simulación preliminar de costos basada en la información suministrada por el usuario. No constituye una oferta comercial vinculante ni un contrato de servicios. Los valores finales pueden variar según las condiciones técnicas específicas, volumen real de uso y términos negociados en la propuesta formal. La contratación efectiva requiere validación de requisitos y firma de contrato de servicios con CloserCat S.A.S.
          </div>
        </div>

        <div className="text-xs text-gray-500 border-t border-gray-300 pt-2 mt-4 text-center">
          <p>Validez de la oferta: 15 días. Sujeto a Términos y Condiciones de CloserCat.</p>
          <p>Generado automáticamente el {today}.</p>
        </div>
      </div>
    );
  };

  const renderResults = () => {
    if (!projection) return null;

    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
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

        {/* Proyección PERT (Original Design) */}
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
              <div className="text-xs font-inter mt-1" style={{ color: '#6b7280' }}>-10% del esperado</div>
            </div>

            <div className="text-center p-4 bg-purple-100 rounded-lg border-2 border-purple-400 relative transform scale-105 shadow-md">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white text-[10px] uppercase font-bold px-2 py-1 rounded-full">
                Recomendado
              </div>
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
              <div className="text-xs font-inter mt-1" style={{ color: '#6b7280' }}>+10% del esperado</div>
            </div>
          </div>
        </div>

        {/* Desglose de Inversión Mensual */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Mensualidad Recurrente */}
          <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
            <h4 className="font-poppins font-bold mb-4 text-purple-900 border-b border-purple-100 pb-2">
              Mensualidad Recurrente
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center py-1">
                <span className="font-inter text-gray-600">Base Operativa (IA + Residual)</span>
                <span className="font-mono font-bold">{formatCurrency(projection.adjustedBaseCost)}</span>
              </div>
              {projection.integrationMonthlyCost > 0 && (
                <div className="flex justify-between items-center py-1">
                  <span className="font-inter text-gray-600">Integraciones</span>
                  <span className="font-mono font-bold">{formatCurrency(projection.integrationMonthlyCost)}</span>
                </div>
              )}
              {projection.servicesCost > 0 && (
                <div className="flex justify-between items-center py-1">
                  <span className="font-inter text-gray-600">Servicios Adicionales</span>
                  <span className="font-mono font-bold">{formatCurrency(projection.servicesCost)}</span>
                </div>
              )}
              <div className="flex justify-between items-center pt-3 mt-2 border-t border-gray-100">
                <span className="font-bold text-gray-900">Total Mensual</span>
                <span className="font-mono font-bold text-lg text-purple-600">{formatCurrency(projection.expectedCost)}</span>
              </div>
            </div>
          </div>

          {/* Pago Único (Setup) */}
          <div className="p-6 bg-blue-50 rounded-xl border border-blue-100 shadow-sm">
            <h4 className="font-poppins font-bold mb-4 text-blue-900 border-b border-blue-200 pb-2">
              Pago Único (Setup Inicial)
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center py-1">
                <span className="font-inter text-blue-800">Habilitación de Infraestructura</span>
                <span className="font-mono font-bold text-blue-900">
                  {formatCurrency(projection.totalSetupCost - (SERVICES_COSTS.migration_assisted * (teamStructure.needsMigrationAssistance ? 1 : 0)) - (SERVICES_COSTS.onboarding * (teamStructure.needsOnboarding ? 1 : 0)))}
                </span>
              </div>
              {(teamStructure.needsMigrationAssistance || teamStructure.needsOnboarding) && (
                <div className="flex justify-between items-center py-1">
                  <span className="font-inter text-blue-800">Servicios de Onboarding</span>
                  <span className="font-mono font-bold text-blue-900">
                    {formatCurrency((SERVICES_COSTS.migration_assisted * (teamStructure.needsMigrationAssistance ? 1 : 0)) + (SERVICES_COSTS.onboarding * (teamStructure.needsOnboarding ? 1 : 0)))}
                  </span>
                </div>
              )}
              <div className="flex justify-between items-center pt-3 mt-2 border-t border-blue-200">
                <span className="font-bold text-blue-900">Total Setup</span>
                <span className="font-mono font-bold text-lg text-blue-700">{formatCurrency(projection.totalSetupCost)}</span>
              </div>
            </div>
            <p className="mt-4 text-[10px] text-blue-600 italic leading-tight">
              Incluye configuración de líneas, webhooks, entrenamiento inicial y puesta en marcha.
            </p>
          </div>
        </div>

        {/* Botones de acción (Original Layout Restored) */}
        <div className="flex gap-4 print:hidden">
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
            className="flex-1 px-6 py-3 rounded-lg font-poppins font-bold text-white transition-all hover:scale-105 shadow-lg flex items-center justify-center gap-2"
            style={{ background: 'linear-gradient(135deg, #08C4F4 0%, #8336FF 100%)' }}
          >
            Agendar Demostración
          </button>
        </div>

        <div className="mt-4 text-center print:hidden">
          <button
            onClick={() => window.print()}
            className="text-sm text-gray-500 hover:text-purple-600 underline"
          >
            🖨️ Descargar cotización en PDF
          </button>
        </div>

        {/* Vista de impresión (oculta en pantalla) */}
        <div className="hidden print:block">
          {renderPrintView()}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl border-2 border-gray-200 p-4 md:p-8 shadow-lg max-w-5xl mx-auto">
      {step !== 'results' && step !== 'form' && renderProgressStepper()}
      {step === 'simulator' && renderSimulator()}
      {step === 'multimedia' && renderMultimedia()}
      {step === 'volume' && renderVolume()}
      {step === 'teamStructure' && renderTeamStructure()}
      {step === 'form' && renderForm()}
      {step === 'results' && renderResults()}
    </div>
  );
}
