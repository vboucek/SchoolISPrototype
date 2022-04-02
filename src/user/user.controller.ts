import { Controller, Get, UseGuards } from '@nestjs/common';
import { DummyUser } from '@prisma/client';
import { Console } from 'console';
import { GetUser } from 'src/auth/decorator';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { AuthenticatedGuard, RolesGuard } from 'src/auth/guard';
import { Role } from 'src/auth/roles.enum';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(userservice : UserService){}

    @Get('me')
    @Roles(Role.User)
    @UseGuards(AuthenticatedGuard,RolesGuard)
    public getMe(@GetUser('') user: DummyUser )
    { 
        console.log('Controller');
        console.log(user);
        return 'Hello there';
    }
}
