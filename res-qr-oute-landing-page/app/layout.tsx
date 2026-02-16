import type { Metadata, Viewport } from "next"
import { Space_Grotesk, Inter } from "next/font/google"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  // This tells Next.js where your site lives. Change this if you buy a different domain.
  metadataBase: new URL('https://resqroute.vercel.app/'),

  title: "ResQRoute | Saving Lives at the Speed of Light",
  description:
    "India's first IoT-based Green Corridor system for emergency vehicles. Reducing ambulance travel time by 50% using LoRaWAN technology. No internet required.",
  
  keywords: [
    "emergency vehicle priority",
    "green corridor india",
    "traffic management system",
    "LoRaWAN iot project",
    "smart city traffic lights",
    "ResQRoute",
    "ambulance tracking",
    "save lives traffic",
  ],

  // How it looks on WhatsApp, LinkedIn, Facebook
  openGraph: {
    title: "ResQRoute | The Future of Emergency Response",
    description:
      "What if the city could see an ambulance coming? We built the tech to make traffic lights turn green automatically.",
    url: "https://resqroute.in",
    siteName: "ResQRoute",
    images: [
      {
        url: "/og-image.jpg", // This looks for public/og-image.jpg
        width: 1200,
        height: 630,
        alt: "ResQRoute Dashboard",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // How it looks on Twitter/X
  twitter: {
    card: "summary_large_image",
    title: "ResQRoute | Saving Lives at the Speed of Light",
    description:
      "18-year-old engineer builds 'Green Corridor' tech for Indian Ambulances. No internet required.",
    images: ["/og-image.jpg"],
  },

  // Verification for Google Search Console (Get this code later)
  verification: {
    google: "YOUR_GOOGLE_VERIFICATION_CODE", 
  },
}

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground overflow-x-hidden">
        {children}
        {/* Film grain overlay for that cyberpunk feel */}
        <div className="noise-overlay" aria-hidden="true" />
      </body>
    </html>
  )
}
