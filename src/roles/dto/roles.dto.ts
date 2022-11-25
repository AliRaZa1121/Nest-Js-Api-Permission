import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  Equals,
  IsArray,
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsNotEmptyObject,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  ValidateIf,
  ValidateNested,
} from "class-validator";
import { RoleType } from "src/utilities/constant";

export class CreateRolesDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @ApiProperty({
    description: "type must be user or employee",
    enum: RoleType,
  })
  @IsNotEmpty()
  @IsEnum(RoleType)
  type: string;

  @ApiProperty({
    description: "property must be true or false",
    enum: [true, false],
  })
  @IsOptional()
  @IsEnum([true, false])
  can_login: boolean;

  @ApiProperty({
    description: "property must be true or false",
    enum: [true, false],
  })
  @IsOptional()
  @IsEnum([true, false])
  is_contact: boolean;

  @ApiProperty({
    description: "property must be in array of json objects",
  })
  @IsArray()
  permissions: number[];
}

export class RoleUpdateClientDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @ApiProperty({
    description: "type must be user or employee",
  })
  @IsOptional()
  type: string;

  @ApiProperty({
    description: "property must be true or false",
  })
  @IsOptional()
  can_login: any;

  @ApiProperty({
    description: "property must be true or false",
  })
  @IsOptional()
  is_contact: any;

  @ApiProperty({
    description: "property must be in array of json objects",
    default: [],
  })
  @IsArray()
  @IsOptional()
  permissions: number[];
}

export class FilterRoleDto {
  @ApiProperty({
    required: false,
    description: "Role filter by type",
    enum: ["user", "employee"],
  })
  @IsOptional()
  @IsEnum(["user", "employee"], { message: "value must be user,employee" })
  type?: string;

  @ApiProperty({ required: false, description: "User filter by is_contact" })
  @IsOptional()
  is_contact?: number;
}

export class ResponseRolesDto {
  attributes: {
    name: string;
    type: string;
    slug: string;
    canLogin: boolean;
    isContact: boolean;
    permissions: Object;
    createdAt: Date;
    updatedAt: Date;
  };
  id: number;
}
