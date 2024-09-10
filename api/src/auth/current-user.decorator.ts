import { ExecutionContext, createParamDecorator } from '@nestjs/common'
export class CurrentUserDto {
  username: string
}
export const CurrentUser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest()
  return request.user
})
