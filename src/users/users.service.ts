import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnprocessableEntityException,
} from "@nestjs/common";
import { ListingParams } from "src/dto/global.dto";
import { RolesRepository } from "src/roles/roles.repository";
import {
  ListingApiWrapperDto,
  ErrorApiWrapperDto,
} from "src/utilities/dto/util.dto";
import { errorApiWrapper, listingApiWrapper } from "src/utilities/util.service";
import { FilterUserDto } from "./dto/filter-user.dto";
import { RolesPermissionsRepository } from "../roles-permissions/roles-permissions.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { UsersRepository } from "./users.repository";
import { hashpassword } from "src/helpers/bcrypt.helper";
import { makeid } from "src/helpers/util.helper";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    @InjectRepository(RolesPermissionsRepository)
    private rolesPermissionsRepository: RolesPermissionsRepository,
    @InjectRepository(RolesRepository)
    private rolesRepository: RolesRepository
  ) {}

  async getUsers(
    listingParams: ListingParams,
    filterUserDto: FilterUserDto
  ): Promise<ListingApiWrapperDto | ErrorApiWrapperDto> {
    const getUsers = await this.usersRepository.getUsers(
      listingParams,
      filterUserDto
    );
    if (!getUsers) {
      throw new InternalServerErrorException(errorApiWrapper("Error Occured"));
    }
    return getUsers;
  }

  async checkPermissions(id: number) {
    return await this.usersRepository.getIfPermissionExistance(id);
  }

  async getUserByEmail(email: string) {
    return this.usersRepository.getUserByEmail(email);
  }

  async createUserSeeder() {
    const users = [
      {
        email: "admin@gmail.com",
        first_name: "Super Admin",
        last_name: "Admin",
        password: await hashpassword("hphs86"),
        register_hash: makeid(32),
        role_id: 1,
      },
      {
        email: "user@mailinator.com",
        first_name: "User",
        last_name: "Foster",
        password: await hashpassword("hphs86"),
        register_hash: makeid(32),
        role_id: 12,
      },
    ];
    return await this.usersRepository.createUserSeeder(users);
  }

  async getUserById(user_id: number) {
    return await this.usersRepository.getUserById(user_id);
  }
}
