// src/book/test.controller.ts
import { Controller, Get } from '@nestjs/common';

@Controller('test-books')
export class TestController {
  @Get()
  test() {
    return 'Hello from books!';
  }
}
