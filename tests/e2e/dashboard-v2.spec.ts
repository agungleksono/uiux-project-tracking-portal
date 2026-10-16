import { expect, test } from '@playwright/test'

test('v2 dashboard renders and all four sidebar groups expand with the supplied icons', async ({
  page,
}) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.setViewportSize({ width: 1536, height: 1024 })
  await page.goto('/dashboard')
  await expect(
    page.getByRole('heading', { name: 'Portfolio Overview' }),
  ).toBeVisible()
  await expect(
    page.getByRole('heading', { name: 'Client Profile' }),
  ).toBeVisible()
  await page.screenshot({
    path: 'test-results/dashboard-v2-desktop.png',
    fullPage: true,
  })
  for (const name of ['Portfolio', 'Payment', 'AFFA Assistant', 'Setting']) {
    const button = page.getByRole('button', { name, exact: true })
    await expect(button).toHaveAttribute('aria-expanded', 'false')
    const closedIcon = await button.locator('.chevron').getAttribute('src')
    expect(closedIcon).toBeTruthy()
    await button.click()
    await expect(button).toHaveAttribute('aria-expanded', 'true')
    await expect(button.locator('.chevron')).not.toHaveAttribute(
      'src',
      closedIcon!,
    )
    const target = await button.getAttribute('aria-controls')
    const submenu = page.locator('#' + target)
    await expect(submenu).toBeVisible()
    await submenu.getByRole('button').first().click()
    await expect(page.getByText(/this page is coming soon/)).toBeVisible()
    await button.click()
    await expect(submenu).toHaveCount(0)
    await expect(button.locator('.chevron')).toHaveAttribute('src', closedIcon!)
  }
  await page
    .getByRole('button', { name: 'View Patent (P/00020210094)', exact: true })
    .click()
  await expect(page.getByRole('dialog')).toContainText(
    'Preparation for certificate issuance',
  )
  await page.getByRole('button', { name: 'Close', exact: true }).click()
  await expect(page.getByRole('dialog')).toBeHidden()
  await page.getByRole('button', { name: 'Next month' }).click()
  await expect(page.locator('.calendar-toolbar')).toContainText('October 2026')
  await page.getByRole('button', { name: 'Previous month' }).click()
  await expect(page.locator('.calendar-toolbar')).toContainText(
    'September 2026',
  )
  expect(errors).toEqual([])
})

test('v2 mobile sidebar and layout work without horizontal page overflow', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/dashboard')
  await expect(page.locator('.portal-sidebar')).toBeHidden()
  await page.getByRole('button', { name: 'Toggle navigation' }).click()
  await expect(page.locator('.portal-sidebar')).toBeVisible()
  await page.getByRole('button', { name: 'Portfolio', exact: true }).click()
  await expect(
    page.getByRole('button', { name: 'All Applications' }),
  ).toBeVisible()
  await page
    .getByRole('button', { name: 'Close navigation' })
    .click({ position: { x: 375, y: 100 } })
  await expect(page.locator('.portal-sidebar')).toBeHidden()
  expect(
    await page.evaluate(
      () =>
        globalThis.document.documentElement.scrollWidth <=
        globalThis.innerWidth,
    ),
  ).toBe(true)
  await page.screenshot({
    path: 'test-results/dashboard-v2-mobile.png',
    fullPage: true,
  })
})
