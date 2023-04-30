import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class LimitedUserResDto {
  @Expose()
  @ApiProperty()
  cuid: string;

  @Expose()
  @ApiProperty()
  handle: string;

  @Expose()
  @ApiProperty()
  screen_name: string;

  @Expose()
  @ApiProperty()
  bio: string;

  @Expose()
  @ApiProperty()
  created_at: Date;

  @Expose()
  @ApiProperty()
  updated_at: Date;

  constructor(partial: Partial<LimitedUserResDto>) {
    Object.assign(this, partial);
  }

}