import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class TinyHashtagResDto {
  @Expose()
  @ApiProperty()
  cuid: string;

  @Expose()
  @ApiProperty()
  name: string;

  constructor(partial: Partial<TinyHashtagResDto>) {
    Object.assign(this, partial);
  }

}