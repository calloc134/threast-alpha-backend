import { PaginatedQueryReqDto } from '@dto/req/query/queryReqDto';
import { Controller, Query, Get, Param, Post, Put, Body } from '@nestjs/common';
import { AuthHashtagsService } from './hashtags.service';
import { CreateHashtagReqDto } from '@dto/req/hashtag/create';
import { UpdateHashtagReqDto } from '@dto/req/hashtag/update';
import { ApiOkResponse } from '@nestjs/swagger';
import { PaginatedResDtoTinyHashtag } from '@dto/res/wrapper/paginatedResDto';
import { TinyHashtagResDto } from '@dto/res/hashtag/tiny';
import { StandardHashtagResDto } from '@dto/res/hashtag/standard';

@Controller('api/hashtags')
export class AuthHashtagsController {
  constructor(private readonly authHashtagsService: AuthHashtagsService) {}

  @Get()
  @ApiOkResponse({ type: PaginatedResDtoTinyHashtag })
  async getAllHashtags(@Query() query: PaginatedQueryReqDto) {
    return await this.authHashtagsService.getAllHashtags(query.current_page ?? 1, query.per_page ?? 10);
  }

  @Get(':hashtag_name')
  @ApiOkResponse({ type: StandardHashtagResDto })
  async getHashtagByHashtagName(@Param('hashtag_name') hashtag_name: string) {
    return await this.authHashtagsService.getHashtagByHashtagName(hashtag_name);
  }

  @Post()
  @ApiOkResponse({ type: StandardHashtagResDto })
  async createHashtag(@Body() createHashTagReqDto: CreateHashtagReqDto) {
    return await this.authHashtagsService.createHashtag(createHashTagReqDto);
  }

  @Put(':hashtag_name')
  @ApiOkResponse({ type: StandardHashtagResDto })
  async updateHashtag(@Param('hashtag_name') hashtag_name: string, @Body() updateHashtagReqDto: UpdateHashtagReqDto) {
    return await this.authHashtagsService.updateHashtag(hashtag_name, updateHashtagReqDto);
  }
}
