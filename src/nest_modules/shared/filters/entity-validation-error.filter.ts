import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { EntityValidationError } from '../../../core/shared/domain/errors/entity-validation.error';

@Catch(EntityValidationError)
export class EntityValidationErrorFilter implements ExceptionFilter {
  catch(exception: EntityValidationError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(422).json({
      statusCode: 422,
      type: 'EntityValidationError',
      message: 'Unprocessable entity',
      error: exception.error.reduce((acc: any, current) => {
        for (const [key, value] of Object.entries(current)) {
          if (key in acc) {
            acc[key].push(value);
          } else {
            acc[key] = [...value];
          }
        }

        return acc;
      }, {}),
    });
  }
}
