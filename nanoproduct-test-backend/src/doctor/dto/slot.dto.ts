import {IsDate, IsDateString, IsNotEmpty, IsString} from "class-validator";

export interface Slot {
    slotTime: string;
    userId: string | {
        _id: string;
        name: string;
        email: string;
        password: string;
    };
}

export class AddSlotDto{
    @IsNotEmpty()
    @IsString({})
    slotTime: string;

    @IsString()
    userId: string;
}

export class RemoveSlotDto {
    @IsNotEmpty()
    @IsString()
    slotTime: string;
}

export class BookSlotDto{
    @IsNotEmpty()
    @IsString()
    slotTime: string;

    @IsString()
    userId: string;
}