import {
  BadRequestException,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { EntityRepository, Not, Repository } from "typeorm";
import { User } from "./entities/user.entity";
import * as bcrypt from "bcryptjs";
import {
  errorApiWrapper,
  listingApiWrapperPaginate,
  listingApiWrapper,
} from "src/utilities/util.service";
import { MAKE_HASH_LENGTH } from "src/utilities/constant";
import { hashpassword } from "src/helpers/bcrypt.helper";
import { ResponseUserDto } from "./dto/reponse-dto";
import { usersListingMapper } from "./user.mapper";
import { In } from "typeorm/find-options/operator/In";
import { ListingParams } from "src/dto/global.dto";
import { FilterUserDto } from "src/users/dto/filter-user.dto";
import { getCurrentTime } from "src/helpers/date.helper";
import { makeid } from "src/helpers/util.helper";
import { Roles } from "src/roles/roles.entity";
@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async getUsersWithDeleted() {
    const query = this.createQueryBuilder("users").select();
    const users = await query.getMany();
    return users;
  }

  async createCsvUser(data: User, role: Roles) {
    try {
      const user = new User();
      user.first_name = data.first_name;
      user.last_name = data.last_name;
      user.email = data.email;
      user.role_id = role.id;
      user.password = await hashpassword(
        data.password ? data.password : "click123"
      );
      user.register_hash = makeid(MAKE_HASH_LENGTH);
      await this.save(user);
      return user;
    } catch (error) {
      return false;
    }
  }

  async getUsers(
    listingParams: ListingParams | any,
    filterUserDto: FilterUserDto | any
  ) {
    try {
      const { is_contact, status } = filterUserDto;
      const filteredIsContact = is_contact == 1 ? false : true;
      let { page, take } = listingParams;
      take = take || 10;
      page = page || 1;
      const skip = (page - 1) * take;
      let [users, total] = await this.findAndCount({
        relations: ["role_id"],
        where: {
          role_id: {
            id: Not(1),
            ...(filterUserDto.type && { type: filterUserDto.type }),
            ...(filterUserDto.is_contact && {
              is_contact: Not(filteredIsContact),
            }),
          },
          ...(filterUserDto.first_name && {
            first_name: filterUserDto.first_name,
          }),
          ...(filterUserDto.last_name && {
            last_name: filterUserDto.last_name,
          }),
          ...(filterUserDto.status && { status: status }),
          ...(filterUserDto.role_id && { role_id: filterUserDto.role_id }),
          ...(filterUserDto.ccc && { id: In(filterUserDto.userIds) }),
          ...(filterUserDto.nurse && { id: In(filterUserDto.userIds) }),
          ...(filterUserDto.relation && { id: Not(filterUserDto.relation) }),
        },
        order: {
          id: "DESC",
        },
        take: take,
        skip: skip,
      });
      const data: User[] | ResponseUserDto[] = usersListingMapper(users);
      return listingApiWrapperPaginate(data, { page, take, total });
    } catch (error) {
      console.error(error.message);
      return false;
    }
  }

  async getInCompleteRegistrationUser(hash) {
    try {
      const user = await this.findOneOrFail({
        where: {
          register_hash: hash,
        },
      });
      return listingApiWrapper({
        id: user.id,
        attributes: {
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(errorApiWrapper(error.message));
    }
  }

  async getUserById(user_id) {
    try {
      const user = await this.findOne({
        relations: [
          "detail",
          "address",
          "role_id",
          "roles_permissions",
          "roles_permissions.permission_id",
        ],
        where: { id: user_id },
        withDeleted: true,
      });
      return user;
    } catch (error) {
      throw new InternalServerErrorException(errorApiWrapper(error.message));
    }
  }

  async checkIfUserExist(id: number) {
    return await this.findOne({
      where: {
        id: id,
      },
    });
  }

  async isEmailExist(email: string): Promise<boolean> {
    const isEmailExist = await this.findOne({
      where: {
        email: email,
      },
      withDeleted: true,
    });
    return isEmailExist ? true : false;
  }

  async getUserByEmail(email: string): Promise<User> {
    try {
      const user = await this.findOne({
        where: {
          email: email,
        },
        relations: [
          "detail",
          "address",
          "role_id",
          "roles_permissions",
          "roles_permissions.permission_id",
        ],
      });
      return user;
    } catch (error) {
      throw new InternalServerErrorException(errorApiWrapper(error.message));
    }
  }

  async deleteUserById(user_id) {
    try {
      const deleteResponse = await this.softDelete(user_id);
      if (!deleteResponse.affected) {
        throw new InternalServerErrorException(
          errorApiWrapper("Error Occured")
        );
      }
      return listingApiWrapper({
        data: "user is deleted successfully!!",
      });
    } catch (error) {
      throw new InternalServerErrorException(errorApiWrapper(error.message));
    }
  }

  async checkUserHashForResetPassword(user_id, password_hash) {
    try {
      const user = await this.findOneOrFail({
        where: {
          register_hash: password_hash,
          id: user_id,
        },
      });

      return user;
    } catch (error) {
      throw new InternalServerErrorException(errorApiWrapper(error.message));
    }
  }

  async updatePassword(user_id: number, password: string): Promise<boolean> {
    try {
      this.update({ id: user_id }, { password: password });
      return true;
    } catch (error) {
      return false;
    }
  }

  async getIfPermissionExistance(id: number): Promise<User> {
    try {
      const user = await this.findOne({
        relations: [
          "role_id",
          "roles_permissions",
          "roles_permissions.permission_id",
        ],
        where: {
          id: id,
        },
      });
      return user;
    } catch (error) {
      console.log(error.message);
    }
  }

  async createUserSeeder(users: any[]) {
    try {
      users.forEach(async (user) => {
        await this.save(user);
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}
