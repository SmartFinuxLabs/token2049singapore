import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Connextium · TOKEN2049 Singapore',
  description: 'Dynamic itinerary planner for Connextium during TOKEN2049 Singapore 2026.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
