import { ApiPropertyOptional } from '@nestjs/swagger';
import { BaseDto } from '../../base/dto/base.dto';
import { User } from '../user.entity';

export class UserDto extends BaseDto {
  @ApiPropertyOptional()
  name: string;

  @ApiPropertyOptional()
  email: string;

  constructor(user: User) {
    super(user);
    this.name = user.name;
    this.email = user.email;
  }
}
