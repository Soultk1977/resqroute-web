"use client"

import { useEffect, useState, useRef } from "react"
import { ParticleField } from "@/components/particle-field"
import { TextScramble } from "@/components/text-scramble"
import { MagneticButton } from "@/components/magnetic-button"
import { ChevronDown } from "lucide-react"

export function HeroSection() {
  const [loaded, setLoaded] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setTimeout(() => setLoaded(true), 200)
  }, [])

  const scrollDown = () => {
    const el = document.querySelector("#origin")
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Particle Background */}
      <ParticleField className="z-0" />

      {/* Radial gradient overlays */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, rgba(0,255,157,0.06) 0%, transparent 50%), radial-gradient(ellipse at 80% 50%, rgba(255,0,60,0.04) 0%, transparent 50%)",
        }}
        aria-hidden="true"
      />

      {/* Grid lines */}
      <div
        className="absolute inset-0 z-[1] opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,255,157,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,157,0.3) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 text-center">
        {/* Headline */}
        <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.95] tracking-tighter text-foreground mb-6">
          <TextScramble
            text="What If The City"
            className="block"
            delay={300}
            as="span"
          />
          <TextScramble
            text="Could See You"
            className="block"
            delay={600}
            as="span"
          />
          <span className="block">
            <TextScramble
              text="Coming"
              className=""
              delay={900}
              as="span"
            />
            <span
              className={`transition-opacity duration-1000 ${
                loaded ? "opacity-100" : "opacity-0"
              }`}
              style={{ color: "#00ff9d" }}
            >
              {"?"}
            </span>
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className={`font-sans text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10 transition-all duration-1000 delay-700 ${
            loaded
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
          style={{ color: "rgba(245,245,245,0.6)" }}
        >
          Ambulances that part traffic like the Red Sea.{" "}
          <span className="hidden sm:inline">
            Fire trucks that turn red lights green.
          </span>
          <span className="sm:hidden">Fire trucks that turn reds green.</span>
        </p>

        {/* CTA Button */}
        <div
          className={`transition-all duration-1000 delay-1000 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <MagneticButton
            onClick={scrollDown}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-display font-bold text-sm sm:text-base tracking-wider overflow-hidden"
          >
            <span
              className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
              style={{
                background:
                  "linear-gradient(135deg, #00ff9d, #00cc7d)",
              }}
            />
            <span
              className="absolute inset-0 border-2 rounded-full"
              style={{ borderColor: "#00ff9d" }}
            />
            <span className="relative z-10 text-foreground group-hover:text-background transition-colors duration-300">
              ENTER THE FUTURE
            </span>
            <ChevronDown className="relative z-10 w-4 h-4 text-foreground group-hover:text-background transition-colors duration-300 animate-bounce" />
          </MagneticButton>
        </div>

        {/* Stats bar */}
        <div
          className={`mt-16 sm:mt-20 flex flex-wrap justify-center gap-8 sm:gap-12 transition-all duration-1000 delay-[1200ms] ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {[
            { value: "34%", label: "Faster Response" },
            { value: "0", label: "Internet Required" },
            { value: "LoRaWAN", label: "Powered" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="font-display text-2xl sm:text-3xl font-bold"
                style={{ color: "#00ff9d" }}
              >
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-sans text-muted-foreground mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}
