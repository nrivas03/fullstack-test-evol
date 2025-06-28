import {
  IsString,
  IsOptional,
  IsBoolean,
  IsDateString,
  IsArray,
  ArrayUnique,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  completed?: boolean;

  @IsDateString()
  @IsOptional()
  dueDate?: string;

  @IsArray()
  @ArrayUnique()
  @IsOptional()
  tags?: string[];
}
