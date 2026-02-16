"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Menu, X, Github, Linkedin, Mail } from "lucide-react"

const navLinks = [
  { label: "How It Works", href: "#origin" },
  { label: "Reality", href: "#reality" },
  { label: "Features", href: "#arsenal" },
  { label: "Contact", href: "#terminal" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollTo = (href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/70 backdrop-blur-xl border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2"
            data-hover
          >
            <Image
              src="/logo.png""
              alt="ResQRoute logo"
              width={40}
              height={40}
              className="w-8 h-8 sm:w-10 sm:h-10"
            />
            <span className="font-display text-lg sm:text-xl font-bold tracking-tight text-foreground">
              Res<span style={{ color: "#00ff9d" }}>Q</span>Route
            </span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-sm font-sans text-muted-foreground hover:text-foreground transition-colors relative group"
                data-hover
              >
                {link.label}
                <span
                  className="absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full"
                  style={{ backgroundColor: "#00ff9d" }}
                />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {/* Social icons - desktop only */}
            <div className="hidden lg:flex items-center gap-1">
              {[
                { icon: Github, href: "https://github.com/Soultk1977", label: "GitHub" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/tanmay-singh-638554349/", label: "LinkedIn" },
                { icon: Mail, href: "mailto:soultk1977@gmail.com", label: "Email" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("mailto") ? undefined : "_blank"}
                  rel={s.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  className="w-8 h-8 rounded-md flex items-center justify-center transition-all duration-300"
                  style={{ color: "rgba(245,245,245,0.4)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#00ff9d"
                    e.currentTarget.style.backgroundColor = "rgba(0,255,157,0.08)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(245,245,245,0.4)"
                    e.currentTarget.style.backgroundColor = "transparent"
                  }}
                  aria-label={s.label}
                  data-hover
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            <button
              onClick={() => scrollTo("#terminal")}
              className="hidden sm:block px-5 py-2 text-sm font-display font-bold rounded-full border transition-all duration-300 hover:shadow-lg"
              style={{
                borderColor: "#00ff9d",
                color: "#00ff9d",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#00ff9d"
                e.currentTarget.style.color = "#0a0a0a"
                e.currentTarget.style.boxShadow = "0 0 30px rgba(0,255,157,0.4)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent"
                e.currentTarget.style.color = "#00ff9d"
                e.currentTarget.style.boxShadow = "none"
              }}
              data-hover
            >
              Join Waitlist
            </button>

            <button
              className="md:hidden text-foreground"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-background/95 backdrop-blur-xl border-t border-border/50 px-4 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="text-left text-lg font-sans text-muted-foreground hover:text-foreground transition-colors py-2"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("#terminal")}
            className="mt-2 px-5 py-3 text-sm font-display font-bold rounded-full border text-center"
            style={{
              borderColor: "#00ff9d",
              color: "#00ff9d",
            }}
          >
            Join Waitlist
          </button>
          {/* Mobile social icons */}
          <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border/30">
            {[
              { icon: Github, href: "https://github.com/Soultk1977", label: "GitHub" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/tanmay-singh-638554349/", label: "LinkedIn" },
              { icon: Mail, href: "mailto:soultk1977@gmail.com", label: "Email" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("mailto") ? undefined : "_blank"}
                rel={s.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{
                  backgroundColor: "rgba(0,255,157,0.05)",
                  border: "1px solid rgba(0,255,157,0.15)",
                  color: "rgba(0,255,157,0.7)",
                }}
                aria-label={s.label}
              >
                <s.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
