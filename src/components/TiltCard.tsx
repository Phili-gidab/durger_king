import { useRef, type ReactNode, type MouseEvent } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface TiltCardProps {
  children: ReactNode
  className?: string
}

const SPRING = { damping: 20, stiffness: 300, mass: 0.5 }

export default function TiltCard({ children, className = '' }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springRotateX = useSpring(rotateX, SPRING)
  const springRotateY = useSpring(rotateY, SPRING)

  function handleMouseMove(e: MouseEvent) {
    const el = ref.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    rotateX.set(((y - centerY) / centerY) * -8)
    rotateY.set(((x - centerX) / centerX) * 8)

    el.style.setProperty('--spot-x', `${x}px`)
    el.style.setProperty('--spot-y', `${y}px`)
  }

  function handleMouseLeave() {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      data-magnetic
      className={`tilt-card relative rounded-2xl overflow-hidden group ${className}`}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformPerspective: 1000,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glassmorphism background — blur + gradient border */}
      <div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: 'rgba(20, 20, 20, 0.6)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      />

      {/* Gradient border: white/20 top-left → transparent bottom-right */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          padding: '1px',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.05) 40%, transparent 100%)',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
        }}
      />

      {/* Inner glass highlight — subtle top edge shine */}
      <div
        className="absolute inset-x-0 top-0 h-[1px] rounded-t-2xl pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.12) 50%, transparent 90%)',
        }}
      />

      {/* Spotlight glow — follows cursor */}
      <div className="spotlight-glow" />

      {/* Spotlight border — follows cursor */}
      <div className="spotlight-border" />

      {/* Border beam — glowing dot circling the card */}
      <div className="border-beam opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      {/* Content */}
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  )
}
