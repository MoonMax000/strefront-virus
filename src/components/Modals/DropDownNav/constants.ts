import IconProfile from '@/assets/icons/user-menu/logo-profile.svg';
import IconSettings from '@/assets/icons/user-menu/icon-settings.svg';
import HomeIcon from '@/assets/icons/nav/icon-home.svg';
import IconNotifications from '@/assets/icons/notification.svg';
import IconUserGroup from '@/assets/icons/navbar/UserGroup.svg';
import IconApi from '@/assets/icons/user-menu/api.svg';
import IconUserQuestion from '@/assets/icons/user-menu/user-qustion.svg';
import IconConsole from '@/assets/icons/user-menu/console.svg';
import { MenuItem } from './types';

export const menuItems: MenuItem[] = [
  {
    label: 'Dashboard',
    icon: HomeIcon,
    href:
      (process.env.NEXT_PUBLIC_PROFILE_URL ?? 'https://profile.tyriantrade.com/') + '/dashboard',
  },
  {
    label: 'Profile',
    icon: IconProfile,
    href:
      (process.env.NEXT_PUBLIC_PROFILE_URL ?? 'https://profile.tyriantrade.com/') +
      'live-streaming',
  },
  {
    label: 'Security',
    icon: IconSettings,
    href: '#',
  },
  {
    label: 'Notifications',
    icon: IconNotifications,
    href:
      (process.env.NEXT_PUBLIC_PROFILE_URL ?? 'https://profile.tyriantrade.com/') +
      'profile_settings',
  },
  {
    label: 'Billing',
    icon: IconConsole,
    href:
      (process.env.NEXT_PUBLIC_PROFILE_URL ?? 'https://profile.tyriantrade.com/') +
      'profile_settings',
  },
  {
    label: 'Referrals',
    icon: IconUserGroup,
    href:
      (process.env.NEXT_PUBLIC_PROFILE_URL ?? 'https://profile.tyriantrade.com/') +
      'profile_settings',
  },
  {
    label: 'API',
    icon: IconApi,
    href:
      (process.env.NEXT_PUBLIC_PROFILE_URL ?? 'https://profile.tyriantrade.com/') +
      'profile_settings',
  },
  {
    label: 'KYC',
    icon: IconUserQuestion,
    href:
      (process.env.NEXT_PUBLIC_PROFILE_URL ?? 'https://profile.tyriantrade.com/') +
      'profile_settings',
  },
];
