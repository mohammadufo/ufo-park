import { PrismaClient } from '@prisma/client'
import { garages } from './data'

const DEMO_COMPANY = 'UFO Park Demo'

/**
 * Fills an empty database with a demo company and its garages.
 * Safe to run more than once: it skips if the demo garages already exist.
 */
async function main(prisma: PrismaClient) {
  const company =
    (await prisma.company.findFirst({
      where: { displayName: DEMO_COMPANY },
    })) ??
    (await prisma.company.create({
      data: {
        displayName: DEMO_COMPANY,
        description: 'Sample garages around New York for trying out UFO Park.',
      },
    }))

  const existing = await prisma.garage.count({
    where: { companyId: company.id },
  })
  if (existing > 0) {
    console.log(`Seed skipped: ${existing} demo garages already exist.`)
    return
  }

  for (const garage of garages) {
    await prisma.garage.create({
      data: { ...garage, Company: { connect: { id: company.id } } },
    })
  }
  console.log(`Seeded ${garages.length} demo garages.`)
}

const prisma = new PrismaClient()

main(prisma)
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
  .finally(() => prisma.$disconnect())
