import SubscribesJsonLd from '@/components/jsonLd/SubscribesJsonLd';
import SubscribesScreen from '@/screens/Subscrebes';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Subscriptions | Tyrian Trade',
  description: '❱❱❱ Watch Your Subscriptions. ⚡ Look at What You Choose Yourself. ✨ Everything for Informed Stock Trading & Investing',
};

export default function Profile() {
  return (
    <>
      <SubscribesJsonLd />
      <SubscribesScreen />
    </>
  );
}
