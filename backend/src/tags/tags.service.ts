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
   * Creates a new tag with the given name.
   * If a tag with the same name already exists, an error is thrown.
   * @param name - The name of the tag to create.
   * @returns Promise<Tag> - The created Tag entity.
   * @throws Error if a tag with the same name already exists.
   */
  async create(name: string): Promise<Tag> {
    const [tag, created] = await this.tagModel.findOrCreate({
      where: { name },
    });
    if (!created) {
      throw new Error(`Tag with name "${name}" already exists`);
    }
    return tag;
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
