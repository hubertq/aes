import { PrismaClient } from '@/generated/prisma'

const prismaClientSingleton = () => {
	return new PrismaClient()
}

declare global {
	// prevent re-declaration errors
	// eslint-disable-next-line no-var
	var prisma: ReturnType<typeof prismaClientSingleton> | undefined
}

export const prisma = global.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') global.prisma = prisma
