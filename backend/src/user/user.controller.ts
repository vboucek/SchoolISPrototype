import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UnauthorizedException,
  UseGuards,
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
import { UserSubjectsDto } from './dto/user-subjects.dto';

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
    @Body() updateUserDto: UserCreateDto,
    @GetUser() user: User,
  ) {
    if (user.roles.includes(UserRole.admin)) {
      return await this.userservice.updateUserAdmin(
        id,
        updateUserDto as UserCreateDto,
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
  @Roles(UserRole.user)
  public async getSubjects(@ParseParamsId() id: number) {
    return await this.userservice.getUserSubjects(id);
  }
}
