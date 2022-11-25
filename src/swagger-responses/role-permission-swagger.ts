import { ApiProperty } from "@nestjs/swagger";

export class PermissionsByRoles {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}
export class RolesByPermissions {
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

  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}

export class ResponseRolePermissionBody {
  @ApiProperty()
  permission: PermissionsByRoles;

  @ApiProperty()
  role: RolesByPermissions;

  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}

export class ResponseRolePermissions {
  @ApiProperty()
  attributes: ResponseRolePermissionBody;

  @ApiProperty()
  id: number;
}
