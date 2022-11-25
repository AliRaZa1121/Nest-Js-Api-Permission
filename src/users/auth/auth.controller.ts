import {
  Body,
  Controller,
  Post,
  HttpStatus,
  Get,
  Param,
  Put,
} from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthCredentialsDto } from "../dto/auth-credentials.dto";
import { AuthService } from "./auth.service";
import { LoginResponse } from "../../swagger-responses/auth-swagger";

@ApiTags("Auth")
@Controller("/")
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiResponse({
    type: LoginResponse,
    status: HttpStatus.OK,
  })
  @Post("login")
  signIn(@Body() authCredentialsDto: AuthCredentialsDto) {
    return this.authService.signin(authCredentialsDto);
  }
}
