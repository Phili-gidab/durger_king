import { useRef, useState, useLayoutEffect, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MousePointerClick, MessageCircle, UtensilsCrossed, CreditCard } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ─── Steps ─── */

const steps = [
  {
    number: '01',
    title: 'Start the Bot',
    description: 'Open Durger King in Telegram. No downloads, no sign-ups — just tap and go.',
    icon: MessageCircle,
    image: '/screen-1.png',
  },
  {
    number: '02',
    title: 'Choose Your Meal',
    description: 'Browse the menu, customize your order, add to cart in seconds.',
    icon: UtensilsCrossed,
    image: '/screen-2.png',
  },
  {
    number: '03',
    title: 'Pay & Receive',
    description: 'Checkout with Telegram\'s native payments. Confirmed instantly.',
    icon: CreditCard,
    image: '/screen-3.png',
    showHandCursor: true,
  },
]

/* ─── Preload ─── */

function usePreloadImages() {
  useEffect(() => {
    steps.forEach((s) => {
      const img = new Image()
      img.src = s.image
    })
  }, [])
}

/* ─── Screen transition variants: slide-up in, shrink-fade out ─── */

const screenVariants = {
  enter: {
    y: '100%',
    scale: 1,
    opacity: 0.5,
  },
  center: {
    y: 0,
    scale: 1,
    opacity: 1,
    transition: {
      y: { duration: 0.5, ease: [0.32, 0.72, 0, 1] },
      opacity: { duration: 0.3 },
    },
  },
  exit: {
    y: 0,
    scale: 0.85,
    opacity: 0,
    transition: {
      scale: { duration: 0.4, ease: [0.32, 0.72, 0, 1] },
      opacity: { duration: 0.3 },
    },
  },
}

/* ─── Phone Frame with 3D tilt + interface glow ─── */

