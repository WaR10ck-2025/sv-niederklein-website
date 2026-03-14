import { DATENSCHUTZ, SITE } from '../../lib/constants'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '1.75rem' }}>
      <h3
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 600,
          fontSize: '0.875rem',
          color: 'var(--color-primary-light)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: '0.625rem',
        }}
      >
        {title}
      </h3>
      {children}
    </div>
  )
}

function Text({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.9375rem',
        color: 'var(--color-text-light-dim)',
        lineHeight: 1.75,
        margin: '0 0 0.75rem 0',
      }}
    >
      {children}
    </p>
  )
}

export function DatenschutzContent() {
  return (
    <div>
      <Section title="1. Datenschutz auf einen Blick">
        <Text>
          Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen
          Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit
          denen Sie persönlich identifiziert werden können.
        </Text>
      </Section>

      <Section title="2. Verantwortliche Stelle">
        <Text>
          {DATENSCHUTZ.verantwortlich}<br />
          {DATENSCHUTZ.adresse}<br />
          E-Mail:{' '}
          <a
            href={`mailto:${DATENSCHUTZ.email}`}
            style={{ color: 'var(--color-primary-light)', textDecoration: 'none' }}
          >
            {DATENSCHUTZ.email}
          </a>
        </Text>
      </Section>

      <Section title="3. Datenerfassung auf dieser Website">
        <Text>
          Diese Website wird als statische Seite bereitgestellt. Es werden keine Cookies gesetzt,
          keine Nutzerprofile erstellt und keine personenbezogenen Daten ohne Ihre Mitwirkung
          automatisch erhoben oder gespeichert.
        </Text>
        <Text>
          Wenn Sie uns über das Kontaktformular eine Nachricht senden, wird diese über Ihren
          lokalen E-Mail-Client an uns übermittelt. Die dabei übertragenen Daten (Name, E-Mail-Adresse,
          Nachrichteninhalt) werden ausschließlich zur Bearbeitung Ihrer Anfrage verwendet und
          nicht an Dritte weitergegeben.
        </Text>
      </Section>

      <Section title="4. Externe Links und Dienste">
        <Text>
          Diese Website enthält Links zu externen Diensten (Facebook, Instagram, Google Maps,
          fussball.de). Beim Aufrufen dieser Dienste können deren Betreiber Daten erheben.
          Bitte beachten Sie die jeweiligen Datenschutzerklärungen dieser Anbieter.
        </Text>
      </Section>

      <Section title="5. Hosting">
        <Text>
          Diese Website wird auf eigener Infrastruktur des Vereins gehostet. Beim Aufrufen der
          Website werden technische Daten (IP-Adresse, Browsertyp, Uhrzeit) in Server-Logfiles
          gespeichert, die ausschließlich zur Fehlerdiagnose und Sicherheit dienen. Diese Daten
          werden nicht mit anderen Datenquellen zusammengeführt und nach spätestens 7 Tagen gelöscht.
        </Text>
      </Section>

      <Section title="6. Ihre Rechte">
        <Text>
          Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck
          Ihrer gespeicherten personenbezogenen Daten zu erhalten (Art. 15 DSGVO). Sie haben außerdem
          ein Recht auf Berichtigung (Art. 16), Löschung (Art. 17) und Einschränkung der Verarbeitung
          (Art. 18 DSGVO) sowie ein Beschwerderecht bei der zuständigen Aufsichtsbehörde.
        </Text>
        <Text>
          Anfragen richten Sie bitte an:{' '}
          <a
            href={`mailto:${DATENSCHUTZ.email}`}
            style={{ color: 'var(--color-primary-light)', textDecoration: 'none' }}
          >
            {DATENSCHUTZ.email}
          </a>
        </Text>
      </Section>

      <Section title="7. Social Media">
        <Text>
          {SITE.name} ist auf Facebook und Instagram vertreten. Wenn Sie unsere Social-Media-Präsenzen
          besuchen, gelten die Datenschutzbestimmungen der jeweiligen Plattformen. Wir haben keinen
          Einfluss auf die Datenverarbeitung durch Facebook (Meta) oder Instagram.
        </Text>
      </Section>

      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.8125rem',
          color: 'rgba(255,255,255,0.3)',
          marginTop: '2rem',
          lineHeight: 1.5,
        }}
      >
        Stand: {SITE.year} — Diese Datenschutzerklärung kann jederzeit angepasst werden.
      </p>
    </div>
  )
}
