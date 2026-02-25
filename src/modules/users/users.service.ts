import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { UserCreateDTO } from './user.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(userDTO: UserCreateDTO) {
    const userCreated = new this.userModel({
      ...userDTO,
      id: randomUUID(),
    });
    const user = userCreated.save();
    console.log(user);
    return user;
  }
}
