import { ApiProperty } from "@nestjs/swagger";


export class ResponseRoleBody {
    
    @ApiProperty()
    id: number;
    
    @ApiProperty()
    name: string;

    @ApiProperty()
    slug: string;

    @ApiProperty()
    type: string;

    @ApiProperty()
    canLogin: boolean;

    @ApiProperty()
    isContact: boolean;
}


export class UserResponseModel {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  role: ResponseRoleBody;
}

export class LoginResponse {
  @ApiProperty()
  token: string;

  @ApiProperty()
  user: UserResponseModel;
}
