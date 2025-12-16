console.log('BookModule loaded');
import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { PrismaService } from '../prisma.service';
import { TestController } from './test.controller';
@Module({
  controllers: [BookController],
  providers: [BookService, PrismaService],
})
export class BookModule {}
