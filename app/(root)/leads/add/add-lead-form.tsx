'use client'

import DiscardButton from '@/components/shared/discard-button'
import InputField from '@/components/shared/input-field'
import SaveButton from '@/components/shared/save-button'
import SelectField from '@/components/shared/select-field'
import TextAreaField from '@/components/shared/textarea-field'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { leadDefaultValues } from '@/constants/lead.constants'
import { LeadStatus } from '@/generated/prisma'
import { addLead } from '@/lib/actions/lead.actions'
import { addLeadFormSchema } from '@/lib/zod-schemas/lead.schema'
import { zodResolver } from '@hookform/resolvers/zod'
// import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

// const RoleSelector = dynamic(() => import('@/components/admin/users/role-selector'), { ssr: false, loading: () => <RoleSelectorLoading /> })

const AddLeadForm = () => {
	const router = useRouter()

	const [isPending, startTransition] = useTransition()

	const form = useForm<z.infer<typeof addLeadFormSchema>>({
		resolver: zodResolver(addLeadFormSchema),
		defaultValues: leadDefaultValues,
	})

	const onSubmit: SubmitHandler<z.infer<typeof addLeadFormSchema>> = async values => {
		startTransition(async () => {
			const res = await addLead(values)

			if (!res.success) {
				toast.error('Operation failed', { description: res.message })
			} else {
				router.push('/leads')
				toast.success('Operation success', { description: res.message })
			}
		})
	}

	const handleDiscard = async () => router.push('/leads')

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div className='grid gap-y-6'>
					<div className='flex items-end'>
						<div className='grid'>
							<h1 className='text-xl md:text-2xl font-bold'>Add lead</h1>
							<p className='text-muted-foreground text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
						</div>

						<div className='hidden items-center gap-2 md:ml-auto md:flex'>
							{form.formState.isDirty ? (
								<DiscardButton
									isLoading={isPending}
									handleDiscard={handleDiscard}
								/>
							) : (
								<Button
									variant={'outline'}
									size={'sm'}
									disabled={isPending}
									onClick={() => router.push('/leads')}
									type='button'
								>
									Back
								</Button>
							)}

							<SaveButton
								isLoading={isPending}
								isDisabled={!form.formState.isDirty}
							/>
						</div>
					</div>
					<div className='grid gap-4'>
						<div className='grid gap-y-4'>
							<Card>
								<CardHeader>
									<CardTitle>Personal details</CardTitle>
									<CardDescription>Lipsum dolor sit amet, consectetur adipiscing elit</CardDescription>
								</CardHeader>
								<CardContent>
									<div className='grid grid-cols-2 gap-4'>
										<InputField
											control={form.control}
											label='First name'
											name='firstName'
											disabled={isPending}
											autoFocus
										/>
										<InputField
											control={form.control}
											label='Last name'
											name='lastName'
											disabled={isPending}
										/>

										<InputField
											control={form.control}
											label='Email'
											name='email'
											// type='email'
											disabled={isPending}
										/>

										<InputField
											control={form.control}
											label='Phone'
											name='phone'
											disabled={isPending}
										/>
									</div>
								</CardContent>
							</Card>
						</div>

						<div className='grid gap-y-4'>
							<Card>
								<CardHeader>
									<CardTitle>Company</CardTitle>
									<CardDescription>Lipsum dolor sit amet, consectetur adipiscing elit</CardDescription>
								</CardHeader>
								<CardContent>
									<div className='grid gap-4'>
										<InputField
											control={form.control}
											label='Company name'
											name='company'
											disabled={isPending}
										/>
										<InputField
											control={form.control}
											label='Job title'
											name='jobTitle'
											disabled={isPending}
										/>
									</div>
								</CardContent>
							</Card>
						</div>
						<div>
							<Card>
								<CardHeader>
									<CardTitle>Lead details</CardTitle>
									<CardDescription>Lipsum dolor sit amet, consectetur adipiscing elit</CardDescription>
								</CardHeader>
								<CardContent>
									<div className='grid gap-4'>
										<InputField
											control={form.control}
											label='Source'
											name='source'
											disabled={isPending}
										/>

										<SelectField
											control={form.control}
											name='status'
											label='Status'
											options={Object.values(LeadStatus).map(status => ({ label: status.charAt(0).toUpperCase() + status.slice(1), value: status }))}
											disabled={isPending}
										/>

										<div className='grid col-span-2'>
											<TextAreaField
												control={form.control}
												label='Notes'
												name='notes'
												disabled={isPending}
											/>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
						<div className='flex items-center justify-center gap-2 md:hidden'>
							{form.formState.isDirty ? (
								<DiscardButton
									isLoading={isPending}
									handleDiscard={handleDiscard}
								/>
							) : (
								<Button
									variant={'outline'}
									size={'sm'}
									disabled={isPending}
									onClick={() => router.push('/admin/users')}
									type='button'
								>
									Back
								</Button>
							)}

							<SaveButton
								isLoading={isPending}
								isDisabled={!form.formState.isDirty}
							/>
						</div>
					</div>
				</div>
			</form>
		</Form>
	)
}
export default AddLeadForm
