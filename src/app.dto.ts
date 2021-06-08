import { ApiProperty, OmitType } from '@nestjs/swagger';
import { DocumentFormat } from './app.enum';

export class GenerateDocumentDto {
  templateUrl?: string;
  data?: any;
  outputFormat: DocumentFormat;
  @ApiProperty({
    description: 'Template',
    type: 'file',
  })
  file?: Buffer;
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  debug: boolean = false;
}

export class GenerateDocumentDtoWithTemplateId extends OmitType(GenerateDocumentDto, ['templateUrl']) {}
