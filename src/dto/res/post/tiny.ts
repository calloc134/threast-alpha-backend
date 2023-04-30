import { ApiProperty } from '@nestjs/swagger';
import { TinyUserResDto } from '../user/tiny';

export class TinyPostResDto {

  @ApiProperty()
  cuid: string;

  @ApiProperty()
  title: string;

  constructor(partial: Partial<TinyPostResDto>) {
    Object.assign(this, partial);
  }
}