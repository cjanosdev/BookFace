import { ArrayNotEmpty, IsArray, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class BulkUpdateLibraryItems {
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  libraryItemIds!: string[];

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(5)
  rating?: number;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  progressPercent?: number;
}
