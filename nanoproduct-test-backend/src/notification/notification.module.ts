import {Module} from '@nestjs/common';
import {UserController} from "../user/user.controller";
import {UserService} from "../user/user.service";
import {ScheduleModule} from "@nestjs/schedule";
import {DoctorService} from "../doctor/doctor.service";
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "../user/entities/user.model";
import {Doctor, DoctorSchema} from "../doctor/entities/doctor.model";
import {UserModule} from "../user/user.module";
import {DoctorModule} from "../doctor/doctor.module";

@Module({
    imports: [
        ScheduleModule.forRoot(),
    ],
})
export class NotificationModule {
}