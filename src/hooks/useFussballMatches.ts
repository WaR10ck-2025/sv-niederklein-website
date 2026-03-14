import { useEffect, useState } from 'react'
import type { Match } from '../lib/constants'
import { UPCOMING_MATCHES } from '../lib/constants'
import { fetchNextMatches } from '../lib/fussball'

export type FetchStatus = 'loading' | 'live' | 'fallback'

export function useFussballMatches() {
  const [matches, setMatches] = useState<Match[]>([])
  const [status, setStatus]   = useState<FetchStatus>('loading')

  useEffect(() => {
    let cancelled = false

    fetchNextMatches(6)
      .then(data => {
        if (cancelled) return
        if (data.length > 0) {
          setMatches(data)
          setStatus('live')
        } else {
          // API hat geantwortet, aber keine Spiele zurückgegeben
          setMatches(UPCOMING_MATCHES)
          setStatus('fallback')
        }
      })
      .catch(() => {
        if (cancelled) return
        setMatches(UPCOMING_MATCHES)
        setStatus('fallback')
      })

    return () => { cancelled = true }
  }, [])

  return { matches, status }
}
