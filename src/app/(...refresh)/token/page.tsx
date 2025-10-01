import Refresh from '@/screens/Refresh';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Refresh',
};

export default function Home() {
  return <Refresh />;
}
