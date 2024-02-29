/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { UserController } from './user.controller';
import { User } from  '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], 
  providers: [UserResolver, UserService], 
  controllers: [UserController],
})
export class UserModule {}
