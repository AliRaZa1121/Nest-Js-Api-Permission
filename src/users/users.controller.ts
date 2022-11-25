import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { UsersService } from "./users.service";
import { ListingParams } from "../dto/global.dto";
import { FilterUserDto } from "./dto/filter-user.dto";
import { ApiAuthPermission } from "src/decorators/api-permissions.decorator";
import { ResponseUsers } from "src/swagger-responses/user-swagger";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  @ApiAuthPermission(true, "user-read")
  @ApiResponse({
    type: ResponseUsers,
    status: HttpStatus.OK,
    isArray: true,
  })
  getUserList(
    @Query() listingParams: ListingParams,
    @Query() filterUserDto: FilterUserDto
  ) {
    return this.userService.getUsers(listingParams, filterUserDto);
  }
}
