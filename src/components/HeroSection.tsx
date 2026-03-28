import { useRef, useEffect, useLayoutEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import RevealText from './RevealText'
import ShineButton from './ShineButton'

gsap.registerPlugin(ScrollTrigger)

const heroImage = '/hero-image.png'

/* ─── Animated counter ─── */

function AnimatedCounter({ value, suffix = '' }: { value: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const numericPart = parseFloat(value.replace(/[^0-9.]/g, ''))
    if (isNaN(numericPart)) {
      el.textContent = value
      return
    }

    const isFloat = value.includes('.')
    const obj = { val: 0 }
    gsap.to(obj, {
      val: numericPart,
      duration: 2,
      delay: 2.4,
      ease: 'power2.out',
      onUpdate: () => {
        const prefix = value.startsWith('<') ? '<' : ''
        const display = isFloat ? obj.val.toFixed(1) : Math.round(obj.val).toString()
        el.textContent = `${prefix}${display}${suffix}`
      },
    })
  }, [value, suffix])

  return <span ref={ref}>0</span>
}

/* ─── Floating particles ─── */

function FloatingParticles() {
  const containerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const container = containerRef.current
    if (!container) return

    const particles = container.querySelectorAll('.particle')
    particles.forEach((p) => {
      const el = p as HTMLElement
      gsap.set(el, {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
      })

      gsap.to(el, {
        y: `-=${80 + Math.random() * 120}`,
        x: `+=${(Math.random() - 0.5) * 100}`,
        opacity: 0,
        duration: 3 + Math.random() * 4,
        repeat: -1,
        delay: Math.random() * 3,
        ease: 'none',
        onRepeat: () => {
          gsap.set(el, {
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 20,
            opacity: Math.random() * 0.3 + 0.1,
          })
        },
      })
    })
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="particle absolute w-1 h-1 rounded-full"
          style={{
            backgroundColor:
              i % 3 === 0
                ? 'rgba(255,77,0,0.4)'
                : 'rgba(245,245,247,0.15)',
          }}
        />
      ))}
    </div>
  )
}

/* ─── Marquee ─── */

