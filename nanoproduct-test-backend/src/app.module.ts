import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UserModule} from './user/user.module';
import {DoctorModule} from './doctor/doctor.module';
import {MongooseModule} from "@nestjs/mongoose";
import { NotificationService } from './notification/notification.service';
import { NotificationModule } from './notification/notification.module';

@Module({
    imports: [UserModule, DoctorModule,
        MongooseModule.forRoot('mongodb://localhost:27017/nest'),
        NotificationModule,],
    controllers: [AppController],
    providers: [AppService, NotificationService],
})
export class AppModule {
}
