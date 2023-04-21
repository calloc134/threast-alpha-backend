import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class StandardUserResDto {
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
  hidden_comment: string;

  // Union Typeのroleを後で追加する

  @Expose()
  @ApiProperty()
  created_at: Date;

  @Expose()
  @ApiProperty()
  updated_at: Date;

  constructor(partial: Partial<StandardUserResDto>) {
    Object.assign(this, partial);
  }

}