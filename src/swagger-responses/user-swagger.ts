import { ApiProperty } from "@nestjs/swagger";


export class ResponseUserRole {
  @ApiProperty()
  id: string;

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


export class ResponseUserBody {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  attributes: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  status: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;


  @ApiProperty()
  role: ResponseUserRole;
}

export class ResponseUsers {
  @ApiProperty()
  attributes: ResponseUserBody;

  @ApiProperty()
  id: number;
}
