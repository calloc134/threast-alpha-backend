import { IsBoolean, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostRequestDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  @ApiProperty({ required: true })
  title: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(1000)
  @ApiProperty({ required: true })
  body: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  private: boolean;

  @IsString({ each: true })
  @IsNotEmpty()
  @ApiProperty({ required: true })
  hashtags: string[];
}