import { CreateBoardDto } from './create-board.dto';
import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class UpdateBoardDto {
  title?: string;
  description?: string;
}
