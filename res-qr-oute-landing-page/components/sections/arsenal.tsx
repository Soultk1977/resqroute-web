"use client"

import { useEffect, useRef, useState } from "react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { TextScramble } from "@/components/text-scramble"
import { Radio, Bluetooth, Brain, Map } from "lucide-react"

const features = [
  {
    icon: Radio,
    title: "Red Sea Effect",
    description:
      "Traffic lights detect approaching emergency vehicles via IR sensors and automatically switch to green. No internet. No delay. Just physics.",
    tag: "CORE",
    color: "#00ff9d",
  },
  {
    icon: Bluetooth,
    title: "Phone Whisper",
    description:
      "Hijacks Bluetooth Low Energy to push silent warnings to nearby smartphones. Drivers get a heads-up 500m before the ambulance arrives.",
    tag: "STEALTH",
    color: "#00ff9d",
  },
  {
    icon: Brain,
    title: "V2X Brain",
    description:
      "Teaching roads to talk to Teslas. Our V2X module speaks the language of connected vehicles, turning dumb intersections into smart ones.",
    tag: "FUTURE",
    color: "#00ff9d",
  },
  {
    icon: Map,
    title: "Ghost Map",
    description:
      "Every cleared route generates anonymized traffic flow data. Logistics companies pay premium for ghost corridors\u2014emergency-optimized paths.",
    tag: "REVENUE",
    color: "#ff003c",
  },
]

function HologramVisual({ activeIndex, mousePos }: { activeIndex: number; mousePos: { x: number; y: number } }) {
  const feature = features[activeIndex]
  const color = feature?.color || "#00ff9d"

  return (
    <div
      className="relative aspect-square rounded-2xl overflow-hidden"
      style={{
        background: `radial-gradient(ellipse at 50% 50%, ${color}08, transparent 70%)`,
        border: `1px solid ${color}20`,
      }}
    >
      {/* Grid background */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
        <defs>
          <pattern id="holo-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke={`${color}`} strokeOpacity="0.06" strokeWidth="0.5" />
          </pattern>
          <radialGradient id="holo-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={color} stopOpacity="0.15" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </radialGradient>
          <filter id="glow-filter">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <rect width="400" height="400" fill="url(#holo-grid)" />
        <circle cx="200" cy="200" r="160" fill="url(#holo-glow)" />
      </svg>

      {/* Feature-specific visualization */}
      <div
        className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-out"
        style={{
          transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
        }}
      >
        {activeIndex === 0 && <RedSeaVisual color={color} />}
        {activeIndex === 1 && <PhoneWhisperVisual color={color} />}
        {activeIndex === 2 && <V2XBrainVisual color={color} />}
        {activeIndex === 3 && <GhostMapVisual />}
      </div>

      {/* Scan line */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{ opacity: 0.3 }}
      >
        <div
          className="w-full h-px absolute"
          style={{
            background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
            animation: "scanlineMove 3s linear infinite",
          }}
        />
      </div>

      {/* Active feature label */}
      <div className="absolute bottom-4 left-4 right-4 z-10">
        <div
          className="px-4 py-3 rounded-lg backdrop-blur-md transition-all duration-500"
          style={{
            backgroundColor: "rgba(10,10,10,0.85)",
            border: `1px solid ${color}30`,
            boxShadow: `0 0 20px ${color}10`,
          }}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: color }}
            />
            <p
              className="font-display text-sm font-bold"
              style={{ color }}
            >
              {feature?.title}
            </p>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Hover a feature to see it in action
          </p>
        </div>
      </div>

      {/* Corner accents */}
      {[
        "top-0 left-0 border-t border-l",
        "top-0 right-0 border-t border-r",
        "bottom-0 left-0 border-b border-l",
        "bottom-0 right-0 border-b border-r",
      ].map((cls) => (
        <div
          key={cls}
          className={`absolute w-12 h-12 ${cls} transition-colors duration-500`}
          style={{ borderColor: `${color}40` }}
        />
      ))}
    </div>
  )
}

