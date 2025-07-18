import { PrismaService } from 'src/database/prisma/prisma.service';
import { RegisterDto } from '../auth/dto/register.dto';
import { User } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { DefaultFilter } from 'src/filters/DefaultFilter';
import { Paginated } from 'src/interfaces/IPaginated';
import { UserDto } from './dto/user.dto';
import { Paginator } from 'src/utils/paginator';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async getMe(idUser: number): Promise<User> {
    return await this.prisma.user.findFirst({
      where: {
        id: idUser
      }
    });
  }

  async createUser(dto: RegisterDto): Promise<User> {
    return await this.prisma.user.create({
      data: {
        firstName: dto.firstName,
        lastName: dto.lastName,
        password: dto.password,
        email: dto.email
      }
    });
  }

  async findById(id: number): Promise<User> {
    return await this.prisma.user.findFirst({
      where: {
        id
      }
    });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.prisma.user.findFirst({
      where: {
        email
      }
    });
  }

  async updateAsync(id: number, dto: UserDto): Promise<User> {
    return await this.prisma.user.update({
      where: {
        id
      },
      data: dto
    });
  }

  async findFilteredAsync(
    filter: DefaultFilter,
    _user?: UserDto
  ): Promise<Paginated<User>> {
    const OR: Record<string, any>[] = [];

    if (filter?.search) {
      ['firstName', 'lastName', 'email'].map((field) => {
        OR.push({
          [field]: {
            contains: filter.search
          }
        });
      });
    }

    const paginatedResult = await Paginator.applyPagination(this.prisma.user, {
      ...filter,
      where: {
        deletedAt: null,
        AND: {
          OR
        }
      }
    });

    this.filterPaginationFields(paginatedResult);

    return paginatedResult;
  }

  private filterPaginationFields(paginatedResult: any) {
    paginatedResult.data = paginatedResult.data.map((user) => ({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role
    }));
  }
}
