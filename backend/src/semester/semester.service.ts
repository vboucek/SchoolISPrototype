import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Semester } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { plainToClass, plainToInstance } from 'class-transformer';
import { PrismaService } from '../prisma/prisma.service';
import { SemesterDto } from './dto';
import { SemesterCreateDto } from './dto/semester-create.dto';

@Injectable()
export class SemesterService {
  constructor(private prismaService: PrismaService) { }

  public async create(semesterDto: SemesterCreateDto) {
    try {
      const newSemester = await this.prismaService.semester.create({
        data: {
          semesterType: semesterDto.semesterType,
          year: semesterDto.year,
        },
      });

      return plainToInstance<SemesterDto, Semester>(
        SemesterDto,
        { ...newSemester },
        { excludeExtraneousValues: true });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Already exists');
        }
        else {
          throw new ForbiddenException();
        }
      }
    }
  }

  public async findAll() {
    const semesters = await this.prismaService.semester.findMany({
      where: {
        deletedAt: null
      }
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
        deletedAt: null
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
    try {
      const semester = await this.prismaService.semester.findFirst({
        where: {
          id: id,
          deletedAt: null
        }
      });

      if (!semester) {
        throw new NotFoundException("Semester not found");
      }

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
    try {
      const semester = await this.prismaService.semester.findFirst({
        where: {
          id: id,
          deletedAt: null
        }
      });

      if (!semester) {
        throw new NotFoundException("Semester not found");
      }

      await this.prismaService.semester.update({
        where: {
          id: id,
        },
        data: {
          deletedAt: new Date()
        }
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ForbiddenException();
      }
    }
  }
}
