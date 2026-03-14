// ─── Stammdaten ──────────────────────────────────────────────────────────────
export const SITE = {
  name: 'SV Rot-Weiß Niederklein 1921 e.V.',
  shortName: 'SVN 1921',
  monogram: 'SVN',
  motto: 'Gemeinsam stark. Für den Verein, die Gemeinde, den Sport.',
  founded: 1921,
  league: 'Kreisliga A Marburg',
  address: {
    street: 'Sportplatz Niederklein',
    city: '35260 Stadtallendorf-Niederklein',
    maps: 'https://maps.google.com/?q=Niederklein+Stadtallendorf',
  },
  social: {
    facebook: 'https://www.facebook.com/p/SV-Rot-Wei%C3%9F-Niederklein-1921-eV-100057489946317/',
    instagram: 'https://www.instagram.com/svniederklein1921/',
  },
  year: new Date().getFullYear(),
}

// ─── Navigation ──────────────────────────────────────────────────────────────
export const NAV_LINKS = [
  { href: '#aktuelles',        label: 'Aktuelles' },
  { href: '#naechste-spiele',  label: 'Spiele' },
  { href: '#mannschaften',     label: 'Mannschaften' },
  { href: '#ueber-uns',        label: 'Über uns' },
  { href: '#mitmachen',        label: 'Mitmachen' },
  { href: '#kontakt',          label: 'Kontakt' },
]

// ─── Stats (CountUp in Über-uns-Sektion) ─────────────────────────────────────
export const STATS = [
  { value: 100, suffix: '+', label: 'Aktive Mitglieder' },
  { value: 2025 - 1921, suffix: '', label: 'Jahre Vereinsgeschichte' },
  { value: 6,   suffix: '',  label: 'Sportabteilungen' },
]

// ─── Neuigkeiten ─────────────────────────────────────────────────────────────
export interface NewsItem {
  id: string
  date: string
  category: string
  title: string
  excerpt: string
  link: string
}

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: '1',
    date: '10. März 2026',
    category: 'Spielbericht',
    title: '3:1-Sieg gegen TSV Stadtallendorf II',
    excerpt: 'Mit einem überzeugenden Auftritt sicherte sich die erste Mannschaft drei wichtige Punkte in der Kreisliga A und festigt damit den Tabellenplatz.',
    link: '#',
  },
  {
    id: '2',
    date: '4. März 2026',
    category: 'Vereinsnews',
    title: 'Jahreshauptversammlung 2026 — Alle Infos',
    excerpt: 'Am 20. März findet unsere diesjährige Jahreshauptversammlung statt. Alle Mitglieder sind herzlich eingeladen. Beginn: 19:00 Uhr im Vereinsheim.',
    link: '#',
  },
  {
    id: '3',
    date: '28. Februar 2026',
    category: 'Jugend',
    title: 'U13 gewinnt Hallenturnier in Kirchhain',
    excerpt: 'Unsere U13 hat beim Hallenturnier in Kirchhain den zweiten Platz belegt — eine starke Leistung der jungen Talente! Glückwunsch an alle Spieler.',
    link: '#',
  },
]

// ─── Spielplan ───────────────────────────────────────────────────────────────
export interface Match {
  id: string
  day: string
  month: string
  opponent: string
  isHome: boolean
  time: string
  league: string
}

export const UPCOMING_MATCHES: Match[] = [
  {
    id: '1',
    day: '15',
    month: 'Mrz',
    opponent: 'FC Kirchhain',
    isHome: true,
    time: '15:00 Uhr',
    league: 'Kreisliga A',
  },
  {
    id: '2',
    day: '22',
    month: 'Mrz',
    opponent: 'SV Schweinsberg',
    isHome: false,
    time: '14:30 Uhr',
    league: 'Kreisliga A',
  },
  {
    id: '3',
    day: '5',
    month: 'Apr',
    opponent: 'TSV Amöneburg',
    isHome: true,
    time: '15:00 Uhr',
    league: 'Kreisliga A',
  },
  {
    id: '4',
    day: '12',
    month: 'Apr',
    opponent: 'SC Weimar/Lahn',
    isHome: false,
    time: '15:00 Uhr',
    league: 'Kreisliga A',
  },
]

