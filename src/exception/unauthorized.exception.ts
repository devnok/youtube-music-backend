import { ApiProperty } from '@nestjs/swagger';
import { BaseHttpException } from '../base/base.http.exception';

export class UnAuthroizedException extends BaseHttpException {
  @ApiProperty({
    default: 401,
  })
  statusCode: number;
}
