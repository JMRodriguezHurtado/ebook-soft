/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Put } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOneById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(id, updateBookDto);
  }

  @Put('remove/:id')
  remove(@Param('id') id: string) {
    return this.booksService.softDelete(id);
  }

  @Put ('restore/:id')
  async restoreBook (@Param('id') id: string){
    const restoredBook = await this.booksService.recover (id);
    if (!restoredBook) {throw new Error ("Error al restaurar el libro")
  }  
    return restoredBook;
  }
}
