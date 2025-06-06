'use client'

import { Control, FieldValues, Path } from 'react-hook-form'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ChevronDownIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'

interface MultiSelectFieldProps<T extends FieldValues> {
	control: Control<T>
	name: Path<T>
	label?: string
	description?: string
	placeholder?: string
	options: { label: string; value: string }[]
	disabled?: boolean
}

const MultiSelectField = <T extends FieldValues>({
	control,
	name,
	label,
	description,
	placeholder = 'Select options',
	options,
	disabled,
}: MultiSelectFieldProps<T>) => {
	const [isOpen, setIsOpen] = useState(false)
	return (
		<FormField
			control={control}
			name={name}
			render={({ field, fieldState }) => {
				const selectedValues: string[] = Array.isArray(field.value) ? field.value : []

				const handleCheckedChange = (optionValue: string, checked: boolean) => {
					const updatedValues = checked ? [...selectedValues, optionValue] : selectedValues.filter(v => v !== optionValue)
					field.onChange(updatedValues)
				}

				return (
					<FormItem className='gap-1'>
						{label && (
							<FormLabel
								className={cn(disabled && 'pointer-events-none')}
								onClick={() => setIsOpen(prev => !prev)}
								htmlFor={name}
							>
								{label}
							</FormLabel>
						)}
						<DropdownMenu
							open={isOpen}
							onOpenChange={setIsOpen}
						>
							<DropdownMenuTrigger asChild>
								<FormControl>
									<Button
										variant='outline'
										className={cn(
											'w-full justify-between font-light',
											field.value.length === 0 && 'text-muted-foreground',
											fieldState.error && 'border-red-500 focus:ring-red-500'
										)}
										disabled={disabled}
										id={name}
									>
										{selectedValues.length > 0
											? options
													.filter(opt => selectedValues.includes(opt.value))
													.map(opt => opt.label)
													.join(', ')
											: placeholder}
										<ChevronDownIcon className='ml-2 h-4 w-4 shrink-0 opacity-30' />
									</Button>
								</FormControl>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								align='end'
								className='dropdown-content-width-full'
							>
								{options.map(option => (
									<DropdownMenuCheckboxItem
										key={option.value}
										checked={selectedValues.includes(option.value)}
										onCheckedChange={checked => handleCheckedChange(option.value, Boolean(checked))}
									>
										{option.label}
									</DropdownMenuCheckboxItem>
								))}
							</DropdownMenuContent>
						</DropdownMenu>

						{description && <FormDescription>{description}</FormDescription>}
						<FormMessage />
					</FormItem>
				)
			}}
		/>
	)
}

export default MultiSelectField
