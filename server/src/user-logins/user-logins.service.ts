import { Injectable } from '@nestjs/common';
import { UserLogins } from './user-logins.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUserLogins } from './user-logins.interface';
import { CreateUserLoginDto } from './dto/create-user-logins.dto';

@Injectable()
export class UserLoginsService {
  constructor(
    @InjectModel(UserLogins.name)
    private userLoginsModel: Model<UserLogins>,
  ) {}

  async getAllUsersLogins(): Promise<UserLogins[]> {
    return await this.userLoginsModel.find();
  }

  async getLastUserLoginById(id: IUserLogins['userId']): Promise<UserLogins> {
    const response = await this.userLoginsModel
      .findOne({ userId: id })
      .sort({ createdAt: -1 })
      .limit(1);

    const { __v, _id, userId, createdAt, ...rest } = (
      response as any
    ).toObject();
    const transformedData = { ...rest, regiteredTime: createdAt };
    return transformedData;
  }

  async createUserLogin(
    createUserLoginDto: any,
    req: Request,
  ): Promise<UserLogins> {
    const payload = {
      ...createUserLoginDto,
      userIp: (req as any).ip,
      userAgent: req.headers['user-agent'],
    };
    return await this.userLoginsModel.create(payload);
  }
}
