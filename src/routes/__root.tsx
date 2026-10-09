import {
  HeadContent,
  Link,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import appCss from '../styles.css?url'
import { Layout } from '@/components/layout'
import { company } from '@/data/careers'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: `${company.name} 招聘 · 一起创造新可能` },
      { name: 'description', content: company.description },
      ...(!company.searchIndexing
        ? [{ name: 'robots', content: 'noindex, nofollow' }]
        : []),
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', type: 'image/svg+xml', href: '/careers-icon.svg' },
    ],
  }),
  shellComponent: ({ children }) => (
    <html lang="zh-CN">
      <head>
        <HeadContent />
      </head>
      <body>
        <Layout>{children}</Layout>
        <Scripts />
      </body>
    </html>
  ),
  notFoundComponent: () => (
    <div className="not-found">
      <p className="eyebrow">404 / PAGE NOT FOUND</p>
      <h1>这一页暂时不在这里。</h1>
      <p>你可以返回职位列表，继续寻找新的机会。</p>
      <Link to="/" hash="jobs" className="button primary">
        查看所有职位 ↗
      </Link>
    </div>
  ),
})
