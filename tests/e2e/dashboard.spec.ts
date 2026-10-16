import { expect, test } from '@playwright/test'

test('dashboard sections, navigation and calendar work on desktop', async ({
  page,
}) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.setViewportSize({ width: 1752, height: 1138 })
  await page.goto('/dashboard-old')
  await expect(
    page.getByRole('heading', { name: 'Dashboard', exact: true }),
  ).toBeVisible()
  for (const name of [
    'Portfolio',
    'Payment',
    'Next Event',
    'Latest Event',
    'Profile',
    'Event in Month',
  ]) {
    await expect(page.getByRole('heading', { name, exact: true })).toBeVisible()
  }
  await expect(page.getByText('PT. Maju Terus')).toBeVisible()
  const heading = page.locator('.calendar-heading > span[aria-live]')
  const initialMonth = await heading.textContent()
  await page.getByRole('button', { name: 'Next month' }).click()
  await expect(heading).not.toHaveText(initialMonth!)
  await page.getByRole('button', { name: 'Previous month' }).click()
  await expect(heading).toHaveText(initialMonth!)
  await page.locator('.calendar-day.has-event').first().click()
  await expect(page.locator('.day-details')).toContainText('P00202210094')
  await page.getByRole('button', { name: 'Toggle navigation' }).click()
  await expect(page.locator('.sidebar')).toBeHidden()
  await page.getByRole('button', { name: 'Toggle navigation' }).click()
  await expect(page.locator('.sidebar')).toBeVisible()
  await page.screenshot({
    path: 'test-results/dashboard-desktop.png',
    fullPage: true,
  })
  await page.getByRole('link', { name: 'Logout' }).click()
  await expect(page).toHaveURL(/\/login$/)
  await expect(
    page.getByRole('heading', { name: 'Login', exact: true }),
  ).toBeVisible()
  expect(errors).toEqual([])
})

test('dashboard fits mobile and navigation can be opened and dismissed', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/dashboard-old')
  await expect(page.locator('.sidebar')).toBeHidden()
  await expect(
    page.getByRole('button', { name: 'Toggle navigation' }),
  ).toHaveAttribute('aria-expanded', 'false')
  const fits = await page.evaluate(
    () =>
      globalThis.document.documentElement.scrollWidth <= globalThis.innerWidth,
  )
  expect(fits).toBe(true)
  await page.getByRole('button', { name: 'Toggle navigation' }).click()
  await expect(page.locator('.sidebar')).toBeVisible()
  await page
    .getByRole('button', { name: 'Close navigation', exact: true })
    .click({ position: { x: 370, y: 100 } })
  await expect(page.locator('.sidebar')).toBeHidden()
  await page.screenshot({
    path: 'test-results/dashboard-mobile.png',
    fullPage: true,
  })
})
