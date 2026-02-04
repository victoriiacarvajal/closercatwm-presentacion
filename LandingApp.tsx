import React, { useEffect } from 'react';
import { getSegmentFromUrl } from './utils/presetRecommendation';
import { clarityEvent } from './utils/tracking';
import HomepageHub from './components/landing/HomepageHub';
import LandingFormacion from './components/landing/LandingFormacion';
import LandingEmprendedores from './components/landing/LandingEmprendedores';
import LandingOtrasIndustrias from './components/landing/LandingOtrasIndustrias';
import LandingPlaceholder from './components/landing/LandingPlaceholder';
import LandingProfesionalesIndependientes from './components/landing/LandingProfesionalesIndependientes';
import StudyAnatomy from './components/resources/StudyAnatomy';
import ResourcesHub from './components/resources/ResourcesHub';
import Falla1Continuidad from './components/resources/articles/Falla1Continuidad';
import Falla2Memoria from './components/resources/articles/Falla2Memoria';
import Falla3Automatizacion from './components/resources/articles/Falla3Automatizacion';
import Falla4Escalamiento from './components/resources/articles/Falla4Escalamiento';
import Falla5PromesasRotas from './components/resources/articles/Falla5PromesasRotas';
import Falla6SilencioMortal from './components/resources/articles/Falla6SilencioMortal';
import Falla7PersuasionAusente from './components/resources/articles/Falla7PersuasionAusente';

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

    case 'recursos/estudio-anatomia-conversaciones':
      return <StudyAnatomy />;

    case 'recursos':
      return <ResourcesHub />;

    case 'recursos/falla-1-continuidad-rota':
      return <Falla1Continuidad />;

    case 'recursos/falla-2-memoria-inexistente':
      return <Falla2Memoria />;

    case 'recursos/falla-3-automatizacion-mal-entendida':
      return <Falla3Automatizacion />;

    case 'recursos/falla-4-escalamiento-caotico':
      return <Falla4Escalamiento />;

    case 'recursos/falla-5-promesas-rotas':
      return <Falla5PromesasRotas />;

    case 'recursos/falla-6-silencio-mortal':
      return <Falla6SilencioMortal />;

    case 'recursos/falla-7-persuasion-ausente':
      return <Falla7PersuasionAusente />;

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
