'use client'

import React, { useState, useCallback, useRef, ChangeEvent } from 'react'
import { Control, FieldValues, Path, UseFormClearErrors } from 'react-hook-form'
import Image from 'next/image'
import { ImageIcon, Loader, X } from 'lucide-react'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ACCEPTED_IMAGE_TYPES } from '@/constants/app.constants'
import { cn } from '@/lib/utils'

const ImageTile = ({
	image,
	isDeleting,
	isDisabled,
	handleRemove,
}: {
	image: string
	isDeleting: boolean
	isDisabled?: boolean
	handleRemove: () => void
}) => {
	return (
		<div className='border overflow-hidden relative aspect-square rounded-md flex items-center justify-center'>
			{isDeleting && (
				<div className='absolute top-0 right-0 left-0 bottom-0 z-10 flex items-center justify-center bg-accent/60'>
					<Loader className='h-6 w-6 animate-spin' />
				</div>
			)}
			<Image
				src={image}
				sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 10vw'
				alt='Preview image'
				fill
				className='object-cover rounded-md'
				priority
				unoptimized
			/>

			{(!isDeleting || !isDisabled) && (
				<Button
					type='button'
					variant={'destructive'}
					size='icon'
					className='absolute top-1 right-1 h-6 w-6'
					onClick={() => handleRemove()}
				>
					<X />
				</Button>
			)}
		</div>
	)
}

const PlaceHolderTile = ({ isLoading, handleClick }: { isLoading: boolean; handleClick: () => void }) => {
	return (
		<div
			className={cn(
				'border overflow-hidden relative aspect-square rounded-md flex items-center justify-center',
				isLoading ? 'pointer-events-none' : 'cursor-pointer'
			)}
			onClick={() => handleClick()}
		>
			{isLoading ? (
				<div className='absolute top-0 right-0 left-0 bottom-0 z-10 flex items-center justify-center bg-accent/60'>
					<Loader className='h-6 w-6 animate-spin' />
				</div>
			) : (
				<ImageIcon className='h-6 w-6 text-muted-foreground' />
			)}
		</div>
	)
}

interface ImageUploaderProps<T extends FieldValues> {
	control: Control<T>
	name: Path<T>
	label?: string
	description?: string
	className?: string
	disabled?: boolean
	maxImages?: number
	sizeLimit?: number
	defaultValues?: string | string[] | null
	onAdd: (images: FileList) => Promise<string[]>
	onRemove: (url: string) => Promise<void>
	clearErrors: UseFormClearErrors<T>
}

const ImageUploader = <T extends FieldValues>({
	control,
	name,
	description,
	label,
	className,
	disabled,
	maxImages = 1,
	sizeLimit = 1000, // 1 Mb in Kb
	defaultValues,
	onAdd,
	onRemove,
	clearErrors,
}: ImageUploaderProps<T>) => {
	const [previews, setPreviews] = useState<string[]>(!defaultValues ? [] : typeof defaultValues === 'string' ? [defaultValues] : defaultValues)
	const [imageToBeDeletedIndex, setImageToBeDeletedIndex] = useState<number | null>(null)
	const [newImagesSlots, setNewImagesSlots] = useState<number[]>([])
	const [isLoading, setIsLoading] = useState(false)
	const imageInputRef = useRef<HTMLInputElement>(null)

	const handleFileChange = useCallback(
		async (e: ChangeEvent<HTMLInputElement>, onChange: (newData: string | string[]) => void, existingData: string | string[] | null) => {
			if (e.target.files) {
				// Check file size
				for (const file of e.target.files) {
					if (file.size > sizeLimit * 1024) {
						control.setError(name, {
							type: 'custom',
							message: maxImages > 1 ? `Each image must be ${sizeLimit}KB or smaller.` : `Image must be ${sizeLimit}KB or smaller`,
						})

						return
					}
				}

				const normalizedExistingData = !existingData || typeof existingData === 'string' ? [] : existingData

				if (e.target.files.length + normalizedExistingData.length > maxImages) {
					control.setError(name, {
						type: 'custom',
						message: `You\'re allowed to upload up to ${maxImages} image${maxImages > 1 && 's'}.`,
					})
					return
				}

				clearErrors(name)
				setIsLoading(true)

				// Specify pending images slots
				const newImagesIndices = Array.from({ length: e.target.files.length }, (_, i) => normalizedExistingData.length + i)
				setNewImagesSlots(newImagesIndices)
				const uploadedImages = await onAdd(e.target.files)

				setIsLoading(false)
				setNewImagesSlots([])

				const combinedImages = [...normalizedExistingData, ...uploadedImages]
				onChange(maxImages === 1 ? combinedImages[0] : combinedImages)
				setPreviews(combinedImages)
			}
		},
		[maxImages, clearErrors, control, name, sizeLimit, onAdd]
	)

	const removeImage = useCallback(
		async (index: number, onChange: (newData: string[] | null) => void) => {
			clearErrors(name)
			setIsLoading(true)
			setImageToBeDeletedIndex(index)

			await onRemove(previews[index])

			setIsLoading(false)
			setImageToBeDeletedIndex(null)
			const filtered = previews.filter(image => image !== previews[index])
			setPreviews(filtered)
			onChange(maxImages === 1 && filtered.length === 0 ? null : filtered)

			// Clear the file input value to allow re-adding the same file
			if (imageInputRef.current) {
				imageInputRef.current.value = ''
			}

			// if (onRemove) onRemove(imageToRemove)
		},
		[onRemove, previews, clearErrors, name, maxImages]
	)

	return (
		<FormField
			control={control}
			name={name}
			render={({ field: { onChange, value, ref, ...field } }) => {
				// Call ref function to mark it as used
				// if (imageInputRef.current) {
				// 	ref(imageInputRef.current)
				// }

				const assignInputRef = (el: HTMLInputElement | null) => {
					imageInputRef.current = el
					ref(el) // this is the react-hook-form field ref
				}

				return (
					<FormItem className='gap-1'>
						{label && <FormLabel>{label}</FormLabel>}

						<FormControl>
							<Input
								type='file'
								multiple={maxImages > 1 ? true : false}
								accept={ACCEPTED_IMAGE_TYPES.join(',')}
								className='hidden'
								onChange={e => handleFileChange(e, onChange, value)}
								disabled={disabled}
								ref={assignInputRef}
								{...field}
							/>
						</FormControl>
						<div className={cn(`grid grid-cols-${maxImages} gap-x-1.5`, className)}>
							{Array.from({ length: maxImages }, (_, i) => {
								if (previews[i]) {
									return (
										<ImageTile
											key={i}
											handleRemove={() => removeImage(i, onChange)}
											image={previews[i]}
											isDeleting={imageToBeDeletedIndex === i && isLoading}
										/>
									)
								} else {
									return (
										<PlaceHolderTile
											key={i}
											isLoading={newImagesSlots.includes(i) && isLoading}
											handleClick={() => imageInputRef.current?.click()}
										/>
									)
								}
							})}
						</div>

						{description && <FormDescription>{description}</FormDescription>}
						<FormMessage />
					</FormItem>
				)
			}}
		/>
	)
}

export default ImageUploader
