import React, { useState, useEffect } from 'react';
import { clarityEvent } from '../../utils/tracking';

interface MessageType {
  id: string;
  label: string;
  icon: string;
  costPerMessage: number;
  description: string;
}

const MESSAGE_TYPES: MessageType[] = [
  {
    id: 'text_ia',
    label: 'Texto IA',
    icon: '💬',
    costPerMessage: 180,
    description: 'Respuestas automáticas con IA'
  },
  {
    id: 'audio_ia',
    label: 'Audio IA',
    icon: '🎤',
    costPerMessage: 256,
    description: 'Notas de voz con IA'
  },
  {
    id: 'image_ia',
    label: 'Imagen IA',
    icon: '🖼️',
    costPerMessage: 247,
    description: 'Imágenes con IA'
  },
  {
    id: 'campaign',
    label: 'Campaña Marketing',
    icon: '📢',
    costPerMessage: 66,
    description: 'Mensajes masivos de campaña'
  }
];

const PACKAGES = [
  { messages: 1000, price: 180000, expiration: '90 días', pricePerMsg: 180 },
  { messages: 5000, price: 810000, expiration: '120 días', pricePerMsg: 162 },
  { messages: 10000, price: 1530000, expiration: '180 días', pricePerMsg: 153 },
  { messages: 25000, price: 3600000, expiration: '365 días', pricePerMsg: 144 }
];

