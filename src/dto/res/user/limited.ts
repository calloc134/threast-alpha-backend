import { ApiProperty } from '@nestjs/swagger';

export class LimitedUserResDto {
  @ApiProperty()
  cuid: string;

  @ApiProperty()
  handle: string;

  @ApiProperty()
  screen_name: string;

  @ApiProperty()
  bio: string;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;

}