import {IsNotEmpty, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export interface Slot {
    slotTime: string;
    userId: string | {
        _id: string;
        name: string;
        email: string;
        password: string;
    };
}

export class AddSlotDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString({})
    slotTime: string;
    @ApiProperty()
    @IsString()
    userId: string;
}

export class RemoveSlotDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    slotTime: string;
}

export class BookSlotDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    slotTime: string;

    @ApiProperty()
    @IsString()
    userId: string;
}