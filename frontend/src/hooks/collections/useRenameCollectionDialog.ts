import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { renameCollectionRequest } from '../../store/collections/reducers/collectionsReducer';

// hook for renaming collection

export function useRenameCollectionDialog() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [targetId, setTargetId] = useState<string | null>(null);
  const [name, setName] = useState('');

  const open = (id: string, currentName: string) => {
    setTargetId(id);
    setName(currentName);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setTargetId(null);
    setName('');
  };

  const confirm = () => {
    const trimmed = name.trim();
    if (!targetId || !trimmed) return;
    dispatch(renameCollectionRequest({ id: targetId, name: trimmed }));
    setIsOpen(false);
    setTargetId(null);
    setName('');
  };

  return { isOpen, targetId, name, setName, open, close, confirm };
}
