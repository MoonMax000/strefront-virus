import RecommendationsJsonLd from '@/components/jsonLd/RecommendationsJsonLd';
import RecommendationsScreen from '@/screens/Recommendations';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Stream Recommendations Feed | Tyrian Trade',
  description: '❱❱❱ Watch Live Streams on Trading & Investing. ⚡ Follow Your Personal Recommendations. ✨ Everything for Informed Stock Trading & Investing',
};

export default function Recommendations() {
  return (
    <>
      <RecommendationsJsonLd />
      <RecommendationsScreen />
    </>
  )
}
