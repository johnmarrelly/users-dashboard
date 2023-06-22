import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard())
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async fetchUsers(): Promise<Partial<User>[]> {
    const users: User[] = await this.usersService.getAllUsers();
    const transformedUsers = users.map((user: any) => {
      const { password, _id, __v, ...rest } = user.toObject();
      return rest;
    });
    return transformedUsers;
  }

  @Get('/logged-in')
  async fetchLoggedInUsers(): Promise<User[]> {
    const loggedInUsers = await this.usersService.getLoggedInUsers();
    const transformedUsers = loggedInUsers.map((user: any) => {
      const { password, _id, __v, ...rest } = user.toObject();
      return rest;
    });
    return transformedUsers;
  }

  @Get('/:id')
  async getUserByID(@Param() param: { id: string }): Promise<Partial<User>> {
    const user: any = await this.usersService.getUserById(param.id);
    const { password, _id, __v, ...resFields } = user.toObject();
    return resFields;
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    const { email, password } = createUserDto;
    if (!email || !password) {
      throw new BadRequestException();
    }
    return await this.usersService.createUser(createUserDto);
  }
}
