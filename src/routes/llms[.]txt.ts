import { createFileRoute } from '@tanstack/react-router'
import { company } from '@/data/careers'

export const Route = createFileRoute('/llms.txt')({
  server: {
    handlers: {
      GET: () =>
        new Response(
          `# ${company.name} 招聘\n${company.description}\n${company.preview ? '当前为预览，所有职位与品牌为示例，未开放真实投递。' : '在首页浏览职位，并访问各职位详情了解申请方式。'}`,
          { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
        ),
    },
  },
})
