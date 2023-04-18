import { IsNotEmpty, IsString, MaxLength, MinLength, IsAlphanumeric, IsStrongPassword } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserReqDto {
  @IsNotEmpty()
  @IsString()
  @IsAlphanumeric()
  @MinLength(3)
  @MaxLength(20)
  @ApiProperty({ required: true })
  handle: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(40)
  @ApiProperty({ required: true })
  screen_name: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  @ApiProperty({ required: true })
  password: string;
}