import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createCollectionRequest } from '../../store/collections/reducers/collectionsReducer';

// hook for create collection dialog
export function useCreateCollectionDialog() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const open = () => {
    setName('');
    setDescription('');
    setIsOpen(true);
  };

  const close = () => setIsOpen(false);

  const confirm = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    dispatch(
      createCollectionRequest({
        name: trimmed,
        description: description.trim() || undefined,
      }),
    );
    setIsOpen(false);
  };

  return {
    isOpen,
    name,
    description,
    setName,
    setDescription,
    open,
    close,
    confirm,
  };
}
