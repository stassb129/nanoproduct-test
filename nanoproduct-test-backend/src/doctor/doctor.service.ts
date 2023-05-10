import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Doctor} from "./entities/doctor.model";
import {Model} from "mongoose";
import {CreateDoctorDto} from "./dto/doctor.dto";
import {Slot} from "./dto/slot.dto";

@Injectable()
export class DoctorService {
    constructor(
        @InjectModel('Doctor') private doctorModel: Model<Doctor>,
    ) {
    }

    async create(doctor: CreateDoctorDto): Promise<Doctor> {
        const createdDoctor = new this.doctorModel(doctor);
        return createdDoctor.save();
    }

    async findAll(): Promise<Doctor[]> {
        return this.doctorModel.find().exec();
    }

    async findOne(id: string): Promise<Doctor> {
        return this.doctorModel.findById(id).exec();
    }

    async findAllWithBookedSlots(): Promise<Doctor[]> {
        return this.doctorModel.aggregate([
            // Оставляем только докторов у которых есть слоты
            {$match: {slots: {$exists: true, $not: {$size: 0}}}},
            // Делаем unwind для массива slots, чтобы можно было фильтровать по полю userId
            {$unwind: "$slots"},
            // Фильтруем только те слоты, у которых есть userId
            {$match: {"slots.userId": {$ne: ""}}},
            // Делаем populate на поле userId
            {
                $lookup: {
                    from: "users",
                    let: {userId: {$toObjectId: "$slots.userId"}},
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ["$_id", "$$userId"]
                                }
                            }
                        }
                    ],
                    as: "populatedUser"
                }
            },
            // Преобразуем userId в развернутого пользователя
            {
                $addFields: {
                    "slots.userId": {
                        $arrayElemAt: ["$populatedUser", 0]
                    }
                }
            },
            // Удаляем поле populatedUser
            {
                $project: {
                    populatedUser: 0
                }
            },
            // Обратно группируем по докторам и собираем все слоты в массив
            {
                $group: {
                    _id: "$_id",
                    name: {$first: "$name"},
                    spec: {$first: "$spec"},
                    slots: {$push: "$slots"},
                },
            },
        ]).exec()
    }

    async deleteOne(id: string): Promise<void> {
        const result = await this.doctorModel.deleteOne({_id: id}).exec();
        if (result.deletedCount === 0) {
            throw new NotFoundException(`Doctor with ID "${id}" not found`);
        }
    }

    async addSlot(doctorId: string, slot: Slot): Promise<Doctor> {
        const doctor = await this.doctorModel.findById(doctorId).exec();
        const findSlot = doctor.slots.find((s) => s.slotTime === slot.slotTime);
        if (!findSlot) {
            doctor.slots.push(slot);
            return await doctor.save();
        }
        if (findSlot) {
            throw new NotFoundException(`Slot ${slot.slotTime} is already exist for doctor ${doctorId}`);
        }
    }


    async removeSlot(doctorId: string, slotTime: string): Promise<Doctor> {
        const doctor = await this.doctorModel.findById(doctorId).exec();
        const slot = doctor.slots.find((s) => s.slotTime === slotTime);
        if (slot) {
            doctor.slots = doctor.slots.filter((s) => s.slotTime !== slotTime);
            return await doctor.save();
        } else {
            throw new NotFoundException(`Slot ${slotTime} not found for doctor ${doctorId}`);
        }
    }

    async bookSlot(doctorId: string, slotTime: string, userId: string): Promise<Doctor> {
        const doctor = await this.doctorModel.findById(doctorId).exec();
        const slot = doctor.slots.find((s) => s.slotTime === slotTime);
        if (slot && !slot.userId) {
            doctor.slots = doctor.slots.filter((s) => s.slotTime !== slotTime);
            slot.userId = userId;
            doctor.slots.push(slot);
            await doctor.save();
            return doctor;
        } else {
            throw new NotFoundException(`Slot ${slotTime} is not available for booking for doctor ${doctorId}`);
        }
    }

    // Fri May 05 2023 17:18:23 GMT+0300 (Москва, стандартное время)
    //    1683302423256
    //    2023-05-10T10:00:00.666Z

}
