import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  addToCollectionRequest,
  removeFromCollectionRequest,
} from '../../store/library/reducers/libraryReducer';
import type { CollectionAddMode } from '../../store/library/libraryDataContracts';

// collections dialog hook

export function useCollectionsDialog() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [addMode, setAddMode] = useState<CollectionAddMode>('existing');
  const [pendingName, setPendingName] = useState('');

  const open = (availableCollections: string[]) => {
    if (availableCollections.length > 0) {
      setAddMode('existing');
      setPendingName(availableCollections[0]);
    } else {
      setAddMode('new');
      setPendingName('');
    }
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setPendingName('');
  };

  const addCollection = (selectedIds: string[]) => {
    const collectionName = pendingName.trim();
    if (!collectionName) return;
    dispatch(addToCollectionRequest({ ids: selectedIds, collectionName }));
    if (addMode === 'new') {
      setAddMode('existing');
      setPendingName(collectionName);
    }
  };

  const removeCollection = (selectedIds: string[], collectionName: string) => {
    dispatch(removeFromCollectionRequest({ ids: selectedIds, collectionName }));
  };

  return {
    isOpen,
    addMode,
    setAddMode,
    pendingName,
    setPendingName,
    open,
    close,
    addCollection,
    removeCollection,
  };
}
