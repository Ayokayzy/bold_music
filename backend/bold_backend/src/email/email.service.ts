import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
    constructor(private mailerService: MailerService) {}
    
    async sendEmailVerification(email: string, token: number) {
        await this.mailerService.sendMail({
            to: email,
            subject: "Email Verification",
            template: './emailVerification',
            context: {
                name: "",
                token
            }
        })
    }

    sendPasswordReset() {}
}
