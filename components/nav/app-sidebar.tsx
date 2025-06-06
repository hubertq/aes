'use client'
import * as React from 'react'

import { NavMain } from './nav-main'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar'
// import dynamic from 'next/dynamic'
// import { NavUserSkeleton } from './nav-user'
import { CompanyHeader } from './company-header'

// const NavUser = dynamic(() => import('./nav-user'), { ssr: false, loading: () => <NavUserSkeleton /> })

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar
			collapsible='icon'
			{...props}
		>
			<SidebarHeader>
				<CompanyHeader />
			</SidebarHeader>
			<SidebarContent>
				<NavMain />
			</SidebarContent>
			<SidebarFooter>{/* <NavUser /> */}</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	)
}
