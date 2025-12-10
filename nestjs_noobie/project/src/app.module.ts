import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './board/board.entity';
import { BoardModule } from './board/board.module';

@Module({
  imports: [
    // ConfigModule을 전역으로 설정 (.env 파일 자동 로드)
    ConfigModule.forRoot({
      isGlobal: true, // 전역 모듈로 설정하여 다른 모듈에서도 사용 가능
      envFilePath: '.env', // .env 파일 경로
    }),
    // TypeORM 설정을 ConfigService를 통해 환경 변수에서 가져오기
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST', '127.0.0.1'),
        port: configService.get<number>('DB_PORT', 3306),
        username: configService.get<string>('DB_USERNAME', 'root'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE', 'nestjs_noobie'),
        entities: [Board],
        synchronize: configService.get<string>('NODE_ENV') !== 'production', // 프로덕션에서는 false
      }),
      inject: [ConfigService],
    }),
    BoardModule,
  ],
})
export class AppModule {}

