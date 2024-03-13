/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { BooksModule } from './books/books.module';
import { dataSourceOptions } from 'db/data-source';

const configModuleOptions: ConfigModuleOptions = { envFilePath: '.env' };

@Module({
  imports: [
    MulterModule.register({ dest: './uploads'}),
    ConfigModule.forRoot(configModuleOptions),
    TypeOrmModule.forRoot(dataSourceOptions),
    UserModule,
    BooksModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
