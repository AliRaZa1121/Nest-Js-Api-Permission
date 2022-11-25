import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiAuthPermission } from 'src/decorators/api-permissions.decorator';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  ErrorApiWrapperDto,
  ListingApiWrapperDto,
} from 'src/utilities/dto/util.dto';
import { RolesService } from './roles.service';
import { CreateRolesDto, RoleUpdateClientDto, FilterRoleDto } from './dto/roles.dto';
import { ListingParams } from 'src/dto/global.dto';
import { ResponseRoles } from 'src/swagger-responses/roles-swagger';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {

  constructor(private rolesService: RolesService) { }

  @Get('/')
  @ApiAuthPermission(true, 'role-listing')
  @ApiResponse({
    type: ResponseRoles,
    status: HttpStatus.OK,
    isArray: true,
  })
  async getAllRoles( @Query() listingParams: ListingParams,@Query() filterRoleDto: FilterRoleDto): Promise<ListingApiWrapperDto | ErrorApiWrapperDto> {
    return await this.rolesService.getAllRoles(filterRoleDto,listingParams);
  }

  @Post('/')
  @ApiAuthPermission(true, 'role-create')
  @ApiResponse({
    type: ResponseRoles,
    status: HttpStatus.OK,
    isArray: false,
  })
  async createClient(@Body() createRolesDto: CreateRolesDto): Promise<ListingApiWrapperDto | ErrorApiWrapperDto> {
    return await this.rolesService.createRole(createRolesDto);
  }

  @Get(':id')
  @ApiAuthPermission(true, 'role-details')
  @ApiResponse({
    type: ResponseRoles,
    status: HttpStatus.OK,
    isArray: false,
  })
  async findOne(@Param('id') id: string) {
    return await this.rolesService.findOne(+id);
  }

  @Patch(':id')
  @ApiAuthPermission(true, 'role-update')
  @ApiResponse({
    type: ResponseRoles,
    status: HttpStatus.OK,
    isArray: false,
  })
  update(@Param('id') id: string, @Body() RoleUpdateClientDto: RoleUpdateClientDto): Promise<ListingApiWrapperDto | ErrorApiWrapperDto> {
    return this.rolesService.update(+id, RoleUpdateClientDto);

  }

  @Delete(':id')
  @ApiAuthPermission(true, 'role-delete')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(+id);
  }

}