import { Module } from "@nestjs/common";
import { SeederService } from "./seeder.service";
import { SeederController } from "./seeder.controller";
import { RolesRepository } from "src/roles/roles.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PermissionsModule } from "src/permissions/permissions.module";
import { RolesModule } from "../roles/roles.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([RolesRepository]),
    RolesModule,
    PermissionsModule,
  ],
  controllers: [SeederController],
  providers: [SeederService],
})
export class SeederModule {}
