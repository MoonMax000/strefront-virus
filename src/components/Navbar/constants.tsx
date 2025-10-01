import HomeIcon from '@/assets/icons/nav/icon-home.svg';
import ChanelsIcon from '@/assets/icons/nav/icon-chanels.svg';
import SubscribesIcon from '@/assets/icons/nav/icon-subscribes.svg';
import CategoryIcon from '@/assets/icons/nav/icon-category.svg';
import StockMarket from '@/assets/icons/nav/StockMarket.svg';
import IconCMC from '@/assets/icons/icon-cmc.svg';
import IconTerminal from '@/assets/icons/icon-terminal.svg';
import IconSocWeb from '@/assets/icons/icon-socweb.svg';
import IconDiary from '@/assets/icons/icon-diary.svg';
import IconAi from '@/assets/icons/icon-ai.svg';
import IconPortfolio from '@/assets/icons/portfolio.svg';
import IconMarcetplace from '@/assets/icons/marcetplace.svg';
import AIAssistant from '@/assets/icons/navbar/AIAssistant.svg';
import AltSeasonIndex from '@/assets/icons/navbar/AltSeasonIndex.svg';
import BTCDominance from '@/assets/icons/navbar/BTCDominance.svg';
import Calendar from '@/assets/icons/navbar/Calendar.svg';
import Cryptocurrency from '@/assets/icons/navbar/Cryptocurrency.svg';
import CryptocurrnecyTitle from '@/assets/icons/navbar/CryptocurrnecyTitle.svg';
import FearAndGreed from '@/assets/icons/navbar/FearAndGreed.svg';
import LiveStreaming from '@/assets/icons/navbar/LiveStreaming.svg';
import Markets from '@/assets/icons/navbar/Markets.svg';

import Portfolios from '@/assets/icons/navbar/Portfolios.svg';
import Research from '@/assets/icons/navbar/Research.svg';
import SocialNetwork from '@/assets/icons/navbar/SocialNetwork.svg';
import StockScreener from '@/assets/icons/navbar/StockScreener.svg';
import Terminal from '@/assets/icons/navbar/Terminal.svg';
import MarketPlace from '@/assets/icons/navbar/MarketPlace.svg';
import DividendCalendar from '@/assets/icons/navbar/DividendCalendar.svg';
import UserGroup from '@/assets/icons/navbar/UserGroup.svg';
import ChartTwo from '@/assets/icons/navbar/chart.svg';
import Chip from '@/assets/icons/navbar/Chip.svg';
import CodeScuare from '@/assets/icons/navbar/CodeScuare.svg';
import FolderLibary from '@/assets/icons/navbar/FolderLibary.svg';
import ChatsIcon from '@/assets/icons/navbar/chatsIcon.svg';
import IdeasIcon from '@/assets/icons/navbar/ideasIcon.svg';
import OpinionsIcon from '@/assets/icons/navbar/opinionsIcon.svg';
import AnalyticsIcon from '@/assets/icons/navbar/analyticsIcon.svg';
import SoftwaresIcon from '@/assets/icons/navbar/softwaresIcon.svg';
import IconCart from '@/assets/icons/nav/cart.svg';
import IconBox from '@/assets/icons/nav/box.svg';

import { ReactNode } from 'react';

export interface NavElementProps {
  icon: ReactNode;
  title: string;
  route?: string;
  children?: NavElementProps[];
}
export const navElements: NavElementProps[] = [
  { icon: <HomeIcon width={20} height={20} />, title: 'Home', route: '/home' },

  {
    icon: <StockMarket width={20} height={20} />,
    title: 'Stock Market',
    route: '/stock',
    children: [
      { icon: <IconBox width={20} height={20} />, title: 'Screener' },
      { icon: <IconBox width={20} height={20} />, title: 'Events Calendar' },
      { icon: <IconBox width={20} height={20} />, title: 'News' },
      { icon: <IconBox width={20} height={20} />, title: 'Stocks Comparison' },
    ],
  },

  {
    icon: <IconCMC />,
    title: 'Cryptocurrency',
    route: '/crypto',
    children: [{ icon: <IconBox width={20} height={20} />, title: 'Screener' }],
  },

  {
    icon: <IconSocWeb />,
    title: 'Social Network',
    route: process.env.NEXT_PUBLIC_SOCIAL_NETWORK_URL || 'https://socialweb.tyriantrade.com/',
    children: [
      { icon: <IconBox width={20} height={20} />, title: 'Feed' },
      { icon: <IconBox width={20} height={20} />, title: 'My page' },
      { icon: <IconBox width={20} height={20} />, title: 'Chats & Groups' },
    ],
  },

  {
    icon: <MarketPlace />,
    title: 'Marketplace',
    children: [
      { icon: <IconBox width={20} height={20} />, title: 'My Products' },
      { icon: <IconBox width={20} height={20} />, title: 'Cart' },
    ],
  },

  {
    icon: <LiveStreaming />,
    title: 'Live Streaming',
    children: [
      {
        icon: <IconBox width={20} height={20} />,
        title: 'Following',
        route:
          process.env.NEXT_PUBLIC_PROFILE_URL ??
          'https://profile.tyriantrade.com/live-streaming' +
            '?tab=subscriptions&section=mySubscribers',
      },
      {
        icon: <IconBox width={20} height={20} />,
        title: 'Subscriptions',
        route:
          process.env.NEXT_PUBLIC_PROFILE_URL ??
          'https://profile.tyriantrade.com/live-streaming' +
            '?tab=subscriptions&section=subscribedTo',
      },
    ],
  },

  {
    icon: <IconAi />,
    title: 'AI Assistant',
    route: process.env.NEXT_PUBLIC_AI_ASSISTANT_URL || 'https://aihelp.tyriantrade.com/',
    children: [
      { icon: <IconBox width={20} height={20} />, title: 'Following', route: '/Tech Analysis' },
    ],
  },

  { icon: <Calendar />, title: 'Calendar', route: '/calendar' },
  { icon: <IconPortfolio />, title: 'My Portfolios', route: '/calendar' },

  // {
  //   icon: <Terminal />,
  //   title: 'Terminal (DEMO)',
  //   route: process.env.NEXT_PUBLIC_TRADING_TERMINAL_URL || '/',
  // },
];
