import { CreateBoardDto } from './create-board.dto';

// 간단한 예제이므로 외부 유틸(PartialType) 대신 직접 Partial 형태를 구현합니다.
export class UpdateBoardDto implements Partial<CreateBoardDto> {
  title?: string;
  description?: string;
}

