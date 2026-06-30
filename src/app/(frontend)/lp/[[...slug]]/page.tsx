import { notFound } from 'next/navigation'
import { getStaticPage, staticPageTitle } from '@/lib/staticPages'

type PageProps = { params: Promise<{ slug?: string[] }> }

export async function generateMetadata({ params }: PageProps) {
  const { slug = [] } = await params
  return { title: staticPageTitle(`lp/${slug.join('/')}`) }
}

export default async function StaticLandingPage({ params }: PageProps) {
  const { slug = [] } = await params
  const html = getStaticPage(`lp/${slug.join('/')}`)
  if (!html) return notFound()
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}
