import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ISensitiveData } from 'src/interfaces/ISensitiveData';
import { RegisterDto } from 'src/modules/auth/dto/register.dto';
import { UserRepository } from './user.repository';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Messages } from 'src/enums/messages.enum';
import { DefaultFilter } from 'src/filters/DefaultFilter';
import { Paginated } from 'src/interfaces/IPaginated';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  excludeUserFields<User, Key extends keyof User>(user: User, keys: Key[]): User {
    for (const key of keys) {
      delete user[key];
    }
    return user;
  }

  async getMe(dto: User): Promise<User> {
    return await this.findById(dto.id);
  }

  async findByEmail(email: string, returningOptions?: ISensitiveData): Promise<User> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException(Messages.USER_NOT_FOUND);
    }

    const fieldsToExclude = [];

    if (!returningOptions?.sessionToken) fieldsToExclude.push('sessionToken');
    if (!returningOptions?.password) fieldsToExclude.push('password');

    return this.excludeUserFields(user, fieldsToExclude);
  }

  async findById(idUser: number, returningOptions?: ISensitiveData): Promise<User> {
    const user = await this.userRepository.findById(idUser);

    if (!user) {
      throw new NotFoundException(Messages.USER_NOT_FOUND);
    }

    const fieldsToExclude = [];

    if (!returningOptions?.sessionToken) fieldsToExclude.push('sessionToken');
    if (!returningOptions?.password) fieldsToExclude.push('password');

    return this.excludeUserFields(user, fieldsToExclude);
  }

  async createUser(dto: RegisterDto): Promise<User> {
    const userAlreadyRegistred = await this.userRepository.findByEmail(dto.email);

    if (userAlreadyRegistred) {
      throw new BadRequestException(Messages.ALREADY_EXISTS_ONE_ACCOUNT_FOR_THIS_EMAIL);
    }

    if (dto.password) dto.password = await bcrypt.hash(dto.password, 10);
    const user = await this.userRepository.createUser(dto);
    return this.excludeUserFields(user, ['password', 'sessionToken']);
  }

  async findFilteredAsync(
    filter: DefaultFilter,
    user?: UserDto
  ): Promise<Paginated<User>> {
    return await this.userRepository.findFilteredAsync(filter, user);
  }

  async updateAsync(id: number, dto: UserDto): Promise<User> {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException(Messages.USER_NOT_FOUND);
    }
    const updatedUser = await this.userRepository.updateAsync(id, dto);
    return this.excludeUserFields(updatedUser, ['password', 'sessionToken']);
  }
}
