"use client"

import { useEffect, useState, useRef } from "react"

const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

interface TextScrambleProps {
  text: string
  className?: string
  delay?: number
  speed?: number
  as?: "h1" | "h2" | "h3" | "p" | "span"
}

export function TextScramble({
  text,
  className = "",
  delay = 0,
  speed = 30,
  as: Tag = "span",
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState("")
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) {
          setTimeout(() => setStarted(true), delay)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [delay, started])

  useEffect(() => {
    if (!started) return

    let iteration = 0
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " "
            if (i < iteration) return text[i]
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join("")
      )
      iteration += 1 / 2
      if (iteration > text.length) {
        clearInterval(interval)
        setDisplayText(text)
      }
    }, speed)

    return () => clearInterval(interval)
  }, [started, text, speed])

  return (
    <Tag ref={ref as React.RefObject<never>} className={className}>
      {displayText || "\u00A0"}
    </Tag>
  )
}
