import { useRef, useLayoutEffect, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ─── Food items ─── */

const foods = [
  { name: 'Taco', image: '/taco.png' },
  { name: 'Pizza', image: '/pizza.png' },
  { name: 'Burger', image: '/hero-image.png' },
  { name: 'Flan', image: '/desert.png' },
]

/* ─── Preload images ─── */

function usePreload() {
  useEffect(() => {
    foods.forEach((f) => {
      const img = new Image()
      img.src = f.image
    })
  }, [])
}

/* ─── GSAP quickSetter cursor-follow image ─── */

function CursorImage() {
  const elRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const setX = useRef<ReturnType<typeof gsap.quickSetter> | null>(null)
  const setY = useRef<ReturnType<typeof gsap.quickSetter> | null>(null)
  const currentFood = useRef<string | null>(null)

  useLayoutEffect(() => {
    const el = elRef.current
    if (!el) return

    setX.current = gsap.quickSetter(el, 'x', 'px')
    setY.current = gsap.quickSetter(el, 'y', 'px')

    gsap.set(el, { xPercent: -50, yPercent: -80 })
  }, [])

  // Expose methods via a global so marquee items can call them
  useEffect(() => {
    const el = elRef.current
    const img = imgRef.current
    if (!el || !img) return

    const onMouseMove = (e: MouseEvent) => {
      if (!currentFood.current) return
      setX.current?.(e.clientX)
      setY.current?.(e.clientY)
    }

    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  const show = useCallback((name: string, e: React.MouseEvent) => {
    const el = elRef.current
    const img = imgRef.current
    if (!el || !img) return

    const food = foods.find((f) => f.name === name)
    if (!food) return

    currentFood.current = name
    img.src = food.image
    img.alt = food.name

    setX.current?.(e.clientX)
    setY.current?.(e.clientY)

    gsap.to(el, {
      opacity: 1,
      scale: 1,
      rotation: 0,
      duration: 0.35,
      ease: 'back.out(1.4)',
      overwrite: true,
    })
  }, [])

  const hide = useCallback(() => {
    const el = elRef.current
    if (!el) return

    currentFood.current = null
    gsap.to(el, {
      opacity: 0,
      scale: 0.5,
      rotation: 12,
      duration: 0.25,
      ease: 'power2.in',
      overwrite: true,
    })
  }, [])

  return { show, hide, elRef, imgRef }
}

/* ─── Marquee Row ─── */

function MarqueeRow({
  direction,
  cursor,
  sectionRef,
}: {
  direction: 'left' | 'right'
  cursor: { show: (name: string, e: React.MouseEvent) => void; hide: () => void }
  sectionRef: React.RefObject<HTMLElement | null>
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const tweenRef = useRef<gsap.core.Tween | null>(null)

  useLayoutEffect(() => {
    const track = trackRef.current
    if (!track) return

    const sets = track.querySelectorAll('.mq-set')

    const ctx = gsap.context(() => {
      const tween = gsap.fromTo(
        sets,
        { xPercent: direction === 'right' ? -100 : 0 },
        {
          xPercent: direction === 'left' ? -100 : 0,
          duration: 30,
          ease: 'none',
          repeat: -1,
        }
      )
      tweenRef.current = tween

      // Scroll-velocity-driven timeScale
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const velocity = Math.abs(self.getVelocity())
          // Base speed 1, max boost ~3x
          const boost = 1 + Math.min(velocity / 1000, 2)
          gsap.to(tween, {
            timeScale: boost,
            duration: 0.3,
            ease: 'power2.out',
            overwrite: true,
          })
        },
        onLeave: () => {
          if (tweenRef.current) {
            gsap.to(tweenRef.current, { timeScale: 1, duration: 0.8 })
          }
        },
        onLeaveBack: () => {
          if (tweenRef.current) {
            gsap.to(tweenRef.current, { timeScale: 1, duration: 0.8 })
          }
        },
      })
    }, track)

    return () => ctx.revert()
  }, [direction, sectionRef])

  return (
    <div ref={trackRef} className="flex overflow-hidden whitespace-nowrap">
      {[0, 1, 2].map((setIdx) => (
        <div key={setIdx} className="mq-set flex-shrink-0 flex items-center">
          {foods.map((food, i) => (
            <span
              key={`${setIdx}-${i}`}
              className="marquee-item group inline-flex items-center gap-6 sm:gap-8 px-6 sm:px-10 py-6 cursor-none"
              onMouseEnter={(e) => cursor.show(food.name, e)}
              onMouseLeave={cursor.hide}
              data-magnetic
            >
              {/* Stroked text → fills on hover */}
              <span className="menu-text relative inline-block select-none">
                {/* Stroke layer (always visible) */}
                <span
                  className="text-[clamp(3.5rem,7vw,7rem)] font-black tracking-tighter uppercase
                             text-transparent transition-opacity duration-500 group-hover:opacity-0"
                  style={{
                    WebkitTextStroke: '1.5px rgba(245,245,247,0.1)',
                  }}
                >
                  {food.name}
                </span>

                {/* Fill layer (appears on hover) */}
                <span
                  className="absolute inset-0 text-[clamp(3.5rem,7vw,7rem)] font-black tracking-tighter uppercase
                             opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    backgroundImage: 'linear-gradient(135deg, #FF4D00 0%, #FF8040 50%, #FF4D00 100%)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                    filter: 'drop-shadow(0 0 30px rgba(255,77,0,0.3))',
                  }}
                >
                  {food.name}
                </span>
              </span>

              {/* Separator dot */}
              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0 transition-all duration-500
                             bg-white/[0.06] group-hover:bg-flame group-hover:shadow-[0_0_12px_rgba(255,77,0,0.4)]" />
            </span>
          ))}
        </div>
      ))}
    </div>
  )
}

