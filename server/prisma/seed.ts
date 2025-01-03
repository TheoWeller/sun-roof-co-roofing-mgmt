import { Prisma, PrismaClient, User, Project } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Define users with realistic wages
  // Commercial roofers typically range from $15-35/hr cost, marked up 2-2.5x for billing
  const userUpserts: Prisma.UserUpsertArgs[] = [
    {
      where: { email: 'john.smith@example.com' },
      update: {},
      create: {
        name: 'John Smith',
        email: 'john.smith@example.com',
        costPerHour: 32.0, // Experienced foreman
        pricePerHour: 80.0,
      },
    },
    // ... more users ...
    {
      where: { email: 'sarah.johnson@example.com' },
      update: {},
      create: {
        name: 'Sarah Johnson',
        email: 'sarah.johnson@example.com',
        costPerHour: 28.0, // Senior roofer
        pricePerHour: 70.0,
      },
    },
    {
      where: { email: 'mike.williams@example.com' },
      update: {},
      create: {
        name: 'Mike Williams',
        email: 'mike.williams@example.com',
        costPerHour: 25.0, // Mid-level roofer
        pricePerHour: 62.5,
      },
    },
    {
      where: { email: 'lisa.garcia@example.com' },
      update: {},
      create: {
        name: 'Lisa Garcia',
        email: 'lisa.garcia@example.com',
        costPerHour: 30.0, // Project supervisor
        pricePerHour: 75.0,
      },
    },
    {
      where: { email: 'david.chen@example.com' },
      update: {},
      create: {
        name: 'David Chen',
        email: 'david.chen@example.com',
        costPerHour: 22.0, // Junior roofer
        pricePerHour: 55.0,
      },
    },
    {
      where: { email: 'emma.taylor@example.com' },
      update: {},
      create: {
        name: 'Emma Taylor',
        email: 'emma.taylor@example.com',
        costPerHour: 26.0, // Mid-level roofer
        pricePerHour: 65.0,
      },
    },
    {
      where: { email: 'james.wilson@example.com' },
      update: {},
      create: {
        name: 'James Wilson',
        email: 'james.wilson@example.com',
        costPerHour: 24.0, // Mid-level roofer
        pricePerHour: 60.0,
      },
    },
    {
      where: { email: 'robert.martinez@example.com' },
      update: {},
      create: {
        name: 'Robert Martinez',
        email: 'robert.martinez@example.com',
        costPerHour: 28.0, // Senior roofer
        pricePerHour: 70.0,
      },
    },
    {
      where: { email: 'amanda.brown@example.com' },
      update: {},
      create: {
        name: 'Amanda Brown',
        email: 'amanda.brown@example.com',
        costPerHour: 23.0, // Junior roofer
        pricePerHour: 57.5,
      },
    },
    {
      where: { email: 'kevin.lee@example.com' },
      update: {},
      create: {
        name: 'Kevin Lee',
        email: 'kevin.lee@example.com',
        costPerHour: 25.0, // Mid-level roofer
        pricePerHour: 62.5,
      },
    },
    {
      where: { email: 'thomas.rodriguez@example.com' },
      update: {},
      create: {
        name: 'Thomas Rodriguez',
        email: 'thomas.rodriguez@example.com',
        costPerHour: 31.0, // Senior foreman
        pricePerHour: 77.5,
      },
    },
    {
      where: { email: 'rachel.patel@example.com' },
      update: {},
      create: {
        name: 'Rachel Patel',
        email: 'rachel.patel@example.com',
        costPerHour: 27.0, // Senior roofer
        pricePerHour: 67.5,
      },
    },
    {
      where: { email: 'marcus.thompson@example.com' },
      update: {},
      create: {
        name: 'Marcus Thompson',
        email: 'marcus.thompson@example.com',
        costPerHour: 24.0, // Mid-level roofer
        pricePerHour: 60.0,
      },
    },
  ]

  // Project template with realistic timelines and statuses
  const projectsData = [
    {
      name: 'Walmart Roof Replacement',
      description:
        'Complete tear-off and replacement of 50,000 sq ft commercial roof',
      status: 'COMPLETED' as const,
      startDate: new Date('2020-03-15'),
      completionDate: new Date('2020-07-30'),
      isArchived: true,
      archivedAt: new Date('2020-08-15'),
    },
    {
      name: 'Medical Center TPO Installation',
      description:
        'New construction TPO roof installation for medical facility',
      status: 'IN_PROGRESS' as const,
      startDate: new Date('2024-01-10'),
      completionDate: null,
    },
    {
      name: 'School District Maintenance',
      description:
        'Annual maintenance and repairs for local school district roofs',
      status: 'IN_PROGRESS' as const,
      startDate: new Date('2024-02-01'),
      completionDate: null,
    },
    {
      name: 'Shopping Mall Renovation',
      description:
        'Partial roof replacement and waterproofing for retail complex',
      status: 'COMPLETED' as const,
      startDate: new Date('2023-08-15'),
      completionDate: new Date('2023-12-20'),
      isArchived: true,
      archivedAt: new Date('2024-01-05'),
    },
    {
      name: 'Industrial Warehouse Repair',
      description:
        'Emergency repairs and reinforcement of manufacturing facility roof',
      status: 'IN_PROGRESS' as const,
      startDate: new Date('2024-03-01'),
      completionDate: null,
    },
    {
      name: 'Office Complex Renovation',
      description: 'Complete roof system upgrade for 3-building office complex',
      status: 'IN_PROGRESS' as const,
      startDate: new Date('2024-02-15'),
      completionDate: null,
    },
    {
      name: 'Hotel Chain Maintenance',
      description: 'Preventive maintenance for regional hotel chain locations',
      status: 'COMPLETED' as const,
      startDate: new Date('2023-09-01'),
      completionDate: new Date('2023-11-30'),
      isArchived: true,
      archivedAt: new Date('2023-12-15'),
    },
    {
      name: 'Solar Panel Integration',
      description:
        'Roof reinforcement and solar panel installation preparation',
      status: 'IN_PROGRESS' as const,
      startDate: new Date('2024-03-15'),
      completionDate: null,
    },
    // ... more projects ...
  ]

  // Convert project data to upsert args
  const projectUpserts: Prisma.ProjectUpsertArgs[] = projectsData.map(
    (project) => ({
      where: { name: project.name },
      update: {},
      create: project,
    }),
  )

  // Function to generate realistic time cards for a project
  function generateTimeCards(
    users: User[],
    projects: Project[],
    startDate: Date,
    endDate: Date,
  ) {
    const timeCards: Prisma.TimeCardCreateInput[] = []
    const MAX_TIME_CARDS = 60

    if (!users.length) {
      console.warn('No users provided for time card generation')
      return timeCards
    }

    // Calculate how many time cards per user to stay under MAX_TIME_CARDS
    const timeCardsPerUser = Math.floor(MAX_TIME_CARDS / users.length)
    const workDaysPerUser = Math.min(timeCardsPerUser, 5) // Use minimum of 5 or calculated amount

    users.forEach((user) => {
      if (!user || !user.email) return
      if (timeCards.length >= MAX_TIME_CARDS) return

      // Randomly select a project
      const project = projects[Math.floor(Math.random() * projects.length)]

      // Get random workdays (reduced from 5 to workDaysPerUser)
      const workDays = getWorkdaysBetweenDates(
        startDate,
        endDate,
        workDaysPerUser,
      )

      workDays.forEach((date) => {
        if (timeCards.length < MAX_TIME_CARDS) {
          const hours = Math.floor(Math.random() * 6) + 3 // 3-8 hours
          timeCards.push({
            user: { connect: { email: user.email } },
            project: { connect: { id: project.id } },
            date: date,
            timeSpent: hours,
          })
        }
      })
    })

    return timeCards
  }

  // Helper functions
  function getWorkdaysBetweenDates(
    start: Date,
    end: Date,
    numDays: number,
  ): Date[] {
    const workdays: Date[] = []
    const current = new Date(start)
    const possibleDates: Date[] = []

    // Collect all workdays between start and end
    while (current <= end) {
      const dayOfWeek = current.getDay()
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        // Skip weekends
        possibleDates.push(new Date(current))
      }
      current.setDate(current.getDate() + 1)
    }

    // Randomly select numDays from possible dates
    while (workdays.length < numDays && possibleDates.length > 0) {
      const randomIndex = Math.floor(Math.random() * possibleDates.length)
      workdays.push(possibleDates.splice(randomIndex, 1)[0])
    }

    return workdays.sort((a, b) => a.getTime() - b.getTime())
  }

  // Execute the seeding
  console.log('Creating users...')
  const users = await Promise.all(userUpserts.map((u) => prisma.user.upsert(u)))
  console.log(`Created ${users.length} users`)

  console.log('Creating projects...')
  const projects = await Promise.all(
    projectUpserts.map((p) => prisma.project.upsert(p)),
  )
  console.log(`Created ${projects.length} projects`)

  // Generate and insert time cards for each project
  console.log('Generating time cards...')
  for (const project of projects) {
    console.log(`\nProcessing time cards for project: ${project.name}`)
    const timeCards = generateTimeCards(
      users,
      projects,
      project.startDate,
      project.completionDate,
    )
    console.log(`Generated ${timeCards.length} time cards`)

    console.log('Inserting time cards...')
    await Promise.all(
      timeCards.map((tc) => prisma.timeCard.create({ data: tc })),
    )
    console.log('Time cards inserted successfully')
  }

  console.log('\nSeeding completed successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