function PhoneFrame({
  activeIndex,
  phoneRef,
}: {
  activeIndex: number
  phoneRef: React.RefObject<HTMLDivElement | null>
}) {
  return (
    <div
      ref={phoneRef}
      className="relative mx-auto will-change-transform"
      style={{
        width: 'min(360px, 28vw)',
        maxHeight: '75vh',
        perspective: '1200px',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Bezel */}
      <div
        className="phone-bezel relative rounded-[2.6rem] p-[5px]"
        style={{
          background: 'linear-gradient(145deg, #2a2a2a 0%, #1a1a1a 50%, #111 100%)',
          boxShadow: `
            0 0 0 1px rgba(255,255,255,0.06),
            0 30px 80px -10px rgba(0,0,0,0.6),
            0 0 60px -10px rgba(255,77,0,0.06),
            inset 0 1px 0 rgba(255,255,255,0.04)
          `,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Side buttons */}
        <div className="absolute -left-[2.5px] top-[22%] w-[2.5px] h-6 bg-[#2a2a2a] rounded-l-sm" />
        <div className="absolute -left-[2.5px] top-[32%] w-[2.5px] h-10 bg-[#2a2a2a] rounded-l-sm" />
        <div className="absolute -left-[2.5px] top-[40%] w-[2.5px] h-10 bg-[#2a2a2a] rounded-l-sm" />
        <div className="absolute -right-[2.5px] top-[30%] w-[2.5px] h-12 bg-[#2a2a2a] rounded-r-sm" />

        {/* Screen */}
        <div className="relative rounded-[2.2rem] overflow-hidden bg-white aspect-[9/16.2]">
          {/* Dynamic Island */}
          <div className="absolute top-[6px] left-1/2 -translate-x-1/2 w-[28%] h-[4%] bg-black rounded-full z-30">
            <div className="absolute right-[22%] top-1/2 -translate-y-1/2 w-[9px] h-[9px] rounded-full bg-[#0d0d20] ring-1 ring-[#222]" />
          </div>

          {/* Home bar */}
          <div className="absolute bottom-[4px] left-1/2 -translate-x-1/2 w-[28%] h-[3px] bg-black/20 rounded-full z-30" />

          {/* Screenshot — slide-up enter, shrink-fade exit */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeIndex}
              className="absolute inset-0 bg-white"
              variants={screenVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <img
                src={steps[activeIndex].image}
                alt={steps[activeIndex].title}
                className="w-full h-full object-contain bg-white"
              />
            </motion.div>
          </AnimatePresence>

          {/* Interface glow — pulsing highlights on buttons (screen 1) */}
          <AnimatePresence>
            {activeIndex === 0 && (
              <motion.div
                className="absolute inset-0 z-25 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                {/* Glow spots positioned over typical button areas on screen-1 */}
                {[
                  { top: '28%', left: '8%', w: '25%' },
                  { top: '28%', left: '37%', w: '25%' },
                  { top: '28%', left: '66%', w: '25%' },
                  { top: '45%', left: '8%', w: '25%' },
                  { top: '45%', left: '37%', w: '25%' },
                  { top: '45%', left: '66%', w: '25%' },
                ].map((pos, i) => (
                  <motion.div
                    key={i}
                    className="absolute h-[4%] rounded-full"
                    style={{
                      top: pos.top,
                      left: pos.left,
                      width: pos.w,
                      background: 'radial-gradient(ellipse, rgba(255,165,0,0.25) 0%, transparent 70%)',
                      filter: 'blur(4px)',
                    }}
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Interface glow — Pay button on screen 2 */}
          <AnimatePresence>
            {activeIndex === 1 && (
              <motion.div
                className="absolute inset-0 z-25 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="absolute rounded-full"
                  style={{
                    bottom: '2%',
                    left: '10%',
                    width: '80%',
                    height: '5%',
                    background: 'radial-gradient(ellipse, rgba(76,175,80,0.35) 0%, transparent 70%)',
                    filter: 'blur(6px)',
                  }}
                  animate={{ opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Interface glow — Pay button on screen 3 */}
          <AnimatePresence>
            {activeIndex === 2 && (
              <motion.div
                className="absolute inset-0 z-25 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="absolute rounded-full"
                  style={{
                    bottom: '4%',
                    right: '8%',
                    width: '35%',
                    height: '5%',
                    background: 'radial-gradient(ellipse, rgba(33,150,243,0.35) 0%, transparent 70%)',
                    filter: 'blur(6px)',
                  }}
                  animate={{ opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hand cursor on step 3 */}
          <AnimatePresence>
            {steps[activeIndex].showHandCursor && (
              <motion.div
                className="absolute z-40"
                style={{ bottom: '5%', right: '14%' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                <motion.div
                  animate={{
                    y: [0, -2, 5, -2, 0],
                    scale: [1, 0.9, 1.1, 0.9, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1.5,
                    ease: 'easeInOut',
                  }}
                >
                  <MousePointerClick
                    size={30}
                    className="text-flame"
                    strokeWidth={1.8}
                    style={{ filter: 'drop-shadow(0 4px 12px rgba(255,77,0,0.5))' }}
                  />
                </motion.div>
                <motion.div
                  className="absolute top-0.5 left-0.5 w-6 h-6 rounded-full border-2 border-flame/40"
                  animate={{ scale: [0.5, 3], opacity: [0.5, 0] }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 2.5, delay: 0.8 }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Glare */}
          <div
            className="absolute inset-0 z-20 pointer-events-none"
            style={{
              background: 'linear-gradient(125deg, rgba(255,255,255,0.06) 0%, transparent 40%)',
            }}
          />
        </div>
      </div>

      {/* Reflection */}
      <div
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[70%] h-16 rounded-full"
        style={{
          background: 'radial-gradient(ellipse, rgba(255,77,0,0.1) 0%, transparent 70%)',
          filter: 'blur(20px)',
        }}
      />
    </div>
  )
}

/* ─── Step Row ─── */

function StepRow({
  step,
  index,
  isActive,
  isPast,
  onClick,
}: {
  step: (typeof steps)[0]
  index: number
  isActive: boolean
  isPast: boolean
  onClick: () => void
}) {
  const Icon = step.icon

  return (
    <button
      onClick={onClick}
      data-magnetic
      className="group relative flex items-start gap-5 text-left w-full cursor-none"
    >
      {/* Timeline */}
      <div className="flex flex-col items-center flex-shrink-0">
        <motion.div
          className="relative w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden"
          animate={{
            backgroundColor: isActive ? 'rgba(255,77,0,0.12)' : isPast ? 'rgba(255,77,0,0.05)' : 'rgba(255,255,255,0.02)',
            borderColor: isActive ? 'rgba(255,77,0,0.5)' : isPast ? 'rgba(255,77,0,0.15)' : 'rgba(255,255,255,0.06)',
            scale: isActive ? 1.08 : 1,
          }}
          transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
          style={{ border: '1.5px solid' }}
        >
          <Icon
            size={20}
            style={{ color: isActive ? '#FF4D00' : isPast ? 'rgba(255,77,0,0.5)' : 'rgba(245,245,247,0.2)' }}
          />
          {isActive && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-flame/10 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            />
          )}
        </motion.div>

        {index < steps.length - 1 && (
          <div className="w-[2px] flex-1 min-h-10 bg-white/[0.04] mt-3 rounded-full overflow-hidden relative">
            <motion.div
              className="absolute top-0 left-0 w-full bg-flame rounded-full"
              animate={{ height: isPast || isActive ? '100%' : '0%' }}
              transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
            />
          </div>
        )}
      </div>

      {/* Text */}
      <div className="flex-1 pb-8">
        <motion.div
          className="rounded-xl px-5 py-4 -mx-1"
          animate={{ backgroundColor: isActive ? 'rgba(255,255,255,0.03)' : 'transparent' }}
          transition={{ duration: 0.4 }}
        >
          <motion.span
            className="text-[0.55rem] font-mono tracking-[0.3em] uppercase block mb-1.5"
            animate={{ color: isActive ? '#FF4D00' : 'rgba(245,245,247,0.25)' }}
          >
            Step {step.number}
          </motion.span>

          <motion.h3
            className="text-lg sm:text-xl font-semibold mb-1"
            animate={{ color: isActive ? '#F5F5F7' : isPast ? 'rgba(245,245,247,0.35)' : 'rgba(245,245,247,0.15)' }}
          >
            {step.title}
          </motion.h3>

          <motion.div
            className="overflow-hidden"
            animate={{ height: isActive ? 'auto' : 0, opacity: isActive ? 1 : 0 }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
          >
            <p className="text-sm text-cream-muted/60 leading-relaxed max-w-xs pt-1">
              {step.description}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </button>
  )
}

/* ─── Demo Section ─── */

export default function DemoSection() {
  usePreloadImages()

  const sectionRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const phoneRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const setStep = useCallback((i: number) => {
    setActiveIndex((prev) => (prev !== i ? i : prev))
  }, [])

  useLayoutEffect(() => {
    const el = pinRef.current
    const phone = phoneRef.current
    if (!el || !phone) return

    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        const stepTracker = { value: -1 }
        const bezel = phone.querySelector('.phone-bezel') as HTMLElement

        ScrollTrigger.create({
          trigger: el,
          start: 'top top',
          end: `+=${window.innerHeight * 1.2}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress

            // Step progression
            let step: number
            if (p < 0.3) step = 0
            else if (p < 0.65) step = 1
            else step = 2

            if (stepTracker.value !== step) {
              stepTracker.value = step
              setStep(step)
            }

            // 3D tilt on scroll — rotateX tilts forward, rotateY sways side to side
            if (bezel) {
              const tiltX = -5 + p * 10        // -5° to +5°
              const tiltY = Math.sin(p * Math.PI) * 8  // 0° → 8° → 0° (sine wave)
              const tiltZ = (p - 0.5) * -3      // subtle roll

              gsap.to(bezel, {
                rotateX: tiltX,
                rotateY: tiltY,
                rotateZ: tiltZ,
                duration: 0.4,
                ease: 'power2.out',
                overwrite: 'auto',
              })
            }
          },
        })
      }, el)

      ;(el as any).__gsapCtx = ctx
    }, 100)

    return () => {
      clearTimeout(timer)
      const ctx = (el as any).__gsapCtx
      if (ctx) ctx.revert()
    }
  }, [setStep])

  return (
    <section ref={sectionRef} className="relative">
      <div
        ref={pinRef}
        className="relative h-screen flex items-center px-8 sm:px-12 md:px-16 lg:px-24"
      >
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255,77,0,0.03) 0%, transparent 60%)',
              filter: 'blur(80px)',
            }}
          />
          <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/[0.02]" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto w-full">
          {/* Header */}
          <div className="mb-10 lg:mb-12">
            <motion.div
              className="flex items-center gap-4 mb-3"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="h-[1px] w-10 bg-flame" />
              <p className="text-caption text-flame tracking-[0.2em]">How It Works</p>
            </motion.div>
            <motion.h2
              className="text-h2 text-cream"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              Three taps to<span className="text-flame"> delicious.</span>
            </motion.h2>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16 items-center">
            {/* Left: Steps */}
            <motion.div
              className="flex flex-col"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {steps.map((step, i) => (
                <StepRow
                  key={step.number}
                  step={step}
                  index={i}
                  isActive={i === activeIndex}
                  isPast={i < activeIndex}
                  onClick={() => setStep(i)}
                />
              ))}
            </motion.div>

            {/* Right: Phone */}
            <motion.div
              className="hidden lg:flex items-center justify-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <PhoneFrame activeIndex={activeIndex} phoneRef={phoneRef} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
