"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Github, Linkedin, Mail } from "lucide-react"

const marqueeText = "SAVE LIVES \u00A0//\u00A0 MAKE NOISE \u00A0//\u00A0 RESQROUTE \u00A0//\u00A0 ZERO INTERNET \u00A0//\u00A0 LORA POWERED \u00A0//\u00A0 "

const socials = [
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/Soultk1977",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/tanmay-singh-638554349/",
  },
  {
    icon: Mail,
    label: "Email",
    href: "mailto:soultk1977@gmail.com",
  },
]

export function Footer() {
  const [scrollSpeed, setScrollSpeed] = useState(1)
  const lastScrollRef = useRef(0)

  useEffect(() => {
    let rafId: number
    const handleScroll = () => {
      const currentScroll = window.scrollY
      const speed = Math.abs(currentScroll - lastScrollRef.current)
      lastScrollRef.current = currentScroll
      setScrollSpeed(Math.min(1 + speed * 0.05, 5))
    }

    const decay = () => {
      setScrollSpeed((prev) => {
        if (prev > 1.05) return prev * 0.97
        return 1
      })
      rafId = requestAnimationFrame(decay)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    rafId = requestAnimationFrame(decay)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <footer className="relative overflow-hidden">
      {/* Velocity Marquee */}
      <div
        className="py-6 sm:py-8 border-t border-b overflow-hidden"
        style={{ borderColor: "rgba(0,255,157,0.1)" }}
      >
        <div
          className="flex whitespace-nowrap"
          style={{
            animation: `marquee ${20 / scrollSpeed}s linear infinite`,
          }}
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <span
              key={i}
              className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tighter px-4"
              style={{
                color: "transparent",
                WebkitTextStroke: "1px rgba(0,255,157,0.3)",
              }}
            >
              {marqueeText}
            </span>
          ))}
        </div>
      </div>

      {/* Footer content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand */}
          <div className="max-w-md">
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/images/logo.png"
                alt="ResQRoute logo"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="font-display text-lg font-bold text-foreground">
                Res<span style={{ color: "#00ff9d" }}>Q</span>Route
              </span>
            </div>
            <p className="font-sans text-sm leading-relaxed text-muted-foreground">
              Emergency vehicle traffic management system. Dreamed by a 13-year-old and Built by who refused to wait for the future.
            </p>
          </div>

          {/* Connect / Social */}
          <div className="flex flex-col items-start md:items-end gap-4">
            <h4 className="font-display text-sm font-bold text-foreground tracking-wider uppercase">
              Connect
            </h4>
            <div className="flex items-center gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("mailto") ? undefined : "_blank"}
                  rel={social.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300"
                  style={{
                    backgroundColor: "rgba(0,255,157,0.05)",
                    border: "1px solid rgba(0,255,157,0.1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(0,255,157,0.4)"
                    e.currentTarget.style.boxShadow =
                      "0 0 20px rgba(0,255,157,0.15)"
                    e.currentTarget.style.backgroundColor = "rgba(0,255,157,0.1)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(0,255,157,0.1)"
                    e.currentTarget.style.boxShadow = "none"
                    e.currentTarget.style.backgroundColor = "rgba(0,255,157,0.05)"
                  }}
                  aria-label={social.label}
                  data-hover
                >
                  <social.icon
                    className="w-4 h-4"
                    style={{ color: "rgba(0,255,157,0.7)" }}
                  />
                </a>
              ))}
            </div>
            <a
              href="mailto:soultk1977@gmail.com"
              className="font-mono text-xs transition-colors duration-300 hover:underline"
              style={{ color: "rgba(0,255,157,0.5)" }}
              data-hover
            >
              soultk1977@gmail.com
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderColor: "rgba(255,255,255,0.05)" }}
        >
          <p className="font-sans text-xs text-muted-foreground">
            {"Built with soldering irons and sleepless nights. \u00A9 2025 ResQRoute."}
          </p>
          <div className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: "#00ff9d" }}
            />
            <span
              className="text-xs font-mono"
              style={{ color: "rgba(0,255,157,0.5)" }}
            >
              SYSTEM ONLINE
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
