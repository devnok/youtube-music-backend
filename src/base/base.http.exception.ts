import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { StatusCode } from './constants/status-code';

export class BaseHttpException extends Error {
  statusCode: number;
  @ApiPropertyOptional()
  message: string;
}
