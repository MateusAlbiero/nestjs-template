import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import NoContentError from '../../../core/shared/domain/errors/no-content.error';

@Catch(NoContentError)
export class NoContentErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(204).json({});
  }
}
