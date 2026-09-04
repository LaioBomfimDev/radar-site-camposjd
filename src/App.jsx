import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import {
  ArrowDown,
  ArrowRight,
  Check,
  ChevronDown,
  CirclePause,
  CirclePlay,
  Clock3,
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

gsap.registerPlugin(ScrollTrigger)

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
    duration: 'meio dia',
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
    duration: '1–2 horas',
    accent: '#ffb45e',
    description:
      'O teleférico deixa Capivari para trás. Os telhados diminuem, a paisagem se abre e Campos do Jordão muda diante dos olhos.',
    facts: [
      ['Aproveite a subida', 'Parte da melhor vista acontece no caminho.'],
      ['Fique mais um pouco', 'Explore o alto antes de pensar na descida.'],
      ['Olhe longe', 'Com céu aberto, a Mantiqueira parece não terminar.'],
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
    title: 'Passeio\nsobre trilhos',
    short: 'Passeio sobre trilhos',
    headline: 'Tem caminhos melhores quando demoram.',
    image: '/media/trem.webp',
    alt: 'Trem da Estrada de Ferro Campos do Jordão cruzando a serra',
    icon: TrainFront,
    duration: '2 horas',
    accent: '#ffd857',
    description:
      'O trem acompanha a montanha e a paisagem muda sem pedir nada além de presença. Aqui, o caminho é o próprio passeio.',
    facts: [
      ['Fique na janela', 'É dali que a Mantiqueira conta a história.'],
      ['Esqueça a pressa', 'O melhor acontece entre a partida e a chegada.'],
      ['Faça a foto. Depois olhe.', 'Algumas curvas ficam melhores só na memória.'],
    ],
    cta: 'Quero seguir sobre trilhos',
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

function FlightNav({ progress, soundOn, toggleSound }) {
  return (
    <header className="flight-nav" aria-label="Navegação principal">
      <a className="brand" href="#top" aria-label="Radar Viagem e Turismo — início">
        <span className="brand-orbit"><Plane size={13} fill="currentColor" /></span>
        <RadarLogo variant="wordmark" className="nav-radar-logo" eager decorative />
      </a>
      <div className="nav-actions">
        <button className="sound-button" onClick={toggleSound} aria-pressed={soundOn} aria-label={soundOn ? 'Desligar som ambiente' : 'Ligar som ambiente'}>
          {soundOn ? <CirclePause size={16} /> : <CirclePlay size={16} />}
          <span>{soundOn ? 'serra ligada' : 'ouvir a serra'}</span>
        </button>
        <a className="route-button" href="#roteiro">Ver roteiro <ArrowRight size={15} /></a>
      </div>
      <div className="nav-progress" style={{ '--progress': progress }} />
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
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
      })
      tl.to('.boarding-copy', { y: 45, opacity: 0, duration: 0.42, ease: 'power2.in' }, 0)
        .to('.sky-window', { width: '100vw', height: '100svh', borderRadius: 0, duration: 2, ease: 'power2.inOut' }, 0)
        .to('.cabin-shell', { opacity: 0, scale: 1.1, duration: 0.65 }, 0.75)
        .to('.window-glint', { xPercent: 190, duration: 1.8 }, 0)
        .fromTo('.flight-hero-copy', { y: 90, opacity: 0 }, { y: 0, opacity: 1, duration: 0.75 }, 1.15)
        .fromTo('.hero-word', { yPercent: 110 }, { yPercent: 0, stagger: 0.12, duration: 0.9, ease: 'power4.out' }, 1.1)
        .to('.wing', { xPercent: 7, yPercent: -6, rotate: -2, duration: 2 }, 0)
        .to('.altitude-value', { innerText: 1628, snap: { innerText: 1 }, duration: 2 }, 0)
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
            poster="/media/sky-poster.webp"
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Nuvens vistas pela janela de um avião"
          >
            <source src="/media/clouds.webm" type="video/webm" />
            <source src="https://upload.wikimedia.org/wikipedia/commons/5/54/Clouds_Time_Lapse.webm" type="video/webm" />
          </video>
          <div className="sky-color" />
          <svg className="wing" viewBox="0 0 820 250" aria-hidden="true">
            <path d="M38 188C193 161 335 142 466 127L711 33c20-8 32-3 38 9l-116 101 145 16c19 2 21 18 3 24l-187 17-97 31-31-19-302 24Z" />
            <path className="wing-line" d="M112 190 511 145l196-83M493 146l90 49" />
          </svg>
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
              <div className="altimeter"><span>ALTITUDE</span><strong className="altitude-value">0</strong><small>m</small></div>
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
          <span className="boarding-chip"><span className="status-dot" /> PRÓXIMA PARADA · MANTIQUEIRA</span>
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
        scrollTrigger: { trigger: root.current, start: 'top 72%', end: 'center 48%', scrub: 1 },
      })
      gsap.from('.route-stop', {
        y: 35,
        opacity: 0,
        stagger: 0.18,
        scrollTrigger: { trigger: root.current, start: 'top 68%' },
      })
      gsap.to('.route-plane', {
        left: '88%',
        rotate: 18,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top 72%', end: 'bottom 35%', scrub: 1 },
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

function TiltCard({ children, className = '' }) {
  const card = useRef(null)

  const move = (event) => {
    if (!card.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const rect = card.current.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5
    gsap.to(card.current, {
      rotateY: x * 9,
      rotateX: y * -9,
      transformPerspective: 900,
      duration: 0.45,
      ease: 'power2.out',
      '--mx': `${(x + 0.5) * 100}%`,
      '--my': `${(y + 0.5) * 100}%`,
    })
  }

  const reset = () => gsap.to(card.current, { rotateX: 0, rotateY: 0, duration: 0.7, ease: 'elastic.out(1, .55)' })

  return <div className={`tilt-card ${className}`} ref={card} onPointerMove={move} onPointerLeave={reset}>{children}</div>
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
        gsap.fromTo('.gondola', { xPercent: -95, yPercent: 100 }, {
          xPercent: 95,
          yPercent: -80,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
        })
      }
      if (index === 2) {
        gsap.fromTo('.mini-train', { xPercent: -140 }, {
          xPercent: 130,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
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
            <div className="cable-line" />
            <div className="gondola"><span /><i /><b /></div>
          </div>
        )}
        {index === 2 && (
          <div className="train-scene" aria-hidden="true">
            <div className="track-lines"><i /><i /></div>
            <div className="mini-train"><TrainFront size={28} /><span /><span /></div>
          </div>
        )}

        <TiltCard className="info-card">
          <div className="card-topline">
            <span><Clock3 size={14} /> {item.duration}</span>
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
          <a className="chapter-cta" href="#embarque">{item.cta}<ArrowRight size={14} /></a>
          <span className="card-glow" />
        </TiltCard>

        <div className="swipe-hint"><span>TOQUE NOS PONTOS</span><i /></div>
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
        scrollTrigger: { trigger: root.current, start: 'top 68%', end: 'center 54%', scrub: 0.7 },
      })
      gsap.from('.transition-rule-fill', {
        scaleX: 0,
        transformOrigin: 'left center',
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top 75%', end: 'bottom 35%', scrub: 1 },
      })
      gsap.fromTo('.transition-orb', { x: 0, rotate: -18 }, {
        x: () => Math.max(0, root.current.clientWidth - 72),
        rotate: 18,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: 1, invalidateOnRefresh: true },
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

function BoardingPass({ onOpen }) {
  const pass = useRef(null)

  const move = (event) => {
    if (!pass.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const rect = pass.current.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5
    gsap.to(pass.current, { rotateY: x * 7, rotateX: -y * 7, duration: 0.5, ease: 'power2.out' })
  }

  return (
    <section className="boarding" id="embarque">
      <div className="boarding-aura" />
      <div className="section-label light"><span>04</span> AGORA É COM VOCÊ</div>
      <div className="boarding-heading">
        <span>Escolha como viver a serra.</span>
        <h2>Campos do Jordão<br /><em>já está no radar.</em></h2>
      </div>
      <div className="pass-perspective" onPointerMove={move} onPointerLeave={() => gsap.to(pass.current, { rotateX: 0, rotateY: 0, duration: 0.8, ease: 'elastic.out(1,.55)' })}>
        <article className="boarding-pass" ref={pass}>
          <div className="pass-main">
            <div className="pass-brand"><RadarLogo variant="wordmark" decorative /><small>CARTÃO DE VIAGEM</small></div>
            <div className="pass-destination">
              <div><small>DESTINO</small><strong>Campos do Jordão</strong><span>São Paulo</span></div>
              <b>CJO</b>
            </div>
            <div className="pass-radar-list">
              <small>NO SEU RADAR</small>
              {destinations.map((item) => <span key={item.id}><i>{item.number}</i>{item.short}</span>)}
            </div>
            <div className="pass-data">
              <span><small>RITMO</small><b>SEM PRESSA</b></span>
              <span><small>PARADAS</small><b>03</b></span>
              <span><small>STATUS</small><b className="confirmed"><i /> NO RADAR</b></span>
            </div>
          </div>
          <div className="pass-stub">
            <div className="barcode" aria-hidden="true" />
            <strong>CJO</strong><span>22°44' S</span>
          </div>
        </article>
      </div>
      <button className="magnetic-cta" onClick={onOpen}>
        <span>Montar meu roteiro</span><span className="cta-icon"><ArrowRight size={20} /></span>
      </button>
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
                    <span><strong>{item.short}</strong><small>{item.choice}</small><em>{item.duration}</em></span>
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
            <button className="modal-submit" onClick={onClose}>Ver meu roteiro <ArrowRight size={18} /></button>
          </div>
        )}
      </div>
    </div>
  )
}

function App() {
  const [loaded, setLoaded] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [soundOn, setSoundOn] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const audio = useRef(null)
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(max > 0 ? window.scrollY / max : 0)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  useEffect(() => {
    if (!loaded) return
    document.body.classList.add('ready')
    ScrollTrigger.refresh()
  }, [loaded])

  useEffect(() => () => {
    if (audio.current) audio.current.close()
  }, [])

  const toggleSound = () => {
    if (soundOn) {
      audio.current?.close()
      audio.current = null
      setSoundOn(false)
      return
    }

    const AudioContext = window.AudioContext || window.webkitAudioContext
    if (!AudioContext) return
    const ctx = new AudioContext()
    const gain = ctx.createGain()
    const filter = ctx.createBiquadFilter()
    const osc1 = ctx.createOscillator()
    const osc2 = ctx.createOscillator()
    osc1.type = 'sine'
    osc2.type = 'triangle'
    osc1.frequency.value = 54
    osc2.frequency.value = 82
    filter.type = 'lowpass'
    filter.frequency.value = 180
    gain.gain.value = 0.018
    osc1.connect(filter)
    osc2.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)
    osc1.start()
    osc2.start()
    audio.current = ctx
    setSoundOn(true)
  }

  return (
    <>
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}
      <FlightNav progress={scrollProgress} soundOn={soundOn} toggleSound={toggleSound} />
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
        <BoardingPass onOpen={() => setModalOpen(true)} />
      </main>
      <footer>
        <a className="footer-brand" href="#top" aria-label="Radar Viagem e Turismo — voltar ao início"><RadarLogo variant="full" /></a>
        <p>Uma experiência de <strong>Radar Viagem e Turismo.</strong><br />Viaje para sair do automático. <span>•</span> Campos do Jordão, SP.</p>
        <a href="#top">Voltar à serra <ArrowDown size={14} className="arrow-up" /></a>
      </footer>
      <PlannerModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}

export default App
