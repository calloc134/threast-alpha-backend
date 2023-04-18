import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateHashtagReqDto {

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  @ApiProperty({ required: false })
  name?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  @ApiProperty({ required: false })
  description?: string;
}