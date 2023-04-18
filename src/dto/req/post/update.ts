import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePostRequestDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  @ApiProperty({ required: false })
  title?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(1000)
  @ApiProperty({ required: false })
  body?: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ required: false })
  private?: boolean;

  @IsOptional()
  @IsString({ each: true })
  @ApiProperty({ required: false })
  hashtags?: string[];
}