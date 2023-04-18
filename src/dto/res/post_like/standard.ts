import { ApiProperty } from '@nestjs/swagger';
import { TinyPostResDto } from '../post/tiny';
import { TinyUserResDto } from '../user/tiny';

export class StandardPostLikeResDto {
  @ApiProperty()
  cuid: string;

  @ApiProperty()
  post: TinyPostResDto;

  @ApiProperty()
  user: TinyUserResDto;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;

}