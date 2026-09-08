import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import {
  ArrowDown,
  ArrowRight,
  Check,
  ChevronDown,
  CirclePause,
  CirclePlay,
  Leaf,
  MapPin,
  Mountain,
  Plane,
  Sparkles,
  Ticket,
  TrainFront,
  X,
} from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
// Evita que o teclado virtual/barra de endereço do mobile dispare um
// recálculo caro de todos os ScrollTriggers a cada resize.
ScrollTrigger.config({ ignoreMobileResize: true })

const WHATSAPP_PHONE = '5571996352670'
const whatsappUrl = (message) =>
  `https://api.whatsapp.com/send/?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0&utm_source=site-campos-do-jordao`

const generalWhatsappUrl = whatsappUrl(
  'Olá, Radar! Vi o roteiro de Campos do Jordão e quero saber mais sobre o destino, valores, hospedagens e como garantir minha viagem.',
)

const destinations = [
  {
    id: 'horto',
    number: '01',
    verb: 'Respirar',
    eyebrow: 'Primeira parada · Respirar',
    title: 'Horto\nFlorestal',
    short: 'Horto Florestal',
    headline: 'Antes da cidade, escute a serra.',
    image: '/media/horto.webp',
    alt: 'Lago e mata de araucárias no Horto Florestal de Campos do Jordão',
    icon: Leaf,
    category: 'natureza e trilhas',
    accent: '#d7ff4f',
    description:
      'O caminho entra pela mata e o barulho fica para trás. Araucárias, trilhas e água correndo por perto — espaço para caminhar sem olhar as horas.',
    facts: [
      ['Chegue cedo', 'A manhã traz ar fresco e luz atravessando as árvores.'],
      ['Dê tempo ao lugar', 'Caminhe, pare e continue quando der vontade.'],
      ['Vá para caminhar', 'Leve tênis, água e uma camada extra de roupa.'],
    ],
    cta: 'Colocar o Horto na rota',
    memory: 'Você diminuiu o passo.',
    choice: 'Natureza e tempo para desacelerar.',
  },
  {
    id: 'morro',
    number: '02',
    verb: 'Subir',
    eyebrow: 'Segunda parada · Subir',
    title: 'Morro do\nElefante',
    short: 'Morro do Elefante',
    headline: 'A cidade muda quando você ganha altura.',
    image: '/media/morro.webp',
    alt: 'Teleférico subindo o Morro do Elefante em Campos do Jordão',
    icon: Mountain,
    category: 'vista panorâmica',
    accent: '#ffb45e',
    description:
      'O teleférico deixa Capivari para trás. Os telhados diminuem, a paisagem se abre e Campos do Jordão muda diante dos olhos.',
    facts: [
      ['Aproveite a subida', 'Parte da melhor vista acontece no caminho.'],
      ['Fique mais um pouco', 'Explore o alto antes de pensar na descida.'],
      ['Olhe longe', 'Com céu aberto, a paisagem parece não terminar.'],
    ],
    cta: 'Quero ver a cidade do alto',
    memory: 'Você mudou o ponto de vista.',
    choice: 'Campos do Jordão de outro ângulo.',
  },
  {
    id: 'trem',
    number: '03',
    verb: 'Seguir',
    eyebrow: 'Terceira parada · Seguir',
    title: 'Passeio\nde trem',
    short: 'Passeio de trem',
    headline: 'Tem caminhos melhores quando demoram.',
    image: '/media/trem.webp',
    alt: 'Trem da Estrada de Ferro Campos do Jordão cruzando a serra',
    icon: TrainFront,
    category: 'experiência ferroviária',
    accent: '#ffd857',
    description:
      'O trem acompanha a montanha e a paisagem muda sem pedir nada além de presença. Aqui, o caminho é o próprio passeio.',
    facts: [
      ['Fique na janela', 'É dali que a serra conta a história.'],
      ['Esqueça a pressa', 'O melhor acontece entre a partida e a chegada.'],
      ['Faça a foto. Depois olhe.', 'Algumas curvas ficam melhores só na memória.'],
    ],
    cta: 'Quero fazer o passeio de trem',
    memory: 'Você deixou o caminho durar.',
    choice: 'A serra vista pelo caminho.',
  },
]

const radarAssets = {
  full: { src: '/media/radar-logo.webp', width: 920, height: 286 },
  wordmark: { src: '/media/radar-wordmark.webp', width: 620, height: 121 },
}

function RadarLogo({ variant = 'wordmark', className = '', eager = false, decorative = false }) {
  const asset = radarAssets[variant]

  return (
    <span className={`radar-logo radar-logo-${variant} ${className}`.trim()}>
      <img
        src={asset.src}
        width={asset.width}
        height={asset.height}
        alt={decorative ? '' : 'Radar Viagem e Turismo'}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
      />
    </span>
  )
}

function WhatsAppIcon({ size = 24, className }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.198.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.017 21.998c-1.79 0-3.532-.442-5.084-1.283l-.365-.207-3.777.99.996-3.68-.238-.372c-.897-1.421-1.371-3.045-1.371-4.732 0-4.869 3.955-8.821 8.822-8.821 4.868 0 8.822 3.952 8.822 8.821 0 4.868-3.954 8.284-8.805 8.284zm7.552-16.373c-2.014-2.02-4.693-3.132-7.552-3.132-5.882 0-10.668 4.786-10.668 10.669 0 1.882.494 3.719 1.431 5.334l-1.522 5.554 5.687-1.492c1.548.845 3.29 1.291 5.058 1.291h.005c5.881 0 10.668-4.786 10.668-10.669 0-2.851-1.11-5.532-3.107-7.555z" />
    </svg>
  )
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(query.matches)
    update()
    query.addEventListener?.('change', update)
    return () => query.removeEventListener?.('change', update)
  }, [])

  return reduced
}

