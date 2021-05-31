import { ApiProperty } from '@nestjs/swagger';
import { BaseHttpException } from '../base/base.http.exception';

export class ConflictException extends BaseHttpException {
  @ApiProperty({
    default: 409,
  })
  statusCode: number;
}
