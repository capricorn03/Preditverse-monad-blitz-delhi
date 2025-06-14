import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from "@/lib/auth-context";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PredictVerse - The Future of Prediction Markets',
  description: 'Reimagining prediction markets as social ecosystems, combining blockchain with GenAI capabilities for future-focused communities.',
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#0B1426',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          {children}
        </div>
        </AuthProvider>
      </body>
    </html>
  );
}