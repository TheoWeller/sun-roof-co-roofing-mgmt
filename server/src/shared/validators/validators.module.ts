import { Module } from '@nestjs/common'
import { IsUniqueConstraint } from './is-unique.validator'
import { PrismaModule } from 'src/prisma/prisma.module'
import { PrismaService } from 'src/prisma/prisma.service'

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: IsUniqueConstraint,
      /**
       * Since class-validator creates its own instances of validators outside of NestJS's DI,
       * we use a factory to inject PrismaService into a static property that all instances can access
       **/
      useFactory: (prisma: PrismaService) => {
        const validator = new IsUniqueConstraint()
        IsUniqueConstraint.prisma = prisma
        return validator
      },
      inject: [PrismaService],
    },
  ],
  exports: [IsUniqueConstraint],
})
export class ValidatorsModule {}
