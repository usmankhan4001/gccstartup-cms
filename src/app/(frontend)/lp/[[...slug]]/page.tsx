import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import { BlockRenderer } from '@/components/BlockRenderer'
import { generateHreflang, getBaseUrl, getLocale, localePath } from '@/lib/locale'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

const getSlug = (segments?: string[]) => {
  if (!segments?.length) return null
  return segments[segments.length - 1]
}

export async function generateMetadata({ params }: { params: Promise<{ slug?: string[] }> }): Promise<Metadata> {
  const { slug: segments } = await params
  const slug = getSlug(segments)
  if (!slug) return { title: 'Not Found' }

  const locale = await getLocale()
  const path = `/lp/${segments?.join('/')}`
  const payload = await getPayload({ config })
  const [res, settings] = await Promise.all([
    payload.find({ collection: 'landingPages', where: { slug: { equals: slug } }, locale: locale as any, limit: 1 }),
    payload.findGlobal({ slug: 'siteSettings', locale: locale as any }).catch(() => null),
  ])
  const doc: any = res.docs[0]
  const baseUrl = getBaseUrl((settings as any)?.siteUrl)

  return {
    title: doc?.seo?.metaTitle || (doc ? `${doc.title} - GCC Startup` : 'Landing Page - GCC Startup'),
    description: doc?.seo?.metaDescription || undefined,
    alternates: {
      canonical: `${baseUrl}${localePath(path, locale)}`,
      languages: generateHreflang(path, baseUrl),
    },
  }
}

export default async function LandingPageRoute({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug: segments } = await params
  const slug = getSlug(segments)
  if (!slug) notFound()

  const locale = await getLocale()

  try {
    const payload = await getPayload({ config })
    const res = await payload.find({
      collection: 'landingPages',
      where: { slug: { equals: slug } },
      locale: locale as any,
      depth: 2,
      limit: 1,
    })
    const doc: any = res.docs[0]
    if (!doc) notFound()
    return <BlockRenderer blocks={doc.layout} />
  } catch (error) {
    console.error(`[LandingPageRoute] failed to load landing page "${slug}":`, error)
    notFound()
  }
}
