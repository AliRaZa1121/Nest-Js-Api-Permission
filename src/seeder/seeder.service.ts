import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UsersRepository } from "src/users/users.repository";
import { RolesRepository } from "src/roles/roles.repository";
import { MAKE_HASH_LENGTH, RoleType } from "src/utilities/constant";
import { hashpassword } from "src/helpers/bcrypt.helper";
import { errorApiWrapper, listingApiWrapper } from "src/utilities/util.service";
import slugify from "slugify";
import { makeid } from "src/helpers/util.helper";
import { PermissionsService } from "src/permissions/permissions.service";
import {
  ErrorApiWrapperDto,
  ListingApiWrapperDto,
} from "src/utilities/dto/util.dto";
import permissionSeeder from "src/permissions/permission.seeder.json";
import { RolesService } from "../roles/roles.service";

@Injectable()
export class SeederService {
  constructor(
    @Inject(PermissionsService) private _permissionsService: PermissionsService,
    @Inject(RolesService) private _roleService: RolesService
  ) {}

  async runSeeder() {
    try {
      const roleObject = [
        {
          name: "Admin",
          type: RoleType.systemCoordinator,
          can_login: true,
          is_contact: false,
        },
        {
          name: "User",
          type: RoleType.user,
          can_login: true,
          is_contact: false,
        },
      ];
      const userAndRoles = await this._roleService.createUserRoleSeeder(
        roleObject
      );
      if (!userAndRoles) {
        return false;
      }
      return listingApiWrapper(null, `Seeder has been created`);
    } catch (error) {
      throw new InternalServerErrorException(errorApiWrapper(error.message));
    }
  }

  async runPermissionSeeder(): Promise<
    ListingApiWrapperDto | ErrorApiWrapperDto
  > {
    try {
      const seeders = permissionSeeder;
      for (let i = 0; i < seeders.length; i++) {
        const element = seeders[i];
        const permission =
          await this._permissionsService.createPermissionForSeeder(element);
      }
      return listingApiWrapper(null, "Seeder added successfully!");
    } catch (error) {
      throw new InternalServerErrorException(errorApiWrapper(error.message));
    }
  }
}
