import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from "@nestjs/common";
import { PermissionsService } from "./permissions.service";
import { UpdatePermissionDto } from "./dto/update-permission.dto";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import {
  ErrorApiWrapperDto,
  ListingApiWrapperDto,
} from "src/utilities/dto/util.dto";
import { ApiAuthPermission } from "src/decorators/api-permissions.decorator";
import { ResponsePermissions } from "src/swagger-responses/permission-swagger";

@ApiTags("Permissions")
@Controller("permissions")
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Get()
  @ApiAuthPermission(true, "permission-listing")
  @ApiResponse({
    type: ResponsePermissions,
    status: HttpStatus.OK,
    isArray: true,
  })
  findAll(): Promise<ListingApiWrapperDto | ErrorApiWrapperDto> {
    return this.permissionsService.findAll();
  }

  @Get(":id")
  @ApiAuthPermission(true, "permission-details")
  @ApiResponse({
    type: ResponsePermissions,
    status: HttpStatus.OK,
    isArray: false,
  })
  findOne(
    @Param("id") id: string
  ): Promise<ListingApiWrapperDto | ErrorApiWrapperDto> {
    return this.permissionsService.findOne(+id);
  }

  @Patch(":id")
  @ApiAuthPermission(true, "permission-update")
  @ApiResponse({
    type: ResponsePermissions,
    status: HttpStatus.OK,
    isArray: false,
  })
  update(
    @Param("id") id: string,
    @Body() updatePermissionDto: UpdatePermissionDto
  ): Promise<ListingApiWrapperDto | ErrorApiWrapperDto> {
    return this.permissionsService.update(+id, updatePermissionDto);
  }
}
