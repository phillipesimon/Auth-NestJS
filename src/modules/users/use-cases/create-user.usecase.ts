import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { randomUUID } from 'crypto';
import { hash } from 'bcrypt';
import { User } from '../user.schema';
import { UserCreateDTO } from '../user.dto';

@Injectable()
export class CreateUserUseCase {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async execute(userDTO: UserCreateDTO) {
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
