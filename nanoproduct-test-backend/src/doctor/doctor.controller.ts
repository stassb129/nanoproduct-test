import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import {AddSlotDto, BookSlotDto, RemoveSlotDto, Slot} from "./dto/slot.dto";
import {CreateDoctorDto} from "./dto/doctor.dto";

@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post()
  async create(@Body() doctorDto: CreateDoctorDto) {
    const doctor = await this.doctorService.create(doctorDto);
    return { id: doctor.id };
  }

  @Get()
  async findAll() {
    return this.doctorService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.doctorService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.doctorService.deleteOne(id);
    return { message: 'Doctor deleted successfully' };
  }

  @Post(':id/slots')
  async addSlot(@Param('id') id: string, @Body() slot: AddSlotDto) {
    const updatedDoctor = await this.doctorService.addSlot(id, slot);
    return { doctor: updatedDoctor };
  }

  @Delete(':id/slots')
  async removeSlot(@Param('id') id: string, @Body() {slotTime}: RemoveSlotDto) {
    const updatedDoctor = await this.doctorService.removeSlot(id, slotTime);
    return { doctor: updatedDoctor };
  }

  @Post(':id/book-slot')
  async bookSlot(@Param('id') id: string, @Body() { slotTime, userId }: BookSlotDto) {
    const updatedDoctor = await this.doctorService.bookSlot(id, slotTime, userId);
    return { doctor: updatedDoctor };
  }
}
