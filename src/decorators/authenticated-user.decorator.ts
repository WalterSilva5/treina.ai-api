import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IAuthRequest } from 'src/interfaces/IAuthRequest';
import { User } from 'src/modules/user/entities/user.entity';

export const AuthenticatedUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): User => {
    const request = context.switchToHttp().getRequest<IAuthRequest>();
    return request.user;
  }
);
