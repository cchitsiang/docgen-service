import { Module, Global } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import AppConfig from './app.config';

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      load: [AppConfig],
      expandVariables: true,
    }),
  ],
  providers: [],
  exports: [NestConfigModule],
})
export class ConfigModule {}
