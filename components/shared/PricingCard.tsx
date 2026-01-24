import React from 'react';
import Badge from './Badge';

interface PricingCardProps {
  title: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  badge?: string;
  badgeColor?: 'blue' | 'green' | 'purple' | 'gray';
  featured?: boolean;
  ctaText?: string;
  ctaAction?: () => void;
}

export default function PricingCard({
  title,
  price,
  period,
  description,
  features,
  badge,
  badgeColor = 'blue',
  featured = false,
  ctaText,
  ctaAction
}: PricingCardProps) {
  return (
    <div
      className={`p-8 rounded-2xl border-2 transition-all ${
        featured ? 'shadow-xl scale-105' : 'shadow-md'
      }`}
      style={{
        borderColor: featured ? '#8336FF' : '#e5e7eb',
        background: featured
          ? 'linear-gradient(135deg, rgba(8,196,244,0.03) 0%, rgba(131,54,255,0.03) 100%)'
          : '#ffffff'
      }}
    >
      {badge && (
        <div className="mb-4">
          <Badge color={badgeColor}>{badge}</Badge>
        </div>
      )}

      <h3 className="text-2xl font-poppins font-bold mb-2" style={{ color: '#121212' }}>
        {title}
      </h3>

      <div className="mb-4">
        <span className="text-5xl font-mono font-bold" style={{ color: featured ? '#8336FF' : '#08C4F4' }}>
          {price}
        </span>
        {period && (
          <span className="text-xl font-inter ml-2" style={{ color: '#6b7280' }}>
            {period}
          </span>
        )}
      </div>

      <p className="text-sm font-inter mb-6" style={{ color: '#4b5563' }}>
        {description}
      </p>

      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="mt-1" style={{ color: '#08C4F4' }}>✓</span>
            <span className="font-inter text-sm" style={{ color: '#4b5563' }}>
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {ctaText && ctaAction && (
        <button
          onClick={ctaAction}
          className="w-full px-6 py-3 rounded-xl font-poppins font-semibold text-white hover:opacity-90 transition-all"
          style={{
            background: featured
              ? 'linear-gradient(135deg, #08C4F4 0%, #8336FF 100%)'
              : '#08C4F4'
          }}
        >
          {ctaText}
        </button>
      )}
    </div>
  );
}
