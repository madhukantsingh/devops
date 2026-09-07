import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SlideData } from '../../data/slides';
import SlideWrapper from './SlideWrapper';

interface Props { slide: SlideData; }

const roles = [
  {
    id: 'ceo',
    name: 'Business / CEO',
    icon: '🏢',
    desc: 'Defines business goals and outcomes.',
    color: '#bc8cff',
    journeyPosition: 0,
    detail: 'Sets the strategic direction. Approves investment, defines success metrics, and ensures the product aligns with business objectives.',
  },
  {
    id: 'product',
    name: 'Product',
    icon: '📋',
    desc: 'Turns business goals into requirements.',
    color: '#58a6ff',
    journeyPosition: 1,
    detail: 'Translates business objectives into user stories, acceptance criteria, and a prioritised backlog. The bridge between business and technical teams.',
  },
  {
    id: 'design',
    name: 'Design',
    icon: '🎨',
    desc: 'Defines the user experience.',
    color: '#79c0ff',
    journeyPosition: 2,
    detail: 'Creates wireframes, prototypes, and final UI specifications. Ensures the product is usable, accessible, and visually consistent.',
  },
  {
    id: 'developer',
    name: 'Developer',
    icon: '💻',
    desc: 'Turns requirements into software.',
    color: '#3fb950',
    journeyPosition: 3,
    detail: 'Writes the frontend, backend, and integration code. Uses Git to version control changes and submits pull requests for review.',
  },
  {
    id: 'qa',
    name: 'QA / Tester',
    icon: '🧪',
    desc: 'Checks whether the software behaves correctly.',
    color: '#ffa657',
    journeyPosition: 4,
    detail: 'Writes and runs automated tests. Performs manual exploratory testing. Ensures bugs are caught before they reach production.',
  },
  {
    id: 'devops',
    name: 'DevOps / Infra',
    icon: '⚙️',
    desc: 'Makes software buildable, deployable, observable, and available.',
    color: '#f78166',
    journeyPosition: 5,
    detail: 'Manages servers, CI/CD pipelines, Docker, monitoring, and deployment automation. Ensures reliability and observability of the system.',
  },
  {
    id: 'customer',
    name: 'Customer',
    icon: '👤',
    desc: 'Uses the final product.',
    color: '#56d364',
    journeyPosition: 6,
    detail: 'Provides feedback through usage patterns, support requests, and explicit feedback — which feeds back into the next business requirement.',
  },
];

export default function RolesSlide({ slide }: Props) {
  const [active, setActive] = useState<string | null>(null);
  const activeRole = roles.find((r) => r.id === active);

  return (
    <SlideWrapper slide={slide}>
      <h2 style={{ fontSize: 'clamp(20px, 3vw, 36px)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 8 }}>{slide.title}</h2>
      <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 24 }}>Click a role to see their position in the software journey</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12, marginBottom: 20 }}>
        {roles.map((role, i) => {
          const isActive = active === role.id;
          return (
            <motion.button
              key={role.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              onClick={() => setActive(isActive ? null : role.id)}
              style={{
                background: isActive ? `${role.color}1a` : 'var(--bg-card)',
                border: `1px solid ${isActive ? role.color : 'var(--border)'}`,
                borderRadius: 12,
                padding: '14px 16px',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s',
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div style={{ fontSize: 28, marginBottom: 6 }}>{role.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: isActive ? role.color : 'var(--text-primary)', marginBottom: 4 }}>{role.name}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.4 }}>{role.desc}</div>
            </motion.button>
          );
        })}
      </div>

      {/* Detail panel */}
      {activeRole && (
        <motion.div
          key={activeRole.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: `${activeRole.color}12`,
            border: `1px solid ${activeRole.color}40`,
            borderRadius: 12,
            padding: '16px 20px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <span style={{ fontSize: 24 }}>{activeRole.icon}</span>
            <span style={{ fontSize: 16, fontWeight: 700, color: activeRole.color }}>{activeRole.name}</span>
          </div>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{activeRole.detail}</p>

          {/* Journey position */}
          <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
            {['Business', 'Product', 'Design', 'Developer', 'QA', 'DevOps', 'Customer'].map((r, i) => (
              <React.Fragment key={r}>
                <span style={{
                  fontSize: 11,
                  fontWeight: 600,
                  padding: '2px 8px',
                  borderRadius: 6,
                  background: i === activeRole.journeyPosition ? activeRole.color : 'var(--bg-card)',
                  color: i === activeRole.journeyPosition ? '#0d1117' : 'var(--text-muted)',
                  transition: '0.2s',
                }}>
                  {r}
                </span>
                {i < 6 && <span style={{ color: 'var(--text-muted)', fontSize: 10 }}>→</span>}
              </React.Fragment>
            ))}
          </div>
        </motion.div>
      )}
    </SlideWrapper>
  );
}
