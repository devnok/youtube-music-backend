import { ApiProperty } from '@nestjs/swagger';
import { FindDto } from '../../base/dto/base.search.dto';

export class FindPlaylistListDto extends FindDto {
  @ApiProperty()
  title?: string;
}
