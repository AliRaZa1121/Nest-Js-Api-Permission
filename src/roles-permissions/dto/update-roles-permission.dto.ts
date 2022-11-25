import { PartialType } from '@nestjs/swagger';
import { CreateRolesPermissionDto } from './create-roles-permission.dto';
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  ArrayMinSize,
  ArrayUnique,
    Equals,
    IsArray,
    IsEmpty,
    IsNotEmpty,
    IsNotEmptyObject,
    IsOptional,
    IsString,
    IsUrl,
    MaxLength,
    ValidateIf,
    ValidateNested,
  } from 'class-validator';
import { Roles } from "src/roles/roles.entity";
import { Permissions } from "src/permissions/entities/permission.entity";

export class UpdateRolesPermissionDto {

    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(255)
    permission_id: number;

    @ApiProperty({ required: true, description: "Send Product Id in Array" })
    @IsArray()
    @IsNotEmpty()
    @ArrayUnique()
    @ArrayMinSize(1)
    role_id: string[];

}
