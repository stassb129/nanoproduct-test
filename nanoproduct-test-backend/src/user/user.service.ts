import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {InjectModel} from "@nestjs/mongoose";
import {User} from "./entities/user.model";
import {Model} from "mongoose";

@Injectable()
export class UserService {

  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async create(user: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async update(id: string, user: CreateUserDto): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, user, { new: true }).exec();
  }

  async delete(id: string): Promise<User> {
    return this.userModel.findByIdAndRemove(id).exec();
  }
}
