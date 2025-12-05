import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // CORS 활성화 (프론트엔드에서 API 호출 가능하도록)
  app.enableCors({
    origin: true, // 모든 origin 허용 (개발용)
    credentials: true,
  });
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
