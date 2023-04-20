import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginFormReqDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true })
  handle: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true })
  password: string;
}