import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { PrismaModule } from './submodules/prisma_mo/prisma.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    PrismaModule,
    new FastifyAdapter(),
  );
  await app.listen(3000);
}
bootstrap();
