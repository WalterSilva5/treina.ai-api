import { User } from 'src/modules/user/entities/user.entity';
import { Request } from 'express';

export interface IAuthRequest extends Request {
  user: User;
}
