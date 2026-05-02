import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateBulkStatusRequest } from '../../store/library/reducers/libraryReducer';
import type { LibraryRow } from '../../store/library/libraryDataContracts';

export function useStatusDialog() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [pendingStatus, setPendingStatus] =
    useState<LibraryRow['status']>('Finished');

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const confirm = (selectedIds: string[], onDone?: () => void) => {
    dispatch(updateBulkStatusRequest({ ids: selectedIds, status: pendingStatus }));
    setIsOpen(false);
    onDone?.();
  };

  return { isOpen, pendingStatus, setPendingStatus, open, close, confirm };
}
