import { ArrayNotEmpty, IsArray, IsString } from 'class-validator';

export class RemoveLibraryItemsFromCollection {
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  libraryItemIds!: string[];

  @IsString()
  collectionName!: string;
}