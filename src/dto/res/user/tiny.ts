import { ApiProperty } from '@nestjs/swagger';

export class TinyUserResDto {
  @ApiProperty()
  cuid: number;

  @ApiProperty()
  handle: string;

  @ApiProperty()
  screen_name: string;
}