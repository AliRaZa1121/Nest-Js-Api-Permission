import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import {
  IsArray,
  IsNotEmpty,
} from 'class-validator';


export class CreateRolesPermissionDto {

  @ApiProperty({ required: true })
  @IsNotEmpty()
  user_id: number;

  @ApiProperty({ required: true, description: "Send Permissions Id" })
  @IsNotEmpty()
  @IsArray()
  permission_id:  number[];

}


export class ResponseRolesPermisionDto {
  attributes: {
    permission: Object;
    user: Object;
    createdAt: Date;
    updatedAt: Date;
  };
  id: number;
}