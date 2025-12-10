// 이 파일은 JWT 가드를 사용하는 예시입니다.
// 실제 board.controller.ts에 적용하려면 아래 주석을 참고하세요.

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  Request, // JWT 가드 사용 시 request에서 user 정보를 가져올 수 있음
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './board.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('boards')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  // 인증 없이 접근 가능 (공개 API)
  @Get()
  findAll(): Promise<Board[]> {
    return this.boardService.findAll();
  }

  // 인증 없이 접근 가능
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Board> {
    return this.boardService.findOne(id);
  }

  // JWT 인증이 필요한 엔드포인트
  @UseGuards(JwtAuthGuard) // 이 데코레이터로 JWT 인증 활성화
  @Post()
  create(
    @Body() createBoardDto: CreateBoardDto,
    @Request() req, // JWT 가드를 통해 인증된 사용자 정보가 req.user에 저장됨
  ): Promise<Board> {
    // req.user.userId로 현재 로그인한 사용자 ID에 접근 가능
    console.log('Current user ID:', req.user.userId);
    return this.boardService.create(createBoardDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBoardDto: UpdateBoardDto,
    @Request() req,
  ): Promise<Board> {
    return this.boardService.update(id, updateBoardDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
  ): Promise<void> {
    return this.boardService.remove(id);
  }
}

/*
사용 방법:

1. BoardModule에 AuthModule import 추가:
   @Module({
     imports: [
       TypeOrmModule.forFeature([Board]),
       AuthModule, // 추가
     ],
     ...
   })

2. 컨트롤러에서 @UseGuards(JwtAuthGuard) 데코레이터 사용

3. 클라이언트에서 요청 시:
   - Header에 Authorization: Bearer {accessToken} 추가
   - 예: Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

4. 인증된 사용자 정보는 @Request() req의 req.user에 저장됨
   - req.user.userId: 사용자 ID
   - req.user.email: 사용자 이메일
*/

