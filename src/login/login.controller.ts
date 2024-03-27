/* eslint-disable prettier/prettier */
import { Controller, Post, Body } from '@nestjs/common';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
    constructor(private readonly loginService: LoginService) {}

    @Post()
    login(@Body('username') username: string, @Body('password') password: string) {
        console.log("estoy en el post", );
        const result = this.loginService.login(username, password);
        if(typeof result === 'string') {
            return { error: result};
        } else {
            return result;
        }
    } 
}
