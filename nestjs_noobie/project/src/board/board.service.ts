import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/request/create-board.dto';
import { UpdateBoardDto } from './dto/request/update-board.dto';
import { getBoardResponse } from './dto/response/getBoardResponse';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
  ) {}

findAll(): Promise<getBoardResponse[]> {
  return this.boardRepository.find().then(boards =>
    boards.map(board => ({
      id: board.id,
      title: board.title,
      description: board.description,
      createdAt: board.createdAt,
    })),
  );
}

async findOne(id: number): Promise<getBoardResponse> {
  const board = await this.boardRepository.findOne({ where: { id } });

  if (!board) {
    throw new NotFoundException(`Board with id ${id} not found`);
  }

  return {
    id: board.id,
    title: board.title,
    description: board.description,
    createdAt: board.createdAt,
  };
}

  create(createBoardDto: CreateBoardDto): Promise<Board> {
    const board = this.boardRepository.create(createBoardDto);
    return this.boardRepository.save(board);
  }

  async update(id: number, updateBoardDto: UpdateBoardDto): Promise<Board> {
    const board = await this.findOne(id);
    const { title, description } = updateBoardDto;
    if (title !== undefined) {
      board.title = title;
    }
    if (description !== undefined) {
      board.description = description;
    }
    return this.boardRepository.save(board);
  }

  async remove(id: number): Promise<void> {
    const result = await this.boardRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Board with id ${id} not found`);
    }
  }
}

