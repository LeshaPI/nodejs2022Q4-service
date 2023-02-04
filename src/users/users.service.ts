/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IUser } from './types/users.shema';
import DB from '../DB/DB';
import { CreateUserDto, UpdatePasswordDto } from './types/user.dto';

@Injectable()
export class UsersService {
  constructor(private database: DB) {}

  async getAll(): Promise<IUser[]> {
    const users = this.database.users;
    return users.map((user) => {
      const { password, ...withoutPassword } = user;
      return withoutPassword;
    });
  }

  async getUser(id: string): Promise<IUser> {
    const user = this.database.getOneUser(id);

    if (!user) {
      throw new HttpException("user doesn't exist", HttpStatus.NOT_FOUND);
    }

    const { password, ...withoutPassword } = user;

    return withoutPassword;
  }

  async createUser(createUserDto: CreateUserDto) {
    const user = this.database.setUser(createUserDto);
    const { password, ...withoutPassword } = user;
    return withoutPassword;
  }

  async updateUser(id: string, updatedUserDto: UpdatePasswordDto) {
    const user = this.database.getOneUser(id);
    if (!user) {
      throw new HttpException("user doesn't exist", HttpStatus.NOT_FOUND);
    }

    if (user.password !== updatedUserDto.oldPassword) {
      throw new HttpException('invalid password', HttpStatus.FORBIDDEN);
    }

    if (user.id === id) {
      user.password = updatedUserDto.newPassword;
      user.updatedAt = Date.now();
      user.version += 1;
    } 

    this.database.udateUser(user);
    const { password, ...withoutPassword } = user;
    return withoutPassword
  }

  async deleteUser(id: string) {
    const deleted = this.database.deleteUser(id);
    if (!deleted) {
      throw new HttpException("user doesn't exist", HttpStatus.NOT_FOUND);
    }
  }
}
