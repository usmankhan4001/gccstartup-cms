import './globals.css'
import { getLocale, isRtl } from '@/lib/locale'

export const metadata = { title: 'GCC Startup', description: 'Company Registration & Tax Optimization' }

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale()

  return (
    <html lang={locale} dir={isRtl(locale) ? 'rtl' : 'ltr'}>
      <head>
        <meta property="og:locale" content={locale === 'en' ? 'en_US' : locale} />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
