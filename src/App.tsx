import { useState, useEffect, useCallback } from 'react'
import { NavBar } from './components/layout/NavBar'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/sections/Hero'
import { Aktuelles } from './components/sections/Aktuelles'
import { NaechsteSpiele } from './components/sections/NaechsteSpiele'
import { Mannschaften } from './components/sections/Mannschaften'
import { UeberUns } from './components/sections/UeberUns'
import { Mitmachen } from './components/sections/Mitmachen'
import { Kontakt } from './components/sections/Kontakt'
import { Modal } from './components/ui/Modal'
import { ImpressumContent } from './components/sections/Impressum'
import { DatenschutzContent } from './components/sections/Datenschutz'

type ActiveModal = 'impressum' | 'datenschutz' | null

function getModalFromHash(hash: string): ActiveModal {
  if (hash === '#impressum') return 'impressum'
  if (hash === '#datenschutz') return 'datenschutz'
  return null
}

export default function App() {
  const [activeModal, setActiveModal] = useState<ActiveModal>(
    () => getModalFromHash(window.location.hash)
  )

  const closeModal = useCallback(() => {
    setActiveModal(null)
    // Entferne den Hash aus der URL ohne Page-Reload
    history.replaceState(null, '', window.location.pathname + window.location.search)
  }, [])

  useEffect(() => {
    function handleHashChange() {
      const modal = getModalFromHash(window.location.hash)
      setActiveModal(modal)
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <Aktuelles />
        <NaechsteSpiele />
        <Mannschaften />
        <UeberUns />
        <Mitmachen />
        <Kontakt />
      </main>
      <Footer />

      <Modal
        isOpen={activeModal === 'impressum'}
        onClose={closeModal}
        title="Impressum"
      >
        <ImpressumContent />
      </Modal>

      <Modal
        isOpen={activeModal === 'datenschutz'}
        onClose={closeModal}
        title="Datenschutzerklärung"
      >
        <DatenschutzContent />
      </Modal>
    </>
  )
}
