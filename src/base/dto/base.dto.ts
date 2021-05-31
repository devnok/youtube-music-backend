import { BaseEntity } from '../base.entity';

export class BaseDto {
  id: string;
  created_at: Date;
  updated_at: Date;

  constructor(entity: BaseEntity) {
    this.id = entity.id;
    this.created_at = entity.created_at;
    this.updated_at = entity.created_at;
  }
}
