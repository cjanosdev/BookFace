import { ReadingStatus } from '@prisma/client';
import { IsArray, IsEnum, IsString, ArrayNotEmpty } from 'class-validator';

export class UpdateLibraryStatus {
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  libraryItemIds!: string[];

  @IsEnum(ReadingStatus)
  status!: ReadingStatus;
}