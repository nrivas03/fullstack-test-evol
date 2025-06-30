import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entities/task.entity';

describe('TasksController', () => {
  let controller: TasksController;
  let service: jest.Mocked<TasksService>;

  beforeEach(async () => {
    const mockService = {
      create: jest.fn(),
      findAllFiltered: jest.fn(),
      toggleStatus: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get(TasksService);
  });

  describe('create', () => {
    it('should call tasksService.create with correct DTO', async () => {
      const dto: CreateTaskDto = {
        title: 'Test',
        description: 'Desc',
        tags: ['urgent'],
        dueDate: new Date().toISOString(),
      };

      const expectedTask = { id: 1, ...dto } as unknown as Task;
      service.create.mockResolvedValue(expectedTask);

      const result = await controller.create(dto);

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(expectedTask);
    });
  });

  describe('findAll', () => {
    it('should parse query params and call tasksService.findAllFiltered', async () => {
      const expected = [{ id: 1, title: 'task' }] as Task[];
      service.findAllFiltered.mockResolvedValue(expected);

      const result = await controller.findAll(
        'true',
        '2025-06-30T00:00:00Z',
        'urgent,important',
        'dueDate',
        'search term',
      );

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.findAllFiltered).toHaveBeenCalledWith({
        completed: true,
        dueDate: new Date('2025-06-30T00:00:00Z'),
        tags: ['urgent', 'important'],
        sort: 'dueDate',
        title: 'search term',
      });

      expect(result).toEqual(expected);
    });
  });

  describe('toggleStatus', () => {
    it('should call tasksService.toggleStatus with ID', async () => {
      const expected = { id: 1, completed: true } as Task;
      service.toggleStatus.mockResolvedValue(expected);

      const result = await controller.toggleStatus(1);

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.toggleStatus).toHaveBeenCalledWith(1);
      expect(result).toEqual(expected);
    });
  });

  describe('update', () => {
    it('should call tasksService.update with ID and DTO', async () => {
      const updateDto: Partial<CreateTaskDto> = {
        title: 'Updated title',
      };

      const expected = { id: 1, ...updateDto } as unknown as Task;
      service.update.mockResolvedValue(expected);

      const result = await controller.update(1, updateDto);

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.update).toHaveBeenCalledWith(1, updateDto);
      expect(result).toEqual(expected);
    });
  });

  describe('remove', () => {
    it('should call tasksService.remove with ID', async () => {
      service.remove.mockResolvedValue(undefined);

      const result = await controller.remove(1);

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.remove).toHaveBeenCalledWith(1);
      expect(result).toBeUndefined();
    });
  });
});
