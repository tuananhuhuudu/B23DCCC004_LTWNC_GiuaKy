import { useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { returnBook } from '../features/books/booksSlice';

export default function BorrowedList() {
  const borrowed = useAppSelector((s) => s.books.borrowed);
  const dispatch = useAppDispatch();

  const grouped = useMemo(() => {
    const map = new Map<string, { id: string; title: string; author: string; count: number }>();
    borrowed.forEach((b) => {
      const found = map.get(b.id);
      if (found) {
        found.count += 1;
      } else {
        map.set(b.id, { id: b.id, title: b.title, author: b.author, count: 1 });
      }
    });
    return [...map.values()];
  }, [borrowed]);

  const handleReturn = useCallback(
    (id: string) => {
      dispatch(returnBook(id));
    },
    [dispatch]
  );

  if (borrowed.length === 0) {
    return (
      <section>
        <h2>Sách đang mượn (0/3)</h2>
        <div className="borrowed-empty">
          <p className="empty">Bạn chưa mượn cuốn nào</p>
          <p className="empty">Bấm "Mượn" ở một cuốn sách để bắt đầu</p>
        </div>
      </section>
    );
  }

  return (
    <section>
      <h2>Sách đang mượn ({borrowed.length}/3)</h2>
      <ul className="borrowed-list">
        {grouped.map((b) => (
          <li key={b.id}>
            <span>
              {b.title} - {b.author}
              {b.count > 1 && <span className="borrowed-count">{b.count} bản</span>}
            </span>
            <button onClick={() => handleReturn(b.id)}>Trả</button>
          </li>
        ))}
      </ul>
    </section>
  );
}
