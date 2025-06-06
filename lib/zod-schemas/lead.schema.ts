import { LeadStatus } from '@/generated/prisma'
import { isEmail } from 'validator'
import { z } from 'zod'

export const addLeadFormSchema = z.object({
	firstName: z.string().min(1, 'You must provide a first name.').min(3, 'First name must be at least 3 characters.'),
	lastName: z.string().optional().nullable(),
	email: z
		.string()
		.nullable()
		.refine(data => !data || isEmail(data), {
			message: 'Invalid email address',
		}),

	phone: z.string().optional().nullable(),
	company: z.string().optional().nullable(),
	jobTitle: z.string().optional().nullable(),
	source: z.string().optional().nullable(),
	status: z.nativeEnum(LeadStatus, {
		errorMap: () => ({ message: 'Invalid status provided.' }),
	}),
	notes: z.string().optional().nullable(),
	assignedTo: z.string().optional().nullable(), // assuming this is a user ID
})
