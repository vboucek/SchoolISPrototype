import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Semester } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from '../prisma/prisma.service';
import { SemesterDto } from './dto';
import { SemesterCreateDto } from './dto/semester-create.dto';

@Injectable()
export class SemesterService {
  constructor(private prismaService: PrismaService) {}

  public async checkAlreadyExist(semesterDto: SemesterCreateDto) {
    const semester = await this.prismaService.semester.findFirst({
      where: {
        deletedAt: null,
        semesterType: semesterDto.semesterType,
        year: semesterDto.year,
      },
    });

    if (semester != null) {
      throw new ForbiddenException('Already exists');
    }
  }

  public async create(semesterDto: SemesterCreateDto) {
    await this.checkAlreadyExist(semesterDto);

    const newSemester = await this.prismaService.semester.create({
      data: {
        semesterType: semesterDto.semesterType,
        year: semesterDto.year,
      },
    });

    return plainToInstance<SemesterDto, Semester>(
      SemesterDto,
      { ...newSemester },
      { excludeExtraneousValues: true },
    );
  }

  public async findAll() {
    const semesters = await this.prismaService.semester.findMany({
      where: {
        deletedAt: null,
      },
    });

    return semesters.map((semester, ind, arr) =>
      plainToInstance<SemesterDto, Semester>(
        SemesterDto,
        { ...semester },
        { excludeExtraneousValues: true },
      ),
    );
  }

  public async findOne(id: number) {
    const semester = await this.prismaService.semester.findFirst({
      where: {
        id: id,
        deletedAt: null,
      },
    });

    if (!semester) {
      throw new NotFoundException('Semester does not exist');
    }

    return plainToInstance<SemesterDto, Semester>(
      SemesterDto,
      { ...semester },
      { excludeExtraneousValues: true },
    );
  }

  public async update(id: number, updateSemesterDto: SemesterCreateDto) {
    await this.checkAlreadyExist(updateSemesterDto);

    const semester = await this.prismaService.semester.findFirst({
      where: {
        id: id,
        deletedAt: null,
      },
    });

    if (!semester) {
      throw new NotFoundException('Semester not found');
    }

    try {
      const updatedSemester = await this.prismaService.semester.update({
        where: {
          id: id,
        },
        data: {
          year: updateSemesterDto.year,
          semesterType: updateSemesterDto.semesterType,
        },
      });

      return plainToInstance<SemesterDto, Semester>(
        SemesterDto,
        { ...updatedSemester },
        { excludeExtraneousValues: true },
      );
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ForbiddenException();
      }
    }
  }

  public async remove(id: number) {
    const semester = await this.prismaService.semester.findFirst({
      where: {
        id: id,
        deletedAt: null,
      },
    });

    if (!semester) {
      throw new NotFoundException('Semester not found');
    }

    try {
      await this.prismaService.semester.update({
        where: {
          id: id,
        },
        data: {
          deletedAt: new Date(),
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ForbiddenException();
      }
    }
  }
}
