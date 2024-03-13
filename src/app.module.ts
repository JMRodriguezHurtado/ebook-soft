/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { BooksModule } from './books/books.module';
import { User } from './user/entities/user.entity';
import { Book } from './books/entities/book.entity';

const configModuleOptions: ConfigModuleOptions = { envFilePath: '.env' };

@Module({
  imports: [
    MulterModule.register({ dest: './uploads'}),
    ConfigModule.forRoot(configModuleOptions),
    TypeOrmModule.forRoot({  type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME, 
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE, 
    entities: [User, Book],
    synchronize: true, }),
    UserModule,
    BooksModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
