import { Injectable } from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';
import { strict } from 'assert';
import { DatabaseService } from 'src/database/database.service';

export type User = any

@Injectable()
export class UserService {
    constructor(private databaseService: DatabaseService) { }

    async findAll(role?: Role) {
        if (role) {
            return await this.databaseService.user.findMany({
                where: { role, },
            })
        }
        return this.databaseService.user.findMany({})
    }

    async findOne(id: string) {
        return await this.databaseService.user.findUnique({
            where: { id, },
        })
    }

    async update(id: string, updateUserDto: Prisma.UserUpdateInput) {
        return await this.databaseService.user.update({
            where: {
                id,
            },
            data: updateUserDto
        })
    }

    async delete(id: string) {
        return await this.databaseService.user.delete({
            where: {
                id,
            }
        })
    }
}
