import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Eye, EyeClosed } from 'lucide-react'
import Link from 'next/link'
import { Control, FieldValues, Path } from 'react-hook-form'
import { Button } from '../ui/button'
import { useState } from 'react'
import { InputHTMLAttributes } from 'react'

interface PasswordFieldProps<T extends FieldValues> extends InputHTMLAttributes<HTMLInputElement> {
	control: Control<T>
	name: Path<T>
	label?: string
	description?: string
	resetPassword?: boolean
	togglePassword?: boolean
}

const PasswordField = <T extends FieldValues>({
	control,
	name,
	label,
	description,
	resetPassword = false,
	togglePassword = false,
	...inputProps
}: PasswordFieldProps<T>) => {
	const [showPassword, setShowPassword] = useState(false)
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className='gap-1 relative'>
					{label && <FormLabel className='font-light'>{label}</FormLabel>}
					{togglePassword && (
						<Button
							variant={'link'}
							size={'icon'}
							className='absolute top-[18px] right-0 cursor-pointer'
							onClick={() => setShowPassword(!showPassword)}
							aria-label={showPassword ? 'Hide password' : 'Show password'}
							type='button'
						>
							{showPassword ? <Eye className='h-4 w-4 text-muted-foreground' /> : <EyeClosed className='h-4 w-4 text-muted-foreground' />}
						</Button>
					)}
					<FormControl>
						<Input
							type={showPassword ? 'text' : 'password'}
							{...inputProps}
							{...field}
						/>
					</FormControl>
					{description && <FormDescription>{description}</FormDescription>}
					{resetPassword && (
						<Link
							href='/forgot-password'
							className='inline text-right text-sm hover:underline'
						>
							Forgot your password?
						</Link>
					)}

					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
export default PasswordField
