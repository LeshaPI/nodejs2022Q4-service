import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto } from './types/user.dto';
import { IUser } from './types/users.shema';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getAll(): Promise<IUser[]> {
    return this.usersService.getAll();
  }

  @Get(':id')
  async getUser(@Param('id', new ParseUUIDPipe()) id: string): Promise<IUser> {
    const user = await this.usersService.getUser(id);

    if (!user) {
      throw new HttpException("user doesn't exist", HttpStatus.NOT_FOUND);
    }

    return user;
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<any> {
    
    const { login, password } = createUserDto;


    return await this.usersService.createUser(createUserDto);
  }

  @Put(':id')
  async updateUser(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateUserDto: UpdatePasswordDto,
  ): Promise<any> {
    return await this.usersService.updateUser(id, updateUserDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deleteUser(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.usersService.deleteUser(id);
  }
}
