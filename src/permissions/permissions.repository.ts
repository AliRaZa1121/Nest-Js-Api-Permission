import {
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { IPaginationOptions, paginate } from "nestjs-typeorm-paginate";

import { EntityRepository, Repository } from "typeorm";
import {
  CreatePermissionDto,
  ResponsePermissionDto,
} from "./dto/create-permission.dto";
import { UpdatePermissionDto } from "./dto/update-permission.dto";
import { ConflictException, Injectable } from "@nestjs/common";
import { Permissions } from "./entities/permission.entity";
import {
  ErrorApiWrapperDto,
  ListingApiWrapperDto,
} from "src/utilities/dto/util.dto";
import { errorApiWrapper, listingApiWrapper } from "src/utilities/util.service";
import slugify from "slugify";
import {
  permissionSingleMapper,
  permissionListingMapper,
} from "./permission.mapper";

@EntityRepository(Permissions)
export class PermissionsRepository extends Repository<Permissions> {
  async createPermission(
    data
  ): Promise<ListingApiWrapperDto | ErrorApiWrapperDto> {
    try {
      const { name } = data;
      const checkIfPermissionExistance = await this.checkIfPermissionExistance(
        name
      );
      if (checkIfPermissionExistance) {
        throw new ConflictException(
          errorApiWrapper(`This permission already exist`, HttpStatus.CONFLICT)
        );
      }
      Object.assign(data, {
        slug: slugify(name, {
          replacement: "-",
          lower: true,
        }),
      });
      let permissions = this.create({ ...data });
      permissions = await this.save(permissions);
      return listingApiWrapper(permissions, `Added Successfully`);
    } catch (error) {
      throw new InternalServerErrorException(errorApiWrapper(error.message));
    }
  }

  async createPermissionForSeeder(data): Promise<boolean> {
    try {
      const { name } = data;
      const checkIfPermissionExistance = await this.checkIfPermissionExistance(
        name
      );
      if (checkIfPermissionExistance) {
        return false;
      }
      let permissions = this.create({ ...data });
      permissions = await this.save(permissions);
      return true;
    } catch (error) {
      return false;
    }
  }

  async getPermissionById(
    id: number
  ): Promise<ListingApiWrapperDto | ErrorApiWrapperDto> {
    try {
      const query = this.createQueryBuilder("permissions")
        .select()
        .where("permissions.id = :id", { id });
      const permission = await query.getOneOrFail();
      const data: ResponsePermissionDto = permissionSingleMapper(permission);
      return listingApiWrapper(data);
    } catch (error) {
      throw new InternalServerErrorException(errorApiWrapper(error.message));
    }
  }

  async checkIfPermissionExisits(id: any) {
    const query = this.createQueryBuilder("permissions").select();
    query.where("id = :id", { id });
    const client = await query.getCount();
    if (client < 1) {
      throw new NotFoundException(
        errorApiWrapper(`Permission Id Does not exist`, HttpStatus.BAD_REQUEST)
      );
    }
    return client;
  }

  async checkIfPermissionExistance(name: any) {
    return await this.findOne({
      where: {
        name: name,
      },
    });
  }

  async checkIfPermissionById(id: number) {
    const permission = await this.findOne({
      where: {
        id: id,
      },
    });
    return permission ? true : false;
  }

  async getAllPermissions(): Promise<
    ListingApiWrapperDto | ErrorApiWrapperDto
  > {
    try {
      const permissions = await this.find();
      const data =
        permissionListingMapper(permissions);
      return listingApiWrapper(data);
    } catch (error) {
      throw new InternalServerErrorException(errorApiWrapper(error.message));
    }
  }

  async updatePermissionById(
    id: number,
    updatePermissionDto: UpdatePermissionDto
  ): Promise<ListingApiWrapperDto | ErrorApiWrapperDto> {
    const { name } = updatePermissionDto;

    let updateAffected = 0;

    try {
      const slug = slugify(name, {
        replacement: "-",
        lower: true,
      });
      const query = this.createQueryBuilder("permissions");
      const updateResult = await query
        .update({ name, slug })
        .andWhere("id = :id", { id })
        .andWhere("deleted_at is null")
        .execute();
      updateAffected = updateResult.affected;
      return await this.getPermissionById(id);
    } catch (error) {
      throw new InternalServerErrorException(errorApiWrapper(error.message));
    }
  }

  async deletePermissionsById(
    id: number
  ): Promise<ListingApiWrapperDto | ErrorApiWrapperDto> {
    try {
      const deleteResponse = await this.softDelete(id);
      if (!deleteResponse.affected) {
        throw new InternalServerErrorException(
          errorApiWrapper("Error Occured")
        );
      }
      return listingApiWrapper({
        data: "permission deleted successfully!!",
      });
    } catch (error) {
      throw new InternalServerErrorException(errorApiWrapper(error.message));
    }
  }
}
