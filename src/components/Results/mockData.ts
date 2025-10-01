import { IAllChanelsEl } from '@/services/RecomendationService';
import market from '@/assets/mockCategory/spot.png';
import invest from '@/assets/mockCategory/invest.png';
import comunity from '@/assets/mockCategory/comunity.png';

const mockVideoUrls = [
  'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
];

export interface IMockCard {
  id: number;
  name: string;
  author: string;
  avatar: string;
  category: string;
  tags: string[];
  preview: string;
  description: string;
  url: string;
}

export const mockResults = [
  {
    id: 1,
    name: 'Instant Trades: Masterclass on...',
    author: 'MaximClass',
    avatar: '/avatar.jpg',
    category: 'Stock Market',
    tags: ['STOCKS', 'TRADES'],
    preview: '/previewStream.jpg',
    description: 'Investing in a new Solana solutions for the market',
    url: mockVideoUrls[0],
  },
  {
    id: 2,
    name: 'Profit Potential - Deep Dive!',
    author: 'SophiaLight',
    avatar: '/avatar2.jpg',
    category: 'Technical Analysis',
    tags: ['TA', 'ANALYSIS', 'EDU', 'PRO'],
    preview: '/streamPreview2.jpg',
    description: 'Investing in a new Solana solutions for the market',
    url: mockVideoUrls[1],
  },
  {
    id: 3,
    name: 'Bitcoin & Ethereum Market Analysis',
    author: 'DmitryIdea',
    avatar: '/avatar3.jpg',
    category: 'News&Reports',
    tags: ['NEWS'],
    preview: '/streamPreview3.jpg',
    description: 'Investing in a new Solana solutions for the market',
    url: mockVideoUrls[2],
  },
  {
    id: 4,
    name: 'Getting Started with trading for Begginers',
    author: 'XeniaJoy',
    avatar: '/avatar4.jpg',
    category: 'News&Reports',
    tags: ['NEWS'],
    preview: '/streamPreview4.jpg',
    description: 'Investing in a new Solana solutions for the market',
    url: mockVideoUrls[0],
  },
  {
    id: 5,
    name: 'Instant Trades: Masterclass on...',
    author: 'MaximClass',
    avatar: '/avatar.jpg',
    category: 'Stock Market',
    tags: ['STOCKS', 'TRADES'],
    preview: '/previewStream.jpg',
    description: 'Investing in a new Solana solutions for the market',
    url: mockVideoUrls[1],
  },
  {
    id: 6,
    name: 'Profit Potential - Deep Dive!',
    author: 'SophiaLight',
    avatar: '/avatar2.jpg',
    category: 'Technical Analysis',
    tags: ['TA', 'ANALYSIS', 'EDU', 'PRO'],
    preview: '/streamPreview2.jpg',
    description: 'Investing in a new Solana solutions for the market',
    url: mockVideoUrls[2],
  },
  {
    id: 7,
    name: 'Bitcoin & Ethereum Market Analysis',
    author: 'DmitryIdea',
    avatar: '/avatar3.jpg',
    category: 'News&Reports',
    tags: ['NEWS'],
    preview: '/streamPreview3.jpg',
    description: 'Investing in a new Solana solutions for the market',
    url: mockVideoUrls[0],
  },
  {
    id: 8,
    name: 'Getting Started with trading for Begginers',
    author: 'XeniaJoy',
    avatar: '/avatar4.jpg',
    category: 'News&Reports',
    tags: ['NEWS'],
    preview: '/streamPreview4.jpg',
    description: 'Investing in a new Solana solutions for the market',
    url: mockVideoUrls[1],
  },
];

export const mockChannels: IAllChanelsEl[] = [
  {
    id: '1',
    username: 'cryptoking',
    name: 'Crypto King',
    description: 'Ежедневный анализ крипторынка и торговые сигналы',
    avatar_url: '/avatar.jpg',
    cover_url: market.src,
    subscriber_count: 12500,
    donation_url: '',
    stream: {
      is_online: true,
      last_updated_at: Date.now() - 3600000,
      stream_name: 'Биткоин к 100к? Разбор рынка',
      viewer_count: 850,
      translation_url: '',
      stream_category: 'Crypto',
      stream_tags: ['BTC', 'ETH', 'ANALYSIS', 'TRADING'],
    },
  },
  {
    id: '2',
    username: 'stocks_pro',
    name: 'Stocks Professional',
    description: 'Анализ фондового рынка и инвестиционные стратегии',
    avatar_url: '/avatar2.jpg',
    cover_url: invest.src,
    subscriber_count: 8900,
    donation_url: '',
    stream: {
      is_online: false,
      last_updated_at: Date.now() - 86400000,
      stream_name: 'Дивидендные акции 2024',
      viewer_count: 0,
      translation_url: '',
      stream_category: 'Stocks',
      stream_tags: ['DIVIDENDS', 'INVESTING', 'ANALYSIS'],
    },
  },
  {
    id: '3',
    username: 'tech_trader',
    name: 'Tech Trader',
    description: 'Торговля акциями технологических компаний',
    avatar_url: '/avatar3.jpg',
    cover_url: comunity.src,
    subscriber_count: 15600,
    donation_url: '',
    stream: {
      is_online: true,
      last_updated_at: Date.now() - 1800000,
      stream_name: 'NASDAQ обновляет максимумы',
      viewer_count: 1200,
      translation_url: '',
      stream_category: 'Tech Stocks',
      stream_tags: ['NASDAQ', 'AAPL', 'TSLA', 'TECH'],
    },
  },
];

export const mockStreamers = [
  {
    name: 'Jane Doe',
    subscribers: '21.1K',
    description:
      'Hi, I’m Jane Doe. I talk about crypto, trading, and the economy in a way that’s easy to follow — no jargon, just real talk. Come hang out and learn with me, live.',
    avatar: '/streamerAvatar.jpg',
  },
  {
    name: 'Ava Steele',
    subscribers: '251.3K',
    description:
      'I’m Ava Steele — I focus on data, trends, and smart financial strategy. My streams cut through the noise so you can understand the why behind the markets. No hype — just insight.',
    avatar: '/avatar2.jpg',
  },
  {
    name: 'Riley Knox',
    subscribers: '1,300',
    description:
      'Yo, I’m Riley Knox. I dive into crypto madness, meme coins, market meltdowns — and yeah, I’ve got opinions. Come for the charts, stay for the chaos. It’s fun here.',
    avatar: '/streamerAvatar2.jpg',
  },
  {
    name: 'Mia Lark',
    subscribers: '131.4K',
    description:
      'Hey, I’m Mia. I’m learning crypto and trading right alongside you — sharing tips, mistakes, and small wins live. It’s not about being perfect — it’s about figuring it out together.',
    avatar: '/streamerAvatar3.jpg',
  },
];
