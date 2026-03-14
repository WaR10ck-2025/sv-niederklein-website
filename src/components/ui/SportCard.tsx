import { type ReactNode, useState } from 'react'

interface SportCardProps {
  children: ReactNode
  style?: React.CSSProperties
  hoverable?: boolean
}

export function SportCard({ children, style, hoverable = true }: SportCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      style={{
        background: 'var(--color-surface-card)',
        border: `1px solid ${hovered && hoverable ? 'var(--color-primary)' : 'var(--color-border)'}`,
        borderRadius: '6px',
        overflow: 'hidden',
        transition: 'border-color 220ms ease, box-shadow 220ms ease, transform 220ms ease',
        boxShadow: hovered && hoverable
          ? '0 8px 32px var(--color-primary-ghost), 0 2px 8px rgba(0,0,0,0.06)'
          : '0 2px 8px rgba(0,0,0,0.04)',
        transform: hovered && hoverable ? 'translateY(-4px)' : 'translateY(0)',
        padding: '1.75rem',
        ...style,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </div>
  )
}
