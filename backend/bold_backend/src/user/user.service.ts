import { Injectable } from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';
import { strict } from 'assert';
import { DatabaseService } from 'src/database/database.service';

export type User = any

@Injectable()
export class UserService {
    constructor(private databaseService: DatabaseService) { }

    findAll(role: Role) {
        if (role) {
            return this.databaseService.user.findMany({
                where: { role, },
            })
        }

        return this.databaseService.user.findMany({})
    }

    findOne(id: string) {
        return this.databaseService.user.findUnique({
            where: { id, },
        })
    }

    update(id: string, updateUserDto: Prisma.UserUpdateInput) {
        return this.databaseService.user.update({
            where: {
                id,
            },
            data: updateUserDto
        })
    }

    delete(id: string) {
        return this.databaseService.user.delete({
            where: {
                id,
            }
        })
    }
}
