import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Patch, Redirect, Req, Res, SetMetadata, UnauthorizedException, UseGuards } from '@nestjs/common';
import { User, UserRole } from '@prisma/client';
import { Console } from 'console';
import { GetUser } from 'src/auth/decorator';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { AuthenticatedGuard, RolesGuard } from 'src/auth/guard';
import { PARAMS_ONLY_ID } from '../global-constants';
import { ParseParamsId } from '../global-decorators';
import { UserDto } from './dto';
import { UserService } from './user.service';

@Controller('users')
@UseGuards(AuthenticatedGuard)
export class UserController {
    constructor(private userservice: UserService) { }

    @Get('me')
    public async getMe(@GetUser() user: User) {
        return await this.userservice.getUserDto(user.id);
    }

    @Get("/user/" + PARAMS_ONLY_ID)
    public async getById(@ParseParamsId() id: number) {
        return await this.userservice.getUserDto(id);
    }

    @Get("index")
    @Roles(UserRole.admin)
    @UseGuards(RolesGuard)
    public async getAll(){
        return await this.userservice.getAll();
    }

    @Patch("/edit/" + PARAMS_ONLY_ID)
    @Roles(UserRole.admin, UserRole.user)
    @UseGuards(RolesGuard)
    public async update(@ParseParamsId() id: number, @Body() updateUserDto: UserDto,
        @GetUser() user: User, @Res() res) {
        if (user.roles.includes(UserRole.admin)) {
            await this.userservice.updateUserAdmin(id, updateUserDto);
            return res.Redirect('/users/user/' + id.toString);
        }
        else if (id == user.id) {
            await this.userservice.updateUserHimself(id, updateUserDto);
            return res.Redirect('/users/me');
        }
        else {
            throw new UnauthorizedException();
        }
    }

    @Delete("/delete/" + PARAMS_ONLY_ID)
    @Roles(UserRole.admin, UserRole.user)
    @UseGuards(RolesGuard)
    public async remove(@Req() req, @ParseParamsId() id: number, @GetUser() user: User, @Res() res) {
        if (id == user.id) {
            await this.userservice.deleteUser(id);
            req.session.destroy();
            return res.Redirect('/');
        }
        else if (user.roles.includes(UserRole.admin)) {
            await this.userservice.deleteUser(id);
            
            return res.Redirect('/users/user/' + id.toString);
        }
        else {
            throw new UnauthorizedException();
        }
    }
}
