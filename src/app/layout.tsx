import type { Metadata } from 'next';
import { mainFont } from './fonts';
import './globals.css';
import { Providers } from '@/components/Providers';
import { headers } from 'next/headers';
import { getSiteName } from '@/utils/getSiteName';

export async function generateMetadata() {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '/';
  const cleanPath = pathname.split('?')[0];
  return {
    metadataBase: getSiteName(),
    title: 'Streaming servese',
    description: 'Streaming servese',
    alternates: {
      canonical: cleanPath,
    },
    icons: {
      icon: '/logo.svg',
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${mainFont.className}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
