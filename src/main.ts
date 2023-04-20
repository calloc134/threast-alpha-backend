declare const module: any;
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import fastifySecureSession from '@fastify/secure-session'
import { AppModule } from '@app.module';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { HttpAdapterHost, NestFactory, Reflector } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PrismaExceptionFilter } from '@filters/prisma.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.register(fastifySecureSession, {
    // 環境変数からキーを取得
    key: Buffer.from(process.env.SESSION_KEY, 'hex'),
    cookieName: 'SESSIONID',
    cookie: {
      path: '/',
      maxAge: 1 * 24 * 60 * 60 * 1000,
    }
  });

  const {httpAdapter} = app.get(HttpAdapterHost)
  app.useGlobalFilters(new PrismaExceptionFilter(httpAdapter))

  app.useGlobalPipes(
    new ValidationPipe({
        whitelist: true,
        transform: true,
    })
  );

  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {
      excludeExtraneousValues: true,
    })
  )

  const config = new DocumentBuilder()
    .setTitle("Threast-ALpha Backend API")
    .setDescription("Threast-ALpha Backend API description")
    .setVersion("0.0.1")
    .addCookieAuth("SESSIONID", {
        type: "apiKey",
        in: "cookie",
        name: "SESSIONID",
    }, "SESSIONID")
    .addSecurity("role", {
        type: "apiKey",
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/swagger", app, document, {
    jsonDocumentUrl: "api/swagger.json",
    yamlDocumentUrl: "api/swagger.yml"
  });

  await app.listen(3000, "0.0.0.0");

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
