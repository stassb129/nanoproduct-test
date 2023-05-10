import { IsString, IsNotEmpty, IsArray } from 'class-validator';
import {Slot} from "./slot.dto";

export class CreateDoctorDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    spec: string;

    @IsArray()
    slots: Slot[];
}