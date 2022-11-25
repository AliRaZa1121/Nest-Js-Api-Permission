import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MaxLength } from "class-validator";
export class CreatePermissionDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;
}

export class ResponsePermissionDto {
  attributes: {
    name: string;
    slug: string;
    group: string;
    createdAt: Date;
    updatedAt: Date;
  };
  group?: string;
  id: number;
}
