import type { Registration, RegistrationType } from '@/types/registration'

export const registrationTypes: RegistrationType[] = [
  'Patent',
  'Trademark',
  'Industrial Design',
  'Copyright',
]

// Preview records from the design; replace with API data when connected.
export const registrations: Registration[] = [
  {
    id: 1,
    application: 'Patent',
    affaReference: 'P/00020/LN/26',
    clientReference: 'PTY09152026-0001',
    instructionDate: '15 Sep 2026',
    title: 'Electric door button',
  },
  {
    id: 2,
    application: 'Trademark',
    affaReference: 'TM/00020/LN/26',
    clientReference: 'TMY09152026-0020',
    instructionDate: '15 Sep 2026',
    title: 'LOGO',
  },
]
