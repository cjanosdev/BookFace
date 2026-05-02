import { ArrayNotEmpty, IsArray, IsString } from 'class-validator';

export class DeleteLibraryItems{
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  libraryItemIds!: string[];
}