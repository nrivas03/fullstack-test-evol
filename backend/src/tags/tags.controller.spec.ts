import { Test, TestingModule } from '@nestjs/testing';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';
import { Tag } from './entities/tag.entity';

describe('TagsController', () => {
  let controller: TagsController;
  let service: jest.Mocked<TagsService>;

  beforeEach(async () => {
    const mockService = {
      findAll: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TagsController],
      providers: [
        {
          provide: TagsService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<TagsController>(TagsController);
    service = module.get(TagsService);
  });

  describe('findAll', () => {
    it('should return all tags', async () => {
      const tags: Tag[] = [{ id: 1, name: 'urgent' } as Tag];
      service.findAll.mockResolvedValue(tags);

      const result = await controller.findAll();

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(tags);
    });
  });
});
