import { Body, Controller, Get, Post, Req, Request, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
import { SignUpDto } from "./dto/signup.dto";
import { LocalAuthGuard, LocalAuthGuard as LoginAuthGuard } from "./guard";



@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Get('signup')
    public signupPage()
    {

    }

    @Post('signup')    
    public async signup(@Body() dto: SignUpDto, @Res() res) { 
        await this.authService.signup(dto);
        return res.Redirect('/auth/login');
    }

    @Get('login')
    public loginPage()
    {

    }

    @Post('login')
    @UseGuards(LocalAuthGuard)
    public login(@Body() dto: AuthDto, @Res() res) {
        return res.Redirect('/users/me');
    }

    @Post('logout')
    public logout(@Req() req, @Res() res) {
        req.session.destroy();
        return res.Redirect('/');
    }
}