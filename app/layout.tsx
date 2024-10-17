import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './../styles/globals.css'
import { Footer } from './../components/Footer'
import { ThemeProvider } from 'next-themes'
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Livana - Your Real Estate Partner',
  description: 'Livana offers top-notch property rentals, listings, and expert real estate consulting services.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider> 
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="flex flex-col min-h-screen">
              <header className="p-4 flex justify-between items-center">
                
               
              </header>

              
              <main className="flex-grow">
                {children}
              </main>

              
              <Footer />
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
