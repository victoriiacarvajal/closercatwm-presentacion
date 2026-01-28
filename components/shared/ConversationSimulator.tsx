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
  costPerConversation: number;
  iaTrafficMessages: number;
  residualTrafficMessages: number;
  conversionRate: number;
  avgTicket: number;
  incrementalRev10: number;
  incrementalRev20: number;
  incrementalRev30: number;
  incrementalROI10: number;
  incrementalROI20: number;
  incrementalROI30: number;
  annualRevenuePotential: number;
  iaPercentage: number;
  humanPercentage: number;
  estimatedRevenue: number; // Baseline Revenue
  metaMarketingCost: number; // Costo directo a Meta (Passthrough)
}

interface ScenarioData {
  conversionRate: number;
  revenue: number;
  cost: number;
  netAdditionalRevenue: number;
}

interface PeriodProjection {
  period: string;
  conversations: number;
  statusQuo: {
    revenue: number;
  };
  withCloserCat: {
    optimistic: ScenarioData;
    recommended: ScenarioData;
    highImpact: ScenarioData;
  };
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
  campaign: 66,
  meta_marketing: 60 // Costo directo Meta (USD/COP aprox)
};

const getTeamMultiplier = (reps: number): number => {
  if (reps <= 5) return 0.00;
  if (reps <= 10) return 0.10;
  if (reps <= 20) return 0.20;
  if (reps <= 50) return 0.30;
  return 0.50;
};

const REP_BASE_FEE = 19000;
const PERSONAL_LINE_FEE = 25000; // Fee por protocolo WhatsApp Web
const INSTITUTIONAL_LINE_FEE = 0; // Sin cobro mensual para líneas API
const INSTITUTIONAL_SETUP_FEE = 450000;
const HISTORICAL_MSG_COST = 50; // Costo por mensaje histórico (Parsing + Embedding)
const RESIDUAL_COST = 3;

const VALUE_ADDED_SERVICES_COSTS = {
  custom_prompting: 250000,
  market_analysis: 450000,
  kb_tramo1_block: 40000, // Por cada 500 items extra (hasta 2000)
  kb_tramo2_block: 120000 // Por cada 1000 items extra (mas de 2000)
};

const SERVICES_COSTS = {
  campaign_msg: 66,
  migration_assisted: 800000,
  additional_line: 100000,
  onboarding: 600000
};

// Helper para calcular costo de KB variable
const calculateKbCost = (items: number | undefined): number => {
  const safeItems = items || 500; // Default to 500 if undefined
  let totalExtra = 0;

  // Base incluida: 500 items. Si es menor o igual, costo es 0.
  if (safeItems <= 500) return 0;

  // Tramo 1: De 501 a 2000 items (Bloques de 500 a $40k)
  // Max items en este tramo: 1500 (2000 - 500 base)
  const itemsInTramo1 = Math.min(safeItems, 2000) - 500;
  if (itemsInTramo1 > 0) {
    const blocksTramo1 = Math.ceil(itemsInTramo1 / 500);
    totalExtra += blocksTramo1 * VALUE_ADDED_SERVICES_COSTS.kb_tramo1_block;
  }

  // Tramo 2: Más de 2000 items (Bloques de 1000 a $120k)
  if (safeItems > 2000) {
    const itemsInTramo2 = safeItems - 2000;
    const blocksTramo2 = Math.ceil(itemsInTramo2 / 1000);
    totalExtra += blocksTramo2 * VALUE_ADDED_SERVICES_COSTS.kb_tramo2_block;
  }

  return totalExtra;
};

