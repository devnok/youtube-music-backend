import { ApiProperty } from '@nestjs/swagger';
import { BaseHttpException } from '../base/base.http.exception';

export class BadRequestException extends BaseHttpException {
  @ApiProperty({
    default: 400,
  })
  statusCode: number;
}
