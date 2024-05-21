import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dts';
import { excludeFromObject } from 'src/utilities';
import { UserLoginDto } from 'src/user/dto/user-login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('/login')
    async login(@Body(ValidationPipe) signInDto: UserLoginDto) {
        const result = await this.authService.login(signInDto)
        return {
            status: "success",
            code: 201,
            message: "User logged successfully",
            data: {
                data: result.user,
                token: result.token
            }
        }
    }

    @Post('/register')
    async register(@Body(ValidationPipe) createUserDto: CreateUserDto) {
        const user = await this.authService.registerUser(createUserDto)
        return {
            status: "success",
            code: 201,
            message: "User created successfully",
            data: excludeFromObject(user, ['password'])
        }

    }

    @Post()
    requestEmailVerification() { }

    @Post()
    verifyEmailAccount() { }

    @Post()
    requestPasswordReset() { }

    @Post()
    resetPassword() { }

    @Post()
    changePassword() { }

}
