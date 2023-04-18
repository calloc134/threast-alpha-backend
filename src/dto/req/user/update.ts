import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, MaxLength, MinLength, IsAlphanumeric } from "class-validator";

export class UpdateUserReqDto {

    @IsOptional()
    @IsAlphanumeric()
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    @ApiProperty({ required: false })
    handle?: string;

    @IsOptional()
    @IsString()
    @MinLength(1)
    @MaxLength(40)
    @ApiProperty({ required: false })
    screen_name?: string;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    @ApiProperty({required: false})
    bio?: string

    @IsOptional()
    @IsString()
    @MaxLength(100)
    @ApiProperty({required: false})
    hidden_comment?: string
}
