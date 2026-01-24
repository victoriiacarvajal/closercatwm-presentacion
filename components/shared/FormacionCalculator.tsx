import React, { useState, useEffect } from 'react';
import { clarityEvent } from '../../utils/tracking';

interface FormData {
  name: string;
  whatsapp: string;
  email: string;
  institution: string;
}

interface PlanDetails {
  name: string;
  price: number;
  messages: number;
  students: string;
  description: string;
  features: string[];
  badge: string;
}

interface ProjectionData {
  studentsPerMonth: number;
  consultasPerStudent: number;
  totalMessages: number;
  selectedPlan: PlanDetails | null;
}

const PLANS: PlanDetails[] = [
  {
    name: 'Educación Básico',
    price: 750000,
    messages: 5000,
    students: '0-200 estudiantes/año',
    description: 'Para colegios e instituciones pequeñas',
    badge: '5,000 mensajes/mes',
    features: [
      '5,000 mensajes/mes (IA + operativos)',
      '1 caso de uso: Admisiones/Formación',
      '1 línea WhatsApp Business',
      'Knowledge Base de programas + FAQs',
      'Reporte básico mensual',
      'Soporte email (<48h)'
    ]
  },
  {
    name: 'Educación Growth',
    price: 1449000,
    messages: 10000,
    students: '200-800 estudiantes/año',
    description: 'Para instituciones medianas',
    badge: '10,000 mensajes/mes',
    features: [
      '10,000 mensajes/mes',
      'Campañas de matrícula (2 simultáneas, 10K targets)',
      'Integración Q10 incluida',
      'Knowledge Base ilimitada',
      '2 casos de uso',
      'Analytics básico',
      'Soporte prioritario (<24h)'
    ]
  },
  {
    name: 'Educación Pro',
    price: 3400000,
    messages: 25000,
    students: '800+ estudiantes/año',
    description: 'Para universidades y grupos educativos',
    badge: '25,000 mensajes/mes',
    features: [
      '25,000 mensajes/mes',
      '5 campañas simultáneas (50K contactos)',
      'Integración Q10 incluida',
      'Analytics avanzado + reporting Q10',
      '3 casos de uso',
      'Webhooks custom',
      'Soporte prioritario (<12h)'
    ]
  }
];

const COST_PER_MESSAGE = 180; // COP por mensaje

// Función para extraer UTM params
const getUtmParams = (params: URLSearchParams) => {
  return {
    utm_source: params.get('utm_source') || '',
    utm_medium: params.get('utm_medium') || '',
    utm_campaign: params.get('utm_campaign') || '',
    utm_term: params.get('utm_term') || '',
    utm_content: params.get('utm_content') || '',
  };
};

