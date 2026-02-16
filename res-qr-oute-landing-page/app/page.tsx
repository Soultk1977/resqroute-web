"use client"

import { CustomCursor } from "@/components/custom-cursor"
import { MouseGlow } from "@/components/mouse-glow"
import { Navbar } from "@/components/sections/navbar"
import { HeroSection } from "@/components/sections/hero"
import { OriginStorySection } from "@/components/sections/origin-story"
import { RealitySliderSection } from "@/components/sections/reality-slider"
import { WatchdogSection } from "@/components/sections/watchdog"
import { TrapSection } from "@/components/sections/trap"
import { ArsenalSection } from "@/components/sections/arsenal"
import { TerminalSection } from "@/components/sections/terminal"
import { Footer } from "@/components/sections/footer"

export default function Home() {
  return (
    <>
      <CustomCursor />
      <MouseGlow />
      <Navbar />

      <main>
        <HeroSection />

        {/* Divider */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className="h-px w-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(0,255,157,0.2), transparent)",
            }}
          />
        </div>

        <OriginStorySection />

        {/* Divider */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className="h-px w-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(0,255,157,0.15), transparent)",
            }}
          />
        </div>

        <RealitySliderSection />

        {/* Divider */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className="h-px w-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,0,60,0.2), transparent)",
            }}
          />
        </div>

        <WatchdogSection />

        <TrapSection />

        {/* Divider */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className="h-px w-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(0,255,157,0.2), transparent)",
            }}
          />
        </div>

        <ArsenalSection />

        {/* Divider */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className="h-px w-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(0,255,157,0.15), transparent)",
            }}
          />
        </div>

        <TerminalSection />
      </main>

      <Footer />
    </>
  )
}
