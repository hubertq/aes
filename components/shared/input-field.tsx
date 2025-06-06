import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Control, FieldValues, Path } from 'react-hook-form'
import { InputHTMLAttributes } from 'react'

interface InputFieldProps<T extends FieldValues> extends InputHTMLAttributes<HTMLInputElement> {
	control: Control<T>
	name: Path<T>
	label?: string
	description?: string
}

const InputField = <T extends FieldValues>({ control, name, description, label, ...inputProps }: InputFieldProps<T>) => {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className='gap-1'>
					{label && <FormLabel>{label}</FormLabel>}
					<FormControl>
						<Input
							{...inputProps}
							{...field}
						/>
					</FormControl>
					{description && <FormDescription>{description}</FormDescription>}
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
export default InputField