// ─── Mannschaften ─────────────────────────────────────────────────────────────
export interface Team {
  id: string
  name: string
  description: string
  liga: string
  trainer: string
  iconType: 'soccer' | 'youth' | 'veteran' | 'gymnastics'
}

export const TEAMS: Team[] = [
  {
    id: 'herren-1',
    name: 'Herren I',
    description: 'Unsere erste Mannschaft in der Kreisliga A Marburg — das Aushängeschild des Vereins.',
    liga: 'Kreisliga A Marburg',
    trainer: 'N.N.',
    iconType: 'soccer',
  },
  {
    id: 'herren-2',
    name: 'Herren II',
    description: 'Die zweite Mannschaft für breiten Spielbetrieb und die Weiterentwicklung der Spieler.',
    liga: 'Kreisliga B Marburg',
    trainer: 'N.N.',
    iconType: 'soccer',
  },
  {
    id: 'jugend',
    name: 'Jugendfußball',
    description: 'Nachwuchsförderung für Kinder und Jugendliche aller Altersklassen — die Zukunft des Vereins.',
    liga: 'Junioren-Kreisliga Marburg',
    trainer: 'N.N.',
    iconType: 'youth',
  },
  {
    id: 'ueber-50',
    name: 'Ü50',
    description: 'Fußball ohne Altersgrenzen — Gemeinschaft, Spaß und sportlicher Ehrgeiz im Vordergrund.',
    liga: 'Freizeitliga',
    trainer: 'N.N.',
    iconType: 'veteran',
  },
]

// ─── Vereinsgeschichte ───────────────────────────────────────────────────────
export const CLUB_HISTORY = {
  headline: 'Seit 1921 für die Gemeinde.',
  paragraphs: [
    'Der SV Rot-Weiß Niederklein wurde 1921 gegründet und ist seit über 100 Jahren fester Bestandteil des Gemeindelebens in Niederklein, Stadtallendorf.',
    'Neben dem Fußballbetrieb mit mehreren Herren- und Jugendmannschaften bieten wir auch Kinderturngruppen und Frauenturnen an.',
    'Unser Verein steht für Gemeinschaft, Sportgeist und die Verbundenheit mit unserer Heimat. Ob jung oder alt — bei uns ist jeder willkommen.',
  ],
}

export const DEPARTMENTS = [
  'Herren I', 'Herren II', 'Jugendfußball', 'Ü50', 'Kinderturngruppe', 'Frauenturnen',
]

// ─── Kontakt ─────────────────────────────────────────────────────────────────
export const CONTACT = {
  email: 'info@sv-niederklein.de',
  subjectOptions: [
    'Mitgliedschaft',
    'Sponsoring',
    'Allgemeine Anfrage',
    'Sonstiges',
  ],
}

// ─── Impressum ────────────────────────────────────────────────────────────────
export const IMPRESSUM = {
  verantwortlich: 'N.N. (1. Vorsitzender)',
  verein: 'SV Rot-Weiß Niederklein 1921 e.V.',
  adresse: 'Sportplatz Niederklein, 35260 Stadtallendorf-Niederklein',
  email: 'info@sv-niederklein.de',
  registernummer: 'VR XXXX beim Amtsgericht Marburg',
  ustIdNr: 'Nicht vorhanden (gemeinnütziger Verein)',
}

// ─── Datenschutz ──────────────────────────────────────────────────────────────
export const DATENSCHUTZ = {
  verantwortlich: 'SV Rot-Weiß Niederklein 1921 e.V.',
  adresse: 'Sportplatz Niederklein, 35260 Stadtallendorf-Niederklein',
  email: 'info@sv-niederklein.de',
}

// ─── Mitgliedschaft / Sponsoring ─────────────────────────────────────────────
export const MEMBERSHIP_BENEFITS = [
  'Vereinstraining & geregelter Spielbetrieb',
  'Vergünstigungen bei Vereinsveranstaltungen',
  'Gemeinschaft & aktives Vereinsleben',
  'Zugang zu allen Abteilungen',
]

export const SPONSOR_BENEFITS = [
  'Logo auf Trikots und Website',
  'Nennung bei Heimspielen & Veranstaltungen',
  'Steuerlich begünstigte Spende (e.V.)',
  'Regionale Sichtbarkeit im Marburger Land',
]
