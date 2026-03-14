interface MatchBadgeProps {
  variant: 'home' | 'away'
}

export function MatchBadge({ variant }: MatchBadgeProps) {
  const isHome = variant === 'home'

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-display)',
        fontSize: '0.625rem',
        fontWeight: 600,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        padding: '0.3rem 0.7rem',
        borderRadius: '3px',
        background: isHome ? 'var(--color-primary)' : 'var(--color-surface)',
        color: isHome ? 'var(--color-white)' : 'var(--color-text-muted)',
        border: isHome ? 'none' : '1px solid var(--color-border)',
        flexShrink: 0,
        minWidth: '72px',
        textAlign: 'center',
      }}
    >
      {isHome ? 'Heim' : 'Auswärts'}
    </span>
  )
}
