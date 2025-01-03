import { Project, ProjectStatus } from '@prisma/client'
import { ApiProperty, ApiSchema } from '@nestjs/swagger'

@ApiSchema({ name: 'Project Response' })
export class ProjectEntity implements Project {
  @ApiProperty()
  id: number

  @ApiProperty()
  name: string

  @ApiProperty()
  description: string

  @ApiProperty()
  status: ProjectStatus

  @ApiProperty()
  startDate: Date

  @ApiProperty()
  completionDate: Date

  @ApiProperty()
  isArchived: boolean

  @ApiProperty()
  archivedAt: Date

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date
}
