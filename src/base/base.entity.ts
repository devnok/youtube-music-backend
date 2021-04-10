import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @CreateDateColumn({ nullable: true })
  created_at: Date;
  @UpdateDateColumn({ nullable: true })
  updated_at: Date;
}
