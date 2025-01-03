import { TimeCard as PrismaTimeCard } from '@prisma/client'
import { ApiProperty } from '@nestjs/swagger'
import { ProjectEntity } from '../../projects/entities/project.entity'
import { UserEntity } from '../../users/entities/user.entity'

export class TimeCardEntity implements PrismaTimeCard {
  @ApiProperty()
  id: string

  @ApiProperty()
  userId: string

  @ApiProperty()
  projectId: number

  @ApiProperty()
  timeSpent: number

  @ApiProperty()
  date: Date

  @ApiProperty()
  isArchived: boolean

  @ApiProperty({ required: false, nullable: true })
  archivedAt: Date | null

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date

  @ApiProperty({ type: () => ProjectEntity })
  project: ProjectEntity

  @ApiProperty({ type: () => UserEntity })
  user: UserEntity
}
