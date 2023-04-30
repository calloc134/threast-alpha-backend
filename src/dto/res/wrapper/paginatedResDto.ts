import { Expose } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { TinyUserResDto } from "@dto/res/user/tiny";
import { TinyPostResDto } from "@dto/res/post/tiny";

export class PaginatedResDto {
  @Expose()
  @ApiProperty()
  per_page: number;

  @Expose()
  @ApiProperty()
  current_page: number;

  data: unknown


  constructor(partial: Partial<PaginatedResDto>) {
    Object.assign(this, partial);
  }
}

export class PaginatedResDtoTinyUser extends PaginatedResDto {
  @Expose()
  @ApiProperty({ type: [TinyUserResDto]})
  data: TinyUserResDto[];

  constructor(partial: Partial<PaginatedResDtoTinyUser>) {
    super(partial);
    Object.assign(this, partial);
  }
}

export class PaginatedResDtoTinyPost extends PaginatedResDto {
  @Expose()
  @ApiProperty({ type: [TinyPostResDto] })
  data: TinyPostResDto[];

  constructor(partial: Partial<PaginatedResDtoTinyPost>) {
    super(partial);
    Object.assign(this, partial);
  }
}

