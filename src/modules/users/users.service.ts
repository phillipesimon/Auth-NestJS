import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { UserCreateDTO } from './user.dto';
import { randomUUID } from 'crypto';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(userDTO: UserCreateDTO) {
    const userExists = await this.userModel.findOne({
      username: userDTO.username,
    });

    if (userExists) {
      throw new HttpException('User already exists!', HttpStatus.BAD_REQUEST);
    }

    const password = await hash(userDTO.password, 10);

    const userCreated = new this.userModel({
      ...userDTO,
      id: randomUUID(),
      password,
    });

    const user = await userCreated.save();
    console.log(user);
    return user;
  }
}
