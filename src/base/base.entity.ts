import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @CreateDateColumn({ nullable: true })
  createdAt: Date;
  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;
}
