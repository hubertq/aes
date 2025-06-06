import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Control, FieldValues, Path } from 'react-hook-form'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '../ui/calendar'
import { cn, formatDateTime } from '@/lib/utils'
import { Matcher } from 'react-day-picker'

interface DateFieldProps<T extends FieldValues> {
	control: Control<T>
	name: Path<T>
	label?: string
	description?: string
	disabled?: boolean
	disabledDates?: Matcher | Matcher[] | undefined
}

const DateField = <T extends FieldValues>({ control, name, description, label, disabled, disabledDates }: DateFieldProps<T>) => {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className='flex flex-col gap-1'>
					{label && <FormLabel className={cn(disabled && 'pointer-events-none')}>{label}</FormLabel>}
					<Popover>
						<PopoverTrigger asChild>
							<FormControl>
								<Button
									variant={'outline'}
									className={cn('w-full pl-3 text-left font-light', !field.value && 'text-muted-foreground')}
									disabled={disabled}
								>
									{field.value ? formatDateTime(field.value).dateOnly : <span>Pick a date</span>}
									<CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
								</Button>
							</FormControl>
						</PopoverTrigger>
						<PopoverContent
							className='w-auto p-0'
							align='start'
						>
							<Calendar
								mode='single'
								selected={field.value}
								onSelect={field.onChange}
								disabled={disabledDates}
								autoFocus
							/>
						</PopoverContent>
					</Popover>
					{description && <FormDescription>{description}</FormDescription>}
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
export default DateField
