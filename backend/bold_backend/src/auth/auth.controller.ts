import { Body, Controller, Get, Post, Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { Prisma, TokenType } from '@prisma/client';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dts';
import { excludeFromObject, generateRandomToken } from 'src/utilities';
import { UserLoginDto } from 'src/user/dto/user-login.dto';
import { DatabaseService } from 'src/database/database.service';
import { log } from 'console';
import { EmailDto } from './dto/emailDto';
import { ResetPasswordDto } from './dto/ResetPasswordDto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/public';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { TokenDto } from './dto/tokenDto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private databaseService: DatabaseService) { }

    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Body(ValidationPipe) userLoginDto: UserLoginDto, @Request() req) {
        const result = await this.authService.login(req.user)
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

    @Public()
    @Post('/register')
    @ApiCreatedResponse({ type: CreateUserDto })
    async register(@Body(ValidationPipe) createUserDto: CreateUserDto) {
        const user = await this.authService.registerUser(createUserDto)
        return {
            status: "success",
            code: 201,
            message: "User created successfully",
            data: excludeFromObject(user, ['password'])
        }
    }

    @Public()
    @Post('/send-email-verification')
    @ApiOkResponse()
    async sendEmailVerification(@Body(ValidationPipe) email: EmailDto) {
        await this.authService.sendEmailVerification(email.email)
        return {
            status: "success",
            code: 200,
            message: "A mail has been sent to your email.",
        }
    }

    @Public()
    @Post('/verify-email')
    @ApiOkResponse()
    async verifyEmailAccount(@Body(ValidationPipe) token: TokenDto) {
        await this.authService.verifyEmailAccount(+token.token)
        return {
            status: "success",
            code: 200,
            message: "Email verified successfully",
        }
    }

    @Public()
    @Post('/request-password-reset')
    @ApiOkResponse()
    async requestPasswordReset(@Body(ValidationPipe) email: EmailDto) {
        await this.authService.requestPasswordReset(email.email)
        return {
            status: "success",
            code: 200,
            message: "A mail has been sent to your email.",
        }
    }

    @Public()
    @Post('/verify-password-reset-token')
    @ApiOkResponse()
    async resetPassword(@Body() token: { token: string }) {
        await this.authService.verifyPasswordReset(+token.token)
        return {
            status: "success",
            code: 200,
            message: "Token verified successfully",
        }
    }

    @Public()
    @Post('/change-password')
    @ApiOkResponse()
    async changePassword(@Body(ValidationPipe) changePasswordDto: ResetPasswordDto) {
        await this.authService.changePassword(changePasswordDto.id, changePasswordDto.oldPassword, changePasswordDto.newPassword)
        return {
            status: "success",
            code: 200,
            message: "Password reset successfully",
        }
    }

    @Public()
    @UseGuards(JwtAuthGuard)
    @Get('/profile') @ApiOkResponse({ type: CreateUserDto })
    getProfile(@Request() req) {
        return req.user;
    }

}
