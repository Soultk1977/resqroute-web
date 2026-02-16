"use client"

import { useState, useCallback } from "react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Wrench, X } from "lucide-react"

export function TrapSection() {
  const [showModal, setShowModal] = useState(false)
  const [crtOff, setCrtOff] = useState(false)

  const handleClick = useCallback(() => {
    setCrtOff(true)
    setTimeout(() => {
      setShowModal(true)
      setCrtOff(false)
    }, 500)
  }, [])

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div
        className={`mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center transition-transform duration-500 ${
          crtOff ? "crt-off" : ""
        }`}
      >
        <ScrollReveal>
          <span
            className="inline-block px-3 py-1 text-xs font-sans font-medium rounded-full border mb-6"
            style={{
              borderColor: "rgba(0,255,157,0.3)",
              color: "#00ff9d",
              backgroundColor: "rgba(0,255,157,0.05)",
            }}
          >
            TOP SECRET
          </span>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <button
            onClick={handleClick}
            className="group relative inline-flex items-center gap-3 px-8 py-5 sm:px-12 sm:py-6 rounded-xl font-display font-bold text-base sm:text-lg tracking-wider transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              backgroundColor: "rgba(0,255,157,0.05)",
              border: "2px solid rgba(0,255,157,0.3)",
              color: "#00ff9d",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(0,255,157,0.1)"
              e.currentTarget.style.boxShadow = "0 0 40px rgba(0,255,157,0.2), inset 0 0 40px rgba(0,255,157,0.05)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(0,255,157,0.05)"
              e.currentTarget.style.boxShadow = "none"
            }}
            data-hover
          >
            <Wrench className="w-5 h-5 sm:w-6 sm:h-6" />
            <span>CLICK FOR SCHEMATICS & CODE</span>
          </button>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <p className="mt-6 text-sm text-muted-foreground font-sans">
            Are you sure you have clearance?
          </p>
        </ScrollReveal>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.9)" }}
          onClick={() => setShowModal(false)}
        >
          <div
            className="relative max-w-md w-full p-8 rounded-2xl text-center animate-in fade-in zoom-in-95 duration-300"
            style={{
              backgroundColor: "#0f0f0f",
              border: "1px solid rgba(255,0,60,0.3)",
              boxShadow: "0 0 60px rgba(255,0,60,0.15)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              data-hover
            >
              <X className="w-5 h-5" />
            </button>

            {/* Pixel art police officer */}
            <div className="mb-6 inline-flex items-center justify-center">
              <div
                className="w-24 h-24 rounded-2xl flex items-center justify-center text-4xl"
                style={{
                  backgroundColor: "rgba(255,0,60,0.1)",
                  border: "1px solid rgba(255,0,60,0.3)",
                }}
              >
                <svg
                  viewBox="0 0 64 64"
                  className="w-16 h-16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Simple police badge */}
                  <rect x="24" y="8" width="16" height="8" rx="2" fill="#00ff9d" />
                  <circle cx="32" cy="24" r="12" fill="#1a1a1a" stroke="#ff003c" strokeWidth="2" />
                  <circle cx="28" cy="22" r="2" fill="#ff003c" />
                  <circle cx="36" cy="22" r="2" fill="#ff003c" />
                  <path d="M26 28 Q32 32 38 28" stroke="#ff003c" strokeWidth="2" fill="none" />
                  <rect x="26" y="38" width="12" height="16" rx="2" fill="#1a1a1a" stroke="#00ff9d" strokeWidth="1.5" />
                  <rect x="20" y="40" width="6" height="10" rx="2" fill="#1a1a1a" stroke="#00ff9d" strokeWidth="1" />
                  <rect x="38" y="40" width="6" height="10" rx="2" fill="#1a1a1a" stroke="#00ff9d" strokeWidth="1" />
                </svg>
              </div>
            </div>

            <h3
              className="font-display text-2xl font-bold mb-3"
              style={{ color: "#ff003c" }}
            >
              STOP!
            </h3>
            <p className="font-sans text-foreground mb-2">
              Top Secret Clearance Required.
            </p>
            <p className="font-sans text-muted-foreground text-sm mb-6">
              Nice try. The schematics are locked behind military-grade encryption.
              Go away.
            </p>

            <div
              className="px-4 py-3 rounded-lg text-xs font-mono text-left"
              style={{
                backgroundColor: "rgba(255,0,60,0.05)",
                border: "1px solid rgba(255,0,60,0.15)",
                color: "#ff003c",
              }}
            >
              <p>{'> ACCESS_DENIED'}</p>
              <p>{'> CLEARANCE_LEVEL: INSUFFICIENT'}</p>
              <p>{'> INCIDENT_LOGGED: true'}</p>
              <p>{'> IP_TRACKED: true'}</p>
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="mt-6 px-6 py-2 rounded-full text-sm font-display font-bold transition-all duration-300"
              style={{
                border: "1px solid rgba(255,0,60,0.3)",
                color: "#ff003c",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255,0,60,0.1)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent"
              }}
              data-hover
            >
              {"I'll Leave Quietly"}
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
