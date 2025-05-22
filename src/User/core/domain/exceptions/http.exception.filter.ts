import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { MongooseError } from 'mongoose';

@Catch(HttpException, MongooseError)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      success: false,
      status,
      error: exception.name,
      message:
        (exception.getResponse() as { message: any }).message ??
        exception.message,
      path: request.url,
      data: [],
    });
  }
}
