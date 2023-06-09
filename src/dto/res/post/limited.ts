import { ApiProperty } from '@nestjs/swagger';
import { TinyUserResDto } from '../user/tiny';
import { TinyHashtagResDto } from '../hashtag/tiny';

export class LimitedPostResDto {

  @ApiProperty()
  cuid: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  body: string;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;

  @ApiProperty()
  user: TinyUserResDto;

  @ApiProperty()
  hashtags: TinyHashtagResDto[];

}