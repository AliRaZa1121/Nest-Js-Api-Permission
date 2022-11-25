import { ApiProperty } from "@nestjs/swagger";

export class ResponsePermissionBody {
    @ApiProperty()
    name: string;

    @ApiProperty()
    slug: string;

    @ApiProperty()
    createdAt: Date;
    @ApiProperty()
    updatedAt: Date;
}

export class ResponsePermissions {
    @ApiProperty()
    attributes: ResponsePermissionBody;

    @ApiProperty()
    id: number;
}