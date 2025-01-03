import { Injectable } from '@nestjs/common'
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator'
import { ProjectStatus } from '@prisma/client'

@Injectable()
@ValidatorConstraint({ name: 'validStatus', async: true })
export class IsValidStatusConstraint implements ValidatorConstraintInterface {
  validate(status: any) {
    return Object.values(ProjectStatus).includes(status)
  }

  defaultMessage() {
    return `Status must be one of: ${Object.values(ProjectStatus).join(', ')}`
  }
}

export function IsValidStatus() {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      validator: IsValidStatusConstraint,
    })
  }
}