export default function PricingCalculator() {
  const [step, setStep] = useState<'input' | 'form' | 'results'>('input');
  const [quantities, setQuantities] = useState<Record<string, number>>({
    text_ia: 0,
    audio_ia: 0,
    image_ia: 0,
    campaign: 0
  });

  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    email: '',
    business: ''
  });

  const [totalCost, setTotalCost] = useState(0);
  const [totalMessages, setTotalMessages] = useState(0);
  const [avgCostPerMessage, setAvgCostPerMessage] = useState(0);
  const [recommendedPackage, setRecommendedPackage] = useState<typeof PACKAGES[0] | null>(null);

  useEffect(() => {
    let cost = 0;
    let messages = 0;

    MESSAGE_TYPES.forEach(type => {
      const qty = quantities[type.id] || 0;
      cost += qty * type.costPerMessage;
      messages += qty;
    });

    setTotalCost(cost);
    setTotalMessages(messages);
    setAvgCostPerMessage(messages > 0 ? cost / messages : 0);

    // Recomendar paquete
    if (messages > 0) {
      const suitable = PACKAGES.find(pkg => pkg.messages >= messages);
      setRecommendedPackage(suitable || PACKAGES[PACKAGES.length - 1]);
    } else {
      setRecommendedPackage(null);
    }
  }, [quantities]);

  const handleQuantityChange = (typeId: string, value: string) => {
    const numValue = parseInt(value) || 0;
    setQuantities(prev => ({ ...prev, [typeId]: Math.max(0, numValue) }));
  };

  const handleFormChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleContinueToForm = () => {
    if (totalMessages === 0) {
      alert('Por favor ingresa al menos un tipo de mensaje para continuar');
      return;
    }
    clarityEvent('calculator_continue_to_form');
    setStep('form');
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.whatsapp || !formData.email) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    clarityEvent('calculator_form_submitted');

    setStep('results');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Step 1: Input de mensajes
  const renderInputStep = () => (
    <div>
      <h3 className="text-2xl font-poppins font-bold mb-2" style={{ color: '#121212' }}>
        Paso 1: Estima tu volumen mensual
      </h3>
      <p className="font-inter text-sm mb-8" style={{ color: '#6b7280' }}>
        Ingresa aproximadamente cuántos mensajes enviarías al mes por tipo
      </p>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {MESSAGE_TYPES.map(type => (
          <div key={type.id} className="p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{type.icon}</span>
              <div className="flex-1">
                <h4 className="font-poppins font-semibold text-sm" style={{ color: '#121212' }}>
                  {type.label}
                </h4>
                <p className="text-xs font-inter" style={{ color: '#6b7280' }}>
                  {type.description}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 mt-3">
              <input
                type="number"
                min="0"
                value={quantities[type.id] || ''}
                onChange={(e) => handleQuantityChange(type.id, e.target.value)}
                placeholder="0"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-xs font-inter whitespace-nowrap" style={{ color: '#6b7280' }}>
                × ${type.costPerMessage}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t-2 border-gray-200 pt-6 mt-8">
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="text-center p-4 bg-blue-50 rounded-xl">
            <div className="text-xs font-poppins font-semibold mb-1" style={{ color: '#6b7280' }}>
              Total Mensajes
            </div>
            <div className="text-3xl font-mono font-bold" style={{ color: '#08C4F4' }}>
              {totalMessages.toLocaleString()}
            </div>
          </div>
          
          <div className="text-center p-4 bg-purple-50 rounded-xl">
            <div className="text-xs font-poppins font-semibold mb-1" style={{ color: '#6b7280' }}>
              Costo Total
            </div>
            <div className="text-3xl font-mono font-bold" style={{ color: '#8336FF' }}>
              {formatCurrency(totalCost)}
            </div>
          </div>
          
        </div>
        
        <div className="text-center mt-8">
          <button
            onClick={handleContinueToForm}
            className="px-8 py-4 rounded-xl font-poppins font-bold text-lg text-white transition-all hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #08C4F4 0%, #8336FF 100%)' }}
          >
            Ver mi cotización personalizada →
          </button>
          <p className="mt-4 text-xs font-inter" style={{ color: '#6b7280' }}>
            🔒 Ingresa tus datos para desbloquear la cotización completa
          </p>
        </div>
      </div>
    </div>
  );

  // Step 2: Formulario de lead capture
  const renderFormStep = () => (
    <div>
      <div className="text-center mb-8">
        <div className="inline-block p-4 bg-purple-100 rounded-full mb-4">
          <span className="text-4xl">🎯</span>
        </div>
        <h3 className="text-2xl font-poppins font-bold mb-2" style={{ color: '#121212' }}>
          Paso 2: Recibe tu cotización personalizada
        </h3>
        <p className="font-inter text-sm" style={{ color: '#6b7280' }}>
          Completa estos datos para desbloquear tu cotización detallada
        </p>
      </div>

      <form onSubmit={handleSubmitForm} className="max-w-2xl mx-auto">
        <div className="space-y-4">
          <div>
            <label className="block font-poppins font-semibold text-sm mb-2" style={{ color: '#121212' }}>
              Nombre completo *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleFormChange('name', e.target.value)}
              placeholder="Ej: Juan Pérez"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg font-inter focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label className="block font-poppins font-semibold text-sm mb-2" style={{ color: '#121212' }}>
              WhatsApp *
            </label>
            <input
              type="tel"
              value={formData.whatsapp}
              onChange={(e) => handleFormChange('whatsapp', e.target.value)}
              placeholder="Ej: +57 300 123 4567"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg font-inter focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label className="block font-poppins font-semibold text-sm mb-2" style={{ color: '#121212' }}>
              Email *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleFormChange('email', e.target.value)}
              placeholder="Ej: juan@empresa.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg font-inter focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label className="block font-poppins font-semibold text-sm mb-2" style={{ color: '#121212' }}>
              Nombre de tu negocio (opcional)
            </label>
            <input
              type="text"
              value={formData.business}
              onChange={(e) => handleFormChange('business', e.target.value)}
              placeholder="Ej: Mi Tienda Online"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg font-inter focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        <div className="mt-8 flex gap-4">
          <button
            type="button"
            onClick={() => setStep('input')}
            className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-lg font-poppins font-semibold text-gray-700 hover:bg-gray-50"
          >
            ← Volver
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

  // Step 3: Resultados completos
  const renderResultsStep = () => (
    <div>
      <div className="text-center mb-8">
        <div className="inline-block p-4 bg-green-100 rounded-full mb-4">
          <span className="text-4xl">✅</span>
        </div>
        <h3 className="text-2xl font-poppins font-bold mb-2" style={{ color: '#121212' }}>
          Tu cotización personalizada
        </h3>
        <p className="font-inter text-sm" style={{ color: '#6b7280' }}>
          Hola {formData.name}, aquí está el desglose completo de tu inversión mensual
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="text-center p-4 bg-blue-50 rounded-xl">
          <div className="text-xs font-poppins font-semibold mb-1" style={{ color: '#6b7280' }}>
            Total Mensajes
          </div>
          <div className="text-3xl font-mono font-bold" style={{ color: '#08C4F4' }}>
            {totalMessages.toLocaleString()}
          </div>
        </div>
        
        <div className="text-center p-4 bg-purple-50 rounded-xl">
          <div className="text-xs font-poppins font-semibold mb-1" style={{ color: '#6b7280' }}>
            Costo Total
          </div>
          <div className="text-3xl font-mono font-bold" style={{ color: '#8336FF' }}>
            {formatCurrency(totalCost)}
          </div>
        </div>
        
        <div className="text-center p-4 bg-green-50 rounded-xl">
          <div className="text-xs font-poppins font-semibold mb-1" style={{ color: '#6b7280' }}>
            Costo Promedio/Msg
          </div>
          <div className="text-3xl font-mono font-bold" style={{ color: '#10b981' }}>
            ${Math.round(avgCostPerMessage)}
          </div>
        </div>
      </div>

      {/* Recommended Package */}
      {recommendedPackage && (
          <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border-2 border-purple-200">
            <div className="flex items-start gap-4">
              <div className="text-4xl">💡</div>
              <div className="flex-1">
                <h4 className="font-poppins font-bold mb-2" style={{ color: '#121212' }}>
                  Paquete Recomendado
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-inter text-sm mb-1" style={{ color: '#4b5563' }}>
                      <strong>{recommendedPackage.messages.toLocaleString()} mensajes</strong> por {formatCurrency(recommendedPackage.price)}
                    </p>
                    <p className="font-inter text-xs" style={{ color: '#6b7280' }}>
                      Expira en {recommendedPackage.expiration} · ${recommendedPackage.pricePerMsg}/mensaje
                    </p>
                  </div>
                  <div className="flex items-center justify-end">
                    {totalCost > recommendedPackage.price ? (
                      <div className="text-right">
                        <p className="text-xs font-inter mb-1" style={{ color: '#6b7280' }}>Ahorras:</p>
                        <p className="text-2xl font-mono font-bold" style={{ color: '#10b981' }}>
                          {formatCurrency(totalCost - recommendedPackage.price)}
                        </p>
                      </div>
                    ) : (
                      <div className="text-right">
                        <p className="text-xs font-inter mb-1" style={{ color: '#6b7280' }}>Mensajes extra:</p>
                        <p className="text-2xl font-mono font-bold" style={{ color: '#08C4F4' }}>
                          {(recommendedPackage.messages - totalMessages).toLocaleString()}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      {/* Packages Table */}
      <div className="mt-8">
        <h4 className="font-poppins font-semibold mb-4" style={{ color: '#121212' }}>
          Todos los paquetes disponibles
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-poppins font-semibold" style={{ color: '#121212' }}>Paquete</th>
                <th className="text-right py-3 px-4 font-poppins font-semibold" style={{ color: '#121212' }}>Mensajes</th>
                <th className="text-right py-3 px-4 font-poppins font-semibold" style={{ color: '#121212' }}>Precio</th>
                <th className="text-right py-3 px-4 font-poppins font-semibold" style={{ color: '#121212' }}>$/Msg</th>
                <th className="text-center py-3 px-4 font-poppins font-semibold" style={{ color: '#121212' }}>Expira</th>
              </tr>
            </thead>
            <tbody>
              {PACKAGES.map((pkg, index) => (
                <tr 
                  key={index} 
                  className={`border-b border-gray-100 ${recommendedPackage?.messages === pkg.messages ? 'bg-purple-50' : ''}`}
                >
                  <td className="py-3 px-4 font-inter" style={{ color: '#4b5563' }}>
                    {index === 0 ? 'Starter' : index === 1 ? 'Growth' : index === 2 ? 'Pro' : 'Enterprise'}
                  </td>
                  <td className="text-right py-3 px-4 font-mono" style={{ color: '#4b5563' }}>
                    {pkg.messages.toLocaleString()}
                  </td>
                  <td className="text-right py-3 px-4 font-mono font-semibold" style={{ color: '#121212' }}>
                    {formatCurrency(pkg.price)}
                  </td>
                  <td className="text-right py-3 px-4 font-mono" style={{ color: '#6b7280' }}>
                    ${pkg.pricePerMsg}
                  </td>
                  <td className="text-center py-3 px-4 font-inter text-xs" style={{ color: '#6b7280' }}>
                    {pkg.expiration}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <p className="text-xs font-inter" style={{ color: '#121212' }}>
          <strong>⚠️ Recargo por multimedia:</strong> Si audio/imagen supera el 20% del tráfico total → +$50-70/mensaje adicional.
        </p>
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={() => setStep('input')}
          className="px-6 py-3 border-2 border-gray-300 rounded-lg font-poppins font-semibold text-gray-700 hover:bg-gray-50"
        >
          ← Recalcular
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 shadow-lg">
      {step === 'input' && renderInputStep()}
      {step === 'form' && renderFormStep()}
      {step === 'results' && renderResultsStep()}
    </div>
  );
}
