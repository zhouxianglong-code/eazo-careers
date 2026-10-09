import { company } from './src/data/careers'
/**
 * site.config.ts — the single file you edit to make this site yours.
 *
 * Identity, SEO, socials, navigation, and work history all live here.
 * Page prose (home hero, about bio, uses list, projects) lives in the
 * route files under src/routes/ — look for the ✏️ markers.
 * Articles live in src/content/articles/<slug>/page.mdx.
 */

export interface NavItem {
  label: string
  to: string
  /** external links open in a new tab and skip active-state styling */
  external?: boolean
}

export interface RoleEntry {
  title: string
  start: { label: string; dateTime: string }
  end: { label: string; dateTime: string }
}

export interface CompanyEntry {
  company: string
  /** path under public/, e.g. '/logos/acme.jpeg' */
  logo: string
  url: string
  roles: Array<RoleEntry>
}

export interface SiteConfig {
  /** full display name, used in footer copyright */
  name: string
  /** short name used in page titles, e.g. 'Articles - karn' */
  shortName: string
  /** canonical origin, https://, no trailing slash */
  url: string
  /** default <title> and og:title */
  title: string
  /** default meta description, also the RSS channel description */
  description: string
  email: string
  social: {
    github?: string
    x?: string
    linkedin?: string
    instagram?: string
    /** e.g. a cal.com booking link */
    calendar?: string
  }
  /** '@handle' for twitter:site / twitter:creator meta */
  twitterHandle?: string
  nav: Array<NavItem>
  resume: {
    enabled: boolean
    /** path under public/, e.g. '/resume.pdf' */
    path: string
  }
  /** work history shown in the card on the home page */
  work: Array<CompanyEntry>
  analytics?: {
    plausible?: {
      domain: string
      /** override when self-hosting, defaults to https://plausible.io/js/script.js */
      scriptSrc?: string
    }
  }
}

const siteConfig: SiteConfig = {
  name: company.fullName,
  shortName: company.name,
  url: 'https://eazo-careers.mazhijian973535.chatgpt.site',
  title: `${company.name} 招聘`,
  description: company.description,
  email: company.email,
  social: {},
  nav: [{ label: '招聘职位', to: '/#jobs' }],
  resume: { enabled: false, path: '/resume.pdf' },
  work: [],
}
export default siteConfig
