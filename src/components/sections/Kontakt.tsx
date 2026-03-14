import { useState, type FormEvent, type ChangeEvent } from 'react'
import { SectionLabel } from '../ui/SectionLabel'
import { SportButton } from '../ui/SportButton'
import { CONTACT, SITE } from '../../lib/constants'

interface FormState {
  name: string
  email: string
  subject: string
  message: string
}

type SubmitStatus = 'idle' | 'sending' | 'success' | 'error'

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: '6px',
  padding: '0.75rem 1rem',
  fontFamily: 'var(--font-body)',
  fontSize: '0.9375rem',
  color: 'var(--color-white)',
  outline: 'none',
  transition: 'border-color 200ms ease',
  boxSizing: 'border-box',
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-body)',
  fontSize: '0.875rem',
  fontWeight: 500,
  color: 'var(--color-text-light-dim)',
  marginBottom: '0.5rem',
}

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined

export function Kontakt() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    subject: CONTACT.subjectOptions[0],
    message: '',
  })
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [status, setStatus] = useState<SubmitStatus>('idle')

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    // Fallback auf mailto: wenn kein Web3Forms-Key konfiguriert
    if (!WEB3FORMS_KEY || WEB3FORMS_KEY === 'PLACEHOLDER_HIER_KEY_EINTRAGEN') {
      const subject = encodeURIComponent(`[${form.subject}] Anfrage von ${form.name}`)
      const body = encodeURIComponent(
        `Name: ${form.name}\nE-Mail: ${form.email}\nBetreff: ${form.subject}\n\n${form.message}`
      )
      window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`
      return
    }

    setStatus('sending')

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `[${form.subject}] Anfrage von ${form.name} — SV Niederklein`,
          from_name: form.name,
          replyto: form.email,
          message: `Name: ${form.name}\nE-Mail: ${form.email}\nBetreff: ${form.subject}\n\n${form.message}`,
          // Honeypot-Feld (muss leer bleiben — Spam-Schutz)
          botcheck: '',
        }),
      })

      const data = await res.json() as { success: boolean }
      if (data.success) {
        setStatus('success')
        setForm({ name: '', email: '', subject: CONTACT.subjectOptions[0], message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  function getBorderColor(field: string) {
    return focusedField === field ? 'var(--color-primary)' : 'rgba(255,255,255,0.12)'
  }

  return (
    <section
      id="kontakt"
      style={{ background: 'var(--color-dark)', padding: '96px 2rem' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <SectionLabel text="Kontakt" dark />
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            color: 'var(--color-white)',
            letterSpacing: '-0.01em',
            lineHeight: 1.1,
            marginBottom: '0.75rem',
          }}
        >
          Schreib uns
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            color: 'var(--color-text-light-dim)',
            marginBottom: '3.5rem',
            maxWidth: '540px',
            lineHeight: 1.65,
          }}
        >
          Fragen zur Mitgliedschaft, Sponsoring oder zum Verein? Wir freuen uns über jede Nachricht.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '3rem',
            alignItems: 'start',
          }}
        >
          {/* ── Kontaktformular ── */}
          <form onSubmit={handleSubmit} noValidate>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

              {/* Erfolgs- / Fehlermeldung */}
              {status === 'success' && (
                <div
                  role="alert"
                  style={{
                    background: 'rgba(21,128,61,0.15)',
                    border: '1px solid rgba(134,239,172,0.3)',
                    borderRadius: '6px',
                    padding: '1rem 1.25rem',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                  }}
                >
                  <span style={{ fontSize: '1.1rem', lineHeight: 1 }}>✓</span>
                  <div>
                    <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, color: '#86efac', marginBottom: '0.25rem' }}>
                      Nachricht gesendet!
                    </div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'rgba(134,239,172,0.75)' }}>
                      Wir melden uns so schnell wie möglich bei dir.
                    </div>
                  </div>
                </div>
              )}

              {status === 'error' && (
                <div
                  role="alert"
                  style={{
                    background: 'rgba(185,28,28,0.15)',
                    border: '1px solid rgba(252,165,165,0.3)',
                    borderRadius: '6px',
                    padding: '1rem 1.25rem',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                  }}
                >
                  <span style={{ fontSize: '1.1rem', lineHeight: 1 }}>✕</span>
                  <div>
                    <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, color: '#fca5a5', marginBottom: '0.25rem' }}>
                      Fehler beim Senden
                    </div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'rgba(252,165,165,0.75)' }}>
                      Bitte versuche es erneut oder schreib uns direkt an{' '}
                      <a href={`mailto:${CONTACT.email}`} style={{ color: '#fca5a5' }}>{CONTACT.email}</a>.
                    </div>
                  </div>
                </div>
              )}

              {/* Name + E-Mail nebeneinander */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                  gap: '1rem',
                }}
              >
                <div>
                  <label htmlFor="name" style={labelStyle}>Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Max Mustermann"
                    disabled={status === 'sending'}
                    style={{ ...inputStyle, borderColor: getBorderColor('name') }}
                  />
                </div>
                <div>
                  <label htmlFor="email" style={labelStyle}>E-Mail</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="max@beispiel.de"
                    disabled={status === 'sending'}
                    style={{ ...inputStyle, borderColor: getBorderColor('email') }}
                  />
                </div>
              </div>

              {/* Betreff */}
              <div>
                <label htmlFor="subject" style={labelStyle}>Betreff</label>
                <select
                  id="subject"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('subject')}
                  onBlur={() => setFocusedField(null)}
                  disabled={status === 'sending'}
                  style={{
                    ...inputStyle,
                    borderColor: getBorderColor('subject'),
                    cursor: 'pointer',
                    appearance: 'none',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 1rem center',
                    paddingRight: '2.5rem',
                  }}
                >
                  {CONTACT.subjectOptions.map(opt => (
                    <option key={opt} value={opt} style={{ background: '#161616' }}>{opt}</option>
                  ))}
                </select>
              </div>

              {/* Nachricht */}
              <div>
                <label htmlFor="message" style={labelStyle}>Nachricht</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Deine Nachricht an uns..."
                  disabled={status === 'sending'}
                  style={{
                    ...inputStyle,
                    borderColor: getBorderColor('message'),
                    resize: 'vertical',
                    minHeight: '130px',
                  }}
                />
              </div>

              <SportButton
                type="submit"
                variant="primary"
                fullWidth
                disabled={status === 'sending' || status === 'success'}
              >
                {status === 'sending' ? 'Wird gesendet …' : 'Nachricht senden →'}
              </SportButton>

              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.8125rem',
                  color: 'rgba(255,255,255,0.3)',
                  textAlign: 'center',
                  lineHeight: 1.5,
                }}
              >
                Deine Nachricht geht direkt an{' '}
                <span style={{ color: 'rgba(255,255,255,0.5)' }}>{CONTACT.email}</span>
              </p>
            </div>
          </form>

          {/* ── Kontaktinfos ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            <ContactInfo icon={<EmailIcon />}    label="E-Mail"     value={CONTACT.email}                     href={`mailto:${CONTACT.email}`} />
            <ContactInfo icon={<LocationIcon />} label="Adresse"    value={SITE.address.city}                 href={SITE.address.maps} external />
            <ContactInfo icon={<FacebookIcon />} label="Facebook"   value="SV Rot-Weiß Niederklein 1921"      href={SITE.social.facebook} external />
            <ContactInfo icon={<InstagramIcon />} label="Instagram" value="@svniederklein1921"                 href={SITE.social.instagram} external />
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Hilfskomponenten ─────────────────────────────────────────────────────────

interface ContactInfoProps {
  icon: React.ReactNode
  label: string
  value: string
  href: string
  external?: boolean
}

function ContactInfo({ icon, label, value, href, external }: ContactInfoProps) {
  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
      <div
        style={{
          width: '44px', height: '44px', borderRadius: '8px',
          background: 'var(--color-primary-ghost)',
          border: '1px solid var(--color-primary-dim)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--color-primary)', flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          {label}
        </div>
        <a
          href={href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: 'var(--color-text-light-dim)', textDecoration: 'none', transition: 'color 150ms ease' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--color-white)' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--color-text-light-dim)' }}
        >
          {value}
        </a>
      </div>
    </div>
  )
}

function EmailIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
}
function LocationIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
}
function FacebookIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
}
function InstagramIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
}
