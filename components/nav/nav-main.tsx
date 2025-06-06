'use client'

import { ChevronRight, type LucideIcon } from 'lucide-react'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from '@/components/ui/sidebar'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { NAV_ITEMS } from '@/constants/app.constants'

interface IMenuItem {
	title: string
	url: string
	icon?: LucideIcon
	isActive?: boolean
	items?: IMenuItem[]
}

export function NavMain() {
	const pathname = usePathname()
	const activeParent = pathname.split('/')[1] || 'overview'
	const activeChild = pathname.split('/')[2] || ''

	const menuItems: IMenuItem[] = NAV_ITEMS

	return (
		<SidebarGroup>
			<SidebarMenu>
				{menuItems.map(item =>
					item.items ? (
						<Collapsible
							key={item.title}
							asChild
							defaultOpen={item.title.toLowerCase().includes(activeParent)}
							className='group/collapsible'
						>
							<SidebarMenuItem>
								<CollapsibleTrigger asChild>
									<SidebarMenuButton tooltip={item.title}>
										{item.icon && <item.icon />}
										<span>{item.title}</span>
										<ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
									</SidebarMenuButton>
								</CollapsibleTrigger>
								<CollapsibleContent>
									<SidebarMenuSub>
										{item.items?.map(subItem => (
											<Collapsible
												key={subItem.title}
												asChild
												defaultOpen={subItem.title.toLowerCase().includes(activeChild)}
												className='group/subcollapsible'
											>
												<SidebarMenuSubItem>
													{subItem.items ? (
														<>
															<CollapsibleTrigger asChild>
																<SidebarMenuSubButton className='flex w-full items-center justify-between'>
																	<span>{subItem.title}</span>
																	<ChevronRight className='ml-auto size-4 transition-transform duration-200 group-data-[state=open]/subcollapsible:rotate-90' />
																</SidebarMenuSubButton>
															</CollapsibleTrigger>
															<CollapsibleContent>
																<SidebarMenuSub className='ml-4'>
																	{subItem.items.map(nestedItem => (
																		<SidebarMenuSubItem key={nestedItem.title}>
																			<SidebarMenuSubButton asChild>
																				<Link href={nestedItem.url}>
																					<span>{nestedItem.title}</span>
																				</Link>
																			</SidebarMenuSubButton>
																		</SidebarMenuSubItem>
																	))}
																</SidebarMenuSub>
															</CollapsibleContent>
														</>
													) : (
														<SidebarMenuSubButton asChild>
															<Link
																href={subItem.url}
																className={cn(
																	{
																		'bg-accent text-accent-foreground': subItem.title.toLowerCase() === activeChild,
																	},
																	'rounded'
																)}
															>
																<span>{subItem.title}</span>
															</Link>
														</SidebarMenuSubButton>
													)}
												</SidebarMenuSubItem>
											</Collapsible>
										))}
									</SidebarMenuSub>
								</CollapsibleContent>
							</SidebarMenuItem>
						</Collapsible>
					) : (
						<SidebarMenuItem
							key={item.title}
							className={cn(
								{
									'bg-accent text-accent-foreground': item.title.toLowerCase().includes(activeParent),
								},
								'rounded'
							)}
						>
							<SidebarMenuButton
								asChild
								tooltip={item.title}
							>
								<Link href={item.url}>
									{item.icon && <item.icon />}
									<span>{item.title}</span>
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
					)
				)}
			</SidebarMenu>
		</SidebarGroup>
	)
}
