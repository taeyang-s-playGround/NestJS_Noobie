import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './board.entity';

@Controller('boards')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get()
  findAll(): Board[] {
    return this.boardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Board {
    return this.boardService.findOne(id);
  }

  @Post()
  create(@Body() createBoardDto: CreateBoardDto): Board {
    return this.boardService.create(createBoardDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBoardDto: UpdateBoardDto,
  ): Board {
    return this.boardService.update(id, updateBoardDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): void {
    return this.boardService.remove(id);
  }
}


