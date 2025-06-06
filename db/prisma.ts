import 'dotenv/config'
import { PrismaClient } from '@/generated/prisma'
import { PrismaNeon } from '@prisma/adapter-neon'
import { neonConfig } from '@neondatabase/serverless'

import ws from 'ws'
neonConfig.webSocketConstructor = ws

// To work in edge environments (Cloudflare Workers, Vercel Edge, etc.), enable querying over fetch
neonConfig.poolQueryViaFetch = true

// const prismaClientSingleton = () => {
// 	return new PrismaClient()
// }

// declare global {
// 	// prevent re-declaration errors
// 	// eslint-disable-next-line no-var
// 	var prisma: ReturnType<typeof prismaClientSingleton> | undefined
// }

// export const prisma = global.prisma ?? prismaClientSingleton()

// if (process.env.NODE_ENV !== 'production') global.prisma = prisma

declare global {
	var prisma: PrismaClient | undefined
}

const connectionString = `${process.env.DATABASE_URL}`
const adapter = new PrismaNeon({ connectionString })
const prisma = global.prisma || new PrismaClient({ adapter })
if (process.env.NODE_ENV === 'development') global.prisma = prisma
export default prisma
