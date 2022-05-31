import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  Res,
  UnauthorizedException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { User, UserRole } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { AuthenticatedGuard, RolesGuard } from 'src/auth/guard';
import { PARAMS_ONLY_ID } from '../global-constants';
import { ParseParamsId } from '../global-decorators';
import { UserCreateDto } from './dto/user-create.dto';
import { UserUpdateUserDto } from './dto/user-update-user.dto';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import path = require('path');
import { join } from 'path';
import { of } from 'rxjs';
import { UserSubjectsFilterDto } from './dto/user-subjects-filter.dto';
import { AdminUpdateUserDto } from './dto/admin-update-user.dto';

@Controller('users')
@Roles(UserRole.user)
@UseGuards(AuthenticatedGuard, RolesGuard)
export class UserController {
  constructor(private userservice: UserService) {}

  @Get('me')
  public async getMe(@GetUser() user: User) {
    return await this.userservice.getUserDto(user.id);
  }

  @Get(PARAMS_ONLY_ID)
  public async getById(@ParseParamsId() id: number) {
    return await this.userservice.getUserDto(id);
  }

  @Get()
  @Roles(UserRole.admin)
  public async getAll() {
    return await this.userservice.getAll();
  }

  @Post()
  @Roles(UserRole.admin)
  public async create(@Body() userCreateDto: UserCreateDto) {
    return await this.userservice.create(userCreateDto);
  }

  @Patch(PARAMS_ONLY_ID)
  @Roles(UserRole.admin, UserRole.user)
  public async update(
    @ParseParamsId() id: number,
    @Body() updateUserDto: AdminUpdateUserDto,
    @GetUser() user: User,
  ) {
    if (user.roles.includes(UserRole.admin)) {
      return await this.userservice.updateUserAdmin(
        id,
        updateUserDto as AdminUpdateUserDto,
      );
    } else if (id == user.id) {
      return await this.userservice.updateUserHimself(
        id,
        updateUserDto as UserUpdateUserDto,
      );
    } else {
      throw new UnauthorizedException();
    }
  }

  @Delete(PARAMS_ONLY_ID)
  @Roles(UserRole.admin)
  public async remove(@ParseParamsId() id: number) {
    return await this.userservice.deleteUser(id);
  }

  @Get(PARAMS_ONLY_ID + '/subjects')
  public async getSubjects(
    @ParseParamsId() id: number,
    @Query() filter: UserSubjectsFilterDto,
  ) {
    return await this.userservice.getUserSubjects(id, filter);
  }

  @Get(PARAMS_ONLY_ID + '/teacher/subjects')
  public async getTaughtSubjects(
    @ParseParamsId() id: number,
    @Query() filter: UserSubjectsFilterDto,
  ) {
    return await this.userservice.getUserTaughtSubjects(id, filter);
  }

  @Post(PARAMS_ONLY_ID + '/picture')
  @Roles(UserRole.admin, UserRole.user)
  @UseInterceptors(
    FileInterceptor('picture', {
      storage: diskStorage({
        destination: './uploads/profileimages',
        filename: (req, file, cb) => {
          const filename: string =
            path.parse(file.originalname).name.replace(/\s/g, '') + uuid();
          const extension: string = path.parse(file.originalname).ext;

          cb(null, `${filename}${extension}`);
        },
      }),
    }),
  )
  public async uploadProfilePicture(
    @ParseParamsId() id: number,
    @GetUser() user: User,
    @UploadedFile() file,
  ) {
    if (user.roles.includes(UserRole.admin) || id === user.id) {
      await this.userservice.setUserProfilePicture(id, file.filename);
    } else {
      throw new UnauthorizedException();
    }
  }

  @Get(PARAMS_ONLY_ID + '/picture')
  public async getProfilePicture(@ParseParamsId() id: number, @Res() res) {
    const profilePicture =
      (await this.userservice.getProfilePicture(id)) ?? 'generic.jpg';

    return of(
      res.sendFile(
        join(process.cwd(), 'uploads/profileimages/' + profilePicture),
      ),
    );
  }
}
