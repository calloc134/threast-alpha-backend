import { ApiProperty } from '@nestjs/swagger';
import { TinyUserResDto } from '../user/tiny';

export class StandardPostCommentResDtoWithTinyUser {
  @ApiProperty()
  cuid: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;

  @ApiProperty()
  user: TinyUserResDto;

  constructor(partial: Partial<StandardPostCommentResDtoWithTinyUser>) {
    Object.assign(this, partial);
  }

}