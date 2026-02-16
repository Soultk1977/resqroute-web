"use client"

import { useEffect, useRef, useState } from "react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { TextScramble } from "@/components/text-scramble"
import { Shield, Lock, Eye } from "lucide-react"

export function WatchdogSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [glitchActive, setGlitchActive] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setGlitchActive(true)
            setTimeout(() => setGlitchActive(false), 2000)
          }
        })
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-24 sm:py-32 lg:py-40 overflow-hidden"
      data-warning
    >
      {/* Warning grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,0,60,0.3) 40px, rgba(255,0,60,0.3) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,0,60,0.3) 40px, rgba(255,0,60,0.3) 41px)`,
        }}
        aria-hidden="true"
      />

      {/* Chromatic aberration container */}
      <div
        className={`mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center transition-all duration-200 ${
          glitchActive ? "animate-pulse" : ""
        }`}
        style={
          glitchActive
            ? {
                textShadow: "2px 0 #ff003c, -2px 0 #00ff9d",
              }
            : {}
        }
      >
        {/* Icon */}
        <ScrollReveal>
          <div className="inline-flex items-center justify-center mb-8">
            <div
              className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center"
              style={{
                backgroundColor: "rgba(255,0,60,0.08)",
                border: "1px solid rgba(255,0,60,0.2)",
              }}
            >
              <Lock className="w-8 h-8 sm:w-10 sm:h-10" style={{ color: "#ff003c" }} />
              {/* Angry eyebrows */}
              <div
                className="absolute -top-2 left-1/2 -translate-x-1/2"
                style={{
                  width: "30px",
                  height: "4px",
                  background: "#ff003c",
                  borderRadius: "2px",
                  transform: "translateX(-50%) rotate(-10deg)",
                  boxShadow: "0 0 10px rgba(255,0,60,0.5)",
                }}
              />
              <div
                className="absolute -top-2 left-1/2"
                style={{
                  width: "30px",
                  height: "4px",
                  background: "#ff003c",
                  borderRadius: "2px",
                  transform: "translateX(-20%) rotate(10deg)",
                  boxShadow: "0 0 10px rgba(255,0,60,0.5)",
                }}
              />
            </div>
          </div>
        </ScrollReveal>

        {/* Badge */}
        <ScrollReveal delay={100}>
          <span
            className="inline-block px-3 py-1 text-xs font-sans font-medium rounded-full border mb-6"
            style={{
              borderColor: "rgba(255,0,60,0.3)",
              color: "#ff003c",
              backgroundColor: "rgba(255,0,60,0.05)",
            }}
          >
            THE WATCHDOG PROTOCOL
          </span>
        </ScrollReveal>

        {/* Headline with glitch */}
        <ScrollReveal delay={200}>
          <h2
            className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground leading-tight tracking-tight mb-6 glitch-text"
            data-text="Thinking Of 'Borrowing' This Idea?"
          >
            <TextScramble
              text="Thinking Of 'Borrowing' This Idea?"
              delay={400}
              as="span"
            />
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <p
            className="font-sans text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-10"
            style={{ color: "rgba(245,245,245,0.6)" }}
          >
            {"The 'Watchdog Protocol' is logged and legally paper-trailed. Every line of code, every circuit diagram, every idea\u2014timestamped and protected."}
          </p>
        </ScrollReveal>

        {/* Protection cards */}
        <ScrollReveal delay={400}>
          <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            {[
              {
                icon: Shield,
                label: "Patent Pending",
                description: "Filed & Protected",
              },
              {
                icon: Lock,
                label: "Code Encrypted",
                description: "Zero-Trust Repo",
              },
              {
                icon: Eye,
                label: "Monitored 24/7",
                description: "Watchdog Active",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="group p-4 sm:p-6 rounded-xl transition-all duration-300 hover:-translate-y-1"
                style={{
                  backgroundColor: "rgba(255,0,60,0.03)",
                  border: "1px solid rgba(255,0,60,0.1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,0,60,0.3)"
                  e.currentTarget.style.boxShadow = "0 0 30px rgba(255,0,60,0.1)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,0,60,0.1)"
                  e.currentTarget.style.boxShadow = "none"
                }}
                data-hover
              >
                <item.icon
                  className="w-6 h-6 mx-auto mb-3"
                  style={{ color: "#ff003c" }}
                />
                <p className="font-display text-sm font-bold text-foreground">
                  {item.label}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal delay={500}>
          <button
            onClick={() => {
              const el = document.querySelector("#terminal")
              if (el) el.scrollIntoView({ behavior: "smooth" })
            }}
            className="mt-10 font-display text-sm font-bold tracking-wider transition-all duration-300 hover:underline"
            style={{ color: "#00ff9d" }}
            data-hover
          >
            {"LET'S BUILD TOGETHER, NOT COMPETE."}
          </button>
        </ScrollReveal>
      </div>
    </section>
  )
}
