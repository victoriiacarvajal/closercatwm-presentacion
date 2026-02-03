import React, { useEffect } from 'react';
import { getSegmentFromUrl } from '../../utils/presetRecommendation';

interface MetaContent {
    title: string;
    description: string;
    image: string;
    url: string;
}

const DEFAULT_META: MetaContent = {
    title: 'CloserCat Pro | WhatsApp Business + IA para Equipos Comerciales',
    description: 'Centraliza los WhatsApps personales de tu equipo comercial en un solo dashboard con IA. Respaldo automático, CRM y protección anti-bloqueo.',
    image: '/logo-closercat.png',
    url: 'https://closercat.pro', // Base URL assumption
};

const SEGMENT_META: Record<string, Partial<MetaContent>> = {
    'formacion': {
        title: 'CloserCat para Educación | Automatiza Admisiones con IA y Q10',
        description: 'Automatización de WhatsApp integrada nativamente con Q10 para matrículas y soporte. 78% de consultas resueltas automáticamente.',
    },
    'emprendedores': {
        title: 'CloserCat para Empresas | Escala tu Equipo Comercial en WhatsApp',
        description: 'Centraliza los WhatsApps de tu equipo comercial. Supervisión en tiempo real, CRM personal y automatización con IA.',
    },
    'otras-industrias': {
        title: 'CloserCat Pilotos | WhatsApp Business API a Resultados',
        description: 'Implementa WhatsApp Business API con un piloto de riesgo compartido. Paga solo si cumples los KPIs acordados.',
    },
    'profesionales-independientes': {
        title: 'CloserCat para Profesionales | Tu WhatsApp con Superpoderes',
        description: 'Respaldo automático de WhatsApp, CRM personal y protección anti-bloqueo para profesionales independientes.',
    },
};

export default function SEOManager() {
    const segment = getSegmentFromUrl();

    useEffect(() => {
        const meta = { ...DEFAULT_META, ...(segment ? SEGMENT_META[segment] : {}) };

        // Update Title
        document.title = meta.title;

        // Update Meta Tags
        updateMetaTag('description', meta.description);

        // Open Graph
        updateMetaTag('og:title', meta.title, 'property');
        updateMetaTag('og:description', meta.description, 'property');
        updateMetaTag('og:image', window.location.origin + meta.image, 'property');
        updateMetaTag('og:url', window.location.href, 'property');
        updateMetaTag('og:type', 'website', 'property');

        // Twitter
        updateMetaTag('twitter:card', 'summary_large_image', 'name');
        updateMetaTag('twitter:title', meta.title, 'name');
        updateMetaTag('twitter:description', meta.description, 'name');
        updateMetaTag('twitter:image', window.location.origin + meta.image, 'name');

    }, [segment]);

    return null;
}

function updateMetaTag(name: string, content: string, type: 'name' | 'property' = 'name') {
    let element = document.querySelector(`meta[${type}="${name}"]`);

    if (!element) {
        element = document.createElement('meta');
        element.setAttribute(type, name);
        document.head.appendChild(element);
    }

    element.setAttribute('content', content);
}
