import { IsString, IsNotEmpty } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    phone: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;
}

export class DeleteUserDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    id: string;
}

export class UpdateUserDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    phone: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;
}
