import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { User } from "@prisma/client";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            usernameField: 'email',
            passReqToCallback: true
        });
    }

    async validate(req: Request, email: string, password: string, headers:Headers): Promise<User> {
        const user = await this.authService.validateUser({email,password});

        if (!user)
        {
            throw new UnauthorizedException('Invalid credentials');
        }

        delete user.passwdHash;
        return user;
    }
}