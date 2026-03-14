import { IMPRESSUM } from '../../lib/constants'

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
        margin: 0,
      }}
    >
      {children}
    </p>
  )
}

export function ImpressumContent() {
  return (
    <div>
      <Section title="Angaben gemäß § 5 TMG">
        <Text>
          {IMPRESSUM.verein}<br />
          {IMPRESSUM.adresse}
        </Text>
      </Section>

      <Section title="Vertreten durch">
        <Text>{IMPRESSUM.verantwortlich}</Text>
      </Section>

      <Section title="Kontakt">
        <Text>
          E-Mail:{' '}
          <a
            href={`mailto:${IMPRESSUM.email}`}
            style={{ color: 'var(--color-primary-light)', textDecoration: 'none' }}
          >
            {IMPRESSUM.email}
          </a>
        </Text>
      </Section>

      <Section title="Vereinsregister">
        <Text>{IMPRESSUM.registernummer}</Text>
      </Section>

      <Section title="Umsatzsteuer-ID">
        <Text>{IMPRESSUM.ustIdNr}</Text>
      </Section>

      <Section title="Haftung für Inhalte">
        <Text>
          Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach
          den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter
          jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen
          oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen
          zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben
          hiervon unberührt.
        </Text>
      </Section>

      <Section title="Haftung für Links">
        <Text>
          Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss
          haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte
          der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
        </Text>
      </Section>

      <Section title="Urheberrecht">
        <Text>
          Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem
          deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
          Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des
          jeweiligen Autors bzw. Erstellers.
        </Text>
      </Section>
    </div>
  )
}
