import { Link, createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { ArrowDown, ArrowUpRight, Asterisk, Search } from 'lucide-react'
import { company, filterJobs, jobs } from '@/data/careers'

export const Route = createFileRoute('/')({ component: Home })
function Home() {
  const [query, setQuery] = useState('')
  const [department, setDepartment] = useState('全部团队')
  const [type, setType] = useState('全部类型')
  const departments = [
    '全部团队',
    ...new Set(jobs.map((job) => job.department)),
  ]
  const results = filterJobs(query, department, type)
  function reset() {
    setQuery('')
    setDepartment('全部团队')
    setType('全部类型')
  }
  return (
    <>
      <section className="hero wrap" id="about">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="status-dot" /> EAZO / WE ARE HIRING
          </div>
          <h1>
            让每一个作品，
            <br />
            成为
            <span className="accent-word">
              新起点。
              <svg viewBox="0 0 350 18" aria-hidden="true">
                <path d="M4 13 Q175 -2 346 10" />
              </svg>
            </span>
          </h1>
          <p>{company.description}</p>
          <a className="button primary" href="#jobs">
            找到你的下一站 <ArrowUpRight size={20} />
          </a>
          <a className="text-link" href="#culture">
            了解我们的工作方式 <ArrowDown size={15} />
          </a>
        </div>
        <div
          className="hero-art brand-collage"
          aria-label="Eazo 产品画面与橙色招聘海报"
        >
          <div className="collage-paper" aria-hidden="true" />
          <div className="collage-topline">
            <img src="/brand/eazo-mark.svg" alt="" width="28" height="28" />
            <span>EAZO / CREATOR COMMUNITY</span>
            <span>↗</span>
          </div>
          <div className="collage-title">
            一起创造。
            <br />
            <span>一起生长。</span>
          </div>
          <div className="collage-caption">BUILD YOUR NEXT CHAPTER.</div>
          <div className="collage-sticker">
            <span>{jobs.length}</span> 个角色
            <br />
            等你加入 ↗
          </div>
          <div className="product-paper">
            <span className="paper-tape" aria-hidden="true" />
            <div className="product-image">
              <img
                src="/brand/eazo-reference-product.jpg"
                alt="Eazo 产品展示：可创作、体验和分享的互动应用"
              />
            </div>
            <div className="product-caption">
              从一个灵感，到一个真实的作品。 <span>CREATE → REMIX</span>
            </div>
          </div>
          <span className="collage-bottom">
            BRING YOUR IDEAS. BUILD WITH EAZO.
          </span>
        </div>
      </section>
      <div className="intro-strip wrap">
        <span>团队遍布旧金山湾区、北京、上海</span>
        <span>BUILD WITH AI</span>
        <Asterisk size={18} />
        <span>CREATE & REMIX</span>
        <Asterisk size={18} />
        <span>STAY CURIOUS</span>
      </div>
      <section className="jobs-section wrap" id="jobs">
        <div className="section-top">
          <div>
            <p className="eyebrow">01 / FIND YOUR PLACE</p>
            <h2>
              找到属于你的角色<span className="heading-dot">.</span>
            </h2>
          </div>
          <p>
            不同的专长，相同的热爱。
            <br />
            从一个合适的机会，开始认识彼此。
          </p>
        </div>
        <div className="job-browser">
          <aside className="filters">
            <h3>探索团队</h3>
            <div className="department-list">
              {departments.map((item) => (
                <button
                  type="button"
                  aria-pressed={department === item}
                  className={department === item ? 'selected' : ''}
                  onClick={() => setDepartment(item)}
                  key={item}
                >
                  <span>{item}</span>
                  <span>
                    {item === '全部团队'
                      ? jobs.length
                      : jobs.filter((job) => job.department === item).length}
                  </span>
                </button>
              ))}
            </div>
            <div className="sidebar-note">
              <Asterisk size={30} />
              <p>
                不止寻找一份工作。
                <br />
                也寻找一起做事的人。
              </p>
              <span>MAKE SOMETHING REAL ↗</span>
            </div>
          </aside>
          <div className="job-content">
            <div className="search-row">
              <label className="search-input">
                <Search size={19} />
                <input
                  aria-label="搜索职位或关键词"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="搜索职位、技能或关键词"
                />
                {query && (
                  <button aria-label="清除搜索" onClick={() => setQuery('')}>
                    ×
                  </button>
                )}
              </label>
              <select
                aria-label="工作类型"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option>全部类型</option>
                {[...new Set(jobs.map((job) => job.type))].map((item) => (
                  <option key={item} value={item}>
                    {item === '待确认' ? '用工类型待确认' : item}
                  </option>
                ))}
              </select>
            </div>
            <div className="results-summary" aria-live="polite">
              <span>
                共 <strong>{results.length}</strong> 个
                {company.preview ? '示例' : '开放'}职位
              </span>
              <span>找到与你同频的方向</span>
            </div>
            <div className="job-list">
              {results.map((job, index) => (
                <Link
                  to="/jobs/$jobId"
                  params={{ jobId: job.id }}
                  key={job.id}
                  className="job-row"
                >
                  <div className="job-number">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <div className="job-info">
                    <div className="job-title">
                      <h3>{job.title}</h3>
                      {job.type !== '待确认' && <span>{job.type}</span>}
                    </div>
                    <p>
                      {job.department}
                      <i /> {job.location}
                      {job.experience && (
                        <>
                          <i /> {job.experience}
                        </>
                      )}
                    </p>
                    <div className="tags">
                      {job.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                  <ArrowUpRight className="job-arrow" size={24} />
                </Link>
              ))}
            </div>
            {results.length === 0 && (
              <div className="empty-state">
                <Search size={32} />
                <h3>暂时没有匹配的职位</h3>
                <p>试试其他关键词，或查看所有团队。</p>
                <button className="button secondary" onClick={reset}>
                  清除筛选
                </button>
              </div>
            )}
            <div className="open-note">
              <span>先了解我们正在创造什么</span>
              <p>了解 Eazo 的创作社区，寻找与你契合的角色。</p>
              <a
                href="https://eazo.ai/"
                target="_blank"
                rel="noreferrer"
                aria-label="访问 Eazo 官网（新窗口）"
              >
                <ArrowUpRight size={24} />
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="culture-section" id="culture">
        <div className="wrap culture-grid">
          <div>
            <p className="eyebrow">02 / BETTER, TOGETHER</p>
            <h2>
              创作者优先，
              <br />
              让增长发生。
            </h2>
            <p className="culture-intro">
              作品可以被打开、体验、分享。
              <br />
              每一次 Remix，都是新的创作起点。
            </p>
            <div className="culture-emblem" aria-hidden="true">
              <Asterisk strokeWidth={1} />
            </div>
          </div>
          <div className="values">
            {[
              [
                '01',
                '用作品说话',
                '用 Eazo 做出真实作品和 Demo，让产品能力被看见、被使用，而不只停留在理念。',
              ],
              [
                '02',
                '让分享带来创作',
                '分享即使用，Remix 即再创作。把传播和激励做进产品，让作品成为别人的起点。',
              ],
              [
                '03',
                '先验证，再放大',
                '从社区、内容和真实用户反馈出发，验证有机增长，再用付费渠道放大有效的方向。',
              ],
            ].map(([number, title, description]) => (
              <article key={number}>
                <span>{number}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
                <ArrowUpRight size={22} />
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="process-section wrap" id="process">
        <div className="section-top">
          <div>
            <p className="eyebrow">03 / LET’S GET TO KNOW EACH OTHER</p>
            <h2>从认识，到同行。</h2>
          </div>
          <p>
            {company.preview
              ? '以下为建议流程，正式安排待确认。'
              : '以下为沟通参考，具体面试安排由招聘团队确认。'}
          </p>
        </div>
        <div className="process-grid">
          {[
            ['01', '投递简历', '按岗位要求发送简历或作品；布道师无需简历。'],
            ['02', '初步交流', '聊聊你的期待，以及岗位正在解决的问题。'],
            ['03', '深入了解', '与未来的伙伴交流，了解彼此的工作方式。'],
            ['04', '双向选择', '充分沟通合作细节，一起开启新的旅程。'],
          ].map(([number, title, description]) => (
            <div key={number}>
              <span>
                {number}
                <ArrowUpRight size={20} />
              </span>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="closing wrap">
        <div>
          <p className="eyebrow">THE NEXT CHAPTER IS YOURS.</p>
          <h2>下一步，和我们一起。</h2>
        </div>
        <a className="button primary" href="#jobs">
          探索所有职位 <ArrowUpRight size={20} />
        </a>
      </section>
    </>
  )
}
