import { ChartArea, Package, Settings2, User } from 'lucide-react'

export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'AES Contructors LMS'
export const APP_DESCRIPTION = process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'A leads management system for AES contructors.'
export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

export const NAV_ITEMS = [
	{
		title: 'Overview',
		url: '/',
		icon: ChartArea,
	},
	{
		title: 'Leads',
		url: '/leads',
		icon: Package,
	},
	{
		title: 'Manage users',
		url: '/users',
		icon: User,
	},
	{
		title: 'Settings',
		url: '#',
		icon: Settings2,
		items: [
			{
				title: 'General',
				url: '#',
			},
			{
				title: 'Reports',
				url: '#',
			},
		],
	},
]

export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
