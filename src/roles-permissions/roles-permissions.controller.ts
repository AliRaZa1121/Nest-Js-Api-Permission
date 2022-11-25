import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Put,
} from "@nestjs/common";
import { RolesPermissionsService } from "./roles-permissions.service";
import { CreateRolesPermissionDto } from "./dto/create-roles-permission.dto";
import { UpdateRolesPermissionDto } from "./dto/update-roles-permission.dto";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import {
  ErrorApiWrapperDto,
  ListingApiWrapperDto,
} from "src/utilities/dto/util.dto";
import { ApiAuthPermission } from "src/decorators/api-permissions.decorator";
import { ResponseRolePermissions } from "src/swagger-responses/role-permission-swagger";
import { CurrentUser } from "src/users/auth/jwt/jwt.strategy";
import { User } from "src/users/entities/user.entity";

@ApiTags("roles-permissions")
@Controller("roles-permissions")
export class RolesPermissionsController {
  constructor(
    private readonly rolesPermissionsService: RolesPermissionsService
  ) {}
  @Get()
  @ApiResponse({
    type: ResponseRolePermissions,
    status: HttpStatus.OK,
    isArray: true,
  })
  @ApiAuthPermission(true)
  findAll(): Promise<ListingApiWrapperDto | ErrorApiWrapperDto> {
    return this.rolesPermissionsService.findAll();
  }

  @Get(":user_id")
  @ApiAuthPermission(true)
  @ApiResponse({
    type: ResponseRolePermissions,
    status: HttpStatus.OK,
    isArray: true,
  })
  findOne(
    @Param("user_id") user_id: string
  ): Promise<ListingApiWrapperDto | ErrorApiWrapperDto> {
    return this.rolesPermissionsService.getPermissionByUserId(+user_id);
  }

  @Put("/update")
  @ApiAuthPermission(true, "role-permission-update")
  updateUserPermission(
    @Body() createRolesPermissionDto: CreateRolesPermissionDto,
    @CurrentUser() currentUser: User
  ) {
    return this.rolesPermissionsService.updateUserPermission(
      createRolesPermissionDto,
      currentUser
    );
  }
}
