declare const module: any;

import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import fastifySecureSession from '@fastify/secure-session'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    new FastifyAdapter(),
  );

  app.register(fastifySecureSession, {
    key: Buffer.from('a'.repeat(32)),
    cookieName: 'SESSIONID',
    secret: Buffer.from('a'.repeat(32)),
    cookie: {
      path: '/',
    }
  });

  await app.listen(3000, "0.0.0.0");

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
