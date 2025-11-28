import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

export const metadata: Metadata = {
  title: {
    default: "IGCSE GCSE Maths | Expert Tutoring & Resources",
    template: "%s | IGCSE GCSE Maths",
  },
  description: "Expert GCSE and IGCSE Maths tutoring for students in UK, UAE, Qatar, GCC, and Asia. 1-to-1 lessons, group classes, solved past papers, predicted papers, and worksheets.",
  keywords: ["GCSE Maths", "IGCSE Maths", "Maths tutor", "Edexcel", "Cambridge", "past papers", "predicted papers", "online tutoring"],
  authors: [{ name: "Faraz Hassan" }],
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://igcsegcsemaths.com",
    siteName: "IGCSE GCSE Maths",
    title: "IGCSE GCSE Maths | Expert Tutoring & Resources",
    description: "Expert GCSE and IGCSE Maths tutoring for students in UK, UAE, Qatar, GCC, and Asia.",
  },
  twitter: {
    card: "summary_large_image",
    title: "IGCSE GCSE Maths | Expert Tutoring & Resources",
    description: "Expert GCSE and IGCSE Maths tutoring for students in UK, UAE, Qatar, GCC, and Asia.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background font-sans`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  )
}
