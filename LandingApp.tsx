import React, { useEffect } from 'react';
import { getSegmentFromUrl } from './utils/presetRecommendation';
import { clarityEvent } from './utils/tracking';
import HomepageHub from './components/landing/HomepageHub';
import LandingFormacion from './components/landing/LandingFormacion';
import LandingEmprendedores from './components/landing/LandingEmprendedores';
import LandingOtrasIndustrias from './components/landing/LandingOtrasIndustrias';
import LandingPlaceholder from './components/landing/LandingPlaceholder';
import LandingProfesionalesIndependientes from './components/landing/LandingProfesionalesIndependientes';
const LandingApp: React.FC = () => {
  const segment = getSegmentFromUrl();

  useEffect(() => {
    if (!segment) {
      clarityEvent('homepage_hub_view');
    }
  }, [segment]);

  // Sin segment → Homepage Hub
  if (!segment) {
    return <HomepageHub />;
  }

  // Con segment → Landing específica
  switch (segment) {
    case 'formacion':
      return <LandingFormacion />;

    case 'emprendedores':
      return <LandingEmprendedores />;

    case 'otras-industrias':
      return <LandingOtrasIndustrias />;

    case 'profesionales-independientes':
      return <LandingProfesionalesIndependientes />;

    case 'ecommerce':
    case 'b2b':
    case 'soporte':
      return <LandingPlaceholder segment={segment} />;

    default:
      // Segment inválido → volver a hub
      if (typeof window !== 'undefined') {
        window.location.href = '/';
      }
      return null;
  }
};

export default LandingApp;
