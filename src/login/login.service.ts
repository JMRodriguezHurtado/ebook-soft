/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async login( username: string, password: string ): Promise<boolean | string> {
        console.log("entre al login service", username, password);
        const user = await this.userRepository.findOne({ where: { username: username } });
        if (!user) {
            return "User not found";
        }
        if(!password){
            return "Invalid password";}
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return "Incorrect password";
        }
        return true;
    }
}
