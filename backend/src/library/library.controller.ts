import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { LibraryService } from './library.service';
import { UpdateLibraryStatus } from './dataContracts/updateLibrarayStatus';
import { AddLibraryItemsToCollection } from './dataContracts/addLibraryItemsToCollection';
import { RemoveLibraryItemsFromCollection } from './dataContracts/removeLibraryItemsFromCollection';
import { DeleteLibraryItems } from './dataContracts/deleteLibraryItems';
import { CreateCollection } from './dataContracts/createCollection';
import { UpdateCollection } from './dataContracts/updateCollection';
import { UpdateLibraryItem } from './dataContracts/updateLibraryItem';
import { BulkUpdateLibraryItems } from './dataContracts/bulkUpdateLibraryItems';

@Controller('library')
export class LibraryController {
  constructor(private readonly libraryService: LibraryService) {}

  @Get()
  getLibrary() {
    return this.libraryService.getLibrary();
  }

  @Patch('bulk/status')
  updateBulkStatus(@Body() dto: UpdateLibraryStatus) {
    return this.libraryService.updateBulkStatus(dto);
  }

  @Patch('bulk/collections/remove')
  removeBulkFromCollection(@Body() dto: RemoveLibraryItemsFromCollection) {
    return this.libraryService.removeBulkFromCollection(dto);
  }

  @Patch('bulk/collections')
  addBulkToCollection(@Body() dto: AddLibraryItemsToCollection) {
    return this.libraryService.addBulkToCollection(dto);
  }

  @Patch('bulk')
  bulkUpdateItems(@Body() dto: BulkUpdateLibraryItems) {
    return this.libraryService.bulkUpdateItems(dto);
  }

  @Delete('bulk')
  deleteBulk(@Body() dto: DeleteLibraryItems) {
    return this.libraryService.deleteBulk(dto);
  }

  @Patch(':id')
  updateItem(@Param('id') id: string, @Body() dto: UpdateLibraryItem) {
    return this.libraryService.updateItem(id, dto);
  }



/**
 * These guys are all related to collectionzzz
 */
  @Get('collections')
  getCollections() {
    return this.libraryService.getCollections();
  }

  @Post('collections')
  createCollection(@Body() dto: CreateCollection) {
    return this.libraryService.createCollection(dto);
  }

  @Get('collections/:id')
  getCollectionDetail(@Param('id') id: string) {
    return this.libraryService.getCollectionDetail(id);
  }

  @Patch('collections/:id')
  updateCollection(@Param('id') id: string, @Body() dto: UpdateCollection) {
    return this.libraryService.updateCollection(id, dto);
  }

  @Delete('collections/:id')
  deleteCollection(@Param('id') id: string) {
    return this.libraryService.deleteCollection(id);
  }
}
