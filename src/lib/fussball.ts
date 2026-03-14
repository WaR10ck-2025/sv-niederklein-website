import type { Match } from './constants'

// ─── Vereins-ID auf fussball.de ──────────────────────────────────────────────
const CLUB_ID = '00ES8GN9IO000043VV0AG08LVUPGND5I'

// Nginx (prod) und Vite-Dev-Proxy leiten /fussball-api/* an api-fussball.de weiter.
// So landet das Token nie unkomprimiert im Netzwerk-Traffic.
const API_BASE = '/fussball-api'

// Namensbestandteile, an denen der Heimverein erkannt wird.
// Gilt auch für eventuelle SG-Kooperationen (z. B. "SG Niederklein/Schweinsberg").
const OUR_CLUB_FRAGMENTS = ['niederklein']

// ─── API-Typen (api-fussball.de) ─────────────────────────────────────────────
interface ApiTeam {
  teamId?: string
  teamName?: string
  name?: string
}

interface ApiCompetition {
  competitionId?: string
  competitionName?: string
  name?: string
}

interface ApiMatch {
  matchId?: string
  id?: string
  matchDate?: string   // "2026-03-15"
  matchTime?: string   // "15:00"
  kickoff?: string     // ISO: "2026-03-15T15:00:00"
  dateTime?: string    // ISO-Alternativ
  homeTeam?: ApiTeam
  guestTeam?: ApiTeam
  awayTeam?: ApiTeam   // Manche Versionen nutzen "away" statt "guest"
  competition?: ApiCompetition
}

type ApiResponse = ApiMatch[] | { data?: ApiMatch[]; matches?: ApiMatch[] }

// ─── Hilfsfunktionen ─────────────────────────────────────────────────────────
const MONTH_SHORT = ['Jan', 'Feb', 'Mrz', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez']

function getTeamName(team?: ApiTeam): string {
  return team?.teamName ?? team?.name ?? 'Unbekannt'
}

function getCompetitionName(comp?: ApiCompetition): string {
  return comp?.competitionName ?? comp?.name ?? ''
}

function isOurClub(name: string): boolean {
  const lower = name.toLowerCase()
  return OUR_CLUB_FRAGMENTS.some(f => lower.includes(f))
}

function parseMatchDate(m: ApiMatch): Date | null {
  if (m.kickoff)   return new Date(m.kickoff)
  if (m.dateTime)  return new Date(m.dateTime)
  if (m.matchDate) return new Date(`${m.matchDate}T${m.matchTime ?? '00:00'}:00`)
  return null
}

function mapApiMatch(m: ApiMatch, index: number): Match {
  const date    = parseMatchDate(m)
  const day     = date ? String(date.getDate()) : '?'
  const month   = date ? MONTH_SHORT[date.getMonth()] : '?'
  const hours   = date ? String(date.getHours()).padStart(2, '0') : '??'
  const minutes = date ? String(date.getMinutes()).padStart(2, '0') : '??'

  const homeName  = getTeamName(m.homeTeam)
  const guestName = getTeamName(m.guestTeam ?? m.awayTeam)
  const isHome    = isOurClub(homeName)
  const opponent  = isHome ? guestName : homeName

  return {
    id:       m.matchId ?? m.id ?? String(index),
    day,
    month,
    opponent,
    isHome,
    time:   `${hours}:${minutes} Uhr`,
    league: getCompetitionName(m.competition),
  }
}

// ─── Öffentliche API ─────────────────────────────────────────────────────────
export async function fetchNextMatches(limit = 6): Promise<Match[]> {
  const token = import.meta.env.VITE_FUSSBALL_API_TOKEN as string | undefined

  const headers: Record<string, string> = { Accept: 'application/json' }
  if (token) headers['x-auth-token'] = token

  const res = await fetch(`${API_BASE}/api/club/next_games/${CLUB_ID}`, { headers })
  if (!res.ok) throw new Error(`api-fussball.de: HTTP ${res.status}`)

  const raw: ApiResponse = await res.json()
  const items: ApiMatch[] = Array.isArray(raw) ? raw : (raw.data ?? raw.matches ?? [])

  return items.slice(0, limit).map(mapApiMatch)
}
