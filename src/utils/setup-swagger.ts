import * as fs from 'fs';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication) {
  const writeSwaggerJson = (path: string, document) => {
    fs.writeFileSync(`${path}/swagger.json`, JSON.stringify(document, null, 2), { encoding: 'utf8' });
  };

  const options = new DocumentBuilder()
    .setTitle('API')
    .setVersion(process.env.npm_package_version)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options, {
    operationIdFactory: (_controllerKey: string, methodKey: string) => methodKey,
  });
  writeSwaggerJson(`${process.cwd()}`, document);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: { displayOperationId: true },
  });
  app.use('/docs/swagger.json', (_, res) => {
    res.json(document);
  });
}
