import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  JoinTable,
  ManyToMany,
} from "typeorm";
import { Roles } from "src/roles/roles.entity";
import { RolesPermission } from "src/roles-permissions/entities/roles-permission.entity";

@Entity()
export class User {
  @Column({ type: "varchar", length: 255, unique: true, nullable: false })
  @PrimaryGeneratedColumn()
  id: number;


  @ManyToOne(() => Roles, (Role) => Role.id)
  @JoinColumn({
    name: "role_id",
  })
  role_id: Roles | any;

  @OneToMany(() => RolesPermission, (role_permission) => role_permission.user_id)
  roles_permissions: RolesPermission[];

  @Column({ type: "varchar", length: 100, default: 1 })
  status: number;

  @Column({ type: "varchar", length: 100, unique: false, nullable: false })
  email: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  first_name: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  last_name: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  password: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  register_hash: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  remember_token: string;

  @CreateDateColumn({ type: "timestamp", nullable: true })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp", nullable: true })
  updated_at: Date;

  @DeleteDateColumn({ type: "timestamp", nullable: true })
  deleted_at: Date;
}
