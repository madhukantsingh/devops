import React, { ReactNode } from 'react';
import { Lightbulb } from 'lucide-react';
import { SlideData } from '../../data/slides';

interface SlideWrapperProps {
  slide: SlideData;
  children: ReactNode;
  centerContent?: boolean;
}

export default function SlideWrapper({ slide, children, centerContent = false }: SlideWrapperProps) {
  return (
    <div className="slide-root">
      {/* Content area */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: centerContent ? 'center' : 'flex-start',
        }}
      >
        {children}
      </div>

      {/* Key Takeaway bar */}
      <div
        style={{
          marginTop: 20,
          background: 'var(--accent-dim)',
          border: '1px solid var(--accent-glow)',
          borderRadius: 10,
          padding: '10px 14px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: 10,
          flexShrink: 0,
        }}
      >
        <Lightbulb size={15} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 2 }} />
        <div>
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: 1.5,
              color: 'var(--accent)',
              textTransform: 'uppercase',
              marginRight: 8,
            }}
          >
            Key Takeaway
          </span>
          <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{slide.takeaway}</span>
        </div>
      </div>
    </div>
  );
}
