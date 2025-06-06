import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Control, FieldValues, Path } from 'react-hook-form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { SelectProps } from '@radix-ui/react-select'

interface SelectFieldProps<T extends FieldValues> extends Omit<SelectProps, 'onValueChange' | 'value' | 'defaultValue'> {
	control: Control<T>
	name: Path<T>
	label?: string
	placeholder?: string
	description?: string
	clasName?: string
	options: { label: string; value: string }[]
}

const SelectField = <T extends FieldValues>({ control, name, description, label, placeholder, options, ...selectProps }: SelectFieldProps<T>) => {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className='gap-1'>
					{label && <FormLabel>{label}</FormLabel>}
					<Select
						onValueChange={field.onChange}
						defaultValue={field.value}
						{...selectProps}
					>
						<FormControl>
							<SelectTrigger className='w-full'>
								<SelectValue placeholder={placeholder} />
							</SelectTrigger>
						</FormControl>
						<SelectContent>
							{options.map((option, i) => (
								<SelectItem
									key={i}
									value={option.value}
								>
									{option.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					{description && <FormDescription>{description}</FormDescription>}
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
export default SelectField
