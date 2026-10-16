import { expect, test } from '@playwright/test'

test('registration link reuses the layout, has no submenu and offers all registration types', async ({
  page,
}) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.setViewportSize({ width: 1708, height: 920 })
  await page.goto('/dashboard')
  const link = page.getByRole('link', { name: 'New Registration', exact: true })
  await expect(link.locator('.chevron')).toHaveCount(0)
  await expect(
    page.getByRole('button', { name: 'New Registration', exact: true }),
  ).toHaveCount(0)
  await link.click()
  await expect(page).toHaveURL(/\/new-registration$/)
  await expect(link).toHaveAttribute('aria-current', 'page')
  await expect(
    page.getByRole('link', { name: 'Dashboard', exact: true }),
  ).not.toHaveClass(/dashboard-link/)
  await expect(page.locator('.portal-header')).toHaveCount(1)
  await expect(
    page.getByRole('heading', { name: 'New Registration' }),
  ).toBeVisible()
  await expect(page.getByText('Showing 1 to 2 of 2 results')).toBeVisible()
  await page.screenshot({
    path: 'test-results/new-registration-desktop.png',
    fullPage: true,
  })
  const select = page.getByRole('combobox', { name: 'New Registration For' })
  await select.click()
  await expect(page.getByRole('option')).toHaveCount(4)
  for (const type of [
    'Patent',
    'Trademark',
    'Industrial Design',
    'Copyright',
  ]) {
    await expect(
      page.getByRole('option', { name: type, exact: true }),
    ).toBeVisible()
  }
  await page.keyboard.press('Escape')
  await page.getByRole('button', { name: 'View Electric door button' }).click()
  await expect(page.getByRole('dialog')).toContainText('PTY09152026-0001')
  await page.getByRole('button', { name: 'Close', exact: true }).click()
  await expect(page.getByRole('dialog')).toBeHidden()
  await expect(
    page.getByRole('button', { name: 'Previous page' }),
  ).toBeDisabled()
  await expect(page.getByRole('button', { name: 'Next page' })).toBeDisabled()
  await page.getByRole('link', { name: 'Dashboard', exact: true }).click()
  await expect(page).toHaveURL(/\/dashboard$/)
  expect(errors).toEqual([])
})

test('registration selection opens Patent and Trademark pages', async ({
  page,
}) => {
  await page.goto('/new-registration')
  await page.getByRole('combobox', { name: 'New Registration For' }).click()
  await page.getByRole('option', { name: 'Patent', exact: true }).click()
  await expect(page).toHaveURL(/\/new-registration\/patent$/)
  await expect(
    page.getByRole('heading', { name: 'Instruction', exact: true }),
  ).toBeVisible()
  await page.getByRole('button', { name: 'Add Applicant', exact: true }).click()
  await page
    .getByRole('textbox', { name: 'Applicant 3 name', exact: true })
    .fill('Sample applicant')
  await page.getByRole('button', { name: 'Submit', exact: true }).click()
  await expect(
    page.getByText(
      'This form is a preview. Your registration and documents have not been sent.',
    ),
  ).toBeVisible()
  await page.getByRole('combobox', { name: 'New Registration For' }).click()
  await page.getByRole('option', { name: 'Trademark', exact: true }).click()
  await expect(page).toHaveURL(/\/new-registration\/trademark$/)
  await page.getByRole('button', { name: 'Yes', exact: true }).click()
  await expect(page).toHaveURL(/\/new-registration\/trademark\/search$/)
  await expect(
    page.getByRole('heading', { name: 'Trademark Search', exact: true }),
  ).toBeVisible()
  await page.getByRole('button', { name: 'Search', exact: true }).click()
  await expect(page.getByText('Search results', { exact: true })).toBeVisible()
  await expect(
    page.getByText('Complete your payment to view the search results.'),
  ).toBeVisible()
  await expect(
    page.getByRole('button', { name: 'Continue to register' }),
  ).toBeVisible()
  await page.getByRole('button', { name: 'Continue to register' }).click()
  await expect(page).toHaveURL(/\/new-registration\/trademark\/form$/)
  await expect(
    page.getByRole('heading', { name: 'Instruction', exact: true }),
  ).toBeVisible()
  await expect(
    page.getByRole('heading', { name: 'Trademark', exact: true }),
  ).toBeVisible()
  await page.getByRole('button', { name: 'Add applicant' }).first().click()
  await expect(
    page.getByRole('textbox', { name: 'Applicant 3 name' }),
  ).toBeVisible()
})

test('choosing No opens the trademark registration form', async ({ page }) => {
  await page.goto('/new-registration/trademark')
  await page.getByRole('button', { name: 'No', exact: true }).click()
  await expect(page).toHaveURL(/\/new-registration\/trademark\/form$/)
  await expect(
    page.getByText('Please fill out the form below completely..!'),
  ).toBeVisible()
  await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible()
})

test('registration fits mobile and keeps the wide table scrollable', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/new-registration')
  await expect(
    page.getByRole('heading', { name: 'New Registration' }),
  ).toBeVisible()
  expect(
    await page.evaluate(
      () =>
        globalThis.document.documentElement.scrollWidth <=
        globalThis.innerWidth,
    ),
  ).toBe(true)
  await page.screenshot({
    path: 'test-results/new-registration-mobile.png',
    fullPage: true,
  })
})
