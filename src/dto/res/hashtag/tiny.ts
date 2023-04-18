import { ApiProperty } from '@nestjs/swagger';

export class TinyHashtagResDto {
  @ApiProperty()
  cuid: string;

  @ApiProperty()
  name: string;

}