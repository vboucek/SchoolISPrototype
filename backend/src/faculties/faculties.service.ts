import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Faculty } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { plainToClass, plainToInstance } from 'class-transformer';
import { PrismaService } from '../prisma/prisma.service';
import { FacultyDto } from './dto';
import { FacultyCreateDto } from './dto/facutly-create.dto';

@Injectable()
export class FacultiesService {
  constructor(private prismaService: PrismaService) { }

  public async create(facultyDto: FacultyCreateDto) {
    try {
      const newFaculty = await this.prismaService.faculty.create({
        data: {
          name: facultyDto.name,
          logoPath: facultyDto.logoPath,
        },
      });

      return plainToInstance<FacultyDto, Faculty>(
        FacultyDto,
        { ...newFaculty },
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
    const faculties = await this.prismaService.faculty.findMany({
      where: {
        deletedAt: null
      }
    });

    return faculties.map((faculty, ind, arr) =>
      plainToInstance<FacultyDto, Faculty>(
        FacultyDto,
        { ...faculty },
        { excludeExtraneousValues: true })
    );
  }

  public async findOne(id: number) {
    const faculty = await this.prismaService.faculty.findFirst({
      where: {
        id: id,
        deletedAt: null
      },
    });

    if (!faculty) {
      throw new NotFoundException('Semester does not exist');
    }

    return plainToInstance<FacultyDto, Faculty>(
      FacultyDto,
      { ...faculty },
      { excludeExtraneousValues: true });
  }

  public async update(id: number, facultyDto: FacultyCreateDto) {
    try {
      const faculty = this.prismaService.faculty.findFirst({
        where:
        {
          id: id,
          deletedAt: null
        }
      });

      if (!faculty) {
        throw new NotFoundException();
      }

      const updatedFaculty = await this.prismaService.faculty.update({
        where: {
          id: id,
        },
        data: {
          name: facultyDto.name,
          logoPath: facultyDto.logoPath,
        },
      });

      return plainToInstance<FacultyDto, Faculty>(
        FacultyDto,
        { ...updatedFaculty },
        { excludeExtraneousValues: true });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ForbiddenException();
      }
    }
  }

  public async remove(id: number) {
    try {
      const faculty = this.prismaService.faculty.findFirst({
        where:
        {
          id: id,
          deletedAt: null
        }
      });

      if (!faculty) {
        throw new NotFoundException();
      }

      await this.prismaService.faculty.update({
        where: {
          id: id,
        },
        data: {
          deletedAt: new Date()
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ForbiddenException();
      }
    }
  }
}
