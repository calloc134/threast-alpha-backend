import { ApiProperty } from '@nestjs/swagger';
import { TinyUserResDto } from '../user/tiny';
import { TinyHashtagResDto } from '../hashtag/tiny';
import { Expose } from 'class-transformer';

export class StandardPostResDto {

  @Expose()
  @ApiProperty()
  cuid: string;

  @Expose()
  @ApiProperty()
  title: string;

  @Expose()
  @ApiProperty()
  body: string;

  @Expose()
  @ApiProperty()
  created_at: Date;

  @Expose()
  @ApiProperty()
  updated_at: Date;

  @Expose()
  @ApiProperty()
  private: boolean;

  @Expose()
  @ApiProperty()
  user: TinyUserResDto;

  @Expose()
  @ApiProperty({ type: [TinyHashtagResDto]})
  hashtags: TinyHashtagResDto[];

  @Expose()
  @ApiProperty()
  likes: number;

  @Expose()
  @ApiProperty()
  comments: number;

  constructor(partial: Partial<StandardPostResDto>) {
    Object.assign(this, partial);
  }

}