import { Injectable } from '@nestjs/common'
import { CreateTimeCardDto } from './dto/create-time-card.dto'
import { UpdateTimeCardDto } from './dto/update-time-card.dto'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class TimeCardsService {
  constructor(private prisma: PrismaService) {}

  create(createTimeCardDto: CreateTimeCardDto) {
    return this.prisma.timeCard.create({
      data: {
        timeSpent: createTimeCardDto.timeSpent,
        date: createTimeCardDto.date,
        user: {
          connect: { id: createTimeCardDto.userId },
        },
        project: {
          connect: { id: createTimeCardDto.projectId },
        },
      },
      include: {
        user: true,
        project: true,
      },
    })
  }

  findAll(status: 'active' | 'archived' | 'all' = 'active') {
    const baseQuery = {
      include: {
        user: {
          select: {
            name: true,
          },
        },
        project: {
          select: {
            name: true,
          },
        },
      },
    }

    switch (status) {
      case 'archived':
        return this.prisma.timeCard.findMany({
          ...baseQuery,
          where: { isArchived: true },
        })
      case 'all':
        return this.prisma.timeCard.findMany(baseQuery)
      case 'active':
      default:
        return this.prisma.timeCard.findMany({
          ...baseQuery,
          where: { isArchived: false },
        })
    }
  }

  findOne(id: string) {
    return this.prisma.timeCard.findUnique({
      where: { id },
      include: {
        project: true,
        user: true,
      },
    })
  }

  update(id: string, updateTimeCardDto: UpdateTimeCardDto) {
    return this.prisma.timeCard.update({
      where: { id },
      data: updateTimeCardDto,
    })
  }

  archive(id: string) {
    return this.prisma.timeCard.update({
      where: { id },
      data: { isArchived: true },
    })
  }

  unArchive(id: string) {
    return this.prisma.timeCard.update({
      where: { id },
      data: { isArchived: false },
    })
  }
}
