import { useEffect, useState } from 'react'
import { NAV_LINKS, SITE } from '../../lib/constants'

export function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = NAV_LINKS.map(l => document.querySelector(l.href))
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActiveSection(e.target.id)
        })
      },
      { threshold: 0.35 }
    )
    sections.forEach(s => s && observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const textColor = scrolled ? 'var(--color-text-dark)' : 'var(--color-white)'

  return (
    <header>
      <nav
        role="navigation"
        aria-label="Hauptnavigation"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 2rem',
          height: '68px',
          background: scrolled ? 'rgba(255,255,255,0.97)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          boxShadow: scrolled ? '0 1px 12px rgba(0,0,0,0.08)' : 'none',
          transition: 'background 300ms ease, box-shadow 300ms ease',
        }}
      >
        {/* Logo */}
        <a
          href="#"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.625rem',
            textDecoration: 'none',
          }}
        >
          {/* Vereinswappen-Platzhalter */}
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '0.6875rem',
              color: 'var(--color-white)',
              letterSpacing: '0.04em',
              flexShrink: 0,
            }}
          >
            {SITE.monogram}
          </div>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              fontSize: '0.9375rem',
              color: textColor,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              transition: 'color 300ms ease',
              lineHeight: 1.2,
            }}
          >
            SV Rot-Weiß<br />
            <span style={{ fontWeight: 400, fontSize: '0.75rem', letterSpacing: '0.06em' }}>
              Niederklein 1921
            </span>
          </span>
        </a>

        {/* Desktop links */}
        <div style={{ display: 'flex', gap: '1.75rem' }} className="hidden-mobile">
          {NAV_LINKS.map(link => {
            const isActive = activeSection === link.href.slice(1)
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? 'page' : undefined}
                className={`nav-link${isActive ? ' active' : ''}`}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: isActive ? 'var(--color-primary)' : textColor,
                  textDecoration: 'none',
                  transition: 'color 200ms ease',
                  touchAction: 'manipulation',
                  paddingBottom: '2px',
                }}
                onMouseEnter={e => {
                  if (!isActive) (e.currentTarget as HTMLElement).style.color = 'var(--color-primary)'
                }}
                onMouseLeave={e => {
                  if (!isActive) (e.currentTarget as HTMLElement).style.color = textColor
                }}
              >
                {link.label}
              </a>
            )
          })}
        </div>

        {/* Hamburger */}
        <button
          aria-label={mobileOpen ? 'Menü schließen' : 'Menü öffnen'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(v => !v)}
          className="show-mobile"
          style={{
            background: 'transparent',
            border: `2px solid ${scrolled ? 'var(--color-border)' : 'rgba(255,255,255,0.4)'}`,
            borderRadius: '3px',
            color: textColor,
            padding: '0.5rem 0.625rem',
            cursor: 'pointer',
            fontFamily: 'var(--font-display)',
            fontSize: '1rem',
            minWidth: '44px',
            minHeight: '44px',
            display: 'none',
            touchAction: 'manipulation',
            transition: 'border-color 300ms ease, color 300ms ease',
          }}
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
      </nav>

      {/* Mobile Menü */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed',
            top: '68px',
            left: 0,
            right: 0,
            zIndex: 99,
            background: 'var(--color-white)',
            borderBottom: '3px solid var(--color-primary)',
            padding: '1.5rem 2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            animation: 'fade-in 180ms ease-out',
            boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
          }}
        >
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1rem',
                fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: 'var(--color-text-dark)',
                textDecoration: 'none',
                touchAction: 'manipulation',
                paddingBottom: '1rem',
                borderBottom: '1px solid var(--color-border)',
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 767px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; align-items: center; justify-content: center; }
        }
      `}</style>
    </header>
  )
}
