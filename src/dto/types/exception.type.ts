import { ApiProperty } from '@nestjs/swagger';

export class TemplateException {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  error: string;
}