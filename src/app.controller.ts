import { Express, Response } from 'express';
import { Body, Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { GenerateDocumentDto, GenerateDocumentDtoWithTemplateId } from './app.dto';
import { ApiConsumes } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  healthCheck(): string {
    return this.appService.healthCheck();
  }

  @Post('templates/:templateId/generate')
  async generateWithTemplateId(
    @Param('templateId') templateId: string,
    @Body() body: GenerateDocumentDtoWithTemplateId,
    @Res() response: Response,
  ) {
    return this.appService.generateWithTemplateId(templateId, body, response);
  }

  @Post('generate')
  @ApiConsumes('multipart/form-data', 'application/json')
  @UseInterceptors(FileInterceptor('file'))
  async generate(
    @Body() body: GenerateDocumentDto,
    @UploadedFile() file: Express.Multer.File,
    @Res() response: Response,
  ) {
    if (file) {
      body.file = file.buffer;
    }
    return this.appService.generate(body, response);
  }
}
