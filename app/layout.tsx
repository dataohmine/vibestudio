import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'VibeStudio - Visual Coding for Kids',
  description: 'A fun and educational visual programming platform designed for children to learn coding through creativity and play.',
  keywords: 'coding for kids, visual programming, Scratch alternative, educational software, programming education',
  authors: [{ name: 'DataOhmine' }],
  openGraph: {
    title: 'VibeStudio - Visual Coding for Kids',
    description: 'Learn programming through visual blocks, animations, and interactive games!',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}