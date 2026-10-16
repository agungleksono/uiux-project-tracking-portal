import type {
  ChartSegment,
  DashboardEvent,
  PortfolioSummary,
} from '@/types/dashboard'

// Presentation fixtures only; replace with API responses when available.
const portfolioSegments: ChartSegment[] = [
  { label: 'In progress', value: 24, color: '#ff414e' },
  { label: 'Submitted', value: 18, color: '#ffbd49' },
  { label: 'Registered', value: 30, color: '#afff43' },
  { label: 'Review', value: 18, color: '#20c8f6' },
  { label: 'Other', value: 10, color: '#9554c2' },
]
export const portfolios: PortfolioSummary[] = [
  { id: 'patent-1', title: 'Patent', segments: portfolioSegments },
  { id: 'patent-2', title: 'Patent', segments: portfolioSegments },
  { id: 'design', title: 'Design', segments: portfolioSegments },
  { id: 'copyright', title: 'Copyright', segments: portfolioSegments },
]
export const paymentSegments: ChartSegment[] = [
  { label: 'Paid', value: 80, color: '#32cd30' },
  { label: 'Unpaid', value: 20, color: '#ffab10' },
]
export const monthlyPayments = [
  { month: 'Jan', value: 42 },
  { month: 'Feb', value: 57 },
  { month: 'Mar', value: 69 },
  { month: 'Apr', value: 34 },
  { month: 'May', value: 49 },
  { month: 'Jun', value: 19 },
  { month: 'Jul', value: 31 },
]
export const upcomingEvents = [
  { label: 'Tomorrow', count: 2 },
  { label: 'One week', count: 5 },
  { label: 'One month', count: 10 },
  { label: 'One year', count: 15 },
]
export const latestEvents: DashboardEvent[] = [
  {
    id: 'certificate',
    application: 'P00202210094',
    status: 'preparation for certificate issuance',
    day: 5,
  },
  {
    id: 'publication-period',
    application: 'P00202610307',
    status: 'publication period',
    day: 12,
  },
  {
    id: 'response',
    application: 'P00202313849',
    status: 'awaiting a substantive response',
    day: 17,
  },
  { id: 'deleted', application: 'PID201901127', status: 'deleted', day: 23 },
  {
    id: 'publication',
    application: 'P00202605791',
    status: 'for publication',
    day: 28,
  },
]
export const profile = [
  { label: 'Name', value: 'PT. Maju Terus' },
  { label: 'Address', value: 'Jl. Raya Citalahab Garut' },
  { label: 'Phone Number', value: '081212099310' },
  { label: 'Email', value: 'info@majuterus.com' },
  { label: 'PIC', value: 'Yusdi' },
]
