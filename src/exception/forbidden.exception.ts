import { ApiProperty } from '@nestjs/swagger';
import { BaseHttpException } from '../base/base.http.exception';

export class ForbiddenException extends BaseHttpException {
  @ApiProperty({
    default: 403,
  })
  statusCode: number;
}
