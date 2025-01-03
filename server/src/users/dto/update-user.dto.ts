import { ApiSchema, PartialType } from '@nestjs/swagger'
import { CreateUserDto } from './create-user.dto'

@ApiSchema({ name: 'Update User Request' })
export class UpdateUserDto extends PartialType(CreateUserDto) {
  /*
    ID field used by @WithId decorator for validation checks
    against specific database entries (e.g. unique fields)
  */
  id?: string
}
