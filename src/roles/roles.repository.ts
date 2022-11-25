import {
  BadRequestException,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { Roles } from "./roles.entity";
import {
  ErrorApiWrapperDto,
  ListingApiWrapperDto,
} from "src/utilities/dto/util.dto";
import { CreateRolesDto, ResponseRolesDto } from "./dto/roles.dto";
import {
  errorApiWrapper,
  listingApiWrapper,
  listingApiWrapperPaginate,
} from "src/utilities/util.service";
import slugify from "slugify";
import { roleSingleMapper, rolesListingMapper } from "./roles.mapper";

@EntityRepository(Roles)
export class RolesRepository extends Repository<Roles> {
  async getRoleById(
    id: number
  ): Promise<ListingApiWrapperDto | ErrorApiWrapperDto> {
    try {
      const query = this.createQueryBuilder("roles")
        .select()
        .where("roles.id = :id", { id });
      const role = await query.getOneOrFail();
      const data: ResponseRolesDto = roleSingleMapper(role);
      return listingApiWrapper(data);
    } catch (error) {
      throw new InternalServerErrorException(errorApiWrapper(error.message));
    }
  }

  async checkIfRoleExist(id: any) {
    return await this.findOne(id);
  }

  async checkRoleExistancesBySlug(slug: string) {
    const query = this.createQueryBuilder("roles").select();
    query.where("slug = :slug", { slug });
    const client = await query.getCount();
    return client;
  }

  async getIfRoleExist(key: any, where = "id"): Promise<Roles> {
    if (where === "id") {
      const query = await this.findOne({
        where: { id: key },
      });
      if (!query) {
        throw new BadRequestException(
          errorApiWrapper("Role Does not exist", HttpStatus.BAD_REQUEST)
        );
      }
      return query;
    } else if (where === "name") {
      const query = await this.findOne({
        where: { name: key },
      });
      if (!query) {
        throw new BadRequestException(
          errorApiWrapper("Role Does not exist", HttpStatus.BAD_REQUEST)
        );
      }
      return query;
    } else {
      throw new BadRequestException(
        errorApiWrapper("Bad Request", HttpStatus.BAD_REQUEST)
      );
    }
  }

  async createRole(requestClientDto) {
    const { name } = requestClientDto;
    try {
      const slug = slugify(name).toLowerCase();
      const newClient = this.create({
        ...requestClientDto,
        slug,
      });
      const role = await this.save(newClient);
      return listingApiWrapper(null, `Role has successfully created`);
    } catch (error) {
      throw new InternalServerErrorException(errorApiWrapper(error.message));
    }
  }

  async getAllRoles(
    filterRoleDto,
    listingParams
  ): Promise<ListingApiWrapperDto | ErrorApiWrapperDto> {
    try {
      let { page, take } = listingParams;
      take = take || 10;
      page = page || 1;
      const skip = (page - 1) * take;

      let [roles, total] = await this.findAndCount({
        where: {
          ...(filterRoleDto.type && { type: filterRoleDto.type }),
          ...(filterRoleDto.is_contact && {
            is_contact: filterRoleDto.is_contact,
          }),
        },
        take: take,
        skip: skip,
        order: {
          id: "DESC",
        },
      });
      const data: Roles[] | ResponseRolesDto[] = rolesListingMapper(roles);
      return listingApiWrapperPaginate(data, { page, take, total });
    } catch (error) {
      throw new InternalServerErrorException(errorApiWrapper(error.message));
    }
  }

  async updateRolesById(
    id: number,
    requestRolesDto: CreateRolesDto
  ): Promise<ListingApiWrapperDto | ErrorApiWrapperDto> {
    const { name } = requestRolesDto;
    const slug = slugify(name).toLowerCase();
    let updateAffected: number = 0;
    try {
      const query = this.createQueryBuilder("roles");
      const updateResult = await query
        .update({ ...requestRolesDto, slug })
        .andWhere("id = :id", { id })
        .andWhere("deleted_at is null")
        .execute();
      updateAffected = updateResult.affected;
    } catch (error) {
      throw new InternalServerErrorException(errorApiWrapper(error.message));
    }

    if (updateAffected === 0) {
      throw new InternalServerErrorException(errorApiWrapper("Error Occured"));
    } else {
      return await this.getRoleById(id);
    }
  }

  async deleteRolesById(
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
        data: "role deleted successfully!!",
      });
    } catch (error) {
      throw new InternalServerErrorException(errorApiWrapper(error.message));
    }
  }

  async createRoleSeeder(rolesObject: [] | any[]): Promise<boolean> {
    try {
      rolesObject.filter(async (role) => {
        return (await this.checkRoleExistancesBySlug(role)) === 0;
      });

      for await (const single of rolesObject) {
        const slug = slugify(single.name).toLowerCase();
        const newClient = this.create({
          ...single,
          slug,
        });
        await this.save(newClient);
      }
      return true;
    } catch (error) {
      return false;
    }
  }
}
