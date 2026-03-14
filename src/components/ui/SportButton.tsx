import { type ReactNode } from 'react'

interface SportButtonProps {
  children: ReactNode
  variant?: 'primary' | 'ghost' | 'outline'
  onClick?: () => void
  href?: string
  type?: 'button' | 'submit'
  disabled?: boolean
  style?: React.CSSProperties
  fullWidth?: boolean
}

export function SportButton({
  children,
  variant = 'primary',
  onClick,
  href,
  type = 'button',
  disabled = false,
  style,
  fullWidth = false,
}: SportButtonProps) {
  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    fontFamily: 'var(--font-display)',
    fontSize: '0.875rem',
    fontWeight: 600,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    padding: '0.75rem 1.75rem',
    borderRadius: '3px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    textDecoration: 'none',
    transition: 'all 220ms ease-out',
    border: '2px solid',
    minHeight: '44px',
    touchAction: 'manipulation',
    opacity: disabled ? 0.5 : 1,
    width: fullWidth ? '100%' : undefined,
    ...style,
  }

  const primaryStyle: React.CSSProperties = {
    ...baseStyle,
    background: 'var(--color-primary)',
    borderColor: 'var(--color-primary)',
    color: 'var(--color-white)',
  }

  const ghostStyle: React.CSSProperties = {
    ...baseStyle,
    background: 'transparent',
    borderColor: 'var(--color-border)',
    color: 'var(--color-text-dark)',
  }

  // outline = for use on dark/red backgrounds
  const outlineStyle: React.CSSProperties = {
    ...baseStyle,
    background: 'transparent',
    borderColor: 'rgba(255,255,255,0.6)',
    color: 'var(--color-white)',
  }

  const styleMap = { primary: primaryStyle, ghost: ghostStyle, outline: outlineStyle }
  const appliedStyle = styleMap[variant]

  const handleEnter = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    const el = e.currentTarget as HTMLElement
    if (variant === 'primary') {
      el.style.background = 'var(--color-primary-hover)'
      el.style.borderColor = 'var(--color-primary-hover)'
      el.style.boxShadow = '0 6px 20px var(--color-primary-dim)'
      el.style.transform = 'translateY(-1px)'
    } else if (variant === 'ghost') {
      el.style.borderColor = 'var(--color-primary)'
      el.style.color = 'var(--color-primary)'
    } else {
      el.style.background = 'rgba(255,255,255,0.12)'
      el.style.borderColor = 'rgba(255,255,255,0.9)'
    }
  }

  const handleLeave = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    const el = e.currentTarget as HTMLElement
    if (variant === 'primary') {
      el.style.background = 'var(--color-primary)'
      el.style.borderColor = 'var(--color-primary)'
      el.style.boxShadow = 'none'
      el.style.transform = 'translateY(0)'
    } else if (variant === 'ghost') {
      el.style.borderColor = 'var(--color-border)'
      el.style.color = 'var(--color-text-dark)'
    } else {
      el.style.background = 'transparent'
      el.style.borderColor = 'rgba(255,255,255,0.6)'
    }
  }

  if (href) {
    return (
      <a
        href={href}
        style={appliedStyle}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={appliedStyle}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {children}
    </button>
  )
}
