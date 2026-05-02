import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteBulkRequest } from '../../store/library/reducers/libraryReducer';

export function useDeleteDialog() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const confirm = (selectedIds: string[], onDone?: () => void) => {
    dispatch(deleteBulkRequest({ ids: selectedIds }));
    setIsOpen(false);
    onDone?.();
  };

  return { isOpen, open, close, confirm };
}
