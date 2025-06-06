import { Metadata } from 'next'
import AddButton from '@/components/shared/add-button'
// import { DataTable } from '@/components/shared/data-table'
// import { leadsColumns } from './leads-columns'
// import { fetchLeads } from '@/lib/data/leads.data'
import TestTable from './test-table'

export const metadata: Metadata = {
	title: 'Leads management',
}

const LeadsPage = async () => {
	// const leads = await fetchLeads()
	return (
		<main className='flex flex-col gap-y-6'>
			<div className='flex items-end justify-between'>
				<div className='grid'>
					<p className='text-muted-foreground text-sm'>View and manage all leads.</p>
				</div>

				<AddButton
					title='Add lead'
					href='/leads/add'
				/>
			</div>

			<TestTable />

			{/* <DataTable
				data={leads}
				columns={leadsColumns}
			/> */}
		</main>
	)
}
export default LeadsPage
