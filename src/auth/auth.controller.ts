import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
import { LocalAuthGuard, LocalAuthGuard as LoginAuthGuard } from "./guard";



@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('signup')
    
    public signup(@Body() dto: AuthDto) { 
        return this.authService.signup(dto);
    }

    @Post('login')
    @UseGuards(LocalAuthGuard)
    public login(@Body() dto: AuthDto) {
        return 'Hello there';
    }
}