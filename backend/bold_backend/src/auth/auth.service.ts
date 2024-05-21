import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt'
import { DatabaseService } from 'src/database/database.service';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { excludeFromObject } from 'src/utilities';

@Injectable()
export class AuthService {
    constructor(private readonly databaseService: DatabaseService, private jwtService: JwtService, private env: ConfigService) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.databaseService.user.findUnique({
            where: {
                email: username
            }
        });
        if (!user) throw new BadRequestException("Incorrect email.")
        const result = await bcrypt.compare(pass, user.password)
        if (!result) throw new BadRequestException("Incorrect password.")
        return user
        // return null;
    }

    async registerUser(createUserDto: Prisma.UserCreateInput) {
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

    async login({ email, password }) {
        const user = await this.databaseService.user.findUnique({
            where: {
                email: email
            }
        });
        if (!user) throw new UnauthorizedException("Incorrect email.")
        const result = await bcrypt.compare(password, user.password)
        if (!result) throw new UnauthorizedException("Incorrect password.")
        const payload = excludeFromObject(user, ['password', 'createdAt', 'updatedAt', 'firstName', 'lastName'])

        return {
            user: excludeFromObject(user, ['password']),
            token: await this.jwtService.signAsync(payload)
        }
    }
}
