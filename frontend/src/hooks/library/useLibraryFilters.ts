import { useMemo, useState } from 'react';
import type { LibraryRow, LibraryTab } from '../../store/library/libraryDataContracts';
import type { LibraryFilter, LibrarySort } from '../../components/library/LibraryHeader';

export function useLibraryFilters(items: LibraryRow[]) {
  const [searchValue, setSearchValue] = useState('');
  const [activeTab, setActiveTab] = useState<LibraryTab>('All Books');
  const [filterValue, setFilterValue] = useState<LibraryFilter>('all');
  const [sortValue, setSortValue] = useState<LibrarySort>('dateNewest');

  const filteredRows = useMemo(() => {
    let next = items;

    if (activeTab !== 'All Books') {
      next = next.filter((row) => {
        if (activeTab === 'Currently Reading') return row.status === 'Reading';
        if (activeTab === 'Want to Read') return row.status === 'Not Started';
        if (activeTab === 'Finished') return row.status === 'Finished';
        if (activeTab === 'Dropped') return row.status === 'Dropped';
        return true;
      });
    }

    if (filterValue === 'rated') next = next.filter((row) => row.rating > 0);
    if (filterValue === 'unrated') next = next.filter((row) => row.rating === 0);
    if (filterValue === 'inCollection')
      next = next.filter((row) => row.collections.length > 0);

    if (searchValue.trim()) {
      const lower = searchValue.toLowerCase();
      next = next.filter(
        (row) =>
          row.title.toLowerCase().includes(lower) ||
          row.author.toLowerCase().includes(lower),
      );
    }

    return [...next].sort((a, b) => {
      if (sortValue === 'titleAsc') return a.title.localeCompare(b.title);
      if (sortValue === 'titleDesc') return b.title.localeCompare(a.title);
      if (sortValue === 'dateNewest')
        return new Date(b.added).getTime() - new Date(a.added).getTime();
      if (sortValue === 'dateOldest')
        return new Date(a.added).getTime() - new Date(b.added).getTime();
      if (sortValue === 'ratingHigh') return b.rating - a.rating;
      if (sortValue === 'ratingLow') return a.rating - b.rating;
      return 0;
    });
  }, [items, activeTab, filterValue, searchValue, sortValue]);

  return {
    searchValue,
    setSearchValue,
    activeTab,
    setActiveTab,
    filterValue,
    setFilterValue,
    sortValue,
    setSortValue,
    filteredRows,
  };
}
