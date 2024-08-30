import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import NotImplementedError from '../../../core/shared/domain/errors/not-implemented.error';

@Catch(NotImplementedError)
export class NotImplementedErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(501).json({
      statusCode: 501,
      error: 'Not Implemented',
      message: exception.message,
      type: 'NotImplementedError',
    });
  }
}
