import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { InvalidValueError } from '../../../core/shared/domain/errors/invalid-value.error';

@Catch(InvalidValueError)
export class InvalidValueErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(400).json({
      statusCode: 400,
      error: 'Bad request',
      message: exception?.message,
      type: 'InvalidValueError',
    });
  }
}
