import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class EmailService {
    constructor(private mailerService: MailerService) { }

    async sendEmailVerification(user: Prisma.UserCreateInput, token: number) {
        await this.mailerService.sendMail({
            to: user.email,
            subject: "Email Verification",
            template: './emailVerification',
            context: {
                name: user.firstName,
                token
            }
        })
    }

    async sendPasswordReset(user: Prisma.UserCreateInput, token: number) {
        await this.mailerService.sendMail({
            to: user.email,
            subject: "Reset Password",
            template: './resetPassword',
            context: {
                name: user.firstName,
                token
            }
        })
    }
}
