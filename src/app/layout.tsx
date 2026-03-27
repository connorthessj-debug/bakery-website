import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = { title: 'bakery website', description: 'i would like a website with functionality for a bakery' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>
}
