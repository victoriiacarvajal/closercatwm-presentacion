import React, { useState } from 'react';
import { LeadFormData, SegmentType } from '../../types';
import { clarityEvent, getUtmParams } from '../../utils/tracking';
import { recommendPreset } from '../../utils/presetRecommendation';

interface FormSectionProps {
  segment: SegmentType;
  title?: string;
  subtitle?: string;
  showExtendedFields?: boolean;
  ctaText?: string;
}

const DEFAULT_FORM_STATE: LeadFormData = {
  name: '',
  company: '',
  whatsapp: '',
  email: '',
  monthlyVolumeEstimate: '',
  useCase: '',
  crm: '',
  website: '',
};

export default function FormSection({ 
  segment, 
  title = 'Agenda una demo personalizada',
  subtitle = 'Completa el formulario y te contactaremos en menos de 24 horas',
  showExtendedFields = false,
  ctaText = 'Agendar demo'
}: FormSectionProps) {
  const [formData, setFormData] = useState<LeadFormData>(DEFAULT_FORM_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Honeypot check
    if (formData.website) {
      console.log('Spam detected');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      clarityEvent(`form_submit_${segment}`);

      const params = new URLSearchParams(window.location.search);
      const utm = getUtmParams(params);
      const preset = recommendPreset({ segment, ...formData });

      const payload = {
        event: 'lead_submit',
        created_at: new Date().toISOString(),
        page_url: window.location.href,
        user_agent: navigator.userAgent,
        utm,
        segment,
        lead: formData,
        recommended_preset: preset,
      };

      // Send to Make webhook if configured
      const webhookUrl = import.meta.env?.VITE_MAKE_WEBHOOK_URL;
      if (webhookUrl) {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      // Store in localStorage
      localStorage.setItem('closercat_lead', JSON.stringify(formData));

      // Redirect to presentation
      const redirectUrl = `/?presentationId=${preset}&segment=${segment}&leadSubmitted=1`;
      window.location.href = redirectUrl;
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitError('Hubo un error al enviar el formulario. Por favor intenta de nuevo.');
      setIsSubmitting(false);
    }
  };

  return (
    <section id="agenda" className="py-20 bg-gray-50">
      <div className="max-w-2xl mx-auto px-6">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-poppins font-extrabold mb-4" style={{ color: '#121212' }}>{title}</h2>
          <p className="text-lg font-inter" style={{ color: '#4b5563' }}>{subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-poppins font-semibold mb-2" style={{ color: '#121212' }}>
                Nombre completo *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Juan Pérez"
              />
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-poppins font-semibold mb-2" style={{ color: '#121212' }}>
                Empresa / Institución *
              </label>
              <input
                type="text"
                id="company"
                name="company"
                required
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Mi Empresa S.A."
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="whatsapp" className="block text-sm font-poppins font-semibold mb-2" style={{ color: '#121212' }}>
                  WhatsApp *
                </label>
                <input
                  type="tel"
                  id="whatsapp"
                  name="whatsapp"
                  required
                  value={formData.whatsapp}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+57 300 123 4567"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-poppins font-semibold mb-2" style={{ color: '#121212' }}>
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="juan@empresa.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="monthlyVolumeEstimate" className="block text-sm font-poppins font-semibold mb-2" style={{ color: '#121212' }}>
                Volumen mensual estimado de consultas
              </label>
              <input
                type="text"
                id="monthlyVolumeEstimate"
                name="monthlyVolumeEstimate"
                value={formData.monthlyVolumeEstimate}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="ej: 500, 5000, 20000+"
              />
            </div>

            <div>
              <label htmlFor="useCase" className="block text-sm font-poppins font-semibold mb-2" style={{ color: '#121212' }}>
                Caso de uso principal
              </label>
              <select
                id="useCase"
                name="useCase"
                value={formData.useCase}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Selecciona una opción</option>
                <option value="Educación">Educación / Admisiones</option>
                <option value="Ecommerce">Ecommerce / Ventas</option>
                <option value="B2B">B2B / Prospección</option>
                <option value="Soporte">Soporte al Cliente</option>
                <option value="Otro">Otro</option>
              </select>
            </div>

            <div>
              <label htmlFor="crm" className="block text-sm font-semibold mb-2">
                CRM actual (si aplica)
              </label>
              <input
                type="text"
                id="crm"
                name="crm"
                value={formData.crm}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="ej: Q10, HubSpot, Salesforce, Ninguno"
              />
            </div>

            {showExtendedFields && (
              <>
                <div>
                  <label htmlFor="industria" className="block text-sm font-semibold mb-2">
                    Industria
                  </label>
                  <input
                    type="text"
                    id="industria"
                    name="industria"
                    value={formData.industria || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="ej: Salud, Real Estate, Consultoría"
                  />
                </div>

                <div>
                  <label htmlFor="kpiObjetivo" className="block text-sm font-semibold mb-2">
                    KPI que quieres mejorar
                  </label>
                  <input
                    type="text"
                    id="kpiObjetivo"
                    name="kpiObjetivo"
                    value={formData.kpiObjetivo || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="ej: Reducir tiempo de respuesta 70%"
                  />
                </div>

                <div>
                  <label htmlFor="procesoActual" className="block text-sm font-semibold mb-2">
                    Describe tu proceso actual de atención
                  </label>
                  <textarea
                    id="procesoActual"
                    name="procesoActual"
                    value={formData.procesoActual || ''}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describe cómo manejas las consultas actualmente..."
                  />
                </div>
              </>
            )}

            {/* Honeypot field */}
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
              style={{ display: 'none' }}
              tabIndex={-1}
              autoComplete="off"
            />

            {submitError && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {submitError}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3 text-white rounded-xl font-poppins font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              style={{ background: 'linear-gradient(135deg, #08C4F4 0%, #8336FF 100%)' }}
            >
              {isSubmitting ? 'Enviando...' : ctaText}
            </button>

            <p className="text-xs text-gray-600 text-center">
              15 minutos · Sin compromiso · Respuesta en 24 horas
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
