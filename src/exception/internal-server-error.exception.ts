import { ApiProperty } from '@nestjs/swagger';
import { BaseHttpException } from '../base/base.http.exception';

export class InternalServerErrorException extends BaseHttpException {
  @ApiProperty({
    default: 500,
  })
  statusCode = 500;
}
