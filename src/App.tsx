import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { loadBooks } from './features/books/booksSlice';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';

const Stats = lazy(() => import('./pages/Stats'));

export default function App() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((s) => s.books.loading);
  const error = useAppSelector((s) => s.books.error);

  useEffect(() => {
    dispatch(loadBooks(false));
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="layout">
        <Sidebar />
        <main className="content">
          {loading && <p className="empty">Đang tải...</p>}
          {error && <p className="error">{error}</p>}
          {!loading && !error && (
            <Suspense fallback={<p className="empty">Đang tải trang...</p>}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/stats" element={<Stats />} />
              </Routes>
            </Suspense>
          )}
        </main>
      </div>
    </BrowserRouter>
  );
}