/* ─── Background Stroked Text ─── */

function BackgroundText() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none">
      <span
        className="text-[clamp(8rem,22vw,26rem)] font-black tracking-tighter uppercase leading-none whitespace-nowrap"
        style={{
          color: 'transparent',
          WebkitTextStroke: '1px rgba(255,255,255,0.03)',
        }}
      >
        BURGER
      </span>
    </div>
  )
}

/* ─── Menu Highlight Section ─── */

export default function MenuHighlight() {
  usePreload()

  const sectionRef = useRef<HTMLElement>(null)
  const cursor = CursorImage()

  return (
    <section ref={sectionRef} className="relative py-28 sm:py-36 overflow-hidden">
      {/* Giant background text */}
      <BackgroundText />

      {/* Header */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-8 sm:px-12 md:px-16 lg:px-24 mb-16">
        <motion.div
          className="flex items-center gap-4 mb-3"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="h-[1px] w-10 bg-flame" />
          <p className="text-caption text-flame tracking-[0.2em]">The Menu</p>
        </motion.div>
        <motion.h2
          className="text-h2 text-cream"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          Hover to <span className="text-flame">explore.</span>
        </motion.h2>
      </div>

      {/* Marquee rows */}
      <div className="relative z-10 space-y-1">
        <MarqueeRow direction="left" cursor={cursor} sectionRef={sectionRef} />
        <MarqueeRow direction="right" cursor={cursor} sectionRef={sectionRef} />
      </div>

      {/* GSAP quickSetter cursor image element */}
      <div
        ref={cursor.elRef}
        className="fixed top-0 left-0 pointer-events-none z-[200] opacity-0"
        style={{ willChange: 'transform' }}
      >
        <img
          ref={cursor.imgRef}
          src=""
          alt=""
          className="w-44 h-44 object-contain"
          style={{
            filter:
              'drop-shadow(0 25px 50px rgba(0,0,0,0.5)) drop-shadow(0 0 40px rgba(255,77,0,0.2))',
          }}
        />
      </div>

      {/* Edge fades */}
      <div className="absolute top-0 bottom-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-obsidian to-transparent pointer-events-none z-20" />
      <div className="absolute top-0 bottom-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-obsidian to-transparent pointer-events-none z-20" />
    </section>
  )
}
