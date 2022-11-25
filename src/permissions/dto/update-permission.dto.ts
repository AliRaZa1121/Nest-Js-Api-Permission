import { PartialType } from '@nestjs/swagger';
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
    Equals,
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

export class UpdatePermissionDto {

        @ApiProperty()
        @IsNotEmpty()
        @MaxLength(255)
        name: string;
    
}

