# AFFA Project Tracking Portal

Vue 3 + TypeScript + Vuetify 3 + Vue Router.

## Development

Use Node.js 20.19+ or 22.13+ and npm to satisfy the lint tooling requirements.

```sh
npm install
npm run dev
```

The root URL redirects to /login. Submitting a non-empty username and password
navigates to /dashboard for preview purposes; credentials are not authenticated.
Google sign-in, password reset, and account requests still display notices.
Remember me is local form state until session handling is implemented.

The redesigned dashboard is available at /dashboard, with sample data in
src/data/dashboard-v2.ts and its own PortalLayout. The original dark dashboard
is preserved at /dashboard-old, using src/data/dashboard.ts and DashboardLayout.
Neither route is protected by authentication yet. Logout returns to the login view.

The new sidebar has independently expandable menu groups with local chevron SVGs.
New Registration is a direct link to /new-registration without a submenu.
Its select navigates Patent to /new-registration/patent and Trademark to
/new-registration/trademark. Industrial Design and Copyright show placeholder notices.
The Patent form supports editable party/document rows and local file selection.
All form values and files are transient; Submit only shows a preview notice and
does not send data. Dropdown options are illustrative, pending business requirements.
Trademark supports the Yes/No search choice; the next step is not implemented yet.
The registration table uses two sample records and supports a details dialog.
Submenu actions show placeholder notices. Latest Event View buttons open details.
The v2 calendar starts in September 2026 to match the mockup and supports month
navigation and day selection. All portfolio, payment, and event data is illustrative.
Payment percentages use 72.2% paid and 27.8% unpaid to total 100% (the mockup's
72.2% and 28.8% add to 101%). Charts use SVG without another chart dependency.

Run `npm run test:e2e` with Google Chrome installed to check desktop/mobile
dashboard layout, sidebar controls, calendar navigation, and the return to login.

## Checks

- `npm run type-check`: strict TypeScript and Vue template checking.
- `npm run lint`: ESLint; warnings fail the check.
- `npm run lint:fix`: apply automatic lint fixes.
- `npm run format`: format source and configuration with Prettier.
- `npm run format:check`: verify formatting.
- `npm run build`: type-check, then create the production build.
- `npm run preview`: serve the production build locally.

## Structure

- `src/views/`: route-level pages, grouped by feature.
- `src/layouts/`: shared page shells and presentation.
- `src/components/common/`: shared components such as AppBrand.
- `src/components/auth/`: authentication UI such as LoginForm.
- `src/router/`: route definitions and lazy-loaded views.
- `src/plugins/`: Vuetify registration and theme configuration.
- `src/types/`: shared TypeScript contracts.
- `src/assets/styles/`: global styles and shared design tokens.
- `src/assets/icons/`: original SVG assets.
- `references/`: design references, not application assets.

Keep page/component styles scoped. Use :deep() only for necessary Vuetify
internal overrides; prefer component props for standard configuration.
Keep form state local and emit typed events to the owning view. Add services,
stores, or composables only when API integration or shared behavior needs them.
Do not persist passwords.

To add a portal page, create a view in src/views and add a lazy child route under
PortalLayout in src/router/index.ts. The layout owns the header, sidebar, and
RouterView; do not wrap individual views in PortalLayout.

PortalHeader and PortalSidebar are in src/components/layout. PortalLayout owns
sidebar visibility and shared notices; the sidebar owns menu expansion. Header
account labels are props so they can later come from the authenticated user.
Navigation groups live in src/config/navigation.ts. Add a child's destination
as `to: { name: 'your-route-name' }` to turn its placeholder button into a link.
Active menu styling and opening the matching group follow the current route.
App.vue owns the single v-app root. The old dashboard retains its separate layout.

Production hosting must serve index.html for unknown application paths so
direct navigation and refresh work with Vue Router history mode.
