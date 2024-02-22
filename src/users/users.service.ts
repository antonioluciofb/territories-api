import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dtos/create-user';
import { encryptPassword } from '../utils/password';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async create(user: CreateUserDTO): Promise<any> {
    const userAlreadyExists = await this.userModel.findOne({
      name: user.name,
    });

    if (userAlreadyExists) {
      throw new BadRequestException(
        `User with name ${user.name} already exists`,
      );
    }

    user.password = await encryptPassword(user.password);

    const createdUser = new this.userModel(user);

    await createdUser.save();

    return {
      id: createdUser._id,
      name: createdUser.name,
    };
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).select('-password');

    if (!user) {
      throw new BadRequestException(`User with id ${id} not found`);
    }

    return user;
  }

  async findOneByName(name: string): Promise<User> {
    // indepentemente se o valor no banco estiver em caixa alta ou baixa
    const user = await this.userModel.findOne({
      name: { $regex: new RegExp(`^${name}$`, 'i') },
    });

    if (!user) {
      throw new BadRequestException(`User with name ${name} not found`);
    }

    return user;
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().select('-password');
  }

  async delete(id: string): Promise<void> {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new BadRequestException(`User with id ${id} not found`);
    }

    await this.userModel.deleteOne({ _id: id });
  }
}
