import { useEffect, useRef } from 'react'
import { SectionLabel } from '../ui/SectionLabel'
import { MatchBadge } from '../ui/MatchBadge'
import { SportButton } from '../ui/SportButton'
import { useFussballMatches } from '../../hooks/useFussballMatches'

// ─── Lade-Skeleton ───────────────────────────────────────────────────────────
function MatchSkeleton() {
  return (
    <div
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: '6px',
        padding: '1.25rem 1.5rem',
        display: 'grid',
        gridTemplateColumns: '80px 1fr auto auto',
        alignItems: 'center',
        gap: '1.5rem',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', alignItems: 'center' }}>
        <div className="skeleton-bar" style={{ width: '32px', height: '28px', borderRadius: '4px' }} />
        <div className="skeleton-bar" style={{ width: '24px', height: '12px', borderRadius: '3px' }} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        <div className="skeleton-bar" style={{ width: '220px', height: '16px', borderRadius: '3px' }} />
        <div className="skeleton-bar" style={{ width: '120px', height: '12px', borderRadius: '3px' }} />
      </div>
      <div className="skeleton-bar" style={{ width: '48px', height: '22px', borderRadius: '99px' }} />
      <div className="skeleton-bar" style={{ width: '60px', height: '16px', borderRadius: '3px' }} />
    </div>
  )
}

// ─── Status-Badge ────────────────────────────────────────────────────────────
function LiveBadge({ live }: { live: boolean }) {
  return (
    <span
      title={live ? 'Echtzeit-Daten von fussball.de' : 'Statische Vorschaudaten'}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.3rem',
        fontFamily: 'var(--font-body)',
        fontSize: '0.6875rem',
        fontWeight: 600,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        color: live ? '#15803d' : 'var(--color-text-muted)',
        background: live ? '#dcfce7' : 'var(--color-surface)',
        border: `1px solid ${live ? '#86efac' : 'var(--color-border)'}`,
        borderRadius: '99px',
        padding: '0.2rem 0.6rem',
        marginLeft: '0.75rem',
        verticalAlign: 'middle',
      }}
    >
      <span
        style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: live ? '#16a34a' : '#9ca3af',
          flexShrink: 0,
        }}
      />
      {live ? 'Live' : 'Vorschau'}
    </span>
  )
}

// ─── Hauptkomponente ─────────────────────────────────────────────────────────
export function NaechsteSpiele() {
  const { matches, status } = useFussballMatches()
  const rowRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (status === 'loading') return
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
    rowRefs.current.forEach(el => el && observer.observe(el))
    return () => observer.disconnect()
  }, [status])

  return (
    <section
      id="naechste-spiele"
      style={{
        background: 'var(--color-white)',
        padding: '96px 2rem',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <SectionLabel text="Spielplan" />
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
          Nächste Spiele
          {status !== 'loading' && <LiveBadge live={status === 'live'} />}
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {status === 'loading'
            ? Array.from({ length: 4 }, (_, i) => <MatchSkeleton key={i} />)
            : matches.map((match, i) => (
                <div
                  key={match.id}
                  ref={el => { rowRefs.current[i] = el }}
                  className="reveal"
                  style={{ transitionDelay: `${i * 90}ms` }}
                >
                  <div
                    style={{
                      background: 'var(--color-white)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '6px',
                      padding: '1.25rem 1.5rem',
                      display: 'grid',
                      gridTemplateColumns: '80px 1fr auto auto',
                      alignItems: 'center',
                      gap: '1.5rem',
                      transition: 'border-color 200ms ease, box-shadow 200ms ease',
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement
                      el.style.borderColor = 'var(--color-primary)'
                      el.style.boxShadow = '0 4px 16px var(--color-primary-ghost)'
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement
                      el.style.borderColor = 'var(--color-border)'
                      el.style.boxShadow = 'none'
                    }}
                  >
                    {/* Datum */}
                    <div style={{ textAlign: 'center', flexShrink: 0 }}>
                      <div
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontWeight: 700,
                          fontSize: '1.75rem',
                          color: 'var(--color-primary)',
                          lineHeight: 1,
                        }}
                      >
                        {match.day}.
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          color: 'var(--color-text-muted)',
                          marginTop: '0.2rem',
                        }}
                      >
                        {match.month}
                      </div>
                    </div>

                    {/* Teams */}
                    <div>
                      <div
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontWeight: 600,
                          fontSize: '0.9375rem',
                          color: 'var(--color-text-dark)',
                          letterSpacing: '0.01em',
                        }}
                      >
                        SV Rot-Weiß Niederklein
                        <span
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontWeight: 400,
                            color: 'var(--color-text-muted)',
                            margin: '0 0.5rem',
                            fontSize: '0.875rem',
                          }}
                        >
                          vs.
                        </span>
                        {match.opponent}
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.8125rem',
                          color: 'var(--color-text-muted)',
                          marginTop: '0.25rem',
                        }}
                      >
                        {match.league}
                      </div>
                    </div>

                    {/* Badge */}
                    <MatchBadge variant={match.isHome ? 'home' : 'away'} />

                    {/* Uhrzeit */}
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontWeight: 600,
                          fontSize: '0.9375rem',
                          color: 'var(--color-text-dark)',
                        }}
                      >
                        {match.time}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
        </div>

        <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'center' }}>
          <SportButton
            href="https://www.fussball.de/verein/sv-niederklein-hessen/-/id/00ES8GN9IO000043VV0AG08LVUPGND5I"
            variant="ghost"
          >
            Kompletter Spielplan auf fussball.de ↗
          </SportButton>
        </div>
      </div>

      {/* Responsive: Stack auf Mobile */}
      <style>{`
        @media (max-width: 640px) {
          #naechste-spiele [style*="grid-template-columns"] {
            grid-template-columns: 60px 1fr !important;
            grid-template-rows: auto auto !important;
          }
          #naechste-spiele [style*="grid-template-columns"] > *:nth-child(3),
          #naechste-spiele [style*="grid-template-columns"] > *:nth-child(4) {
            grid-column: 2;
          }
        }
        .skeleton-bar {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: skeleton-shimmer 1.4s infinite;
        }
        @keyframes skeleton-shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .skeleton-bar { animation: none; background: #f0f0f0; }
        }
      `}</style>
    </section>
  )
}
