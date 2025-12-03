import { Injectable, NotFoundException } from '@nestjs/common';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Injectable()
export class BoardService {
  private boards: Board[] = [];
  private nextId = 1;

  findAll(): Board[] {
    return this.boards;
  }

  findOne(id: number): Board {
    const board = this.boards.find((b) => b.id === id);
    if (!board) {
      throw new NotFoundException(`Board with id ${id} not found`);
    }
    return board;
  }

  create(createBoardDto: CreateBoardDto): Board {
    const newBoard: Board = {
      id: this.nextId++,
      title: createBoardDto.title,
      description: createBoardDto.description,
      createdAt: new Date(),
    };
    this.boards.push(newBoard);
    return newBoard;
  }

  update(id: number, updateBoardDto: UpdateBoardDto): Board {
    const board = this.findOne(id);
    if (updateBoardDto.title !== undefined) {
      board.title = updateBoardDto.title;
    }
    if (updateBoardDto.description !== undefined) {
      board.description = updateBoardDto.description;
    }
    return board;
  }

  remove(id: number): void {
    const index = this.boards.findIndex((b) => b.id === id);
    if (index === -1) {
      throw new NotFoundException(`Board with id ${id} not found`);
    }
    this.boards.splice(index, 1);
  }
}