function Preloader({ onComplete }) {
  const root = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete })
      tl.from('.loader-plane', { x: -90, opacity: 0, duration: 0.7, ease: 'power3.out' })
        .to('.loader-line-fill', { scaleX: 1, duration: 1.1, ease: 'power2.inOut' }, '<0.1')
        .to('.loader-copy span', { yPercent: -110, duration: 0.5, ease: 'power3.inOut' })
        .to(root.current, { yPercent: -102, duration: 0.9, ease: 'expo.inOut' }, '-=0.15')
    }, root)
    return () => ctx.revert()
  }, [onComplete])

  return (
    <div className="preloader" ref={root} aria-hidden="true">
      <RadarLogo variant="full" className="loader-brand" eager decorative />
      <div className="loader-route">
        <Plane className="loader-plane" size={22} fill="currentColor" />
        <div className="loader-line"><i className="loader-line-fill" /></div>
        <MapPin size={19} />
      </div>
      <p className="loader-copy"><span>Preparando sua janela para a serra</span></p>
    </div>
  )
}

function FlightNav({ progressRef, soundOn, soundLabel, toggleSound }) {
  return (
    <header className="flight-nav" aria-label="Navegação principal">
      <a className="brand" href="#top" aria-label="Radar Viagem e Turismo — início">
        <span className="brand-orbit"><Plane size={13} fill="currentColor" /></span>
        <RadarLogo variant="wordmark" className="nav-radar-logo" eager decorative />
      </a>
      <div className="nav-actions">
        <button className="sound-button" onClick={toggleSound} aria-pressed={soundOn} aria-label={soundOn ? 'Desligar som ambiente' : 'Ligar som ambiente'}>
          {soundOn ? <CirclePause size={16} /> : <CirclePlay size={16} />}
          <span>{soundLabel}</span>
        </button>
        <a className="route-button" href="#roteiro">Ver roteiro <ArrowRight size={15} /></a>
      </div>
      <div className="nav-progress" ref={progressRef} />
    </header>
  )
}

function AirplaneIntro({ reducedMotion }) {
  const root = useRef(null)
  const video = useRef(null)

  useEffect(() => {
    if (!video.current || reducedMotion) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.current?.play().catch(() => {})
      else video.current?.pause()
    }, { threshold: 0.1 })
    observer.observe(video.current)
    return () => observer.disconnect()
  }, [reducedMotion])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (reducedMotion) return
      const sky = root.current.querySelector('.sky-window')
      const initialClip = () => {
        const width = sky.clientWidth
        const height = sky.clientHeight
        const desktop = window.matchMedia('(min-width: 1100px)').matches
        const openingWidth = Math.min(window.innerWidth * (desktop ? 0.26 : 0.68), desktop ? 400 : 360)
        const openingHeight = Math.min((desktop ? window.innerHeight : height) * (desktop ? 0.58 : 0.55), desktop ? 610 : 540)
        const x = Math.max(0, (width - openingWidth) / 2)
        const y = Math.max(0, (height - openingHeight) / 2)
        return `inset(${y}px ${x}px ${y}px ${x}px round ${width * 0.45}px / ${height * 0.45}px)`
      }
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.45,
          invalidateOnRefresh: true,
        },
      })
      tl.to('.boarding-copy', { y: 45, opacity: 0, duration: 0.42, ease: 'power2.in' }, 0)
        // Resolve responsive geometry only on setup/refresh. Matching numeric
        // clip syntax avoids calc interpolation and inherited CSS-variable updates.
        .to('.window-rim', { autoAlpha: 0, duration: 0.12, ease: 'none' }, 0)
        .fromTo(sky, { clipPath: initialClip }, { clipPath: 'inset(0px 0px 0px 0px round 0px / 0px)', duration: 1.6, ease: 'none' }, 0.12)
        .to('.cabin-shell', { autoAlpha: 0, duration: 0.5, ease: 'none' }, 0.12)
        .fromTo('.flight-hero-copy', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.75, ease: 'power2.out' }, 1.55)
        .fromTo('.hero-word', { yPercent: 110 }, { yPercent: 0, stagger: 0.12, duration: 0.9, ease: 'power4.out' }, 1.5)
        .to('.altitude-value', { innerText: 3, snap: { innerText: 1 }, duration: 1.6, ease: 'none' }, 0)
    }, root)
    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <section className="takeoff" id="top" ref={root} aria-label="Início da viagem">
      <div className="takeoff-sticky">
        <div className="sky-window">
          <video
            ref={video}
            className="sky-video"
            poster="/media/janela-poster.webp"
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Vista real da janela do avião, sobre nuvens e litoral, na volta para casa"
          >
            <source src="/media/janela-real.webm" type="video/webm" />
          </video>
          <div className="sky-color" />
          <div className="window-glint" />
          <div className="flight-hero-copy">
            <div className="hero-provider">
              <RadarLogo variant="full" className="hero-radar-logo" eager />
              <span>apresenta</span>
            </div>
            <p className="hero-kicker"><span /> Campos do Jordão • São Paulo</p>
            <h1 aria-label="Campos do Jordão">
              <span className="word-mask"><span className="hero-word">Campos</span></span>
              <span className="word-mask"><span className="hero-word hero-serif">do Jordão</span></span>
            </h1>
            <div className="hero-meta">
              <p>Suba a serra.<br /><strong>Deixe a pressa lá embaixo.</strong></p>
              <div className="altimeter"><span>EXPERIÊNCIAS</span><strong className="altitude-value">0</strong><small>no roteiro</small></div>
            </div>
          </div>
        </div>

        <div className="cabin-shell" aria-hidden="true">
          <div className="cabin-ceiling"><i /><i /><i /></div>
          <div className="window-rim" />
          <div className="seat-edge left" />
          <div className="seat-edge right" />
          <div className="cabin-panel left"><i /><i /><i /></div>
          <div className="cabin-panel right"><i /><i /><i /></div>
        </div>

        <div className="boarding-copy">
          <span className="boarding-chip"><span className="status-dot" /> DESTINO DE HOJE · CAMPOS DO JORDÃO</span>
          <h2>Antes de chegar,<br /><em>olhe pela janela.</em></h2>
          <p>Role para abrir a serra.</p>
          <ArrowDown className="scroll-arrow" size={18} />
        </div>
      </div>
    </section>
  )
}

