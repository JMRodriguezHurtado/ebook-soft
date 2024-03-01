/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Put, Body, Param, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { UserService } from './user.service'; 
import { CreateUserInput } from './dto/create-user.input';
import  { UpdateUserInput } from './dto/update-user.input' ;

@Controller('user')
export class UserController {
constructor(private readonly userService: UserService) {}

@Get()
async findAll(){
    return this.userService.findAll();
}

@Get(':id')
async findOneById(@Param('id') id: number) {
    const user =await  this.userService.findOneById(id);
   if (!user) {
       throw new NotFoundException(`user  with ID "${id}" not found`);
   } 
   return user;
}

@Post()
async create(@Body()createUserInput: CreateUserInput){
    console.log('estoy creando un user', )
    return this.userService.create(createUserInput);
}

@Put(':id')
async update(@Param('id') id:number , @Body()updateUserInput : UpdateUserInput ){
const updatedUser= await this.userService.update(id,updateUserInput );
if(!updatedUser) {
throw new NotFoundException(`User With ID="${id}" Could not be found`)
}
return updatedUser;
}

@Put('/remove/:id')
async softDelete(@Param('id') id: number) {
    const deletedUser = await this.userService.softDelete(id);  
    if(!deletedUser) { 
        throw new NotFoundException(`User With ID="${id}" could not be found`)
    }
    return deletedUser;
}
@Put('restore/:id')
async restoreUser (@Param('id') id: number) { 
    const restoredUser = await this.userService.recover(id);
    if(!restoredUser) {
      throw new InternalServerErrorException("Internal Error");
    }
    return restoredUser;
}
}
