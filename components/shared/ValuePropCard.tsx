import React from 'react';
import { ValuePropData } from '../../types';

interface ValuePropCardProps extends ValuePropData {
  imagePosition?: 'left' | 'right';
  capabilityNumber?: number;
}

export default function ValuePropCard({ 
  icon, 
  title, 
  feature, 
  capability, 
  benefit,
  screenshot,
  imagePosition = 'right',
  capabilityNumber
}: ValuePropCardProps) {
  const badgeColors = ['blue', 'green', 'purple', 'red'];
  const badgeColor = capabilityNumber ? badgeColors[(capabilityNumber - 1) % 4] : 'blue';
  
  const badgeClasses = {
    blue: 'bg-blue-50 text-brand-blue-dark',
    green: 'bg-green-50 text-green-700',
    purple: 'text-brand-purple-closer',
    red: 'bg-red-50 text-red-700',
  }[badgeColor];

  const badgeStyle = badgeColor === 'purple' ? { backgroundColor: 'rgba(131, 54, 255, 0.1)' } : undefined;

  const content = (
    <div className={imagePosition === 'left' ? 'order-2 md:order-2' : 'order-1 md:order-1'}>
      {capabilityNumber && (
        <div 
          className={`inline-block px-3 py-1 rounded-full text-xs font-poppins font-semibold mb-3 ${badgeClasses}`}
          style={badgeStyle}
        >
          Capability #{capabilityNumber}
        </div>
      )}
      <h3 className="text-2xl font-poppins font-bold mb-4" style={{ color: '#121212' }}>
        {icon} {title}
      </h3>
      
      <div className="space-y-4 text-sm">
        <div>
          <strong className="font-poppins font-semibold" style={{ color: '#121212' }}>Feature:</strong>
          <p className="font-inter mt-1" style={{ color: '#4b5563' }}>{feature}</p>
        </div>
        
        <div>
          <strong className="font-poppins font-semibold" style={{ color: '#121212' }}>Capability:</strong>
          <p className="font-inter mt-1" style={{ color: '#4b5563' }}>{capability}</p>
        </div>
        
        <div>
          <strong className="font-poppins font-semibold" style={{ color: '#121212' }}>Benefit:</strong>
          <p className="font-inter mt-1" style={{ color: '#4b5563' }} dangerouslySetInnerHTML={{ __html: benefit }} />
        </div>
      </div>
    </div>
  );

  const image = screenshot ? (
    <div className={`rounded-xl border border-gray-200 overflow-hidden ${imagePosition === 'left' ? 'order-1 md:order-1' : 'order-2 md:order-2'}`}>
      <img 
        src={screenshot} 
        alt={title}
        className="w-full"
        loading="lazy"
      />
    </div>
  ) : (
    <div className={`rounded-xl border border-gray-200 bg-gray-50 p-8 flex items-center justify-center ${imagePosition === 'left' ? 'order-1 md:order-1' : 'order-2 md:order-2'}`}>
      <div className="text-6xl opacity-20">{icon}</div>
    </div>
  );

  return (
    <div className="grid md:grid-cols-2 gap-8 items-center">
      {imagePosition === 'left' ? (
        <>
          {image}
          {content}
        </>
      ) : (
        <>
          {content}
          {image}
        </>
      )}
    </div>
  );
}
