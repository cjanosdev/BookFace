import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { UpdateLibraryStatus } from '../../src/library/dataContracts/updateLibrarayStatus';
import { AddLibraryItemsToCollection } from './dataContracts/addLibraryItemsToCollection';
import { RemoveLibraryItemsFromCollection } from './dataContracts/removeLibraryItemsFromCollection';
import { DeleteLibraryItems } from './dataContracts/deleteLibraryItems';
import { CreateCollection } from './dataContracts/createCollection';
import { UpdateCollection } from './dataContracts/updateCollection';
import { UpdateLibraryItem } from './dataContracts/updateLibraryItem';
import { BulkUpdateLibraryItems } from './dataContracts/bulkUpdateLibraryItems';

@Injectable()
export class LibraryService {
  constructor(private readonly prisma: PrismaService) {}

  async getLibrary() {
    const demoUser = await this.prisma.user.findUnique({
      where: { email: 'jane@bookface.dev' },
    });

    if (!demoUser) {
      return [];
    }

    const libraryItems = await this.prisma.libraryItem.findMany({
      where: {
        userId: demoUser.id,
      },
      include: {
        book: true,
        collectionBooks: {
          include: {
            collection: true,
          },
        },
      },
      orderBy: {
        dateAdded: 'desc',
      },
    });

    return libraryItems.map((item) => ({
      id: item.id,
      status: item.ReadingStatus,
      progressPercent: item.progressPercent,
      rating: item.rating,
      notes: item.notes,
      startedAt: item.startedAt,
      finishedAt: item.finishedAt,
      dateAdded: item.dateAdded,
      collections: item.collectionBooks.map((cb) => cb.collection.name),
      book: {
        id: item.book.id,
        title: item.book.title,
        author: item.book.author,
        coverUrl: item.book.coverUrl,
        description: item.book.description,
        pageCount: item.book.pageCount,
        publishedYear: item.book.publishedYear,
      },
    }));
  }

    async updateBulkStatus(dto: UpdateLibraryStatus) {
    const { libraryItemIds, status } = dto;

    await this.prisma.libraryItem.updateMany({
      where: {
        id: { in: libraryItemIds },
      },
      data: {
        ReadingStatus: status,
        finishedAt: status === 'FINISHED' ? new Date() : null,
        startedAt: status === 'READING' ? new Date() : undefined,
        progressPercent:
          status === 'FINISHED'
            ? 100
            : status === 'NOT_STARTED'
              ? 0
              : undefined,
      },
    });

    return { success: true };
  }

  async addBulkToCollection(dto: AddLibraryItemsToCollection) {
    const { libraryItemIds, collectionName } = dto;

    const demoUser = await this.prisma.user.findUnique({
      where: { email: 'jane@bookface.dev' },
    });

    if (!demoUser) {
      return { success: false };
    }

    const collection = await this.prisma.collection.upsert({
      where: {
        userId_name: {
          userId: demoUser.id,
          name: collectionName,
        },
      },
      update: {},
      create: {
        userId: demoUser.id,
        name: collectionName,
      },
    });

    for (const libraryItemId of libraryItemIds) {
      await this.prisma.collectionBook.upsert({
        where: {
          collectionId_libraryItemId: {
            collectionId: collection.id,
            libraryItemId,
          },
        },
        update: {},
        create: {
          collectionId: collection.id,
          libraryItemId,
        },
      });
    }

    return { success: true, collectionName };
  }

  async removeBulkFromCollection(dto: RemoveLibraryItemsFromCollection) {
  const { libraryItemIds, collectionName } = dto;

  const demoUser = await this.prisma.user.findUnique({
    where: { email: 'jane@bookface.dev' },
  });

  if (!demoUser) {
    return { success: false };
  }

  const collection = await this.prisma.collection.findFirst({
    where: {
      userId: demoUser.id,
      name: collectionName,
    },
  });

  if (!collection) {
    return { success: true, removedCount: 0 };
  }

  const result = await this.prisma.collectionBook.deleteMany({
    where: {
      collectionId: collection.id,
      libraryItemId: {
        in: libraryItemIds,
      },
    },
  });

  return {
    success: true,
    removedCount: result.count,
    collectionName,
  };
}

  async bulkUpdateItems(dto: BulkUpdateLibraryItems) {
    const { libraryItemIds, rating, notes, progressPercent } = dto;

    await this.prisma.libraryItem.updateMany({
      where: { id: { in: libraryItemIds } },
      data: {
        ...(rating !== undefined && { rating }),
        ...(notes !== undefined && { notes }),
        ...(progressPercent !== undefined && { progressPercent }),
      },
    });

    return { success: true };
  }

