import type { Metadata } from 'next'
import { Source_Sans_3 } from 'next/font/google'

import './globals.css'
import Header from '@/components/Header/header'
import '../styles/variables.scss'
import { createContext, useEffect } from 'react'
import PageWrap from '@/components/PageWrap/PageWrap'
import Footer from '@/components/Footer/Footer'

export const inter = Source_Sans_3({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" id="page-root">
            <body className={inter.className}>
                <Header />
                {children}
                <Footer />
            </body>
        </html>
    )
}
