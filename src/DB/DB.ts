/* eslint-disable prefer-const */
import { Injectable } from '@nestjs/common';
import { IUser } from '../users/types/users.shema';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from '../users/types/user.dto';

@Injectable()
export default class DB {
  users: IUser[] = [];

  getOneUser(id) {
    for (let user of this.users) {
      if (user.id === id) {
        return user;
      }
    }
  }

  setUser(userDto: CreateUserDto) {
    const updatedUser: IUser = {
      id: uuidv4(),
      ...userDto,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    this.users.push(updatedUser);
    return updatedUser;
  }

  udateUser(user: IUser) {
    const index = this.users.findIndex((dbUser) => dbUser.id === user.id);
    this.users.splice(index, 1, user);
  }

  deleteUser(id: string) {
    const index = this.users.findIndex((dbUser) => dbUser.id === id);
    const user = this.users[index];
    if (user) {
      this.users.splice(index, 1);
    }

    return user;
  }
}
