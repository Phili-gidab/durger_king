import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const SPRING_CONFIG = { damping: 25, stiffness: 250, mass: 0.5 }
const DOT_SPRING = { damping: 35, stiffness: 400, mass: 0.2 }

export default function MagneticCursor() {
  const [expanded, setExpanded] = useState(false)
  const [visible, setVisible] = useState(false)
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  const dotX = useMotionValue(0)
  const dotY = useMotionValue(0)

  const springX = useSpring(cursorX, SPRING_CONFIG)
  const springY = useSpring(cursorY, SPRING_CONFIG)
  const dotSpringX = useSpring(dotX, DOT_SPRING)
  const dotSpringY = useSpring(dotY, DOT_SPRING)

  const rafRef = useRef<number>(0)

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    const onMouseMove = (e: MouseEvent) => {
      if (!visible) setVisible(true)

      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        cursorX.set(e.clientX)
        cursorY.set(e.clientY)
        dotX.set(e.clientX)
        dotY.set(e.clientY)
      })

      // Magnetic pull toward nearby interactive elements
      const target = e.target as HTMLElement
      const interactive = target.closest('[data-magnetic]') as HTMLElement | null
      if (interactive) {
        const rect = interactive.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const pullStrength = 0.3
        cursorX.set(e.clientX + (centerX - e.clientX) * pullStrength)
        cursorY.set(e.clientY + (centerY - e.clientY) * pullStrength)
        if (!expanded) setExpanded(true)
      } else {
        if (expanded) setExpanded(false)
      }
    }

    const onMouseLeave = () => setVisible(false)
    const onMouseEnter = () => setVisible(true)

    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
      cancelAnimationFrame(rafRef.current)
    }
  }, [visible, expanded, cursorX, cursorY, dotX, dotY])

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className={`magnetic-cursor ${expanded ? 'expanded' : ''}`}
        style={{
          x: springX,
          y: springY,
          opacity: visible ? 1 : 0,
        }}
      />
      {/* Inner dot */}
      <motion.div
        className="magnetic-cursor-dot"
        style={{
          x: dotSpringX,
          y: dotSpringY,
          opacity: visible ? 1 : 0,
          scale: expanded ? 0 : 1,
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  )
}