/* --- Feature 0: Red Sea Effect --- */
function RedSeaVisual({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 400 400" className="w-4/5 h-4/5" fill="none">
      {/* Intersection roads */}
      <rect x="170" y="0" width="60" height="400" fill={`${color}06`} stroke={`${color}15`} strokeWidth="1" />
      <rect x="0" y="170" width="400" height="60" fill={`${color}06`} stroke={`${color}15`} strokeWidth="1" />

      {/* Lane markings */}
      <line x1="200" y1="0" x2="200" y2="170" stroke={`${color}20`} strokeWidth="1" strokeDasharray="8 6" />
      <line x1="200" y1="230" x2="200" y2="400" stroke={`${color}20`} strokeWidth="1" strokeDasharray="8 6" />
      <line x1="0" y1="200" x2="170" y2="200" stroke={`${color}20`} strokeWidth="1" strokeDasharray="8 6" />
      <line x1="230" y1="200" x2="400" y2="200" stroke={`${color}20`} strokeWidth="1" strokeDasharray="8 6" />

      {/* Traffic light housing */}
      <rect x="235" y="155" width="16" height="32" rx="4" fill="#111" stroke={color} strokeWidth="1.5" />
      <circle cx="243" cy="167" r="4" fill={color}>
        <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="243" cy="179" r="4" fill="#ff003c" opacity="0.2" />

      {/* Stopped cars (top lane) */}
      <rect x="185" y="110" width="12" height="22" rx="3" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
      <rect x="185" y="80" width="12" height="22" rx="3" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
      <rect x="185" y="50" width="12" height="22" rx="3" fill="rgba(255,255,255,0.09)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" />

      {/* Stopped cars (bottom lane going up) */}
      <rect x="203" y="268" width="12" height="22" rx="3" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
      <rect x="203" y="298" width="12" height="22" rx="3" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />

      {/* Emergency vehicle (ambulance) rushing from left */}
      <g>
        <rect x="0" y="178" width="30" height="14" rx="3" fill="#ff003c" opacity="0.9">
          <animate attributeName="x" values="-30;180" dur="3s" repeatCount="indefinite" />
        </rect>
        {/* Flashing lights */}
        <circle cx="0" cy="178" r="3" fill="#ff003c">
          <animate attributeName="cx" values="-28;182" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;0.2;1" dur="0.3s" repeatCount="indefinite" />
        </circle>
        <circle cx="0" cy="178" r="3" fill="white">
          <animate attributeName="cx" values="-18;192" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.2;1;0.2" dur="0.3s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* IR wave rings from ambulance */}
      <circle cx="200" cy="200" r="20" stroke={color} strokeWidth="0.8" fill="none" opacity="0">
        <animate attributeName="r" values="20;80" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.6;0" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="200" cy="200" r="20" stroke={color} strokeWidth="0.8" fill="none" opacity="0">
        <animate attributeName="r" values="20;80" dur="2s" begin="0.7s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.4;0" dur="2s" begin="0.7s" repeatCount="indefinite" />
      </circle>
      <circle cx="200" cy="200" r="20" stroke={color} strokeWidth="0.8" fill="none" opacity="0">
        <animate attributeName="r" values="20;80" dur="2s" begin="1.4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.3;0" dur="2s" begin="1.4s" repeatCount="indefinite" />
      </circle>

      {/* Status text */}
      <text x="200" y="370" textAnchor="middle" fill={color} fontSize="10" fontFamily="monospace" opacity="0.6">
        {"SIGNAL DETECTED // GREEN CORRIDOR ACTIVE"}
      </text>
    </svg>
  )
}

