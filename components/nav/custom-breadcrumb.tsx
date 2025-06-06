'use client'
import Link from 'next/link'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { usePathname } from 'next/navigation'
import React from 'react'
import { capitalizeEveryWord, cn, processWordsArray } from '@/lib/utils'

const CustomBreadcrumb = () => {
	let pathname = usePathname()
	pathname = pathname === '/' ? '/overview' : '/overview' + pathname

	const segments = pathname.split('/')

	//Check segments for 'add' or 'edit' and format
	const processedArray = processWordsArray(segments)
	return (
		<Breadcrumb className='flex'>
			<BreadcrumbList>
				{processedArray.map((segment, index) => {
					return (
						<React.Fragment key={index}>
							{/* Breadcrumb Item */}
							<BreadcrumbItem
								className={cn({
									'hidden md:block': index !== processedArray.length - 1,
								})}
							>
								{index !== processedArray.length - 1 ? (
									<BreadcrumbLink asChild>
										<Link href={segments.slice(0, index + 2).join('/')}>{capitalizeEveryWord(segment)}</Link>
									</BreadcrumbLink>
								) : (
									<BreadcrumbPage>{capitalizeEveryWord(segment)}</BreadcrumbPage>
								)}
							</BreadcrumbItem>

							{/* Breadcrumb Separator, but not for the last item */}
							{index !== processedArray.length - 1 && (
								<BreadcrumbSeparator
									className={cn({
										'hidden md:block': index !== processedArray.length - 1,
									})}
								/>
							)}
						</React.Fragment>
					)
				})}
			</BreadcrumbList>
		</Breadcrumb>
	)
}
export default CustomBreadcrumb
