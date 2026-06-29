import './globals.css'
import { getPayload } from 'payload'
import config from '@payload-config'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { getLocale, isRtl } from '@/lib/locale'

export const metadata = { title: 'GCC Startup', description: 'Company Registration & Tax Optimization' }

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  let settings: any = {}
  const locale = await getLocale()

  try {
    const payload = await getPayload({ config })
    settings = await payload.findGlobal({ slug: 'siteSettings', locale: locale as any })
  } catch (error) {
    console.error('[layout] failed to load site settings', error)
  }

  return (
    <html lang={locale} dir={isRtl(locale) ? 'rtl' : 'ltr'}>
      <head>
        <meta property="og:locale" content={locale === 'en' ? 'en_US' : locale} />
      </head>
      <body>
        <LivePreviewListener />
        <SiteHeader settings={settings} locale={locale} />
        <main>{children}</main>
        <SiteFooter settings={settings} />
      </body>
    </html>
  )
}
