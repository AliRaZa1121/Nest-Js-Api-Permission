import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RolesRepository } from "./roles.repository";
import {
  CreateRolesDto,
  FilterRoleDto,
  RoleUpdateClientDto,
} from "./dto/roles.dto";
import {
  ErrorApiWrapperDto,
  ListingApiWrapperDto,
} from "src/utilities/dto/util.dto";
import { errorApiWrapper, listingApiWrapper } from "src/utilities/util.service";
import { PermissionsService } from "src/permissions/permissions.service";
import { UsersService } from "src/users/users.service";
import { ListingParams } from "src/dto/global.dto";

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RolesRepository) private rolesRepository: RolesRepository,
    @Inject(PermissionsService) private permissionsService: PermissionsService,
    private usersService: UsersService
  ) {}

  async createRole(
    requestClientDto: CreateRolesDto
  ): Promise<ListingApiWrapperDto | ErrorApiWrapperDto> {
    let { permissions } = requestClientDto;

    try {
      if (permissions) {
        permissions.filter(async (permission) => {
          return (
            (await this.permissionsService.checkIfPermissionById(
              permission
            )) === true
          );
        });
        Object.assign(requestClientDto, {
          permissions: JSON.stringify(permissions),
        });
      }
      return await this.rolesRepository.createRole(requestClientDto);
    } catch (error) {
      throw new InternalServerErrorException(errorApiWrapper(error.message));
    }
  }

  async getClientById(
    id: number
  ): Promise<ListingApiWrapperDto | ErrorApiWrapperDto> {
    return await this.rolesRepository.getRoleById(id);
  }

  async getAllRoles(
    filterRoleDto: FilterRoleDto,
    listingParams: ListingParams
  ): Promise<ListingApiWrapperDto | ErrorApiWrapperDto> {
    return await this.rolesRepository.getAllRoles(filterRoleDto, listingParams);
  }

  async findOne(
    id: number
  ): Promise<ListingApiWrapperDto | ErrorApiWrapperDto> {
    return await this.rolesRepository.getRoleById(id);
  }

  async update(id: number, requestUpdateRolesDto: RoleUpdateClientDto) {
    let { permissions } = requestUpdateRolesDto;
    if (permissions) {
      permissions.filter(async (permission) => {
        return (
          (await this.permissionsService.checkIfPermissionById(permission)) ===
          true
        );
      });
      Object.assign(requestUpdateRolesDto, {
        permissions: JSON.stringify(permissions),
      });
    }
    return await this.rolesRepository.updateRolesById(
      id,
      requestUpdateRolesDto
    );
  }

  async remove(id: number) {
    await this.rolesRepository.deleteRolesById(id);
    return listingApiWrapper(null, "role deleted successfully");
  }

  async createUserRoleSeeder(roleObject: [] | any[]): Promise<boolean> {
    return await this.rolesRepository
      .createRoleSeeder(roleObject)
      .then(async (roles) => {
        return await this.usersService
          .createUserSeeder()
          .then(() => true)
          .catch(() => false);
      })
      .catch((error) => {
        return false;
      });
  }
}
