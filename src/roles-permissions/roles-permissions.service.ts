import {
  BadRequestException,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import slugify from "slugify";
import {
  ErrorApiWrapperDto,
  ListingApiWrapperDto,
} from "src/utilities/dto/util.dto";
import { errorApiWrapper, listingApiWrapper } from "src/utilities/util.service";
import { CreateRolesPermissionDto } from "./dto/create-roles-permission.dto";
import { RolesPermissionsRepository } from "./roles-permissions.repository";
import { UsersService } from "src/users/users.service";
import { PermissionsService } from "src/permissions/permissions.service";
import { User } from "src/users/entities/user.entity";
import { Roles } from "src/roles/roles.entity";

@Injectable()
export class RolesPermissionsService {
  constructor(
    @InjectRepository(RolesPermissionsRepository)
    private rolesPermissionsRepository: RolesPermissionsRepository,
    private usersService: UsersService,
    @Inject(PermissionsService) private permissionsService: PermissionsService
  ) {}

  async createUserPermissions(user: User, role: Roles): Promise<boolean> {
    return await this.rolesPermissionsRepository.createUserPermissions(
      user,
      role
    );
  }

  async updateUserPermission(
    createRolesPermissionDto: CreateRolesPermissionDto,
    currentUser: User
  ): Promise<ListingApiWrapperDto | ErrorApiWrapperDto> {
    const { permission_id, user_id } = createRolesPermissionDto;
    const user = await this.usersService.getUserById(user_id);
    const permission = permission_id.filter(
      async (item) =>
        await this.permissionsService.checkingExistanceOfPermission(item)
    );
    if (!user) {
      throw new BadRequestException(
        errorApiWrapper(`User Id Does not exist`, HttpStatus.BAD_REQUEST)
      );
    }
    const updateUserPermission =
      await this.rolesPermissionsRepository.updateUserPermission(
        createRolesPermissionDto
      );
    if (updateUserPermission) {
      return listingApiWrapper(null, "User permissions updated successfully");
    }
    throw new InternalServerErrorException(
      errorApiWrapper("Error Occured while updating user permissions")
    );
  }

  async findAll(): Promise<ListingApiWrapperDto | ErrorApiWrapperDto> {
    return await this.rolesPermissionsRepository.getAllPermissions();
  }

  async getPermissionByUserId(
    user_id: number
  ): Promise<ListingApiWrapperDto | ErrorApiWrapperDto> {
    return await this.rolesPermissionsRepository.getPermissionByUserId(user_id);
  }
}
