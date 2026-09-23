import { useEffect, useState } from 'react'

const WHATSAPP = '557398704600'
const asset = (fileName) => `${import.meta.env.BASE_URL}assets/${fileName}`
const askViaWhatsApp = (trip) => {
  const message = trip
    ? `Olá! Quero informações sobre o passeio para ${trip}.`
    : 'Olá! Quero planejar uma viagem com a Via Fox Tour.'
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
}

const destinations = [
  { name: 'Maragogi', state: 'ALAGOAS', image: asset('maragogi.jpg'), className: 'feature' },
  { name: 'Porto de Galinhas', state: 'PERNAMBUCO', image: asset('portodegalinhas.jpg') },
  { name: 'Cânions do Xingó', state: 'SERGIPE', image: asset('canionxingo.jpg') },
  { name: 'Itacaré', state: 'BAHIA', image: asset('itacare.jpg'), className: 'wide' },
]

const heroImages = [
  asset('carro1.jpg'),
  asset('carro2.jpg'),
  asset('carro3.jpg'),
  asset('carro4.jpg'),
  asset('carro5.jpg'),
]

function WhatsAppIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19.05 4.95A9.9 9.9 0 0 0 12.02 2C6.55 2 2.1 6.45 2.1 11.92c0 1.75.46 3.46 1.33 4.96L2 22l5.27-1.38a9.9 9.9 0 0 0 4.75 1.21h.01c5.47 0 9.92-4.45 9.92-9.92a9.85 9.85 0 0 0-2.9-6.96Zm-7.03 15.2a8.2 8.2 0 0 1-4.2-1.16l-.3-.18-3.13.82.84-3.05-.2-.31a8.2 8.2 0 1 1 6.99 3.88Zm4.49-6.16c-.25-.13-1.48-.73-1.71-.81-.23-.08-.4-.13-.57.13-.17.25-.65.81-.8.98-.15.17-.3.19-.55.06-.25-.13-1.06-.39-2.01-1.25-.74-.67-1.24-1.5-1.39-1.75-.15-.25-.02-.39.11-.51.12-.12.25-.3.38-.45.13-.15.17-.25.25-.42.08-.17.04-.32-.02-.45-.06-.13-.57-1.38-.78-1.89-.2-.49-.41-.42-.57-.43h-.48c-.17 0-.44.06-.67.32-.23.25-.88.86-.88 2.1s.9 2.44 1.03 2.61c.13.17 1.77 2.7 4.29 3.79.6.26 1.07.42 1.44.54.61.19 1.17.16 1.61.1.49-.07 1.48-.6 1.69-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.16-.48-.29Z" fill="currentColor" /></svg>
}

function WhatsAppButton({ children, trip, className = 'button yellow' }) {
  return <button className={className} onClick={() => askViaWhatsApp(trip)}>{children} <span>↗</span></button>
}

function Header() {
  return <header className="topbar" id="inicio">
    <a className="brand" href="#inicio" aria-label="Via Fox Tour - início"><img src={asset('logo.png')} alt="Via Fox Tour" /></a>
    <nav aria-label="Navegação principal"><a href="#destinos">Destinos</a><a href="#experiencia">Por que viajar</a><a href="#contato">Contato</a></nav>
    <WhatsAppButton className="header-cta">Planejar viagem</WhatsAppButton>
  </header>
}

