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
    const newUser = this.userRepository.create(createUserInput);
    return await this.userRepository.save(newUser);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find({ where: {deleted: false} });
  }

  findOneById(id: number): Promise<User | undefined> {
    const found = this.userRepository.findOneBy({ id });
    if  (!found) {return undefined}
    return found;
  }

  async update(id: number, updateUserInput: UpdateUserInput): Promise<User | undefined> {
    const userToUpdate = await this.userRepository.findOneBy({ id });
    if (!userToUpdate) {
      return undefined; 
    }
    Object.assign(userToUpdate, updateUserInput);
    return this.userRepository.save(userToUpdate);
  }

  async softDelete(id: number): Promise<string> {
    const userToRemove = await this.userRepository.findOneBy({ id , deleted: false});
    if (!userToRemove) {
      return `No hay tal  usuario con el ID ${id}`;
    } 
    userToRemove.softDelete()
    await this.userRepository.save(userToRemove);
    return `Usuario ${id} fue removido correctamente`;
  }

  async recover(id: number): Promise<User | string> {
    const userToRecover = await this.userRepository.findOneBy({ id, deleted: true});

    if (!userToRecover) {
      return `Seguro que el usuario con el ID "${id}" existe?`;
    }
    userToRecover.recover();
    await this.userRepository.save(userToRecover)
    return userToRecover;
  }

}
