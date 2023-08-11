import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ChakraProvider } from "@/components/chakra-ui";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dealls Marketplace App',
  description: 'Dealls Marketplace App created by masadamsahid for FE technical assessment at Dealls!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <html lang="en">
    <body className={inter.className}>
      <ChakraProvider>
        {children}
      </ChakraProvider>
    </body>
    </html>
  )
}
