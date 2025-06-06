'use client'

import Link from 'next/link'
import { Button } from '../ui/button'
import { Plus } from 'lucide-react'

const AddButton = ({ title, href }: { title: string; href: string }) => {
	return (
		<Button
			asChild
			title={title}
			size={'sm'}
		>
			<Link href={href}>
				<Plus />
				<span className='hidden md:block'>{title}</span>
			</Link>
		</Button>
	)
}
export default AddButton
