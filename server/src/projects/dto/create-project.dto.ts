import { ApiSchema, ApiProperty } from '@nestjs/swagger'
import { ProjectStatus } from '@prisma/client'
import { IsUnique } from 'src/shared/validators/is-unique.validator'
import { IsValidStatus } from '../validators/is-valid-status.validator'

const THREE_MONTHS_AGO = new Date(Date.now() - 7776000000)
const ONE_MONTH_FROM_NOW = new Date(Date.now() + 2629746000)

@ApiSchema({ name: 'Create Project Request' })
export class CreateProjectDto {
  @ApiProperty({ example: 'Example name' })
  @IsUnique('project', 'name', {
    message: 'A project with this name already exists.',
  })
  name: string

  @ApiProperty({
    required: false,
    example: 'Example description',
  })
  description?: string

  @ApiProperty({
    required: false,
    enum: ProjectStatus,
    example: ProjectStatus.LEAD,
  })
  @IsValidStatus()
  status?: ProjectStatus

  @ApiProperty({
    description: 'ISO 8601 date string',
    required: false,
    type: Date,
    example: THREE_MONTHS_AGO,
  })
  startDate?: Date

  @ApiProperty({
    description: 'ISO 8601 date string',
    required: false,
    type: Date,
    example: ONE_MONTH_FROM_NOW,
  })
  completionDate?: Date

  @ApiProperty({
    required: false,
    default: false,
    example: false,
  })
  isArchived?: boolean
}
