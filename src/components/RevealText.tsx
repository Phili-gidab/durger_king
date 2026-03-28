import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'

interface RevealTextProps {
  text: string
  className?: string
  delay?: number
}

export default function RevealText({ text, className = '', delay = 0 }: RevealTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    const el = containerRef.current
    if (!el) return

    const chars = el.querySelectorAll('.reveal-char')

    gsap.fromTo(
      chars,
      { y: -25, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.03,
        delay,
        ease: 'back.out(1.7)',
      }
    )
  }, [delay])

  const words = text.split(' ')

  return (
    <span ref={containerRef} className={`inline ${className}`} aria-label={text}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap">
          {word.split('').map((char, ci) => (
            <span
              key={`${wi}-${ci}`}
              className="inline-block overflow-hidden align-bottom pb-[0.15em]"
            >
              <span className="reveal-char inline-block opacity-0">
                {char}
              </span>
            </span>
          ))}
          {wi < words.length - 1 && (
            <span className="inline-block w-[0.3em]">&nbsp;</span>
          )}
        </span>
      ))}
    </span>
  )
}
