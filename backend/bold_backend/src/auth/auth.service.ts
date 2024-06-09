import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotAcceptableException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma, TokenType } from '@prisma/client';
import * as bcrypt from 'bcrypt'
import { DatabaseService } from 'src/database/database.service';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { excludeFromObject, generateRandomToken } from 'src/utilities';
import { CreateUserDto } from 'src/user/dto/create-user.dts';
import moment from 'moment';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class AuthService {
    constructor(private readonly databaseService: DatabaseService, private jwtService: JwtService, private env: ConfigService, private emailService: EmailService) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.databaseService.user.findUnique({
            where: {
                email: username
            }
        });
        if (!user) throw new BadRequestException("Incorrect email.")
        const result = await bcrypt.compare(pass, user.password)
        if (!result) throw new BadRequestException("Incorrect password.")
        return excludeFromObject(user, ["password", "createdAt", "updatedAt"])
    }

    async registerUser(createUserDto: CreateUserDto) {
        try {
            const exists = await this.databaseService.user.findUnique({
                where: { email: createUserDto.email }
            })
            if (exists) throw new ConflictException("This email already belongs to a user")
            const hash = await bcrypt.hash(createUserDto.password, +this.env.get<number>("SALT_ROUNDS"))
            const user = this.databaseService.user.create({
                data: { ...createUserDto, id: uuidv4(), password: hash }
            })
            return user
        } catch (error) {
            throw new Error(error)
        }
    }

    async login(user: any) {
        // const user = await this.databaseService.user.findUnique({
        //     where: {
        //         email: email
        //     }
        // });
        // if (!user) throw new UnauthorizedException("Incorrect email.")
        // const result = await bcrypt.compare(password, user.password)
        // if (!result) throw new UnauthorizedException("Incorrect password.")
        // if (!user.emailVerified) throw new UnauthorizedException("email not verified")
        const payload = { email: user.email, sub: user.id };
        return {
            // user: excludeFromObject(user, ['password']),
            user: user,
            token: this.jwtService.sign(payload)
        }
    }

    async sendEmailVerification(email: string) {
        // find user with email
        try {
            const user = await this.databaseService.user.findUnique({
                where: { email, }
            })
            if (!user) throw new UnauthorizedException("This email does not belong to any user")
            // find and delete duplicate token
            await this.databaseService.token.deleteMany({
                where: {
                    AND: [
                        { userId: user.id },
                        { type: TokenType.VerifyEmail }
                    ]
                }
            })
            const token = generateRandomToken()
            const now = moment()
            await this.databaseService.token.create({
                data: {
                    id: uuidv4(),
                    token,
                    type: TokenType.VerifyEmail,
                    expired: false,
                    expireAt: now.add(15, 'minutes').format(),
                    userId: user.id
                }
            })
            await this.emailService.sendEmailVerification(user, token)
        } catch (error) {
            console.log({ error });
            throw new InternalServerErrorException(error)
        }
        return
    }

    async verifyEmailAccount(token: number) {
        const foundToken = await this.databaseService.token.findFirst({
            where: {
                token: token
            }
        })
        if (!foundToken) throw new NotAcceptableException("Invalid Token")
        const tokenExpiryTime = moment(foundToken.createdAt).add(15, 'minutes');
        if (moment(foundToken.expireAt).isAfter(tokenExpiryTime)) {
            await this.databaseService.token.delete({
                where: {
                    id: foundToken.id,
                },
            });
            throw new BadRequestException('Token has expired');
        }
        const user = await this.databaseService.user.update({
            where: {
                id: foundToken.userId
            },
            data: {
                emailVerified: true
            }
        })
        await this.databaseService.token.delete({
            where: {
                id: foundToken.id
            }
        });
        return excludeFromObject(user, ["password"]);
    }

    async requestPasswordReset(email: string) {
        try {
            const user = await this.databaseService.user.findUnique({
                where: { email, }
            });
            if (!user) throw new UnauthorizedException("This email does not belong to any user");
            const token = generateRandomToken();
            const now = moment();
            await this.databaseService.token.create({
                data: {
                    id: uuidv4(),
                    token,
                    type: TokenType.ResetPassword,
                    expired: false,
                    expireAt: now.add(15, 'minutes').format(),
                    userId: user.id,
                }
            })
            this.emailService.sendEmailVerification(user, token);
            return "success"
        } catch (error) {
            console.log({ error });
            throw new InternalServerErrorException(error);
        }
    }

    async verifyPasswordReset(token: number) {
        const foundToken = await this.databaseService.token.findFirst({
            where: {
                token: token
            }
        })
        if (!foundToken) throw new NotAcceptableException("Invalid Token")
        const now = moment()
        if (moment(foundToken.expireAt) > moment(foundToken.createdAt).add(15, 'minute')) {
            await this.databaseService.token.delete({
                where: {
                    id: foundToken.id
                }
            })
            throw new BadRequestException("Token has expired")
        }
        await this.databaseService.token.delete({
            where: {
                id: foundToken.id
            }
        })
        return
    }

    async changePassword(id: string, oldPassword: string, newPassword: string) {
        const user = await this.databaseService.user.findUnique({
            where: { id, }
        })
        if (!user) throw new UnauthorizedException("Unauthorized user");
        const result = await bcrypt.compare(oldPassword, user.password);
        if (!result) throw new UnauthorizedException("Incorrect password.");
        const hash = await bcrypt.hash(user.password, +this.env.get<number>("SALT_ROUNDS"))
        await this.databaseService.user.update({
            where: { id, },
            data: { password: hash }
        })
    }
}
