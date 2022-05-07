import { Controller, Get, UseGuards } from '@nestjs/common';
import { User, UserRole } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { AuthenticatedGuard, RolesGuard } from 'src/auth/guard';


import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(userservice : UserService){}

    @Get('me')
    @UseGuards(AuthenticatedGuard)
    public getMe(@GetUser() user: User )
    { 
        return "Approved";
    }
}
