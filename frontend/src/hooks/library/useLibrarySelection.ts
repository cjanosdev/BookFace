import { useMemo, useState } from 'react';
import type { GridRowSelectionModel } from '@mui/x-data-grid';
import type { LibraryRow } from '../../store/library/libraryDataContracts';

export function useLibrarySelection(filteredRows: LibraryRow[]) {
  const [rowSelectionModel, setRowSelectionModel] =
    useState<GridRowSelectionModel>({
      type: 'include',
      ids: new Set(),
    });

  const selectedIds = useMemo<string[]>(() => {
    if (rowSelectionModel.type === 'include') {
      return Array.from(rowSelectionModel.ids) as string[];
    }
    return filteredRows
      .filter((row) => !rowSelectionModel.ids.has(row.id))
      .map((row) => row.id);
  }, [rowSelectionModel, filteredRows]);

  const selectedCount =
    rowSelectionModel.type === 'include'
      ? rowSelectionModel.ids.size
      : Math.max(filteredRows.length - rowSelectionModel.ids.size, 0);

  const resetSelection = () => {
    setRowSelectionModel({ type: 'include', ids: new Set() });
  };

  return {
    rowSelectionModel,
    setRowSelectionModel,
    selectedIds,
    selectedCount,
    resetSelection,
  };
}
