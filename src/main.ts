import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfig } from './config';
import { setupApp, setupSwagger } from './utils';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const { port, apiBasePath } = configService.get<AppConfig>('service');

  if (apiBasePath) {
    app.setGlobalPrefix(apiBasePath);
  }

  setupApp(app);

  setupSwagger(app);

  await app.listen(port);

  Logger.log(`Swagger UI available at http://localhost:${port}/docs`);
  Logger.log(`Application is running on: http://localhost:${port}${apiBasePath || ''}`);
}

bootstrap();
