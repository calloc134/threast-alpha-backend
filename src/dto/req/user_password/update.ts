import { IsNotEmpty, IsString, MaxLength, MinLength, IsAlphanumeric, IsStrongPassword } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserPasswordReqDto {

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true })
  old_password: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  @ApiProperty({ required: true })
  new_password: string;
}