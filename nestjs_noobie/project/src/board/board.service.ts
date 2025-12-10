import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/request/create-board.dto';
import { UpdateBoardDto } from './dto/request/update-board.dto';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
  ) {}

  findAll(): Promise<Board[]> {
    return this.boardRepository.find();
  }

  async findOne(id: number): Promise<Board> {
    const board = await this.boardRepository.findOne({ where: { id } });
    if (!board) {
      throw new NotFoundException(`Board with id ${id} not found`);
    }
    return board;
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

