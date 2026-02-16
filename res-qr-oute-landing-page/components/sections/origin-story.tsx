"use client"

import { ScrollReveal } from "@/components/scroll-reveal"
import { TextScramble } from "@/components/text-scramble"
import { useEffect, useRef, useState } from "react"
import { Sparkles } from "lucide-react"

function FloatingSparkle({ delay, x, y, duration, sparkleOpacity }: { delay: number; x: number; y: number; duration: number; sparkleOpacity: number }) {
  return (
    <div
      className="absolute animate-float"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
      }}
    >
      <Sparkles
        className="w-3 h-3 sm:w-4 sm:h-4"
        style={{ color: "#00ff9d", opacity: sparkleOpacity }}
      />
    </div>
  )
}

function TechDiagramVisual({ mousePos }: { mousePos: { x: number; y: number } }) {
  return (
    <div
      className="relative aspect-square max-w-lg mx-auto rounded-2xl overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at 50% 40%, rgba(0,255,157,0.06), transparent 70%)",
        border: "1px solid rgba(0,255,157,0.1)",
      }}
    >
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
          transition: "transform 0.3s ease-out",
        }}
      >
        <svg viewBox="0 0 400 400" className="w-full h-full" fill="none">
          {/* Background circuit grid */}
          <defs>
            <pattern id="circuit-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0,255,157,0.04)" strokeWidth="0.5" />
            </pattern>
            <radialGradient id="center-glow" cx="50%" cy="45%" r="35%">
              <stop offset="0%" stopColor="#00ff9d" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#00ff9d" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="400" height="400" fill="url(#circuit-grid)" />
          <circle cx="200" cy="175" r="120" fill="url(#center-glow)" />

          {/* ---- IR SENSOR MODULE (top) ---- */}
          {/* IR sensor chip */}
          <rect x="155" y="70" width="90" height="50" rx="8" fill="rgba(0,0,0,0.4)" stroke="#00ff9d" strokeWidth="1.5" />
          <rect x="165" y="80" width="70" height="30" rx="4" fill="rgba(0,255,157,0.05)" stroke="rgba(0,255,157,0.3)" strokeWidth="0.8" />

          {/* IR text */}
          <text x="200" y="100" textAnchor="middle" fill="#00ff9d" fontSize="14" fontFamily="monospace" fontWeight="bold">{"IR SENSOR"}</text>

          {/* IR Pins (top) */}
          <line x1="175" y1="70" x2="175" y2="55" stroke="#00ff9d" strokeWidth="1" opacity="0.5" />
          <line x1="190" y1="70" x2="190" y2="55" stroke="#00ff9d" strokeWidth="1" opacity="0.5" />
          <line x1="210" y1="70" x2="210" y2="55" stroke="#00ff9d" strokeWidth="1" opacity="0.5" />
          <line x1="225" y1="70" x2="225" y2="55" stroke="#00ff9d" strokeWidth="1" opacity="0.5" />

          {/* IR beam emanating */}
          <path d="M 200 55 L 180 30" stroke="#ff003c" strokeWidth="1" opacity="0.6">
            <animate attributeName="opacity" values="0.2;0.8;0.2" dur="1.5s" repeatCount="indefinite" />
          </path>
          <path d="M 200 55 L 200 25" stroke="#ff003c" strokeWidth="1" opacity="0.6">
            <animate attributeName="opacity" values="0.8;0.2;0.8" dur="1.5s" repeatCount="indefinite" />
          </path>
          <path d="M 200 55 L 220 30" stroke="#ff003c" strokeWidth="1" opacity="0.6">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="1.5s" repeatCount="indefinite" />
          </path>
          {/* IR wave arcs */}
          <path d="M 180 35 Q 200 15 220 35" stroke="#ff003c" strokeWidth="0.8" fill="none" opacity="0">
            <animate attributeName="opacity" values="0;0.5;0" dur="2s" repeatCount="indefinite" />
          </path>
          <path d="M 170 40 Q 200 10 230 40" stroke="#ff003c" strokeWidth="0.6" fill="none" opacity="0">
            <animate attributeName="opacity" values="0;0.3;0" dur="2s" begin="0.5s" repeatCount="indefinite" />
          </path>

          {/* ---- CONNECTION TRACE (IR to MCU) ---- */}
          <path d="M 200 120 L 200 150 L 200 160" stroke="#00ff9d" strokeWidth="1" strokeDasharray="3 3" opacity="0.5">
            <animate attributeName="strokeDashoffset" values="0;-12" dur="1s" repeatCount="indefinite" />
          </path>
          {/* Data packet flowing down */}
          <circle cx="200" cy="120" r="2" fill="#00ff9d">
            <animate attributeName="cy" values="120;160" dur="1s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="1;0.3" dur="1s" repeatCount="indefinite" />
          </circle>

          {/* ---- MCU (center) ---- */}
          <rect x="155" y="160" width="90" height="60" rx="6" fill="rgba(0,0,0,0.5)" stroke="#00ff9d" strokeWidth="2" />
          {/* MCU inner die */}
          <rect x="170" y="172" width="60" height="36" rx="3" fill="rgba(0,255,157,0.03)" stroke="rgba(0,255,157,0.2)" strokeWidth="1" />
          {/* MCU text */}
          <text x="200" y="186" textAnchor="middle" fill="#00ff9d" fontSize="10" fontFamily="monospace" fontWeight="bold">{"ESP32"}</text>
          <text x="200" y="200" textAnchor="middle" fill="rgba(0,255,157,0.5)" fontSize="7" fontFamily="monospace">{"PROCESSOR"}</text>
          {/* MCU pins left */}
          <line x1="155" y1="175" x2="140" y2="175" stroke="#00ff9d" strokeWidth="1" opacity="0.4" />
          <line x1="155" y1="185" x2="140" y2="185" stroke="#00ff9d" strokeWidth="1" opacity="0.4" />
          <line x1="155" y1="195" x2="140" y2="195" stroke="#00ff9d" strokeWidth="1" opacity="0.4" />
          <line x1="155" y1="205" x2="140" y2="205" stroke="#00ff9d" strokeWidth="1" opacity="0.4" />
          {/* MCU pins right */}
          <line x1="245" y1="175" x2="260" y2="175" stroke="#00ff9d" strokeWidth="1" opacity="0.4" />
          <line x1="245" y1="185" x2="260" y2="185" stroke="#00ff9d" strokeWidth="1" opacity="0.4" />
          <line x1="245" y1="195" x2="260" y2="195" stroke="#00ff9d" strokeWidth="1" opacity="0.4" />
          <line x1="245" y1="205" x2="260" y2="205" stroke="#00ff9d" strokeWidth="1" opacity="0.4" />
          {/* MCU heartbeat */}
          <circle cx="200" cy="190" r="30" stroke="#00ff9d" strokeWidth="0.4" fill="none" opacity="0">
            <animate attributeName="r" values="30;50" dur="2.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0" dur="2.5s" repeatCount="indefinite" />
          </circle>

          {/* ---- CONNECTION TRACE (MCU to LoRa) ---- */}
          <path d="M 200 220 L 200 250 L 200 260" stroke="#00ff9d" strokeWidth="1" strokeDasharray="3 3" opacity="0.5">
            <animate attributeName="strokeDashoffset" values="0;-12" dur="1.2s" repeatCount="indefinite" />
          </path>
          <circle cx="200" cy="220" r="2" fill="#00ff9d">
            <animate attributeName="cy" values="220;260" dur="1.2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="1;0.3" dur="1.2s" repeatCount="indefinite" />
          </circle>

          {/* ---- LORA MODULE (bottom) ---- */}
          <rect x="155" y="260" width="90" height="50" rx="8" fill="rgba(0,0,0,0.4)" stroke="#00ff9d" strokeWidth="1.5" />
          <rect x="165" y="270" width="70" height="30" rx="4" fill="rgba(0,255,157,0.05)" stroke="rgba(0,255,157,0.3)" strokeWidth="0.8" />
          <text x="200" y="290" textAnchor="middle" fill="#00ff9d" fontSize="12" fontFamily="monospace" fontWeight="bold">{"LoRaWAN"}</text>

          {/* LoRa antenna */}
          <line x1="200" y1="310" x2="200" y2="340" stroke="#00ff9d" strokeWidth="1.5" />
          <circle cx="200" cy="340" r="3" fill="none" stroke="#00ff9d" strokeWidth="1" />

          {/* LoRa radio waves */}
          <path d="M 180 345 Q 200 365 220 345" stroke="#00ff9d" strokeWidth="0.8" fill="none" opacity="0">
            <animate attributeName="opacity" values="0;0.6;0" dur="1.8s" repeatCount="indefinite" />
          </path>
          <path d="M 170 350 Q 200 380 230 350" stroke="#00ff9d" strokeWidth="0.6" fill="none" opacity="0">
            <animate attributeName="opacity" values="0;0.4;0" dur="1.8s" begin="0.4s" repeatCount="indefinite" />
          </path>
          <path d="M 160 355 Q 200 395 240 355" stroke="#00ff9d" strokeWidth="0.4" fill="none" opacity="0">
            <animate attributeName="opacity" values="0;0.2;0" dur="1.8s" begin="0.8s" repeatCount="indefinite" />
          </path>

          {/* ---- SIDE LABELS ---- */}
          {/* Left: Traffic Light */}
          <rect x="30" y="172" width="80" height="36" rx="5" fill="rgba(0,0,0,0.3)" stroke="rgba(0,255,157,0.15)" strokeWidth="0.8" />
          <circle cx="55" cy="183" r="4" fill="#00ff9d">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="55" cy="197" r="4" fill="#ff003c" opacity="0.3" />
          <text x="80" y="192" textAnchor="middle" fill="rgba(0,255,157,0.6)" fontSize="7" fontFamily="monospace">{"SIGNAL"}</text>
          <line x1="110" y1="190" x2="140" y2="190" stroke="rgba(0,255,157,0.3)" strokeWidth="0.5" strokeDasharray="2 2">
            <animate attributeName="strokeDashoffset" values="0;-8" dur="1s" repeatCount="indefinite" />
          </line>

          {/* Right: Network */}
          <rect x="290" y="172" width="80" height="36" rx="5" fill="rgba(0,0,0,0.3)" stroke="rgba(0,255,157,0.15)" strokeWidth="0.8" />
          <text x="330" y="192" textAnchor="middle" fill="rgba(0,255,157,0.6)" fontSize="7" fontFamily="monospace">{"NETWORK"}</text>
          <circle cx="310" cy="190" r="3" fill="#00ff9d" opacity="0.5">
            <animate attributeName="opacity" values="0.3;0.8;0.3" dur="1.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="350" cy="190" r="3" fill="#00ff9d" opacity="0.5">
            <animate attributeName="opacity" values="0.8;0.3;0.8" dur="1.5s" repeatCount="indefinite" />
          </circle>
          <line x1="313" y1="190" x2="347" y2="190" stroke="rgba(0,255,157,0.3)" strokeWidth="0.5" />
          <line x1="260" y1="190" x2="290" y2="190" stroke="rgba(0,255,157,0.3)" strokeWidth="0.5" strokeDasharray="2 2">
            <animate attributeName="strokeDashoffset" values="0;8" dur="1s" repeatCount="indefinite" />
          </line>

          {/* Status bar at bottom */}
          <rect x="100" y="375" width="200" height="1" fill="rgba(0,255,157,0.15)" />
          <rect x="100" y="375" width="120" height="1" fill="rgba(0,255,157,0.5)">
            <animate attributeName="width" values="0;200" dur="3s" repeatCount="indefinite" />
          </rect>
        </svg>
      </div>

      {/* Corner accents */}
      <div
        className="absolute top-0 left-0 w-16 h-16"
        style={{
          borderTop: "1px solid rgba(0,255,157,0.3)",
          borderLeft: "1px solid rgba(0,255,157,0.3)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-16 h-16"
        style={{
          borderBottom: "1px solid rgba(255,0,60,0.3)",
          borderRight: "1px solid rgba(255,0,60,0.3)",
        }}
      />
    </div>
  )
}

