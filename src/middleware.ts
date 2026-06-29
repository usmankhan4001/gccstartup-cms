import { NextRequest, NextResponse } from 'next/server'
import { defaultLocale, localeCodes } from '@/i18n/locales'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const segments = pathname.split('/').filter(Boolean)
  const requestHeaders = new Headers(request.headers)

  if (segments.length > 0 && localeCodes.includes(segments[0] as any)) {
    const locale = segments[0]
    const rest = segments.length > 1 ? '/' + segments.slice(1).join('/') : '/'
    const url = request.nextUrl.clone()
    url.pathname = rest
    requestHeaders.set('x-locale', locale)
    requestHeaders.set('x-pathname', rest)
    return NextResponse.rewrite(url, { request: { headers: requestHeaders } })
  }

  requestHeaders.set('x-locale', defaultLocale)
  requestHeaders.set('x-pathname', pathname)
  return NextResponse.next({ request: { headers: requestHeaders } })
}

export const config = {
  matcher: ['/((?!admin|api|_next|_static|.*\\..*).*)', '/'],
}
