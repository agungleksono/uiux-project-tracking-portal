import type { NavigationItem } from '@/types/navigation'
import file from '@/assets/icons/file-lines-regular-full.svg'
import folder from '@/assets/icons/folder-regular-full.svg'
import creditCard from '@/assets/icons/credit-card-regular-full.svg'
import robot from '@/assets/icons/robot-solid-full.svg'
import gear from '@/assets/icons/gear-solid-full.svg'

export const portalMenu: NavigationItem[] = [
  {
    kind: 'link',
    id: 'registration',
    title: 'New Registration',
    icon: file,
    to: { name: 'new-registration' },
  },
  {
    kind: 'group',
    id: 'portfolio',
    title: 'Portfolio',
    icon: folder,
    children: [
      { id: 'applications', title: 'All Applications' },
      { id: 'patents', title: 'Patents' },
      { id: 'trademarks', title: 'Trademarks' },
      { id: 'copyrights', title: 'Copyrights' },
    ],
  },
  {
    kind: 'group',
    id: 'payment',
    title: 'Payment',
    icon: creditCard,
    children: [
      { id: 'invoices', title: 'Invoices' },
      { id: 'payment-history', title: 'Payment History' },
    ],
  },
  {
    kind: 'group',
    id: 'assistant',
    title: 'AFFA Assistant',
    icon: robot,
    children: [
      { id: 'conversation', title: 'Start Conversation' },
      { id: 'conversation-history', title: 'Conversation History' },
    ],
  },
  {
    kind: 'group',
    id: 'setting',
    title: 'Setting',
    icon: gear,
    children: [
      { id: 'account-profile', title: 'Account Profile' },
      { id: 'notifications', title: 'Notification Preferences' },
    ],
  },
]
