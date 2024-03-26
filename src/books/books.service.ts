/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
    )  {}

  async create(createBookDto: CreateBookDto):  Promise<Book> {
    const newBook = this.bookRepository.create(createBookDto);
    return await this.bookRepository.save(newBook);
  }

  findAll():  Promise<Book[]> {
    return this.bookRepository.find({ where: {deleted: false} });
  }

  findOneById(id: string): Promise<Book | undefined> {
    const  found = this.bookRepository.findOneBy({ id });
    if (!found) { 
      return undefined
    }
    return  found;
  }

  async update(id: string, updateBookDto: UpdateBookDto): Promise<Book | undefined> {
    const  bookToUpdate = await this.findOneById(id);
    if(!bookToUpdate) { return undefined }
    Object.assign(bookToUpdate, updateBookDto);
    return await this.bookRepository.save(bookToUpdate);
  }

  async softDelete(id: string): Promise<string> {
    const bookToRemove = await this.bookRepository.findOneBy({ id , deleted :false});
    if(!bookToRemove){ return 'El libro ya ha sido borrado' };
    bookToRemove.softDelete()
    await this.bookRepository.save(bookToRemove);
    return "Libro eliminado correctamente";
  }

  async recover(id:string):Promise<Book | string>{
    const bookToRecover=await this.bookRepository.findOneBy({id, deleted: true});
    if (!bookToRecover) {return 'No se encontró el libro para recuperar'}
    bookToRecover.recover();
    await this.bookRepository.save(bookToRecover);
    return bookToRecover;
  }
}