export default function FormacionCalculator() {
  const [step, setStep] = useState<'input' | 'plan' | 'form' | 'results'>('input');
  const [studentsPerMonth, setStudentsPerMonth] = useState<number>(0);
  const [consultasPerStudent, setConsultasPerStudent] = useState<number>(3);
  const [projection, setProjection] = useState<ProjectionData | null>(null);
  const [hasAutoPrinted, setHasAutoPrinted] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    whatsapp: '',
    email: '',
    institution: ''
  });

  const calculateProjection = (students: number, consultas: number, selectedPlan: PlanDetails | null): ProjectionData => {
    // Mensajes totales = estudiantes * consultas por estudiante * 2 (ida y vuelta)
    const baseMessages = students * consultas * 2;
    const expectedMessages = Math.round(baseMessages);

    return {
      studentsPerMonth: students,
      consultasPerStudent: consultas,
      totalMessages: expectedMessages,
      selectedPlan
    };
  };

  const handleContinueToPlan = () => {
    if (studentsPerMonth < 10) {
      alert('Por favor ingresa al menos 10 estudiantes nuevos mensuales');
      return;
    }

    clarityEvent('formacion_calculator_input_completed');
    setStep('plan');
  };

  const handleSelectPlan = (plan: PlanDetails) => {
    const projectionData = calculateProjection(studentsPerMonth, consultasPerStudent, plan);
    setProjection(projectionData);
    clarityEvent('formacion_calculator_plan_selected');
    setStep('form');
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
        event: 'formacion_calculator_submit',
        action: 'calculator_quote',
        created_at: new Date().toISOString(),
        page_url: window.location.href,
        user_agent: navigator.userAgent,
        utm,
        lead: formData,
        projection,
      };

      const webhookUrl = import.meta.env?.VITE_MAKE_WEBHOOK_URL;
      if (webhookUrl) {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      clarityEvent('formacion_calculator_form_submitted');
      setStep('results');
    } catch (error) {
      console.error('Error enviando webhook de calculadora:', error);
      alert('Hubo un error al enviar tu información. Por favor intenta de nuevo.');
    }
  };

  const handleRequestDemo = async () => {
    try {
      const params = new URLSearchParams(window.location.search);
      const utm = getUtmParams(params);

      const payload = {
        event: 'formacion_calculator_action',
        action: 'request_demo',
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

      clarityEvent('formacion_calculator_demo_requested');
      setShowDemoModal(true);
    } catch (error) {
      console.error('Error enviando webhook de demo:', error);
    }
  };

  // Auto-impresión al llegar a resultados
  useEffect(() => {
    if (step === 'results' && !hasAutoPrinted) {
      const timer = setTimeout(() => {
        window.print();
        setHasAutoPrinted(true);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [step, hasAutoPrinted]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handlePrint = () => {
    window.print();
  };

  // Vista de impresión dedicada
  const renderPrintView = () => {
    if (!projection || !projection.selectedPlan) return null;

    const selectedPlan = projection.selectedPlan;
    const today = new Date().toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' });

    return (
      <div className="hidden print:block" style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px' }}>
        <div className="flex justify-between items-start mb-4 pb-3 border-b-2 border-gray-300">
          <div>
            <h1 className="text-2xl font-bold mb-1" style={{ color: '#8336FF', fontFamily: 'Poppins, sans-serif' }}>CloserCat</h1>
            <p className="text-xs text-gray-600">Automatización para Educación</p>
          </div>
          <div className="text-right">
            <h2 className="text-xl font-bold mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>COTIZACIÓN</h2>
            <p className="text-xs text-gray-600">{today}</p>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-sm font-bold mb-2 pb-1 border-b border-gray-300" style={{ fontFamily: 'Poppins, sans-serif' }}>Información de la Institución</h3>
          <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-xs">
            <div><strong>Contacto:</strong> {formData.name}</div>
            <div><strong>WhatsApp:</strong> {formData.whatsapp}</div>
            <div><strong>Email:</strong> {formData.email}</div>
            <div><strong>Institución:</strong> {formData.institution}</div>
          </div>
        </div>

        <div className="mb-4 p-4 bg-purple-50 border-2 border-purple-300">
          <h3 className="text-lg font-bold mb-3 text-center" style={{ fontFamily: 'Poppins, sans-serif', color: '#8336FF' }}>Plan Seleccionado</h3>
          <div className="text-center mb-3">
            <div className="text-xs font-semibold mb-1 text-gray-600">{selectedPlan.badge}</div>
            <h4 className="text-xl font-bold mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>{selectedPlan.name}</h4>
            <p className="text-xs text-gray-600 mb-2">{selectedPlan.description}</p>
            <div className="text-3xl font-bold" style={{ color: '#8336FF' }}>{formatCurrency(selectedPlan.price)}</div>
            <div className="text-xs text-gray-600">por mes</div>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-sm font-bold mb-2 pb-1 border-b border-gray-300" style={{ fontFamily: 'Poppins, sans-serif' }}>Características Incluidas</h3>
          <div className="grid grid-cols-2 gap-2">
            {selectedPlan.features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs p-2 bg-gray-50 rounded">
                <span className="text-green-600 font-bold">✓</span>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-sm font-bold mb-2 pb-1 border-b border-gray-300" style={{ fontFamily: 'Poppins, sans-serif' }}>Resumen de Necesidades</h3>
          <div className="grid grid-cols-3 gap-2">
            <div className="text-center p-2 bg-gray-100 border border-gray-300">
              <div className="text-lg font-bold" style={{ color: '#8336FF' }}>{projection.studentsPerMonth}</div>
              <div className="text-xs text-gray-600">Estudiantes/mes</div>
            </div>
            <div className="text-center p-2 bg-gray-100 border border-gray-300">
              <div className="text-lg font-bold" style={{ color: '#8336FF' }}>{projection.consultasPerStudent}</div>
              <div className="text-xs text-gray-600">Consultas/estudiante</div>
            </div>
            <div className="text-center p-2 bg-gray-100 border border-gray-300">
              <div className="text-lg font-bold" style={{ color: '#8336FF' }}>~{projection.totalMessages.toLocaleString()}</div>
              <div className="text-xs text-gray-600">Mensajes/mes</div>
            </div>
          </div>
          <p className="text-xs text-center text-gray-600 mt-2">
            Tu plan incluye {selectedPlan.messages.toLocaleString()} mensajes/mes, ideal para {selectedPlan.students}
          </p>
        </div>

        <div className="mt-6 pt-3 border-t-2 border-gray-300 text-center text-xs text-gray-600">
          <p className="mb-1"><strong>CloserCat</strong> - Automatización para Educación</p>
          <p>www.closercat.com · contacto@closercat.com</p>
          <p className="mt-2 text-xs">Esta cotización es válida por 30 días a partir de la fecha de emisión.</p>
        </div>
      </div>
    );
  };

  // Step 1: Input de datos
  const renderInput = () => (
    <div>
      <h3 className="text-2xl font-poppins font-bold mb-2" style={{ color: '#121212' }}>
        Calcula tu inversión mensual
      </h3>
      <p className="font-inter text-sm mb-6" style={{ color: '#6b7280' }}>
        Responde estas preguntas para obtener una proyección personalizada de costos
      </p>

      <div className="space-y-6">
        <div>
          <label className="block font-poppins font-semibold mb-2" style={{ color: '#121212' }}>
            ¿Cuántos estudiantes nuevos recibes al mes?
          </label>
          <p className="text-xs font-inter mb-3" style={{ color: '#6b7280' }}>
            Considera leads que te contactan por WhatsApp para consultar sobre programas, precios, inscripciones, etc.
          </p>
          <input
            type="number"
            value={studentsPerMonth || ''}
            onChange={(e) => setStudentsPerMonth(parseInt(e.target.value) || 0)}
            placeholder="Ej: 150"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg font-inter text-base"
            min="0"
          />
        </div>

        <div>
          <label className="block font-poppins font-semibold mb-2" style={{ color: '#121212' }}>
            ¿Cuántas consultas hace cada estudiante en promedio?
          </label>
          <p className="text-xs font-inter mb-3" style={{ color: '#6b7280' }}>
            Número promedio de preguntas que hace un prospecto antes de inscribirse o desistir
          </p>
          <select
            value={consultasPerStudent}
            onChange={(e) => setConsultasPerStudent(parseInt(e.target.value))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg font-inter text-base"
          >
            <option value="2">2-3 consultas (estudiante muy decidido)</option>
            <option value="3">3-5 consultas (promedio)</option>
            <option value="5">5-8 consultas (estudiante indeciso)</option>
            <option value="8">8+ consultas (proceso largo)</option>
          </select>
        </div>

        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm font-inter" style={{ color: '#1e40af' }}>
            💡 <strong>Tip:</strong> Si no estás seguro, usa 3-5 consultas. Es el promedio en instituciones educativas en LATAM.
          </p>
        </div>
      </div>

      <div className="mt-8 flex gap-3">
        <button
          onClick={handleContinueToPlan}
          disabled={studentsPerMonth < 10}
          className="flex-1 px-6 py-3 rounded-lg font-poppins font-bold text-white disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ background: studentsPerMonth >= 10 ? 'linear-gradient(135deg, #08C4F4 0%, #8336FF 100%)' : '#9ca3af' }}
        >
          Continuar →
        </button>
      </div>
    </div>
  );

  // Step 2: Selección de plan
  const renderPlan = () => {
    const estimatedMessages = studentsPerMonth * consultasPerStudent * 2;

    return (
      <div>
        <h3 className="text-2xl font-poppins font-bold mb-2" style={{ color: '#121212' }}>
          Elige el plan ideal para tu institución
        </h3>
        <p className="font-inter text-sm mb-6" style={{ color: '#6b7280' }}>
          Basado en {studentsPerMonth} estudiantes/mes y {consultasPerStudent} consultas promedio, necesitarás aproximadamente <strong>{estimatedMessages.toLocaleString()} mensajes/mes</strong>
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {PLANS.map((plan, index) => {
            const isRecommended = estimatedMessages <= plan.messages;
            const isPreviousRecommended = index > 0 && estimatedMessages <= PLANS[index - 1].messages;
            const showRecommended = isRecommended && !isPreviousRecommended;

            return (
              <div
                key={plan.name}
                className={`relative rounded-xl border-2 p-6 transition-all hover:shadow-lg ${
                  showRecommended ? 'border-purple-400 bg-purple-50' : 'border-gray-200 bg-white'
                }`}
              >
                {showRecommended && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="px-3 py-1 bg-purple-600 text-white text-xs font-poppins font-bold rounded-full">
                      ⭐ Recomendado
                    </span>
                  </div>
                )}

                <div className="text-center mb-4">
                  <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-poppins font-semibold rounded-full mb-3">
                    {plan.badge}
                  </div>
                  <h4 className="text-xl font-poppins font-bold mb-2" style={{ color: '#121212' }}>
                    {plan.name}
                  </h4>
                  <p className="text-sm font-inter mb-3" style={{ color: '#6b7280' }}>
                    {plan.description}
                  </p>
                  <div className="text-3xl font-mono font-bold mb-1" style={{ color: '#8336FF' }}>
                    {formatCurrency(plan.price)}
                  </div>
                  <p className="text-xs font-inter" style={{ color: '#6b7280' }}>por mes</p>
                </div>

                <div className="mb-6">
                  <p className="text-xs font-poppins font-semibold mb-3" style={{ color: '#6b7280' }}>Incluye:</p>
                  <ul className="space-y-2">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs font-inter" style={{ color: '#4b5563' }}>
                        <span className="text-green-500 mt-0.5">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => handleSelectPlan(plan)}
                  className={`w-full px-4 py-3 rounded-lg font-poppins font-bold transition-all ${
                    showRecommended
                      ? 'text-white'
                      : 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                  style={showRecommended ? { background: 'linear-gradient(135deg, #08C4F4 0%, #8336FF 100%)' } : {}}
                >
                  Seleccionar {plan.name}
                </button>

                <p className="text-xs text-center font-inter mt-3" style={{ color: '#6b7280' }}>
                  Ideal para {plan.students}
                </p>
              </div>
            );
          })}
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setStep('input')}
            className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-lg font-poppins font-semibold text-gray-700 hover:bg-gray-50"
          >
            ← Volver
          </button>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm font-inter" style={{ color: '#1e40af' }}>
            💡 <strong>¿Necesitas más de 25,000 mensajes?</strong> Contáctanos para un plan Enterprise personalizado con casos de uso ilimitados y soporte 24/7.
          </p>
        </div>
      </div>
    );
  };

  // Step 3: Formulario de captura
  const renderForm = () => (
    <div>
      <div className="text-center mb-6">
        <div className="inline-block p-4 bg-purple-100 rounded-full mb-4">
          <span className="text-4xl">📊</span>
        </div>
        <h3 className="text-2xl font-poppins font-bold mb-2" style={{ color: '#121212' }}>
          Cotización lista
        </h3>
        <p className="font-inter text-sm mb-4" style={{ color: '#6b7280' }}>
          Completa tus datos para ver tu cotización personalizada
        </p>
        {projection?.selectedPlan && (
          <div className="inline-block px-4 py-2 bg-purple-100 border border-purple-300 rounded-lg">
            <p className="text-sm font-poppins font-semibold" style={{ color: '#8336FF' }}>
              Plan seleccionado: {projection.selectedPlan.name}
            </p>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmitForm} className="space-y-4">
        <div>
          <label className="block font-poppins font-semibold mb-2 text-sm" style={{ color: '#121212' }}>
            Nombre completo *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Ej: María González"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg font-inter text-sm"
            required
          />
        </div>

        <div>
          <label className="block font-poppins font-semibold mb-2 text-sm" style={{ color: '#121212' }}>
            WhatsApp *
          </label>
          <input
            type="tel"
            value={formData.whatsapp}
            onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
            placeholder="Ej: +57 300 123 4567"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg font-inter text-sm"
            required
          />
        </div>

        <div>
          <label className="block font-poppins font-semibold mb-2 text-sm" style={{ color: '#121212' }}>
            Email corporativo *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Ej: maria@universidad.edu.co"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg font-inter text-sm"
            required
          />
        </div>

        <div>
          <label className="block font-poppins font-semibold mb-2 text-sm" style={{ color: '#121212' }}>
            Nombre de la institución
          </label>
          <input
            type="text"
            value={formData.institution}
            onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
            placeholder="Ej: Universidad Nacional"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg font-inter text-sm"
          />
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={() => setStep('plan')}
            className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-lg font-poppins font-semibold text-gray-700 hover:bg-gray-50"
          >
            ← Cambiar plan
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

  // Step 4: Resultados
  const renderResults = () => {
    if (!projection || !projection.selectedPlan) return null;

    const selectedPlan = projection.selectedPlan;

    return (
      <div>
        {/* Vista web */}
        <div className="print:hidden">
          <div className="flex justify-end mb-4">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-gray-300 rounded-lg font-poppins font-medium text-gray-700 hover:bg-gray-50"
            >
              <span>🖨️</span>
              <span>Imprimir cotización</span>
            </button>
          </div>

          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-green-100 rounded-full mb-4">
              <span className="text-4xl">✅</span>
            </div>
            <h3 className="text-2xl font-poppins font-bold mb-2" style={{ color: '#121212' }}>
              Tu cotización personalizada
            </h3>
            <p className="font-inter text-sm" style={{ color: '#6b7280' }}>
              Hola {formData.name}, esta es tu cotización para {formData.institution || 'tu institución'}
            </p>
          </div>

          {/* Plan seleccionado */}
          <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border-2 border-purple-400">
            <div className="text-center mb-6">
              <div className="inline-block px-4 py-1 bg-purple-600 text-white text-xs font-poppins font-bold rounded-full mb-3">
                {selectedPlan.badge}
              </div>
              <h4 className="text-3xl font-poppins font-bold mb-2" style={{ color: '#121212' }}>
                {selectedPlan.name}
              </h4>
              <p className="font-inter text-sm mb-4" style={{ color: '#6b7280' }}>
                {selectedPlan.description}
              </p>
              <div className="text-5xl font-mono font-bold mb-2" style={{ color: '#8336FF' }}>
                {formatCurrency(selectedPlan.price)}
              </div>
              <p className="text-sm font-inter" style={{ color: '#6b7280' }}>por mes</p>
            </div>
          </div>

          {/* Características del plan */}
          <div className="mb-8 p-6 bg-white rounded-xl border-2 border-gray-200">
            <h4 className="font-poppins font-bold mb-4" style={{ color: '#121212' }}>
              ✨ Lo que incluye tu plan
            </h4>
            
            <div className="grid md:grid-cols-2 gap-3">
              {selectedPlan.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className="text-green-500 text-lg mt-0.5">✓</span>
                  <span className="font-inter text-sm" style={{ color: '#4b5563' }}>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Resumen de necesidades */}
          <div className="mb-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
            <h4 className="font-poppins font-bold mb-4" style={{ color: '#121212' }}>
              📊 Resumen de tus necesidades
            </h4>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-3 bg-white rounded-lg">
                <div className="text-2xl font-mono font-bold mb-1" style={{ color: '#8336FF' }}>
                  {projection.studentsPerMonth}
                </div>
                <div className="text-xs font-inter" style={{ color: '#6b7280' }}>Estudiantes nuevos/mes</div>
              </div>
              <div className="text-center p-3 bg-white rounded-lg">
                <div className="text-2xl font-mono font-bold mb-1" style={{ color: '#8336FF' }}>
                  {projection.consultasPerStudent}
                </div>
                <div className="text-xs font-inter" style={{ color: '#6b7280' }}>Consultas por estudiante</div>
              </div>
              <div className="text-center p-3 bg-white rounded-lg">
                <div className="text-2xl font-mono font-bold mb-1" style={{ color: '#8336FF' }}>
                  ~{projection.totalMessages.toLocaleString()}
                </div>
                <div className="text-xs font-inter" style={{ color: '#6b7280' }}>Mensajes estimados/mes</div>
              </div>
            </div>
            
            <p className="text-xs text-center font-inter mt-4" style={{ color: '#6b7280' }}>
              💡 Tu plan {selectedPlan.name} incluye {selectedPlan.messages.toLocaleString()} mensajes/mes, ideal para {selectedPlan.students}
            </p>
          </div>


          <div className="flex gap-4">
            <button
              onClick={() => {
                setStep('input');
                setHasAutoPrinted(false);
              }}
              className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-lg font-poppins font-semibold text-gray-700 hover:bg-gray-50"
            >
              ← Recalcular
            </button>
            <button
              onClick={handleRequestDemo}
              className="flex-1 px-6 py-3 rounded-lg font-poppins font-bold text-white"
              style={{ background: 'linear-gradient(135deg, #08C4F4 0%, #8336FF 100%)' }}
            >
              Agendar demo
            </button>
          </div>
        </div>

        {/* Vista de impresión */}
        {renderPrintView()}
      </div>
    );
  };

  return (
    <>
      <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 shadow-lg">
        {step === 'input' && renderInput()}
        {step === 'plan' && renderPlan()}
        {step === 'form' && renderForm()}
        {step === 'results' && renderResults()}
      </div>

      {/* Modal de confirmación de demo */}
      {showDemoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="text-center">
              <div className="inline-block p-4 bg-green-100 rounded-full mb-4">
                <span className="text-5xl">✅</span>
              </div>
              <h3 className="text-2xl font-poppins font-bold mb-3" style={{ color: '#121212' }}>
                ¡Demo agendada!
              </h3>
              <p className="font-inter text-base mb-6" style={{ color: '#4b5563' }}>
                Te contactaremos a <strong>{formData.whatsapp}</strong> en las próximas 24 horas para coordinar una demo personalizada.
              </p>
              <p className="font-inter text-sm mb-6" style={{ color: '#6b7280' }}>
                También te enviamos un email a <strong>{formData.email}</strong> con información adicional.
              </p>
              <button
                onClick={() => setShowDemoModal(false)}
                className="w-full px-6 py-3 rounded-lg font-poppins font-bold text-white"
                style={{ background: 'linear-gradient(135deg, #08C4F4 0%, #8336FF 100%)' }}
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
