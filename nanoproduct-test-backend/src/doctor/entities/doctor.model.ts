import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {Slot} from "../dto/slot.dto";

@Schema()
export class Doctor extends Document {
    @Prop()
    name: string;

    @Prop()
    spec: string;

    @Prop()
    slots: Slot[];
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);