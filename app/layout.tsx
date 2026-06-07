import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import dynamic from 'next/dynamic';
import './globals.css';
import Navbar from '../components/Navbar';
import FloatingParticles from '../components/FloatingParticles';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// Dynamic import for AIWidget with SSR disabled to prevent hydration issues
const AIWidget = dynamic(() => import('../components/AIWidget'), {
  ssr: false,
});

export const metadata: Metadata = {
  title: 'Santhosh S | Software Developer Portfolio',
  description: 'Personal portfolio of Santhosh S, a Software Developer with 2+ years of experience specializing in Next.js, Angular, React.js, and real-time WebSockets.',
  keywords: ['Santhosh S', 'Software Developer', 'React Developer', 'Next.js Developer', 'Angular Developer', 'Chennai', 'Erode', 'Syncfusion', 'Portfolio'],
  authors: [{ name: 'Santhosh S' }],
  openGraph: {
    title: 'Santhosh S | Software Developer Portfolio',
    description: 'Explore Santhosh\'s software engineering experience, core skills, and web application projects.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Santhosh S Portfolio',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="antialiased min-h-screen flex flex-col justify-between selection:bg-indigo-500/30 selection:text-indigo-200">
        <FloatingParticles />
        <Navbar />
        
        {/* Main Content Area */}
        <main className="flex-grow">
          {children}
        </main>

        {/* Footer */}
        <footer className="w-full py-8 border-t border-white/5 bg-slate-950/40 backdrop-blur-md text-center text-xs sm:text-sm text-slate-500 font-medium">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>© {new Date().getFullYear()} Santhosh S. All rights reserved.</p>
            <p className="flex items-center gap-1.5">
              <span>Built with Next.js & .NET Core 8</span>
            </p>
          </div>
        </footer>

        {/* Dynamic Chat Widget */}
        <AIWidget />
      </body>
    </html>
  );
}
