import { useMemo } from 'react';
import { useAppSelector } from '../store/hooks';
import SearchFilterBar from '../components/SearchFilterBar';
import BookList from '../components/BookList';
import BorrowedList from '../components/BorrowedList';

export default function Home() {
  const books = useAppSelector((s) => s.books.items);
  const borrowed = useAppSelector((s) => s.books.borrowed);
  const warning = useAppSelector((s) => s.books.warning);

  const banCon = useMemo(
    () => books.reduce((sum, b) => sum + b.available, 0),
    [books]
  );

  return (
    <div>
      <div className="page-head">
        <h2>Danh sách sách</h2>
        <p className="page-sub">
          {books.length} đầu sách · {banCon} bản còn lại · đang mượn {borrowed.length}/3
        </p>
      </div>

      {warning && <p className="warning">{warning}</p>}

      <div className="home">
        <div className="home-main">
          <SearchFilterBar />
          <BookList />
        </div>
        <aside className="home-side">
          <BorrowedList />
        </aside>
      </div>
    </div>
  );
}
