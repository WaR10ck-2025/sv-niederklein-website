import { useEffect, useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

function useCountUp(target: number, duration = 1200, active = false) {
  const reduced = useReducedMotion()
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active || reduced) return
    let current = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      current += step
      if (current >= target) {
        setValue(target)
        clearInterval(timer)
      } else {
        setValue(Math.floor(current))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [active, target, duration, reduced])

  if (!active || reduced) return target
  return value
}

interface StatCounterProps {
  value: number
  suffix: string
  label: string
  active: boolean
  dark?: boolean
}

export function StatCounter({ value, suffix, label, active, dark = true }: StatCounterProps) {
  const display = useCountUp(value, 1400, active)

  return (
    <div style={{ marginBottom: '2rem' }}>
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
          color: dark ? 'var(--color-white)' : 'var(--color-primary)',
          lineHeight: 1,
          marginBottom: '0.35rem',
          letterSpacing: '-0.02em',
        }}
      >
        {display}{suffix}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.8125rem',
          color: dark ? 'var(--color-text-light-dim)' : 'var(--color-text-muted)',
          letterSpacing: '0.03em',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </div>
    </div>
  )
}
