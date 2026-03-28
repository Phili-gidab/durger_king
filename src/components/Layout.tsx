import { type ReactNode } from 'react'
import { motion } from 'framer-motion'
import MagneticCursor from './MagneticCursor'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      {/* Custom Cursor */}
      <MagneticCursor />

      {/* Cinematic Noise Overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Subtle radial gradient accent */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(255,77,0,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Page Content */}
      <motion.main
        className="relative z-10 min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.main>
    </>
  )
}
