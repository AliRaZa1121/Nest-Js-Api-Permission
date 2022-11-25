import { isEnum } from "class-validator";
import { RoleType } from "src/utilities/constant";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { BeforeInsert } from "typeorm/decorator/listeners/BeforeInsert";
import { BeforeUpdate } from "typeorm/decorator/listeners/BeforeUpdate";
@Entity()
export class Roles {
  @Column({ type: "varchar", length: 255, unique: true, nullable: false })
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100, nullable: true })
  name: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  slug: string;

  @Column({ type: "enum", enum: RoleType, default: RoleType.systemCoordinator })
  type: RoleType | string;

  @Column({ type: "boolean", default: false })
  can_login: boolean;

  @Column({ type: "boolean", default: true })
  is_contact: boolean;

  @Column({ type: "text", default: null })
  permissions: any;

  @CreateDateColumn({ type: "timestamp", nullable: true })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp", nullable: true })
  updated_at: Date;

  @DeleteDateColumn({ type: "timestamp", nullable: true })
  deleted_at: Date;
}
