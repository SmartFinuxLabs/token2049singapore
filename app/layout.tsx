import './globals.css';
import type { Metadata } from 'next';
import DashboardNav from '@/components/DashboardNav';

export const metadata: Metadata = {
  title: 'Connextium · TOKEN2049 Singapore Dashboard',
  description: 'TOKEN2049 Singapore itinerary and public ecosystem analytics dashboard for Connextium.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <DashboardNav />
        {children}
      </body>
    </html>
  );
}
