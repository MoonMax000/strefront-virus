import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {  
  const response = NextResponse.next()
  const pathname = request.nextUrl.pathname
  
  response.headers.set('x-pathname', pathname)
  
  return response
}

export const config = {
  matcher: [
    // Исключаем статические файлы
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ]
}