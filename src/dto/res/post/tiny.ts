import { ApiProperty } from '@nestjs/swagger';
import { TinyUserResDto } from '../user/tiny';
import { Expose } from 'class-transformer';

export class TinyPostResDto {

  @Expose()
  @ApiProperty()
  cuid: string;

  @Expose()
  @ApiProperty()
  title: string;

  constructor(partial: Partial<TinyPostResDto>) {
    Object.assign(this, partial);
  }
}