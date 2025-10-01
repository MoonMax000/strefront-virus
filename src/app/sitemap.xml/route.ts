import { getSiteName } from '@/utils/getSiteName';
import { NextResponse } from 'next/server';

export async function GET() {
  const site = getSiteName();

  // Можно докинуть динамики, просто стянув данные и обновить массив
  const urls = [
    '/home',
    '/recommendations',
    '/subscribes',
    '/categories',
  ];
  const urlSet = urls
    .map(
      (path) => `<url><loc>${site}${path}</loc><changefreq>daily</changefreq><priority>1.0</priority></url>`
    )
    .join('\n  ')


  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urlSet}    
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
} 