function RouteBriefing({ reducedMotion }) {
  const root = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (reducedMotion) return
      gsap.from('.brief-line', {
        scaleX: 0,
        transformOrigin: 'left center',
        scrollTrigger: { trigger: root.current, start: 'top 58%', end: 'center 25%', scrub: 1 },
      })
      gsap.from('.route-stop', {
        y: 35,
        opacity: 0,
        stagger: 0.18,
        scrollTrigger: { trigger: root.current, start: 'top 58%' },
      })
      // Começa só quando a seção já está bem visível e termina perto do fim
      // dela, para o avião não completar o trajeto antes de dar tempo de ver.
      gsap.to('.route-plane', {
        left: '88%',
        rotate: 18,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top 58%', end: 'bottom 12%', scrub: 1 },
      })
    }, root)
    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <section className="briefing" id="roteiro" ref={root} aria-labelledby="briefing-title">
      <div className="section-label"><span>00</span> SEU ROTEIRO</div>
      <div className="briefing-head">
        <h2 id="briefing-title">Três movimentos.<br /><em>Uma mesma serra.</em></h2>
        <div className="briefing-support">
          <p>Caminhe entre araucárias, veja a cidade do alto e termine deixando a paisagem passar pela janela.</p>
          <span><RadarLogo variant="wordmark" decorative /> curadoria Radar</span>
        </div>
      </div>
      <div className="route-map">
        <div className="brief-line" />
        {destinations.map((destination, index) => {
          const Icon = destination.icon
          return (
            <a className="route-stop" href={`#${destination.id}`} key={destination.id}>
              <span className="stop-node"><Icon size={18} /></span>
              <small>0{index + 1} · {destination.verb}</small>
              <strong>{destination.short}</strong>
            </a>
          )
        })}
        <Plane className="route-plane" size={24} fill="currentColor" />
      </div>
      <p className="route-caption"><Sparkles size={15} /> Escolha uma parada ou siga a viagem na ordem.</p>
    </section>
  )
}

function TiltCard({ children, className = '', reducedMotion = false }) {
  const card = useRef(null)
  const rect = useRef(null)
  const quick = useRef(null)

  useEffect(() => {
    if (!card.current) return
    gsap.set(card.current, { transformPerspective: 900 })
    quick.current = {
      rotateY: gsap.quickTo(card.current, 'rotateY', { duration: 0.45, ease: 'power2.out' }),
      rotateX: gsap.quickTo(card.current, 'rotateX', { duration: 0.45, ease: 'power2.out' }),
      // --mx/--my já começam em 50% no CSS, então o quickTo herda o unit '%'
      // do valor computado inicial e os valores passados abaixo podem ser numéricos.
      mx: gsap.quickTo(card.current, '--mx', { duration: 0.45, ease: 'power2.out' }),
      my: gsap.quickTo(card.current, '--my', { duration: 0.45, ease: 'power2.out' }),
    }
  }, [])

  // Lê o layout uma vez ao entrar, evitando reflow síncrono a cada pointermove.
  const startTilt = () => {
    if (reducedMotion || !card.current) return
    rect.current = card.current.getBoundingClientRect()
  }

  const move = (event) => {
    if (reducedMotion || !rect.current || !quick.current) return
    const x = (event.clientX - rect.current.left) / rect.current.width - 0.5
    const y = (event.clientY - rect.current.top) / rect.current.height - 0.5
    quick.current.rotateY(x * 9)
    quick.current.rotateX(y * -9)
    quick.current.mx((x + 0.5) * 100)
    quick.current.my((y + 0.5) * 100)
  }

  const reset = () => {
    rect.current = null
    if (!card.current) return
    gsap.to(card.current, { rotateX: 0, rotateY: 0, duration: 0.7, ease: 'elastic.out(1, .55)' })
  }

  return (
    <div
      className={`tilt-card ${className}`}
      ref={card}
      onPointerEnter={startTilt}
      onPointerMove={move}
      onPointerLeave={reset}
    >
      {children}
    </div>
  )
}

