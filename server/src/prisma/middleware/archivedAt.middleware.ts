// Automatically sets archivedAt timestamp when isArchived is set to true, or null when unarchived
import { PrismaClient } from '@prisma/client'

export function addArchiveMiddleware(prisma: PrismaClient) {
  prisma.$use(async (params, next) => {
    const writeOperations = ['update', 'updateMany', 'create', 'createMany']
    const isWriteOperation = writeOperations.includes(params.action)

    const newArchiveStatus = params.args?.data?.isArchived
    const isArchiveStatusChanged = newArchiveStatus !== undefined
    const isBeingArchived = newArchiveStatus === true

    if (isWriteOperation && isArchiveStatusChanged) {
      params.args.data.archivedAt = isBeingArchived ? new Date() : null
    }

    return next(params)
  })
}
