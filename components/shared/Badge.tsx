import React from 'react';
import { BadgeColor } from '../../types';

interface BadgeProps {
  children: React.ReactNode;
  color?: 'blue' | 'green' | 'purple' | 'gray';
  icon?: string;
}

const colorClasses = {
  blue: 'bg-blue-50 text-brand-blue-dark border-brand-blue-primary/30',
  green: 'bg-green-50 text-green-700 border-green-300',
  purple: 'bg-purple-50 text-brand-purple-closer border-brand-purple-closer/30',
  gray: 'bg-gray-100 text-gray-700 border-gray-300',
};

export default function Badge({ children, color = 'blue', icon }: BadgeProps) {
  return (
    <span 
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-poppins font-semibold border ${colorClasses[color]}`}
    >
      {icon && <span className="text-base">{icon}</span>}
      {children}
    </span>
  );
}
