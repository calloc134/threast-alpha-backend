import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsPositive } from "class-validator";

export class PagenatedQueryReqDto {
  @IsOptional()
  @IsInt()
  @IsPositive()
  @ApiProperty({required: false})
  current_page?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  @ApiProperty({required: false})
  per_page?: number;
}