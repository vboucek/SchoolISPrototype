import {
  Body,
  Controller,
  Post,
  Req,
  Response,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { SignUpDto } from './dto/signup.dto';
import { AuthenticatedGuard, LocalAuthGuard } from './guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  public login(@Body() dto: AuthDto, @Response() response) {
    return response.status(200).send();
  }

  @Post('logout')
  @UseGuards(AuthenticatedGuard)
  public logout(@Req() req, @Response() response) {
    req.session.destroy();
    return response.status(200).send();
  }
}
