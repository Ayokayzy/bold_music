import { Controller, Get, Param, Query } from '@nestjs/common';
import { Role } from '@prisma/client';
import { UserService } from './user.service';
import { excludeFromList, excludeFromObject } from 'src/utilities';
import { Public } from 'src/public';
import { Roles } from 'src/roles.decorator';
import { ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Public()
    // @Roles(Role.admin)
    @Get() // /user
    async getAll(@Query('role') role?: Role) {
        const users = await this.userService.findAll(role)
        return {
            status: "success",
            code: 200,
            message: "Users fetched successfully",
            data: excludeFromList(users, ['password'])
        }
    }

    @Public()
    @Get('/:id')
    async getOne(@Param('id') id: string) {
        const user = await this.userService.findOne(id);
        return {
            status: "success",
            code: 200,
            message: "User fetched successfully",
            data: excludeFromObject(user, ['password'])
        }
    }
}
