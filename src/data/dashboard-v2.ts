export const portfolioOverview = [
  { title: 'Patent', total: 8, values: [5, 2, 1] },
  { title: 'Trademark', total: 6, values: [3, 2, 1] },
  { title: 'Industrial Design', total: 5, values: [3, 1, 1] },
  { title: 'Copyright', total: 5, values: [2, 2, 1] },
]
export const portfolioLegend = [
  { label: 'Completed', color: '#12bb80' },
  { label: 'In Progress', color: '#3183fc' },
  { label: 'Not Started', color: '#bac5d9' },
]
export const paymentTrend = [
  { month: 'Jan', value: 32 },
  { month: 'Feb', value: 44 },
  { month: 'Mar', value: 28 },
  { month: 'Apr', value: 36 },
  { month: 'May', value: 58 },
  { month: 'Jun', value: 46 },
  { month: 'Jul', value: 66 },
  { month: 'Aug', value: 80 },
  { month: 'Sep', value: 56 },
  { month: 'Oct', value: 36 },
  { month: 'Nov', value: 30 },
  { month: 'Dec', value: 54 },
]
export interface Activity {
  id: string
  date: string
  application: string
  description: string
  status: 'In Progress' | 'Pending' | 'Completed'
}
export const activities: Activity[] = [
  {
    id: 'patent',
    date: '15 Sep 2026',
    application: 'Patent (P/00020210094)',
    description: 'Preparation for certificate issuance',
    status: 'In Progress',
  },
  {
    id: 'trademark',
    date: '14 Sep 2026',
    application: 'Trademark (TM/00020/LN/26)',
    description: "Respond to examiner's report",
    status: 'Pending',
  },
  {
    id: 'copyright',
    date: '12 Sep 2026',
    application: 'Copyright (CR/00015/LN/26)',
    description: 'Payment confirmation received',
    status: 'Completed',
  },
]
