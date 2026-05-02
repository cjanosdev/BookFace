import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteCollectionRequest } from '../../store/collections/reducers/collectionsReducer';

// hoook for deleting collection
export function useDeleteCollectionDialog() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [targetId, setTargetId] = useState<string | null>(null);

  const open = (id: string) => {
    setTargetId(id);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setTargetId(null);
  };

  const confirm = () => {
    if (!targetId) return;
    dispatch(deleteCollectionRequest(targetId));
    setIsOpen(false);
    setTargetId(null);
  };

  return { isOpen, targetId, open, close, confirm };
}
