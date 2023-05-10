import { IsString, IsNotEmpty, IsArray } from 'class-validator';
import {Slot} from "./slot.dto";
import {ApiProperty} from "@nestjs/swagger";

export class CreateDoctorDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    spec: string;

    @ApiProperty()
    @IsArray()
    slots: Slot[];
}