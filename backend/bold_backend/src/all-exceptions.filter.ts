import { Catch, ArgumentsHost, HttpStatus, HttpException } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { Response, Request } from "express";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import { MyLoggerService } from "./my-logger/my-logger.service";

type MyResponseObj = {
    statusCode: number,
    timeStamp: string,
    path: string,
    response: string | object
}

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
    private readonly logger = new MyLoggerService(AllExceptionsFilter.name)

    catch(exception: any, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();

        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const myResponseObj: MyResponseObj = {
            statusCode: 500,
            timeStamp: new Date().toISOString(),
            path: request.url,
            response: ''
        }

        if (exception instanceof HttpException) {
            myResponseObj.statusCode = exception.getStatus()
            myResponseObj.response = exception.getResponse()
        } else if (exception instanceof PrismaClientValidationError) {
            myResponseObj.statusCode = 422
            myResponseObj.response = exception
        } else if (exception instanceof Error) {
            myResponseObj.response = exception.message
        } else {
            myResponseObj.statusCode = HttpStatus.INTERNAL_SERVER_ERROR
            myResponseObj.response = 'Internal Server Error'
        }

        response
            .status(myResponseObj.statusCode)
            .json(myResponseObj)

        this.logger.error(myResponseObj.response, AllExceptionsFilter.name)

        super.catch(exception, host)
    }
}