function DestinationStory({ item, index, reducedMotion }) {
  const root = useRef(null)
  const [activeFact, setActiveFact] = useState(0)
  const Icon = item.icon

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (reducedMotion) return
      const stage = root.current.querySelector('.destination-stage')
      const image = root.current.querySelector('.destination-image')
      const title = root.current.querySelector('.destination-title')
      const card = root.current.querySelector('.info-card')

      gsap.fromTo(image, { scale: 1.18 }, {
        scale: 1,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: 1.2 },
      })
      gsap.fromTo(title, { yPercent: 45 }, {
        yPercent: -18,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top 72%', end: 'bottom 26%', scrub: 1 },
      })
      gsap.fromTo(card, { y: 85, rotateX: 10, opacity: 0 }, {
        y: 0,
        rotateX: 0,
        opacity: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: stage, start: 'top 55%' },
      })

      if (index === 0) {
        gsap.to('.leaf-particle', {
          yPercent: (i) => -140 - i * 25,
          xPercent: (i) => (i % 2 ? 70 : -45),
          rotate: (i) => (i + 1) * 80,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
        })
      }
      if (index === 1) {
        const cable = root.current.querySelector('.cable-scene')
        const gondola = cable.querySelector('.gondola')
        gsap.fromTo(gondola, {
          x: 0,
          y: () => cable.clientHeight - gondola.offsetHeight,
        }, {
          x: () => cable.clientWidth - gondola.offsetWidth,
          y: 28,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom bottom', scrub: 1, invalidateOnRefresh: true },
        })
      }
      if (index === 2) {
        const tracks = root.current.querySelector('.train-scene')
        const train = tracks.querySelector('.mini-train')
        gsap.fromTo(train, { x: 0 }, {
          x: () => Math.max(0, tracks.clientWidth - train.offsetWidth),
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom bottom', scrub: 1, invalidateOnRefresh: true },
        })
      }
    }, root)
    return () => ctx.revert()
  }, [index, reducedMotion])

  useEffect(() => {
    if (reducedMotion) return
    const next = root.current?.querySelector('.fact-copy')
    if (!next) return
    gsap.fromTo(next, { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out' })
  }, [activeFact, reducedMotion])

  return (
    <section className={`destination destination-${index + 1}`} id={item.id} ref={root} style={{ '--accent': item.accent }}>
      <div className="destination-stage">
        <img
          className="destination-image"
          src={item.image}
          alt={item.alt}
          loading="lazy"
          decoding="async"
          width="1600"
          height="1100"
        />
        <div className="destination-grade" />
        <div className="destination-index">{item.number}</div>
        <div className="destination-copy">
          <p><Icon size={16} /> {item.eyebrow}</p>
          <h2 className="destination-title">{item.title.split('\n').map((line) => <span key={line}>{line}</span>)}</h2>
        </div>

        {index === 0 && <div className="leaf-field" aria-hidden="true">{Array.from({ length: 7 }).map((_, i) => <i className="leaf-particle" key={i}>◒</i>)}</div>}
        {index === 1 && (
          <div className="cable-scene" aria-hidden="true">
            <svg className="cable-line" viewBox="0 0 100 100" preserveAspectRatio="none"><line x1="0" y1="100" x2="100" y2="0" vectorEffect="non-scaling-stroke" /></svg>
            <div className="gondola"><span /><i /><b /></div>
          </div>
        )}
        {index === 2 && (
          <div className="train-scene" aria-hidden="true">
            <div className="track-lines"><i /><i /></div>
            <div className="mini-train"><TrainFront size={28} /><span /><span /></div>
          </div>
        )}

        <TiltCard className="info-card" reducedMotion={reducedMotion}>
          <div className="card-topline">
            <span><Sparkles size={14} /> {item.category}</span>
            <span>RADAR INDICA · {item.number}</span>
          </div>
          <h3 className="card-headline">{item.headline}</h3>
          <p className="card-description">{item.description}</p>
          <div className="fact-tabs" role="tablist" aria-label={`Dicas para ${item.short}`}>
            {item.facts.map((fact, factIndex) => (
              <button
                key={fact[0]}
                role="tab"
                id={`${item.id}-tab-${factIndex}`}
                aria-controls={`${item.id}-panel`}
                aria-selected={activeFact === factIndex}
                onClick={() => setActiveFact(factIndex)}
              >
                {String(factIndex + 1).padStart(2, '0')}
              </button>
            ))}
          </div>
          <div className="fact-copy" key={activeFact} id={`${item.id}-panel`} role="tabpanel" aria-labelledby={`${item.id}-tab-${activeFact}`}>
            <strong>{item.facts[activeFact][0]}</strong>
            <p>{item.facts[activeFact][1]}</p>
          </div>
          <a
            className="chapter-cta"
            href={whatsappUrl(`Olá, Radar! Vi ${item.short} no roteiro de Campos do Jordão e quero saber mais sobre valores, hospedagem e como garantir minha viagem.`)}
            target="_blank"
            rel="noreferrer"
          >
            {item.cta}<ArrowRight size={14} />
          </a>
          <span className="card-glow" />
        </TiltCard>

      </div>
    </section>
  )
}

function StoryTransition({ number, kicker, lines, icon: Icon, reducedMotion }) {
  const root = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (reducedMotion) return
      gsap.from('.transition-word', {
        yPercent: 115,
        rotate: 2,
        stagger: 0.035,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 55%', end: 'center 20%', scrub: 0.7 },
      })
      // The fill endpoint and icon center share one progress value and track.
      gsap.fromTo('.transition-rule', { '--route-progress': 0 }, {
        '--route-progress': 1,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top 60%', end: 'bottom 15%', scrub: 1 },
      })
    }, root)
    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <section className={`story-transition transition-${number}`} ref={root} aria-label={`Transição para a parada ${number}`}>
      <div className="transition-topline"><span>0{number}</span><p>{kicker}</p><small>CONTINUE DESCENDO</small></div>
      <div className="transition-copy">
        {lines.map((line) => (
          <p key={line}>
            {line.split(' ').map((word, index) => (
              <span className="transition-mask" key={`${word}-${index}`}><span className="transition-word">{word}&nbsp;</span></span>
            ))}
          </p>
        ))}
      </div>
      <div className="transition-rule"><i className="transition-rule-fill" /><span className="transition-orb"><Icon size={18} /></span></div>
    </section>
  )
}

