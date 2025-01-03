import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator'
import { PrismaService } from 'src/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

@Injectable()
@ValidatorConstraint({ name: 'unique', async: true })
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  static prisma: PrismaService

  async validate(value: any, args: ValidationArguments) {
    const [model, field] = args.constraints
    let entityId = (args.object as any)?.id

    if (model === 'project') entityId = parseInt(entityId)

    const record = await IsUniqueConstraint.prisma[
      model as Prisma.ModelName
    ].findFirst({
      where: {
        [field]: value,
        NOT: entityId ? { id: entityId } : undefined,
      },
    })

    return record === null
  }

  defaultMessage(args: ValidationArguments) {
    const [field] = args.constraints
    return `A record with ${field} '${args.value}' already exists`
  }
}

export function IsUnique(
  model: string,
  field: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [model, field],
      validator: IsUniqueConstraint,
    })
  }
}
