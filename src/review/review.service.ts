import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

  async create(reviewData: {
    text: string;
    bookId: number;
    userId: number;
    rating: number;
    comment: string;
  }) {
    return this.prisma.review.create({
      data: reviewData,
    });
  }

  async findAll() {
    return this.prisma.review.findMany({
      select: {
        id: true,
        rating: true,
        comment: true,
        user: {
          select: {
            name: true,
          },
        },
        book: {
          select: {
            title: true,
          },
        },
      },
    });
  }

  findOne(id: number) {
    return this.prisma.review.findUnique({
      where: { id },
      include: { book: true, user: true },
    });
  }

  remove(id: number) {
    return this.prisma.review.delete({ where: { id } });
  }
}
