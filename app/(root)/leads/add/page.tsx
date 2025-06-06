import { Metadata } from 'next'
import AddLeadForm from './add-lead-form'

export const metadata: Metadata = {
	title: 'Add lead',
}

const AddLeadPage = async () => {
	return <AddLeadForm />
}
export default AddLeadPage
