import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // enable cors and env based port
  app.enableCors({
    origin: process.env.FRONTEND_RUL || 'http://localhost:5173',
    credentials: true,
  })
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
