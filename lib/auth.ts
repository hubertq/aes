import { APP_NAME } from '@/constants/app.constants'
import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import prisma from '@/db/prisma'
import { nextCookies } from 'better-auth/next-js'
import { admin } from 'better-auth/plugins'
import { ac, roles } from './permissions'

export const auth = betterAuth({
	appName: APP_NAME,
	database: prismaAdapter(prisma, {
		provider: 'postgresql',
	}),
	emailAndPassword: {
		enabled: true,
	},
	session: {
		cookieCache: {
			enabled: true,
			maxAge: 5 * 60,
		},
		additionalFields: {
			country: {
				type: 'string',
				required: false,
			},
			region: {
				type: 'string',
				required: false,
			},
			city: {
				type: 'string',
				required: false,
			},
			countryFlag: {
				type: 'string',
				required: false,
			},
		},
	},
	advanced: {
		ipAddress: {
			ipAddressHeaders: ['x-client-ip', 'x-forwarded-for'], // Headers to check for IP address
			disableIpTracking: false, // Ensure IP tracking is enabled
		},
		database: {
			generateId: false,
		},
	},
	plugins: [
		admin({
			ac,
			roles: {
				...roles,
			},
			defaultRole: 'user',
			adminRoles: ['admin'],
		}),
		nextCookies(),
	],
})
