import '@radix-ui/themes/styles.css';
import './theme-config.css';
import './globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import AuthProvider from '@/app/auth/Provider';
import {
  Container,
  Theme,
} from '@radix-ui/themes';

import { NavBar } from './NavBar';
import QueryClientProvider from './QueryClientProvider';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
})

export const metadata: Metadata = {
    title: 'Create Next App',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <QueryClientProvider>
                <AuthProvider>
                    <body className={inter.className}>
                        <Theme accentColor="violet">
                            <NavBar />
                            <main className="p-5">
                                <Container>{children}</Container>
                            </main>
                        </Theme>
                    </body>
                </AuthProvider>
            </QueryClientProvider>
        </html>
    )
}
