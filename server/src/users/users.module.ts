import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { PrismaModule } from 'src/prisma/prisma.module'
import { ValidatorsModule } from 'src/shared/validators/validators.module'

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [PrismaModule, ValidatorsModule],
})
export class UsersModule {}
