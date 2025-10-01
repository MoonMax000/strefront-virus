import ProfileScreen from '@/screens/Profile';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile',
};

export default function Profile() {
  return <ProfileScreen />;
}
