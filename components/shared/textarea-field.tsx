import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Control, FieldValues, Path } from 'react-hook-form'
import { Textarea } from '@/components/ui/textarea'
import { TextareaHTMLAttributes } from 'react'

interface TextAreaFieldProps<T extends FieldValues> extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	control: Control<T>
	name: Path<T>
	label?: string
	description?: string
}

const TextAreaField = <T extends FieldValues>({ control, name, description, label, ...textareaProps }: TextAreaFieldProps<T>) => {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className='gap-1'>
					{label && <FormLabel>{label}</FormLabel>}
					<FormControl>
						<Textarea
							{...textareaProps}
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
export default TextAreaField
