import { Link } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'
import { company } from '@/data/careers'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="careers-site">
      <a className="skip-link" href="#main">
        跳到主要内容
      </a>
      {company.preview && (
        <div className="preview-banner">
          网站预览 · 品牌与职位为示例，暂未开放真实投递
        </div>
      )}
      <header className="site-header wrap">
        <Link
          to="/"
          className="wordmark"
          aria-label={`${company.name} 招聘首页`}
        >
          <img
            className="brand-mark"
            src="/brand/eazo-mark.svg"
            alt=""
            width="40"
            height="40"
          />
          <span>
            {company.name}
            <small>CAREERS</small>
          </span>
        </Link>
        <nav aria-label="主导航">
          <a href="/#about">认识我们</a>
          <a href="/#culture">工作方式</a>
          <a href="/#process">招聘流程</a>
        </nav>
        <a className="nav-cta" href="/#jobs">
          寻找机会 <ArrowUpRight size={16} />
        </a>
      </header>
      <main id="main">{children}</main>
      <footer className="site-footer wrap">
        <Link to="/" className="wordmark">
          <img
            className="brand-mark"
            src="/brand/eazo-mark.svg"
            alt=""
            width="32"
            height="32"
          />
          <span>
            {company.name}
            <small>CAREERS</small>
          </span>
        </Link>
        <p>下一段旅程，从一次对话开始。</p>
        <div className="footer-contacts">
          <span>
            招聘邮箱 <a href={`mailto:${company.email}`}>{company.email}</a>
          </span>
          <span>
            CEO 邮箱{' '}
            <a href={`mailto:${company.ceoEmail}`}>{company.ceoEmail}</a>
          </span>
        </div>
        <span>
          © {new Date().getFullYear()}{' '}
          {company.preview ? '公司名称待填写' : company.fullName}
        </span>
        <a href="/#jobs">探索职位 ↗</a>
      </footer>
    </div>
  )
}