export default function ConversationSimulator() {
  const [step, setStep] = useState<'simulator' | 'multimedia' | 'volume' | 'teamStructure' | 'integrations' | 'form' | 'results'>('simulator');

  // Safe State Migration: Ensure new fields exist if loaded from stale state
  useEffect(() => {
    setTeamStructure(prev => ({
      ...prev,
      kbItems: prev.kbItems || 500,
      promptingType: prev.promptingType || 'standard',
      needsMarketAnalysis: prev.needsMarketAnalysis || false
    }));
  }, []);

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
  const [conversionRate, setConversionRate] = useState<number>(5); // Default 5%
  const [avgTicket, setAvgTicket] = useState<number>(50000); // Default 50k
  const [monthlyGrowthRate, setMonthlyGrowthRate] = useState<number>(10); // Default 10% monthly growth for projections
  const [projection, setProjection] = useState<ProjectionData | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<'quarterly' | 'monthly' | 'annual'>('quarterly');

  const [teamStructure, setTeamStructure] = useState<TeamStructureData>({
    numberOfSalesReps: 5,
    whatsappOwnership: 'sellers',
    repsPerLine: 1,
    managementStrategy: 'decentralized',

    // Default Service Config
    kbItems: 500,
    promptingType: 'standard',
    needsMarketAnalysis: false,

    needsCampaigns: false,
    campaignContacts: 0,
    campaignsPerMonth: 0,
    needsCustomReports: false,
    needsMigrationAssistance: false,
    needsOnboarding: false,
    industry: '',
    primaryUseCase: '',
    operationDescription: '',
    linesToMigrate: 0,
    migrationHistoryMonths: 3,
    migrationContactsPerLine: 500,
    migrationAvgMsgsPerContact: 50
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

    /* REMOVED: Team Multiplier Logic - transitioning to explicit line costs
    const teamMultiplier = getTeamMultiplier(teamData.numberOfSalesReps);
    const adjustedBaseCost = baseCost * (1 + teamMultiplier); 
    */
    const adjustedBaseCost = baseCost; // No multiplier, direct message/process costs.

    const teamMultiplier = 0; // Keeping variable for legacy return compatibility if needed

    // Fee de Líneas (Protocolo Web $25k vs Institucional $0 + Setup)
    let lineMonthlyFee = 0;
    let lineSetupFee = 0;

    const personalLines = teamData.personalLinesCount || 0;
    const institutionalLines = teamData.institutionalLinesCount || 0;

    switch (teamData.managementStrategy) {
      case 'decentralized':
        // Estrategia Descentralizada: Control exclusivo de vendedor.
        // Operan paralelo con 1 línea institucional (solo setup). No fee mensual por personales.
        lineMonthlyFee = 0;
        lineSetupFee = 1 * INSTITUTIONAL_SETUP_FEE;
        break;

      case 'mixed':
        // Estrategia Mixta: Se cobran las personales ($25k) + 1 Línea Institucional (Setup)
        lineMonthlyFee = personalLines * PERSONAL_LINE_FEE;
        lineSetupFee = 1 * INSTITUTIONAL_SETUP_FEE;
        break;

      case 'institutional':
        // Estrategia Institucional: Setup según cantidad de líneas definidas en inventario
        // Si no definió líneas institucionales, asumimos al menos 1
        const linesToSetup = institutionalLines > 0 ? institutionalLines : 1;
        lineMonthlyFee = 0; // $0 monthly
        lineSetupFee = linesToSetup * INSTITUTIONAL_SETUP_FEE;
        break;

      default:
        // Fallback
        lineMonthlyFee = personalLines * PERSONAL_LINE_FEE;
    }

    // Nuevos Servicios de Valor Agregado (Monthly)
    const kbCost = calculateKbCost(teamData.kbItems || 500);
    const promptingCost = teamData.promptingType === 'custom' ? VALUE_ADDED_SERVICES_COSTS.custom_prompting : 0;
    const marketAnalysisCost = teamData.needsMarketAnalysis ? VALUE_ADDED_SERVICES_COSTS.market_analysis : 0;

    const valueAddedServicesMonthly = kbCost + promptingCost + marketAnalysisCost;

    // Servicios Adicionales (Setup & One-Time)
    // Removed old custom_reports logic as it is replaced by market_analysis (recurring)
    // kept migration and onboarding
    const migrationCost = (SERVICES_COSTS.migration_assisted * (teamData.needsMigrationAssistance ? 1 : 0));
    const onboardingCost = (SERVICES_COSTS.onboarding * (teamData.needsOnboarding ? 1 : 0));

    const servicesMonthlyCost = 0; // Legacy placeholder if needed, now rolled into valueAddedServices
    let servicesSetupCost = migrationCost + onboardingCost;

    // Fee de Integraciones (Legacy removed)
    const integrationMonthlyCost = valueAddedServicesMonthly; // Mapping for compatibility
    const integrationSetupCost = 0; // No setup for these new recurring services

    let metaMarketingCost = 0; // Costo directo a Meta

    if (teamData.needsCampaigns && teamData.campaignContacts && teamData.campaignsPerMonth) {
      const campaignMsgsPerMonth = teamData.campaignContacts * teamData.campaignsPerMonth;
      // servicesMonthlyCost += campaignMsgsPerMonth * SERVICES_COSTS.campaign_msg; // Moved to total calc below or keep separate
      metaMarketingCost += campaignMsgsPerMonth * COSTS.meta_marketing; // Costo Meta (Passthrough)
    }

    // Migration Logic: History Enrichment
    // Formula: Lines * Contacts * Msgs/Contact * Cost
    // Sólo aplica para estrategias Mixta o Institucional
    const isMigrationAllowed = teamData.managementStrategy === 'mixed' || teamData.managementStrategy === 'institutional';

    // Adjusted Migration Setup Logic
    if (isMigrationAllowed && teamData.needsMigrationAssistance && teamData.linesToMigrate) {
      const contacts = teamData.migrationContactsPerLine || 500;
      const msgsPerContact = teamData.migrationAvgMsgsPerContact || 50;
      const totalHistoricalMsgs = teamData.linesToMigrate * contacts * msgsPerContact;
      servicesSetupCost += totalHistoricalMsgs * HISTORICAL_MSG_COST;
    }

    // Totales separados
    const totalMonthlyCost = adjustedBaseCost + lineMonthlyFee + valueAddedServicesMonthly + (teamData.needsCampaigns ? (teamData.campaignContacts * teamData.campaignsPerMonth * SERVICES_COSTS.campaign_msg) : 0);

    const totalSetupCost = lineSetupFee + servicesSetupCost;

    let discountedBaseCost = adjustedBaseCost;
    let volumeDiscountApplied = false;

    if (totalMonthlyMessages >= 500000) {
      discountedBaseCost = totalMonthlyMessages * 122; // Example volume logic
      // In a real scenario, adjust this based on the specific volume buckets
    }

    const volumeDiscount = adjustedBaseCost - discountedBaseCost;
    if (volumeDiscount > 0) volumeDiscountApplied = true;

    // Calculamos ROI y Crecimiento basado en el costo total mensual (CloserCat + Meta opcional?)
    // Para ser conservadores, deberíamos restar también el costo de marketing de los ingresos incrementales
    // si queremos utilidad neta real.
    const totalOperationalCost = totalMonthlyCost + metaMarketingCost;

    // let discountedBaseCost = adjustedBaseCost;
    // let volumeDiscountApplied = false;

    // if (totalMonthlyMessages >= 500000) {
    //   discountedBaseCost = totalMonthlyMessages * 122; // Example volume logic
    //   // In a real scenario, adjust this based on the specific volume buckets
    // }

    // const volumeDiscount = 0; // Simplified for now
    // const finalMonthlyCost = totalMonthlyCost;
    const optimisticCost = Math.round(totalOperationalCost * 0.9);
    const pessimisticCost = Math.round(totalOperationalCost * 1.1);
    const expectedCost = totalOperationalCost;

    const iaPercentage = iaDelegationPercentage;
    const humanPercentage = 100 - iaPercentage;
    const costPerConversation = monthlyConversations > 0 ? expectedCost / monthlyConversations : 0;

    // ROI Calculations (Restructured for Incremental Impact: 10%, 20%, 30% rel. improvements)
    const baselineRevenue = (monthlyConversations * (conversionRate / 100)) * avgTicket;

    // Scenario 1: +10% Relative Improvement
    const convRate10 = (conversionRate * 1.1) / 100;
    const rev10 = monthlyConversations * convRate10 * avgTicket;
    const incrementalRev10 = Math.max(0, rev10 - baselineRevenue);
    const incrementalROI10 = expectedCost > 0 ? (incrementalRev10 / expectedCost) * 100 : 0;

    // Scenario 2: +20% Relative Improvement (Standard / Recommended)
    const convRate20 = (conversionRate * 1.2) / 100;
    const rev20 = monthlyConversations * convRate20 * avgTicket;
    const incrementalRev20 = Math.max(0, rev20 - baselineRevenue);
    const incrementalROI20 = expectedCost > 0 ? (incrementalRev20 / expectedCost) * 100 : 0;

    // Scenario 3: +30% Relative Improvement (High Impact)
    const convRate30 = (conversionRate * 1.3) / 100;
    const rev30 = monthlyConversations * convRate30 * avgTicket;
    const incrementalRev30 = Math.max(0, rev30 - baselineRevenue);
    const incrementalROI30 = expectedCost > 0 ? (incrementalRev30 / expectedCost) * 100 : 0;

    // Annual Growth Projection (Compound Volume Growth)
    let annualRevenuePotential = 0;
    const growthFactor = 1 + (monthlyGrowthRate / 100);
    const targetConvRate = convRate20; // Use 20% scenario for annual potential

    for (let month = 0; month < 12; month++) {
      const monthVolume = monthlyConversations * Math.pow(growthFactor, month);
      annualRevenuePotential += monthVolume * targetConvRate * avgTicket;
    }

    // Return the full projection object
    return {
      conversationsPerMonth: monthlyConversations,
      avgTurnsPerConversation: estimatedAvgTurns,
      textMessages,
      audioMessages,
      imageMessages,
      documentMessages,
      totalMessages: totalMonthlyMessages,
      baseCost,
      teamMultiplier,
      adjustedBaseCost,
      integrationMonthlyCost,
      integrationSetupAmortized: integrationSetupCost > 0 ? integrationSetupCost / 12 : 0,
      totalIntegrationCost: integrationMonthlyCost,
      servicesCost: servicesMonthlyCost,
      servicesSetupAmortized: servicesSetupCost > 0 ? servicesSetupCost / 12 : 0,
      totalServicesCost: servicesMonthlyCost,
      volumeDiscount,
      volumeDiscountApplied,
      totalMonthlyCost, // Suscripción CloserCat
      metaMarketingCost, // Costo directo Meta (Extra)
      totalSetupCost,
      pessimisticCost,
      optimisticCost,
      expectedCost,
      costPerConversation,
      iaTrafficMessages,
      residualTrafficMessages,
      iaPercentage,
      humanPercentage,
      conversionRate,
      avgTicket,
      estimatedRevenue: baselineRevenue,
      incrementalRev10,
      incrementalRev20,
      incrementalRev30,
      incrementalROI10,
      incrementalROI20,
      incrementalROI30,
      annualRevenuePotential
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

  /*
  useEffect(() => {
    if (step === 'results' && !hasAutoPrinted) {
      const timer = setTimeout(() => {
        window.print();
        setHasAutoPrinted(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [step, hasAutoPrinted]);
  */

  // Helper: Format period labels (Q1, Q2, Mes 1, etc.)
  const formatPeriodLabel = (index: number, periodType: 'monthly' | 'quarterly' | 'annual'): string => {
    switch (periodType) {
      case 'monthly':
        return `Mes ${index + 1}`;
      case 'quarterly':
        return `Q${index + 1}`;
      case 'annual':
        return `Año ${index + 1}`;
      default:
        return `Período ${index + 1}`;
    }
  };

  // Helper: Calculate scaled cost based on volume growth
  const calculateScaledCost = (
    baseConversations: number,
    projectedConversations: number,
    baseMonthlyCost: number
  ): number => {
    if (baseConversations === 0) return baseMonthlyCost;
    const volumeRatio = projectedConversations / baseConversations;
    return baseMonthlyCost * volumeRatio;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Calculate temporal projection with growth scenarios
  const calculateTemporalProjection = (
    periods: number,
    periodType: 'monthly' | 'quarterly' | 'annual',
    projectionData: ProjectionData
  ): PeriodProjection[] => {
    const projections: PeriodProjection[] = [];
    const growthFactor = 1 + (monthlyGrowthRate / 100);

    // Determine months per period
    const monthsPerPeriod = {
      monthly: 1,
      quarterly: 3,
      annual: 12
    }[periodType];

    for (let p = 0; p < periods; p++) {
      const startMonth = p * monthsPerPeriod;
      const endMonth = startMonth + monthsPerPeriod;

      // Calculate accumulated conversations in the period
      let periodConversations = 0;
      for (let m = startMonth; m < endMonth; m++) {
        periodConversations += conversationsPerMonth * Math.pow(growthFactor, m);
      }

      // Status Quo (without CloserCat)
      const statusQuoRevenue = periodConversations * (projectionData.conversionRate / 100) * projectionData.avgTicket;

      // Calculate scaled cost for this period
      const avgConversationsInPeriod = periodConversations / monthsPerPeriod;
      const periodCost = calculateScaledCost(
        conversationsPerMonth,
        avgConversationsInPeriod,
        projectionData.totalMonthlyCost
      ) * monthsPerPeriod;

      // Scenarios with CloserCat
      const scenarios = [
        { name: 'optimistic', improvement: 1.1 },
        { name: 'recommended', improvement: 1.2 },
        { name: 'highImpact', improvement: 1.3 }
      ];

      const optimisticData = (() => {
        const improvedConvRate = (projectionData.conversionRate * 1.1) / 100;
        const revenue = periodConversations * improvedConvRate * projectionData.avgTicket;
        return {
          conversionRate: projectionData.conversionRate * 1.1,
          revenue,
          cost: periodCost,
          netAdditionalRevenue: revenue - statusQuoRevenue - periodCost
        };
      })();

      const recommendedData = (() => {
        const improvedConvRate = (projectionData.conversionRate * 1.2) / 100;
        const revenue = periodConversations * improvedConvRate * projectionData.avgTicket;
        return {
          conversionRate: projectionData.conversionRate * 1.2,
          revenue,
          cost: periodCost,
          netAdditionalRevenue: revenue - statusQuoRevenue - periodCost
        };
      })();

      const highImpactData = (() => {
        const improvedConvRate = (projectionData.conversionRate * 1.3) / 100;
        const revenue = periodConversations * improvedConvRate * projectionData.avgTicket;
        return {
          conversionRate: projectionData.conversionRate * 1.3,
          revenue,
          cost: periodCost,
          netAdditionalRevenue: revenue - statusQuoRevenue - periodCost
        };
      })();

      projections.push({
        period: formatPeriodLabel(p, periodType),
        conversations: Math.round(periodConversations),
        statusQuo: { revenue: statusQuoRevenue },
        withCloserCat: {
          optimistic: optimisticData,
          recommended: recommendedData,
          highImpact: highImpactData
        }
      });
    }

    return projections;
  };

  const renderProgressStepper = () => (
    <div className="flex items-center justify-between mb-8 px-4 overflow-x-auto">
      {[1, 2, 3, 4, 5, 6].map((s) => (
        <div key={s} className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold min-w-[2rem] ${(step === 'simulator' && s === 1) ||
            (step === 'multimedia' && s === 2) ||
            (step === 'volume' && s === 3) ||
            (step === 'teamStructure' && s === 4) ||
            (step === 'integrations' && s === 5) ||
            (step === 'form' && s === 6)
            ? 'bg-purple-600 text-white'
            : 'bg-gray-200 text-gray-500'
            }`}>
            {s}
          </div>
          {s < 6 && <div className="w-8 md:w-16 h-1 bg-gray-200 mx-1 md:mx-2" />}
        </div>
      ))}
      <div className="text-sm font-poppins font-semibold text-gray-600 ml-4 hidden md:block">
        {step === 'simulator' && 'Paso 1: ¿Qué cobramos?'}
        {step === 'multimedia' && 'Paso 2: Multimedia'}
        {step === 'volume' && 'Paso 3: Tu Volumen'}
        {step === 'teamStructure' && 'Paso 4: Tu Equipo'}
        {step === 'integrations' && 'Paso 5: Servicios Extra'}
        {step === 'form' && 'Paso 6: Cotización'}
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

      <div className="grid md:grid-cols-2 gap-6 mt-10">
        <div className="p-8 bg-white border border-gray-100 rounded-2xl shadow-sm">
          <h4 className="font-poppins font-bold text-gray-900 mb-2">Tasa de Conversión</h4>
          <p className="text-xs text-gray-500 mb-6">¿Qué % de tus conversaciones cierran en venta?</p>
          <div className="text-center">
            <div className="text-3xl font-mono font-bold text-green-600 mb-4">{conversionRate}%</div>
            <input
              type="range"
              min="0.5"
              max="50"
              step="0.5"
              value={conversionRate}
              onChange={(e) => setConversionRate(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
            />
          </div>
        </div>

        <div className="p-8 bg-white border border-gray-100 rounded-2xl shadow-sm text-center">
          <h4 className="font-poppins font-bold text-gray-900 mb-2 text-left">Ticket Promedio</h4>
          <p className="text-xs text-gray-500 mb-6 text-left">Valor promedio de cada venta (COP)</p>
          <input
            type="number"
            min="0"
            value={avgTicket}
            onChange={(e) => setAvgTicket(Math.max(0, parseInt(e.target.value) || 0))}
            placeholder="Ej: 50000"
            className="w-full px-6 py-4 border-2 border-green-200 rounded-lg font-mono text-2xl text-center focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      <div className="mt-8 p-8 bg-indigo-50 border border-indigo-100 rounded-2xl shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h4 className="font-poppins font-bold text-indigo-900">Proyección de Escalabilidad</h4>
            <p className="text-xs text-indigo-700">¿Cuánto esperas incrementar mensualmente el volumen de conversaciones?</p>
          </div>
          <div className="text-right">
            <span className="text-3xl font-mono font-bold text-indigo-600">+{monthlyGrowthRate}%</span>
            <span className="block text-[10px] text-indigo-400 uppercase tracking-wider">Crecimiento / Mes</span>
          </div>
        </div>

        <input
          type="range"
          min="0"
          max="100"
          step="5"
          value={monthlyGrowthRate}
          onChange={(e) => setMonthlyGrowthRate(parseInt(e.target.value))}
          className="w-full h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
        />
        <p className="mt-4 text-[10px] text-indigo-400 italic">
          * Este dato se usará para proyectar el potencial de ingresos anual en la sección de resultados.
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
        {/* Inventario de Líneas */}
        <div className="p-6 bg-gray-50 rounded-xl">
          <label className="block text-sm font-poppins font-semibold mb-4" style={{ color: '#121212' }}>
            Inventario de conectividad actual (O deseada)
          </label>
          <div className="grid gap-6">
            {/* Líneas Personales */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">
                ¿Cuántos vendedores usarán su línea personal?
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  min="0"
                  value={teamStructure.personalLinesCount || 0}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 0;
                    const totalReps = val + (teamStructure.institutionalLinesCount || 0); // Simplified total
                    setTeamStructure({
                      ...teamStructure,
                      personalLinesCount: val,
                      numberOfSalesReps: totalReps
                    });
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg font-mono text-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <span className="text-sm font-inter text-gray-500 whitespace-nowrap">líneas personales</span>
              </div>
            </div>

            {/* Líneas Institucionales */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">
                ¿Cuántas líneas de WhatsApp Business API (Empresa) se habilitarán?
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  min="0"
                  value={teamStructure.institutionalLinesCount || 0}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 0;
                    const totalReps = (teamStructure.personalLinesCount || 0) + val; // Simplified total
                    setTeamStructure({
                      ...teamStructure,
                      institutionalLinesCount: val,
                      numberOfSalesReps: totalReps
                    });
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg font-mono text-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <span className="text-sm font-inter text-gray-500 whitespace-nowrap">líneas empresa</span>
              </div>
            </div>

            <p className="text-xs text-gray-400 italic">
              * El "Total de Comerciales" se calculará como la suma de estas líneas para efectos de volumen.
            </p>
          </div>
        </div>



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
                detail: 'Sin centralizar información (WhatsApps personales). Operación paralela con 1 línea institucional (Solo pagas Setup).'
              },
              {
                id: 'mixed',
                label: 'Estrategia Mixta Controlada',
                detail: 'Control total de WhatsApps (personales + empresa) bajo supervisión y centralización.'
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

          {/* Migración de Historial (Solo si Estrategia Mixta o Institucional) */}
          {(teamStructure.managementStrategy === 'mixed' || teamStructure.managementStrategy === 'institutional') && (
            <div className="p-6 bg-blue-50 border border-blue-100 rounded-xl mt-4 animate-fadeIn">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="needsMigrationAssistance"
                  checked={teamStructure.needsMigrationAssistance}
                  onChange={(e) => setTeamStructure({
                    ...teamStructure,
                    needsMigrationAssistance: e.target.checked,
                    linesToMigrate: e.target.checked && !teamStructure.linesToMigrate
                      ? (teamStructure.managementStrategy === 'mixed' ? 1 : Math.ceil(teamStructure.numberOfSalesReps))
                      : teamStructure.linesToMigrate
                  })}
                  className="mt-1 w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <div className="flex-1">
                  <label htmlFor="needsMigrationAssistance" className="block text-sm font-poppins font-semibold text-blue-900 cursor-pointer">
                    ¿Necesitas migrar el historial de chats existentes?
                  </label>
                  <p className="text-xs text-blue-600 mt-1">
                    Enriquecemos y estructuramos tu data actual (IA Vectorizada) para que sea consultable.
                  </p>

                  {teamStructure.needsMigrationAssistance && (
                    <div className="mt-4 grid gap-4 bg-white p-4 rounded-lg border border-blue-100 shadow-sm animate-fadeIn">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1">Líneas a Migrar</label>
                          <input
                            type="number"
                            min="1"
                            value={teamStructure.linesToMigrate || 0}
                            onChange={(e) => setTeamStructure({ ...teamStructure, linesToMigrate: parseInt(e.target.value) })}
                            className="w-full px-3 py-2 border border-gray-300 rounded text-sm outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1">Contactos prom. / línea</label>
                          <input
                            type="number"
                            min="10"
                            value={teamStructure.migrationContactsPerLine || 500}
                            onChange={(e) => setTeamStructure({ ...teamStructure, migrationContactsPerLine: parseInt(e.target.value) })}
                            className="w-full px-3 py-2 border border-gray-300 rounded text-sm outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Mensajes promedio por contacto (Total Histórico)</label>
                        <input
                          type="number"
                          min="10"
                          value={teamStructure.migrationAvgMsgsPerContact || 50}
                          onChange={(e) => setTeamStructure({ ...teamStructure, migrationAvgMsgsPerContact: parseInt(e.target.value) })}
                          className="w-full px-3 py-2 border border-gray-300 rounded text-sm outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        <p className="text-[10px] text-gray-400 mt-1 italic">
                          * Estimación para cálculo de costo de procesamiento y storage.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
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
          onClick={() => setStep('integrations')}
          className="flex-1 px-6 py-3 rounded-lg font-poppins font-bold text-white bg-gradient-to-r from-blue-500 to-purple-600"
        >
          Continuar (Integraciones) →
        </button>
      </div>
    </div>
  );

  const renderIntegrations = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-8">
        <div className="inline-block p-4 bg-purple-100 rounded-full mb-4">
          <span className="text-4xl">🧠</span>
        </div>
        <h3 className="text-2xl font-poppins font-bold mb-2" style={{ color: '#121212' }}>
          Paso 5: Servicios de Valor Agregado
        </h3>
        <p className="font-inter text-sm" style={{ color: '#6b7280' }}>
          Potencia tu IA con conocimientos extendidos y análisis de mercado
        </p>
      </div>

      <div className="max-w-xl mx-auto space-y-8">

        {/* 1. Asesoría de Prompting */}
        <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
          <label className="block text-sm font-poppins font-bold mb-4 flex items-center gap-2">
            <span>🎭 Personalidad y Entrenamiento (Prompting)</span>
          </label>
          <div className="grid sm:grid-cols-2 gap-4">
            <label className={`cursor-pointer p-4 rounded-lg border-2 transition-all ${teamStructure.promptingType === 'standard' ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-200'
              }`}>
              <input
                type="radio"
                name="prompting"
                className="hidden"
                checked={teamStructure.promptingType === 'standard'}
                onChange={() => setTeamStructure({ ...teamStructure, promptingType: 'standard' })}
              />
              <div className="text-sm font-bold text-gray-900 mb-1">IA Standard</div>
              <p className="text-xs text-gray-500">Configuración base (Ecommerce, B2B, Soporte).</p>
              <div className="mt-3 text-xs font-bold text-green-600">Incluido</div>
            </label>

            <label className={`cursor-pointer p-4 rounded-lg border-2 transition-all ${teamStructure.promptingType === 'custom' ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-200'
              }`}>
              <input
                type="radio"
                name="prompting"
                className="hidden"
                checked={teamStructure.promptingType === 'custom'}
                onChange={() => setTeamStructure({ ...teamStructure, promptingType: 'custom' })}
              />
              <div className="text-sm font-bold text-gray-900 mb-1">IA Custom / Híbrida</div>
              <p className="text-xs text-gray-500">Ajustes a medida, tono de voz específico y optimización mensual.</p>
              <div className="mt-3 text-xs font-bold text-purple-700">+{formatCurrency(VALUE_ADDED_SERVICES_COSTS.custom_prompting)}/mes</div>
            </label>
          </div>
        </div>

        {/* 2. Capacidad de Base de Conocimiento (Variable) */}
        <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <label className="block text-sm font-poppins font-bold flex items-center gap-2">
              <span>📚 Base de Conocimiento (Productos/FAQs)</span>
            </label>
            <div className="text-right">
              <span className="block text-2xl font-mono font-bold text-purple-600">
                {(teamStructure.kbItems || 500).toLocaleString()}
              </span>
              <span className="text-xs text-gray-400 uppercase">Ítems</span>
            </div>
          </div>

          <div className="mb-6">
            <input
              type="range"
              min="100"
              max="10000"
              step="100"
              value={teamStructure.kbItems || 500}
              onChange={(e) => setTeamStructure({ ...teamStructure, kbItems: parseInt(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-2 font-mono">
              <span>100</span>
              <span>2.5k</span>
              <span>5k</span>
              <span>7.5k</span>
              <span>10k+</span>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
            <div className="flex justify-between items-center text-sm py-1">
              <span className="text-gray-600">Base Incluida (500 items):</span>
              <span className="font-bold text-green-600">Gratis</span>
            </div>
            {(teamStructure.kbItems || 500) > 500 && (
              <div className="flex justify-between items-center text-sm py-1 mt-1 border-t border-gray-200 pt-2">
                <span className="text-gray-600">Capacidad Adicional:</span>
                <span className="font-bold text-purple-700">+{formatCurrency(calculateKbCost(teamStructure.kbItems || 500))}/mes</span>
              </div>
            )}
            <p className="text-[10px] text-gray-400 mt-2 italic leading-tight">
              * Tarifa dinámica: +$40k/bloque (hasta 2k) y +$120k/bloque (&gt;2k items).
            </p>
          </div>
        </div>

        {/* 3. Market Analysis (Reportes) */}
        <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
          <label className="flex items-start gap-4 cursor-pointer">
            <div className={`mt-1 w-5 h-5 rounded border flex items-center justify-center transition-colors ${teamStructure.needsMarketAnalysis ? 'bg-purple-600 border-purple-600' : 'border-gray-300 bg-white'
              }`}>
              {teamStructure.needsMarketAnalysis && <span className="text-white text-xs">✓</span>}
            </div>
            <input
              type="checkbox"
              className="hidden"
              checked={teamStructure.needsMarketAnalysis}
              onChange={(e) => setTeamStructure({ ...teamStructure, needsMarketAnalysis: e.target.checked })}
            />
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-sm text-gray-900">🔍 Intelligence Reports (Análisis de Mercado)</span>
                <span className="text-xs font-bold text-purple-700">+{formatCurrency(VALUE_ADDED_SERVICES_COSTS.market_analysis)}/mes</span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                Recibe mensualmente un reporte detallado con insights de tus conversaciones: oportunidades de producto, quejas recurrentes y efectividad comercial.
              </p>
            </div>
          </label>
        </div>

        {/* 4. Campañas (Legacy kept) */}
        <div className="p-6 bg-gray-50 rounded-xl border border-gray-100 shadow-sm">
          <label className="flex items-center gap-3 cursor-pointer mb-2">
            <input
              type="checkbox"
              checked={teamStructure.needsCampaigns}
              onChange={(e) => setTeamStructure({ ...teamStructure, needsCampaigns: e.target.checked })}
              className="w-5 h-5 text-purple-600 focus:ring-purple-500 rounded"
            />
            <span className="text-sm font-poppins font-semibold" style={{ color: '#121212' }}>
              ¿Planeas enviar campañas masivas de Marketing?
            </span>
          </label>

          {teamStructure.needsCampaigns && (
            <div className="mt-4 animate-fadeIn">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-inter text-gray-600 mb-1">Contactos por campaña</label>
                  <input
                    type="number"
                    min="1"
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
                    min="1"
                    placeholder="Ej: 2"
                    value={teamStructure.campaignsPerMonth || ''}
                    onChange={(e) => setTeamStructure({ ...teamStructure, campaignsPerMonth: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                  />
                </div>
              </div>

              <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 text-xs text-blue-800">
                <p className="font-bold mb-1">ℹ️ Nota sobre costos de Marketing</p>
                <ul className="list-disc pl-4 space-y-1">
                  <li><strong>CloserCat:</strong> Costo por gestión y procesamiento ({formatCurrency(SERVICES_COSTS.campaign_msg)}/msg).</li>
                  <li><strong>Meta (Facebook):</strong> Costo directo variable (~{formatCurrency(COSTS.meta_marketing)}/msg) que se paga directamente a Meta.</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 flex gap-4">
        <button
          onClick={() => setStep('teamStructure')}
          className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-lg font-poppins font-semibold text-gray-700 hover:bg-gray-50"
        >
          ← Volver
        </button>
        <button
          onClick={handleContinueToForm}
          className="flex-1 px-6 py-3 rounded-lg font-poppins font-bold text-white bg-gradient-to-r from-blue-500 to-purple-600"
        >
          Finalizar y Cotizar →
        </button>
      </div>
    </div>
  );

  const renderForm = () => (
    <div>
      <div className="text-center mb-8">
        <div className="inline-block p-4 bg-purple-100 rounded-full mb-4">
          <span className="text-4xl">🚀</span>
        </div>
        <h3 className="text-2xl font-poppins font-bold mb-2" style={{ color: '#121212' }}>
          Paso 6: Recibe tu cotización personalizada
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
            <div><strong>Prompting:</strong> {teamStructure.promptingType === 'custom' ? 'Custom' : 'Estándar'}</div>
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
                <td className="py-1">Costo Base Operativo (Mensajes + IA + Residual)</td>
                <td className="text-right py-1">{formatCurrency(projection.adjustedBaseCost)}</td>
              </tr>
              {/* Desglose de Servicios de Valor Agregado */}
              {(teamStructure.kbItems || 500) > 500 && (
                <tr>
                  <td className="py-1">Capacidad KB Adicional ({(teamStructure.kbItems || 500).toLocaleString()} items)</td>
                  <td className="text-right py-1">{formatCurrency(calculateKbCost(teamStructure.kbItems || 500))}</td>
                </tr>
              )}
              {teamStructure.promptingType === 'custom' && (
                <tr>
                  <td className="py-1">Asesoría de Prompting (Custom)</td>
                  <td className="text-right py-1">{formatCurrency(VALUE_ADDED_SERVICES_COSTS.custom_prompting)}</td>
                </tr>
              )}
              {teamStructure.needsMarketAnalysis && (
                <tr>
                  <td className="py-1">Intelligence Reports (Análisis de Mercado)</td>
                  <td className="text-right py-1">{formatCurrency(VALUE_ADDED_SERVICES_COSTS.market_analysis)}</td>
                </tr>
              )}
              {projection.servicesCost > 0 && (
                <tr>
                  {/* Fallback for other services currently 0 but keeping logic */}
                  <td className="py-1">Otros Servicios (Campañas)</td>
                  <td className="text-right py-1">{formatCurrency(projection.servicesCost)}</td>
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
                <td className="text-right py-2 pr-2" style={{ color: '#8336FF', fontSize: '10px' }}>{formatCurrency(projection.expectedCost)}</td>
              </tr>
              {projection.metaMarketingCost > 0 && (
                <tr className="bg-blue-50">
                  <td className="py-2 pl-2 flex items-center gap-1">
                    Pago Directo a Meta (Marketing)
                    <span className="text-[8px] text-blue-600 font-normal">* Variable aprox.</span>
                  </td>
                  <td className="text-right py-2 pr-2 text-gray-500">{formatCurrency(projection.metaMarketingCost)}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pago Único (Setup Inicial) en Impresión */}
        <div className="mb-4">
          <h3 className="text-sm font-bold mb-2 pb-1 border-b border-gray-300" style={{ fontFamily: 'Poppins, sans-serif' }}>Pago Único (Setup Inicial)</h3>
          <table className="w-full text-xs">
            <tbody>
              <tr>
                <td className="py-1">Habilitación de Infraestructura y Líneas</td>
                <td className="text-right py-1">
                  {formatCurrency(projection.totalSetupCost - (SERVICES_COSTS.migration_assisted * (teamStructure.needsMigrationAssistance ? 1 : 0)) - (SERVICES_COSTS.onboarding * (teamStructure.needsOnboarding ? 1 : 0)))}
                </td>
              </tr>
              {(teamStructure.needsMigrationAssistance || teamStructure.needsOnboarding) && (
                <tr>
                  <td className="py-1">Servicios de Onboarding y Migración</td>
                  <td className="text-right py-1">
                    {formatCurrency((SERVICES_COSTS.migration_assisted * (teamStructure.needsMigrationAssistance ? 1 : 0)) + (SERVICES_COSTS.onboarding * (teamStructure.needsOnboarding ? 1 : 0)))}
                  </td>
                </tr>
              )}
              <tr className="font-bold border-t border-gray-300 bg-blue-50">
                <td className="py-2 pl-2">Total Inversión Inicial (Setup)</td>
                <td className="text-right py-2 pr-2" style={{ color: '#1e40af', fontSize: '10px' }}>{formatCurrency(projection.totalSetupCost)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Análisis de Demanda y Eficiencia (Print View) */}
        <div className="mb-4">
          <h3 className="text-sm font-bold mb-2 pb-1 border-b border-gray-300" style={{ fontFamily: 'Poppins, sans-serif' }}>Análisis de Demanda y Eficiencia</h3>
          <div className="grid grid-cols-2 gap-4">
            <table className="w-full text-[10px] border-collapse">
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-1 text-gray-600">Mensajes Totales / mes</td>
                  <td className="text-right font-bold">{projection.totalMessages.toLocaleString()}</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-1 text-gray-600">Participación IA</td>
                  <td className="text-right font-bold text-purple-700">{projection.iaPercentage}% ({projection.iaTrafficMessages.toLocaleString()} msgs)</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-1 text-gray-600">Intervención Humana</td>
                  <td className="text-right font-bold text-blue-700">{projection.humanPercentage}% ({projection.residualTrafficMessages.toLocaleString()} msgs)</td>
                </tr>
              </tbody>
            </table>
            <div className="p-2 bg-gray-50 border border-gray-200 rounded text-center flex flex-col justify-center">
              <div className="text-[9px] uppercase text-gray-500 font-bold">Costo Promedio por Conversación</div>
              <div className="text-lg font-bold text-green-700">{formatCurrency(projection.costPerConversation)}</div>
              <div className="text-[8px] text-gray-400 italic">Métrica de eficiencia operativa</div>
            </div>
          </div>
        </div>

        {/* Proyección Temporal Detallada (Reemplaza Comparativa Estática) */}
        <div className="mb-4">
          <h3 className="text-[10px] font-bold mb-2 pb-1 border-b border-gray-300 uppercase tracking-widest text-gray-700" style={{ fontFamily: 'Poppins, sans-serif' }}>Proyección Financiera Trimestral (Q1-Q4)</h3>

          {(() => {
            // Force Quarterly view for printing
            const projections = calculateTemporalProjection(4, 'quarterly', projection);
            // Calculate totals
            const totalStatusQuo = projections.reduce((sum, p) => sum + p.statusQuo.revenue, 0);
            const totalRecommended = projections.reduce((sum, p) => sum + p.withCloserCat.recommended.netAdditionalRevenue, 0);

            return (
              <table className="w-full text-[8px] border-collapse">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-300 text-gray-500 uppercase tracking-wider">
                    <th className="py-2 pl-2 text-left">Período</th>
                    <th className="py-2 text-right">Volumen</th>
                    <th className="py-2 text-right border-r border-gray-200">Sin CloserCat</th>
                    <th className="py-2 text-center bg-purple-50 text-purple-900 border-b border-purple-200" colSpan={3}>Ingreso Neto Adicional (Net Revenue)</th>
                  </tr>
                  <tr className="bg-gray-50 text-gray-400 text-[7px]">
                    <th colSpan={3}></th>
                    <th className="py-1 text-right px-2">Optimista ({(projection.conversionRate * 1.1).toFixed(2)}%)</th>
                    <th className="py-1 text-right px-2 font-bold text-purple-700">Recomendado ({(projection.conversionRate * 1.2).toFixed(2)}%)</th>
                    <th className="py-1 text-right px-2">High Impact ({(projection.conversionRate * 1.3).toFixed(2)}%)</th>
                  </tr>
                </thead>
                <tbody>
                  {projections.map((proj, idx) => (
                    <tr key={idx} className="border-b border-gray-100">
                      <td className="py-2 pl-2 font-bold text-gray-700">{proj.period}</td>
                      <td className="py-2 text-right font-mono text-gray-500">{proj.conversations.toLocaleString()}</td>
                      <td className="py-2 text-right font-mono border-r border-gray-100 pr-2">{formatCurrency(proj.statusQuo.revenue)}</td>
                      <td className={`py-2 text-right font-mono px-2 ${proj.withCloserCat.optimistic.netAdditionalRevenue >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                        {proj.withCloserCat.optimistic.netAdditionalRevenue > 0 ? '+' : ''}{formatCurrency(proj.withCloserCat.optimistic.netAdditionalRevenue)}
                      </td>
                      <td className={`py-2 text-right font-mono font-bold bg-purple-50/30 px-2 ${proj.withCloserCat.recommended.netAdditionalRevenue >= 0 ? 'text-green-700' : 'text-red-600'}`}>
                        {proj.withCloserCat.recommended.netAdditionalRevenue > 0 ? '+' : ''}{formatCurrency(proj.withCloserCat.recommended.netAdditionalRevenue)}
                      </td>
                      <td className={`py-2 text-right font-mono px-2 ${proj.withCloserCat.highImpact.netAdditionalRevenue >= 0 ? 'text-green-800' : 'text-red-700'}`}>
                        {proj.withCloserCat.highImpact.netAdditionalRevenue > 0 ? '+' : ''}{formatCurrency(proj.withCloserCat.highImpact.netAdditionalRevenue)}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-gray-100 font-bold border-t border-gray-300">
                    <td className="py-2 pl-2">TOTAL ANUAL</td>
                    <td className="py-2 text-right">-</td>
                    <td className="py-2 text-right pr-2">{formatCurrency(totalStatusQuo)}</td>
                    <td className={`py-2 text-right px-2 ${totalStatusQuo >= 0 ? 'text-gray-400' : 'text-gray-400'}`}>-</td>
                    <td className={`py-2 text-right bg-purple-100 px-2 ${totalRecommended >= 0 ? 'text-green-800' : 'text-red-800'}`}>
                      {totalRecommended > 0 ? '+' : ''}{formatCurrency(totalRecommended)}
                    </td>
                    <td className="py-2 text-right text-gray-400 px-2">-</td>
                  </tr>
                </tbody>
              </table>
            );
          })()}
          <p className="text-[7px] text-gray-400 mt-2 italic">
            * Proyección basada en crecimiento mensual del {monthlyGrowthRate}%. Ingreso Neto Adicional = Ingresos Nuevos - Ingresos Actuales - Costos Operativos de CloserCat (Escalados).
          </p>
        </div>

        <div className="mb-4">
          <h3 className="text-sm font-bold mb-2 pb-1 border-b border-gray-300" style={{ fontFamily: 'Poppins, sans-serif' }}>Escenarios de Inversión (PERT)</h3>
          <div className="grid grid-cols-3 gap-2 mb-2">
            <div className="text-center p-2 bg-gray-100 border border-gray-300">
              <div className="text-xs font-semibold mb-1 text-gray-600">Optimista</div>
              <div className="text-lg font-bold" style={{ color: '#10b981' }}>{formatCurrency(projection.optimisticCost)}</div>
              <div className="text-xs text-gray-500">-10%</div>
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
              <div className="text-xs text-gray-500">+10%</div>
            </div>
          </div>
          <p className="text-[9px] text-gray-500 italic mt-1">
            * El escenario esperado es un promedio ponderado basado en patrones de uso típicos.
          </p>
          <div className="mt-4 p-2 bg-amber-50 border border-amber-200 rounded text-[9px] text-gray-700 text-justify">
            <strong>Nota Importante:</strong> Los valores presentados son aproximaciones estadísticas basadas en la información suministrada.
            <strong> La cotización oficial y configuración técnica final se reafirma en nuestra llamada consultiva gratuita.</strong>
            Este documento no constituye una oferta comercial vinculante ni un contrato de servicios.
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

              {/* Breakdown de Servicios Adicionales */}
              {(teamStructure.kbItems || 500) > 500 && (
                <div className="flex justify-between items-center py-1 pl-2 border-l-2 border-purple-100">
                  <span className="font-inter text-gray-500 text-xs">Capacidad KB (+{(teamStructure.kbItems - 500).toLocaleString()})</span>
                  <span className="font-mono font-bold text-xs text-gray-700">{formatCurrency(calculateKbCost(teamStructure.kbItems))}</span>
                </div>
              )}
              {teamStructure.promptingType === 'custom' && (
                <div className="flex justify-between items-center py-1 pl-2 border-l-2 border-purple-100">
                  <span className="font-inter text-gray-500 text-xs">Asesoría Prompting Custom</span>
                  <span className="font-mono font-bold text-xs text-gray-700">{formatCurrency(VALUE_ADDED_SERVICES_COSTS.custom_prompting)}</span>
                </div>
              )}
              {teamStructure.needsMarketAnalysis && (
                <div className="flex justify-between items-center py-1 pl-2 border-l-2 border-purple-100">
                  <span className="font-inter text-gray-500 text-xs">Intelligence Reports</span>
                  <span className="font-mono font-bold text-xs text-gray-700">{formatCurrency(VALUE_ADDED_SERVICES_COSTS.market_analysis)}</span>
                </div>
              )}

              {projection.servicesCost > 0 && (
                <div className="flex justify-between items-center py-1">
                  <span className="font-inter text-gray-600">Campañas / Otros</span>
                  <span className="font-mono font-bold">{formatCurrency(projection.servicesCost)}</span>
                </div>
              )}
              <div className="flex justify-between items-center pt-3 mt-2 border-t border-gray-100">
                <span className="font-bold text-gray-900">Inversión Mensual CloserCat</span>
                <span className="font-mono font-bold text-lg text-purple-600">{formatCurrency(projection.totalMonthlyCost)}</span>
              </div>
              {projection.metaMarketingCost > 0 && (
                <div className="mt-3 pt-3 border-t border-dashed border-gray-300">
                  <div className="flex justify-between items-center py-1">
                    <span className="font-inter text-gray-600 flex items-center gap-1">
                      Pago Directo a Meta
                      <span className="text-[10px] bg-blue-100 text-blue-700 px-1 rounded">Marketing</span>
                    </span>
                    <span className="font-mono font-bold text-gray-500">{formatCurrency(projection.metaMarketingCost)}</span>
                  </div>
                  <p className="text-[10px] text-gray-400 italic mt-1">
                    * Este valor se paga directamente a Meta (Facebook) por mensajes de marketing.
                  </p>
                </div>
              )}
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

        {/* Análisis de Demanda y Eficiencia */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
            <h4 className="font-poppins font-bold mb-4 text-gray-800 flex items-center gap-2">
              <span>📊</span> Análisis de Demanda
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Mensajes Totales / mes:</span>
                <span className="font-mono font-bold">{projection.totalMessages.toLocaleString()}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-200">
                <div className="p-2 bg-purple-50 rounded text-center">
                  <div className="text-[10px] uppercase text-purple-600 font-bold">Participación IA</div>
                  <div className="text-lg font-bold text-purple-700">{projection.iaPercentage}%</div>
                  <div className="text-[10px] text-purple-500">{projection.iaTrafficMessages.toLocaleString()} msgs</div>
                </div>
                <div className="p-2 bg-blue-50 rounded text-center">
                  <div className="text-[10px] uppercase text-blue-600 font-bold">Intervención Humana</div>
                  <div className="text-lg font-bold text-blue-700">{projection.humanPercentage}%</div>
                  <div className="text-[10px] text-blue-500">{projection.residualTrafficMessages.toLocaleString()} msgs</div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-green-50 rounded-xl border border-green-100 flex flex-col justify-center">
            <h4 className="font-poppins font-bold mb-2 text-green-800 text-center">
              Métrica de Eficiencia
            </h4>
            <div className="text-center">
              <div className="text-xs text-green-600 uppercase font-bold mb-1">Costo Promedio por Conversación</div>
              <div className="text-4xl font-poppins font-extrabold text-green-700">
                {formatCurrency(projection.costPerConversation)}
              </div>
              <p className="text-[10px] text-green-600 mt-2 italic px-4">
                * Basado en el volumen de {projection.conversationsPerMonth.toLocaleString()} conversaciones mensuales bajo la lógica de delegación configurada.
              </p>
            </div>
          </div>
        </div>

        {/* Comparativa de Estrategia: Actual vs CloserCat (Expanded Scenarios) */}
        <div className="mb-8 p-6 bg-white rounded-2xl border-2 border-gray-100 shadow-sm overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 border-b border-gray-50 pb-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl p-2 bg-purple-100 rounded-xl">⚖️</span>
              <div>
                <h4 className="font-poppins font-bold text-xl text-gray-900">Comparativa de Estrategia</h4>
                <p className="text-sm text-gray-500">¿Cómo escala tu rentabilidad según la eficiencia de la IA?</p>
              </div>
            </div>
            <div className="px-4 py-2 bg-gray-50 rounded-full border border-gray-200">
              <span className="text-[11px] uppercase font-bold tracking-widest text-gray-400">Baseline: {projection.conversionRate}% conv. actual</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-[10px] uppercase tracking-wider text-gray-400 italic">
                  <th className="pb-4 font-semibold w-1/4">Métrica de Negocio</th>
                  <th className="pb-4 text-center px-4 border-r border-gray-100">Status Quo</th>
                  <th colSpan={3} className="pb-4 text-center bg-purple-50 text-purple-700 rounded-t-xl border-x border-purple-100 uppercase tracking-widest font-extrabold text-[9px]">
                    Impacto con Estrategia CloserCat
                  </th>
                </tr>
                <tr className="text-[9px] uppercase tracking-tight text-gray-500 border-b border-gray-200">
                  <th className="py-2"></th>
                  <th className="py-2 text-center text-gray-400 border-r border-gray-100 italic">Actual</th>
                  <th className="py-2 text-center bg-purple-50/50 text-indigo-500 border-r border-purple-100">Optimización (+10%)</th>
                  <th className="py-2 text-center bg-purple-50 text-indigo-600 border-r border-purple-100 font-bold">Recomendado (+20%)</th>
                  <th className="py-2 text-center bg-purple-100/30 text-indigo-700">High Impact (+30%)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <tr>
                  <td className="py-5 font-semibold text-gray-700">Tasa de Conversión</td>
                  <td className="py-5 text-center text-gray-400 border-r border-gray-100 font-mono italic">{projection.conversionRate}%</td>
                  <td className="py-5 text-center bg-purple-50/20 font-mono">{(projection.conversionRate * 1.1).toFixed(2)}%</td>
                  <td className="py-5 text-center bg-purple-50 font-mono font-bold text-indigo-600">{(projection.conversionRate * 1.2).toFixed(2)}%</td>
                  <td className="py-5 text-center bg-purple-100/10 font-mono">{(projection.conversionRate * 1.3).toFixed(2)}%</td>
                </tr>
                <tr>
                  <td className="py-5 font-semibold text-gray-700">Ingresos Mensuales</td>
                  <td className="py-5 text-center text-gray-400 border-r border-gray-100 font-mono italic">{formatCurrency(projection.estimatedRevenue)}</td>
                  <td className="py-5 text-center bg-purple-50/20 font-mono">+{formatCurrency(projection.incrementalRev10)}</td>
                  <td className="py-5 text-center bg-purple-50 font-mono font-bold text-indigo-600">+{formatCurrency(projection.incrementalRev20)}</td>
                  <td className="py-5 text-center bg-purple-100/10 font-mono">+{formatCurrency(projection.incrementalRev30)}</td>
                </tr>
                <tr className="bg-gray-50/30">
                  <td className="py-5 font-semibold text-gray-700">Costo CloserCat (Mes)</td>
                  <td className="py-5 text-center text-gray-300 border-r border-gray-100 font-mono">$ 0</td>
                  <td className="py-5 text-center bg-purple-50/20 font-mono text-red-400">-{formatCurrency(projection.expectedCost)}</td>
                  <td className="py-5 text-center bg-purple-50 font-mono font-bold text-red-500">-{formatCurrency(projection.expectedCost)}</td>
                  <td className="py-5 text-center bg-purple-100/10 font-mono text-red-600">-{formatCurrency(projection.expectedCost)}</td>
                </tr>
                <tr className="bg-gradient-to-r from-gray-50 to-purple-50/30">
                  <td className="py-6 font-bold text-gray-900 border-l-4 border-purple-500 pl-4">Ingreso Residual Neto</td>
                  <td className="py-6 text-center text-gray-400 border-r border-gray-100 font-mono italic">$ 0</td>
                  <td className={`py-6 text-center bg-purple-50/50 font-mono font-bold ${projection.incrementalRev10 - projection.expectedCost >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                    {projection.incrementalRev10 - projection.expectedCost > 0 ? '+' : ''}{formatCurrency(projection.incrementalRev10 - projection.expectedCost)}
                  </td>
                  <td className={`py-6 text-center bg-purple-100/50 font-mono font-extrabold text-lg border-x border-purple-200 ${projection.incrementalRev20 - projection.expectedCost >= 0 ? 'text-green-700' : 'text-red-600'}`}>
                    {projection.incrementalRev20 - projection.expectedCost > 0 ? '+' : ''}{formatCurrency(projection.incrementalRev20 - projection.expectedCost)}
                  </td>
                  <td className={`py-6 text-center bg-purple-200/20 font-mono font-bold ${projection.incrementalRev30 - projection.expectedCost >= 0 ? 'text-green-800' : 'text-red-700'}`}>
                    {projection.incrementalRev30 - projection.expectedCost > 0 ? '+' : ''}{formatCurrency(projection.incrementalRev30 - projection.expectedCost)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Nueva Tabla de Proyección Temporal */}
          <div className="mb-8 p-6 bg-white rounded-2xl border-2 border-gray-100 shadow-sm">
            {(() => {
              const periodsConfig = {
                monthly: { count: 12, label: 'Mensual (12 meses)' },
                quarterly: { count: 4, label: 'Trimestral (Q1-Q4)' },
                annual: { count: 1, label: 'Anual (Año 1)' }
              };

              const projections = calculateTemporalProjection(
                periodsConfig[selectedPeriod].count,
                selectedPeriod,
                projection
              );

              // Calculate totals
              const totalConversations = projections.reduce((sum, p) => sum + p.conversations, 0);
              const totalStatusQuo = projections.reduce((sum, p) => sum + p.statusQuo.revenue, 0);
              const totalOptimistic = projections.reduce((sum, p) => sum + p.withCloserCat.optimistic.netAdditionalRevenue, 0);
              const totalRecommended = projections.reduce((sum, p) => sum + p.withCloserCat.recommended.netAdditionalRevenue, 0);
              const totalHighImpact = projections.reduce((sum, p) => sum + p.withCloserCat.highImpact.netAdditionalRevenue, 0);

              return (
                <>
                  {/* Header con selector de período */}
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl p-2 bg-blue-100 rounded-xl">📈</span>
                      <div>
                        <h4 className="font-poppins font-bold text-xl text-gray-900">Proyección de Impacto Financiero</h4>
                        <p className="text-sm text-gray-500">Ingresos netos adicionales con crecimiento del {monthlyGrowthRate}% mensual</p>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {(Object.entries(periodsConfig) as [keyof typeof periodsConfig, typeof periodsConfig[keyof typeof periodsConfig]][]).map(([key, { label }]) => (
                        <button
                          key={key}
                          onClick={() => setSelectedPeriod(key)}
                          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${selectedPeriod === key
                            ? 'bg-purple-600 text-white shadow-md'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tabla comparativa */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b-2 border-gray-200">
                          <th className="text-left py-3 px-2 font-poppins font-bold text-gray-700">Período</th>
                          <th className="text-right py-3 px-2 font-poppins font-bold text-gray-700">Conversaciones</th>
                          <th className="text-right py-3 px-2 bg-gray-50 font-poppins font-bold text-gray-700">Sin CloserCat</th>
                          <th className="text-center py-3 px-2 bg-purple-50 font-poppins font-bold text-purple-900" colSpan={3}>
                            Con CloserCat - Ingresos Netos Adicionales
                          </th>
                        </tr>
                        <tr className="border-b border-gray-100 text-xs text-gray-500">
                          <th></th>
                          <th></th>
                          <th className="text-right py-2 px-2 bg-gray-50 font-inter">Ingresos</th>
                          <th className="text-right py-2 px-2 bg-purple-50/50 font-inter">{(projection.conversionRate * 1.1).toFixed(2)}%</th>
                          <th className="text-right py-2 px-2 bg-purple-100/50 font-inter font-bold">{(projection.conversionRate * 1.2).toFixed(2)}% ⭐</th>
                          <th className="text-right py-2 px-2 bg-purple-50/50 font-inter">{(projection.conversionRate * 1.3).toFixed(2)}%</th>
                        </tr>
                      </thead>
                      <tbody>
                        {projections.map((proj, idx) => (
                          <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                            <td className="py-3 px-2 font-semibold text-gray-800">{proj.period}</td>
                            <td className="py-3 px-2 text-right font-mono text-gray-600">
                              {proj.conversations.toLocaleString()}
                            </td>
                            <td className="py-3 px-2 text-right font-mono bg-gray-50 text-gray-700">
                              {formatCurrency(proj.statusQuo.revenue)}
                            </td>
                            <td className={`py-3 px-2 text-right font-mono bg-purple-50/30 ${proj.withCloserCat.optimistic.netAdditionalRevenue >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                              {proj.withCloserCat.optimistic.netAdditionalRevenue > 0 ? '+' : ''}{formatCurrency(proj.withCloserCat.optimistic.netAdditionalRevenue)}
                            </td>
                            <td className={`py-3 px-2 text-right font-mono font-bold bg-purple-100/50 ${proj.withCloserCat.recommended.netAdditionalRevenue >= 0 ? 'text-green-700' : 'text-red-600'}`}>
                              {proj.withCloserCat.recommended.netAdditionalRevenue > 0 ? '+' : ''}{formatCurrency(proj.withCloserCat.recommended.netAdditionalRevenue)}
                            </td>
                            <td className={`py-3 px-2 text-right font-mono bg-purple-50/30 ${proj.withCloserCat.highImpact.netAdditionalRevenue >= 0 ? 'text-green-800' : 'text-red-700'}`}>
                              {proj.withCloserCat.highImpact.netAdditionalRevenue > 0 ? '+' : ''}{formatCurrency(proj.withCloserCat.highImpact.netAdditionalRevenue)}
                            </td>
                          </tr>
                        ))}
                        {/* Fila de totales */}
                        <tr className="bg-gradient-to-r from-gray-100 to-purple-100 font-bold border-t-2 border-gray-300">
                          <td className="py-4 px-2 text-gray-900 font-poppins">TOTAL</td>
                          <td className="py-4 px-2 text-right font-mono text-gray-900">
                            {totalConversations.toLocaleString()}
                          </td>
                          <td className="py-4 px-2 text-right font-mono bg-gray-100 text-gray-900">
                            {formatCurrency(totalStatusQuo)}
                          </td>
                          <td className={`py-4 px-2 text-right font-mono bg-purple-100/50 ${totalOptimistic >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {totalOptimistic > 0 ? '+' : ''}{formatCurrency(totalOptimistic)}
                          </td>
                          <td className={`py-4 px-2 text-right font-mono text-lg bg-purple-200/50 border-x-2 border-purple-300 ${totalRecommended >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                            {totalRecommended > 0 ? '+' : ''}{formatCurrency(totalRecommended)}
                          </td>
                          <td className={`py-4 px-2 text-right font-mono bg-purple-100/50 ${totalHighImpact >= 0 ? 'text-green-800' : 'text-red-800'}`}>
                            {totalHighImpact > 0 ? '+' : ''}{formatCurrency(totalHighImpact)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Nota explicativa */}
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg text-xs text-blue-800">
                    <p className="font-bold mb-1">📊 Cómo leer esta tabla:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li><strong>Sin CloserCat:</strong> Ingresos proyectados manteniendo tu tasa de conversión actual ({projection.conversionRate}%)</li>
                      <li><strong>Con CloserCat:</strong> Ingresos netos adicionales = (Ingresos con conversión mejorada) - (Ingresos actuales) - (Costo del servicio escalado)</li>
                      <li><strong>Crecimiento:</strong> Asume {monthlyGrowthRate}% de crecimiento mensual en volumen de conversaciones</li>
                      <li><strong>Costos:</strong> El costo de CloserCat escala proporcionalmente con el volumen de conversaciones</li>
                    </ul>
                  </div>
                </>
              );
            })()}
          </div>
        </div>

        {/* Footer with improved Disclaimers */}
        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-8">
          <div className="flex gap-3">
            <span className="text-xl">⚠️</span>
            <div>
              <p className="text-sm font-bold text-amber-800">Nota Importante sobre Estimaciones</p>
              <p className="text-xs text-amber-700 leading-relaxed">
                Los valores presentados son **aproximaciones estadísticas** basadas en los parámetros de industria ingresados.
                La cotización oficial y configuración técnica final se reafirma en nuestra **Llamada Consultiva Gratuita**.
              </p>
            </div>
          </div>
        </div>

        {/* Botones de acción ... */}
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
      {step === 'integrations' && renderIntegrations()}
      {step === 'form' && renderForm()}
      {step === 'results' && renderResults()}
    </div>
  );
}
