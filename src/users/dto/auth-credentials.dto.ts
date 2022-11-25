import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNumber, IsString, Matches, MaxLength, MinLength, ValidateNested } from "class-validator";

export class AuthCredentialsDto {
    @ApiProperty({
        default: 'admin@gmail.com'
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        default: 'hphs86'
    })
    @IsString()
    password: string;
}

