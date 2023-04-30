import { ApiProperty } from '@nestjs/swagger';
import { TinyPostResDto } from '../post/tiny';
import { TinyUserResDto } from '../user/tiny';
import { Expose } from 'class-transformer';

export class StandardPostLikeResDtoWithTinyPost {

  @Expose()
  @ApiProperty()
  cuid: string;

  @Expose()
  @ApiProperty()
  post: TinyPostResDto;

  @Expose()
  @ApiProperty()
  created_at: Date;

  @Expose()
  @ApiProperty()
  updated_at: Date;

  constructor(partial: Partial<StandardPostLikeResDtoWithTinyPost>) {
    Object.assign(this, partial);
  }

}