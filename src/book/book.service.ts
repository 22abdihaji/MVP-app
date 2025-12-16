import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

  create(data: { title: string; author: string; description: string }) {
    return this.prisma.book.create({ data });
  }

  async findAll() {
    return this.prisma.book.findMany({
      select: {
        id: true,
        title: true,
        author: true,
        description: true,
        reviews: {
          select: {
            id: true,
            rating: true,
            comment: true,
            user: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
  }

  async findPaginated({
    page = 1,
    limit = 10,
  }: {
    page: number;
    limit: number;
  }) {
    const [books, total] = await Promise.all([
      this.prisma.book.findMany({
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          title: true,
          author: true,
          description: true,
          reviews: {
            select: {
              id: true,
              rating: true,
              comment: true,
              user: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      }),
      this.prisma.book.count(),
    ]);
    return [books, total];
  }

  async findOne(id: number) {
    return this.prisma.book.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        author: true,
        description: true,
        reviews: {
          select: {
            id: true,
            rating: true,
            comment: true,
            user: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
  }

  update(
    id: number,
    data: { title?: string; author?: string; description?: string },
  ) {
    return this.prisma.book.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.book.delete({ where: { id } });
  }
}
