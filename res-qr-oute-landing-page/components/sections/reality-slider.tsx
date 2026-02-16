"use client"

import { useRef, useState, useCallback } from "react"
import Image from "next/image"
import { ScrollReveal } from "@/components/scroll-reveal"
import { TextScramble } from "@/components/text-scramble"

export function RealitySliderSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [sliderPos, setSliderPos] = useState(50)
  const [isDragging, setIsDragging] = useState(false)

  const updateSlider = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
      setSliderPos((x / rect.width) * 100)
    },
    []
  )

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true)
    updateSlider(e.clientX)
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging) updateSlider(e.clientX)
  }

  const handlePointerUp = () => setIsDragging(false)

  return (
    <section id="reality" className="relative py-24 sm:py-32 lg:py-40 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <ScrollReveal>
            <span
              className="inline-block px-3 py-1 text-xs font-sans font-medium rounded-full border mb-6"
              style={{
                borderColor: "rgba(255,0,60,0.3)",
                color: "#ff003c",
                backgroundColor: "rgba(255,0,60,0.05)",
              }}
            >
              REALITY CHECK
            </span>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground leading-tight tracking-tight mb-4 text-balance">
              <TextScramble text="The Kid Dreamt It." delay={200} as="span" />{" "}
              <br className="hidden sm:block" />
              <TextScramble text="The Engineer Is Building It." delay={500} as="span" />
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p
              className="font-sans text-base sm:text-lg max-w-xl mx-auto leading-relaxed"
              style={{ color: "rgba(245,245,245,0.6)" }}
            >
              {"Magic doesn't stop a heart attack. Engineering does. I traded sparkles for LoRaWAN."}
            </p>
          </ScrollReveal>
        </div>

        {/* Slider */}
        <ScrollReveal delay={300}>
          <div
            ref={containerRef}
            className="relative max-w-4xl mx-auto aspect-[16/10] sm:aspect-[16/9] rounded-xl overflow-hidden select-none touch-none"
            style={{
              border: "1px solid rgba(0,255,157,0.15)",
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            data-hover
          >
            {/* After image (bottom layer - engineer) */}
            <div className="absolute inset-0">
              <Image
                src="/work.jpg"
                alt="Engineer soldering a PCB at 3 AM - the engineering reality"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(10,10,10,0.8) 0%, transparent 50%)",
                }}
              />
              {/* After label */}
              <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6">
                <span
                  className="px-3 py-1 text-xs sm:text-sm font-display font-bold rounded-md"
                  style={{
                    backgroundColor: "rgba(0,255,157,0.15)",
                    color: "#00ff9d",
                    border: "1px solid rgba(0,255,157,0.3)",
                  }}
                >
                  REALITY
                </span>
              </div>
            </div>

            {/* Before image (top layer - drawing, clipped) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
            >
              <Image
                src="/drawing.jpg"
                alt="Child's crayon drawing of fire truck concept - the original dream"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(10,10,10,0.8) 0%, transparent 50%)",
                }}
              />
              {/* Before label */}
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6">
                <span
                  className="px-3 py-1 text-xs sm:text-sm font-display font-bold rounded-md"
                  style={{
                    backgroundColor: "rgba(255,0,60,0.15)",
                    color: "#ff003c",
                    border: "1px solid rgba(255,0,60,0.3)",
                  }}
                >
                  THE DREAM
                </span>
              </div>
            </div>

            {/* Slider handle */}
            <div
              className="absolute top-0 bottom-0 w-1 z-10 -translate-x-1/2"
              style={{
                left: `${sliderPos}%`,
                backgroundColor: "#00ff9d",
                boxShadow: "0 0 20px rgba(0,255,157,0.5)",
              }}
            >
              {/* Handle knob */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-transform duration-200"
                style={{
                  backgroundColor: "#0a0a0a",
                  border: "2px solid #00ff9d",
                  boxShadow: "0 0 20px rgba(0,255,157,0.4)",
                  transform: `translate(-50%, -50%) scale(${isDragging ? 1.2 : 1})`,
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 4L2 10L6 16M14 4L18 10L14 16"
                    stroke="#00ff9d"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            {/* Hint text */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
              <span
                className="text-xs font-sans px-3 py-1 rounded-full"
                style={{
                  backgroundColor: "rgba(10,10,10,0.8)",
                  color: "rgba(245,245,245,0.5)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                Drag to reveal
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