function MemoryStrip({ reducedMotion }) {
  const root = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (reducedMotion) return
      gsap.to('.memory-track', {
        x: () => -(root.current.querySelector('.memory-track').scrollWidth - window.innerWidth + 48),
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })
      gsap.to('.stamp', {
        rotate: (i) => (i % 2 ? 13 : -9),
        scale: 1.05,
        stagger: 0.1,
        scrollTrigger: { trigger: root.current, start: 'top 60%', scrub: 1 },
      })
    }, root)
    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <section className="memory-section" ref={root} aria-label="Momentos da viagem">
      <div className="memory-sticky">
        <div className="memory-intro">
          <span>SUA VIAGEM ATÉ AQUI</span>
          <h2>Três lugares.<br /><em>Três ritmos.</em></h2>
        </div>
        <div className="memory-track">
          {destinations.map((item, index) => (
            <figure className="memory-card" key={item.id}>
              <img src={item.image} alt="" loading="lazy" decoding="async" />
              <figcaption><span>0{index + 1} · {item.short}</span><strong>{item.memory}</strong></figcaption>
              <div className="stamp">NO RADAR<br /><b>CJ • SP</b></div>
            </figure>
          ))}
          <div className="memory-quote">
            <p>Viajar bem é<br /><em>estar inteiro</em><br />onde você está.</p>
            <Plane size={44} strokeWidth={1.2} />
          </div>
        </div>
      </div>
    </section>
  )
}

function BoardingPass({ onOpen, reducedMotion }) {
  const pass = useRef(null)
  const rect = useRef(null)
  const quick = useRef(null)

  useEffect(() => {
    if (!pass.current) return
    quick.current = {
      rotateY: gsap.quickTo(pass.current, 'rotateY', { duration: 0.5, ease: 'power2.out' }),
      rotateX: gsap.quickTo(pass.current, 'rotateX', { duration: 0.5, ease: 'power2.out' }),
    }
  }, [])

  const startTilt = () => {
    if (reducedMotion || !pass.current) return
    rect.current = pass.current.getBoundingClientRect()
  }

  const move = (event) => {
    if (reducedMotion || !rect.current || !quick.current) return
    const x = (event.clientX - rect.current.left) / rect.current.width - 0.5
    const y = (event.clientY - rect.current.top) / rect.current.height - 0.5
    quick.current.rotateY(x * 7)
    quick.current.rotateX(-y * 7)
  }

  const resetTilt = () => {
    rect.current = null
    if (!pass.current) return
    gsap.to(pass.current, { rotateX: 0, rotateY: 0, duration: 0.8, ease: 'elastic.out(1,.55)' })
  }

  return (
    <section className="boarding" id="embarque">
      <div className="boarding-aura" />
      <div className="section-label light"><span>04</span> AGORA É COM VOCÊ</div>
      <div className="boarding-heading">
        <span>Escolha como viver a serra.</span>
        <div className="boarding-heading-copy">
          <h2>Campos do Jordão<br /><em>já está no radar.</em></h2>
          <p>
            Os três passeios são só o começo. Existem muitos outros atrativos, passeios e experiências que fazem de Campos do Jordão um dos destinos mais charmosos do Brasil.
          </p>
          <p>
            Quer saber mais sobre o destino, valores, hospedagens e como garantir sua viagem? <strong>Fale com a Radar.</strong>
          </p>
        </div>
      </div>
      <div className="pass-perspective" onPointerEnter={startTilt} onPointerMove={move} onPointerLeave={resetTilt}>
        <article className="boarding-pass" ref={pass} aria-label="Guia de destino Radar para Campos do Jordão">
          <div className="pass-main">
            <div className="pass-brand"><RadarLogo variant="wordmark" decorative /><small>GUIA DE DESTINO</small></div>
            <div className="pass-destination">
              <div><small>DESTINO</small><strong>Campos do Jordão</strong><span>São Paulo, Brasil</span></div>
              <div className="pass-count"><strong>03</strong><span>experiências</span></div>
            </div>
            <div className="pass-radar-list">
              <small>ROTEIRO DE EXPERIÊNCIAS</small>
              {destinations.map((item) => <span key={item.id}><i>{item.number}</i><b>{item.short}</b></span>)}
            </div>
            <div className="pass-data">
              <span><small>FORMATO</small><b>GUIA VISUAL</b></span>
              <span><small>CONTEÚDO</small><b>3 EXPERIÊNCIAS</b></span>
              <span><small>CURADORIA</small><b>RADAR</b></span>
            </div>
          </div>
          <div className="pass-stub">
            <Ticket size={24} aria-hidden="true" />
            <div>
              <small>ANTES DE IR</small>
              <p>Confirme horários, funcionamento e ingressos nos canais oficiais.</p>
            </div>
          </div>
        </article>
      </div>
      <div className="boarding-actions">
        <a className="magnetic-cta" href={generalWhatsappUrl} target="_blank" rel="noreferrer">
          <span>Falar com a Radar no WhatsApp</span><span className="cta-icon"><WhatsAppIcon size={20} /></span>
        </a>
        <button className="magnetic-cta route-builder" onClick={onOpen}>
          <span>Personalizar este roteiro</span><span className="cta-icon"><ArrowRight size={20} /></span>
        </button>
      </div>
      <a className="boarding-note" href="#roteiro"><ChevronDown size={15} /> Rever as três experiências</a>
    </section>
  )
}

