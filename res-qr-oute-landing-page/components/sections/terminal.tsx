"use client"

import { useEffect, useState, useRef } from "react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Send } from "lucide-react"

const autoLines = [
  "> Initializing ResQRoute Terminal...",
  "> Connection established.",
  "> Connecting to drones? Not yet. But soon.",
  "> What if the battery dies? Solar backup. Always.",
  "> Ready for input...",
]

export function TerminalSection() {
  const [lines, setLines] = useState<string[]>([])
  const [currentLine, setCurrentLine] = useState("")
  const [lineIndex, setLineIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [inputValue, setInputValue] = useState("")
  const [emailValue, setEmailValue] = useState("") 
  const [submitted, setSubmitted] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const terminalRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setIsVisible(true)
      },
      { threshold: 0.3 }
    )
    if (terminalRef.current) observer.observe(terminalRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return
    if (lineIndex >= autoLines.length) {
      setIsTyping(false)
      return
    }

    setIsTyping(true)
    const line = autoLines[lineIndex]

    if (charIndex < line.length) {
      const timeout = setTimeout(() => {
        setCurrentLine(line.slice(0, charIndex + 1))
        setCharIndex(charIndex + 1)
      }, 30 + Math.random() * 40)
      return () => clearTimeout(timeout)
    } else {
      const timeout = setTimeout(() => {
        setLines((prev) => [...prev, line])
        setCurrentLine("")
        setLineIndex(lineIndex + 1)
        setCharIndex(0)
      }, 500)
      return () => clearTimeout(timeout)
    }
  }, [lineIndex, charIndex, isVisible])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || !emailValue.trim()) return

    // Add user message to terminal immediately
    setLines((prev) => [
      ...prev,
      `> [USER]: ${inputValue}`,
      `> [EMAIL]: ${emailValue}`,
      "> Transmission started..."
    ])

    try {
      const formData = new FormData();
      // --- REPLACE THIS WITH YOUR REAL KEY ---
      formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_KEY!);
      // -------------------------------------
      formData.append("email", emailValue);
      formData.append("message", inputValue);
      formData.append("subject", "ResQRoute Terminal Message");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const result = await response.json();

      if (result.success) {
        setLines((prev) => [
          ...prev,
          "> [SUCCESS] Signal received by Tanmay's neural link.",
          "> We will contact you shortly at " + emailValue,
        ]);
        setInputValue("");
        setEmailValue("");
        setSubmitted(true);
      } else {
         setLines((prev) => [
          ...prev,
          "> [ERROR] Transmission failed. Satellites misaligned.",
        ]);
      }
    } catch (error) {
      setLines((prev) => [
          ...prev,
           "> [CRITICAL_ERROR] Network unreachable.",
        ]);
    }
  }

  return (
    <section id="terminal" className="relative py-24 sm:py-32 lg:py-40 overflow-hidden">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <ScrollReveal>
            <span
              className="inline-block px-3 py-1 text-xs font-sans font-medium rounded-full border mb-6"
              style={{
                borderColor: "rgba(0,255,157,0.3)",
                color: "#00ff9d",
                backgroundColor: "rgba(0,255,157,0.05)",
              }}
            >
              COMMAND LINE
            </span>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground leading-tight tracking-tight mb-4">
              {"Send to Tanmay's Brain"}
            </h2>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={200}>
          <div
            ref={terminalRef}
            className="relative rounded-xl overflow-hidden"
            style={{
              backgroundColor: "rgba(0,0,0,0.6)",
              border: "1px solid rgba(0,255,157,0.15)",
              boxShadow: "0 0 40px rgba(0,0,0,0.5)",
            }}
          >
            {/* Terminal header */}
            <div
              className="flex items-center gap-2 px-4 py-3 border-b"
              style={{ borderColor: "rgba(0,255,157,0.1)" }}
            >
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#ff003c" }} />
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#ffbb00" }} />
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#00ff9d" }} />
              <span
                className="ml-3 text-xs font-mono"
                style={{ color: "rgba(0,255,157,0.5)" }}
              >
                resqroute@terminal ~ $
              </span>
            </div>

            {/* Terminal body */}
            <div className="p-4 sm:p-6 min-h-[350px] font-mono text-xs sm:text-sm leading-relaxed flex flex-col justify-end">
              <div className="flex-1 overflow-y-auto mb-4 space-y-1">
                {lines.map((line, i) => (
                  <p
                    key={i}
                    className="break-words"
                    style={{
                      color: line.startsWith("> [ERROR]") || line.startsWith("> [CRITICAL") 
                        ? "#ff003c" 
                        : line.startsWith("> [SUCCESS]") 
                          ? "#00ff9d" 
                          : "rgba(0,255,157,0.7)",
                    }}
                  >
                    {line}
                  </p>
                ))}
                {currentLine && (
                  <p style={{ color: "rgba(0,255,157,0.7)" }}>
                    {currentLine}
                    <span className="typing-caret" />
                  </p>
                )}
              </div>

              {/* Input Form */}
              {!isTyping && !submitted && (
                <form onSubmit={handleSubmit} className="mt-2 flex flex-col gap-3 border-t border-green-500/20 pt-4">
                  
                  {/* Email Input */}
                  <div className="flex items-center gap-2">
                    <span style={{ color: "rgba(0,255,157,0.5)" }} className="whitespace-nowrap">email:</span>
                    <input
                      type="email"
                      required
                      value={emailValue}
                      onChange={(e) => setEmailValue(e.target.value)}
                      placeholder="your@email.com"
                      className="flex-1 bg-transparent border-b border-green-500/30 focus:border-green-500 outline-none font-mono text-xs sm:text-sm placeholder:text-muted-foreground/50 py-1"
                      style={{ color: "#00ff9d" }}
                    />
                  </div>

                  {/* Message Input */}
                  <div className="flex items-center gap-2">
                    <span style={{ color: "rgba(0,255,157,0.5)" }} className="whitespace-nowrap">cmd &gt;</span>
                    <input
                      type="text"
                      required
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 bg-transparent border-none outline-none font-mono text-xs sm:text-sm placeholder:text-muted-foreground/50"
                      style={{ color: "#00ff9d" }}
                    />
                    <button
                      type="submit"
                      className="flex-shrink-0 p-2 rounded-lg transition-all duration-300 hover:scale-110"
                      style={{
                        backgroundColor: "rgba(0,255,157,0.1)",
                        border: "1px solid rgba(0,255,157,0.3)",
                      }}
                    >
                      <Send className="w-4 h-4" style={{ color: "#00ff9d" }} />
                    </button>
                  </div>
                </form>
              )}

              {submitted && (
                <button 
                  onClick={() => {
                    setSubmitted(false);
                    setLines([]);
                    setLineIndex(0); // Reset animation
                  }}
                  className="mt-4 text-xs underline decoration-green-500/50 hover:text-green-400"
                  style={{ color: "rgba(0,255,157,0.7)" }}
                >
                  [ RESET TERMINAL ]
                </button>
              )}
            </div>

            {/* Scanline effect */}
            <div className="absolute inset-0 pointer-events-none scanline" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}