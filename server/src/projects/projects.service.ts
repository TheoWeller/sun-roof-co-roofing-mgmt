import { Injectable } from '@nestjs/common'
import { CreateProjectDto } from './dto/create-project.dto'
import { UpdateProjectDto } from './dto/update-project.dto'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  create(createProjectDto: CreateProjectDto) {
    return this.prisma.project.create({ data: createProjectDto })
  }

  findAll(status: 'active' | 'archived' | 'all' = 'active') {
    switch (status) {
      case 'archived':
        return this.prisma.project.findMany({ where: { isArchived: true } })
      case 'all':
        return this.prisma.project.findMany()
      case 'active':
      default:
        return this.prisma.project.findMany({ where: { isArchived: false } })
    }
  }

  async findOne(id: number) {
    return await this.prisma.project.findUnique({
      where: { id },
      include: {
        timeCards: {
          include: {
            user: true,
          },
          orderBy: {
            date: 'desc',
          },
        },
      },
    })
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    // Remove ID that was added for validation pipeline
    if (updateProjectDto?.id) delete updateProjectDto.id

    return this.prisma.project.update({
      where: { id },
      data: updateProjectDto,
    })
  }

  archive(id: number) {
    return this.prisma.project.update({
      where: { id },
      data: { isArchived: true },
    })
  }

  unArchive(id: number) {
    return this.prisma.project.update({
      where: { id },
      data: { isArchived: false },
    })
  }
}
