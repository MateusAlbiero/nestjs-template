import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import BadRequestError from '../../../core/shared/domain/errors/bad-request.error';

@Catch(BadRequestError)
export class BadRequestErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(400).json({
      statusCode: 400,
      error: 'Bad request',
      message: exception?.message ?? 'bad request',
      type: 'BadRequestError',
    });
  }
}
