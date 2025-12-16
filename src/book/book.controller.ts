import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from '@prisma/client';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  async create(
    @Body() bookData: { title: string; author: string; description: string },
  ) {
    const book = await this.bookService.create(bookData);
    return {
      status: 'success',
      data: { book },
    };
  }

  @Get()
  async findAll() {
    const books = await this.bookService.findAll();
    return {
      status: 'success',
      results: books.length,
      data: { books },
    };
  }

  @Get('paginated')
  async findPaginated(@Query() query: { page: number; limit: number }) {
    const [books, total] = await this.bookService.findPaginated(query);
    return {
      status: 'success',
      results: books,
      total,
      data: { books },
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const book = await this.bookService.findOne(+id);
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return {
      status: 'success',
      data: { book },
    };
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: { title?: string; author?: string; description?: string },
  ) {
    return this.bookService.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(+id);
  }
}
