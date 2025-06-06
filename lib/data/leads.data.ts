import prisma from '@/db/prisma'

export const fetchLeads = async () => await prisma.lead.findMany()
