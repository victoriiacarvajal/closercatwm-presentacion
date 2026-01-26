export enum SlideType {
  COVER = 'COVER',
  AGENDA = 'AGENDA',
  TRANSITION = 'TRANSITION',
  STANDARD = 'STANDARD',
  SPLIT_IMAGE = 'SPLIT_IMAGE',
  SPLIT_TEXT = 'SPLIT_TEXT', // For comparisons like Slide 14
  GRID = 'GRID',
  DASHBOARD = 'DASHBOARD', // For large screenshots
  COMPARISON_TABLE = 'COMPARISON_TABLE',
  PRICING = 'PRICING',
  TIMELINE = 'TIMELINE'
}

export interface SlideData {
  id: number;
  type: SlideType;
  title?: string;
  subtitle?: string;
  content?: string | string[];
  bullets?: string[];
  stats?: { label: string; value: string }[];
  imagePlaceholder?: string;
  imageUrl?: string; // Nuevo campo para la URL de la imagen
  videoUrl?: string;
  extraText?: string;
  columns?: any[]; // For pricing or specific column layouts
  footerText?: string;
  // New fields for Slide 27 (Implementation & Services)
  addOns?: { title: string; price: string; detail?: string }[];
  supportLevels?: { plan: string; sla: string; channel: string }[];
}

// Landing page types
export type SegmentType =
  | 'emprendedores'
  | 'formacion'
  | 'ecommerce'
  | 'b2b'
  | 'soporte'
  | 'otras-industrias'
  | 'profesionales-independientes';

export type BadgeColor = 'blue' | 'green' | 'gray' | 'purple';

export interface SegmentCardProps {
  segment: SegmentType;
  icon: string;
  title: string;
  description: string;
  badge: string;
  badgeColor: BadgeColor;
  featured?: boolean;
}

export interface ValuePropData {
  icon: string;
  title: string;
  feature: string;
  capability: string;
  benefit: string;
  screenshot?: string;
}

export interface LeadFormData {
  name: string;
  company: string;
  whatsapp: string;
  email: string;
  monthlyVolumeEstimate: string;
  useCase: string;
  crm: string;
  website?: string; // honeypot
  industria?: string; // para otras-industrias
  kpiObjetivo?: string; // para otras-industrias
  procesoActual?: string; // para otras-industrias
}

export interface ProfesionalesIndependientesFormData {
  name: string;
  whatsapp: string;
  email: string;
  profession: string;
  contactsEstimate: string;
  planInterest: string;
  mainConcern?: string;
  website?: string; // honeypot
}

// Team structure data for ConversationSimulator (Operaciones Comerciales)
export interface TeamStructureData {
  numberOfSalesReps: string; // select: '1-5', '6-10', '11-20', '21-50', '50+'
  currentWhatsAppType: 'personal' | 'business' | 'mixed';
  hasInstitutionalNumber: boolean;
  integrationsNeeded: string[]; // 'crm_custom', 'erp_custom', 'custom_webhooks'
  needsCampaigns: boolean;
  campaignContacts?: number;
  campaignsPerMonth?: number;
  needsCustomReports: boolean;
  needsMigrationAssistance: boolean;
  needsOnboarding: boolean;
  industry: string;
  primaryUseCase: string;
  operationDescription?: string;
}

// Form data for Emprendedores quote request
export interface EmprendedoresQuoteFormData {
  name: string;
  email: string;
  whatsapp: string;
  company: string;
  numberOfSalesReps: string;
  monthlyConversationVolume: string;
  currentWhatsAppType: 'personal' | 'business' | 'mixed';
  integrationsNeeded: string[];
  campaignContacts?: number;
  campaignsPerMonth?: number;
  primaryUseCase: string;
  operationDescription?: string;
  website?: string; // honeypot
}