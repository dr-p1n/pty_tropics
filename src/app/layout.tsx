import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Space_Grotesk } from 'next/font/google';
import '@/styles/index.css';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { PrivacyProvider } from '@/contexts/PrivacyContext';
import CookieConsent from '@/components/CookieConsent';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'PTY Tropics Advisors | Local Roots, Global Mind',
  description: 'Offshore and corporate structures for those who build different. International law firm in Panama.',
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' }
    ],
  },
};

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['300', '400', '500', '600', '700'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} antialiased`}>
        <LanguageProvider>
          <PrivacyProvider>
            {children}
            <CookieConsent />
          </PrivacyProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
