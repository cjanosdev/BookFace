import { Navigate, Route, Routes } from 'react-router-dom';
import LibraryPage from '../pages/LibraryPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/library" replace />} />
      <Route path="/library" element={<LibraryPage />} />
    </Routes>
  );
}
