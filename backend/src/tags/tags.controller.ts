import { Body, Controller, Get, Post } from '@nestjs/common';
import { TagsService } from './tags.service';
import { Tag } from './entities/tag.entity';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  findAll(): Promise<Tag[]> {
    return this.tagsService.findAll();
  }

  @Post()
  create(@Body('name') name: string): Promise<Tag> {
    if (!name) {
      throw new Error('Tag name is required');
    }
    return this.tagsService.create(name);
  }
}
