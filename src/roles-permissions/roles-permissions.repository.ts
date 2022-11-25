import {
  ConflictException,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { errorApiWrapper, listingApiWrapper } from "src/utilities/util.service";
import { EntityRepository, getConnection, Repository } from "typeorm";
import {
  CreateRolesPermissionDto,
  ResponseRolesPermisionDto,
} from "./dto/create-roles-permission.dto";
import { RolesPermission } from "./entities/roles-permission.entity";
import {
  ErrorApiWrapperDto,
  ListingApiWrapperDto,
} from "src/utilities/dto/util.dto";
import { rolesPermisionListingMapper } from "./roles-permission.mapper";
import { User } from "src/users/entities/user.entity";
import { Roles } from "src/roles/roles.entity";

@EntityRepository(RolesPermission)
export class RolesPermissionsRepository extends Repository<RolesPermission> {
  async createUserPermissions(user: User, role: Roles): Promise<boolean> {
    try {
      let permissions = [];
      permissions = role?.permissions ? JSON.parse(role.permissions) : [];
      for await (const permission of permissions) {
        const createRolesPermissionDto = {
          user_id: user.id,
          permission_id: permission,
        };
        await this.addUserPermissions(createRolesPermissionDto);
      }
      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }

  async addUserPermissions(createRolesPermissionDto) {
    const permissionAdded = this.create({ ...createRolesPermissionDto });
    const added = await this.save(permissionAdded);
  }

  async updateUserPermission(
    createRolesPermissionDto: CreateRolesPermissionDto
  ) {
    try {
      let { permission_id, user_id } = createRolesPermissionDto;
      await getConnection()
        .createQueryBuilder()
        .delete()
        .from(RolesPermission)
        .where("user_id = :user_id", { user_id: user_id })
        .execute();
      permission_id.forEach(async (element) => {
        Object.assign(createRolesPermissionDto, { permission_id: element });
        const permission = this.create({ ...createRolesPermissionDto });
        await this.save(permission);
      });
      return true;
    } catch (error) {
      throw new InternalServerErrorException(errorApiWrapper(error.message));
    }
  }

  async checkIfPermissionExistAgainstUser(
    user_id: number,
    permission_id: number
  ): Promise<boolean> {
    const userPermissions = await this.find({
      where: {
        user_id: user_id,
        permission_id: permission_id,
      },
    });
    return userPermissions.length === 0 ? false : true;
  }

  async getPermissionByUserId(
    user_id: number
  ): Promise<ListingApiWrapperDto | ErrorApiWrapperDto> {
    try {
      const roles_permissions = await this.find({
        relations: ["permission_id", "user_id"],
        where: {
          user_id: user_id,
        },
      });
      const data: RolesPermission[] | ResponseRolesPermisionDto[] =
        rolesPermisionListingMapper(roles_permissions);
      return listingApiWrapper(data);
    } catch (error) {
      throw new InternalServerErrorException(errorApiWrapper(error.message));
    }
  }

  async getAllPermissions(): Promise<
    ListingApiWrapperDto | ErrorApiWrapperDto
  > {
    try {
      const roles_permissions = await this.find({
        relations: ["permission_id", "user_id"],
      });
      const data: RolesPermission[] | ResponseRolesPermisionDto[] =
        rolesPermisionListingMapper(roles_permissions);
      return listingApiWrapper(data);
    } catch (error) {
      throw new InternalServerErrorException(errorApiWrapper(error.message));
    }
  }

  async deleteByUserId(user_id: number){
    await await getConnection()
    .createQueryBuilder()
    .delete()
    .from(RolesPermission)
    .where("user_id = :user_id", { user_id: user_id })
    .execute();
  }


  async createUserPermissionsSeeder(permissions, user_id) {
    for await (const permission of permissions) {
      const createRolesPermissionDto = {
        user_id: user_id,
        permission_id: permission,
      };
      await this.addUserPermissions(createRolesPermissionDto);
    }
  }
}
