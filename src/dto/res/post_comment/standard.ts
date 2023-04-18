import { ApiProperty } from '@nestjs/swagger';
import { TinyPostResDto } from '../post/tiny';
import { TinyUserResDto } from '../user/tiny';

export class StandardPostCommentResDto {
  @ApiProperty()
  cuid: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;

  @ApiProperty()
  post: TinyPostResDto;

  @ApiProperty()
  user: TinyUserResDto;

}