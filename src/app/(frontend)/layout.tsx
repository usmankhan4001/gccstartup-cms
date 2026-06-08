import React from 'react'
import './styles.css'

export const metadata = {
  title: 'GCC Startup — CMS',
  description: 'Content, leads and blog management for GCC Startup.',
}

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
