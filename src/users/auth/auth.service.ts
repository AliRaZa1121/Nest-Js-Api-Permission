import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  NotFoundException,
  BadRequestException,
  Inject,
  HttpStatus,
} from "@nestjs/common";
import * as bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
import { UserTokenRepository } from "../user_token/user_token.repository";
import { listingApiWrapper } from "src/utilities/util.service";
import { AuthCredentialsDto } from "../dto/auth-credentials.dto";
import { JwtPayload } from "./jwt/jwt-payload.interface";
import { UsersService } from "../users.service";
import { errorApiWrapper } from "../../utilities/util.service";
import { InjectRepository } from "@nestjs/typeorm";
import { loginMapper } from "../user.mapper";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserTokenRepository)
    private jwtService: JwtService,
    private usersService: UsersService
  ) {}

  async signin(authCredentialsDto: AuthCredentialsDto) {
    const { email, password } = authCredentialsDto;
    const user = await this.usersService.getUserByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      if (user.status === 0) {
        throw new BadRequestException(
          errorApiWrapper(
            `Your account is deactivated. Please contact the administrator`,
            HttpStatus.BAD_REQUEST
          )
        );
      }
      const payload: JwtPayload = {
        sub: user.id,
        email: email,
        family_name: user.first_name,
        given_name: user.last_name,
      };
      const accessToken: string = await this.jwtService.sign(payload);
      const data = loginMapper({ token: accessToken, user: user });
      return listingApiWrapper(data);
    } else {
      throw new UnauthorizedException("Please check your login credentials");
    }
  }

  async findByCredentials(email, password) {
    const user = await this.usersService.getUserByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    } else {
      throw new UnauthorizedException("Please check your login credentials");
    }
  }
}
