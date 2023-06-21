import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getAllUsers(): Promise<any[]> {
    return await this.userModel.find();
  }

  async getUserByUserName(email: string): Promise<any> {
    return await this.userModel.findOne({ email });
  }

  async getUserById(id: string): Promise<User> {
    return await this.userModel.findOne({ id });
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { password } = createUserDto;
    const salt = await bcrypt.genSalt();

    const hashedPassword = await bcrypt.hash(password, salt);

    return await this.userModel.create({
      ...createUserDto,
      password: hashedPassword,
    });
  }

  async updateUserById(id: string, updateUserDto: UpdateUserDto): Promise<any> {
    return await this.userModel.updateOne({ id }, updateUserDto);
  }

  async getLoggedInUsers(): Promise<User[]> {
    return await this.userModel.find({ isLoggedIn: true });
  }
}
