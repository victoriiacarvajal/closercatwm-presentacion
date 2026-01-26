import React, { useState } from 'react';
import { ProfesionalesIndependientesFormData } from '../../types';
import { clarityEvent, getUtmParams, trackPlanSelection } from '../../utils/tracking';
import { recommendPreset } from '../../utils/presetRecommendation';

interface ProfesionalesIndependientesFormProps {
    title?: string;
    subtitle?: string;
    ctaText?: string;
    preSelectedPlan?: string;
}

const DEFAULT_FORM_STATE: ProfesionalesIndependientesFormData = {
    name: '',
    whatsapp: '',
    email: '',
    profession: '',
    contactsEstimate: '',
    planInterest: '',
    mainConcern: '',
    website: '',
};

export default function ProfesionalesIndependientesForm({
    title = 'Comienza tu prueba gratis',
    subtitle = 'Completa el formulario y te contactaremos en menos de 24 horas',
    ctaText = 'Empezar ahora',
    preSelectedPlan = ''
}: ProfesionalesIndependientesFormProps) {
    const [formData, setFormData] = useState<ProfesionalesIndependientesFormData>({
        ...DEFAULT_FORM_STATE,
        planInterest: preSelectedPlan
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Track plan selection
        if (name === 'planInterest' && value) {
            trackPlanSelection(value);
        }
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
            clarityEvent('form_submit_profesionales_independientes');

            const params = new URLSearchParams(window.location.search);
            const utm = getUtmParams(params);
            const preset = recommendPreset({
                segment: 'profesionales-independientes',
                planInterest: formData.planInterest
            });

            const payload = {
                event: 'lead_submit',
                created_at: new Date().toISOString(),
                page_url: window.location.href,
                user_agent: navigator.userAgent,
                utm,
                segment: 'profesionales-independientes',
                lead: {
                    name: formData.name,
                    whatsapp: formData.whatsapp,
                    email: formData.email,
                    profession: formData.profession,
                    contacts_estimate: formData.contactsEstimate,
                    plan_interest: formData.planInterest,
                    main_concern: formData.mainConcern || ''
                },
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

            // Redirect to presentation based on preset
            const redirectUrl = `/?presentationId=${preset}&segment=profesionales-independientes&leadSubmitted=1`;
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
                                    placeholder="juan@ejemplo.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="profession" className="block text-sm font-poppins font-semibold mb-2" style={{ color: '#121212' }}>
                                Profesión *
                            </label>
                            <select
                                id="profession"
                                name="profession"
                                required
                                value={formData.profession}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">Selecciona una opción</option>
                                <option value="Consultor">Consultor</option>
                                <option value="Asesor Inmobiliario">Asesor Inmobiliario</option>
                                <option value="Coach">Coach</option>
                                <option value="Abogado">Abogado</option>
                                <option value="Contador">Contador</option>
                                <option value="Corredor de Bolsa">Corredor de Bolsa</option>
                                <option value="Asesor de Seguros">Asesor de Seguros</option>
                                <option value="Community Manager">Community Manager</option>
                                <option value="Otro">Otro</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="contactsEstimate" className="block text-sm font-poppins font-semibold mb-2" style={{ color: '#121212' }}>
                                Número de contactos activos estimados *
                            </label>
                            <select
                                id="contactsEstimate"
                                name="contactsEstimate"
                                required
                                value={formData.contactsEstimate}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">Selecciona una opción</option>
                                <option value="Menos de 100">Menos de 100</option>
                                <option value="100-500">100-500</option>
                                <option value="500-1000">500-1000</option>
                                <option value="Más de 1000">Más de 1000</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="planInterest" className="block text-sm font-poppins font-semibold mb-2" style={{ color: '#121212' }}>
                                Plan de interés *
                            </label>
                            <select
                                id="planInterest"
                                name="planInterest"
                                required
                                value={formData.planInterest}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">Selecciona una opción</option>
                                <option value="Backup ($19K-29K)">Backup ($19K-29K)</option>
                                <option value="CRM Personal ($39K-49K)">CRM Personal ($39K-49K)</option>
                                <option value="CRM + IA ($79K-99K)">CRM + IA ($79K-99K)</option>
                                <option value="No estoy seguro">No estoy seguro</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="mainConcern" className="block text-sm font-poppins font-semibold mb-2" style={{ color: '#121212' }}>
                                ¿Qué te preocupa más? (opcional)
                            </label>
                            <textarea
                                id="mainConcern"
                                name="mainConcern"
                                value={formData.mainConcern}
                                onChange={handleChange}
                                rows={3}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Ej: Perder mis contactos si me bloquean la cuenta..."
                            />
                        </div>

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
                            7 días gratis · Sin compromiso · Cancela cuando quieras
                        </p>
                    </div>
                </form>
            </div>
        </section>
    );
}
