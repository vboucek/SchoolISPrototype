import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { plainToClass } from 'class-transformer';
import { PrismaService } from '../prisma/prisma.service';
import { FacultyDto } from './dto';

@Injectable()
export class FacultiesService {
  constructor(private prismaService: PrismaService) {}

  public async create(facultyDto: FacultyDto) {
    try {
      const newSemester = await this.prismaService.faculty.create({
        data: {
          name: facultyDto.name,
          logoPath: facultyDto.logoPath,
        },
      });

      return newSemester.id;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Already exists');
        }
      }
    }
  }

  public async findAll() {
    const faculties = await this.prismaService.faculty.findMany();
    return faculties.map((faculty, ind, arr) =>
      plainToClass(
        FacultyDto,
        { ...faculty },
        { excludeExtraneousValues: true },
      ),
    );
  }

  public async findOne(id: number) {
    const faculty = await this.prismaService.faculty.findFirst({
      where: {
        id: id,
      },
    });

    if (!faculty) {
      throw new NotFoundException('Semester does not exist');
    }

    return plainToClass(
      FacultyDto,
      { ...faculty },
      { excludeExtraneousValues: true },
    );
  }

  public async update(id: number, facultyDto: FacultyDto) {
    try {
      await this.prismaService.faculty.update({
        where: {
          id: id,
        },
        data: {
          name: facultyDto.name,
          logoPath: facultyDto.logoPath,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code == 'P2002') {
          throw new ForbiddenException('Already exists');
        } else {
          throw new ForbiddenException();
        }
      }
    }
  }

  public async remove(id: number) {
    try {
      await this.prismaService.faculty.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ForbiddenException();
      }
    }
  }
}
