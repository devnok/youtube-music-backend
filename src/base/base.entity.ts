import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { BaseDto } from './dto/base.dto';

export abstract class BaseEntity<T extends BaseDto = BaseDto> {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ nullable: true })
  created_at: Date;

  @UpdateDateColumn({ nullable: true })
  updated_at: Date;

  // TODO: should be abstract member
  dtoClass: { new (entity: BaseEntity): T };

  toDto(): T {
    return new this.dtoClass(this);
  }
}
