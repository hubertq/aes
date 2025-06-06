'use client'

import { BadgeCheck, Bell, ChevronsUpDown, CreditCard, LogOut, Sparkles } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar'
import { useRouter } from 'next/navigation'
import authClient from '@/lib/auth-client'
import { Skeleton } from '@/components/ui/skeleton'

export const NavUserSkeleton = () => {
	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<SidebarMenuButton
					size='lg'
					className='pointer-events-none'
				>
					<Skeleton className='h-8 w-8 rounded-lg' />
					<div className='flex flex-col gap-1 flex-1 ml-2'>
						<Skeleton className='h-4 w-32' />
						<Skeleton className='h-3 w-24' />
					</div>
					<Skeleton className='h-4 w-4 ml-auto' />
				</SidebarMenuButton>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}
const NavUser = () => {
	const { isMobile } = useSidebar()
	const router = useRouter()

	const { data, isPending } = authClient.useSession()

	const abbreviateName = (name: string) => {
		const names = name.trim().split(/\s+/)
		const firstInitial = names[0]?.charAt(0).toUpperCase() || ''
		const lastInitial = names[names.length - 1]?.charAt(0).toUpperCase() || ''
		return firstInitial + lastInitial
	}

	if (isPending) {
		return <NavUserSkeleton />
	}

	if (!isPending && data) {
		const { user } = data
		return (
			<SidebarMenu>
				<SidebarMenuItem>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<SidebarMenuButton
								size='lg'
								className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
							>
								<Avatar className='h-8 w-8 rounded-lg'>
									<AvatarImage
										src={user.image || ''}
										alt={user.name}
									/>
									<AvatarFallback className='rounded-lg'>{abbreviateName(user.name)}</AvatarFallback>
								</Avatar>
								<div className='grid flex-1 text-left text-sm leading-tight'>
									<span className='truncate font-medium'>{user.name}</span>
									<span className='truncate text-xs'>{user.email}</span>
								</div>
								<ChevronsUpDown className='ml-auto size-4' />
							</SidebarMenuButton>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
							side={isMobile ? 'bottom' : 'right'}
							align='end'
							sideOffset={4}
						>
							<DropdownMenuLabel className='p-0 font-normal'>
								<div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
									<Avatar className='h-8 w-8 rounded-lg'>
										<AvatarImage
											src={user.image || ''}
											alt={user.name}
										/>
										<AvatarFallback className='rounded-lg'>{abbreviateName(user.name)}</AvatarFallback>
									</Avatar>
									<div className='grid flex-1 text-left text-sm leading-tight'>
										<span className='truncate font-medium'>{user.name}</span>
										<span className='truncate text-xs'>{user.email}</span>
									</div>
								</div>
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuGroup>
								<DropdownMenuItem>
									<Sparkles />
									Upgrade to Pro
								</DropdownMenuItem>
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
							<DropdownMenuGroup>
								<DropdownMenuItem>
									<BadgeCheck />
									Account
								</DropdownMenuItem>
								<DropdownMenuItem>
									<CreditCard />
									Billing
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Bell />
									Notifications
								</DropdownMenuItem>
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
							<DropdownMenuItem
								onClick={async () =>
									await authClient.signOut({
										fetchOptions: {
											onSuccess: () => router.push('/'),
										},
									})
								}
							>
								<LogOut />
								Log out
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</SidebarMenuItem>
			</SidebarMenu>
		)
	}
}

export default NavUser
