import { Navigate, Route, Routes } from 'react-router-dom';
import LibraryPage from '../components/library/LibraryPage';
import CollectionsPage from '../components/collections/CollectionsPage';
import CollectionDetailPage from '../components/collections/CollectionDetailPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/library" replace />} />
      <Route path="/library" element={<LibraryPage />} />
      <Route path="/collections" element={<CollectionsPage />} />
      <Route path="/collections/:id" element={<CollectionDetailPage />} />
    </Routes>
  );
}
