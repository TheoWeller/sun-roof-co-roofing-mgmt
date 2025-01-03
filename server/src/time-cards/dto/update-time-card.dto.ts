import { ApiSchema, PartialType } from '@nestjs/swagger'
import { CreateTimeCardDto } from './create-time-card.dto'

@ApiSchema({ name: 'Update Time Card Request' })
export class UpdateTimeCardDto extends PartialType(CreateTimeCardDto) {}
