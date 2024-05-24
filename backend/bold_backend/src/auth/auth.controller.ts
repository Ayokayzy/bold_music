import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { Prisma, TokenType } from '@prisma/client';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dts';
import { excludeFromObject, generateRandomToken } from 'src/utilities';
import { UserLoginDto } from 'src/user/dto/user-login.dto';
import { DatabaseService } from 'src/database/database.service';
import { log } from 'console';
import { EmailDto } from './dto/emailDto';
import { ResetPasswordDto } from './dto/ResetPasswordDto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private databaseService: DatabaseService) { }

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

    @Post('/send-email-verification')
    sendEmailVerification(@Body(ValidationPipe) email: EmailDto) {
        this.authService.sendEmailVerification(email.email)
        return {
            status: "success",
            code: 200,
            message: "A mail has been sent to your email.",
        }
    }

    @Post('/verify-email')
    verifyEmailAccount(@Body(ValidationPipe) token: { token: string }) {
        this.authService.verifyEmailAccount(+token.token)
        return {
            status: "success",
            code: 200,
            message: "Email verified successfully",
        }
    }

    @Post('/request-password-reset')
    requestPasswordReset(@Body(ValidationPipe) email: EmailDto) {
        this.authService.requestPasswordReset(email.email)
        return {
            status: "success",
            code: 200,
            message: "A mail has been sent to your email.",
        }
    }

    @Post('/verify-password-reset-token')
    resetPassword(@Body() token: { token: string }) {
        this.authService.verifyPasswordReset(+token.token)
        return {
            status: "success",
            code: 200,
            message: "Token verified successfully",
        }
    }

    @Post('/change-password')
    changePassword(@Body(ValidationPipe) changePasswordDto: ResetPasswordDto) {
        this.authService.changePassword(changePasswordDto.id, changePasswordDto.oldPassword, changePasswordDto.newPassword)
        return {
            status: "success",
            code: 200,
            message: "Password reset successfully",
        }
    }

}
