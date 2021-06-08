import { ApiProperty } from '@nestjs/swagger';
import { DocumentFormat } from './app.enum';

export class GenerateDocumentDto {
  templateUrl?: string;
  data?: any;
  outputFormat: DocumentFormat;
  @ApiProperty({
    description: 'Template',
    type: 'file',
  })
  file?: Express.Multer.File;
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  debug: boolean = false;
}
