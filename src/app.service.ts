import { Response } from 'express';
import { Injectable, Logger, UnprocessableEntityException } from '@nestjs/common';
import createReport, { listCommands } from 'docx-templates';
import toPdf from 'office-to-pdf';
import { GenerateDocumentDto } from './app.dto';
import { DocumentFormat } from './app.enum';

@Injectable()
export class AppService {
  healthCheck(): string {
    return 'OK';
  }

  async generate(dto: GenerateDocumentDto, response: Response) {
    let template: Buffer;
    if (dto.file) {
      template = dto.file.buffer;
    }

    if (dto.data) {
      if (typeof dto.data === 'string') {
        try {
          dto.data = JSON.parse(dto.data);
        } catch (e) {
          Logger.error('Failed to parse data into JSON object', e);
        }
      }
    }

    if (!template) {
      throw new UnprocessableEntityException();
    }

    if (dto.debug) {
      console.log(dto.data);
      const commands = await listCommands(template, ['{{', '}}']);
      console.log(commands);
    }

    const generatedDoc = await createReport({
      cmdDelimiter: ['{{', '}}'],
      template,
      data: dto.data,
    });

    let fileInfo = Buffer.from(generatedDoc);
    if (dto.outputFormat === DocumentFormat.Pdf) {
      fileInfo = await toPdf(fileInfo);
      response.setHeader('Content-Type', 'application/pdf');
    } else {
      response.setHeader('Content-Type', 'application/msword');
    }

    response.status(200);
    response.attachment(dto.outputFormat === DocumentFormat.Pdf ? 'output.pdf' : 'output.docx');
    response.setHeader('Content-Lenght', fileInfo.length);
    response.end(fileInfo);
  }
}
