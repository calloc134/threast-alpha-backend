import { ApiProperty } from '@nestjs/swagger';
import { TinyPostResDto } from '../post/tiny';
import { TinyUserResDto } from '../user/tiny';
import { Expose } from 'class-transformer';

export class StandardPostLikeResDtoWithTinyUser {

  @Expose()
  @ApiProperty()
  cuid: string;

  @Expose()
  @ApiProperty()
  user: TinyUserResDto;

  @Expose()
  @ApiProperty()
  created_at: Date;

  @Expose()
  @ApiProperty()
  updated_at: Date;

  constructor(partial: Partial<StandardPostLikeResDtoWithTinyUser>) {
    Object.assign(this, partial);
  }

}