import { adminClient } from 'better-auth/client/plugins'
import { createAuthClient } from 'better-auth/react'
import { ac, roles } from './permissions'
const authClient = createAuthClient({
	plugins: [
		adminClient({
			ac,
			roles: {
				...roles,
			},
		}),
	],
})

export default authClient
