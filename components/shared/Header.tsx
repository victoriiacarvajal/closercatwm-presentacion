import React from 'react';
import { clarityEvent } from '../../utils/tracking';

interface HeaderProps {
  showNav?: boolean;
  ctaText?: string;
  ctaAction?: () => void;
  ctaTracking?: string;
}

export default function Header({
  showNav = false,
  ctaText = "Agendar demo",
  ctaAction,
  ctaTracking = "cta_header_demo",
  showCta = true
}: HeaderProps & { showCta?: boolean }) {
  const handleCTAClick = () => {
    clarityEvent(ctaTracking);
    if (ctaAction) {
      ctaAction();
    } else {
      // Default: scroll to form
      const formSection = document.getElementById('agenda');
      if (formSection) {
        formSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <img
            src="/logo-closercat.png"
            alt="CloserCat Pro"
            className="h-10 w-auto"
          />
        </a>

        {/* Navigation (optional) */}
        {showNav && (
          <nav className="hidden items-center gap-6 text-sm font-inter md:flex">
            <a
              href="/#producto"
              className="text-gray-700 hover:text-brand-purple-closer transition-colors"
            >
              Producto
            </a>
            <a
              href="/#casos-uso"
              className="text-gray-700 hover:text-brand-purple-closer transition-colors"
            >
              Casos de uso
            </a>
            <a
              href="/#integraciones"
              className="text-gray-700 hover:text-brand-purple-closer transition-colors"
            >
              Integraciones
            </a>
          </nav>
        )}

        {/* CTA Button */}
        {showCta && (
          <button
            type="button"
            onClick={handleCTAClick}
            className="rounded-xl bg-gradient-brand px-5 py-2.5 text-sm font-poppins font-semibold text-white shadow-sm hover:shadow-md transition-all duration-200"
            style={{
              background: 'linear-gradient(135deg, #08C4F4 0%, #8336FF 100%)',
            }}
          >
            {ctaText}
          </button>
        )}
      </div>
    </header>
  );
}
