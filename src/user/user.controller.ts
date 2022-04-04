import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Patch, SetMetadata, UseGuards } from '@nestjs/common';
import { User, UserRole } from '@prisma/client';
import { Console } from 'console';
import { GetUser } from 'src/auth/decorator';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { AuthenticatedGuard, RolesGuard } from 'src/auth/guard';
import { PARAMS_ONLY_ID } from '../global-constants';

import { ParseParamsId } from '../global-decorators';
import { UpdateUserDto } from './dto/update-user.dto';


import { UserService } from './user.service';

@Controller('users')
@UseGuards(AuthenticatedGuard)
export class UserController {
    constructor(private userservice: UserService) { }

    @Get('me')
    public async getMe(@GetUser() user: User) {
        return await this.userservice.getUser(user.id);
    }

    @Get(PARAMS_ONLY_ID)
    public async getById(@ParseParamsId() id: number) {
        return await this.userservice.getUser(id);
    }

    @Get("/edit/"+PARAMS_ONLY_ID)
    @Roles(UserRole.admin, UserRole.user)
    @UseGuards(RolesGuard)
    public async updatePage(){

    }

    @Patch("/edit/"+PARAMS_ONLY_ID)
    @Roles(UserRole.admin, UserRole.user)
    @UseGuards(RolesGuard)
    public async update(@ParseParamsId() id: number, @Body() updateUserDto: UpdateUserDto, @GetUser() user: User) {
        if (user.roles.includes(UserRole.admin)) {
            await this.userservice.updateUserAdmin(id, updateUserDto);
        }
        else {
            await this.userservice.updateUserHimself(id, updateUserDto);
        }
        return;
    }

    @Get("/delete/"+PARAMS_ONLY_ID)
    public async deletePage(){
        
    }

    @Delete("/delete/"+PARAMS_ONLY_ID)
    @Roles(UserRole.admin)
    @UseGuards(RolesGuard)
    public async remove(@ParseParamsId() id: number) {
        await this.userservice.deleteUser(id);
        return;
    }
}