function Hero() {
  const [activeImage, setActiveImage] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => setActiveImage((current) => (current + 1) % heroImages.length), 5000)
    return () => window.clearInterval(timer)
  }, [])

  const changeSlide = (direction) => setActiveImage((current) => (current + direction + heroImages.length) % heroImages.length)

  return <section className="hero">
    <div className="hero-slides" aria-label="Imagens dos passeios Via Fox Tour">{heroImages.map((image, index) => <img className={`hero-image ${index === activeImage ? 'is-active' : ''}`} src={image} alt="Experiência Via Fox Tour" key={image} />)}</div><div className="hero-shade" />
    <div className="hero-content"><p className="eyebrow light">VIA FOX TOUR · NORDESTE</p><h1>O melhor caminho<br />para viver histórias.</h1><p className="hero-copy">Passeios, traslados e experiências planejadas para você aproveitar cada destino do seu jeito.</p><div className="hero-actions"><WhatsAppButton>Quero viajar</WhatsAppButton><a className="text-link" href="#destinos">Explorar destinos <span>↓</span></a></div></div>
    <div className="hero-note"><span className="pulse" /> Próxima aventura? A gente te leva.</div>
    <div className="hero-controls"><button onClick={() => changeSlide(-1)} aria-label="Imagem anterior">‹</button><div className="hero-dots">{heroImages.map((image, index) => <button className={index === activeImage ? 'is-active' : ''} aria-label={`Ver imagem ${index + 1}`} aria-current={index === activeImage} onClick={() => setActiveImage(index)} key={image} />)}</div><button onClick={() => changeSlide(1)} aria-label="Próxima imagem">›</button></div>
  </section>
}

function Destinations() {
  return <><section className="intro" id="destinos"><div><p className="eyebrow">ESCOLHA SEU CENÁRIO</p><h2>Destinos que ficam<br />na memória.</h2></div><p>Do litoral de águas transparentes a paisagens que surpreendem, cada passeio é organizado com cuidado, segurança e leveza.</p></section><section className="destination-grid">{destinations.map((destination) => <article className={`destination ${destination.className || ''}`} key={destination.name}><img src={destination.image} alt={`Paisagem de ${destination.name}`} /><div className="card-overlay"><span className="tag">{destination.state}</span><h3>{destination.name}</h3><button onClick={() => askViaWhatsApp(destination.name)}>Conhecer <b>↗</b></button></div></article>)}</section></>
}

function Experience() {
  return <section className="experience" id="experiencia"><div className="experience-photo"><img src={asset('maceio.jpg')} alt="Maceió e seu mar azul" /><span className="stamp">✦<br />VIA FOX<br />TOUR</span></div><div className="experience-copy"><p className="eyebrow">UMA VIAGEM TRANQUILA</p><h2>Você cuida das lembranças. Nós cuidamos do caminho.</h2><p>Transporte seguro, horários organizados e atendimento próximo para transformar o planejamento em uma parte boa da viagem.</p><div className="reasons"><div><i>01</i><h3>Seguro e pontual</h3><p>Você embarca com tranquilidade e chega no tempo certo.</p></div><div><i>02</i><h3>Do seu jeito</h3><p>Atendimento personalizado para cada roteiro e grupo.</p></div></div><WhatsAppButton className="button blue">Falar com a Via Fox</WhatsAppButton></div></section>
}

function Contact() {
  return <section className="contact" id="contato"><p className="eyebrow light">VAMOS COMEÇAR?</p><h2>Seu destino está<br />mais perto do que parece.</h2><WhatsAppButton>Chamar no WhatsApp</WhatsAppButton><a className="instagram" href="https://www.instagram.com/viafoxtour/" target="_blank" rel="noreferrer">Siga <strong>@viafoxtour</strong> no Instagram ↗</a></section>
}

function Footer() {
  const year = new Date().getFullYear()
  return <footer><img src={asset('logo.png')} alt="Via Fox Tour" /><p>Conectando você aos melhores destinos.</p><span>© {year} Via Fox Tour</span></footer>
}

export default function App() {
  useEffect(() => { document.title = 'Via Fox Tour | Seu próximo destino começa aqui' }, [])
  return <><Header /><main><Hero /><Destinations /><Experience /><Contact /></main><Footer /><button className="whatsapp-float" onClick={() => askViaWhatsApp()} aria-label="Conversar no WhatsApp"><WhatsAppIcon /></button></>
}
