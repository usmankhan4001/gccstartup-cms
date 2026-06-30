import { notFound } from 'next/navigation'
import { getStaticPage, staticPageTitle } from '@/lib/staticPages'

type PageProps = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  return { title: staticPageTitle(slug) }
}

export default async function StaticSlugPage({ params }: PageProps) {
  const { slug } = await params
  const html = getStaticPage(slug)
  if (!html) return notFound()
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}
