import { ApiSchema, ApiProperty } from '@nestjs/swagger'

@ApiSchema({ name: 'Create Time Card Request' })
export class CreateTimeCardDto {
  @ApiProperty({
    description: 'ID of the user who performed the work',
    example: '[VALID_USER_ID_HERE]',
    type: String,
  })
  userId: string

  @ApiProperty({
    description: 'ID of the project the work was performed for',
    example: '[VALID_PROJECT_ID_HERE]',
    type: Number,
  })
  projectId: number

  @ApiProperty({
    description: 'Time spent in hours',
    example: 4.5,
    type: Number,
  })
  timeSpent: number

  @ApiProperty({
    description: 'Date of work performed',
    example: '2024-01-15T09:00:00Z',
    type: Date,
  })
  date: Date
}
