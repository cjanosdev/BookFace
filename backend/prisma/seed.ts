import { PrismaClient, ReadingStatus } from '@prisma/client';

const prisma = new PrismaClient();

type SeedBook = {
  title: string;
  author: string;
  publishedYear: number | null;
};

type OpenLibraryDoc = {
  title?: string;
  author_name?: string[];
  cover_i?: number;
  first_publish_year?: number;
  number_of_pages_median?: number;
};

type OpenLibraryResponse = {
  docs?: OpenLibraryDoc[];
};

const TOP_100_BOOKS: SeedBook[] = [
  { title: 'Ulysses', author: 'James Joyce', publishedYear: 1922 },
  { title: 'In Search of Lost Time', author: 'Marcel Proust', publishedYear: 1913 },
  { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', publishedYear: 1925 },
  { title: 'The Catcher in the Rye', author: 'J. D. Salinger', publishedYear: 1951 },
  { title: 'One Hundred Years of Solitude', author: 'Gabriel García Márquez', publishedYear: 1967 },
  { title: 'Nineteen Eighty Four', author: 'George Orwell', publishedYear: 1949 },
  { title: 'Moby-Dick', author: 'Herman Melville', publishedYear: 1851 },
  { title: 'Don Quixote', author: 'Miguel de Cervantes', publishedYear: 1605 },
  { title: 'The Sound and the Fury', author: 'William Faulkner', publishedYear: 1929 },
  { title: 'Anna Karenina', author: 'Leo Tolstoy', publishedYear: 1877 },
  { title: 'Crime and Punishment', author: 'Fyodor Dostoevsky', publishedYear: 1866 },
  { title: 'Pride and Prejudice', author: 'Jane Austen', publishedYear: 1813 },
  { title: 'Lolita', author: 'Vladimir Nabokov', publishedYear: 1955 },
  { title: 'War and Peace', author: 'Leo Tolstoy', publishedYear: 1869 },
  { title: 'Wuthering Heights', author: 'Emily Brontë', publishedYear: 1847 },
  { title: 'To Kill a Mockingbird', author: 'Harper Lee', publishedYear: 1960 },
  { title: 'The Lord Of The Rings', author: 'J. R. R. Tolkien', publishedYear: 1959 },
  { title: 'The Bible', author: 'Unknown', publishedYear: -1400 },
  { title: 'The Brothers Karamazov', author: 'Fyodor Dostoevsky', publishedYear: 1880 },
  { title: 'The Trial', author: 'Franz Kafka', publishedYear: 1925 },
  { title: 'Adventures of Huckleberry Finn', author: 'Mark Twain', publishedYear: 1884 },
  { title: 'Madame Bovary', author: 'Gustave Flaubert', publishedYear: 1857 },
  { title: 'The Stranger', author: 'Albert Camus', publishedYear: 1942 },
  { title: 'The Odyssey', author: 'Homer', publishedYear: -740 },
  { title: 'The Grapes of Wrath', author: 'John Steinbeck', publishedYear: 1939 },
  { title: 'The Divine Comedy', author: 'Dante Alighieri', publishedYear: 1308 },
  { title: 'The Magic Mountain', author: 'Thomas Mann', publishedYear: 1924 },
  { title: 'To the Lighthouse', author: 'Virginia Woolf', publishedYear: 1927 },
  { title: 'Jane Eyre', author: 'Charlotte Brontë', publishedYear: 1847 },
  { title: 'Middlemarch', author: 'George Eliot', publishedYear: 1871 },
  { title: 'Heart of Darkness', author: 'Joseph Conrad', publishedYear: 1899 },
  { title: "Alice's Adventures in Wonderland", author: 'Lewis Carroll', publishedYear: 1865 },
  { title: 'Mrs. Dalloway', author: 'Virginia Woolf', publishedYear: 1925 },
  { title: 'Catch-22', author: 'Joseph Heller', publishedYear: 1961 },
  { title: 'The Master and Margarita', author: 'Mikhail Bulgakov', publishedYear: 1967 },
  { title: 'Invisible Man', author: 'Ralph Ellison', publishedYear: 1952 },
  { title: 'The Iliad', author: 'Homer', publishedYear: -750 },
  { title: 'Les Misérables', author: 'Victor Hugo', publishedYear: 1862 },
  { title: 'Great Expectations', author: 'Charles Dickens', publishedYear: 1860 },
  { title: 'The Red and the Black', author: 'Stendhal', publishedYear: 1830 },
  { title: 'Frankenstein', author: 'Mary Shelley', publishedYear: 1818 },
  { title: 'On the Road', author: 'Jack Kerouac', publishedYear: 1957 },
  { title: 'The Little Prince', author: 'Antoine de Saint-Exupéry', publishedYear: 1943 },
  { title: 'Absalom, Absalom!', author: 'William Faulkner', publishedYear: 1936 },
  { title: 'Fictions', author: 'Jorge Luis Borges', publishedYear: 1944 },
  { title: 'One Thousand and One Nights', author: 'Unknown', publishedYear: 800 },
  { title: 'Journey to the End of The Night', author: 'Louis-Ferdinand Céline', publishedYear: 1932 },
  { title: 'Lord of the Flies', author: 'William Golding', publishedYear: 1954 },
  { title: 'Brave New World', author: 'Aldous Huxley', publishedYear: 1932 },
  { title: 'David Copperfield', author: 'Charles Dickens', publishedYear: 1849 },
  { title: 'The Old Man and the Sea', author: 'Ernest Hemingway', publishedYear: 1952 },
  { title: 'Beloved', author: 'Toni Morrison', publishedYear: 1987 },
  { title: 'Gone With the Wind', author: 'Margaret Mitchell', publishedYear: 1936 },
  { title: 'Animal Farm', author: 'George Orwell', publishedYear: 1945 },
  { title: 'The Life And Opinions Of Tristram Shandy', author: 'Laurence Sterne', publishedYear: 1759 },
  { title: 'The Idiot', author: 'Fyodor Dostoevsky', publishedYear: 1869 },
  { title: 'Dracula', author: 'Bram Stoker', publishedYear: 1897 },
  { title: 'Under the Volcano', author: 'Malcolm Lowry', publishedYear: 1947 },
  { title: 'The Leopard', author: 'Giuseppe Tomasi di Lampedusa', publishedYear: 1958 },
  { title: 'The Sun Also Rises', author: 'Ernest Hemingway', publishedYear: 1926 },
  { title: 'The Golden Notebook', author: 'Doris May Lessing', publishedYear: 1962 },
  { title: 'Things Fall Apart', author: 'Chinua Achebe', publishedYear: 1958 },
  { title: "Gulliver's Travels", author: 'Jonathan Swift', publishedYear: 1726 },
  { title: 'Rebecca', author: 'Daphne du Maurier', publishedYear: 1938 },
  { title: 'The Aeneid', author: 'Virgil', publishedYear: -19 },
  { title: 'Robinson Crusoe', author: 'Daniel Defoe', publishedYear: 1719 },
  { title: 'Essays', author: 'Michel de Montaigne', publishedYear: 1580 },
  { title: 'Leaves of Grass', author: 'Walt Whitman', publishedYear: 1855 },
  { title: "Midnight's Children", author: 'Salman Rushdie', publishedYear: 1981 },
  { title: 'Hamlet', author: 'William Shakespeare', publishedYear: 1600 },
  { title: 'The Scarlet Letter', author: 'Nathaniel Hawthorne', publishedYear: 1850 },
  { title: 'Their Eyes Were Watching God', author: 'Zora Neale Hurston', publishedYear: 1937 },
  { title: 'A Farewell to Arms', author: 'Ernest Hemingway', publishedYear: 1929 },
  { title: 'The Metamorphosis', author: 'Franz Kafka', publishedYear: 1915 },
  { title: 'The Castle', author: 'Franz Kafka', publishedYear: 1926 },
  { title: 'A Passage to India', author: 'E. M. Forster', publishedYear: 1924 },
  { title: 'The Plague', author: 'Albert Camus', publishedYear: 1947 },
  { title: 'The Portrait of a Lady', author: 'Henry James', publishedYear: 1881 },
  { title: 'Candide', author: 'Voltaire', publishedYear: 1759 },
  { title: 'Pale Fire', author: 'Vladimir Nabokov', publishedYear: 1962 },
  { title: 'Slaughterhouse-Five', author: 'Kurt Vonnegut', publishedYear: 1969 },
  { title: 'As I Lay Dying', author: 'William Faulkner', publishedYear: 1930 },
  { title: 'A Portrait of the Artist as a Young Man', author: 'James Joyce', publishedYear: 1916 },
  { title: 'All Quiet on the Western Front', author: 'Erich Maria Remarque', publishedYear: 1928 },
  { title: 'The Count of Monte Cristo', author: 'Alexandre Dumas', publishedYear: 1844 },
  { title: 'The Man Without Qualities', author: 'Robert Musil', publishedYear: 1930 },
  { title: 'Little Women', author: 'Louisa May Alcott', publishedYear: 1868 },
  { title: 'The Good Soldier', author: 'Ford Madox Ford', publishedYear: 1915 },
  { title: 'The Picture of Dorian Gray', author: 'Oscar Wilde', publishedYear: 1890 },
  { title: 'The Tin Drum', author: 'Günter Grass', publishedYear: 1959 },
  { title: 'Faust', author: 'Johann Wolfgang von Goethe', publishedYear: 1808 },
  { title: 'Emma', author: 'Jane Austen', publishedYear: 1815 },
  { title: 'Buddenbrooks', author: 'Thomas Mann', publishedYear: 1901 },
  { title: 'Waiting for Godot', author: 'Samuel Beckett', publishedYear: 1953 },
  { title: 'For Whom the Bell Tolls', author: 'Ernest Hemingway', publishedYear: 1940 },
  { title: 'Demons', author: 'Fyodor Dostoevsky', publishedYear: 1872 },
  { title: 'The Complete Tales and Poems of Edgar Allan Poe', author: 'Edgar Allan Poe', publishedYear: 1902 },
  { title: 'The Age of Innocence', author: 'Edith Wharton', publishedYear: 1920 },
  { title: 'Orlando', author: 'Virginia Woolf', publishedYear: 1928 },
  { title: 'Dune', author: 'Frank Herbert', publishedYear: 1965 },
  { title: 'The Hobbit', author: 'J. R. R. Tolkien', publishedYear: 1937 },
];

function normalize(text: string): string {
  return text
    .normalize('NFKD')
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

async function sleep(ms: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchOpenLibraryMetadata(
  title: string,
  author: string
): Promise<{
  coverUrl: string | null;
  pageCount: number | null;
  publishedYear: number | null;
}> {
  const url =
    `https://openlibrary.org/search.json?title=${encodeURIComponent(title)}` +
    `&author=${encodeURIComponent(author)}` +
    `&fields=title,author_name,cover_i,first_publish_year,number_of_pages_median` +
    `&limit=5`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      return {
        coverUrl: null,
        pageCount: null,
        publishedYear: null,
      };
    }

    const data = (await response.json()) as OpenLibraryResponse;
    const docs = data.docs ?? [];

    const wantedTitle = normalize(title);
    const wantedAuthor = normalize(author);

    const best =
      docs.find((doc) => {
        const docTitle = normalize(doc.title ?? '');
        const docAuthor = normalize((doc.author_name ?? [])[0] ?? '');
        return docTitle === wantedTitle && docAuthor === wantedAuthor;
      }) ?? docs[0];

    if (!best) {
      return {
        coverUrl: null,
        pageCount: null,
        publishedYear: null,
      };
    }

    return {
      coverUrl: best.cover_i
        ? `https://covers.openlibrary.org/b/id/${best.cover_i}-M.jpg`
        : null,
      pageCount: best.number_of_pages_median ?? null,
      publishedYear: best.first_publish_year ?? null,
    };
  } catch {
    return {
      coverUrl: null,
      pageCount: null,
      publishedYear: null,
    };
  }
}

async function clearExistingData() {
  await prisma.collectionBook.deleteMany();
  await prisma.review.deleteMany();
  await prisma.libraryItem.deleteMany();
  await prisma.groupMember.deleteMany();
  await prisma.group.deleteMany();
  await prisma.collection.deleteMany();
  await prisma.book.deleteMany();
  await prisma.user.deleteMany();
}

async function createDemoUser() {
  return prisma.user.create({
    data: {
      name: 'Jane Doe',
      email: 'jane@bookface.dev',
      avatarUrl: 'https://i.pravatar.cc/150?img=12',
      bio: 'Demo account for BookFace development',
    },
  });
}

async function seedBooks() {
  const createdBooks: Array<{
  id: string;
  title: string;
  author: string;
  coverUrl: string | null;
  description: string | null;
  pageCount: number | null;
  publishedYear: number | null;
  createdAt: Date;
  updatedAt: Date;
}> = [];

  for (const book of TOP_100_BOOKS) {
    const metadata = await fetchOpenLibraryMetadata(book.title, book.author);

    const created = await prisma.book.create({
      data: {
        title: book.title,
        author: book.author,
        coverUrl: metadata.coverUrl,
        pageCount: metadata.pageCount,
        publishedYear: book.publishedYear ?? metadata.publishedYear,
      },
    });

    createdBooks.push(created);

    console.log(`Seeded book: ${book.title} — ${book.author}`);

    await sleep(120);
  }

  return createdBooks;
}

async function seedCollections(userId: string) {
  const favorites = await prisma.collection.create({
    data: {
      userId,
      name: 'Favorites',
      description: 'Books I loved or want to revisit',
    },
  });

  const reads2026 = await prisma.collection.create({
    data: {
      userId,
      name: '2026 Reads',
      description: 'Books I am reading this year',
    },
  });

  const classics = await prisma.collection.create({
    data: {
      userId,
      name: 'Classics',
      description: 'Classic books to keep organized',
    },
  });

  const bookClub = await prisma.collection.create({
    data: {
      userId,
      name: 'Book Club',
      description: 'Books for discussion and group reading',
    },
  });

  return { favorites, reads2026, classics, bookClub };
}

async function seedLibraryItems(
  userId: string,
  books: Array<{ id: string; title: string; author: string }>,
  collections: {
    favorites: { id: string };
    reads2026: { id: string };
    classics: { id: string };
    bookClub: { id: string };
  }
) {
  const selectedBooks = books;
  const libraryItems: Array<{
  id: string;
  userId: string;
  bookId: string;
  ReadingStatus: ReadingStatus;
  progressPercent: number;
  rating: number | null;
  notes: string | null;
  startedAt: Date | null;
  finishedAt: Date | null;
  dateAdded: Date | null;
  book: {
    id: string;
    title: string;
    author: string;
  };
}> = [];

  for (let index = 0; index < selectedBooks.length; index += 1) {
    const book = selectedBooks[index];

    let status: ReadingStatus = ReadingStatus.NOT_STARTED;
    let progressPercent = 0;
    let rating: number | null = null;
    let startedAt: Date | null = null;
    let finishedAt: Date | null = null;
    let notes: string | null = null;

    if (index < 4) {
      status = ReadingStatus.READING;
      progressPercent = 20 + index * 15;
      startedAt = new Date('2026-01-15');
      notes = 'Currently making progress';
    } else if (index < 10) {
      status = ReadingStatus.FINISHED;
      progressPercent = 100;
      rating = 4 + (index % 2);
      startedAt = new Date('2025-11-01');
      finishedAt = new Date('2026-02-10');
      notes = 'Finished and reviewed';
    } else if (index < 13) {
      status = ReadingStatus.DROPPED;
      progressPercent = 25 + index;
      startedAt = new Date('2026-01-05');
      notes = 'Paused or abandoned';
    }

    const libraryItem = await prisma.libraryItem.create({
      data: {
        userId,
        bookId: book.id,
        ReadingStatus: status,
        progressPercent,
        rating,
        notes,
        startedAt,
        finishedAt,
      },
    });

    libraryItems.push({
      ...libraryItem,
      book,
    });
  }

  for (const item of libraryItems) {
    const collectionIds: string[] = [];

    if (
      item.ReadingStatus === ReadingStatus.FINISHED &&
      (item.rating ?? 0) >= 4
    ) {
      collectionIds.push(collections.favorites.id);
    }

    if (item.ReadingStatus === ReadingStatus.READING) {
      collectionIds.push(collections.reads2026.id);
    }

    const classicAuthors = new Set([
      'James Joyce',
      'Marcel Proust',
      'Herman Melville',
      'Leo Tolstoy',
      'Virginia Woolf',
      'Charlotte Brontë',
      'George Eliot',
      'Joseph Conrad',
      'Fyodor Dostoevsky',
      'Gustave Flaubert',
      'Jane Austen',
      'Dante Alighieri',
      'Miguel de Cervantes',
      'Homer',
      'Virgil',
    ]);

    if (classicAuthors.has(item.book.author)) {
      collectionIds.push(collections.classics.id);
    }

    if (
      item.book.title === 'The Great Gatsby' ||
      item.book.title === 'Anna Karenina' ||
      item.book.title === 'Pride and Prejudice'
    ) {
      collectionIds.push(collections.bookClub.id);
    }

    for (const collectionId of collectionIds) {
      await prisma.collectionBook.create({
        data: {
          collectionId,
          libraryItemId: item.id,
        },
      });
    }
  }

  return libraryItems;
}

async function seedReviews(
  userId: string,
  libraryItems: Array<{
    id: string;
    bookId: string;
    rating: number | null;
    ReadingStatus: ReadingStatus;
    book: { title: string; author: string };
  }>
) {
  const finishedWithRatings = libraryItems.filter(
    (item) =>
      item.ReadingStatus === ReadingStatus.FINISHED && item.rating !== null
  );

  for (const item of finishedWithRatings.slice(0, 5)) {
    await prisma.review.create({
      data: {
        userId,
        bookId: item.bookId,
        rating: item.rating ?? 4,
        title: `Thoughts on ${item.book.title}`,
        body: `A demo seeded review for ${item.book.title} by ${item.book.author}.`,
        notes: 'Generated during database seed',
        difficulty: 3,
        recommended: true,
      },
    });
  }
}

async function seedGroups(
  books: Array<{ id: string; title: string }>,
  userId: string
) {
  const currentBook = books[0] ?? null;

  const group = await prisma.group.create({
    data: {
      name: 'Wednesday Night Reads',
      description: 'A seeded reading group for development',
      currentBookId: currentBook?.id ?? null,
      startDate: new Date('2026-03-01'),
      endDate: new Date('2026-05-01'),
    },
  });

  await prisma.groupMember.create({
    data: {
      groupId: group.id,
      userId,
    },
  });
}

async function main() {
  console.log('🌱 Starting seed...');

  await clearExistingData();

  const user = await createDemoUser();
  console.log(`✅ Created demo user: ${user.email}`);

  const books = await seedBooks();
  console.log(`✅ Created ${books.length} books`);

  const collections = await seedCollections(user.id);
  console.log('✅ Created collections');

  const libraryItems = await seedLibraryItems(user.id, books, collections);
  console.log(`✅ Created ${libraryItems.length} library items`);

  await seedReviews(user.id, libraryItems);
  console.log('✅ Created reviews');

  await seedGroups(books, user.id);
  console.log('✅ Created group');

  console.log('🎉 Seed complete');
}

main()
  .catch((error) => {
    console.error('❌ Seed failed');
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });