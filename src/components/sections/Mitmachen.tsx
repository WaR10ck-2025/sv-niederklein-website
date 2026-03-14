import { SectionLabel } from '../ui/SectionLabel'
import { SportButton } from '../ui/SportButton'
import { MEMBERSHIP_BENEFITS, SPONSOR_BENEFITS } from '../../lib/constants'

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  )
}

export function Mitmachen() {
  return (
    <section
      id="mitmachen"
      style={{
        background: 'var(--color-white)',
        padding: '96px 2rem',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <SectionLabel text="Mitmachen" />
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            color: 'var(--color-text-dark)',
            letterSpacing: '-0.01em',
            lineHeight: 1.1,
            marginBottom: '0.75rem',
          }}
        >
          Werde Teil unserer Gemeinschaft
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            color: 'var(--color-text-muted)',
            marginBottom: '3.5rem',
            maxWidth: '540px',
            lineHeight: 1.65,
          }}
        >
          Ob als aktiver Spieler, als Fan oder als Sponsor — beim SV Rot-Weiß Niederklein findet jeder seinen Platz.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
          }}
        >
          {/* Block 1: Mitglied werden — roter Hintergrund */}
          <div
            style={{
              background: 'var(--color-primary)',
              borderRadius: '8px',
              padding: '2.75rem 2.5rem',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Dezenter Hintergrundkreis */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: '-40px',
                right: '-40px',
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.1)',
                pointerEvents: 'none',
              }}
            />

            {/* Icon */}
            <div
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem',
                color: 'white',
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '1.625rem',
                letterSpacing: '0.01em',
                color: 'var(--color-white)',
                marginBottom: '0.75rem',
              }}
            >
              Mitglied werden
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9375rem',
                color: 'rgba(255,255,255,0.8)',
                lineHeight: 1.65,
                marginBottom: '1.75rem',
              }}
            >
              Schließe dich über 100 Mitgliedern an und unterstütze den Verein aktiv — auf dem Platz oder dahinter.
            </p>

            <ul
              style={{
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.625rem',
                marginBottom: '2.25rem',
              }}
            >
              {MEMBERSHIP_BENEFITS.map(benefit => (
                <li
                  key={benefit}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.625rem',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    color: 'rgba(255,255,255,0.85)',
                    lineHeight: 1.5,
                  }}
                >
                  <span style={{ color: 'rgba(255,255,255,0.7)', flexShrink: 0, marginTop: '2px' }}>
                    <CheckIcon />
                  </span>
                  {benefit}
                </li>
              ))}
            </ul>

            <SportButton href="#kontakt" variant="outline" fullWidth>
              Jetzt Mitglied werden →
            </SportButton>
          </div>

          {/* Block 2: Sponsor werden — heller Hintergrund */}
          <div
            style={{
              background: 'var(--color-surface)',
              border: '2px solid var(--color-border)',
              borderRadius: '8px',
              padding: '2.75rem 2.5rem',
            }}
          >
            {/* Icon */}
            <div
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                background: 'var(--color-primary-ghost)',
                border: '1px solid var(--color-primary-dim)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem',
                color: 'var(--color-primary)',
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '1.625rem',
                letterSpacing: '0.01em',
                color: 'var(--color-text-dark)',
                marginBottom: '0.75rem',
              }}
            >
              Sponsor werden
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9375rem',
                color: 'var(--color-text-muted)',
                lineHeight: 1.65,
                marginBottom: '1.75rem',
              }}
            >
              Unterstütze den Verein als Sponsor und zeige deine Verbundenheit mit der Region und dem Sport.
            </p>

            <ul
              style={{
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.625rem',
                marginBottom: '2.25rem',
              }}
            >
              {SPONSOR_BENEFITS.map(benefit => (
                <li
                  key={benefit}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.625rem',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    color: 'var(--color-text-dark)',
                    lineHeight: 1.5,
                  }}
                >
                  <span style={{ color: 'var(--color-primary)', flexShrink: 0, marginTop: '2px' }}>
                    <CheckIcon />
                  </span>
                  {benefit}
                </li>
              ))}
            </ul>

            <SportButton href="#kontakt" variant="primary" fullWidth>
              Sponsor-Anfrage stellen →
            </SportButton>
          </div>
        </div>
      </div>
    </section>
  )
}