function PlannerModal({ open, onClose }) {
  const [selected, setSelected] = useState(destinations.map((item) => item.id))
  const [saved, setSaved] = useState(false)
  const dialog = useRef(null)

  useEffect(() => {
    if (!open) return
    setSaved(false)
    const previous = document.activeElement
    document.body.classList.add('modal-open')
    gsap.fromTo(dialog.current, { y: 45, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.55, ease: 'power3.out' })
    dialog.current?.focus()
    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key !== 'Tab' || !dialog.current) return
      const focusable = [...dialog.current.querySelectorAll('button:not(:disabled), a[href], [tabindex]:not([tabindex="-1"])')]
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.classList.remove('modal-open')
      window.removeEventListener('keydown', onKey)
      previous?.focus?.()
    }
  }, [open, onClose])

  if (!open) return null

  const toggle = (id) => setSelected((current) => current.includes(id) ? current.filter((entry) => entry !== id) : [...current, id])

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div className="planner-modal" ref={dialog} role="dialog" aria-modal="true" aria-labelledby="planner-title" tabIndex="-1">
        <button className="modal-close" onClick={onClose} aria-label="Fechar"><X size={19} /></button>
        {!saved ? (
          <>
            <span className="modal-kicker"><Ticket size={15} /> SEU ROTEIRO</span>
            <h2 id="planner-title">O que merece<br /><em>entrar no seu dia?</em></h2>
            <div className="planner-list">
              {destinations.map((item) => {
                const Icon = item.icon
                const checked = selected.includes(item.id)
                return (
                  <button key={item.id} className={checked ? 'selected' : ''} onClick={() => toggle(item.id)} aria-pressed={checked}>
                    <span className="planner-icon"><Icon size={18} /></span>
                    <span><strong>{item.short}</strong><small>{item.choice}</small><em>{item.category}</em></span>
                    <i>{checked && <Check size={15} />}</i>
                  </button>
                )
              })}
            </div>
            <button className="modal-submit" disabled={!selected.length} onClick={() => setSaved(true)}>Montar minha rota <ArrowRight size={18} /></button>
            <small className="privacy-note"><RadarLogo variant="wordmark" decorative /> Roteiro por Radar Viagem e Turismo.</small>
          </>
        ) : (
          <div className="success-state">
            <div className="success-orbit"><Plane size={30} fill="currentColor" /></div>
            <span>ROTA PRONTA</span>
            <h2>Campos do Jordão<br /><em>está no radar.</em></h2>
            <p>Você colocou {selected.length} {selected.length === 1 ? 'experiência' : 'experiências'} no seu radar para a próxima viagem.</p>
            <a
              className="modal-submit"
              href={whatsappUrl(`Olá, Radar! Montei um roteiro para Campos do Jordão com ${selected.map((id) => destinations.find((item) => item.id === id)?.short).filter(Boolean).join(', ')}. Quero saber mais sobre valores, hospedagem e como garantir minha viagem.`)}
              target="_blank"
              rel="noreferrer"
            >
              Falar com a Radar <WhatsAppIcon size={18} />
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

function WhatsAppFloat({ reducedMotion }) {
  const [visible, setVisible] = useState(false)
  const [cycle, setCycle] = useState(0)
  const bubble = useRef(null)
  const hideTimer = useRef(null)

  useEffect(() => {
    let interval

    const showMessage = () => {
      window.clearTimeout(hideTimer.current)
      setVisible(true)
      setCycle((current) => current + 1)
      hideTimer.current = window.setTimeout(() => setVisible(false), 4000)
    }

    const initial = window.setTimeout(() => {
      showMessage()
      interval = window.setInterval(showMessage, 25000)
    }, 25000)

    return () => {
      window.clearTimeout(initial)
      window.clearTimeout(hideTimer.current)
      window.clearInterval(interval)
    }
  }, [])

  useLayoutEffect(() => {
    if (!visible || !bubble.current || reducedMotion) return
    gsap.fromTo(
      bubble.current,
      { y: 12, opacity: 0, scale: 0.94 },
      { y: 0, opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(1.7)' },
    )
  }, [visible, cycle, reducedMotion])

  const dismiss = () => {
    window.clearTimeout(hideTimer.current)
    if (!bubble.current || reducedMotion) {
      setVisible(false)
      return
    }
    gsap.to(bubble.current, { y: 8, opacity: 0, duration: 0.2, onComplete: () => setVisible(false) })
  }

  return (
    <aside className="whatsapp-float" aria-label="Contato com a Radar pelo WhatsApp">
      {visible && (
        <div className="whatsapp-bubble" ref={bubble} role="status" aria-live="polite">
          <button type="button" onClick={dismiss} aria-label="Fechar mensagem"><X size={13} /></button>
          <span>RADAR VIAGEM E TURISMO</span>
          <p>Entre em contato com nossa agência de turismo.</p>
          <a href={generalWhatsappUrl} target="_blank" rel="noreferrer">Conversar agora <ArrowRight size={13} /></a>
        </div>
      )}
      <a className="whatsapp-button" href={generalWhatsappUrl} target="_blank" rel="noreferrer" aria-label="Falar com a Radar pelo WhatsApp">
        <WhatsAppIcon size={40} />
        <span>WhatsApp</span>
      </a>
    </aside>
  )
}

const SOUND_ZONES = ['top', 'horto', 'morro', 'trem']
const SOUND_LABELS = {
  top: 'voo ligado',
  horto: 'serra ligada',
  morro: 'vista ligada',
  trem: 'trem ligado',
}

// Cada trecho da viagem ganha sua própria paisagem sonora, sintetizada em tempo
// real (sem áudio externo) e cruzada suavemente conforme a seção ativa no scroll.
function createSoundscape(ctx) {
  const master = ctx.createGain()
  master.gain.value = 1
  master.connect(ctx.destination)

  const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate)
  const noiseData = noiseBuffer.getChannelData(0)
  for (let i = 0; i < noiseData.length; i++) noiseData[i] = Math.random() * 2 - 1

  const noiseLoop = (type, frequency, level, q = 0.6) => {
    const source = ctx.createBufferSource()
    source.buffer = noiseBuffer
    source.loop = true
    const filter = ctx.createBiquadFilter()
    filter.type = type
    filter.frequency.value = frequency
    filter.Q.value = q
    const output = ctx.createGain()
    output.gain.value = level
    source.connect(filter)
    filter.connect(output)
    source.start()
    return { filter, output }
  }

  const zoneGains = {}
  SOUND_ZONES.forEach((id) => {
    const gain = ctx.createGain()
    gain.gain.value = 0
    gain.connect(master)
    zoneGains[id] = gain
  })

  // top — vento fino de altitude visto pela janela do avião, com turbulência lenta
  const heroWind = noiseLoop('bandpass', 1100, 0.05, 0.5)
  const heroLfo = ctx.createOscillator()
  heroLfo.frequency.value = 0.11
  const heroLfoGain = ctx.createGain()
  heroLfoGain.gain.value = 420
  heroLfo.connect(heroLfoGain)
  heroLfoGain.connect(heroWind.filter.frequency)
  heroLfo.start()
  heroWind.output.connect(zoneGains.top)

  // horto — rumor grave da mata e da serra
  const hortoOsc1 = ctx.createOscillator()
  hortoOsc1.type = 'sine'
  hortoOsc1.frequency.value = 54
  const hortoOsc2 = ctx.createOscillator()
  hortoOsc2.type = 'triangle'
  hortoOsc2.frequency.value = 82
  const hortoFilter = ctx.createBiquadFilter()
  hortoFilter.type = 'lowpass'
  hortoFilter.frequency.value = 180
  const hortoLevel = ctx.createGain()
  hortoLevel.gain.value = 0.02
  hortoOsc1.connect(hortoFilter)
  hortoOsc2.connect(hortoFilter)
  hortoFilter.connect(hortoLevel)
  hortoLevel.connect(zoneGains.horto)
  hortoOsc1.start()
  hortoOsc2.start()

  // morro — ar aberto do alto com o zunido do cabo do teleférico
  const morroWind = noiseLoop('highpass', 1000, 0.045, 0.5)
  morroWind.output.connect(zoneGains.morro)
  const cableOsc = ctx.createOscillator()
  cableOsc.type = 'sine'
  cableOsc.frequency.value = 196
  const cableGain = ctx.createGain()
  cableGain.gain.value = 0.05
  const cableTremolo = ctx.createOscillator()
  cableTremolo.frequency.value = 5.2
  const cableTremoloGain = ctx.createGain()
  cableTremoloGain.gain.value = 0.015
  cableTremolo.connect(cableTremoloGain)
  cableTremoloGain.connect(cableGain.gain)
  cableOsc.connect(cableGain)
  cableGain.connect(zoneGains.morro)
  cableOsc.start()
  cableTremolo.start()

  // trem — ronco do motor e o compasso do trilho (clack periódico)
  const engineOsc = ctx.createOscillator()
  engineOsc.type = 'sawtooth'
  engineOsc.frequency.value = 38
  const engineFilter = ctx.createBiquadFilter()
  engineFilter.type = 'lowpass'
  engineFilter.frequency.value = 110
  const engineGain = ctx.createGain()
  engineGain.gain.value = 0.07
  engineOsc.connect(engineFilter)
  engineFilter.connect(engineGain)
  engineGain.connect(zoneGains.trem)
  engineOsc.start()

  let clackTimeout = null
  const scheduleClack = () => {
    const now = ctx.currentTime
    const source = ctx.createBufferSource()
    source.buffer = noiseBuffer
    const filter = ctx.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.value = 1500
    filter.Q.value = 2.2
    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.0001, now)
    gain.gain.linearRampToValueAtTime(0.22, now + 0.006)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14)
    source.connect(filter)
    filter.connect(gain)
    gain.connect(zoneGains.trem)
    source.start(now)
    source.stop(now + 0.16)
    clackTimeout = setTimeout(scheduleClack, 420 + Math.random() * 60)
  }
  scheduleClack()

  const setZone = (zoneId) => {
    const now = ctx.currentTime
    SOUND_ZONES.forEach((id) => {
      const gain = zoneGains[id]
      gain.gain.cancelScheduledValues(now)
      gain.gain.setTargetAtTime(id === zoneId ? 1 : 0, now, 0.8)
    })
  }

  const stop = () => clearTimeout(clackTimeout)

  return { setZone, stop }
}

