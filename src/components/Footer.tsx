import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* CTA Section */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-12 md:px-16 lg:px-24 pt-20 sm:pt-32 pb-28 sm:pb-40">
        {/* Eyebrow */}
        <motion.div
          className="flex items-center gap-4 mb-6"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="h-[1px] w-10 bg-flame" />
          <p className="text-caption text-flame tracking-[0.2em]">Get Started</p>
        </motion.div>

        <motion.h2
          className="text-h1 text-cream max-w-3xl mb-8 leading-[1]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
        >
          Ready to order?
          <br />
          <span className="text-cream-muted">It starts with a tap.</span>
        </motion.h2>

        {/* Big CTA — 50% width */}
        <motion.div
          className="w-full sm:w-[50%]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
        >
          <button
            data-magnetic
            className="group relative w-full overflow-hidden rounded-2xl cursor-none
                       bg-flame hover:bg-flame-dark transition-colors duration-500
                       py-6 px-10 flex items-center justify-center gap-4"
          >
            {/* Shine sweep */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ x: '-100%' }}
              animate={{ x: ['−100%', '200%'] }}
              transition={{
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1],
                repeat: Infinity,
                repeatDelay: 4,
                delay: 1,
              }}
            >
              <div
                className="h-full w-1/3"
                style={{
                  background:
                    'linear-gradient(105deg, transparent 0%, rgba(255,255,255,0) 30%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0) 70%, transparent 100%)',
                }}
              />
            </motion.div>

            <span className="relative z-10 text-cream font-bold text-xl tracking-wide">
              Join the Bot
            </span>
            <ArrowRight
              size={22}
              strokeWidth={2.5}
              className="relative z-10 text-cream transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </motion.div>
      </div>

      {/* Background massive text */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none select-none overflow-hidden">
        <motion.div
          className="text-center whitespace-nowrap"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.32, 0.72, 0, 1] }}
        >
          <span
            className="block font-extrabold leading-none"
            style={{
              fontSize: 'clamp(6rem, 18vw, 22rem)',
              letterSpacing: '-0.04em',
              color: 'transparent',
              WebkitTextStroke: '1px rgba(255,255,255,0.04)',
              backgroundImage: 'linear-gradient(to top, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 60%, transparent 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
            }}
          >
            DURGER KING
          </span>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 border-t border-white/[0.04]">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-12 md:px-16 lg:px-24 py-5 sm:py-6 flex items-center justify-between flex-wrap gap-4">
          <span className="text-[0.65rem] text-cream-muted/40 tracking-wider uppercase">
            &copy; {new Date().getFullYear()} Durger King. All rights reserved.
          </span>
          <div className="flex items-center gap-6">
            {['Telegram', 'GitHub', 'Twitter'].map((link) => (
              <span
                key={link}
                data-magnetic
                className="text-[0.65rem] text-cream-muted/40 tracking-wider uppercase
                           hover:text-flame/80 transition-colors duration-300 cursor-none"
              >
                {link}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
