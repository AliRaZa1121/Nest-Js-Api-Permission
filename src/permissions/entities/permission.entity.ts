
import { IsNotEmpty, MaxLength, validateSync } from 'class-validator';
import { CustomValidationError } from 'src/decorators/exceptions/custom-validation.error';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Permissions {
  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  @IsNotEmpty()
  @MaxLength(100)
  name: string;


  @Column({ length: 255 })
  @IsNotEmpty()
  @MaxLength(255)
  slug: string;

  @Column({ length: 255 })
  @IsNotEmpty()
  @MaxLength(255)
  group: string;



  @CreateDateColumn({ type: 'timestamp', nullable: true })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deleted_at: Date;

}
