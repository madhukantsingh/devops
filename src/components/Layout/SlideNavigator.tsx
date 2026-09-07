import React from 'react';
import { SlideData } from '../../data/slides';
import { Clock } from 'lucide-react';

interface SlideNavigatorProps {
  slides: SlideData[];
  currentIndex: number;
  onGoTo: (idx: number) => void;
}

export default function SlideNavigator({ slides, currentIndex, onGoTo }: SlideNavigatorProps) {
  const sections = Array.from(new Set(slides.map((s) => s.section)));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {sections.map((section) => {
        const sectionSlides = slides.filter((s) => s.section === section);
        return (
          <div key={section}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 1.5,
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                marginBottom: 8,
              }}
            >
              {section}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 8 }}>
              {sectionSlides.map((slide) => {
                const idx = slides.indexOf(slide);
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={slide.id}
                    onClick={() => onGoTo(idx)}
                    style={{
                      background: isActive ? 'var(--accent-dim)' : 'var(--bg-card)',
                      border: isActive ? '1px solid var(--accent)' : '1px solid var(--border)',
                      borderRadius: 8,
                      padding: '10px 12px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg-card-hover)';
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg-card)';
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          color: isActive ? 'var(--accent)' : 'var(--text-muted)',
                        }}
                      >
                        #{slide.id}
                      </span>
                      {slide.label === 'OPTIONAL' && (
                        <span
                          style={{
                            fontSize: 9,
                            fontWeight: 700,
                            background: 'var(--warning-dim)',
                            color: 'var(--warning)',
                            borderRadius: 4,
                            padding: '1px 5px',
                            letterSpacing: 0.5,
                          }}
                        >
                          OPT
                        </span>
                      )}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 500,
                        color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                        lineHeight: 1.3,
                        marginBottom: 6,
                      }}
                    >
                      {slide.title.length > 45 ? slide.title.slice(0, 45) + '…' : slide.title}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Clock size={9} style={{ color: 'var(--text-muted)' }} />
                      <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>{slide.duration} min</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
