import { ApiProperty } from '@nestjs/swagger';
import { BaseHttpException } from '../base/base.http.exception';

export class NotFoundException extends BaseHttpException {
  @ApiProperty({
    default: 404,
  })
  statusCode: number;
}
