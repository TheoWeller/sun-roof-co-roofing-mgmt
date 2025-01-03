import { User as PrismaUser, TimeCard } from '@prisma/client'
import { ApiProperty, ApiSchema } from '@nestjs/swagger'
import { TimeCardEntity } from '../../time-cards/entities/time-card.entity'

@ApiSchema({ name: 'User Response' })
export class UserEntity implements PrismaUser {
  @ApiProperty()
  id: string

  @ApiProperty()
  name: string

  @ApiProperty()
  email: string

  @ApiProperty()
  costPerHour: number

  @ApiProperty()
  pricePerHour: number

  @ApiProperty()
  isArchived: boolean

  @ApiProperty()
  archivedAt: Date

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date

  @ApiProperty({ type: [TimeCardEntity] })
  timeCards: TimeCard[]
}
