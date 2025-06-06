'use client'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Control, FieldValues, Path } from 'react-hook-form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { CheckIcon, ChevronsUpDown } from 'lucide-react'
import { useState } from 'react'

interface ComboboxFieldProps<T extends FieldValues> {
	control: Control<T>
	name: Path<T>
	label?: string
	placeholder: string
	searchPlaceholder: string
	description?: string
	options: { label: string; value: string }[]
	disabled?: boolean
	modal?: boolean
}

const ComboboxField = <T extends FieldValues>({
	control,
	name,
	description,
	label,
	placeholder,
	searchPlaceholder,
	options,
	disabled,
	modal = false,
}: ComboboxFieldProps<T>) => {
	const [open, setOpen] = useState(false)
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className='flex flex-col gap-y-1'>
					{label && <FormLabel className={cn(disabled && 'pointer-events-none')}>{label}</FormLabel>}
					<Popover
						open={open}
						onOpenChange={setOpen}
						modal={modal}
					>
						<PopoverTrigger asChild>
							<FormControl>
								<Button
									variant='outline'
									role='combobox'
									className={cn('w-full justify-between font-light', !field.value && 'text-muted-foreground')}
									disabled={disabled}
								>
									{field.value ? options.find(option => option.value === field.value)?.label : placeholder}
									<ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
								</Button>
							</FormControl>
						</PopoverTrigger>
						<PopoverContent className='p-0'>
							<Command>
								<CommandInput
									placeholder={searchPlaceholder}
									className='h-9'
								/>
								<CommandList>
									<CommandEmpty>No data found.</CommandEmpty>
									<CommandGroup>
										{options.map(option => (
											<CommandItem
												value={option.value}
												key={option.value}
												onSelect={() => {
													field.onChange(option.value)
													setOpen(false)
												}}
											>
												{option.label}
												<CheckIcon className={cn('ml-auto h-4 w-4', option.value === field.value ? 'opacity-100' : 'opacity-0')} />
											</CommandItem>
										))}
									</CommandGroup>
								</CommandList>
							</Command>
						</PopoverContent>
					</Popover>

					{description && <FormDescription>{description}</FormDescription>}
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
export default ComboboxField
