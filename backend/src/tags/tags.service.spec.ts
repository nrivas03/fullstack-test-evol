import { Test, TestingModule } from '@nestjs/testing';
import { TagsService } from './tags.service';
import { getModelToken } from '@nestjs/sequelize';
import { Tag } from './entities/tag.entity';

describe('TagsService', () => {
  let service: TagsService;
  let tagModel: any;

  beforeEach(async () => {
    tagModel = {
      findAll: jest.fn(),
      findOrCreate: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TagsService,
        {
          provide: getModelToken(Tag),
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          useValue: tagModel,
        },
      ],
    }).compile();

    service = module.get<TagsService>(TagsService);
  });

  describe('findAll', () => {
    it('should return all tags', async () => {
      const mockTags = [{ id: 1, name: 'urgent' }];
      tagModel.findAll.mockResolvedValue(mockTags);

      const result = await service.findAll();

      expect(tagModel.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockTags);
    });
  });

  describe('findOrCreateMany', () => {
    it('should find or create multiple tags', async () => {
      const names = ['urgent', 'important'];
      tagModel.findOrCreate.mockImplementation(({ where: { name } }) =>
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        Promise.resolve([{ id: name.length, name }]),
      );

      const result = await service.findOrCreateMany(names);

      expect(tagModel.findOrCreate).toHaveBeenCalledTimes(names.length);
      expect(result).toEqual([
        { id: 6, name: 'urgent' },
        { id: 9, name: 'important' },
      ]);
    });
  });
});
