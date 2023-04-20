import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
export class TinyUserResDto {
  @Expose()
  @ApiProperty()
  cuid: string;

  @Expose()
  @ApiProperty()
  handle: string;

  @Expose()
  @ApiProperty()
  screen_name: string;

  constructor(partial: Partial<TinyUserResDto>) {
    Object.assign(this, partial);
}
}