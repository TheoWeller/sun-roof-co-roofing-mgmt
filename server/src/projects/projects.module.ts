import { Module } from '@nestjs/common'
import { ProjectsService } from './projects.service'
import { ProjectsController } from './projects.controller'
import { PrismaModule } from 'src/prisma/prisma.module'
import { IsValidStatusConstraint } from './validators/is-valid-status.validator'

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService, IsValidStatusConstraint],
  imports: [PrismaModule],
})
export class ProjectsModule {}
