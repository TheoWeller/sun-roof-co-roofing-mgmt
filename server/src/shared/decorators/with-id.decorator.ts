import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const WithId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    const body = request.body
    const dto = { ...body, id: request.params.id }

    return dto
  },
)
