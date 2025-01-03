import { ApiSchema, ApiProperty } from '@nestjs/swagger'
import { IsString, IsNumber, IsEmail } from 'class-validator'
import { IsUnique } from 'src/shared/validators/is-unique.validator'
@ApiSchema({ name: 'Create User Request' })
export class CreateUserDto {
  @ApiProperty({
    example: 'John Smith',
  })
  @IsString()
  name: string

  @ApiProperty({
    example: 'john.smith@example.com',
  })
  @IsEmail()
  @IsUnique('user', 'email', { message: 'Email must be unique.' })
  email: string

  @ApiProperty({
    description: 'Cost per hour in USD',
    example: 40,
    type: Number,
  })
  @IsNumber()
  costPerHour: number

  @ApiProperty({
    description: 'Price charged per hour in USD',
    example: 80,
    type: Number,
  })
  @IsNumber()
  pricePerHour: number
}
