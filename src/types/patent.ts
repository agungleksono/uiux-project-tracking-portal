export interface PartyRow {
  id: number
  name: string
  address: string
  country: string
  document: File | null
}
export interface DocumentRow {
  id: number
  name: string
  file: File | null
  updated: string
}
