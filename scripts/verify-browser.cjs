const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright')
const assert = require('node:assert/strict')
;(async () => {
  const browser = await chromium.launch({
    headless: true,
    channel: process.env.BROWSER_CHANNEL || 'chrome',
  })
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
  })
  const errors = []
  page.on('pageerror', (e) => errors.push(e.message))
  const base = process.env.BASE_URL || 'http://127.0.0.1:3000'
  await page.goto(base, { waitUntil: 'networkidle' })
  assert.equal(await page.locator('.job-row').count(), 23)
  assert.equal(await page.locator('.preview-banner').count(), 0)
  assert.ok((await page.title()).includes('Eazo'))
  const paths = await page
    .locator('.job-row')
    .evaluateAll((rows) => rows.map((r) => r.getAttribute('href')))
  await page.screenshot({ path: 'artifacts/desktop.png', fullPage: true })
  await page.screenshot({ path: 'artifacts/eazo-home.png' })
  await page.getByRole('button', { name: '工程研发 5' }).click()
  assert.equal(await page.locator('.job-row').count(), 5)
  await page.getByLabel('搜索职位或关键词').fill('React')
  assert.equal(await page.locator('.job-row').count(), 1)
  await page.getByLabel('搜索职位或关键词').fill('不存在的岗位')
  await page.getByRole('button', { name: '清除筛选' }).click()
  await page.getByLabel('工作类型').selectOption('实习')
  assert.equal(await page.locator('.job-row').count(), 3)
  await page.getByLabel('工作类型').selectOption('待确认')
  assert.equal(await page.locator('.job-row').count(), 5)
  for (const path of paths) {
    const response = await page.goto(base + path, { waitUntil: 'networkidle' })
    assert.equal(response.status(), 200)
    const title = await page.locator('h1').innerText()
    const href = await page
      .getByRole('link', { name: '通过邮箱申请' })
      .getAttribute('href')
    const link = new URL(href)
    assert.equal(link.pathname, 'zhouxianglong@fellou.ai')
    assert.equal(link.searchParams.get('subject'), 'Eazo 职位申请｜' + title)
    assert.ok(link.searchParams.get('body').includes('申请材料'))
    if (path.includes('builder-advocate')) {
      assert.ok(link.searchParams.get('body').includes('不需要简历'))
      assert.ok(
        (await page.locator('article').innerText()).includes('不需要简历'),
      )
    }
  }
  await page.goto(base + '/jobs/head-of-marketing', {
    waitUntil: 'networkidle',
  })
  await page.screenshot({ path: 'artifacts/job-detail.png', fullPage: true })
  await page.goto(base + '/jobs/not-real', { waitUntil: 'networkidle' })
  await page.getByRole('heading', { name: '这一页暂时不在这里。' }).waitFor()
  for (const width of [390, 320]) {
    await page.setViewportSize({ width, height: 844 })
    await page.goto(base, { waitUntil: 'networkidle' })
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      false,
    )
    if (width === 390)
      await page.screenshot({ path: 'artifacts/mobile.png', fullPage: true })
    await page.goto(base + '/jobs/fullstack-engineer', {
      waitUntil: 'networkidle',
    })
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      false,
    )
    if (width === 390)
      await page.screenshot({
        path: 'artifacts/mobile-detail.png',
        fullPage: true,
      })
  }
  assert.deepEqual(errors, [])
  console.log(
    'PASS: 23 role pages + role-specific mailto URLs, advocate exemption, search, team/type filters, reset, 404, 390/320 mobile layouts, no browser errors. No emails sent.',
  )
  await browser.close()
})().catch((e) => {
  console.error(e)
  process.exit(1)
})
