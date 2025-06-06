import { addLeadFormSchema } from '@/lib/zod-schemas/lead.schema'
import { z } from 'zod'

export type IAddLead = z.infer<typeof addLeadFormSchema>
