import { ApiPropertyOptional } from '@nestjs/swagger';
import { FindDto } from '../../base/dto/base.search.dto';

export class FindSongListDto extends FindDto {
  @ApiPropertyOptional()
  title?: string;
}
