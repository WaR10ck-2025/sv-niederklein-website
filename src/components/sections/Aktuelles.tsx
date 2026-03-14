import { useEffect, useRef } from 'react'
import { SectionLabel } from '../ui/SectionLabel'
import { SportCard } from '../ui/SportCard'
import { NEWS_ITEMS } from '../../lib/constants'

export function Aktuelles() {
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
      { threshold: 0.1 }
    )
    cardRefs.current.forEach(el => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="aktuelles"
      style={{
        background: 'var(--color-surface)',
        padding: '96px 2rem',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <SectionLabel text="Aktuelles" />

        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '3rem',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              color: 'var(--color-text-dark)',
              letterSpacing: '-0.01em',
              lineHeight: 1.1,
            }}
          >
            Neuigkeiten aus dem Verein
          </h2>
          <a
            href="#"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.8125rem',
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--color-primary)',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.375rem',
              flexShrink: 0,
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.75' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
          >
            Alle Meldungen →
          </a>
        </div>

        {/* News Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {NEWS_ITEMS.map((item, i) => (
            <div
              key={item.id}
              ref={el => { cardRefs.current[i] = el }}
              className="reveal"
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <SportCard style={{ padding: '1.75rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
                {/* Meta */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginBottom: '1rem',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.75rem',
                      color: 'var(--color-text-muted)',
                    }}
                  >
                    {item.date}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.625rem',
                      fontWeight: 600,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      background: 'var(--color-primary-ghost)',
                      color: 'var(--color-primary)',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '3px',
                      border: '1px solid var(--color-primary-ghost)',
                    }}
                  >
                    {item.category}
                  </span>
                </div>

                {/* Roter Akzentstreifen oben */}
                <div
                  style={{
                    width: '32px',
                    height: '3px',
                    background: 'var(--color-primary)',
                    borderRadius: '2px',
                    marginBottom: '0.875rem',
                  }}
                />

                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    fontSize: '1.125rem',
                    color: 'var(--color-text-dark)',
                    lineHeight: 1.3,
                    marginBottom: '0.75rem',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    color: 'var(--color-text-muted)',
                    lineHeight: 1.65,
                    flex: 1,
                    marginBottom: '1.25rem',
                  }}
                >
                  {item.excerpt}
                </p>
                <a
                  href={item.link}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    color: 'var(--color-primary)',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    marginTop: 'auto',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.7' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
                >
                  Weiterlesen →
                </a>
              </SportCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
