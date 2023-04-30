import { Expose } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { TinyUserResDto } from "@dto/res/user/tiny";
import { TinyPostResDto } from "@dto/res/post/tiny";
import { StandardPostLikeResDto } from "../post_like/standard";
import { StandardPostLikeResDtoWithTinyUser } from "../post_like/standard_users";
import { StandardPostLikeResDtoWithTinyPost } from "../post_like/standard_posts";

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

export class PaginatedResDtoStandardPostLike extends PaginatedResDto {
  @Expose()
  @ApiProperty({ type: [StandardPostLikeResDto] })
  data: StandardPostLikeResDto[];

  constructor(partial: Partial<PaginatedResDtoStandardPostLike>) {
    super(partial);
    Object.assign(this, partial);
  }
}

export class PaginatedResDtoStandardPostLikeWithTinyUser extends PaginatedResDto {
  @Expose()
  @ApiProperty({ type: [StandardPostLikeResDtoWithTinyUser] })
  data: StandardPostLikeResDtoWithTinyUser[];

  constructor(partial: Partial<PaginatedResDtoStandardPostLikeWithTinyUser>) {
    super(partial);
    Object.assign(this, partial);
  }
}

export class PaginatedResDtoStandardPostLikeWithTinyPost extends PaginatedResDto {
  @Expose()
  @ApiProperty({ type: [StandardPostLikeResDtoWithTinyPost] })
  data: StandardPostLikeResDtoWithTinyPost[];

  constructor(partial: Partial<PaginatedResDtoStandardPostLikeWithTinyPost>) {
    super(partial);
    Object.assign(this, partial);
  }
}