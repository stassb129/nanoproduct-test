import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {

    @Prop()
    phone: string;

    @Prop()
    name: string;
}

export const UserSchema = SchemaFactory.createForClass(User);