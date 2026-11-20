import Navbar from '../app/navbar/header';
import Footer from '../app/navbar/footer';
import type { Metadata } from 'next';
import SalonJsonLd from "../components/SalonJsonLd";
import { Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mahlaha.com"),
  title: {
    default: 'Mahalaha Salon',          // Used on pages without an explicit title
    template: '%s | Mahlaha Salon',     // %s gets replaced by the child page's title
  },
  description: 'Discover haircuts, hair coloring, waxing, facials, and threading at Mahlaha Salon. Serving Waukee, West Des Moines, Clive, and Urbandale, Iowa.',
   applicationName: "Mahlaha Salon",
    alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.mahlaha.com",
    siteName: "Mahlaha Salon",
    title: "Mahlaha Salon | Haircuts & Beauty Services",
    description:
      "Explore haircuts, hair coloring, waxing, facials, and threading in the Des Moines metro area.",
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({children,}: {children: React.ReactNode;}) {
  return (
    <html lang="en" className={playfair.variable}>
      <body
        style={{
          margin: 0,
          padding: 0,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          fontFamily: 'var(--font-playfair)',
        }}
      >
        <SalonJsonLd />
        {/* Sticky wrapper */}
        <header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 50,
            backgroundColor: '#917070', // Required: prevents content from showing through
            width: '100%',
          }}
        >
          <Navbar />
        </header>

        {/* Content grows normally */}
        <main style={{ flex: 1, padding: '5px' }}>
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}