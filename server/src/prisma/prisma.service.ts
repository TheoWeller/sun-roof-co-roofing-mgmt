import { Injectable, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { addArchiveMiddleware } from './middleware/archivedAt.middleware'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super()
    addArchiveMiddleware(this)
  }

  async onModuleInit() {
    await this.$connect()
  }

  async onModuleDestroy() {
    await this.$disconnect()
  }
}
