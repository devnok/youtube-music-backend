import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class FindDto {
  @ApiProperty()
  cursor?: string;

  @ApiPropertyOptional({
    type: Number,
    default: 10,
    minimum: 1,
    maximum: 100,
  })
  @IsNumber()
  @IsOptional()
  limit = 10;
}