/* --- Feature 1: Phone Whisper --- */
function PhoneWhisperVisual({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 400 400" className="w-4/5 h-4/5" fill="none">
      {/* Road */}
      <rect x="0" y="170" width="400" height="60" fill={`${color}06`} stroke={`${color}10`} strokeWidth="0.5" />
      <line x1="0" y1="200" x2="400" y2="200" stroke={`${color}15`} strokeWidth="1" strokeDasharray="12 8" />

      {/* Ambulance */}
      <g>
        <rect x="60" y="182" width="36" height="16" rx="4" fill="#ff003c" opacity="0.9" />
        <text x="78" y="194" textAnchor="middle" fill="white" fontSize="6" fontFamily="monospace">{"AMB"}</text>
        {/* Flashing */}
        <circle cx="64" cy="182" r="2" fill="#ff003c">
          <animate attributeName="opacity" values="1;0;1" dur="0.4s" repeatCount="indefinite" />
        </circle>
        <circle cx="92" cy="182" r="2" fill="white">
          <animate attributeName="opacity" values="0;1;0" dur="0.4s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* BLE signal arcs from ambulance */}
      <path d="M 100 190 Q 140 150 180 190" stroke="#3b82f6" strokeWidth="1" fill="none" opacity="0">
        <animate attributeName="opacity" values="0;0.6;0" dur="2s" repeatCount="indefinite" />
      </path>
      <path d="M 100 190 Q 160 120 220 190" stroke="#3b82f6" strokeWidth="0.8" fill="none" opacity="0">
        <animate attributeName="opacity" values="0;0.4;0" dur="2s" begin="0.3s" repeatCount="indefinite" />
      </path>
      <path d="M 100 190 Q 180 90 260 190" stroke="#3b82f6" strokeWidth="0.6" fill="none" opacity="0">
        <animate attributeName="opacity" values="0;0.3;0" dur="2s" begin="0.6s" repeatCount="indefinite" />
      </path>

      {/* Phone 1 - car ahead */}
      <g>
        <rect x="200" y="150" width="18" height="30" rx="3" fill="#111" stroke={color} strokeWidth="1" />
        <rect x="203" y="154" width="12" height="18" rx="1" fill={`${color}20`} />
        <text x="209" y="166" textAnchor="middle" fill={color} fontSize="5" fontFamily="monospace">{"!!!"}</text>
        {/* Notification ring */}
        <circle cx="209" cy="165" r="8" stroke={color} strokeWidth="0.5" fill="none" opacity="0">
          <animate attributeName="r" values="8;18" dur="1.5s" begin="0.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0" dur="1.5s" begin="0.5s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* Phone 2 */}
      <g>
        <rect x="270" y="130" width="18" height="30" rx="3" fill="#111" stroke={color} strokeWidth="1" />
        <rect x="273" y="134" width="12" height="18" rx="1" fill={`${color}20`} />
        <text x="279" y="146" textAnchor="middle" fill={color} fontSize="5" fontFamily="monospace">{"!!!"}</text>
        <circle cx="279" cy="145" r="8" stroke={color} strokeWidth="0.5" fill="none" opacity="0">
          <animate attributeName="r" values="8;18" dur="1.5s" begin="0.8s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0" dur="1.5s" begin="0.8s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* Phone 3 */}
      <g>
        <rect x="320" y="155" width="18" height="30" rx="3" fill="#111" stroke={color} strokeWidth="1" />
        <rect x="323" y="159" width="12" height="18" rx="1" fill={`${color}20`} />
        <text x="329" y="171" textAnchor="middle" fill={color} fontSize="5" fontFamily="monospace">{"!!!"}</text>
        <circle cx="329" cy="170" r="8" stroke={color} strokeWidth="0.5" fill="none" opacity="0">
          <animate attributeName="r" values="8;18" dur="1.5s" begin="1.1s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0" dur="1.5s" begin="1.1s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* Cars receiving signal */}
      <rect x="195" y="186" width="28" height="12" rx="2" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
      <rect x="265" y="188" width="28" height="12" rx="2" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
      <rect x="315" y="186" width="28" height="12" rx="2" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />

      {/* Distance label */}
      <line x1="78" y1="240" x2="280" y2="240" stroke={color} strokeWidth="0.5" strokeDasharray="2 2" opacity="0.4" />
      <text x="179" y="255" textAnchor="middle" fill={color} fontSize="9" fontFamily="monospace" opacity="0.5">{"500m BLE RANGE"}</text>

      {/* Status */}
      <text x="200" y="370" textAnchor="middle" fill={color} fontSize="10" fontFamily="monospace" opacity="0.6">
        {"BLE WHISPER // 3 DEVICES ALERTED"}
      </text>
    </svg>
  )
}

