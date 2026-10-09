import { createFileRoute } from '@tanstack/react-router'
import siteConfig from '../../site.config'
import { company, jobs } from '@/data/careers'

export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: () =>
        new Response(
          `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${!company.searchIndexing ? '' : ['/', ...jobs.map((job) => `/jobs/${job.id}`)].map((path) => `<url><loc>${siteConfig.url}${path}</loc></url>`).join('')}</urlset>`,
          { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
        ),
    },
  },
})
