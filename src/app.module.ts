import { Module } from '@nestjs/common';
import { BookModule } from './book/book.module';
import { ReviewModule } from './review/review.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookController } from './book/book.controller';
import { PrismaService } from './prisma.service';
import { BookService } from './book/book.service';

@Module({
  imports: [AuthModule, UserModule, BookModule, ReviewModule],
  controllers: [AppController, BookController],
  providers: [AppService, BookService, PrismaService],
})
export class AppModule {}
