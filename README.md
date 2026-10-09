# Eazo 招聘网站

**[访问线上招聘网站](https://eazo-careers.mazhijian973535.chatgpt.site/)** · 23 个岗位 · 任何人可访问

这是网站源码的公开备份。修改此仓库不会自动更新线上站点，需另行部署。

基于 [karngyan/karngyan.com](https://github.com/karngyan/karngyan.com) MIT 模板改造。保留 React 19、TanStack Start、TypeScript、Tailwind CSS v4 与 Cloudflare Workers 构建能力。

## 本地运行

使用 `mise install` 安装 mise.toml 固定的 Node/pnpm 版本，或自行安装 Node 22.12+ 与 pnpm 10。

```bash
pnpm install --frozen-lockfile
pnpm dev
```

打开 http://localhost:3000 。

```bash
pnpm typecheck
pnpm test
pnpm build
```

## 现在可以做什么

- 首页：品牌介绍、团队筛选、职位关键词搜索、全职/实习筛选、无结果清空、工作方式、招聘流程。
- `/jobs/<id>`：可直接访问的职位详情、职责、任职要求、申请入口。
- 桌面与手机响应式布局、键盘操作、低动效模式、404 页面。
- 投递采用 `mailto:`，打开候选人本地邮件应用，预填主题和正文。候选人按岗位要求附上申请材料后发送，网站没有假提交或简历存储功能。

## 替换公司内容

主要编辑 `src/data/careers.ts`：

1. `company.name` / `fullName`：品牌与公司全称。
2. `description`：公司简介。
3. `email`：真实招聘邮箱；留空时投递按钮禁用。
4. `jobs`：真实岗位、地点、用工类型、要求和职责；id 用稳定的英文路径。
5. 当前 `preview` 为 `false`，已使用 Eazo 品牌和正式 JD。当前 `searchIndexing` 为 `true`，已开启搜索引擎索引。

首页主视觉文案、合作理念和招聘流程在 `src/routes/index.tsx`。色彩、间距与响应式布局在 `src/styles.css`。站点地址在 `site.config.ts`；迁移部署后请换成你的实际访问域名。

已按用户提供的两份 PDF 整理 23 个独立岗位，并按用户确认全部展示。招聘邮箱为 `zhouxianglong@fellou.ai`，CEO 邮箱为 `yang@eazo.ai`。岗位申请材料按 JD 区分，Builder 布道师无需简历。未注明的用工类型、地点保留待确认；没有编造年限、薪酬或福利。来源与歧义处理见 `RECRUITMENT-SOURCES.md`。

招聘网站已通过 Sites 公开发布，使用平台提供的域名。此备份不包含原站点的托管身份配置；迁移时请新建自己的站点。

## 发布到 Cloudflare

```bash
pnpm wrangler login
pnpm build
pnpm wrangler deploy --config .output/server/wrangler.json
```

Worker 名称在 `vite.config.ts`。发布后在 Cloudflare 绑定域名，并更新 `site.config.ts`。GitHub Actions 采用手动触发；如需使用，配置 `CLOUDFLARE_API_TOKEN` 和 `CLOUDFLARE_ACCOUNT_ID`。

线上招聘站点已可公开访问。若需要在线收集附件、自动回执或候选人管理，需要另行接入招聘系统或后端及相应数据处理政策。

## 验证

已验证 23 个详情页及邮件收件人、岗位主题、申请正文，验证未发送邮件；搜索、筛选、404 和 390/320px 手机布局通过。运行时预览图存放在 `artifacts/`。`scripts/verify-browser.cjs` 通过环境变量 `PLAYWRIGHT_MODULE` 指定 Playwright 包路径，可通过 `BROWSER_CHANNEL=chrome` 使用本机 Chrome；运行前先启动本地服务。

保留原始 `LICENSE`；模板原来的个人主页、博客文章及个人社交入口已移除。