function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const track = trackRef.current
    if (!track) return

    const items = track.querySelectorAll('.marquee-set')
    gsap.to(items, {
      xPercent: -100,
      duration: 25,
      ease: 'none',
      repeat: -1,
    })
  }, [])

  const words = ['DURGER KING', '●', 'GOURMET FAST FOOD', '●', 'TELEGRAM MINI APP', '●', 'ORDER NOW', '●']

  return (
    <div className="absolute bottom-0 left-0 right-0 overflow-hidden border-t border-white/[0.04] bg-obsidian/50 backdrop-blur-sm z-20">
      <div ref={trackRef} className="flex whitespace-nowrap py-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="marquee-set flex-shrink-0 flex items-center gap-4 px-4">
            {words.map((word, wi) => (
              <span
                key={`${i}-${wi}`}
                className={`text-[0.65rem] font-medium tracking-[0.3em] uppercase ${
                  word === '●' ? 'text-flame text-xs' : 'text-cream-muted/50'
                }`}
              >
                {word}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Deconstructed Burger with ScrollTrigger + Mouse Parallax ─── */

function DeconstructedBurger() {
  const containerRef = useRef<HTMLDivElement>(null)
  const topRef = useRef<HTMLDivElement>(null)
  const midRef = useRef<HTMLDivElement>(null)
  const botRef = useRef<HTMLDivElement>(null)
  const lightRef = useRef<HTMLDivElement>(null)
  const light2Ref = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  // GSAP entrance + scroll deconstruction
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance: each layer slides in from different offsets
      gsap.fromTo(
        topRef.current,
        { y: -80, opacity: 0, scale: 0.85 },
        { y: 0, opacity: 1, scale: 1, duration: 1.2, delay: 0.4, ease: 'expo.out' }
      )
      gsap.fromTo(
        midRef.current,
        { y: 60, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 1.2, delay: 0.55, ease: 'expo.out' }
      )
      gsap.fromTo(
        botRef.current,
        { y: 100, opacity: 0, scale: 0.85 },
        { y: 0, opacity: 1, scale: 1, duration: 1.2, delay: 0.7, ease: 'expo.out' }
      )

      // Light leaks entrance
      gsap.fromTo(
        lightRef.current,
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 2, delay: 0.5, ease: 'power2.out' }
      )
      gsap.fromTo(
        light2Ref.current,
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 2, delay: 0.8, ease: 'power2.out' }
      )

      // ScrollTrigger: deconstruct on scroll
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2,
        onUpdate: (self) => {
          const p = self.progress
          gsap.set(topRef.current, { y: p * -50 })
          gsap.set(midRef.current, { y: p * 10 })
          gsap.set(botRef.current, { y: p * 30 })
          // Light leak drifts down on scroll
          gsap.set(lightRef.current, { y: p * 60, x: p * 30 })
          gsap.set(light2Ref.current, { y: p * -40, x: p * -20 })
        },
      })

      // Drifting light leak ambient animation
      gsap.to(lightRef.current, {
        x: 40,
        y: -30,
        duration: 6,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })
      gsap.to(light2Ref.current, {
        x: -30,
        y: 25,
        duration: 8,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 2,
      })

      // Floating bob
      gsap.to(wrapperRef.current, {
        y: -14,
        duration: 2.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  // Mouse-driven 3D rotation
  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    // Only on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    const onMouseMove = (e: MouseEvent) => {
      const rect = wrapper.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      // Normalized -1 to 1
      const nx = (e.clientX - centerX) / (window.innerWidth / 2)
      const ny = (e.clientY - centerY) / (window.innerHeight / 2)

      gsap.to(wrapper, {
        rotateY: nx * 12,
        rotateX: ny * -8,
        duration: 0.8,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    }

    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  // Each layer clips a horizontal band of the same image
  // Top bun: 0–32%, Mid: 28–68%, Bot: 64–100%  (overlapping edges for seamless look)
  const layerStyle = (top: string, bottom: string): React.CSSProperties => ({
    clipPath: `inset(${top} 0 ${bottom} 0)`,
    position: 'absolute' as const,
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'contain' as const,
  })

  return (
    <div ref={containerRef} className="relative w-full h-full flex items-center justify-center" style={{ perspective: '1200px' }}>
      {/* Light leak 1 — warm orange, drifts behind burger */}
      <div
        ref={lightRef}
        className="absolute w-[70%] aspect-square rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,77,0,0.20) 0%, rgba(255,77,0,0.06) 40%, transparent 65%)',
          filter: 'blur(60px)',
          top: '10%',
          left: '15%',
        }}
      />

      {/* Light leak 2 — secondary warm glow */}
      <div
        ref={light2Ref}
        className="absolute w-[50%] aspect-square rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,120,40,0.15) 0%, rgba(255,77,0,0.03) 50%, transparent 65%)',
          filter: 'blur(50px)',
          bottom: '15%',
          right: '10%',
        }}
      />

      {/* 3D wrapper — receives mouse rotation */}
      <div
        ref={wrapperRef}
        className="relative z-10 w-full max-w-[520px]"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Aspect container for the image layers */}
        <div className="relative w-full" style={{ paddingBottom: '130%' }}>
          {/* Top bun layer */}
          <div ref={topRef} className="absolute inset-0 will-change-transform">
            <img
              src={heroImage}
              alt=""
              style={layerStyle('0%', '68%')}
              draggable={false}
            />
          </div>

          {/* Middle fillings layer */}
          <div ref={midRef} className="absolute inset-0 will-change-transform">
            <img
              src={heroImage}
              alt=""
              style={layerStyle('28%', '32%')}
              draggable={false}
            />
          </div>

          {/* Bottom bun layer */}
          <div ref={botRef} className="absolute inset-0 will-change-transform">
            <img
              src={heroImage}
              alt="Durger King premium burger"
              style={layerStyle('64%', '0%')}
              draggable={false}
            />
          </div>
        </div>
      </div>

      {/* Bottom reflection */}
      <div
        className="absolute bottom-[5%] left-1/2 -translate-x-1/2 w-[40%] h-8 rounded-full"
        style={{
          background: 'radial-gradient(ellipse, rgba(255,77,0,0.08) 0%, transparent 70%)',
          filter: 'blur(15px)',
        }}
      />
    </div>
  )
}

