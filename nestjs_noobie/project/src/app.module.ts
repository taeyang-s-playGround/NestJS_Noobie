import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './board/board.entity';
import { BoardModule } from './board/board.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root', // 환경에 맞게 수정
      password: '070211', // 환경에 맞게 수정
      database: 'nestjs_noobie', // 사용할 DB 이름
      entities: [Board],
      synchronize: true, // 개발용: 엔티티 변경 시 자동으로 테이블 동기화
    }),
    BoardModule,
  ],
})
export class AppModule {}

