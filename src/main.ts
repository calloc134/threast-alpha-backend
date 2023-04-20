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
  // NestJSの初期化
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.register(fastifySecureSession, {
    // 環境変数からキーを取得
    key: Buffer.from(process.env.SESSION_KEY, 'hex'),
    // クッキーの名前はSESSIONID
    cookieName: 'SESSIONID',
    cookie: {
      path: '/',
      // 1日間
      maxAge: 1 * 24 * 60 * 60 * 1000,
      // secure属性, httpOnly属性, SameSite属性はNginxの方で付与する
    }
  });

  // 例外フィルタを有効化
  const {httpAdapter} = app.get(HttpAdapterHost)
  app.useGlobalFilters(new PrismaExceptionFilter(httpAdapter))

  // バリデーションを有効化
  app.useGlobalPipes(
    new ValidationPipe({
        whitelist: true,
        transform: true,
    })
  );

  // シリアライザを有効化
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {
      excludeExtraneousValues: true,
    })
  )

  // Swaggerを有効化
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

  // swagger.jsonとswagger.ymlのパスを指定する
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/swagger", app, document, {
    jsonDocumentUrl: "api/swagger.json",
    yamlDocumentUrl: "api/swagger.yml"
  });

  // ポート3000で待ち受け グローバルIPからのアクセスも許可
  await app.listen(3000, "0.0.0.0");

  // ホットリロードを有効化
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