/* ─── Hero Section ─── */

export default function HeroSection() {
  return (
    <section className="relative h-screen flex flex-col overflow-hidden">
      <FloatingParticles />

      {/* Grid lines */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute left-1/4 top-0 bottom-0 w-[1px] bg-white/[0.02]" />
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/[0.02]" />
        <div className="absolute left-3/4 top-0 bottom-0 w-[1px] bg-white/[0.02]" />
      </div>

      {/* Main grid */}
      <div className="relative z-10 flex-1 w-full max-w-[1400px] mx-auto
                      px-8 sm:px-12 md:px-16 lg:px-24
                      grid grid-cols-1 lg:grid-cols-[1fr_1fr] items-center
                      pt-16 pb-24 lg:pt-0 lg:pb-16">

        {/* Left: Text */}
        <div className="flex flex-col order-2 lg:order-1">
          <motion.div
            className="flex items-center gap-4 mb-5"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="h-[1px] bg-flame"
              initial={{ width: 0 }}
              animate={{ width: 40 }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />
            <p className="text-caption text-flame tracking-[0.2em]">
              Premium Telegram Mini App
            </p>
          </motion.div>

          <h1 className="text-h1 text-cream leading-[0.95] mb-5">
            <RevealText text="Gourmet at" delay={0.4} />
            <br />
            <RevealText text="your fingertips." delay={0.7} />
            <br />
            <span className="text-flame">
              <RevealText text="The King" delay={1.0} />
            </span>
            {' '}
            <RevealText text="of your" delay={1.15} />
            <br />
            <RevealText text="Contacts." delay={1.3} />
          </h1>

          <motion.p
            className="text-body text-cream-muted max-w-md mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            A culinary experience delivered through Telegram.
            Obsessively crafted, impossibly fast.
          </motion.p>

          <motion.div
            className="flex items-center gap-8 flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <ShineButton>
              Order Now
              <ArrowRight size={18} strokeWidth={2.5} />
            </ShineButton>

            <div className="hidden sm:block w-[1px] h-10 bg-white/[0.08]" />

            <div className="flex items-center gap-6">
              {[
                { value: '10', suffix: 'K+', label: 'Users' },
                { value: '4.9', suffix: '', label: 'Rating' },
                { value: '<2', suffix: 'm', label: 'Delivery' },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col items-center">
                  <span className="text-lg font-bold text-cream tabular-nums leading-none">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </span>
                  <span className="text-[0.55rem] uppercase tracking-[0.12em] text-cream-muted mt-1">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right: Deconstructed Burger */}
        <div className="relative order-1 lg:order-2 h-[40vh] lg:h-full flex items-center justify-center">
          <DeconstructedBurger />

          {/* Orbiting ring */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              className="w-[80%] aspect-square rounded-full border border-white/[0.03]"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, ease: 'linear', repeat: Infinity }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-flame/30" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-cream/10" />
            </motion.div>
          </div>

          {/* Counter-rotating dashed ring */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              className="w-[55%] aspect-square rounded-full border border-dashed border-white/[0.03]"
              animate={{ rotate: -360 }}
              transition={{ duration: 20, ease: 'linear', repeat: Infinity }}
            >
              <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-flame/20" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-14 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.6 }}
      >
        <span className="text-[0.55rem] uppercase tracking-[0.3em] text-cream-muted">
          Scroll
        </span>
        <motion.div
          className="w-[1px] h-5 bg-gradient-to-b from-flame/60 to-transparent"
          animate={{ scaleY: [0, 1, 0], originY: 0 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      <Marquee />
    </section>
  )
}
