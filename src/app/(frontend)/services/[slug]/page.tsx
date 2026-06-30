import { notFound } from 'next/navigation'
import { getStaticPage, staticPageTitle } from '@/lib/staticPages'

type PageProps = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  return { title: staticPageTitle(`services/${slug}`) }
}

export default async function StaticServicePage({ params }: PageProps) {
  const { slug } = await params
  const html = getStaticPage(`services/${slug}`)
  if (!html) return notFound()
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}
