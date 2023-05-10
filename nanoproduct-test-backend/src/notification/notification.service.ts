import {Cron, CronExpression} from '@nestjs/schedule';
import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Doctor} from "../doctor/entities/doctor.model";
import {User} from "../user/entities/user.model";
import {DoctorService} from "../doctor/doctor.service";
import * as fs from "fs";

@Injectable()
export class NotificationService {
    constructor(
        @InjectModel('Doctor') private readonly doctorModel: Model<Doctor>,
        @InjectModel('User') private readonly userModel: Model<User>,
        private readonly doctorService: DoctorService
    ) {
    }


    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    async sendReminderOneDayBefore() {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        const doctors = await this.doctorService.findAllWithBookedSlots();

        for (const doctor of doctors) {
            const slots = doctor.slots.filter((s) => new Date(s.slotTime).getDate() === tomorrow.getDate());

            for (const slot of slots) {
                const user = slot.userId;
                if (user) {
                    if (typeof user !== "string") {
                        const message = this.generateMessage(user.name, doctor.spec, slot.slotTime, 0, "oneDayBefore");
                        this.logMessage(message);
                    }
                }
            }
        }
    }

    @Cron(CronExpression.EVERY_HOUR)
    async sendReminderTwoHoursBefore() {
        const now = new Date();
        const twoHoursLater = new Date(now.getTime() + 2 * 60 * 60 * 1000);

        const doctors = await this.doctorService.findAllWithBookedSlots();

        for (const doctor of doctors) {
            const slots = doctor.slots.filter((s) => new Date(s.slotTime).toString() === twoHoursLater.toString());

            for (const slot of slots) {
                const user = slot.userId;
                if (user) {
                    if (typeof user !== "string") {
                        const message = this.generateMessage(user.name, doctor.spec, slot.slotTime, 2, "twoHoursBefore");
                        this.logMessage(message);
                    }
                }
            }
        }
    }

    private generateMessage(userName: string, doctorSpec: string, slotTime: string, hoursBefore: number, reminderType: 'oneDayBefore' | 'twoHoursBefore') {
        const date = new Date();
        date.setHours(date.getHours() + hoursBefore);

        let message = '';
        if (reminderType === 'oneDayBefore') {
            message =
                `${date.toLocaleString()} | Привет ${userName}! ` +
                `Напоминаем, что вы записаны к ${doctorSpec} ` +
                `завтра ${new Date(slotTime).toLocaleDateString()} в ${new Date(slotTime).toTimeString().split(' ')[0]}.`;
        } else if (reminderType === 'twoHoursBefore') {
            message =
                `${date.toLocaleString()} | Привет ${userName}! ` +
                `Вам через 2 часа к ${doctorSpec} ` +
                `в ${new Date(slotTime).toTimeString().split(' ')[0]}`;
        }
        return message;
    }

    private readonly logFile = 'app.log';

    private logMessage(message: string) {
        const messageTemplate = `${message} \n`
        fs.appendFile(this.logFile, messageTemplate, (err) => {
            if (err) {
                console.error(`Failed to write to log file: ${err}`);
            }
        });
        console.log(message);
    }
}
