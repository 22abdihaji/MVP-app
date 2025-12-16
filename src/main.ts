import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { METHODS } from 'http';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for frontend communication
  app.enableCors({
    origin: 'http://localhost:3000', // Your Next.js frontend URL
    METHODS: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    credentials: true,
  });

  // Use port 3001 (or any available port)
  const PORT = process.env.PORT || 3001;
  await app.listen(3001);
  console.log(`Backend running on http://localhost:${3001}`);
}
bootstrap();
