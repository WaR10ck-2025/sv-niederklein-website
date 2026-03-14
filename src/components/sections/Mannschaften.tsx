import { useEffect, useRef } from 'react'
import { SectionLabel } from '../ui/SectionLabel'
import { SportCard } from '../ui/SportCard'
import { TEAMS, type Team } from '../../lib/constants'

function TeamIcon({ type }: { type: Team['iconType'] }) {
  if (type === 'soccer') {
    return (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 2a10 10 0 0 1 6.32 2.27M12 2a10 10 0 0 0-6.32 2.27"/>
        <path d="m4.93 7 3.07 2 4-2.5 4 2.5 3.07-2"/>
        <path d="M12 21.5v-3l-3-2-1 3"/>
        <path d="M12 21.5v-3l3-2 1 3"/>
      </svg>
    )
  }
  if (type === 'youth') {
    return (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    )
  }
  if (type === 'veteran') {
    return (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="8" r="5"/>
        <path d="M20 21a8 8 0 1 0-16 0"/>
        <path d="M12 13v8"/>
        <path d="m9 18 3 3 3-3"/>
      </svg>
    )
  }
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
      <line x1="4" y1="22" x2="4" y2="15"/>
    </svg>
  )
}

export function Mannschaften() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08 }
    )
    cardRefs.current.forEach(el => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="mannschaften"
      style={{
        background: 'var(--color-surface)',
        padding: '96px 2rem',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <SectionLabel text="Unsere Teams" />
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            color: 'var(--color-text-dark)',
            letterSpacing: '-0.01em',
            lineHeight: 1.1,
            marginBottom: '3rem',
          }}
        >
          Alle Mannschaften
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {TEAMS.map((team, i) => (
            <div
              key={team.id}
              ref={el => { cardRefs.current[i] = el }}
              className="reveal"
              style={{ transitionDelay: `${i * 110}ms` }}
            >
              <SportCard style={{ textAlign: 'center', padding: '2.5rem 2rem' }}>
                {/* Icon-Kreis */}
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: 'var(--color-primary-ghost)',
                    border: '1px solid var(--color-primary-dim)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.25rem',
                    color: 'var(--color-primary)',
                  }}
                >
                  <TeamIcon type={team.iconType} />
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: '1.25rem',
                    letterSpacing: '0.02em',
                    textTransform: 'uppercase',
                    color: 'var(--color-text-dark)',
                    marginBottom: '0.625rem',
                  }}
                >
                  {team.name}
                </h3>

                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.875rem',
                    color: 'var(--color-text-muted)',
                    lineHeight: 1.65,
                    marginBottom: '1.25rem',
                  }}
                >
                  {team.description}
                </p>

                <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1rem' }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      color: 'var(--color-primary)',
                      marginBottom: '0.375rem',
                    }}
                  >
                    {team.liga}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.8rem',
                      color: 'var(--color-text-muted)',
                    }}
                  >
                    Trainer: {team.trainer}
                  </div>
                </div>
              </SportCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
