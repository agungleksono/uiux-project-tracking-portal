export interface ChartSegment {
  label: string
  value: number
  color: string
}
export interface PortfolioSummary {
  id: string
  title: string
  segments: ChartSegment[]
}
export interface DashboardEvent {
  id: string
  application: string
  status: string
  day: number
}
