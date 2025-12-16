import {
  Controller,
  Post,
  Get,
  Req,
  Body,
  UseGuards,
  UsePipes,
  ValidationPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Request } from 'express';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { ReviewService } from 'src/review/review.service';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private reviewService: ReviewService,
  ) {}

  @Post('signup')
  @UsePipes(new ValidationPipe())
  async signup(@Body() dto: AuthDto) {
    try {
      const user = await this.authService.signup(dto);
      return {
        status: 'success',
        data: { user },
      };
    } catch (error) {
      throw new HttpException(
        { status: 'error', message: error.message },
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('signin')
  @UsePipes(new ValidationPipe())
  async signin(@Body() dto: AuthDto) {
    try {
      const result = await this.authService.signin(dto);
      return {
        status: 'success',
        data: result,
      };
    } catch (error) {
      throw new HttpException(
        { status: 'error', message: error.message },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  // GET /reviews
  @Get('reviews')
  async getAllReviews() {
    return this.reviewService.findAll(); // Assuming it returns all reviews with book & user
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req: Request) {
    return {
      status: 'success',
      data: {},
    };
  }
}
