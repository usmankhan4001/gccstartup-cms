import { getStaticPage, staticPageTitle } from '@/lib/staticPages'

export const metadata = {
  title: staticPageTitle(''),
  description: 'Company registration, banking, tax residency and global structuring support.',
}

export default function HomePage() {
  const html = getStaticPage('') || '<main>GCC Startup</main>'
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}
