'use client'

import { Loader } from 'lucide-react'
import { Button } from '../ui/button'

const SaveButton = ({ isLoading, isDisabled }: { isLoading?: boolean; isDisabled?: boolean }) => {
	return (
		<Button
			size={'sm'}
			type='submit'
			disabled={isLoading || isDisabled}
		>
			{isLoading ? <Loader className='w-4 h-4 animate-spin' /> : 'Save'}
		</Button>
	)
}
export default SaveButton
