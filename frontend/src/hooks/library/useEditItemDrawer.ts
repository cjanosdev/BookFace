import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateItemRequest } from '../../store/library/reducers/libraryReducer';
import type { LibraryRow, UpdateItemPayload } from '../../store/library/libraryDataContracts';

export function useEditItemDrawer(openDeleteDialog: (row: LibraryRow) => void) {
  const dispatch = useDispatch();
  const [activeRow, setActiveRow] = useState<LibraryRow | null>(null);

  const isOpen = activeRow !== null;

  const open = (row: LibraryRow) => setActiveRow(row);
  const close = () => setActiveRow(null);

  const save = (payload: UpdateItemPayload) => {
    dispatch(updateItemRequest(payload));
    setActiveRow(null);
  };

  const deleteItem = (row: LibraryRow) => {
    setActiveRow(null);
    openDeleteDialog(row);
  };

  return { isOpen, activeRow, open, close, save, deleteItem };
}
