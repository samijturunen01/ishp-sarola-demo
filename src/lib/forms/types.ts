import type { FormTopic } from '../../data/services'

export interface InquiryPayload {
  topic: FormTopic
  name: string
  company?: string
  email?: string
  phone?: string
  location?: string
  machineModel?: string
  serviceLevel?: string
  loanMachine?: boolean
  material?: string
  quantity?: string
  startingPoint?: string
  schedule?: string
  message: string
}

export type SubmitResult =
  | { ok: true; mode: 'demo' }
  | { ok: true; mode: 'live' }
  | { ok: false; error: string }
