import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagsService {
  constructor(@InjectModel(Tag) private readonly tagModel: typeof Tag) {}

  /**
   * Retrieves all tags from the database.
   * @returns Promise<Tag[]> - An array of Tag entities.
   */
  async findAll(): Promise<Tag[]> {
    return this.tagModel.findAll();
  }

  /**
   * Finds or creates multiple tags based on the provided names.
   * @param names - An array of tag names to find or create.
   * @returns Promise<Tag[]> - An array of Tag entities.
   */
  async findOrCreateMany(names: string[]): Promise<Tag[]> {
    return Promise.all(
      names.map(async (name) => {
        const [tag] = await this.tagModel.findOrCreate({
          where: { name },
        });
        return tag;
      }),
    );
  }
}
