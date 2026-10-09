import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import {
  ArrowLeft,
  ArrowUpRight,
  BriefcaseBusiness,
  Clock3,
  MapPin,
} from 'lucide-react'
import { applicationUrl, company, jobs } from '@/data/careers'

export const Route = createFileRoute('/jobs/$jobId')({
  loader: ({ params }) => {
    const job = jobs.find((item) => item.id === params.jobId)
    if (!job) throw notFound()
    return job
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? '职位'} · ${company.name} 招聘` },
      { name: 'description', content: loaderData?.summary ?? '' },
    ],
  }),
  component: JobPage,
})
function JobPage() {
  const job = Route.useLoaderData()
  const url = applicationUrl(job)
  return (
    <div className="wrap detail-page">
      <Link to="/" hash="jobs" className="text-link">
        <ArrowLeft size={17} /> 返回所有职位
      </Link>
      <div className="detail-grid">
        <article>
          <p className="eyebrow">
            {job.department} / {job.english.toUpperCase()}
          </p>
          <h1>{job.title}</h1>
          <div className="detail-meta">
            <span>
              <MapPin size={16} />
              {job.location}
            </span>
            <span>
              <BriefcaseBusiness size={16} />
              {job.type === '待确认' ? '用工类型待确认' : job.type}
            </span>
            {job.experience && (
              <span>
                <Clock3 size={16} />
                {job.experience}
              </span>
            )}
            {job.headcount && <span>招聘 {job.headcount}</span>}
            {job.salary && <span>薪资：{job.salary}</span>}
          </div>
          <p className="job-lead">{job.summary}</p>
          {company.preview && (
            <p className="detail-notice">
              此为示例职位，职责、要求及工作地点需由公司确认后正式发布。
            </p>
          )}
          <h2>你将参与的事情</h2>
          <ul>
            {job.responsibilities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h2>我们期待这样的你</h2>
          <ul>
            {job.requirements.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          {job.bonus.length > 0 && (
            <>
              <h2>加分项</h2>
              <ul>
                {job.bonus.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </>
          )}
          {job.extra && (
            <>
              <h2>协作与考察</h2>
              <p>{job.extra}</p>
            </>
          )}
          <h2>如何准备申请</h2>
          <p>{job.application}</p>
          <p>具体薪酬、福利与面试安排，以招聘团队沟通的信息为准。</p>
        </article>
        <aside className="apply-panel">
          <span className="eyebrow">YOUR NEXT CHAPTER</span>
          <h2>让我们认识你。</h2>
          <p>
            一次交流，可能就是
            <br />
            下一段旅程的开始。
          </p>
          {url ? (
            <>
              <a className="button primary" href={url}>
                通过邮箱申请 <ArrowUpRight size={18} />
              </a>
              <p className="apply-help">
                将打开你的邮件应用，请按本岗位要求准备材料并发送。本站不存储申请材料。
              </p>
              <div className="application-contact">
                <span>招聘邮箱</span>
                <a className="email-link" href={url}>
                  {company.email}
                </a>
              </div>
              <div className="application-contact">
                <span>CEO 邮箱</span>
                <a
                  className="email-link"
                  href={applicationUrl(job, company.ceoEmail) ?? undefined}
                >
                  {company.ceoEmail}
                </a>
              </div>
            </>
          ) : (
            <>
              <button className="button disabled" disabled>
                投递暂未开放
              </button>
              <p className="apply-help">
                招聘联系方式确认后将在这里开放投递。当前不会收集或提交任何个人信息。
              </p>
            </>
          )}
          <hr />
          <span className="tags">
            {job.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </span>
        </aside>
      </div>
    </div>
  )
}
