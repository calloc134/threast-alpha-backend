import { Expose } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { TinyUserResDto } from "@dto/res/user/tiny";
import { TinyPostResDto } from "@dto/res/post/tiny";

export class PagenatedResDto {
  @Expose()
  @ApiProperty()
  per_page: number;

  @Expose()
  @ApiProperty()
  current_page: number;

  data: unknown


  constructor(partial: Partial<PagenatedResDto>) {
    Object.assign(this, partial);
  }
}

export class PagenatedResDtoTinyUser extends PagenatedResDto {
  @Expose()
  @ApiProperty({ type: TinyUserResDto, isArray: true })
  data: TinyUserResDto[];

  constructor(partial: Partial<PagenatedResDtoTinyUser>) {
    super(partial);
    Object.assign(this, partial);
  }
}

export class PagenatedResDtoTinyPost extends PagenatedResDto {
  @Expose()
  @ApiProperty({ type: TinyPostResDto, isArray: true })
  data: TinyPostResDto[];

  constructor(partial: Partial<PagenatedResDtoTinyPost>) {
    super(partial);
    Object.assign(this, partial);
  }
}

