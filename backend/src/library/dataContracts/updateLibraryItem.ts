import { IsArray, IsIn, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class UpdateLibraryItem {
  @IsIn(['NOT_STARTED', 'READING', 'FINISHED', 'DROPPED'])
  status!: string;

  @IsNumber()
  @Min(0)
  @Max(100)
  progressPercent!: number;

  @IsNumber()
  @Min(0)
  @Max(5)
  rating!: number;

  @IsString()
  notes!: string;

  @IsArray()
  @IsString({ each: true })
  collections!: string[];

  @IsOptional()
  @IsString()
  dateAdded?: string | null;

  @IsOptional()
  @IsString()
  startedAt?: string | null;
}
