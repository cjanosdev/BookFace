import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { bulkEditRequest } from '../../store/library/reducers/libraryReducer';
import type { BulkEditPayload } from '../../store/library/libraryDataContracts';

type BulkEditConfirmPayload = Omit<BulkEditPayload, 'ids'>;

// bulk edit dialog hook
export function useBulkEditDialog() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const confirm = (
    payload: BulkEditConfirmPayload,
    selectedIds: string[],
    onDone?: () => void,
  ) => {
    dispatch(bulkEditRequest({ ...payload, ids: selectedIds }));
    setIsOpen(false);
    onDone?.();
  };

  return { isOpen, open, close, confirm };
}