export function OriginStorySection() {
  const [sparkles] = useState(() =>
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      delay: Math.random() * 3,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 2 + Math.random() * 2,
      sparkleOpacity: 0.4 + Math.random() * 0.4,
    }))
  )

  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
      })
    }
    const el = containerRef.current
    if (el) el.addEventListener("mousemove", handleMouseMove)
    return () => {
      if (el) el.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <section id="origin" className="relative py-24 sm:py-32 lg:py-40 overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, rgba(0,255,157,0.08) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div
        ref={containerRef}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <div>
            <ScrollReveal>
              <span
                className="inline-block px-3 py-1 text-xs font-sans font-medium rounded-full border mb-6"
                style={{
                  borderColor: "rgba(0,255,157,0.3)",
                  color: "#00ff9d",
                  backgroundColor: "rgba(0,255,157,0.05)",
                }}
              >
                THE ORIGIN
              </span>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground leading-tight tracking-tight mb-6">
                <TextScramble
                  text="How It Works"
                  delay={200}
                  as="span"
                />
                <br />
                <span className="text-muted-foreground text-xl sm:text-2xl lg:text-3xl font-normal">
                  {"(According to 13-Year-Old Tanmay)"}
                </span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div
                className="space-y-4 text-base sm:text-lg leading-relaxed relative pl-6 border-l-2"
                style={{
                  borderColor: "rgba(0,255,157,0.2)",
                  color: "rgba(245,245,245,0.7)",
                  fontStyle: "italic",
                }}
              >
                <p>
                  {'"Imagine the air around a Fire Truck is made of '}
                  <span style={{ color: "#00ff9d" }}>magic sparkles</span>
                  {'..."'}
                </p>
                <p>
                  {'"The traffic lights \'smell\' these sparkles and shout '}
                  <span style={{ color: "#ff003c" }}>FREEZE!</span>
                  {'"'}
                </p>
                <p>
                  {'"All the cars stop, and the Fire Truck zooms through like a superhero!"'}
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={400}>
              <div className="mt-8 flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-display font-bold"
                  style={{
                    backgroundColor: "rgba(0,255,157,0.1)",
                    color: "#00ff9d",
                    border: "1px solid rgba(0,255,157,0.3)",
                  }}
                >
                  T
                </div>
                <div>
                  <p className="font-display text-sm font-bold text-foreground">
                    Tanmay
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Age 13 - The original idea
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Visual - Animated Tech Diagram */}
          <ScrollReveal delay={300} direction="right">
            <TechDiagramVisual mousePos={mousePos} />
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
