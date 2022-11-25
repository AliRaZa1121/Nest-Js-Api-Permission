import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Permissions } from 'src/permissions/entities/permission.entity';

@Entity()
export class RolesPermission {

  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Permissions, (permission) => permission.id)
  @JoinColumn({
    name: 'permission_id',
  })
  permission_id: Permissions | any;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({
    name: 'user_id'
  })
  user_id: User | any;

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updated_at: Date;


}
