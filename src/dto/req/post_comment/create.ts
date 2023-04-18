import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostCommentReqDto {

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(300)
  @ApiProperty({ required: true })
  content: string;
}