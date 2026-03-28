import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Smartphone, Shield, MapPin } from 'lucide-react'
import TiltCard from './TiltCard'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
}

export default function FeatureSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="relative py-20 sm:py-32 px-5 sm:px-12 md:px-16 lg:px-24">
      {/* Section header */}
      <div className="max-w-[1400px] mx-auto mb-16">
        <motion.p
          className="text-caption text-flame tracking-[0.2em] mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          Features
        </motion.p>
        <motion.h2
          className="text-h2 text-cream max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          Everything you need,
          <span className="text-cream-muted"> nothing you don't.</span>
        </motion.h2>
      </div>

      {/* Bento Grid — 12 columns */}
      <div
        ref={ref}
        className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-[minmax(240px,auto)] md:auto-rows-[minmax(320px,auto)]"
      >
        {/* ── Box 1: Ordering Reimagined (Large — spans 7 cols) ── */}
        <motion.div
          className="md:col-span-7 md:row-span-2"
          variants={fadeUp}
          custom={0}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <TiltCard className="h-full">
            <div className="flex flex-col h-full p-6 sm:p-8 lg:p-10">
              {/* Label */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-flame/10 flex items-center justify-center">
                  <Smartphone size={16} className="text-flame" />
                </div>
                <span className="text-caption text-cream-muted tracking-[0.15em]">
                  Mini App
                </span>
              </div>

              <h3 className="text-h3 text-cream mb-2">Ordering Reimagined.</h3>
              <p className="text-body text-cream-muted max-w-sm mb-6 sm:mb-8">
                A full restaurant experience inside Telegram. Browse, customize, and order — all without leaving the chat.
              </p>

              {/* Phone mockup */}
              <div className="relative flex-1 flex items-end justify-center overflow-hidden">
                {/* Glow behind phone */}
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] h-[200px] rounded-full"
                  style={{
                    background: 'radial-gradient(ellipse, rgba(255,77,0,0.12) 0%, transparent 70%)',
                    filter: 'blur(40px)',
                  }}
                />
                <motion.img
                  src="/app-screen-1.png"
                  alt="Durger King menu screen"
                  className="relative z-10 w-[260px] lg:w-[300px] h-auto object-contain"
                  style={{ transformStyle: 'preserve-3d' }}
                  initial={{ y: 60, opacity: 0 }}
                  animate={inView ? { y: 0, opacity: 1 } : {}}
                  transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </div>
          </TiltCard>
        </motion.div>

        {/* ── Box 2: Telegram Native (Medium — spans 5 cols) ── */}
        <motion.div
          className="md:col-span-5"
          variants={fadeUp}
          custom={1}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <TiltCard className="h-full">
            <div className="flex flex-col h-full p-6 sm:p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-flame/10 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 text-flame fill-current">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                  </svg>
                </div>
                <span className="text-caption text-cream-muted tracking-[0.15em]">
                  Platform
                </span>
              </div>

              <h3 className="text-h3 text-cream mb-2">Telegram Native.</h3>
              <p className="text-body text-cream-muted max-w-xs mb-8">
                Built from the ground up for Telegram. Zero friction, instant access.
              </p>

              {/* 3D Telegram logo with glow */}
              <div className="relative flex-1 flex items-center justify-center">
                {/* Multi-layer glow */}
                <div className="absolute w-40 h-40 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(255,77,0,0.15) 0%, rgba(255,77,0,0.05) 40%, transparent 70%)',
                    filter: 'blur(30px)',
                  }}
                />
                <motion.img
                  src="/telegram-icon.png"
                  alt="Telegram"
                  className="relative z-10 w-32 lg:w-40 h-auto object-contain"
                  animate={{
                    y: [0, -8, 0],
                    rotateY: [0, 10, 0],
                    rotateX: [0, -5, 0],
                  }}
                  transition={{
                    duration: 4,
                    ease: 'easeInOut',
                    repeat: Infinity,
                  }}
                  style={{ transformStyle: 'preserve-3d' }}
                />
              </div>
            </div>
          </TiltCard>
        </motion.div>

        {/* ── Box 3: Secure Pay (Small — spans 5 cols) ── */}
        <motion.div
          className="md:col-span-5"
          variants={fadeUp}
          custom={2}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <TiltCard className="h-full">
            <div className="flex flex-col md:flex-row h-full p-6 sm:p-8 lg:p-10 gap-6">
              {/* Text side */}
              <div className="flex flex-col justify-center flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-flame/10 flex items-center justify-center">
                    <Shield size={16} className="text-flame" />
                  </div>
                  <span className="text-caption text-cream-muted tracking-[0.15em]">
                    Payments
                  </span>
                </div>
                <h3 className="text-h3 text-cream mb-2">Secure Pay.</h3>
                <p className="text-body text-cream-muted text-sm">
                  Telegram's native payment system. Fast, encrypted, and effortless.
                </p>
              </div>

              {/* Checkout screenshot */}
              <div className="relative flex items-center justify-center flex-shrink-0">
                <motion.img
                  src="/app-screen-3.png"
                  alt="Checkout screen"
                  className="w-[140px] lg:w-[160px] h-auto object-contain rounded-lg"
                  initial={{ y: 30, opacity: 0 }}
                  animate={inView ? { y: 0, opacity: 1 } : {}}
                  transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </div>
          </TiltCard>
        </motion.div>

        {/* ── Box 4: Real-time Tracking (Full width — spans 12 cols) ── */}
        <motion.div
          className="md:col-span-12"
          variants={fadeUp}
          custom={3}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <TiltCard className="h-full">
            <div className="flex flex-col md:flex-row items-center h-full p-6 sm:p-8 lg:p-10 gap-6 sm:gap-8">
              {/* Text */}
              <div className="flex flex-col flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-flame/10 flex items-center justify-center">
                    <MapPin size={16} className="text-flame" />
                  </div>
                  <span className="text-caption text-cream-muted tracking-[0.15em]">
                    Delivery
                  </span>
                </div>
                <h3 className="text-h3 text-cream mb-2">Real-time Tracking.</h3>
                <p className="text-body text-cream-muted max-w-md">
                  Watch your order move from kitchen to doorstep. Live updates, accurate ETAs, and instant notifications.
                </p>
              </div>

              {/* Animated tracking visualization */}
              <div className="relative flex-1 w-full flex items-center justify-center min-h-[100px] sm:min-h-[120px] pb-6">
                {/* Track line */}
                <div className="w-full max-w-md h-[2px] bg-white/[0.06] rounded-full relative">
                  {/* Progress */}
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-flame to-flame/60 rounded-full"
                    initial={{ width: '0%' }}
                    animate={inView ? { width: '65%' } : {}}
                    transition={{ delay: 0.8, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                  />

                  {/* Dots */}
                  {['0%', '33%', '66%', '100%'].map((pos, i) => (
                    <motion.div
                      key={pos}
                      className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-obsidian-light"
                      style={{ left: pos }}
                      initial={{ scale: 0, backgroundColor: 'rgba(255,255,255,0.1)' }}
                      animate={
                        inView
                          ? {
                              scale: 1,
                              backgroundColor:
                                i <= 1
                                  ? 'var(--color-flame)'
                                  : 'rgba(255,255,255,0.1)',
                            }
                          : {}
                      }
                      transition={{ delay: 0.8 + i * 0.2, duration: 0.4 }}
                    />
                  ))}

                  {/* Pulsing current position */}
                  <motion.div
                    className="absolute top-1/2 -translate-y-1/2"
                    style={{ left: '65%' }}
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ delay: 1.6, duration: 0.4 }}
                  >
                    <div className="w-4 h-4 rounded-full bg-flame relative">
                      <motion.div
                        className="absolute inset-0 rounded-full bg-flame"
                        animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    </div>
                  </motion.div>

                  {/* Labels */}
                  <div className="absolute -bottom-8 left-0 text-[0.6rem] uppercase tracking-wider text-cream-muted">
                    Ordered
                  </div>
                  <div className="absolute -bottom-8 left-1/3 text-[0.6rem] uppercase tracking-wider text-cream-muted">
                    Preparing
                  </div>
                  <div className="absolute -bottom-8 left-2/3 text-[0.6rem] uppercase tracking-wider text-flame font-medium">
                    On the way
                  </div>
                  <div className="absolute -bottom-8 right-0 text-[0.6rem] uppercase tracking-wider text-cream-muted">
                    Delivered
                  </div>
                </div>
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </section>
  )
}
