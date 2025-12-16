import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { AuthService } from "@/auth/auth.service";

@Injectable()
export class ReviewService {
  constructor(
    private prisma: PrismaService,
    private authService: AuthService,
    private reviewService: ReviewService
  ) {}

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

  async findOne(id: number) {
    return this.prisma.review.findUnique({
      where: { id },
      include: {
        user: { select: { name: true } },
        book: { select: { title: true } },
      },
    });
  }

  async remove(id: number) {
    return this.prisma.review.delete({
      where: { id },
    });
  }
}
