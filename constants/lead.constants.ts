import { IAddLead } from '@/types/leads.types'

export const leadDefaultValues: IAddLead = {
	firstName: '',
	lastName: '',
	email: '',
	phone: '',
	company: '',
	jobTitle: '',
	source: '',
	assignedTo: '',
	status: 'NEW',
	notes: '',
}
