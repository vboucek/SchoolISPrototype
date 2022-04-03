import { Controller, Get, UseGuards } from '@nestjs/common';
import { User, UserRole } from '@prisma/client';
import { Console } from 'console';
import { GetUser } from 'src/auth/decorator';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { AuthenticatedGuard, RolesGuard } from 'src/auth/guard';


import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(userservice : UserService){}

    @Get('me')
    @Roles(UserRole.user)
    @UseGuards(AuthenticatedGuard,RolesGuard)
    public getMe(@GetUser('') user: User )
    { 
        console.log('Controller');
        console.log(user);
        return 'Hello there';
    }
}
