import { Express, Response } from 'express';
import { Body, Controller, Get, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { GenerateDocumentDto } from './app.dto';
import { ApiConsumes } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  healthCheck(): string {
    return this.appService.healthCheck();
  }

  @Post('generate')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async generate(
    @Body() body: GenerateDocumentDto,
    @UploadedFile() file: Express.Multer.File,
    @Res() response: Response,
  ) {
    if (file) {
      body.file = file;
    }
    return this.appService.generate(body, response);
  }
}
