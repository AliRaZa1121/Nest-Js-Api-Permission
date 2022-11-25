import { Global, Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RolesPermissionsRepository } from "src/roles-permissions/roles-permissions.repository";
import { RolesRepository } from "src/roles/roles.repository";
import { UsersRepository } from "./users.repository";
import { UserTokenRepository } from "./user_token/user_token.repository";

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      UsersRepository,
      RolesRepository,
      RolesPermissionsRepository,
    ]),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [
    UsersService,
    TypeOrmModule.forFeature([
      UsersRepository,
      UserTokenRepository,
    ]),
  ],
})
export class UsersModule {}
