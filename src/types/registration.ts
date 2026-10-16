export type RegistrationType =
  'Patent' | 'Trademark' | 'Industrial Design' | 'Copyright'

export interface Registration {
  id: number
  application: RegistrationType
  affaReference: string
  clientReference: string
  instructionDate: string
  title: string
}
