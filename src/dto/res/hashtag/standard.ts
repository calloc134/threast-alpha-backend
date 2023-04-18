import { ApiProperty } from '@nestjs/swagger';

export class StandardHashtagResDto {
  @ApiProperty()
  cuid: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  created_at: string;

  @ApiProperty()
  updated_at: string;

}