/* --- Feature 2: V2X Brain --- */
function V2XBrainVisual({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 400 400" className="w-4/5 h-4/5" fill="none">
      {/* Central brain node */}
      <circle cx="200" cy="180" r="40" fill={`${color}08`} stroke={color} strokeWidth="1.5" />
      <circle cx="200" cy="180" r="25" fill={`${color}05`} stroke={`${color}60`} strokeWidth="1" />
      {/* Brain pulse */}
      <circle cx="200" cy="180" r="40" stroke={color} strokeWidth="0.5" fill="none" opacity="0">
        <animate attributeName="r" values="40;70" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.4;0" dur="2s" repeatCount="indefinite" />
      </circle>
      {/* Brain icon lines */}
      <path d="M 190 170 Q 195 165 200 170 Q 205 175 210 170" stroke={color} strokeWidth="1.5" fill="none" />
      <path d="M 188 180 Q 195 175 200 180 Q 205 185 212 180" stroke={color} strokeWidth="1.5" fill="none" />
      <path d="M 190 190 Q 195 185 200 190 Q 205 195 210 190" stroke={color} strokeWidth="1.5" fill="none" />
      <text x="200" y="200" textAnchor="middle" fill={color} fontSize="8" fontFamily="monospace" opacity="0.8">{"V2X"}</text>

      {/* Connected vehicle 1 - Tesla */}
      <g>
        <rect x="60" y="90" width="44" height="18" rx="5" fill="#111" stroke={color} strokeWidth="1" />
        <text x="82" y="103" textAnchor="middle" fill={color} fontSize="6" fontFamily="monospace">{"TESLA"}</text>
        {/* Connection line */}
        <line x1="104" y1="99" x2="175" y2="165" stroke={color} strokeWidth="0.5" strokeDasharray="4 3">
          <animate attributeName="strokeDashoffset" values="0;-14" dur="1s" repeatCount="indefinite" />
        </line>
        <circle cx="140" cy="132" r="2" fill={color} opacity="0.6">
          <animate attributeName="opacity" values="0.2;0.8;0.2" dur="1s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* Connected vehicle 2 */}
      <g>
        <rect x="296" y="90" width="44" height="18" rx="5" fill="#111" stroke={color} strokeWidth="1" />
        <text x="318" y="103" textAnchor="middle" fill={color} fontSize="6" fontFamily="monospace">{"EV-02"}</text>
        <line x1="296" y1="99" x2="225" y2="165" stroke={color} strokeWidth="0.5" strokeDasharray="4 3">
          <animate attributeName="strokeDashoffset" values="0;-14" dur="1.2s" repeatCount="indefinite" />
        </line>
        <circle cx="260" cy="132" r="2" fill={color} opacity="0.6">
          <animate attributeName="opacity" values="0.8;0.2;0.8" dur="1.2s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* Traffic light node */}
      <g>
        <rect x="178" y="280" width="44" height="22" rx="5" fill="#111" stroke={color} strokeWidth="1" />
        <circle cx="192" cy="291" r="4" fill={color}>
          <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="208" cy="291" r="4" fill="#ff003c" opacity="0.3" />
        <line x1="200" y1="280" x2="200" y2="220" stroke={color} strokeWidth="0.5" strokeDasharray="4 3">
          <animate attributeName="strokeDashoffset" values="0;-14" dur="0.8s" repeatCount="indefinite" />
        </line>
      </g>

      {/* Intersection node */}
      <g>
        <rect x="55" y="250" width="50" height="18" rx="5" fill="#111" stroke={`${color}80`} strokeWidth="0.8" />
        <text x="80" y="263" textAnchor="middle" fill={`${color}80`} fontSize="6" fontFamily="monospace">{"INT-04"}</text>
        <line x1="105" y1="259" x2="178" y2="220" stroke={`${color}40`} strokeWidth="0.5" strokeDasharray="4 3">
          <animate attributeName="strokeDashoffset" values="0;-14" dur="1.5s" repeatCount="indefinite" />
        </line>
      </g>

      {/* Another intersection */}
      <g>
        <rect x="295" y="250" width="50" height="18" rx="5" fill="#111" stroke={`${color}80`} strokeWidth="0.8" />
        <text x="320" y="263" textAnchor="middle" fill={`${color}80`} fontSize="6" fontFamily="monospace">{"INT-07"}</text>
        <line x1="295" y1="259" x2="222" y2="220" stroke={`${color}40`} strokeWidth="0.5" strokeDasharray="4 3">
          <animate attributeName="strokeDashoffset" values="0;-14" dur="1.3s" repeatCount="indefinite" />
        </line>
      </g>

      {/* Data packets flowing */}
      <circle cx="0" cy="0" r="2" fill={color}>
        <animateMotion dur="2s" repeatCount="indefinite" path="M 104,99 L 175,165" />
      </circle>
      <circle cx="0" cy="0" r="2" fill={color}>
        <animateMotion dur="2.2s" repeatCount="indefinite" path="M 296,99 L 225,165" />
      </circle>

      <text x="200" y="370" textAnchor="middle" fill={color} fontSize="10" fontFamily="monospace" opacity="0.6">
        {"V2X MESH // 5 NODES CONNECTED"}
      </text>
    </svg>
  )
}

