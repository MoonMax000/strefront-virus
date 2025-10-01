'use client';
import React, { FC } from 'react';
import AIAssistant from '@/assets/icons/navbar/AIAssistant.svg';
import CryptocurrnecyTitle from '@/assets/icons/navbar/CryptocurrnecyTitle.svg';
import LiveStreaming from '@/assets/icons/navbar/LiveStreaming.svg';
import Portfolios from '@/assets/icons/navbar/Portfolios.svg';
import SocialNetwork from '@/assets/icons/navbar/SocialNetwork.svg';
import StockMarket from '@/assets/icons/navbar/StockMarket.svg';
import Terminal from '@/assets/icons/navbar/Terminal.svg';
import MarketPlace from '@/assets/icons/navbar/marketv2.svg';
import Candales from '@/assets/icons/navbar/candles.svg';

import Logo from '@/assets/logo.png';
import Image from 'next/image';
import { cn } from '@/utils/cn';

const productsLinks = [
  { label: 'Trader’s Journal', href: '#', icon: <Candales className='w-[24px] h-[24px]' /> },
  {
    label: 'Cryptocurrency',
    href: '#',
    icon: <CryptocurrnecyTitle className='w-[24px] h-[24px]' />,
  },

  { label: 'Trading Terminal', href: '#', icon: <Terminal className='w-[24px] h-[24px]' /> },

  { label: 'Social Network', href: '#', icon: <SocialNetwork className='w-[24px] h-[24px]' /> },
  { label: 'Marketplace', href: '#', icon: <MarketPlace className='w-[24px] h-[24px]' /> },
  { label: 'Portfolios', href: '#', icon: <Portfolios className='w-[24px] h-[24px]' /> },
  { label: 'AI Assistant', href: '#', icon: <AIAssistant className='w-[24px] h-[24px]' /> },
  { label: 'Stock Market', href: '#', icon: <Candales className='w-[24px] h-[24px]' /> },
];
const footerLinks = [
  {
    title: 'Resources',
    links: [{ label: 'AI', href: '#' }],
  },
  {
    title: 'Social',
    links: [
      { label: 'X/Twitter', href: '#' },
      { label: 'LinkedIn', href: '#' },
      { label: 'Instagram', href: '#' },
      { label: 'Youtube', href: '#' },
      { label: 'Facebook', href: '#' },
    ],
  },
];
interface IProps {
  classNames?: string;
}

const Footer: FC<IProps> = ({ classNames }) => (
  <footer
    className={cn(
      'custom-bg-blur mr-[38px] ml-[38px] pb-6 text-[15px] font-bold  rounded-tl-[48px] rounded-tr-[48px] border-[2px] border-b-0 border-[#181B22]',
      classNames,
    )}
  >
    <div className='gap-8 px-4 sm:px-8 md:px-16 xl:px-[310px]'>
      <div className='flex items-center gap-[8px] mt-[48px] mb-[24px]'>
        <Image src={Logo} className='w-[27.88px] h-[32px]' alt='Logo' />
        <span className='text-white text-[24px] font-bold'>Tyrian Trade</span>
      </div>
      <div className='flex flex-col md:flex-row md:justify-between md:items-start'>
        <div className='flex flex-col min-w-[200px]'>
          <div className='text-[#A06AFF] font-bold tracking-wider text-[19px] mb-[10px]'>
            Products
          </div>
          <div className='grid grid-cols-4 gap-x-[80px] gap-y-4'>
            {productsLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className='text-white'
                target='_blank'
                rel='noopener noreferrer'
              >
                <div className='inline-flex items-center gap-[8px]'>
                  {link.icon}
                  {link.label}
                </div>
              </a>
            ))}
          </div>
        </div>
        <div className='flex gap-12'>
          {footerLinks.map((section) => (
            <div key={section.title}>
              <div className='mb-2 text-[#A06AFF] font-bold tracking-wider text-[19px]'>
                {section.title}
              </div>
              <ul className='flex flex-col gap-2'>
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className='text-white'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className='mt-[48px] mb-[24px] text-[15px] text-[#B0B0B0] font-[500]'>
        Trading cryptocurrencies and financial instruments involves high risk and may result in
        losses exceeding your initial investment. All content on this website is for informational
        and educational purposes only and does not constitute financial advice. Prices and data may
        be inaccurate or delayed. TTYRIAN TRADE and its partners are not liable for any losses from
        using this website. Always do your own research and consult a professional if needed. Past
        performance is not a guarantee of future results. Trading on margin increases risk. Use of
        site content is prohibited without prior written consent. TTYRIAN TRADE may receive
        compensation from advertisers.
      </div>
      <div className='flex flex-col md:flex-row md:justify-between md:items-center gap-2 pt-6 border-t border-[#313338]'>
        <span className='text-[15px] font-bold text-[#B0B0B0]'>
          © 2025 – TTYRIAN TRADE – FZCO. All Rights Reserved.
        </span>
        <div className='flex flex-wrap gap-4 text-[15px] font-bold text-[#B0B0B0] divide-x divide-[#313338]'>
          <a href='#' className='px-4 first:pl-0'>
            House Rules
          </a>
          <a href='#' className='px-4'>
            Terms and Conditions
          </a>
          <a href='#' className='px-4'>
            Privacy Policy
          </a>
          <a href='#' className='px-4'>
            Risk Warning
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
