"use client"

import { useEffect, useRef, useState } from "react"

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isWarning, setIsWarning] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const mousePos = useRef({ x: 0, y: 0 })
  const cursorPos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = `${e.clientX}px`
        cursorDotRef.current.style.top = `${e.clientY}px`
      }
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-hover]")
      ) {
        setIsHovering(true)
      }
      if (target.closest("[data-warning]")) {
        setIsWarning(true)
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-hover]")
      ) {
        setIsHovering(false)
      }
      if (target.closest("[data-warning]")) {
        setIsWarning(false)
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseover", handleMouseOver)
    document.addEventListener("mouseout", handleMouseOut)

    let animFrame: number
    const animate = () => {
      cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * 0.15
      cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * 0.15
      if (cursorRef.current) {
        cursorRef.current.style.left = `${cursorPos.current.x}px`
        cursorRef.current.style.top = `${cursorPos.current.y}px`
      }
      animFrame = requestAnimationFrame(animate)
    }
    animFrame = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseover", handleMouseOver)
      document.removeEventListener("mouseout", handleMouseOut)
      window.removeEventListener("resize", checkMobile)
      cancelAnimationFrame(animFrame)
    }
  }, [])

  if (isMobile) return null

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-[width,height,border-color] duration-300 ease-out rounded-full border-2"
        style={{
          width: isHovering ? 48 : 32,
          height: isHovering ? 48 : 32,
          borderColor: isWarning ? "#ff003c" : "#00ff9d",
          boxShadow: isWarning
            ? "0 0 15px rgba(255,0,60,0.4)"
            : "0 0 15px rgba(0,255,157,0.3)",
          mixBlendMode: "difference",
        }}
      />
      <div
        ref={cursorDotRef}
        className="fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full"
        style={{
          backgroundColor: isWarning ? "#ff003c" : "#00ff9d",
          boxShadow: isWarning
            ? "0 0 8px rgba(255,0,60,0.8)"
            : "0 0 8px rgba(0,255,157,0.8)",
        }}
      />
    </>
  )
}