  async deleteBulk(dto: DeleteLibraryItems) {
    const { libraryItemIds } = dto;

    const result = await this.prisma.libraryItem.deleteMany({
      where: { id: { in: libraryItemIds } },
    });

    return { success: true, deletedCount: result.count };
  }

  private async getDemoUser() {
    const user = await this.prisma.user.findUnique({
      where: { email: 'jane@bookface.dev' },
    });
    if (!user) throw new NotFoundException('Demo user not found');
    return user;
  }

  
  private mapItemToResponse(item: any) {
    return {
      id: item.id,
      status: item.ReadingStatus,
      progressPercent: item.progressPercent,
      rating: item.rating,
      notes: item.notes,
      startedAt: item.startedAt,
      finishedAt: item.finishedAt,
      dateAdded: item.dateAdded,
      collections: item.collectionBooks.map((cb: any) => cb.collection.name),
      book: {
        id: item.book.id,
        title: item.book.title,
        author: item.book.author,
        coverUrl: item.book.coverUrl,
        description: item.book.description,
        pageCount: item.book.pageCount,
        publishedYear: item.book.publishedYear,
      },
    };
  }

  async getCollections() {
    const user = await this.getDemoUser();

    const collections = await this.prisma.collection.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
      include: {
        books: {
          take: 4,
          include: {
            libraryItem: { include: { book: true } },
          },
        },
        _count: { select: { books: true } },
      },
    });

    return collections.map((c) => ({
      id: c.id,
      name: c.name,
      description: c.description,
      bookCount: c._count.books,
      coverUrls: c.books
        .map((cb) => cb.libraryItem.book.coverUrl)
        .filter(Boolean),
    }));
  }

  async createCollection(dto: CreateCollection) {
    const user = await this.getDemoUser();

    const collection = await this.prisma.collection.upsert({
      where: { userId_name: { userId: user.id, name: dto.name } },
      update: {},
      create: { userId: user.id, name: dto.name, description: dto.description },
      include: { _count: { select: { books: true } } },
    });

    return {
      id: collection.id,
      name: collection.name,
      description: collection.description,
      bookCount: collection._count.books,
      coverUrls: [] as string[],
    };
  }

  async getCollectionDetail(id: string) {
    const user = await this.getDemoUser();

    const collection = await this.prisma.collection.findFirst({
      where: { id, userId: user.id },
      include: {
        books: {
          include: {
            libraryItem: {
              include: {
                book: true,
                collectionBooks: { include: { collection: true } },
              },
            },
          },
        },
      },
    });

    if (!collection) throw new NotFoundException('Collection not found');

    return {
      id: collection.id,
      name: collection.name,
      description: collection.description,
      books: collection.books.map((cb) => this.mapItemToResponse(cb.libraryItem)),
    };
  }

  async updateCollection(id: string, dto: UpdateCollection) {
    const collection = await this.prisma.collection.update({
      where: { id },
      data: {
        ...(dto.name !== undefined && { name: dto.name }),
        ...(dto.description !== undefined && { description: dto.description }),
      },
      include: {
        books: {
          take: 4,
          include: { libraryItem: { include: { book: true } } },
        },
        _count: { select: { books: true } },
      },
    });

    return {
      id: collection.id,
      name: collection.name,
      description: collection.description,
      bookCount: collection._count.books,
      coverUrls: collection.books
        .map((cb) => cb.libraryItem.book.coverUrl)
        .filter(Boolean),
    };
  }

  async deleteCollection(id: string) {
    await this.prisma.collection.delete({
      where: { id },
    });

    return { success: true };
  }

  async updateItem(id: string, dto: UpdateLibraryItem) {
    const user = await this.getDemoUser();

    await this.prisma.libraryItem.update({
      where: { id },
      data: {
        ReadingStatus: dto.status as any,
        progressPercent: dto.progressPercent,
        rating: dto.rating,
        notes: dto.notes,
        dateAdded: dto.dateAdded ? new Date(dto.dateAdded) : null,
        startedAt: dto.startedAt ? new Date(dto.startedAt) : null,
      },
    });

    // Weird bug with deletion need to do deleteMany and get rid of all existing links and then
    // recreate from the new list... basically sync collections
    await this.prisma.collectionBook.deleteMany({ where: { libraryItemId: id } });

    // recreate collections
    for (const name of dto.collections) {
      const collection = await this.prisma.collection.upsert({
        where: { userId_name: { userId: user.id, name } },
        update: {},
        create: { userId: user.id, name },
      });

      // reinsert
      await this.prisma.collectionBook.create({
        data: { collectionId: collection.id, libraryItemId: id },
      });
    }

    const updated = await this.prisma.libraryItem.findUniqueOrThrow({
      where: { id },
      include: {
        book: true,
        collectionBooks: { include: { collection: true } },
      },
    });

    return this.mapItemToResponse(updated);
  }
}