import type { RouteLocationRaw } from 'vue-router'

export interface NavigationLink {
  id: string
  title: string
  // Omit the destination until the page is implemented.
  to?: RouteLocationRaw
}
export interface NavigationGroup {
  kind: 'group'
  id: string
  title: string
  icon: string
  children: NavigationLink[]
}

export interface NavigationRoute extends NavigationLink {
  kind: 'link'
  icon: string
  to: RouteLocationRaw
}

export type NavigationItem = NavigationGroup | NavigationRoute
