import { ApiSchema, PartialType } from '@nestjs/swagger'
import { CreateProjectDto } from './create-project.dto'

@ApiSchema({ name: 'Update Project Request' })
export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  /*
    ID field used by @WithId decorator for validation checks
    against specific database entries (e.g. unique fields)
  */
  id?: number
}
