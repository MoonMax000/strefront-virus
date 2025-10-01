import CategoriesJsonLd from '@/components/jsonLd/CategoriesJsonLd';
import CategoryScreen from '@/screens/Category';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Stream Categories | Tyrian Trade',
  description: '❱❱❱ Popular Stream Categories. ⚡ Spot Trading, Futures Trading, Education, Analytics, Trends, Investments. ✨ Everything for Informed Stock Trading & Investing',
};

export default function Home() {
  return (
    <>
      <CategoriesJsonLd />
      <CategoryScreen />
    </>
);
}
