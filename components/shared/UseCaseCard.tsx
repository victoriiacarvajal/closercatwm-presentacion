import React from 'react';

interface UseCaseCardProps {
  icon: string;
  title: string;
  description: string;
  features: string[];
  available?: boolean;
}

export default function UseCaseCard({
  icon,
  title,
  description,
  features,
  available = true
}: UseCaseCardProps) {
  return (
    <div
      className={`p-6 rounded-2xl border-2 transition-all ${
        available ? 'hover:border-blue-400 cursor-pointer' : 'opacity-60'
      }`}
      style={{ borderColor: '#e5e7eb' }}
    >
      <div className="text-5xl mb-4">{icon}</div>
      
      <h3 className="text-xl font-poppins font-bold mb-3" style={{ color: '#121212' }}>
        {title}
      </h3>
      
      <p className="font-inter text-sm mb-4" style={{ color: '#4b5563' }}>
        {description}
      </p>
      
      <div className="space-y-2">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <span style={{ color: '#08C4F4' }}>✓</span>
            <span className="font-inter" style={{ color: '#4b5563' }}>
              {feature}
            </span>
          </div>
        ))}
      </div>
      
      {!available && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <span className="text-xs font-poppins font-semibold" style={{ color: '#6b7280' }}>
            Próximamente
          </span>
        </div>
      )}
    </div>
  );
}
