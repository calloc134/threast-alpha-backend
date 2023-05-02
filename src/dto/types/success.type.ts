import { ApiProperty } from "@nestjs/swagger";

export class SuccessResDto {
  @ApiProperty()
  success: boolean;
}