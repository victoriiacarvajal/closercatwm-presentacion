import React from 'react';

interface FlowStep {
  number: number;
  title: string;
  description: string;
  icon?: string;
}

interface FlowDiagramProps {
  steps: FlowStep[];
  orientation?: 'horizontal' | 'vertical';
}

export default function FlowDiagram({ steps, orientation = 'horizontal' }: FlowDiagramProps) {
  const isHorizontal = orientation === 'horizontal';

  return (
    <div className={`flex ${isHorizontal ? 'flex-col md:flex-row' : 'flex-col'} gap-6 items-center justify-center`}>
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          <div className="flex-1 max-w-xs">
            <div className="text-center">
              <div
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center font-poppins font-bold text-2xl text-white"
                style={{ background: 'linear-gradient(135deg, #08C4F4 0%, #8336FF 100%)' }}
              >
                {step.icon || step.number}
              </div>
              
              <h3 className="text-lg font-poppins font-bold mb-2" style={{ color: '#121212' }}>
                {step.title}
              </h3>
              
              <p className="text-sm font-inter" style={{ color: '#4b5563' }}>
                {step.description}
              </p>
            </div>
          </div>

          {index < steps.length - 1 && (
            <div className={`${isHorizontal ? 'hidden md:block' : 'block'}`}>
              <div
                className={`${isHorizontal ? 'w-12 h-0.5' : 'h-12 w-0.5 mx-auto'}`}
                style={{ backgroundColor: '#08C4F4' }}
              />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
