import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { useContainer, ValidationError } from 'class-validator';
import { BadRequestErrorFilter } from './nest_modules/shared/filters/bad-request-error.filter';
import { ConflictErrorFilter } from './nest_modules/shared/filters/conflict-error.filter';
import { EntityValidationErrorFilter } from './nest_modules/shared/filters/entity-validation-error.filter';
import { InvalidValueErrorFilter } from './nest_modules/shared/filters/invalid-value-error.filter';
import { NoContentErrorFilter } from './nest_modules/shared/filters/no-content-error.filter';
import { NotFoundErrorFilter } from './nest_modules/shared/filters/not-found-error.filter';
import { NotImplementedErrorFilter } from './nest_modules/shared/filters/not-implemented-error.filter';
import { WrapperDataInterceptor } from './nest_modules/shared/interceptors/wrapper-data.interceptor';
import {
  ClassSerializerInterceptor,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: 422,
      transform: true,
      stopAtFirstError: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const recursiveReduce = (accumulator: object, error: any) => {
          if (error.children && error.children.length > 0) {
            return error.children.reduce(recursiveReduce, accumulator);
          }

          if (error.property in accumulator) {
            if (
              error.constraints &&
              Object.keys(error.constraints).length > 0
            ) {
              accumulator[error.property].push(
                error.constraints[Object.keys(error.constraints)[0]],
              );
            }
          } else {
            if (
              error.constraints &&
              Object.keys(error.constraints).length > 0
            ) {
              accumulator[error.property] = [
                error.constraints[Object.keys(error.constraints)[0]],
              ];
            }
          }

          return accumulator;
        };

        return new UnprocessableEntityException({
          statusCode: 422,
          type: 'ValidationError',
          message: 'Invalid request body content',
          error: errors.reduce(recursiveReduce, {}),
        });
      },
      validateCustomDecorators: true,
    }),
  );

  app.useGlobalInterceptors(
    new WrapperDataInterceptor(),
    new ClassSerializerInterceptor(app.get(Reflector)),
  );

  app.useGlobalFilters(
    new BadRequestErrorFilter(),
    new ConflictErrorFilter(),
    new EntityValidationErrorFilter(),
    new InvalidValueErrorFilter(),
    new NoContentErrorFilter(),
    new NotFoundErrorFilter(),
    new NotImplementedErrorFilter(),
  );

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.enableCors({
    origin: true,
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  });

  await app.listen(3000);
}
bootstrap();
