import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { fastifyHelmet } from '@fastify/helmet';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  // app.enableCors({
  //   origin: '*',
  //   allowedHeaders: [
  //     'Accept',
  //     'Authorization',
  //     'Content-Type',
  //     'Origin',
  //     'Referrer',
  //     'X-Frame-Options',
  //     'X-XSS-Protection',
  //   ],
  //   methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  // });
  await app.register(fastifyHelmet);
  await app.listen(3002);
}

bootstrap();
