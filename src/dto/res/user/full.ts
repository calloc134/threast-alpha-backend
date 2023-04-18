import { ApiProperty } from '@nestjs/swagger';

export class FullUserResDto {
  @ApiProperty()
  cuid: string;

  @ApiProperty()
  handle: string;

  @ApiProperty()
  screen_name: string;

  @ApiProperty()
  bio: string;

  @ApiProperty()
  hidden_comment: string;

  // Union Typeのroleを後で追加する

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;

}