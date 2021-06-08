import helmet from 'helmet';
import { ClassSerializerInterceptor, INestApplication, ValidationPipe } from '@nestjs/common';
import { IsProdMode } from '../app.environment';
import { Reflector } from '@nestjs/core';

export const setupApp = (app: INestApplication) => {
  const reflector = app.get(Reflector);

  // https://github.com/graphql/graphql-playground/issues/1283#issuecomment-703631091
  app.use(helmet({ contentSecurityPolicy: IsProdMode ? undefined : false }));
  //#endregion

  app.enableCors();

  // app.useGlobalFilters(new UncaughtExceptionFilter(), new HttpExceptionFilter());

  // app.useGlobalInterceptors(new LoggingInterceptor(), new ClassSerializerInterceptor(reflector));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

  // Need to set whitelist: false for graphql unless to put @Allow decorate on input/arg
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: false }));
};
