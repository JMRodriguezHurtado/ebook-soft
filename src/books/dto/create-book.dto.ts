/* eslint-disable prettier/prettier */
import {IsNotEmpty, IsString} from  'class-validator';

export class CreateBookDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    genre: string;

    @IsNotEmpty()
    @IsString()
    sinopsis: string;
}
