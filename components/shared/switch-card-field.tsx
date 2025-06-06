import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Control, FieldValues, Path } from 'react-hook-form'
import { Switch } from '../ui/switch'

interface SwitchCardFieldProps<T extends FieldValues> {
	control: Control<T>
	name: Path<T>
	label?: string
	description?: string
	disabled?: boolean
}

const SwitchCardField = <T extends FieldValues>({ control, name, description, label, disabled }: SwitchCardFieldProps<T>) => {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className='flex flex-row items-center justify-between rounded-lg border p-3'>
					<div className='space-y-1'>
						<FormLabel>{label}</FormLabel>
						<FormDescription>{description}</FormDescription>
					</div>
					<FormControl>
						<Switch
							checked={field.value}
							onCheckedChange={field.onChange}
							disabled={disabled}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
export default SwitchCardField
