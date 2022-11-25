import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class UserToken {

  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  @PrimaryGeneratedColumn()
  id: number;

  @Column(
    { type: 'varchar', length: 255, unique: true, nullable: false }
  )
  user_id: number;

  @Column({ type: 'varchar', unique: true, nullable: false })
  token_code: number;


  @Column({ type: 'timestamp', nullable: true })
  expire_time: Date;
}