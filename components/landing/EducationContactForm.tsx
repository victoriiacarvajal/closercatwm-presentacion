import React, { useState } from 'react';
import { clarityEvent, getUtmParams } from '../../utils/tracking';

interface EducationFormData {
    name: string;
    institution: string;
    role: string;
    whatsapp: string;
    email: string;
    newStudentsPerYear: string;
    website: string; // Honeypot
}

const DEFAULT_FORM_STATE: EducationFormData = {
    name: '',
    institution: '',
    role: '',
    whatsapp: '',
    email: '',
    newStudentsPerYear: '',
    website: '',
};

export default function EducationContactForm() {
    const [formData, setFormData] = useState<EducationFormData>(DEFAULT_FORM_STATE);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
            clarityEvent('form_submit_education');

            const params = new URLSearchParams(window.location.search);
            const utm = getUtmParams(params);

            const payload = {
                event: 'lead_submit',
                created_at: new Date().toISOString(),
                page_url: window.location.href,
                user_agent: navigator.userAgent,
                utm,
                segment: 'formacion',
                lead: formData,
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

            setIsSuccess(true);
            // Optional: Redirect or show success message inline
        } catch (error) {
            console.error('Form submission error:', error);
            setSubmitError('Hubo un error al enviar el formulario. Por favor intenta de nuevo.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <section id="agenda" className="py-20 bg-gray-50">
                <div className="max-w-md mx-auto px-6 text-center">
                    <div className="inline-block p-4 bg-green-100 rounded-full mb-4">
                        <span className="text-5xl">✅</span>
                    </div>
                    <h3 className="text-2xl font-poppins font-bold mb-3" style={{ color: '#121212' }}>
                        ¡Solicitud recibida!
                    </h3>
                    <p className="font-inter text-base mb-6" style={{ color: '#4b5563' }}>
                        Gracias <strong>{formData.name}</strong>. Un experto en automatización educativa te contactará pronto a <strong>{formData.whatsapp}</strong>.
                    </p>
                    <button
                        onClick={() => setIsSuccess(false)} // Reset for demo purposes or keep static
                        className="text-purple-600 font-semibold underline"
                    >
                        Volver al formulario
                    </button>
                </div>
            </section>
        );
    }

    return (
        <section id="agenda" className="py-20 bg-gray-50">
            <div className="max-w-2xl mx-auto px-6">
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-poppins font-extrabold mb-4" style={{ color: '#121212' }}>
                        Transforma tus admisiones hoy
                    </h2>
                    <p className="text-lg font-inter" style={{ color: '#4b5563' }}>
                        Solicita una consultoría gratuita para tu institución
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
                    <div className="space-y-4">
                        {/* Nombre y Rol */}
                        <div className="grid md:grid-cols-2 gap-4">
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
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    placeholder="Tu nombre"
                                />
                            </div>
                            <div>
                                <label htmlFor="role" className="block text-sm font-poppins font-semibold mb-2" style={{ color: '#121212' }}>
                                    Cargo / Rol *
                                </label>
                                <select
                                    id="role"
                                    name="role"
                                    required
                                    value={formData.role}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                >
                                    <option value="">Selecciona...</option>
                                    <option value="Rector/Director">Rector / Director</option>
                                    <option value="Admisiones">Líder de Admisiones</option>
                                    <option value="Mercadeo">Mercadeo / Ventas</option>
                                    <option value="Coordinador">Coordinador Académico</option>
                                    <option value="Otro">Otro</option>
                                </select>
                            </div>
                        </div>

                        {/* Institución y Volumen */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="institution" className="block text-sm font-poppins font-semibold mb-2" style={{ color: '#121212' }}>
                                    Nombre de la Institución *
                                </label>
                                <input
                                    type="text"
                                    id="institution"
                                    name="institution"
                                    required
                                    value={formData.institution}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    placeholder="Universidad / Colegio..."
                                />
                            </div>
                            <div>
                                <label htmlFor="newStudentsPerYear" className="block text-sm font-poppins font-semibold mb-2" style={{ color: '#121212' }}>
                                    Estudiantes nuevos al año *
                                </label>
                                <select
                                    id="newStudentsPerYear"
                                    name="newStudentsPerYear"
                                    required
                                    value={formData.newStudentsPerYear}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                >
                                    <option value="">Selecciona...</option>
                                    <option value="0-200">Menos de 200</option>
                                    <option value="200-500">200 - 500</option>
                                    <option value="500-2000">500 - 2,000</option>
                                    <option value="2000+">Más de 2,000</option>
                                </select>
                            </div>
                        </div>

                        {/* Contacto */}
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
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    placeholder="+57 300 123 4567"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-poppins font-semibold mb-2" style={{ color: '#121212' }}>
                                    Email Corporativo *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    placeholder="nombre@institucion.edu.co"
                                />
                            </div>
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
                            className="w-full px-6 py-4 text-white rounded-xl font-poppins font-bold text-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            style={{ background: 'linear-gradient(135deg, #08C4F4 0%, #8336FF 100%)' }}
                        >
                            {isSubmitting ? 'Enviando solicitud...' : 'Solicitar consultoría gratuita'}
                        </button>

                        <p className="text-xs text-gray-500 text-center mt-4">
                            100% confidencial. Te contactaremos en menos de 24 horas hábiles.
                        </p>
                    </div>
                </form>
            </div>
        </section>
    );
}
