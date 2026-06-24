import { NextRequest, NextResponse } from 'next/server'

const LOCALE_CODES = ['ar', 'zh', 'de', 'fr', 'nl', 'es', 'it']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const segments = pathname.split('/').filter(Boolean)

  if (segments.length > 0 && LOCALE_CODES.includes(segments[0])) {
    const locale = segments[0]
    const rest = segments.length > 1 ? '/' + segments.slice(1).join('/') : '/'
    const url = request.nextUrl.clone()
    url.pathname = rest
    url.searchParams.set('locale', locale)
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!admin|api|_next|_static|.*\\..*).*)', '/'],
}
