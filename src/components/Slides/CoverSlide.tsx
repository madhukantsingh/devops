import React from 'react';
import { motion } from 'framer-motion';
import { SlideData } from '../../data/slides';
import { ArrowRight } from 'lucide-react';

interface Props { slide: SlideData; }

const journey = ['IDEA', 'CODE', 'GIT', 'PIPELINE', 'SERVER', 'CUSTOMER'];

export default function CoverSlide({ slide }: Props) {
  return (
    <div
      style={{
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 48px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background glow */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 600,
        height: 300,
        background: 'radial-gradient(ellipse, rgba(88,166,255,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        {/* Journey */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 40, flexWrap: 'wrap' }}>
          {journey.map((step, i) => (
            <React.Fragment key={step}>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.3 }}
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: 2,
                  color: 'var(--accent)',
                  background: 'var(--accent-dim)',
                  border: '1px solid var(--accent-glow)',
                  borderRadius: 8,
                  padding: '5px 14px',
                }}
              >
                {step}
              </motion.span>
              {i < journey.length - 1 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.1 + 0.5 }}>
                  <ArrowRight size={14} style={{ color: 'var(--text-muted)' }} />
                </motion.div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          style={{
            fontSize: 'clamp(40px, 7vw, 80px)',
            fontWeight: 900,
            background: 'linear-gradient(135deg, #e6edf3 0%, #58a6ff 50%, #79c0ff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            lineHeight: 1.05,
            letterSpacing: -2,
            marginBottom: 20,
          }}
        >
          From Code<br />to Customer
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          style={{ fontSize: 20, color: 'var(--text-secondary)', marginBottom: 12, fontWeight: 400 }}
        >
          How software is built, tested, deployed, and debugged
        </motion.p>

        {/* Meta */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          style={{ fontSize: 14, color: 'var(--text-muted)' }}
        >
          60-minute practical introduction · Git · Servers · CI/CD · Docker · Deployment · Troubleshooting
        </motion.p>
      </motion.div>
    </div>
  );
}
