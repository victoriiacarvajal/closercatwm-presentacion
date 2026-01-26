import { SegmentType } from '../types';

export function recommendPreset(input: {
  segment?: SegmentType;
  useCase?: string;
  monthlyVolumeEstimate?: string;
  crm?: string;
  planInterest?: string;
}): string {
  // Si hay segment explícito, usar mapeo directo
  if (input.segment) {
    switch (input.segment) {
      case 'emprendedores':
        return 'waquick';
      case 'formacion':
        return 'wamedium';
      case 'otras-industrias':
        return 'wamedium';
      case 'profesionales-independientes':
        // Lógica basada en plan de interés
        if (input.planInterest?.includes('CRM + IA')) {
          return 'wamedium';
        }
        return 'waquick'; // Backup o CRM Personal
      default:
        return 'wamedium';
    }
  }

  // Lógica legacy basada en formulario
  const volume = Number((input.monthlyVolumeEstimate || '').replace(/[^0-9]/g, ''));
  const useCase = (input.useCase || '').toLowerCase();
  const crm = (input.crm || '').toLowerCase();

  if (crm.includes('q10') || useCase.includes('educ')) return 'wamedium';
  if (!Number.isNaN(volume) && volume >= 20000) return 'wamedium';
  return 'waquick';
}

export function getSegmentFromUrl(): SegmentType | null {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  const segment = params.get('segment') as SegmentType | null;

  const validSegments: SegmentType[] = [
    'emprendedores',
    'formacion',
    'ecommerce',
    'b2b',
    'soporte',
    'otras-industrias',
    'profesionales-independientes'
  ];

  return segment && validSegments.includes(segment) ? segment : null;
}
