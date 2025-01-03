import { Module } from '@nestjs/common'
import { TimeCardsService } from './time-cards.service'
import { TimeCardsController } from './time-cards.controller'
import { PrismaModule } from 'src/prisma/prisma.module'

@Module({
  controllers: [TimeCardsController],
  providers: [TimeCardsService],
  imports: [PrismaModule],
})
export class TimeCardsModule {}
