import { Injectable } from '@nestjs/common';
import { CreateSeminarGroupDto } from './dto/create-seminar-group.dto';
import { UpdateSeminarGroupDto } from './dto/update-seminar-group.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SeminarGroupService {
  constructor(private prismaService: PrismaService) {}

  create(createSeminarGroupDto: CreateSeminarGroupDto) {
    return 'This action adds a new seminarGroup';
  }

  findOne(id: number) {
    return `This action returns a #${id} seminarGroup`;
  }

  update(id: number, updateSeminarGroupDto: UpdateSeminarGroupDto) {
    return `This action updates a #${id} seminarGroup`;
  }

  remove(id: number) {
    return `This action removes a #${id} seminarGroup`;
  }
}
