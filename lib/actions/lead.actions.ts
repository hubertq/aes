'use server'

import { IAddLead } from '@/types/leads.types'
import prisma from '@/db/prisma'
import { revalidatePath } from 'next/cache'
import { formatError } from '../utils'

// Add lead
export const addLead = async (lead: IAddLead) => {
	try {
		await prisma.lead.create({
			data: {
				firstName: lead.firstName,
				lastName: lead.lastName,
				email: lead.email,
				phone: lead.phone,
				assignedToId: lead.assignedTo || undefined,
				company: lead.company,
				source: lead.source,
				notes: lead.notes,
				jobTitle: lead.jobTitle,
				status: lead.status,
			},
		})

		revalidatePath('/leads')

		return { success: true, message: 'Lead added successfully.' }
	} catch (error) {
		console.log(formatError(error))
		return { success: false, message: formatError(error) }
	}
}