/* --- Feature 3: Ghost Map --- */
function GhostMapVisual() {
  const red = "#ff003c"
  const green = "#00ff9d"
  return (
    <svg viewBox="0 0 400 400" className="w-4/5 h-4/5" fill="none">
      {/* City blocks */}
      <rect x="40" y="40" width="70" height="50" rx="2" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
      <rect x="40" y="120" width="70" height="70" rx="2" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
      <rect x="140" y="40" width="90" height="50" rx="2" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
      <rect x="140" y="120" width="90" height="70" rx="2" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
      <rect x="260" y="40" width="100" height="50" rx="2" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
      <rect x="260" y="120" width="100" height="70" rx="2" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
      <rect x="40" y="220" width="70" height="80" rx="2" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
      <rect x="140" y="220" width="90" height="80" rx="2" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
      <rect x="260" y="220" width="100" height="80" rx="2" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />

      {/* Ghost corridor - highlighted path */}
      <path
        d="M 20,200 L 130,200 L 130,100 L 250,100 L 250,200 L 380,200"
        stroke={green}
        strokeWidth="3"
        fill="none"
        opacity="0.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <animate attributeName="opacity" values="0.2;0.6;0.2" dur="3s" repeatCount="indefinite" />
      </path>
      {/* Glow path */}
      <path
        d="M 20,200 L 130,200 L 130,100 L 250,100 L 250,200 L 380,200"
        stroke={green}
        strokeWidth="8"
        fill="none"
        opacity="0.08"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Moving dot along ghost corridor */}
      <circle cx="0" cy="0" r="4" fill={green}>
        <animateMotion
          dur="4s"
          repeatCount="indefinite"
          path="M 20,200 L 130,200 L 130,100 L 250,100 L 250,200 L 380,200"
        />
        <animate attributeName="opacity" values="0.6;1;0.6" dur="1s" repeatCount="indefinite" />
      </circle>
      {/* Trail dot */}
      <circle cx="0" cy="0" r="2" fill={green} opacity="0.4">
        <animateMotion
          dur="4s"
          begin="0.3s"
          repeatCount="indefinite"
          path="M 20,200 L 130,200 L 130,100 L 250,100 L 250,200 L 380,200"
        />
      </circle>

      {/* Data nodes along corridor */}
      <circle cx="130" cy="200" r="5" fill="#111" stroke={green} strokeWidth="1">
        <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="130" cy="100" r="5" fill="#111" stroke={green} strokeWidth="1">
        <animate attributeName="r" values="4;6;4" dur="2s" begin="0.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="250" cy="100" r="5" fill="#111" stroke={green} strokeWidth="1">
        <animate attributeName="r" values="4;6;4" dur="2s" begin="1s" repeatCount="indefinite" />
      </circle>
      <circle cx="250" cy="200" r="5" fill="#111" stroke={green} strokeWidth="1">
        <animate attributeName="r" values="4;6;4" dur="2s" begin="1.5s" repeatCount="indefinite" />
      </circle>

      {/* Regular traffic (congested - red) */}
      <path d="M 20,100 L 130,100" stroke={red} strokeWidth="1.5" opacity="0.3" strokeDasharray="4 4" />
      <path d="M 250,200 L 250,320" stroke={red} strokeWidth="1.5" opacity="0.3" strokeDasharray="4 4" />

      {/* Revenue data labels */}
      <rect x="280" y="330" width="90" height="24" rx="4" fill="#111" stroke={`${red}40`} strokeWidth="0.8" />
      <text x="325" y="346" textAnchor="middle" fill={red} fontSize="7" fontFamily="monospace">{"$$ PREMIUM"}</text>

      <text x="200" y="380" textAnchor="middle" fill={red} fontSize="10" fontFamily="monospace" opacity="0.6">
        {"GHOST CORRIDOR // REVENUE ACTIVE"}
      </text>
    </svg>
  )
}

