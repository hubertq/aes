'use client'

import { Button } from '../ui/button'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '../ui/alert-dialog'

const DiscardButton = ({
	isLoading,
	isDisabled,
	handleDiscard,
}: {
	isLoading?: boolean
	isDisabled?: boolean
	handleDiscard: () => Promise<void>
}) => {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button
					variant={'outline'}
					size={'sm'}
					disabled={isLoading || isDisabled}
					type='button'
				>
					Discard
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						You have unsaved changes. Are you sure you want to leave this page? Any unsaved data will be lost.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={() => handleDiscard()}>Continue</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
export default DiscardButton
