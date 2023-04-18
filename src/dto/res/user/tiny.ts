import { ApiProperty } from '@nestjs/swagger';

export class TinyUserResDto {
  @ApiProperty()
  cuid: string;

  @ApiProperty()
  handle: string;

  @ApiProperty()
  screen_name: string;
}