export function ArsenalSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
      })
    }
    const el = sectionRef.current
    if (el) el.addEventListener("mousemove", handleMouseMove)
    return () => {
      if (el) el.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <section
      id="arsenal"
      ref={sectionRef}
      className="relative py-24 sm:py-32 lg:py-40 overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,255,157,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,157,0.5) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20">
          <ScrollReveal>
            <span
              className="inline-block px-3 py-1 text-xs font-sans font-medium rounded-full border mb-6"
              style={{
                borderColor: "rgba(0,255,157,0.3)",
                color: "#00ff9d",
                backgroundColor: "rgba(0,255,157,0.05)",
              }}
            >
              THE ARSENAL
            </span>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground leading-tight tracking-tight mb-4 text-balance">
              <TextScramble text="Hologram Features" delay={200} as="span" />
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p
              className="font-sans text-base sm:text-lg max-w-xl mx-auto leading-relaxed"
              style={{ color: "rgba(245,245,245,0.6)" }}
            >
              Four systems. Zero internet required. Infinite lives saved.
            </p>
          </ScrollReveal>
        </div>

        {/* Features grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Feature cards */}
          <div className="space-y-4">
            {features.map((feature, i) => (
              <ScrollReveal key={feature.title} delay={i * 100}>
                <button
                  data-feature-item
                  data-index={i}
                  className="group relative w-full text-left p-5 sm:p-6 rounded-xl transition-all duration-500"
                  style={{
                    backgroundColor:
                      activeIndex === i
                        ? `${feature.color}08`
                        : "transparent",
                    border: `1px solid ${
                      activeIndex === i
                        ? `${feature.color}30`
                        : "rgba(255,255,255,0.05)"
                    }`,
                    boxShadow:
                      activeIndex === i
                        ? `0 0 30px ${feature.color}08, inset 0 0 30px ${feature.color}03`
                        : "none",
                  }}
                  onClick={() => setActiveIndex(i)}
                  onMouseEnter={() => setActiveIndex(i)}
                  data-hover
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center transition-all duration-500"
                      style={{
                        backgroundColor:
                          activeIndex === i
                            ? `${feature.color}15`
                            : "rgba(255,255,255,0.03)",
                        border: `1px solid ${
                          activeIndex === i
                            ? `${feature.color}40`
                            : "rgba(255,255,255,0.05)"
                        }`,
                        boxShadow:
                          activeIndex === i
                            ? `0 0 15px ${feature.color}20`
                            : "none",
                      }}
                    >
                      <feature.icon
                        className="w-5 h-5 sm:w-6 sm:h-6 transition-all duration-500"
                        style={{
                          color:
                            activeIndex === i
                              ? feature.color
                              : "rgba(245,245,245,0.4)",
                          filter:
                            activeIndex === i
                              ? `drop-shadow(0 0 6px ${feature.color}60)`
                              : "none",
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3
                          className="font-display text-lg sm:text-xl font-bold transition-colors duration-500"
                          style={{
                            color:
                              activeIndex === i
                                ? feature.color
                                : "var(--foreground)",
                          }}
                        >
                          {feature.title}
                        </h3>
                        <span
                          className="px-2 py-0.5 text-[10px] font-display font-bold rounded-full transition-all duration-500"
                          style={{
                            backgroundColor: `${feature.color}${activeIndex === i ? "20" : "10"}`,
                            color: feature.color,
                            border: `1px solid ${feature.color}${activeIndex === i ? "50" : "20"}`,
                          }}
                        >
                          {feature.tag}
                        </span>
                      </div>
                      <p
                        className="font-sans text-sm sm:text-base leading-relaxed transition-colors duration-500"
                        style={{
                          color:
                            activeIndex === i
                              ? "rgba(245,245,245,0.7)"
                              : "rgba(245,245,245,0.4)",
                        }}
                      >
                        {feature.description}
                      </p>
                    </div>
                  </div>

                  {/* Active indicator */}
                  <div
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 rounded-full transition-all duration-500"
                    style={{
                      height: activeIndex === i ? "60%" : "0%",
                      backgroundColor: feature.color,
                      boxShadow:
                        activeIndex === i
                          ? `0 0 10px ${feature.color}60`
                          : "none",
                    }}
                  />
                </button>
              </ScrollReveal>
            ))}
          </div>

          {/* Hologram Visual */}
          <ScrollReveal delay={200} direction="right">
            <div className="sticky top-32 hidden lg:block">
              <HologramVisual activeIndex={activeIndex} mousePos={mousePos} />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
