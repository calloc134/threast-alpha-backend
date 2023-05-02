import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class StandardHashtagResDto {
  @Expose()
  @ApiProperty()
  cuid: string;

  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiProperty()
  description: string;

  @Expose()
  @ApiProperty()
  created_at: Date;

  @Expose()
  @ApiProperty()
  updated_at: Date;

  constructor(partial: Partial<StandardHashtagResDto>) {
    Object.assign(this, partial);
  }

}