function App() {
  const [loaded, setLoaded] = useState(false)
  const [soundOn, setSoundOn] = useState(false)
  const [activeZone, setActiveZone] = useState('horto')
  const [modalOpen, setModalOpen] = useState(false)
  const audio = useRef(null)
  const soundscape = useRef(null)
  const zoneTriggers = useRef([])
  const navProgress = useRef(null)
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    // Rola suavemente até os links internos (#roteiro, #embarque, #top...) via
    // GSAP em vez de `scroll-behavior: smooth` no CSS — o smooth scroll nativo
    // do navegador entra em conflito com o loop de rAF do ScrollTrigger e
    // deixa as animações com scrub soluçando durante e logo após a rolagem.
    const onClick = (event) => {
      if (reducedMotion) return
      const anchor = event.target.closest('a[href^="#"]')
      if (!anchor) return
      const id = anchor.getAttribute('href').slice(1)
      const target = document.getElementById(id)
      if (!target) return
      event.preventDefault()
      // Duração proporcional à distância: um clique num link perto não deve
      // "voar" na mesma velocidade que ir do rodapé até o topo da página.
      const distance = Math.abs(target.getBoundingClientRect().top)
      const duration = Math.min(1.3, Math.max(0.5, distance / 2000))
      gsap.to(window, { duration, ease: 'power2.inOut', scrollTo: { y: target, autoKill: true } })
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [reducedMotion])

  useEffect(() => {
    // Atualiza a barra de progresso direto no DOM via ScrollTrigger em vez de
    // um listener de scroll + estado do React, que forçava um re-render de
    // toda a árvore a cada tick de scroll e competia com as animações do GSAP.
    const trigger = ScrollTrigger.create({
      start: 0,
      end: () => Math.max(1, document.documentElement.scrollHeight - window.innerHeight),
      onUpdate: (self) => {
        navProgress.current?.style.setProperty('--progress', self.progress)
      },
      invalidateOnRefresh: true,
    })
    return () => trigger.kill()
  }, [])

  useEffect(() => {
    if (!loaded) return
    document.body.classList.add('ready')
    ScrollTrigger.refresh()
    // As fontes do Google Fonts chegam depois do primeiro paint; sem esse
    // refresh, os pontos de início/fim dos ScrollTriggers ficam calculados
    // com o layout "errado" (antes do reflow do web font) até o próximo resize.
    // Só refaz o cálculo se o usuário ainda não rolou a página — do contrário
    // o remapeamento das posições no meio de um scrub causa um salto visível.
    document.fonts?.ready?.then(() => {
      if (window.scrollY < 40) ScrollTrigger.refresh()
    })
  }, [loaded])

  const stopSound = () => {
    zoneTriggers.current.forEach((trigger) => trigger.kill())
    zoneTriggers.current = []
    soundscape.current?.stop()
    audio.current?.close()
    audio.current = null
    soundscape.current = null
  }

  useEffect(() => () => stopSound(), [])

  const toggleSound = () => {
    if (soundOn) {
      stopSound()
      setSoundOn(false)
      return
    }

    const AudioContext = window.AudioContext || window.webkitAudioContext
    if (!AudioContext) return
    const ctx = new AudioContext()
    const engine = createSoundscape(ctx)
    audio.current = ctx
    soundscape.current = engine

    const centerY = window.innerHeight / 2
    const current = SOUND_ZONES.find((id) => {
      const el = document.getElementById(id)
      if (!el) return false
      const rect = el.getBoundingClientRect()
      return rect.top <= centerY && rect.bottom >= centerY
    }) || 'top'
    setActiveZone(current)
    engine.setZone(current)

    zoneTriggers.current = SOUND_ZONES.map((id) => ScrollTrigger.create({
      trigger: `#${id}`,
      start: 'top center',
      end: 'bottom center',
      onToggle: (self) => {
        if (!self.isActive) return
        setActiveZone(id)
        engine.setZone(id)
      },
    }))

    setSoundOn(true)
  }

  return (
    <>
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}
      <FlightNav
        progressRef={navProgress}
        soundOn={soundOn}
        soundLabel={soundOn ? SOUND_LABELS[activeZone] : 'ouvir a viagem'}
        toggleSound={toggleSound}
      />
      <main>
        <AirplaneIntro reducedMotion={reducedMotion} />
        <RouteBriefing reducedMotion={reducedMotion} />
        <DestinationStory item={destinations[0]} index={0} reducedMotion={reducedMotion} />
        <StoryTransition
          number="2"
          kicker="A rota continua"
          lines={['Você começou entre as árvores.', 'Agora, olhe por cima delas.']}
          icon={Mountain}
          reducedMotion={reducedMotion}
        />
        <DestinationStory item={destinations[1]} index={1} reducedMotion={reducedMotion} />
        <StoryTransition
          number="3"
          kicker="Mude o ponto de vista"
          lines={['Você viu a serra lá do alto.', 'Agora, sente perto da janela.']}
          icon={TrainFront}
          reducedMotion={reducedMotion}
        />
        <DestinationStory item={destinations[2]} index={2} reducedMotion={reducedMotion} />
        <MemoryStrip reducedMotion={reducedMotion} />
        <BoardingPass onOpen={() => setModalOpen(true)} reducedMotion={reducedMotion} />
      </main>
      <footer>
        <a className="footer-brand" href="#top" aria-label="Radar Viagem e Turismo — voltar ao início"><RadarLogo variant="full" /></a>
        <p>Uma experiência de <strong>Radar Viagem e Turismo.</strong><br />Viaje para sair do automático. <span>•</span> Campos do Jordão, SP.</p>
        <a href="#top">Voltar à serra <ArrowDown size={14} className="arrow-up" /></a>
      </footer>
      <PlannerModal open={modalOpen} onClose={() => setModalOpen(false)} />
      <WhatsAppFloat reducedMotion={reducedMotion} />
    </>
  )
}

export default App
