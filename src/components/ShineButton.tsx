import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface ShineButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
}

export default function ShineButton({ children, className = '', onClick }: ShineButtonProps) {
  return (
    <motion.button
      data-magnetic
      onClick={onClick}
      className={`
        group relative overflow-hidden
        px-10 py-4 rounded-full
        backdrop-blur-xl
        text-cream font-semibold text-lg
        transition-all duration-500
        ${className}
      `}
      style={{
        background: 'rgba(255,255,255,0.06)',
        boxShadow: '0 0 40px rgba(255,77,0,0.08), inset 0 1px 0 rgba(255,255,255,0.08)',
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      whileTap={{ scale: 0.97 }}
      whileHover={{
        boxShadow: '0 0 60px rgba(255,77,0,0.15), inset 0 1px 0 rgba(255,255,255,0.12)',
      }}
    >
      {/* Gradient border: top-left white → transparent */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          padding: '1px',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.05) 30%, transparent 60%)',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
        }}
      />

      {/* Border beam — sm variant for buttons */}
      <div className="border-beam border-beam-sm" />

      {/* Shine sweep */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ x: '-100%' }}
        animate={{ x: ['-100%', '200%'] }}
        transition={{
          duration: 1.2,
          ease: [0.16, 1, 0.3, 1],
          repeat: Infinity,
          repeatDelay: 3,
          delay: 2.5,
        }}
      >
        <div
          className="h-full w-1/3"
          style={{
            background:
              'linear-gradient(105deg, transparent 0%, rgba(255,255,255,0) 30%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0) 70%, transparent 100%)',
          }}
        />
      </motion.div>

      {/* Top accent line */}
      <span className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-[1px] bg-gradient-to-r from-transparent via-flame/60 to-transparent" />

      <span className="relative z-10 flex items-center gap-3">
        {children}
      </span>
    </motion.button>
  )
}
