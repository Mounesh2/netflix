import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Netflix - Watch Movies & Shows',
  description: 'Netflix-like movie streaming',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#141414] text-white antialiased">
        {children}
      </body>
    </html>
  )
}
