import { createAccessControl } from 'better-auth/plugins/access'
import { defaultStatements } from 'better-auth/plugins/admin/access'

const statement = {
	...defaultStatements,
	user: [...defaultStatements.user],
	session: [...defaultStatements.session],
	lead: ['create', 'list', 'update', 'delete'],
} as const

// Create access controller
export const ac = createAccessControl(statement)

export const roles = {
	admin: ac.newRole({
		user: ['create', 'list', 'set-role', 'ban', 'impersonate', 'delete', 'set-password'],
		lead: ['create', 'list', 'update', 'delete'],
		session: ['list', 'revoke', 'delete'],
	}),
	user: ac.newRole({
		user: ['list', 'set-password'],
		lead: ['list', 'update'],
		session: ['list', 'revoke'],
	}),
} as const

// Infer valid resources
type Statement = typeof statement
export type Resource = keyof Statement

// Infer valid actions per resource
export type Action<R extends Resource> = Statement[R][number]

// Create a literal tuple of role names
export const ROLE_NAMES = Object.keys(roles) as [keyof typeof roles, ...Array<keyof typeof roles>]

export const ROLE_LEVELS: Record<keyof typeof roles, number> = {
	admin: 2,
	user: 1,
}

// Convert to enum-like object for z.nativeEnum
// export const RoleEnum = ROLE_NAMES.reduce((acc, key) => {
// 	acc[key] = key
// 	return acc
// }, {} as Record<(typeof ROLE_NAMES)[number], (typeof ROLE_NAMES)[number]>)
