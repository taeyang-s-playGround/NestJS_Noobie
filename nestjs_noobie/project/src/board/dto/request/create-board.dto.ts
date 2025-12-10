import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreateBoardDto {
  @IsString({ message: 'title은 문자열이어야 합니다.' })
  @IsNotEmpty({ message: 'title은 비어 있을 수 없습니다.' })
  @MinLength(2, { message: 'title은 최소 2글자 이상이어야 합니다.' })
  @MaxLength(50, { message: 'title은 최대 50글자까지 허용됩니다.' })
  title: string;

  @IsString({ message: 'description은 문자열이어야 합니다.' })
  @IsNotEmpty({ message: 'description은 비어 있을 수 없습니다.' })
  @MinLength(5, { message: 'description은 최소 5글자 이상이어야 합니다.' })
  @MaxLength(200, { message: 'description은 최대 200글자까지 허용됩니다.' })
  description: string;
}
