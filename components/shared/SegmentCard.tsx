import React from 'react';
import { SegmentCardProps } from '../../types';
import { clarityEvent, buildUrlWithUtm } from '../../utils/tracking';

export default function SegmentCard({ 
  segment, 
  icon, 
  title, 
  description, 
  badge, 
  badgeColor, 
  featured = false 
}: SegmentCardProps) {
  const handleClick = () => {
    clarityEvent(`segment_click_${segment}`);
  };

  const badgeColorClasses = {
    blue: 'bg-blue-50 text-brand-blue-dark',
    green: 'bg-green-50 text-green-700',
    gray: 'bg-gray-100 text-gray-600',
    purple: 'text-brand-purple-closer',
  };

  const badgeStyles = {
    purple: { backgroundColor: 'rgba(131, 54, 255, 0.1)' },
  };

  const url = buildUrlWithUtm(`/?segment=${segment}`, {
    utm_source: 'homepage',
    utm_medium: 'segment_selector',
    utm_campaign: segment,
  });

  return (
    <a
      href={url}
      onClick={handleClick}
      className={`
        block p-8 rounded-2xl border-2 transition-all hover:scale-105 hover:shadow-lg
        ${featured 
          ? 'shadow-lg' 
          : 'border-gray-200 bg-white hover:border-gray-300'
        }
      `}
      style={featured ? {
        textDecoration: 'none',
        color: 'inherit',
        borderColor: '#8336FF',
        background: 'linear-gradient(135deg, rgba(8,196,244,0.05) 0%, rgba(131,54,255,0.05) 100%)',
      } : { textDecoration: 'none', color: 'inherit' }}
    >
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-xl font-poppins font-bold mb-2" style={{ color: '#121212' }}>{title}</h3>
      <p className="text-sm font-inter mb-4" style={{ color: '#6b7280' }}>{description}</p>
      <span 
        className={`inline-block px-3 py-1 rounded-full text-xs font-poppins font-semibold ${badgeColorClasses[badgeColor]}`}
        style={badgeColor === 'purple' ? badgeStyles.purple : undefined}
      >
        {badge}
      </span>
    </a>
  );
}
