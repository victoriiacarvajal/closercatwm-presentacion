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