import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: createUserDto,
      include: {
        timeCards: {
          include: {
            project: true,
          },
          orderBy: {
            date: 'desc',
          },
        },
      },
    })
  }

  findAll(status: 'active' | 'archived' | 'all' = 'active') {
    switch (status) {
      case 'archived':
        return this.prisma.user.findMany({ where: { isArchived: true } })
      case 'all':
        return this.prisma.user.findMany()
      case 'active':
      default:
        return this.prisma.user.findMany({ where: { isArchived: false } })
    }
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        timeCards: {
          include: {
            project: true,
          },
          orderBy: {
            date: 'desc',
          },
        },
      },
    })
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    // Remove ID that was added for validation pipeline
    if (updateUserDto?.id) delete updateUserDto.id

    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    })
  }

  archive(id: string) {
    return this.prisma.user.update({
      where: { id },
      data: { isArchived: true },
    })
  }

  unArchive(id: string) {
    return this.prisma.user.update({
      where: { id },
      data: { isArchived: false },
    })
  }
}
