import { CreatePermissionDto } from "./dto/create-permission.dto";
import { UpdatePermissionDto } from "./dto/update-permission.dto";
import {
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { ConflictException, Injectable } from "@nestjs/common";
import { PermissionsRepository } from "./permissions.repository";
import { IPaginationOptions, paginate } from "nestjs-typeorm-paginate";

import { EntityRepository, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Permissions } from "./entities/permission.entity";
import {
  ErrorApiWrapperDto,
  ListingApiWrapperDto,
} from "src/utilities/dto/util.dto";
import { errorApiWrapper, listingApiWrapper } from "src/utilities/util.service";
import slugify from "slugify";

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(PermissionsRepository)
    private permissionsRepository: PermissionsRepository
  ) {}

  async createPermission(
    createPermissionDto: CreatePermissionDto
  ): Promise<ListingApiWrapperDto | ErrorApiWrapperDto> {
    try {
      return await this.permissionsRepository.createPermission(
        createPermissionDto
      );
    } catch (error) {
       throw new InternalServerErrorException(errorApiWrapper(error.message));
    }
  }

  async findAll(): Promise<ListingApiWrapperDto | ErrorApiWrapperDto> {
    return await this.permissionsRepository.getAllPermissions();
  }

  async findOne(
    id: number
  ): Promise<ListingApiWrapperDto | ErrorApiWrapperDto> {
    return await this.permissionsRepository.getPermissionById(id);
  }

  async update(id: number, updatePermissionDto: UpdatePermissionDto) {
    return await this.permissionsRepository.updatePermissionById(
      id,
      updatePermissionDto
    );
  }

  async remove(id: number) {
    await this.permissionsRepository.deletePermissionsById(id);
    return listingApiWrapper(null, "permission deleted successfully");
  }

  async checkingExistanceOfPermission(id: number) {
    return this.permissionsRepository.checkIfPermissionExisits(id);
  }

  async createPermissionForSeeder(permission: any) {
    return this.permissionsRepository.createPermissionForSeeder(permission);
  }

  async checkIfPermissionById(id: number): Promise<boolean> {
    return this.permissionsRepository.checkIfPermissionById(id);
  }
}
