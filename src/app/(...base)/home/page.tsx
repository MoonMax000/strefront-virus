import HomeJsonLd from '@/components/jsonLd/HomeJsonLd';
import HomeScreen from '@/screens/Home';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Live Streams on Trading & Investing | Tyrian Trade',
  description: '❱❱❱ Watch Live Streams on Trading & Investing. ⚡ Follow Your Favorite Traders & Investors. ✨ Everything for Informed Stock Trading & Investing',
};

export default function Home() {
  return (
    <>
      <HomeJsonLd />
      <HomeScreen />
    </>
  );
}
