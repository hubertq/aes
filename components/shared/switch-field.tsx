import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Control, FieldValues, Path } from 'react-hook-form'
import { Switch } from '../ui/switch'

interface SwitchFieldProps<T extends FieldValues> {
	control: Control<T>
	name: Path<T>
	label?: string
	description?: string
	disabled?: boolean
}

const SwitchField = <T extends FieldValues>({ control, name, description, label, disabled }: SwitchFieldProps<T>) => {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className='gap-y-1'>
					<div className='flex gap-x-2'>
						<FormControl>
							<Switch
								checked={field.value}
								onCheckedChange={field.onChange}
								disabled={disabled}
							/>
						</FormControl>
						{label && <FormLabel className='font-light'>{label}</FormLabel>}
					</div>
					{description && <FormDescription>{description}</FormDescription>}
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
export default SwitchField
