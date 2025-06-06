import { Metadata } from 'next'
import AddButton from '@/components/shared/add-button'
// import { DataTable } from '@/components/shared/data-table'
// import { leadsColumns } from './leads-columns'
import { fetchLeads } from '@/lib/data/leads.data'
import TestTable from './test-table'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export const metadata: Metadata = {
	title: 'Leads management',
}

const LeadsPage = async () => {
	const leads = await fetchLeads()
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

			{/* <TestTable /> */}

			<Table>
				<TableCaption>A list of leads</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead>First name</TableHead>
						<TableHead>Last name</TableHead>
						<TableHead>Email</TableHead>
						<TableHead>Phone</TableHead>
						<TableHead>Status</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{leads.length > 0 ? (
						leads.map(lead => (
							<TableRow key={lead.id}>
								<TableCell>{lead.firstName}</TableCell>
								<TableCell>{lead.lastName}</TableCell>
								<TableCell>{lead.email}</TableCell>
								<TableCell>{lead.phone}</TableCell>
								<TableCell>{lead.status}</TableCell>
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={6}>No data</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>

			{/* <DataTable
				data={leads}
				columns={leadsColumns}
			/> */}
		</main>
	)
}
export default LeadsPage
