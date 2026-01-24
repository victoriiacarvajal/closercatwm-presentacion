import React from 'react';
import { clarityEvent, buildUrlWithUtm, getUtmParams } from '../../utils/tracking';

interface CTAButtonProps {
  variant: 'primary' | 'secondary';
  onClick?: () => void;
  href?: string;
  tracking?: string;
  children: React.ReactNode;
  className?: string;
}

export default function CTAButton({
  children,
  variant = 'primary',
  onClick,
  tracking,
  href,
  className = '',
}: CTAButtonProps) {
  const handleClick = () => {
    if (tracking) {
      clarityEvent(tracking);
    }
    if (onClick) {
      onClick();
    }
  };

  const baseClasses = 'inline-flex items-center justify-center px-6 py-3 rounded-xl font-poppins font-semibold transition-all duration-200';
  
  const variantClasses = {
    primary: 'text-white shadow-sm hover:shadow-md',
    secondary: 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50',
    outline: 'bg-transparent text-brand-purple-closer border border-brand-purple-closer/30 hover:bg-brand-purple-closer/5',
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (href) {
    const url = buildUrlWithUtm(href, getUtmParams());
    return (
      <a
        href={url}
        onClick={handleClick}
        className={classes}
        style={variant === 'primary' ? {
          background: 'linear-gradient(135deg, #08C4F4 0%, #8336FF 100%)',
        } : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={classes}
      style={variant === 'primary' ? {
        background: 'linear-gradient(135deg, #08C4F4 0%, #8336FF 100%)',
      } : undefined}
    >
      {children}
    </button>
  );
}
