/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input'; 
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    console.log("ahora si entre hasta el create")
    const newUser = this.userRepository.create(createUserInput);
    console.log("este wey?", newUser)
    return await this.userRepository.save(newUser);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOneById(id: number): Promise<User | undefined> {
    return this.userRepository.findOneById(id);
  }

  async update(id: number, updateUserInput: UpdateUserInput): Promise<User | undefined> {
    const userToUpdate = await this.userRepository.findOneById(id);
    if (!userToUpdate) {
      return undefined; 
    }
    Object.assign(userToUpdate, updateUserInput);
    return this.userRepository.save(userToUpdate);
  }

  async remove(id: number): Promise<boolean> {
    const userToRemove = await this.userRepository.findOneById(id);
    if (!userToRemove) {
      return false;
    }
    await this.userRepository.remove(userToRemove);
    return true;
  }
}
