import { Module } from '@nestjs/common'
import { PrismaModule } from './prisma/prisma.module'
import { ProjectsModule } from './projects/projects.module'
import { UsersModule } from './users/users.module'
import { TimeCardsModule } from './time-cards/time-cards.module'
import { ValidatorsModule } from './shared/validators/validators.module'

@Module({
  imports: [
    PrismaModule,
    ProjectsModule,
    UsersModule,
    TimeCardsModule,
    ValidatorsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
